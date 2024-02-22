import React from 'react';
import Image from 'next/image';
import Head from 'next/head';

export default function Hobbies() {
  return (    
    <div className="mt-[100px] max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <Head>
        <title>Hobbies — Elliot Koh</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-12">My Hobbies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mechanical Keyboards */}
        <div className="shadow-lg rounded-lg overflow-hidden">
          <Image src="/mechanical-keyboards.jpg" alt="Mechanical Keyboards" width={500} height={300} objectFit="cover" />
          <div className="p-5">
            <h2 className="text-2xl font-bold">Mechanical Keyboards</h2>
            <p className="mt-2">Exploring the tactile and auditory pleasure of custom mechanical keyboards.</p>
          </div>
        </div>

        {/* Clothing Brand */}
        <div className="shadow-lg rounded-lg overflow-hidden">
          <Image src="/clothing-brand.jpg" alt="Clothing Brand" width={500} height={300} objectFit="cover" />
          <div className="p-5">
            <h2 className="text-2xl font-bold">Clothing Brand</h2>
            <p className="mt-2">Designing unique pieces that express personal style and creativity.</p>
          </div>
        </div>

        {/* Origami */}
        <div className="shadow-lg rounded-lg overflow-hidden">
          <Image src="/origami.jpg" alt="Origami" width={500} height={300} objectFit="cover" />
          <div className="p-5">
            <h2 className="text-2xl font-bold">Origami</h2>
            <p className="mt-2">Folding paper to create intricate designs and bring imagination to life.</p>
          </div>
        </div>
      </div>
    </div>
  );
}