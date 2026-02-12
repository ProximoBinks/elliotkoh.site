import { useState, useEffect, useRef } from 'react';

const AdvancedLoadingScreen = ({ onLoadComplete, criticalImages = [], minLoadTime = 2000 }) => {
  const [progress, setProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    // Check if fonts are loaded
    const checkFonts = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          setFontsLoaded(true);
        });
      } else {
        // Fallback for older browsers
        setTimeout(() => setFontsLoaded(true), 1000);
      }
    };

    checkFonts();

    // Load critical images in parallel (not sequentially)
    const loadImages = async () => {
      const totalImages = criticalImages.length;
      let completed = 0;

      const loadSingle = (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            completed++;
            setLoadedImages(completed);
            setProgress((completed / totalImages) * 90);
            resolve();
          };
          img.onerror = () => {
            completed++;
            setLoadedImages(completed);
            setProgress((completed / totalImages) * 90);
            resolve();
          };
          img.src = src;
        });

      // Load all images at once instead of one-by-one
      await Promise.all(criticalImages.map(loadSingle));

      // Wait for minimum load time to prevent flashing
      const elapsedTime = Date.now() - startTime.current;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setProgress(100);
        setIsComplete(true);
        onLoadComplete();
      }, remainingTime);
    };

    loadImages();
  }, [criticalImages, onLoadComplete, minLoadTime]);

  return (
    <div className={`fixed inset-0 bg-[#080807] flex items-center justify-center z-50 transition-opacity duration-700 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center">
        {/* Animated logo */}
        <div className="text-white text-6xl font-bold mb-8 tracking-wider animate-pulse">
          EK
        </div>
        
        {/* Loading bar with gradient */}
        <div className="w-96 h-2 bg-gray-800 rounded-full overflow-hidden mb-6 shadow-lg">
          <div 
            className="h-full bg-gradient-to-r from-[#8fb4dc] via-[#399ded] to-[#8fb4dc] transition-all duration-700 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
          </div>
        </div>
        
        {/* Loading status */}
        <div className="text-gray-400 text-sm mb-4">
          {progress < 30 ? (
            <>Preparing assets...</>
          ) : progress < 80 ? (
            <>Loading images... {loadedImages}/{criticalImages.length}</>
          ) : progress < 100 ? (
            <>Finalizing...</>
          ) : (
            'Ready'
          )}
        </div>
        
        {/* Status indicators */}
        <div className="flex justify-center space-x-4 text-xs">
          <div className={`flex items-center ${fontsLoaded ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${fontsLoaded ? 'bg-green-400' : 'bg-gray-500'}`}></div>
            Fonts
          </div>
          <div className={`flex items-center ${loadedImages === criticalImages.length ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${loadedImages === criticalImages.length ? 'bg-green-400' : 'bg-gray-500'}`}></div>
            Images
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedLoadingScreen; 