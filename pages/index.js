import React, { useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import WorkCard from '../components/WorkCard';
import WorksSection from '../components/WorksSection';
import { works } from '../data/works';

const HomePage = () => {
  // Create a ref for the "About Us" section
  const aboutMeRef = useRef(null); // Ref for the "About Me" section

  const scrollToAboutUs = () => {
    aboutMeRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Home — Elliot Koh</title>
        <meta name="description" content="A skilled Computer Science undergrad specialising in crafting captivating digital experiences, merging technology and creativity to elevate startups in the digital realm." />
        <meta name="theme-color" content="#e8ecef" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elliotkoh.netlify.app/" />
        <meta property="og:title" content="Home — Elliot Koh" />
        <meta property="og:description" content="A skilled Computer Science undergrad specialising in crafting captivating digital experiences, merging technology and creativity to elevate startups in the digital realm." />
        <meta property="og:image" content="https://elliotkoh.netlify.app/banner.webp" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://elliotkoh.netlify.app/" />
        <meta property="twitter:title" content="Home — Elliot Koh" />
        <meta property="twitter:description" content="A skilled Computer Science undergrad specialising in crafting captivating digital experiences, merging technology and creativity to elevate startups in the digital realm." />
        <meta property="twitter:image" content="https://elliotkoh.netlify.app/banner.webp" />
      </Head>

      <div style={{ height: 'calc(100vh - 100px)' }} className="flex flex-col items-center justify-center relative select-none text-black overflow-hidden">

        <div className="w-full max-w-screen-lg mx-auto mt-[-4%] px-5 pb-14 text-center flex flex-col items-center justify-center h-full">
          <div className="py-10 sm:p-10 text-5xl md:text-7xl lg:text-8xl xl:text-9xl uppercase font-extrabold justify-left">
            Hi there, I'm<br></br>Elliot Koh.
          </div>
          <button onClick={scrollToAboutUs} className="text-lg sm:text-xl uppercase mt-0 sm:mt-7 px-[3%] py-4 sm:py-4 bg-white bg-opacity-10 shadow-lg backdrop-blur-sm rounded-full font-bold transition-all duration-300 ease-in-out hover:bg-[#8fb4dc] hover:px-[5%] shadow-[#8fb4dc]/50">Learn more</button>
        </div>
      </div>
      <div id="about" ref={aboutMeRef} className="about-class p-[3rem] 3xl:px-[14rem] md:py-[6rem] text-[#ebecf0] text-left bg-[#080807] rounded-tl-[1.6rem] rounded-tr-[1.6rem] relative">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left column (photo) - visible only on medium screens and up, aligned to bottom */}
          <div className="hidden md:flex md:w-[40%] relative md:items-end">
            <div className="aspect-[1/1.3] relative overflow-hidden w-full mb-0 md:mb-[3rem]">
              <Image
                src="/testimg.webp"
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
                  src="/testimg.webp"
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
                I'm Elliot — a developer and designer passionate about building meaningful tools, clean interfaces, and systems that elevate how we live and work. With a focus on clarity and intentional design, I take ideas from scratch and turn them into functional, well-crafted solutions that feel good to use.
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
                  I'm currently building <Link href="https://hypertools.dev" target="_blank" className="text-[#399ded] hover:text-[#78b6e9] transition-all duration-300 ease-in-out">HyperTools</Link>, a growing suite of purposeful tools — from visual utilities to goal trackers — designed to simplify workflows and support personal growth.
                </p>
                <p className="text-base md:text-lg leading-relaxed mt-6 max-w-[90%]">
                  Outside of tech, you'll find me designing pieces for my clothing brand, collecting peripherals, refining my desk setup, or deep in Japanese study as I prepare for my upcoming exchange in Tokyo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="works" className="pt-[5%]">
          <WorksSection works={works} />
        </div>
        <div className="mt-10 w-auto bg-gradient-to-r from-blue-500 to-teal-400 p-10 text-center rounded-lg shadow-lg mx-auto">
          <div className="text-white text-xl md:text-2xl font-bold mb-6">Got a project? Want to reach out?</div>
          <Link href="/contact" className="uppercase bg-white text-blue-500 font-extrabold py-4 px-4 hover:px-8 rounded-[2rem] hover:bg-gray-100 text-sm sm:text-base md:text-lg transition-all hover:rounded-[2rem] focus:outline-none focus:ring-2 shadow-lg focus:ring-blue-500 focus:ring-offset-2">Get in touch</Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;