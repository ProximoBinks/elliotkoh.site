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
                <title>Home | Elliot Koh — Developer</title>
                <meta name="description" content="Join keebclub™️, the ultimate destination for mechanical keyboard enthusiasts at the University of Adelaide. Explore workshops, events, and a community passionate about custom keyboards. Whether you're a seasoned builder or new to the hobby, find your click here!" />
                <meta name="theme-color" content="#2121ff"/>
            </Head>
            <div className="text-white p-10 bg-black">
              Welcome to my app!
            </div>
        </>
    );
};

export default HomePage;