import React, { useEffect, useRef, useState } from 'react';

// A winding "flight path" timeline: a dashed route drawn through each waypoint
// node, revealed by scroll, with a plane marker at the tip of the drawn line.
// Geometry is measured from the DOM so the curve always passes through the
// nodes at any viewport size.
const StoryRoad = ({ waypoints }) => {
  const containerRef = useRef(null);
  const routeRef = useRef(null);
  const drawnRef = useRef(null);
  const planeRef = useRef(null);
  const nodeRefs = useRef([]);
  const [d, setD] = useState('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const build = () => {
      const cRect = container.getBoundingClientRect();
      const pts = nodeRefs.current.filter(Boolean).map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - cRect.left + r.width / 2,
          y: r.top - cRect.top + r.height / 2,
        };
      });
      if (pts.length < 2) return;

      // Weave amplitude: wide sweeps on desktop, a gentle wobble on mobile
      // (nodes sit ~28px from the left edge there, so keep the curve on-canvas).
      const amp = cRect.width < 640 ? 22 : Math.min(cRect.width * 0.18, 140);
      let path = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const dir = i % 2 === 0 ? 1 : -1;
        path += ` C ${a.x + amp * dir} ${a.y + (b.y - a.y) * 0.45}, ${b.x + amp * dir} ${b.y - (b.y - a.y) * 0.45}, ${b.x} ${b.y}`;
      }
      setD(path);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(container);
    return () => ro.disconnect();
  }, [waypoints]);

  useEffect(() => {
    const container = containerRef.current;
    const route = routeRef.current;
    const drawn = drawnRef.current;
    const plane = planeRef.current;
    if (!container || !route || !drawn || !d) return;

    const totalLen = route.getTotalLength();
    drawn.style.strokeDasharray = `${totalLen}`;

    // Fraction of the path length at which each node sits, found by sampling.
    const cRect = container.getBoundingClientRect();
    const nodePts = nodeRefs.current.filter(Boolean).map((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left - cRect.left + r.width / 2,
        y: r.top - cRect.top + r.height / 2,
      };
    });
    const SAMPLES = 220;
    const fracs = nodePts.map((p) => {
      let best = 0;
      let bestDist = Infinity;
      for (let s = 0; s <= SAMPLES; s++) {
        const pt = route.getPointAtLength((totalLen * s) / SAMPLES);
        const dist = (pt.x - p.x) ** 2 + (pt.y - p.y) ** 2;
        if (dist < bestDist) {
          bestDist = dist;
          best = s / SAMPLES;
        }
      }
      return best;
    });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = (progress) => {
      const len = totalLen * progress;
      drawn.style.strokeDashoffset = `${totalLen - len}`;
      nodeRefs.current.forEach((el, i) => {
        if (el) el.classList.toggle('road-node-active', progress >= fracs[i] - 0.01);
      });
      if (plane) {
        if (progress > 0.01 && progress < 0.985) {
          const p = route.getPointAtLength(len);
          const ahead = route.getPointAtLength(Math.min(len + 2, totalLen));
          const ang = (Math.atan2(ahead.y - p.y, ahead.x - p.x) * 180) / Math.PI;
          // The ✈ glyph points north-east, so offset its heading by 45°.
          plane.setAttribute('transform', `translate(${p.x}, ${p.y}) rotate(${ang + 45})`);
          plane.style.opacity = '1';
        } else {
          plane.style.opacity = '0';
        }
      }
    };

    if (reduced) {
      render(1);
      return;
    }

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const rect = container.getBoundingClientRect();
        const progress = Math.min(
          Math.max((window.innerHeight * 0.85 - rect.top) / rect.height, 0),
          1
        );
        render(progress);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [d]);

  return (
    <div ref={containerRef} className="relative">
      <svg className="absolute inset-0 h-full w-full overflow-visible pointer-events-none" aria-hidden="true">
        {d && (
          <>
            {/* full route: faint dashed map line */}
            <path
              ref={routeRef}
              d={d}
              fill="none"
              stroke="#8fb4dc"
              strokeOpacity="0.22"
              strokeWidth="1.5"
              strokeDasharray="2 7"
              strokeLinecap="round"
            />
            {/* travelled route: revealed on scroll */}
            <path
              ref={drawnRef}
              d={d}
              fill="none"
              stroke="#8fb4dc"
              strokeOpacity="0.9"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 6px rgba(143,180,220,0.45))' }}
            />
            <g ref={planeRef} style={{ opacity: 0, transition: 'opacity 0.3s' }}>
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="18"
                fill="#dce9f7"
              >
                ✈
              </text>
            </g>
          </>
        )}
      </svg>

      <div className="relative">
        {waypoints.map(({ stop, marker, meta, title, text, here }, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={marker}
              className="grid grid-cols-[56px_1fr] md:grid-cols-[1fr_120px_1fr] items-center py-12 md:py-20"
            >
              {/* node */}
              <div
                className={`row-start-1 col-start-1 md:col-start-2 flex justify-center ${here ? 'road-here' : ''}`}
              >
                <div
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className="road-node relative h-4 w-4 rounded-full border-2 border-[#8fb4dc]/60 bg-[#080807]"
                >
                  <span className="road-node-core absolute inset-[3px] rounded-full bg-transparent transition-all duration-500" />
                  {here && (
                    <span className="hidden md:block absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.25em] text-[#8fb4dc]">
                      YOU ARE HERE
                    </span>
                  )}
                </div>
              </div>

              {/* content */}
              <div
                className={`row-start-1 col-start-2 pl-2 md:pl-0 ${
                  flip
                    ? 'md:col-start-1 md:text-right md:justify-self-end'
                    : 'md:col-start-3 md:justify-self-start'
                } max-w-[520px] md:bg-[#080807] md:p-6 md:-m-6 md:rounded-2xl`}
              >
                <div className="font-mono text-[11px] md:text-xs tracking-[0.2em] text-[#8fb4dc]/80 mb-3">
                  <span className="text-[#787673]">{stop}</span> {meta}
                  {here && <span className="md:hidden block mt-1 text-[#8fb4dc]">● YOU ARE HERE</span>}
                </div>
                <h3 className="uppercase text-2xl md:text-4xl font-extrabold tracking-tight text-[#c9c9c1] mb-4">
                  {title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-[#a3a19c] font-semibold">
                  {text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoryRoad;
