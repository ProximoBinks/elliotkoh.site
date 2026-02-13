import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageLightbox from '../components/ImageLightbox';
import SEO from '../components/SEO';

const SpringPage = () => {
    // Small display image (fast loading)
    const displayImages = ['/images/keyboards/spring-small.webp'];

    // Full resolution image (loaded on demand in lightbox)
    const fullResImages = ['/images/keyboards/spring.webp'];

    const [lightboxOpen, setLightboxOpen] = useState(false);

    return (
        <div className="mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl relative">
            <SEO
                title="Owlab Spring"
                description="Lilac Owlab Spring with GMK Frost Witch R1 — featuring Creamsicle Frankenswitch on a hotswap PCB."
                ogImage="https://elliotkoh.dev/images/keyboards/spring-small.webp"
            />

            <Link href="/keyboards" className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors duration-200 mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Keyboards
            </Link>

            <div className="mt-[1%] mx-auto pb-[5%]">
                {/* Main Image */}
                <div className="max-w-[81rem] mx-auto">
                    <div className="relative">
                        <div
                            className="cursor-zoom-in"
                            onClick={() => setLightboxOpen(true)}
                        >
                            <Image
                                src={displayImages[0]}
                                alt="Owlab Spring"
                                width={1600}
                                height={1000}
                                className="object-cover rounded-xl"
                                priority
                                sizes="(max-width: 1296px) 100vw, 1296px"
                            />
                        </div>
                    </div>
                </div>

                {/* Description and Video */}
                <div className="px-[2%] mx-auto max-w-[1700px] grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 md:mt-[6.5%]">
                    <div>
                        <h2 className="text-3xl font-extrabold lg:text-5xl lg:font-extrabold">
                            Owlab Spring
                        </h2>
                        <ul className="ml-4 list-disc pl-5 mt-4 lg:mt-8">
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Design by Owlab.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Lilac coated aluminum case with purple mirror weight bottom.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Lubed (205g0, dielectric grease) TX clip-in stabilisers.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Creamsicle Frankenstein Switch (C3 Tangerine Housing, 63.5g Sprit Slow Extreme Springs, Novelkeys Cream Stem) (housing and stem 205g0, 105 on the springs)
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Hotswap PCB (QMK/VIA).
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                GMK Frost Witch R1
                            </li>
                        </ul>
                    </div>
                    <div className="relative" style={{ paddingTop: '56.25%' }}>
                        <iframe
                            src="https://www.youtube.com/embed/2IfhuZq8n1w"
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
                currentIndex={0}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                onNavigate={() => {}}
            />
        </div>
    );
};

export default SpringPage;
