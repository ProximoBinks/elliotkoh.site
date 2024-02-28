import React from 'react';
import Image from 'next/image'; // Importing Image from next/image
import Head from 'next/head';
import Link from 'next/link';

const Keyboard = ({ title, description, imageSrc, imageAlt, category, customTitle }) => {

  return (
    customTitle ? (
      <Link href={`/${customTitle}`} passHref>
        <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
          <div className="aspect-w-1 aspect-h-1">
            <Image src={imageSrc} alt={imageAlt} width={500} height={500} className="object-cover rounded-xl" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent flex flex-col justify-end p-5">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <div className="mt-1 inline-block">
              <span className="outline outline-[#ffffff] outline-[1px] text-[#ffffff] text-xs font-semibold px-2.5 py-0.5 rounded-lg" style={{ textAlign: 'left' }}>{category}</span>
            </div>
            <p className="text-white mt-2">{description}</p>
          </div>
        </div>
      </Link>
    ) : (
      <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="aspect-w-1 aspect-h-1">
          <Image src={imageSrc} alt={imageAlt} width={500} height={500} className="object-cover rounded-xl" />
        </div>
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
};

export default function Keyboards() {
  return (
    <div className="pb-[10%] mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl flex flex-col items-center">
      <Head>
        <title>Keyboards — Elliot Koh</title>
      </Head>
      <div className="max-w-8xl">
        <h1 className="text-3xl font-bold text-left my-5">Keyboards</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lowercase text-white">
          {/* Mechanical Keyboards */}
          <Keyboard
            title="want to make your own keyboard?"
            description="coming soon..."
            category="guide"
            imageSrc="/alex-keyboard.webp"
            imageAlt="Mechanical Keyboards"
            />
          <Keyboard
            title="keycult 2/65"
            description=""
            category="end-game"
            customTitle="keycult-2-65"
            imageSrc="/keycult-square.webp"
            imageAlt="Mechanical Keyboards"
            />
        </div>
      </div>
    </div>
  );
}