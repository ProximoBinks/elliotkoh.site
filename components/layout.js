import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';
import HamburgerMenu from './HamburgerMenu';

const Layout = ({ children }) => {
  // State to track if the hamburger menu should be shown
  const [showHamburger, setShowHamburger] = useState(false);

  useEffect(() => {
    // Function to handle scroll logic
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 90% of the viewport height
      const threshold = 0.9 * window.innerHeight;

      if (scrollY >= threshold) {
        setShowHamburger(true);
      } else {
        setShowHamburger(false);
      }
    };

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);

    // Remove listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/herosquare5.webp" />
      </Head>

      <div className="flex flex-col h-screen overflow-x-hidden bg-cover bg-top bg-hero-pattern">
        <Header />
        {/* Pass a prop to show or hide the menu */}
        <HamburgerMenu isVisible={showHamburger} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
