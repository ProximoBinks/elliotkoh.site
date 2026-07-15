import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '../../components/SEO';
import ImageLightbox from '../../components/ImageLightbox';
import { lillieCards } from '../../data/pokemonCards';
import { readOwned } from '../../lib/pokemonStore';

// Ownership is resolved on the server so the page arrives with unowned cards
// already greyed out — no flash of a fully-coloured grid, and client-side
// navigation waits for this data before rendering the page.
export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'no-store');
  return { props: { initialOwned: await readOwned() } };
}

const CARD_SIZES = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw';

const PokemonCard = ({ card, owned, ownedLoaded, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group text-left focus:outline-none"
    aria-label={`${card.name}, ${card.set}${ownedLoaded && !owned ? ' (not yet collected)' : ''}`}
  >
    <div
      className={`relative rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105 ${
        ownedLoaded && !owned ? 'grayscale opacity-40 group-hover:opacity-70' : 'shadow-md'
      }`}
    >
      <Image
        src={card.image}
        alt={`${card.name} — ${card.set} ${card.number}`}
        width={600}
        height={838}
        sizes={CARD_SIZES}
        className="w-full h-auto"
      />
    </div>
    <div className="mt-2 px-0.5">
      <p className="text-sm font-semibold text-gray-900 truncate normal-case">{card.name}</p>
      <p className="text-xs text-gray-500 truncate">
        {card.number} · {card.set}
      </p>
    </div>
  </button>
);

export default function PokemonCollection({ initialOwned }) {
  const [owned] = useState(() => new Set(initialOwned));
  const ownedLoaded = true;
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const primary = useMemo(() => lillieCards.filter((c) => c.kind === 'primary'), []);
  const secondary = useMemo(() => lillieCards.filter((c) => c.kind === 'secondary'), []);
  // one flat list so the lightbox can navigate across both sections
  const allCards = useMemo(() => [...primary, ...secondary], [primary, secondary]);
  const fullImages = useMemo(() => allCards.map((c) => c.imageFull), [allCards]);

  const ownedPrimary = primary.filter((c) => owned.has(c.id)).length;
  const ownedSecondary = secondary.filter((c) => owned.has(c.id)).length;

  const openLightbox = (card) => {
    setLightboxIndex(allCards.findIndex((c) => c.id === card.id));
    setLightboxOpen(true);
  };

  const renderGrid = (cards) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
      {cards.map((card) => (
        <PokemonCard
          key={card.id}
          card={card}
          owned={owned.has(card.id)}
          ownedLoaded={ownedLoaded}
          onClick={() => openLightbox(card)}
        />
      ))}
    </div>
  );

  return (
    <div className="mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl flex flex-col items-center pb-16">
      <SEO
        title="Pokémon Cards"
        description="My Lillie Pokémon card collection — tracking every Lillie card ever printed, from trainer cards to full arts."
      />
      <div className="w-full max-w-7xl">
        <Link href="/hobbies" className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors duration-200 mt-2 mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Hobbies
        </Link>

        <h1 className="text-3xl font-bold text-left my-5">Pokémon Cards</h1>
        <p className="text-gray-600 max-w-2xl">
          I&apos;m collecting every Lillie card ever printed. Cards in colour are ones I own —
          the greyed-out ones are still on the hunt list.
        </p>

        {/* Progress */}
        <div className="mt-6 mb-10 max-w-md">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-bold uppercase tracking-wide text-gray-500">Lillie cards collected</span>
            <span className="text-sm font-bold text-gray-900">
              {ownedLoaded ? `${ownedPrimary} / ${primary.length}` : `— / ${primary.length}`}
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gray-900 transition-all duration-700 ease-out"
              style={{ width: ownedLoaded ? `${(ownedPrimary / primary.length) * 100}%` : '0%' }}
            />
          </div>
        </div>

        {renderGrid(primary)}

        <h2 className="text-2xl font-bold text-left mt-14 mb-2">Cameo Appearances</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Cards where Lillie shows up in the background or artwork.
          {ownedLoaded && ` ${ownedSecondary} / ${secondary.length} collected.`}
        </p>
        {renderGrid(secondary)}

        <p className="text-xs text-gray-400 mt-12">
          Card index sourced from{' '}
          <a href="https://www.artofpkm.com/characters/274/cards" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
            artofpkm.com
          </a>
          . Pokémon and card images © Pokémon / Nintendo / Creatures / GAME FREAK.
        </p>
      </div>

      <ImageLightbox
        images={fullImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
