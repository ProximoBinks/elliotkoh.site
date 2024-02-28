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
            description="Exploring the tactile and auditory pleasure of custom mechanical keyboards."
            category="Technical"
            customTitle="keyboards"
            imageSrc="/keyboard.webp"
            imageAlt="Mechanical Keyboards"
          />
          {/* Collectibles */}
          <Hobby
            title="Collectibles"
            description="Collecting a variety of items including Pokémon cards, figurines, and other memorabilia to cherish and appreciate."
            category="Recreational"
            imageSrc="/cybertruck.webp"
            imageAlt="Collectibles"
          />
          {/* Clothing Brand */}
          <Hobby
            title="Clothing Brand"
            description="Designing unique pieces that express personal style and creativity."
            category="Creative"
            imageSrc="/prjctbks.webp"
            imageAlt="Clothing Brand"
          />
          {/* Origami */}
          <Hobby
            title="Origami"
            description="Folding paper to create intricate designs and bring imagination to life."
            category="Creative"
            imageSrc="/origami.webp"
            imageAlt="Origami"
          />
          {/* Coding */}
          <Hobby
            title="Coding"
            description="Developing software solutions and exploring new technologies."
            category="Technical"
            imageSrc="/coding.webp"
            imageAlt="Coding"
          />
        </div>
      </div>
    </div>
  );
}