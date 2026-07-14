import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import HamburgerMenu from './HamburgerMenu';
import GlassDock from './GlassDock';
import AdvancedLoadingScreen from './AdvancedLoadingScreen';

// Only gate on the shared hero background — it's the LCP element and the one
// image referenced by its raw URL (CSS background). Page content images go
// through next/image with their own priority/lazy loading, so preloading raw
// copies here would just download everything twice.
const criticalImages = ['/images/hero/herosquare5.webp'];

const Layout = ({ children }) => {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

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
    try {
      sessionStorage.setItem('ek-loaded', '1');
    } catch (e) { /* private browsing — overlay will just show again next time */ }
    setIsLoading(false);
    setShowContent(true);
  };

  useEffect(() => {
    // Check if the device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsMobile(isIOS);

    const handleScroll = () => {
      // Home: floating nav only appears once the tall hero is mostly gone.
      // Sub-pages: appear as soon as the in-flow header scrolls out of view.
      const threshold = isHome ? window.innerHeight * 0.9 : 150;

      const shouldShowFloatingNav = window.scrollY > threshold;
      setShowFloatingNav(shouldShowFloatingNav);

      // Close menu if hamburger is hidden
      if (!shouldShowFloatingNav && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen, isHome]);

  // Loading screen logic - re-run when route changes
  useEffect(() => {
    if (!router.isReady) return;

    // Only show the loading screen on the first visit of a browser session
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem('ek-loaded') === '1';
    } catch (e) { /* sessionStorage unavailable — fall through to cache check */ }

    if (alreadySeen) {
      setIsLoading(false);
      setShowContent(true);
      return;
    }

    const checkCacheAndLoad = async () => {
      try {
        // Check if all critical images are cached
        const cacheResults = await Promise.all(
          criticalImages.map(src => checkImageCache(src))
        );

        // If all images are cached, skip loading screen
        const allCached = cacheResults.every(cached => cached);

        if (allCached) {
          try {
            sessionStorage.setItem('ek-loaded', '1');
          } catch (e) { /* ignore */ }
          // Small delay to prevent flash
          setTimeout(() => {
            setIsLoading(false);
            setShowContent(true);
          }, 100);
        } else {
          // Images need to load, show loading screen
          setIsLoading(true);
          setShowContent(false);
        }
      } catch (error) {
        console.warn('Cache check failed, showing loading screen');
        // If cache check fails, show loading screen
        setIsLoading(true);
        setShowContent(false);
      }
    };

    checkCacheAndLoad();
  }, [router.isReady, router.pathname]);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/images/hero/herosquare5.webp" />
      </Head>

      {/* Advanced Loading Screen */}
      {isLoading && (
        <AdvancedLoadingScreen 
          onLoadComplete={handleLoadComplete} 
          criticalImages={criticalImages} 
          minLoadTime={300}
        />
      )}

      {/* Main Layout */}
      <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Fixed position background for iOS */}
        {isMobile && (
          <div 
            className="fixed inset-0 z-[-1]"
            style={{
              backgroundImage: 'url(/images/hero/herosquare5.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
        <div 
          className="flex flex-col min-h-screen overflow-x-hidden relative"
          style={isMobile ? {} : {
            backgroundImage: 'url(/images/hero/herosquare5.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <Header />

          {/* Sub-pages get a floating glass dock on desktop instead of the hamburger */}
          {!isHome && <GlassDock visible={showFloatingNav} />}

          {/* Fixed position wrapper for hamburger menu — on sub-pages the dock
              takes over on md+ screens, so the hamburger stays mobile-only there */}
          <div className={`fixed top-0 right-0 z-50 ${isHome ? '' : 'md:hidden'}`}>
            <div
              className={`transition-transform duration-300 ease-in-out transform origin-top-right ${
                showFloatingNav
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
