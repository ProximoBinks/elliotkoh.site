import React, { useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { lillieCards } from '../data/pokemonCards';

const CARD_SIZES = '(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 15vw';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [owned, setOwned] = useState(new Set());
  const [status, setStatus] = useState('idle'); // idle | saving | saved | error
  const [errorMsg, setErrorMsg] = useState('');
  const saveTimer = useRef(null);

  const primary = useMemo(() => lillieCards.filter((c) => c.kind === 'primary'), []);
  const secondary = useMemo(() => lillieCards.filter((c) => c.kind === 'secondary'), []);

  useEffect(() => {
    fetch('/api/pokemon/owned')
      .then((res) => res.json())
      .then((data) => setOwned(new Set(data.owned || [])))
      .catch(() => {});
    try {
      const saved = sessionStorage.getItem('ek-admin-pw');
      if (saved) {
        setPassword(saved);
        setUnlocked(true);
      }
    } catch { /* private browsing */ }
  }, []);

  const save = (nextOwned, pw) => {
    // Debounce so rapid toggling sends one request, not one per click
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setStatus('saving');
    saveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/pokemon/owned', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': pw },
          body: JSON.stringify({ owned: [...nextOwned] }),
        });
        if (res.status === 401) {
          setUnlocked(false);
          setErrorMsg('Wrong password');
          setStatus('error');
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setErrorMsg(data.error || `Save failed (${res.status})`);
          setStatus('error');
          return;
        }
        setStatus('saved');
      } catch {
        setErrorMsg('Network error — change not saved');
        setStatus('error');
      }
    }, 600);
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    // Verify by writing the current list back — a no-op when correct
    const res = await fetch('/api/pokemon/owned', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ owned: [...owned] }),
    });
    if (res.ok) {
      setUnlocked(true);
      try { sessionStorage.setItem('ek-admin-pw', password); } catch { /* ignore */ }
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error || 'Wrong password');
    }
  };

  const toggle = (id) => {
    const next = new Set(owned);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOwned(next);
    save(next, password);
  };

  const renderGrid = (cards) => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
      {cards.map((card) => {
        const isOwned = owned.has(card.id);
        return (
          <button
            type="button"
            key={card.id}
            onClick={() => toggle(card.id)}
            aria-pressed={isOwned}
            className="group text-left focus:outline-none"
          >
            <div
              className={`relative rounded-lg overflow-hidden transition-all duration-200 ${
                isOwned ? 'ring-2 ring-green-500 shadow-md' : 'grayscale opacity-40 group-hover:opacity-70'
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
              {isOwned && (
                <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold shadow">
                  ✓
                </div>
              )}
            </div>
            <p className="mt-1 text-[11px] leading-tight text-gray-600 truncate">
              {card.number} · {card.set}
            </p>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="mt-[5rem] xl:mt-[10rem] mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded-t-3xl flex flex-col items-center pb-16 min-h-[60vh]">
      <Head>
        <title>Admin — Collection Manager</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="w-full max-w-6xl">
        {!unlocked ? (
          <form onSubmit={handleUnlock} className="max-w-sm mx-auto mt-16 mb-24 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Admin</h1>
            <p className="text-gray-600 text-sm">Enter the admin password to manage the card collection.</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            {errorMsg && <p className="text-red-600 text-sm font-semibold">{errorMsg}</p>}
            <button
              type="submit"
              className="bg-gray-900 text-white font-semibold rounded-lg px-4 py-2.5 hover:bg-gray-700 transition-colors"
            >
              Unlock
            </button>
          </form>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 my-5">
              <h1 className="text-3xl font-bold">Lillie Collection Manager</h1>
              <div className="flex items-center gap-4">
                <span
                  className={`text-sm font-semibold ${
                    status === 'error' ? 'text-red-600' : status === 'saving' ? 'text-amber-600' : 'text-green-600'
                  }`}
                >
                  {status === 'saving' && 'Saving…'}
                  {status === 'saved' && 'Saved ✓'}
                  {status === 'error' && errorMsg}
                </span>
                <span className="text-sm font-bold text-gray-500">
                  {[...owned].length} / {lillieCards.length} owned
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-8">
              Tap a card to toggle it between owned (colour, green tick) and missing (greyed out).
              Changes save automatically and show up on the public page immediately.
            </p>

            <h2 className="text-xl font-bold mb-4">Lillie Cards ({primary.filter((c) => owned.has(c.id)).length}/{primary.length})</h2>
            {renderGrid(primary)}

            <h2 className="text-xl font-bold mt-12 mb-4">Cameo Appearances ({secondary.filter((c) => owned.has(c.id)).length}/{secondary.length})</h2>
            {renderGrid(secondary)}
          </>
        )}
      </div>
    </div>
  );
}
