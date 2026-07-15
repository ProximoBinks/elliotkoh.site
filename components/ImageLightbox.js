import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const ImageLightbox = ({ images, currentIndex, isOpen, onClose, onNavigate }) => {
    const [loaded, setLoaded] = useState(false);

    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft' && images.length > 1) {
            onNavigate((currentIndex - 1 + images.length) % images.length);
        }
        if (e.key === 'ArrowRight' && images.length > 1) {
            onNavigate((currentIndex + 1) % images.length);
        }
    }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Lock body scroll + signal lightbox open to header
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('lightbox-open');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('lightbox-open');
        }
        return () => {
            document.body.style.overflow = '';
            document.body.classList.remove('lightbox-open');
        };
    }, [isOpen]);

    // Reset loaded state when image changes
    useEffect(() => {
        setLoaded(false);
    }, [currentIndex]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Navigation arrows */}
            {images.length > 1 && (
                <>
                    <button
                        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 shadow-xl rounded-full w-12 h-12 flex items-center justify-center text-3xl leading-none pb-1 transition-all duration-200 hover:scale-110 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate((currentIndex - 1 + images.length) % images.length);
                        }}
                        aria-label="Previous image"
                    >
                        &#8249;
                    </button>
                    <button
                        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 shadow-xl rounded-full w-12 h-12 flex items-center justify-center text-3xl leading-none pb-1 transition-all duration-200 hover:scale-110 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate((currentIndex + 1) % images.length);
                        }}
                        aria-label="Next image"
                    >
                        &#8250;
                    </button>
                </>
            )}

            {/* Full resolution image */}
            <div
                className="relative max-w-[90vw] z-[1] cursor-default flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image counter */}
                {images.length > 1 && (
                    <div className="text-white/50 text-sm font-medium mb-2">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
                {/* Loading spinner */}
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
                <Image
                    src={images[currentIndex]}
                    alt={`Full resolution ${currentIndex + 1}`}
                    width={1920}
                    height={1280}
                    // Inline auto width/height so the rendered box always follows the
                    // loaded image's real ratio (portrait cards vs the landscape hint
                    // above), and a hard viewport cap so tall images never spill past
                    // the bottom edge — Safari clipped portrait cards without this.
                    style={{ width: 'auto', height: 'auto' }}
                    className={`object-contain max-h-[82vh] max-w-full w-auto rounded-lg transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    quality={95}
                    priority
                    onLoad={() => setLoaded(true)}
                    sizes="90vw"
                />
            </div>
        </div>
    );
};

export default ImageLightbox;
