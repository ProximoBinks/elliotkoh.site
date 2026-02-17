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
        description="Developer and designer passionate about building meaningful tools, clean interfaces, and systems that elevate how we live and work."
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
              jobTitle: 'Developer & Designer',
              description:
                'Developer and designer passionate about building meaningful tools, clean interfaces, and systems that elevate how we live and work.',
              sameAs: [
                'https://hypertools.dev',
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
                alt="Profile Image"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover grayscale"
                priority
              />
              <div className="absolute bottom-4 left-4 text-xs opacity-50">39</div>
            </div>
          </div>

          {/* Right column (content) - takes full width on mobile, 60% on desktop */}
          <div className="w-full md:w-[60%]">
            {/* Title block - right aligned on medium screens and up */}
            <div className="">
              <h1 className="uppercase text-[clamp(3.2rem,9vw,5rem)] lg:text-[clamp(5.85rem,6vw,10rem)] font-bold leading-[0.9] tracking-tight mb-8 text-[#c9c9c1] md:absolute md:left-11 lg:static">
                BUILDER,<br />
                CREATOR,<br />
                OPTIMISER<span className="text-[clamp(2.5rem,7vw,5rem)] lg:text-[clamp(5.85rem,6vw,10rem)]">/</span>
              </h1>
              {/* Mobile-only image - MOVED BEFORE the paragraph */}
              <div className="block md:hidden w-full aspect-[1/1.2] relative overflow-hidden mb-10">
                <Image
                  src="/images/hero/testimg.webp"
                  alt="Profile Image"
                  fill
                  sizes="(max-width: 768px) calc(100vw - 6rem), 100vw"
                  className="object-cover grayscale"
                  priority
                />
                <div className="absolute bottom-4 left-4 text-xs opacity-50">43</div>
              </div>

              {/* Main description - right aligned and wider spacing on medium screens and up */}
              <p
                className="text-[clamp(1.2rem,2.5vw,1.5rem)] leading-relaxed mb-12 max-w-[90%] text-[#bdbdb4] pt-md-only lg:max-w-[750px] font-semibold"
              >
                I'm Elliot, a developer and designer passionate about building meaningful tools, clean interfaces, and systems that improve how we live and work. I focus on clarity and intentional design, taking ideas from scratch and turning them into functional, well-crafted solutions that feel good to use.
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
                  I'm currently building <Link href="https://hypertools.dev" target="_blank" className="text-[#399ded] hover:text-[#78b6e9] transition-all duration-300 ease-in-out">HyperTools</Link>, a growing suite of purposeful tools, from visual utilities to goal trackers, designed to simplify workflows and support personal growth.
                </p>
                <p className="text-base md:text-lg leading-relaxed mt-6 max-w-[90%]">
                  Outside of tech, I design pieces for my clothing brand, collect peripherals, refine my desk setup, and continue studying Japanese after completing my exchange in Tokyo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="works" className="pt-[5%]">
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