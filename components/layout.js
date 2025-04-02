import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import HamburgerMenu from './HamburgerMenu';

const Layout = ({ children }) => {
  const [showHamburger, setShowHamburger] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if the device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsMobile(isIOS);

    const handleScroll = () => {
      // Get viewport height
      const vh = window.innerHeight;
      // Get current scroll position
      const scrollPosition = window.scrollY;
      // Calculate 90% of viewport height
      const threshold = vh * 0.9;

      // Show hamburger menu if scrolled past threshold
      const shouldShowHamburger = scrollPosition > threshold;
      setShowHamburger(shouldShowHamburger);

      // Close menu if hamburger is hidden
      if (!shouldShowHamburger && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/herosquare5.webp" />
      </Head>
      {/* Fixed position background for iOS */}
      {isMobile && (
        <div 
          className="fixed inset-0 z-[-1]"
          style={{
            backgroundImage: 'url(/herosquare5.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
      <div 
        className="flex flex-col min-h-screen overflow-x-hidden relative"
        style={isMobile ? {} : {
          backgroundImage: 'url(/herosquare5.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <Header />
        
        {/* Fixed position wrapper for hamburger menu */}
        <div className="fixed top-0 right-0 z-50">
          <div 
            className={`transition-transform duration-300 ease-in-out transform origin-top-right ${
              showHamburger 
                ? 'scale-100' 
                : 'scale-0'
            }`}
          >
            <HamburgerMenu 
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
            />
          </div>
        </div>
        
        <main className="flex-grow relative z-0">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
