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
                <h1 className="uppercase font-extrabold text-4xl sm:text-6xl md:text-7xl">About Me.</h1>
                <div className="mb-[7%] my-10 flex justify-center relative">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#080807] opacity-55 rounded-2xl z-10"></div>
                    {/* Image */}
                    <img src="/testimg.webp" className="rounded-2xl md:w-[75%] md:h-[75%] xl:h-[40%] xl:w-[40%] pb-[20%] sm:pb-[10%] md:pb-[10%] lg:pb-[10%] xl:pb-[3%]" />
                    {/* Text Container aligned to the bottom-right */}
                    <div className="absolute bottom-0 right-0 z-20 mx-[-20px] py-4 lg:px-[15%]">
                        {/* Text Content - Adjust the styling as needed */}
                        <p className="font-[600] max-w-[500px] text-[#ffffff] text-lg md:text-lg lg:text-2xl text-left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Driven by passion and creativity, I, Elliot, fuse tech expertise with unique hobbies to innovate and inspire. From tackling coding puzzles to creating custom keyboards and my own clothing brand, my endeavors span design and technology. Committed to impactful solutions, I turn visionary ideas into tangible realities in the tech landscape.
                        </p>
                    </div>
                </div>

                <h1 id="works" className="pt-[5%] works-class uppercase font-extrabold text-4xl sm:text-6xl md:text-7xl">selected works.</h1>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Item */}
                    <Link className="transition-all relative overflow-hidden rounded-lg hover:rounded-2xl" href="https://codekage.store" target="_blank">
                        <div className="group">
                            <img src="/codekage-1.webp" alt="CodeKage 1" className="transition-transform duration-300 ease-in-out transform group-hover:scale-110 w-full h-auto" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center sm:justify-between">
                                <h3 className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold mb-2 lg:mb-0">CodeKage</h3>
                                <div className="flex flex-row space-x-2">
                                    <span className="backdrop-blur-md bg-white bg-opacity-10 outline outline-[#ffffff] outline-[1px] text-[#ffffff] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Gatsby.js</span>
                                    <span className="backdrop-blur-md bg-white bg-opacity-10 outline outline-[#ffffff] outline-[1px] text-[#ffffff] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Development</span>
                                    <span className="bg-[#ffffff] text-[#895415] text-xs font-semibold px-2.5 py-0.5 rounded-lg">2024</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className="transition-all relative overflow-hidden rounded-lg hover:rounded-2xl" href="https://uoakeebclub.com" target="_blank">
                        <div className="group">
                            <img src="/work1.webp" alt="Work 1" className="transition-transform duration-300 ease-in-out transform group-hover:scale-110 w-full h-auto" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center sm:justify-between">
                                <h3 className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold mb-2 lg:mb-0">keebclub<span className="text-[#ebecf0]">&#8482;</span></h3>
                                <div className="flex flex-row space-x-2">
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Next.js</span>
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Development</span>
                                    <span className="bg-[#8fb4dc] text-[#080807] text-xs font-semibold px-2.5 py-0.5 rounded-lg">2024</span>
                                </div>
                            </div>


                        </div>
                    </Link>
                    <Link className="transition-all relative overflow-hidden rounded-lg hover:rounded-2xl" href="https://proximobinks.github.io/Discord-Timestamp-Generator" target="_blank">
                        <div className="group">
                            <img src="/work2.webp" alt="Work 2" className="transition-transform duration-300 ease-in-out transform group-hover:scale-110 w-full h-auto" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center sm:justify-between">
                                <h3 className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold mb-2 lg:mb-0">Timestamp Generator</h3>
                                <div className="flex flex-row space-x-2">
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">HTML</span>
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Development</span>
                                    <span className="bg-[#8fb4dc] text-[#080807] text-xs font-semibold px-2.5 py-0.5 rounded-lg">2023</span>
                                </div>
                            </div>


                        </div>
                    </Link>
                    <Link className="transition-all relative overflow-hidden rounded-lg hover:rounded-2xl" href="https://proximobinks.github.io/UCAT-Timer/r" target="_blank">
                        <div className="group">
                            <img src="/timer-1.webp" alt="Work 2" className="transition-transform duration-300 ease-in-out transform group-hover:scale-110 w-full h-auto" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center sm:justify-between">
                                <h3 className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold mb-2 lg:mb-0">Altitutor UCAT Timer</h3>
                                <div className="flex flex-row space-x-2">
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">HTML/JS</span>
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Education</span>
                                    <span className="bg-[#8fb4dc] text-[#080807] text-xs font-semibold px-2.5 py-0.5 rounded-lg">2023</span>
                                </div>
                            </div>


                        </div>
                    </Link>
                    <Link className="transition-all relative overflow-hidden rounded-lg hover:rounded-2xl" href="https://github.com/ProximoBinks/SimCity-1989-OOP" target="_blank">
                        <div className="group">
                            <img src="/work3.webp" alt="Work 3" className="transition-transform duration-300 ease-in-out transform group-hover:scale-110 w-full h-auto pb-10 sm:pb-2 md:pb-10 lg:pb-11 xl:pb-0 3xl:mb-[-2.3rem] mb-0" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center sm:justify-between">
                                <h3 className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold mb-2 lg:mb-0">SimCity 1989 in C++</h3>
                                <div className="flex flex-row space-x-2">
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">C++</span>
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Development</span>
                                    <span className="bg-[#8fb4dc] text-[#080807] text-xs font-semibold px-2.5 py-0.5 rounded-lg">2022</span>
                                </div>
                            </div>


                        </div>
                    </Link>
                    <Link className="transition-all relative overflow-hidden rounded-lg hover:rounded-2xl" href="https://github.com/ProximoBinks/University-Clubs-Website" target="_blank">
                        <div className="group">
                            <img src="/work4.webp" alt="Work 4" className="transition-transform duration-300 ease-in-out transform group-hover:scale-110 w-full h-auto pb-10 sm:pb-2 md:pb-10 lg:pb-11 xl:pb-0 3xl:mb-[-2.3rem] mb-0" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center sm:justify-between">
                                <h3 className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold mb-2 lg:mb-0">University Clubs</h3>
                                <div className="flex flex-row space-x-2">
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">HTML/SQL</span>
                                    <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg">Development</span>
                                    <span className="bg-[#8fb4dc] text-[#080807] text-xs font-semibold px-2.5 py-0.5 rounded-lg">2022</span>
                                </div>
                            </div>


                        </div>
                    </Link>
                </div>
                <div className="mt-10 w-auto bg-gradient-to-r from-blue-500 to-teal-400 p-10 text-center rounded-lg shadow-lg mx-auto">
                    <div className="text-white text-xl md:text-2xl font-bold mb-6">Got a project? Want to reach out?</div>
                    <Link href="/contact" className="uppercase bg-white text-blue-500 font-extrabold py-4 px-4 hover:px-8 rounded-[2rem] hover:bg-gray-100 text-sm sm:text-base md:text-lg transition-all hover:rounded-[2rem] focus:outline-none focus:ring-2 shadow-lg hover:shadow-[#ffffff]/50 focus:ring-blue-500 focus:ring-offset-2">Get in touch</Link>
                </div>



            </div>


        </>
    );
};

export default HomePage;