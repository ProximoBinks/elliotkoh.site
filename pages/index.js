import React, { useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

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
                <meta name="description" content="Join keebclub™️, the ultimate destination for mechanical keyboard enthusiasts at the University of Adelaide. Explore workshops, events, and a community passionate about custom keyboards. Whether you're a seasoned builder or new to the hobby, find your click here!" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <div style={{ height: 'calc(100vh - 100px)' }} className="flex flex-col items-center justify-center relative select-none text-black overflow-hidden">

                <div className="w-full max-w-screen-lg mx-auto px-5 py-14 text-center flex flex-col items-center justify-center h-full">
                    <div className="p-10 text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase font-extrabold justify-left">
                        Hi there, I'm<br></br>Elliot Koh.
                    </div>
                    <button onClick={scrollToAboutUs} className="text-sm sm:text-lg uppercase mt-0 sm:mt-7 px-[3%] py-3 sm:py-4 bg-white bg-opacity-10 shadow-lg shadow-black-500/50 backdrop-blur-sm rounded-full font-bold transition-all duration-300 ease-in-out hover:bg-[#8fb4dc] hover:px-[5%]">Learn more</button>
                </div>
            </div>
            <div id="about" ref={aboutMeRef} className="about-class p-[3rem] 3xl:px-[14rem] md:py-[6rem] text-[#ebecf0] text-left bg-[#080807] rounded-tl-[1.6rem] rounded-tr-[1.6rem] relative">
                <h1 className="uppercase font-extrabold text-4xl sm:text-6xl md:text-7xl">About Me.</h1>
                <div className="my-10 flex justify-center relative">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#080807] opacity-55 rounded-2xl z-10"></div>

                    {/* Image */}
                    <img src="/testimg.webp" className="rounded-2xl md:w-[75%] md:h-[75%] xl:h-[40%] xl:w-[40%] pb-[20%] sm:pb-[10%] md:pb-[10%] lg:pb-[10%] xl:pb-[3%]" />

                    {/* Text Container aligned to the bottom-right */}
                    <div className="absolute bottom-0 right-0 z-20 mx-[-20px] py-4 lg:px-[15%]">
                        {/* Text Content - Adjust the styling as needed */}
                        <p className="font-[500] max-w-[500px] text-white text-lg md:text-lg lg:text-2xl text-left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Driven by passion and creativity, I, Elliot, fuse tech expertise with unique hobbies to innovate and inspire. From tackling coding puzzles to creating custom keyboards and my own clothing brand, my endeavors span design and technology. Committed to impactful solutions, I turn visionary ideas into tangible realities in the tech landscape.
                        </p>
                    </div>
                </div>


                <h1 id="works" className="pt-[10%] works-class uppercase font-extrabold text-4xl sm:text-6xl md:text-7xl">selected works.</h1>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Item */}
                    <a className="transition-all relative overflow-hidden rounded-lg hover:rounded-2xl" href="https://uoakeebclub.com/" target="_blank"> {/* Ensure this container clips the scaled image */}
                        <div className="group">
                            <img src="/work1.webp" alt="Work 1" className="transition-transform duration-300 ease-in-out transform group-hover:scale-110 w-full h-auto" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center sm:justify-between">
                                <h3 className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold mb-2 lg:mb-0">keebclub<span className="text-[#ebecf0]">&#8482;</span></h3>
                                <div className="flex flex-row space-x-2">
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Design</span>
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Development</span>
                                    <span className="bg-[#8fb4dc] text-[#080807] text-xs font-semibold px-2.5 py-0.5 rounded-lg">2024</span>
                                </div>
                            </div>


                        </div>
                    </a>
                    {/* Additional items... */}
                    <a className="transition-all relative overflow-hidden rounded-lg hover:rounded-2xl" href="https://proximobinks.github.io/Discord-Timestamp-Generator/" target="_blank"> {/* Ensure this container clips the scaled image */}
                        <div className="group">
                            <img src="/work2.webp" alt="Work 1" className="transition-transform duration-300 ease-in-out transform group-hover:scale-110 w-full h-auto" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center sm:justify-between">
                                <h3 className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold mb-2 lg:mb-0">Timestamp Generator</h3>
                                <div className="flex flex-row space-x-2">
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Design</span>
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Development</span>
                                    <span className="bg-[#8fb4dc] text-[#080807] text-xs font-semibold px-2.5 py-0.5 rounded-lg">2024</span>
                                </div>
                            </div>


                        </div>
                    </a>
                </div>

            </div>


        </>
    );
};

export default HomePage;