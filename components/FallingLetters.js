import React, { useEffect, useRef, useCallback, useState } from 'react';

const FallingLetters = ({ text, onScrollToAbout }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const buttonRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);
  const wallsRef = useRef([]);
  const rafRef = useRef(null);
  const cancelledRef = useRef(false);
  const hasTriggeredRef = useRef(false);
  const [falling, setFalling] = useState(false);

  // Sync physics body positions to DOM transforms
  const syncDOM = useCallback(() => {
    const bodies = bodiesRef.current;
    const letterEls = lettersRef.current;

    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i];
      const el = letterEls[i];
      if (!body || !el) continue;

      const { x, y } = body.position;
      const angle = body.angle;
      const ox = parseFloat(el.dataset.ox);
      const oy = parseFloat(el.dataset.oy);
      const dx = x - ox;
      const dy = y - oy;
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${angle}rad)`;
    }

    rafRef.current = requestAnimationFrame(syncDOM);
  }, []);

  // Start physics on first scroll
  const startPhysics = useCallback(async () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setFalling(true);

    const Matter = await import('matter-js');
    if (cancelledRef.current) return;

    const { Engine, Runner, Bodies, Body, World } = Matter;

    const container = containerRef.current;
    if (!container) return;

    const engine = Engine.create({ gravity: { x: 0, y: 1.8 } });
    engineRef.current = engine;

    const runner = Runner.create();
    runnerRef.current = runner;

    const rect = container.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    // Create bodies for each letter
    const letterEls = lettersRef.current.filter(Boolean);
    const bodies = [];

    letterEls.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const cX = r.left - rect.left + r.width / 2;
      const cY = r.top - rect.top + r.height / 2;

      el.dataset.ox = cX;
      el.dataset.oy = cY;

      const bodyW = r.width * 0.88;
      const bodyH = r.height * 0.88;

      const body = Bodies.rectangle(cX, cY, bodyW, bodyH, {
        restitution: 0.35,
        friction: 0.6,
        frictionAir: 0.012,
        density: 0.002,
        chamfer: { radius: 2 },
        render: { visible: false },
      });

      // Tiny random nudge so letters don't fall in a perfect stack
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2,
        y: 0,
      });

      bodies.push(body);
    });

    bodiesRef.current = bodies;

    // Button as a static obstacle
    const staticBodies = [];
    if (buttonRef.current) {
      const br = buttonRef.current.getBoundingClientRect();
      const bX = br.left - rect.left + br.width / 2;
      const bY = br.top - rect.top + br.height / 2;

      // Pill-shaped obstacle: full width, heavily rounded so letters slide off
      const buttonBody = Bodies.rectangle(bX, bY, br.width * 0.95, br.height * 0.9, {
        isStatic: true,
        restitution: 0.3,
        friction: 0.05,
        chamfer: { radius: Math.min(br.width * 0.95, br.height * 0.9) / 2 },
        render: { visible: false },
      });
      staticBodies.push(buttonBody);
    }

    // Walls
    const FLOOR_DEPTH = 400;
    const SIDE_DEPTH = 300;

    const floor = Bodies.rectangle(W / 2, H + FLOOR_DEPTH / 2, W * 2, FLOOR_DEPTH, {
      isStatic: true, restitution: 0, render: { visible: false },
    });
    const leftWall = Bodies.rectangle(-SIDE_DEPTH / 2, H / 2, SIDE_DEPTH, H * 3, {
      isStatic: true, restitution: 0, render: { visible: false },
    });
    const rightWall = Bodies.rectangle(W + SIDE_DEPTH / 2, H / 2, SIDE_DEPTH, H * 3, {
      isStatic: true, restitution: 0, render: { visible: false },
    });

    wallsRef.current = [floor, leftWall, rightWall];
    World.add(engine.world, [...bodies, ...staticBodies, floor, leftWall, rightWall]);

    Runner.run(runner, engine);
    rafRef.current = requestAnimationFrame(syncDOM);
  }, [syncDOM]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        startPhysics();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startPhysics]);

  // Tear down physics and reset letters to original positions
  const resetPhysics = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    if (runnerRef.current && engineRef.current) {
      try {
        const Matter = require('matter-js');
        Matter.Runner.stop(runnerRef.current);
        Matter.World.clear(engineRef.current.world);
        Matter.Engine.clear(engineRef.current);
      } catch (e) { /* ignore if matter not loaded yet */ }
    }
    runnerRef.current = null;
    engineRef.current = null;
    bodiesRef.current = [];
    wallsRef.current = [];

    // Clear transforms so letters snap back to their natural layout
    lettersRef.current.forEach((el) => {
      if (el) el.style.transform = '';
    });

    hasTriggeredRef.current = false;
    setFalling(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      resetPhysics();
    };
  }, [resetPhysics]);

  // On horizontal resize only: reset letters (ignore vertical — Safari mobile toolbar)
  const lastWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth === lastWidthRef.current) return; // vertical-only change, ignore
      lastWidthRef.current = newWidth;

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (hasTriggeredRef.current) {
          resetPhysics();
        }
      }, 200);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [resetPhysics]);

  // Split text into lines and characters
  const lines = text.split('\n');
  let globalCharIdx = 0;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-screen-lg mx-auto mt-[-4%] px-5 pb-14 text-center flex flex-col items-center justify-center h-full relative"
    >
      <div className="py-10 sm:p-10 text-5xl md:text-7xl lg:text-8xl xl:text-9xl uppercase font-extrabold">
        {lines.map((line, lineIdx) => {
          const chars = line.split('');
          const lineSpans = chars.map((char) => {
            const isSpace = char === ' ';
            const idx = globalCharIdx;
            if (!isSpace) globalCharIdx++;

            return (
              <span
                key={`char-${lineIdx}-${idx}-${char}`}
                ref={isSpace ? null : (el) => { lettersRef.current[idx] = el; }}
                className="inline-block"
                style={{
                  willChange: falling ? 'transform' : 'auto',
                  ...(isSpace ? { width: '0.3em' } : {}),
                }}
              >
                {isSpace ? '\u00A0' : char}
              </span>
            );
          });

          return (
            <div key={`line-${lineIdx}`} className="flex flex-wrap justify-center">
              {lineSpans}
              {lineIdx < lines.length - 1 && <div className="w-full" />}
            </div>
          );
        })}
      </div>

      <button
        ref={buttonRef}
        onClick={onScrollToAbout}
        className="text-lg sm:text-xl uppercase mt-0 sm:mt-7 px-[3%] py-4 sm:py-4 bg-white bg-opacity-10 shadow-lg backdrop-blur-sm rounded-full font-bold transition-all duration-300 ease-in-out hover:bg-[#8fb4dc] hover:px-[5%] shadow-[#8fb4dc]/50 relative z-10"
      >
        Learn more
      </button>
    </div>
  );
};

export default FallingLetters;
