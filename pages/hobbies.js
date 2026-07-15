import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '../components/SEO';

const HOBBIES = [
  {
    title: 'Mechanical Keyboards',
    description: 'Curating and customising mechanical keyboards for the perfect balance of sound, feel, and form.',
    category: 'Technical',
    customTitle: 'keyboards',
    imageSrc: '/images/keyboards/keyboard.webp',
    imageAlt: 'Mechanical Keyboards',
  },
  {
    title: 'Pokémon Cards',
    description: 'Collecting every Lillie card ever printed — tracking the hunt one pull at a time.',
    category: 'Recreational',
    customTitle: 'hobbies/pokemon',
    imageSrc: '/images/hobbies/pokemon-psa.webp',
    imageAlt: 'Lillie Pokémon card artwork',
  },
  {
    title: 'Collectibles',
    description: 'Collecting iconic pieces, like Pokémon cards, figures, and memorabilia that blend nostalgia with design.',
    category: 'Recreational',
    imageSrc: '/images/hobbies/cybertruck.webp',
    imageAlt: 'Collectibles',
  },
  {
    title: 'Coding',
    description: 'Building sleek, efficient software and continuously pushing boundaries in development.',
    category: 'Technical',
    imageSrc: '/images/hobbies/coding.webp',
    imageAlt: 'Coding',
  },
  {
    title: 'Desk Setup',
    description: 'Refining my workspace with high-performance peripherals and clean, intentional design.',
    category: 'Technical',
    imageSrc: '/images/hobbies/setup.webp',
    imageAlt: 'PC',
  },
  {
    title: 'Clothing Brand',
    description: 'Designing and experimenting with fashion that reflects identity, story, and cultural influence.',
    category: 'Creative',
    imageSrc: '/images/hobbies/prjctbks.webp',
    imageAlt: 'Clothing Brand',
  },
  {
    title: 'Origami',
    description: 'Turning simple paper into complex art, combining patience, precision, and creativity.',
    category: 'Creative',
    imageSrc: '/images/hobbies/origami.webp',
    imageAlt: 'Origami',
  },
];

const Hobby = ({ title, description, imageSrc, imageAlt, category, customTitle, onImageReady }) => {
  const card = (
    <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      {/* Fixed aspect box: the grid keeps its final shape before images load,
          and mixed-ratio source photos all crop to the same card size. */}
      <div className="relative aspect-[4/3] md:aspect-[5/3]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 576px"
          className="object-cover"
          loading="eager"
          onLoad={onImageReady}
          onError={onImageReady}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="mt-1 inline-block">
          <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg" style={{ textAlign: 'left' }}>{category}</span>
        </div>
        <p className="text-white mt-2">{description}</p>
      </div>
    </div>
  );

  return customTitle ? (
    <Link href={`/${customTitle}`} passHref>
      {card}
    </Link>
  ) : (
    card
  );
};

export default function Hobbies() {
  // Hold the grid invisible until every card image has decoded, then fade it
  // in as one unit — no images popping in one by one. The images are the real
  // optimized <Image> elements (no duplicate preloading), and the aspect boxes
  // already reserve the layout, so nothing shifts while we wait.
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  const handleImageReady = () => setLoadedCount((count) => count + 1);

  useEffect(() => {
    if (loadedCount >= HOBBIES.length) setReady(true);
  }, [loadedCount]);

  // Failsafe: one stalled image must never blank the page indefinitely
  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl flex flex-col items-center pb-10">
      <SEO
        title="Hobbies"
        description="Mechanical keyboards, collectibles, desk setups, coding projects, and more — a look at what I enjoy outside of work."
      />
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-left my-5">Hobbies</h1>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 lowercase text-white transition-opacity duration-500 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {HOBBIES.map((hobby) => (
            <Hobby key={hobby.title} {...hobby} onImageReady={handleImageReady} />
          ))}
        </div>
      </div>
    </div>
  );
}
