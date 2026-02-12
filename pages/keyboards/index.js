import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '../../components/SEO';
import { keyboardPosts } from '../../data/keyboards';

const Keyboard = ({ title, description, imageSrc, imageAlt, category, href }) => (
  <Link href={href} passHref>
    <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 group">
      <div className="aspect-w-1 aspect-h-1">
        <Image src={imageSrc} alt={imageAlt} width={500} height={500} className="object-cover rounded-xl" />
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
  return (
    <div className="pb-[10%] mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl flex flex-col items-center">
      <SEO
        title="Keyboards"
        description="A collection of custom mechanical keyboards — from endgame builds to unique switches and keycap sets."
      />
      <div className="max-w-8xl">
        <h1 className="text-3xl font-bold text-left my-5">Keyboards</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lowercase text-white">
          {/* Dynamic keyboards (from data) */}
          {keyboardPosts.map((kb) => (
            <Keyboard
              key={kb.slug}
              title={kb.title}
              description=""
              category={kb.category}
              href={`/keyboards/${kb.slug}`}
              imageSrc={`${kb.folder}/${kb.prefix}-square.webp`}
              imageAlt={kb.title}
            />
          ))}
          {/* Legacy keyboards (unique pages) */}
          <Keyboard
            title="Owlab Spring"
            description=""
            category="re:zero build"
            href="/owlab-spring"
            imageSrc="/images/keyboards/spring-square.webp"
            imageAlt="Owlab Spring"
          />
          <Keyboard
            title="keycult 2/65"
            description=""
            category="end-game"
            href="/keycult-2-65"
            imageSrc="/images/keyboards/keycult-square-small.webp"
            imageAlt="Keycult 2/65"
          />
          <Keyboard
            title="ai03 vega"
            description=""
            category="2019 end-game"
            href="/ai03-vega"
            imageSrc="/images/keyboards/vega-square.webp"
            imageAlt="ai03 Vega"
          />
        </div>
      </div>
    </div>
  );
}
