import React, { useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import WorkCard from '../components/WorkCard';
import WorksSection from '../components/WorksSection';
import { works } from '../data/works';
import SEO from '../components/SEO';
import { SITE_URL } from '../lib/constants';

const FallingLetters = dynamic(() => import('../components/FallingLetters'), {
  ssr: false,
});

const HomePage = () => {
  // Create a ref for the "About Us" section
  const aboutMeRef = useRef(null); // Ref for the "About Me" section

  const scrollToAboutUs = () => {
    aboutMeRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Home"
        description="I went all in on one bet — 100 days to hit $10k/month online so I can move to Japan and close the distance. Building in public and sharing everything: the ups, the downs, and where every dollar is made."
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Elliot Koh',
              url: SITE_URL,
              image: `${SITE_URL}/images/hero/testimg.webp`,
              jobTitle: 'Founder & Developer',
              description:
                'Founder and developer building in public — 100 days to $10k/month online to close the distance to Tokyo.',
              sameAs: [
                'https://hypertools.dev',
                'https://www.linkedin.com/in/elliotkoh1/',
                'https://instagram.com/elliot.koh',
              ],
              knowsAbout: [
                'Web Development',
                'UI/UX Design',
                'Software Engineering',
                'Computer Science',
              ],
            }),
          }}
        />
      </Head>

      <div style={{ height: 'calc(100vh - 100px)' }} className="flex flex-col items-center justify-center relative select-none text-black overflow-hidden">
        <FallingLetters text={"Hi there, I'm\nElliot Koh."} onScrollToAbout={scrollToAboutUs} />
      </div>
      <div id="about" ref={aboutMeRef} className="about-class p-[3rem] 3xl:px-[14rem] md:py-[6rem] text-[#ebecf0] text-left bg-[#080807] rounded-tl-[1.6rem] rounded-tr-[1.6rem] relative">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left column (photo) - visible only on medium screens and up, aligned to bottom */}
          <div className="hidden md:flex md:w-[40%] relative md:items-end">
            <div className="aspect-[1/1.3] relative overflow-hidden w-full mb-0 md:mb-[3rem]">
              <Image
                src="/images/hero/testimg.webp"
                alt="Black and white portrait of Elliot Koh"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover grayscale"
              />
              <div className="absolute bottom-4 left-4 text-xs opacity-50">39</div>
            </div>
          </div>

          {/* Right column (content) - takes full width on mobile, 60% on desktop */}
          <div className="w-full md:w-[60%]">
            {/* Title block - right aligned on medium screens and up */}
            <div className="">
              <h1 className="uppercase text-[clamp(3.2rem,9vw,5rem)] lg:text-[clamp(5.85rem,6vw,10rem)] font-bold leading-[0.9] tracking-tight mb-8 text-[#c9c9c1] md:absolute md:left-11 lg:static">
                ALL IN<br />
                ON ONE<br />
                BET<span className="text-[clamp(2.5rem,7vw,5rem)] lg:text-[clamp(5.85rem,6vw,10rem)]">/</span>
              </h1>
              {/* Mobile-only image - MOVED BEFORE the paragraph */}
              <div className="block md:hidden w-full aspect-[1/1.2] relative overflow-hidden mb-10">
                <Image
                  src="/images/hero/testimg.webp"
                  alt="Black and white portrait of Elliot Koh"
                  fill
                  sizes="(max-width: 768px) calc(100vw - 6rem), 100vw"
                  className="object-cover grayscale"
                />
                <div className="absolute bottom-4 left-4 text-xs opacity-50">43</div>
              </div>

              {/* Main description - right aligned and wider spacing on medium screens and up */}
              <p
                className="text-[clamp(1.2rem,2.5vw,1.5rem)] leading-relaxed mb-12 max-w-[90%] text-[#bdbdb4] pt-md-only lg:max-w-[750px] font-semibold"
              >
                I'm Elliot. My girlfriend Mana lives in Tokyo, and we've been long distance for six months. So I went all in on one bet — 100 days to hit $10k a month online, move to Japan, and close the distance for good. This is where the whole thing lives: the story, the work, and everything I'm building to get there.
              </p>
            </div>

            {/* About me section - closely matches screenshot with specific spacing */}
            <div className="mb-10 md:mt-16 text-[#787673] lg:grid lg:grid-cols-[auto_1fr] lg:gap-12 max-w-[400px] lg:max-w-[625px] font-semibold">
              {/* Left column (ABOUT ME) */}
              <div className="text-[#96928e] text-sm tracking-wider opacity-70 mb-4 font-bold lg:mb-0 lg:mt-1">
                (ABOUT ME)
              </div>

              {/* Right column (Paragraphs) */}
              <div>
                <p className="text-base md:text-lg leading-relaxed max-w-[90%]">
                  By trade I'm a developer and designer. I build under <Link href="https://hypertools.dev" target="_blank" className="text-[#399ded] hover:text-[#78b6e9] transition-all duration-300 ease-in-out">HyperTools</Link>, take on client work, and care a lot about clarity and intentional design — taking ideas from scratch to things that feel good to use.
                </p>
                <p className="text-base md:text-lg leading-relaxed mt-6 max-w-[90%]">
                  Outside of tech, I design pieces for my clothing brand, collect peripherals, refine my desk setup, and continue studying Japanese after my exchange in Tokyo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MY STORY */}
        <div id="story" className="story-class pt-[8%] max-w-[900px] mx-auto">
          <div className="text-[#96928e] text-sm tracking-wider opacity-70 font-bold mb-6">(MY STORY)</div>
          <h2 className="uppercase text-[clamp(2.5rem,7vw,5rem)] lg:text-[clamp(4rem,5vw,7rem)] font-bold leading-[0.9] tracking-tight text-[#c9c9c1] mb-12">
            BUYING BACK MY<br />FREEDOM IN MY 20s<span className="text-[#8fb4dc]">.</span>
          </h2>
          <div className="space-y-10 font-semibold">
            {[
              {
                marker: 'ADELAIDE',
                text: 'Born and raised in Adelaide, Australia. Studied computer science, freelanced as a developer, and spent my degree building things for the internet — client sites, uni projects, and my own tools.',
              },
              {
                marker: 'TOKYO',
                text: 'An exchange semester in Tokyo changed the trajectory. I met Mana there. Then the semester ended, and I flew home to finish my degree — and we’ve been long distance ever since.',
              },
              {
                marker: 'THE BET',
                text: 'I graduated, and instead of settling into the safe path, I went all in on one bet: 100 days to hit $10k a month online. Enough to work from anywhere, move to Japan, and stay.',
              },
              {
                marker: 'IN PUBLIC',
                text: 'I’m posting everything along the way — the ups, the downs, and where every dollar is made. No fake urgency, no overnight-success story. Just the real numbers and the real work.',
              },
            ].map(({ marker, text }) => (
              <div key={marker} className="lg:grid lg:grid-cols-[140px_1fr] lg:gap-12 border-t border-[#c9c9c1]/10 pt-8">
                <div className="text-[#8fb4dc] text-sm tracking-wider font-bold mb-3 lg:mb-0 lg:mt-1">{marker}</div>
                <p className="text-base md:text-lg leading-relaxed text-[#a3a19c] max-w-[650px]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* NOW */}
        <div id="now" className="pt-[8%] max-w-[900px] mx-auto">
          <div className="text-[#96928e] text-sm tracking-wider opacity-70 font-bold mb-6">(RIGHT NOW)</div>
          <p className="text-[clamp(1.2rem,2.5vw,1.5rem)] leading-relaxed text-[#bdbdb4] font-semibold max-w-[750px] mb-10">
            Every day runs on four non-negotiables: train, eat clean, post, and ship. A day only counts if all four happen.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {['TRAIN', 'EAT CLEAN', 'POST', 'SHIP'].map((rule, i) => (
              <div key={rule} className="border border-[#c9c9c1]/15 rounded-2xl p-5 text-center">
                <div className="text-[#787673] text-xs font-bold mb-2">0{i + 1}</div>
                <div className="text-[#c9c9c1] font-bold tracking-wider text-sm md:text-base">{rule}</div>
              </div>
            ))}
          </div>
          <p className="text-base md:text-lg leading-relaxed text-[#787673] font-semibold max-w-[650px]">
            The journey is documented daily at{' '}
            <Link href="https://instagram.com/elliotkohdev" target="_blank" className="text-[#399ded] hover:text-[#78b6e9] transition-all duration-300 ease-in-out">
              @elliotkohdev
            </Link>
            . If you’re here from a video — welcome. Stick around to see what’s next.
          </p>
        </div>

        <div id="works" className="pt-[8%]">
          <div className="text-[#96928e] text-sm tracking-wider opacity-70 font-bold mb-6">(PROOF I CAN BUILD)</div>
          <WorksSection works={works} />
        </div>
        <div className="mt-16 md:mt-24 pb-4 max-w-[900px] mx-auto text-left">
          <div className="text-[#96928e] text-sm tracking-wider opacity-70 font-bold mb-6">(WORK WITH ME)</div>
          <h2 className="uppercase text-[clamp(2.5rem,7vw,5rem)] lg:text-[clamp(4rem,5vw,7rem)] font-bold leading-[0.9] tracking-tight text-[#c9c9c1] mb-8">
            GOT A PROJECT?<br />LET'S TALK<span className="text-[#8fb4dc]">.</span>
          </h2>
          <Link
            href="/contact"
            className="text-lg sm:text-xl uppercase px-[3%] py-4 border border-[#c9c9c1]/30 text-[#c9c9c1] rounded-full font-bold transition-all duration-300 ease-in-out hover:bg-[#8fb4dc] hover:border-[#8fb4dc] hover:text-white hover:px-[5%]"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;