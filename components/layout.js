import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import HamburgerMenu from './HamburgerMenu';
import AdvancedLoadingScreen from './AdvancedLoadingScreen';

const Layout = ({ children }) => {
  const [showHamburger, setShowHamburger] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Define critical images for loading
  const criticalImages = [
    '/herosquare5.webp',
    '/testimg.webp',
    '/banner.webp',
    '/hypertools.webp',
    '/specialist-plus-2.webp',
    '/alphabetsite.webp'
  ];

  // Cache detection function
  const checkImageCache = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      let resolved = false;
      
      // If image loads immediately, it's cached
      img.onload = () => {
        if (!resolved) {
          resolved = true;
          resolve(true);
        }
      };
      
      img.onerror = () => {
        if (!resolved) {
          resolved = true;
          resolve(false);
        }
      };
      
      img.src = src;
      
      // Check if image loaded synchronously (cached)
      if (img.complete) {
        resolved = true;
        resolve(true);
      }
    });
  };

  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 200);
  };

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

  // Loading screen logic
  useEffect(() => {
    const checkCacheAndLoad = async () => {
      try {
        // Check if all critical images are cached
        const cacheResults = await Promise.all(
          criticalImages.map(src => checkImageCache(src))
        );
        
        // If all images are cached, skip loading screen
        const allCached = cacheResults.every(cached => cached);
        
        if (allCached) {
          // Small delay to prevent flash
          setTimeout(() => {
            setIsLoading(false);
            setShowContent(true);
          }, 100);
        } else {
          // Show loading screen - let AdvancedLoadingScreen handle the loading
          // It will call handleLoadComplete when done
        }
      } catch (error) {
        console.warn('Cache check failed, showing loading screen');
        // If cache check fails, show loading screen
      }
    };

    checkCacheAndLoad();
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/herosquare5.webp" />
      </Head>

      {/* Advanced Loading Screen */}
      {isLoading && (
        <AdvancedLoadingScreen 
          onLoadComplete={handleLoadComplete} 
          criticalImages={criticalImages} 
          minLoadTime={1000}
        />
      )}

      {/* Main Layout */}
      <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
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
      </div>
    </>
  );
};

export default Layout;
