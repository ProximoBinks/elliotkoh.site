import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageLightbox from '../components/ImageLightbox';
import SEO from '../components/SEO';

const KeycultPage = () => {
    // Small display images (fast loading)
    const displayImages = [
        '/images/keyboards/keycult1-small.webp',
        '/images/keyboards/keycult2-small.webp',
        '/images/keyboards/keycult3-small.webp',
        '/images/keyboards/keycult4-small.webp',
        '/images/keyboards/keycult5-small.webp',
        '/images/keyboards/keycult6-small.webp',
        '/images/keyboards/keycult7-small.webp',
        '/images/keyboards/keycult8-small.webp',
    ];

    // Full resolution images (loaded on demand in lightbox)
    const fullResImages = [
        '/images/keyboards/keycult1.webp',
        '/images/keyboards/keycult2.webp',
        '/images/keyboards/keycult3.webp',
        '/images/keyboards/keycult4.webp',
        '/images/keyboards/keycult5.webp',
        '/images/keyboards/keycult6.webp',
        '/images/keyboards/keycult7.webp',
        '/images/keyboards/keycult8.webp',
    ];

    // Thumbnail image URLs
    const thumbnails = [
        '/images/keyboards/thumb-keycult-1.webp',
        '/images/keyboards/thumb-keycult-2.webp',
        '/images/keyboards/thumb-keycult-3.webp',
        '/images/keyboards/thumb-keycult-4.webp',
        '/images/keyboards/thumb-keycult-5.webp',
        '/images/keyboards/thumb-keycult-6.webp',
        '/images/keyboards/thumb-keycult-7.webp',
        '/images/keyboards/thumb-keycult-8.webp',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Preload all small display images + thumbnails (not full-res lightbox images)
    useEffect(() => {
        if (typeof window === 'undefined') {
            setLoading(false);
            return;
        }

        const allImages = [...displayImages, ...thumbnails];
        const totalImages = allImages.length;
        let loadedCount = 0;

        const handleImageLoad = () => {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
            if (loadedCount === totalImages) {
                setLoading(false);
            }
        };

        allImages.forEach((src) => {
            const img = new window.Image();
            img.onload = handleImageLoad;
            img.onerror = handleImageLoad;
            img.src = src;
        });
    }, []);

    const handleLeftArrowClick = () => {
        setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
    };

    const handleRightArrowClick = () => {
        setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-white">
                <h2 className="text-2xl font-bold mb-4">Loading Keycult Gallery</h2>
                <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gray-800 transition-all duration-300 ease-out"
                        style={{ width: `${loadingProgress}%` }}
                    />
                </div>
                <p className="mt-2 text-sm text-gray-400">{loadingProgress}%</p>
            </div>
        );
    }

    return (
        <div className="mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl relative">
            <SEO
                title="Keycult 2/65"
                description="Ocean grey Keycult 2/65 with GMK Shoko R2 — featuring lubed MX Blacks on an aluminum plate with WT65-A PCB."
                ogImage="https://elliotkoh.dev/images/keyboards/keycult1-small.webp"
            />

            {/* Image Carousel */}
            <div className="mt-[1%] mx-auto pb-[5%]">
                {/* Main Image */}
                <div className="max-w-[81rem] mx-auto">
                    <div className="relative">
                        <div
                            className="cursor-zoom-in"
                            onClick={() => setLightboxOpen(true)}
                        >
                            <Image
                                src={displayImages[currentIndex]}
                                alt={`Keycult ${currentIndex + 1}`}
                                width={1600}
                                height={1000}
                                className="object-cover rounded-xl"
                                priority={currentIndex === 0}
                                sizes="(max-width: 1296px) 100vw, 1296px"
                            />
                        </div>
                        {/* Left Arrow */}
                        <button
                            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center z-10"
                            onClick={handleLeftArrowClick}
                        >
                            &lt;
                        </button>
                        {/* Right Arrow */}
                        <button
                            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center z-10"
                            onClick={handleRightArrowClick}
                        >
                            &gt;
                        </button>
                    </div>
                    {/* Image Previews */}
                    <div className="md:flex hidden justify-center mt-4 space-x-4">
                        {thumbnails.map((thumbnail, index) => (
                            <div
                                key={index}
                                className="w-16 h-16 bg-gray-300 rounded-lg cursor-pointer"
                                onClick={() => setCurrentIndex(index)}
                            >
                                <Image
                                    src={thumbnail}
                                    alt={`Thumbnail ${index + 1}`}
                                    width={64}
                                    height={64}
                                    className={`object-cover rounded-lg transition-opacity ${
                                        index === currentIndex ? 'opacity-100' : 'opacity-50'
                                    }`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description and Video */}
                <div className="px-[2%] mx-auto max-w-[1700px] grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 md:mt-[6.5%]">
                    <div>
                        <h2 className="text-3xl font-extrabold lg:text-5xl lg:font-extrabold">
                            Keycult 2-65
                        </h2>
                        <ul className="ml-4 list-disc pl-5 mt-4 lg:mt-8">
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Design by Keycult.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Ocean grey-anodized aluminum case with &quot;Unfinish silver&quot;-anodized bottom piece.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Lubed (205g0, dielectric grease) TX clip-in stabilisers.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Broken-in MX Black linear switches, with 68g springs and laserninja films,
                                lubed (205g0) - mounted on an aluminum full plate.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                WT65-A PCB (QMK/VIA).
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                GMK Shoko R2
                            </li>
                        </ul>
                    </div>
                    <div className="relative" style={{ paddingTop: '56.25%' }}>
                        <iframe
                            src="https://www.youtube.com/embed/1sujkpKXem0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full rounded-xl"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Full-resolution lightbox */}
            <ImageLightbox
                images={fullResImages}
                currentIndex={currentIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                onNavigate={setCurrentIndex}
            />
        </div>
    );
};

export default KeycultPage;
