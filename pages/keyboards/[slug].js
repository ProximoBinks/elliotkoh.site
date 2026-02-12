import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageLightbox from '../../components/ImageLightbox';
import SEO from '../../components/SEO';
import { keyboardPosts, getKeyboardBySlug, getKeyboardImages } from '../../data/keyboards';
import { SITE_URL } from '../../lib/constants';

export async function getStaticPaths() {
  const paths = keyboardPosts.map((kb) => ({ params: { slug: kb.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const keyboard = getKeyboardBySlug(params.slug);
  if (!keyboard) return { notFound: true };

  const images = getKeyboardImages(keyboard);
  return { props: { keyboard, images } };
}

export default function KeyboardPage({ keyboard, images }) {
  const { display, full, thumbs } = images;

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

    const allImages = [...display, ...thumbs];
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
  }, [display, thumbs]);

  const handleLeftArrowClick = () => {
    setCurrentIndex((prev) => (prev === 0 ? display.length - 1 : prev - 1));
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prev) => (prev === display.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <h2 className="text-2xl font-bold mb-4">Loading {keyboard.title}</h2>
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
        title={keyboard.title}
        description={keyboard.seoDescription}
        ogImage={`${SITE_URL}${display[0]}`}
      />

      <div className="mt-[1%] mx-auto pb-[5%]">
        {/* Main Image */}
        <div className="max-w-[81rem] mx-auto">
          <div className="relative">
            <div
              className="cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={display[currentIndex]}
                alt={`${keyboard.title} ${currentIndex + 1}`}
                width={1600}
                height={1000}
                className="object-cover rounded-xl"
                priority={currentIndex === 0}
                sizes="(max-width: 1296px) 100vw, 1296px"
              />
            </div>
            {/* Arrows — only show if more than 1 image */}
            {display.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center z-10"
                  onClick={handleLeftArrowClick}
                >
                  &lt;
                </button>
                <button
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center z-10"
                  onClick={handleRightArrowClick}
                >
                  &gt;
                </button>
              </>
            )}
          </div>
          {/* Thumbnail strip — only show if more than 1 image */}
          {thumbs.length > 1 && (
            <div className="md:flex hidden justify-center mt-4 space-x-4">
              {thumbs.map((thumbnail, index) => (
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
          )}
        </div>

        {/* Description */}
        <div className="px-[2%] mx-auto max-w-[1700px] mt-8 md:mt-[6.5%]">
          <div className={keyboard.videoUrl ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : ''}>
            <div>
              <h2 className="text-3xl font-extrabold lg:text-5xl lg:font-extrabold">
                {keyboard.title}
              </h2>
              <ul className="ml-4 list-disc pl-5 mt-4 lg:mt-8">
                {keyboard.specs.map((spec, i) => (
                  <li key={i} className="text-lg md:text-xl lg:text-xl xl:text-xl mb-2">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
            {keyboard.videoUrl && (
              <div className="relative" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={keyboard.videoUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-resolution lightbox */}
      <ImageLightbox
        images={full}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </div>
  );
}
