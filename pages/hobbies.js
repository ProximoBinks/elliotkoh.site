import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

const Hobby = ({ title, description, imageSrc, imageAlt, category, customTitle }) => (
  customTitle ? (
    <Link href={`/${customTitle}`} passHref>
      <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
        <Image src={imageSrc} alt={imageAlt} width={500} height={300} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <div className="mt-1 inline-block">
            <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg" style={{ textAlign: 'left' }}>{category}</span>
          </div>
          <p className="text-white mt-2">{description}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      <Image src={imageSrc} alt={imageAlt} width={500} height={300} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="mt-1 inline-block">
          <span className="outline outline-[#8fb4dc] outline-[1px] text-[#8fb4dc] text-xs font-semibold px-2.5 py-0.5 rounded-lg" style={{ textAlign: 'left' }}>{category}</span>
        </div>
        <p className="text-white mt-2">{description}</p>
      </div>
    </div>
  )
);

export default function Hobbies() {
  return (
    <div className="mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl flex flex-col items-center pb-10">
      <Head>
        <title>Hobbies — Elliot Koh</title>
      </Head>
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-left my-5">Hobbies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lowercase text-white">
          {/* Mechanical Keyboards */}
          <Hobby
            title="Mechanical Keyboards"
            description="Curating and customising mechanical keyboards for the perfect balance of sound, feel, and form."
            category="Technical"
            customTitle="keyboards"
            imageSrc="/keyboard.jpg"
            imageAlt="Mechanical Keyboards"
          />

          <Hobby
            title="Collectibles"
            description="Collecting iconic pieces—Pokémon cards, figures, and memorabilia that blend nostalgia with design."
            category="Recreational"
            imageSrc="/cybertruck.jpg"
            imageAlt="Collectibles"
          />

          <Hobby
            title="Coding"
            description="Building sleek, efficient software and continuously pushing boundaries in development."
            category="Technical"
            imageSrc="/coding.webp"
            imageAlt="Coding"
          />

          <Hobby
            title="Desk Setup"
            description="Refining my workspace with high-performance peripherals and clean, intentional design."
            category="Technical"
            imageSrc="/setup.webp"
            imageAlt="PC"
          />

          <Hobby
            title="Clothing Brand"
            description="Designing and experimenting with fashion that reflects identity, story, and cultural influence."
            category="Creative"
            imageSrc="/prjctbks.jpg"
            imageAlt="Clothing Brand"
          />

          <Hobby
            title="Origami"
            description="Turning simple paper into complex art—combining patience, precision, and creativity."
            category="Creative"
            imageSrc="/origami.jpg"
            imageAlt="Origami"
          />
        </div>
      </div>
    </div>
  );
}