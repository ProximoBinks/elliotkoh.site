import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '../../components/SEO';
import { keyboardPosts } from '../../data/keyboards';
import { SITE_URL } from '../../lib/constants';

const Keyboard = ({ title, description, imageSrc, imageAlt, category, href, onImageReady }) => (
  <Link href={href} passHref>
    <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 group">
      <div className="relative aspect-square">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover rounded-xl"
          loading="eager"
          onLoad={onImageReady}
          onError={onImageReady}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-5">
        <div className="transform transition-all duration-300 ease-in-out group-hover:translate-y-[-4px]">
          <h2 className="text-2xl font-bold text-white bg-black/50 rounded-lg px-3 py-2 inline-block">{title}</h2>
          <div className="mt-2">
            <span className="bg-white/20 border border-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-full">{category}</span>
          </div>
          {description && (
            <p className="text-white/90 mt-3 bg-black/40 rounded-lg px-3 py-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  </Link>
);

export default function Keyboards() {
  // Hold the grid invisible until every card image has decoded, then fade it
  // in as one unit — same pattern as the hobbies page. The aspect boxes
  // reserve the layout, so nothing shifts while we wait.
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  const handleImageReady = () => setLoadedCount((count) => count + 1);

  useEffect(() => {
    if (loadedCount >= keyboardPosts.length) setReady(true);
  }, [loadedCount]);

  // Failsafe: one stalled image must never blank the page indefinitely
  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="pb-[10%] mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl flex flex-col items-center">
      <SEO
        title="Keyboards"
        description="A collection of custom mechanical keyboards — from endgame builds to unique switches and keycap sets."
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Custom Mechanical Keyboards',
              itemListElement: keyboardPosts.map((kb, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: kb.title,
                url: `${SITE_URL}/keyboards/${kb.slug}`,
              })),
            }),
          }}
        />
      </Head>
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-left my-5">Keyboards</h1>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lowercase text-white transition-opacity duration-500 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {keyboardPosts.map((kb) => (
            <Keyboard
              key={kb.slug}
              title={kb.title}
              description=""
              category={kb.category}
              href={`/keyboards/${kb.slug}`}
              imageSrc={`${kb.folder}/${kb.prefix}-square.webp`}
              imageAlt={kb.title}
              onImageReady={handleImageReady}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
