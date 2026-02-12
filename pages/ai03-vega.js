import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ImageLightbox from '../components/ImageLightbox';

const VegaPage = () => {
    // Small display image (fast loading)
    const displayImages = ['/images/keyboards/ai03-vega-small.webp'];

    // Full resolution image (loaded on demand in lightbox)
    const fullResImages = ['/images/keyboards/ai03-vega.webp'];

    const [lightboxOpen, setLightboxOpen] = useState(false);

    return (
        <div className="mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl relative">
            <Head>
                <title>ai03 Vega — Elliot Koh</title>
            </Head>

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
                                alt="ai03 Vega"
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
                            ai03 Vega
                        </h2>
                        <ul className="ml-4 list-disc pl-5 mt-4 lg:mt-8">
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Design by ai03 and kevinplus.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Rose gold anodized aluminum case with black bottom weight.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Lubed (205g0, dielectric grease) C3 screw-in stabilisers.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Holy Boba Switches (Halo true stem, Boba U4T Opaque Top with 62g springs. Switches lubed with Krytox 205g0 and springs lubed with Krytox 105 Oil.)
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Hotswap PCB (QMK/VIA).
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                POM Plate.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                Plate &amp; case foam.
                            </li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                                GMK Peaches n Cream R1
                            </li>
                        </ul>
                    </div>
                    <div className="relative" style={{ paddingTop: '56.25%' }}>
                        <iframe
                            src="https://www.youtube.com/embed/XrqDb7-uKL4"
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

export default VegaPage;
