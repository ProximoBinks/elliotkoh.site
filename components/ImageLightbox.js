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

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Reset loaded state when image changes
    useEffect(() => {
        setLoaded(false);
    }, [currentIndex]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Close button */}
            <button
                className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors w-10 h-10 flex items-center justify-center text-3xl font-light"
                onClick={onClose}
                aria-label="Close"
            >
                &times;
            </button>

            {/* Image counter */}
            {images.length > 1 && (
                <div className="absolute top-4 left-4 z-10 text-white/50 text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* Navigation arrows */}
            {images.length > 1 && (
                <>
                    <button
                        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-full w-12 h-12 flex items-center justify-center text-2xl"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate((currentIndex - 1 + images.length) % images.length);
                        }}
                        aria-label="Previous image"
                    >
                        &#8249;
                    </button>
                    <button
                        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-full w-12 h-12 flex items-center justify-center text-2xl"
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
                className="relative max-w-[90vw] max-h-[90vh] z-[1]"
                onClick={(e) => e.stopPropagation()}
            >
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
                    className={`object-contain max-h-[90vh] w-auto rounded-lg transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
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
