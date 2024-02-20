import React, { useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
    // Create a ref for the "About Us" section
    const aboutUsRef = useRef(null);

    // Function to scroll to the "About Us" section
    const scrollToAboutUs = () => {
        aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Head>
                <title>Home — Elliot Koh</title>
                <meta name="description" content="Join keebclub™️, the ultimate destination for mechanical keyboard enthusiasts at the University of Adelaide. Explore workshops, events, and a community passionate about custom keyboards. Whether you're a seasoned builder or new to the hobby, find your click here!" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <div className="py-14 px-5 text-center flex flex-col items-center justify-center relative select-none text-black">
                <div className="p-10 text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase font-extrabold justify-left">
                    Hi there, I'm<br></br>Elliot Koh.
                </div>

                <button onClick={scrollToAboutUs} className="text-sm sm:text-lg uppercase mt-4 px-[3%] py-3 sm:py-4 bg-white bg-opacity-10 shadow-lg shadow-indigo-500/50 backdrop-blur-sm rounded-full font-bold transition-all duration-300 ease-in-out hover:bg-[#8fb4dc] hover:px-[5%]">Learn more</button>
            </div>
        </>
    );
};

export default HomePage;