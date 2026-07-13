import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ImageLightbox from '../../components/ImageLightbox';
import SEO from '../../components/SEO';
import { keyboardPosts, getKeyboardBySlug, getKeyboardImages } from '../../data/keyboards';
import { SITE_URL } from '../../lib/constants';

const DISPLAY_SIZES = '(max-width: 1296px) 100vw, 1296px';

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

  const handleLeftArrowClick = () => {
    setCurrentIndex((prev) => (prev === 0 ? display.length - 1 : prev - 1));
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prev) => (prev === display.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl relative">
      <SEO
        title={keyboard.title}
        description={keyboard.seoDescription}
        ogImage={`${SITE_URL}${display[0]}`}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Keyboards', item: `${SITE_URL}/keyboards` },
                { '@type': 'ListItem', position: 3, name: keyboard.title },
              ],
            }),
          }}
        />
      </Head>

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
            <button
              type="button"
              aria-label="View full size image"
              className="cursor-zoom-in block w-full"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={display[currentIndex]}
                alt={`${keyboard.title} ${currentIndex + 1}`}
                width={1600}
                height={1000}
                className="object-cover rounded-xl"
                sizes={DISPLAY_SIZES}
                priority={currentIndex === 0}
              />
            </button>
            {/* Warm the cache for the other carousel images without blocking render */}
            {display.length > 1 && (
              <div className="hidden" aria-hidden="true">
                {display.map((src, index) =>
                  index === currentIndex ? null : (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={1600}
                      height={1000}
                      sizes={DISPLAY_SIZES}
                      loading="eager"
                    />
                  )
                )}
              </div>
            )}
            {/* Arrows — only show if more than 1 image */}
            {display.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center z-10"
                  onClick={handleLeftArrowClick}
                >
                  &lt;
                </button>
                <button
                  type="button"
                  aria-label="Next image"
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
                <button
                  type="button"
                  key={index}
                  aria-label={`View image ${index + 1} of ${thumbs.length}`}
                  aria-current={index === currentIndex}
                  className="w-16 h-16 bg-gray-300 rounded-lg cursor-pointer"
                  onClick={() => setCurrentIndex(index)}
                >
                  <Image
                    src={thumbnail}
                    alt=""
                    width={64}
                    height={64}
                    sizes="64px"
                    className={`object-cover rounded-lg transition-opacity ${
                      index === currentIndex ? 'opacity-100' : 'opacity-50'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="px-[2%] mx-auto max-w-[1700px] mt-8 md:mt-[6.5%]">
          <div className={keyboard.videoUrl ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : ''}>
            <div>
              <h1 className="text-3xl font-extrabold lg:text-5xl lg:font-extrabold">
                {keyboard.title}
              </h1>
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
                  loading="lazy"
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
