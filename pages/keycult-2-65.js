import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

const KeycultPage = () => {
    // Function to generate image URLs dynamically
    const getMainImageUrl = (index) => `/keycult${index}.jpg`;
    const getThumbnailUrl = (index) => `/thumb-keycult-${index}.webp`;

    // State to keep track of current image index
    const [currentIndex, setCurrentIndex] = useState(1); // Starting with keycult-1.jpg

    // Function to handle clicking on thumbnail
    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    // Function to handle clicking on left arrow
    const handleLeftArrowClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 1 ? 8 : prevIndex - 1)); // Loop to the last image if at the beginning
    };

    // Function to handle clicking on right arrow
    const handleRightArrowClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 8 ? 1 : prevIndex + 1)); // Loop to the first image if at the end
    };

    return (
        <div className="mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl relative">
            <Head>
                <title>Keycult 2-65</title>
                {/* Preload all main images from keycult1.jpg to keycult8.jpg */}
                {Array.from({ length: 8 }, (_, i) => (
                    <link key={i} rel="preload" as="image" href={getMainImageUrl(i + 1)} />
                ))}
            </Head>
            {/* Image Carousel */}
            <div className="mt-[1%] mx-auto pb-[5%]">
                {/* Main Image */}
                <div className="max-w-[81rem] mx-auto">
                    <div className="relative">
                        <Image
                            src={getMainImageUrl(currentIndex)} // Displaying the current main image
                            alt={`Keycult ${currentIndex}`}
                            width={1600}
                            height={1000}
                            className="object-cover rounded-xl"
                        />
                        {/* Left Arrow */}
                        <button className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center z-10" onClick={handleLeftArrowClick}>
                            &lt;
                        </button>
                        {/* Right Arrow */}
                        <button className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center z-10" onClick={handleRightArrowClick}>
                            &gt;
                        </button>
                    </div>
                    {/* Image Previews */}
                    <div className="md:flex hidden justify-center mt-4 space-x-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                            <div key={index} className="w-16 h-16 bg-gray-300 rounded-lg cursor-pointer" onClick={() => handleThumbnailClick(index)}>
                                <Image
                                    src={getThumbnailUrl(index)} // Displaying corresponding thumbnail images
                                    alt={`Thumbnail ${index}`}
                                    width={64}
                                    height={64}
                                    className={`object-cover rounded-lg ${index === currentIndex ? 'opacity-100' : 'opacity-50'}`} // Change opacity for active and inactive thumbnails
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Description and Video */}
                <div className="px-[2%] mx-auto max-w-[1700px] grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 md:mt-[6.5%]">
                    {/* Description */}
                    <div>
                        <h2 className="text-3xl font-extrabold lg:text-5xl lg:font-extrabold">Keycult 2-65</h2>
                        <ul className="ml-4 list-disc pl-5 mt-4 lg:mt-8">
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">Design by Keycult.</li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">Ocean grey-anodized aluminum case with "Unfinish silver"-anodized bottom piece.</li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">Lubed (205g0, dielectric grease) TX clip-in stabilisers.</li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">Broken-in MX Black linear switches, with 68g springs and laserninja films, Lubed (205g0) - mounted on an aluminum full plate.</li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">WT65-A PCB (QMK/VIA).</li>
                            <li className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">GMK Shoko R2</li>
                        </ul>
                    </div>
                    {/* YouTube Video */}
                    <div className="relative" style={{ paddingTop: '56.25%' }}>
                        <iframe
                            src="https://www.youtube.com/embed/1sujkpKXem0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full rounded-xl"
                            style={{ width: '100%', height: '100%', position: 'absolute' }}
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default KeycultPage;