import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_LINKS = [
  { href: '/#story', label: 'Story' },
  { href: '/keyboards', label: 'Keyboards' },
  { href: '/hobbies', label: 'Hobbies' },
  { href: '/contact', label: 'Contact' },
];

// Floating pill nav shown on sub-pages once the user scrolls past the header.
// Desktop-only — mobile keeps the hamburger, which handles small widths better.
export default function GlassDock({ visible }) {
  const router = useRouter();

  const isActive = (href) =>
    href !== '/#story' && router.pathname.startsWith(href);

  return (
    <div
      className={`fixed top-5 left-1/2 z-50 hidden md:block transition-transform duration-300 ease-out ${
        visible
          ? '-translate-x-1/2 translate-y-0'
          : '-translate-x-1/2 -translate-y-24 pointer-events-none'
      }`}
    >
      <nav aria-label="Floating navigation" className="glass-dock flex items-center gap-1 rounded-full p-2">
        <Link
          href="/"
          className="px-4 py-2 rounded-full text-base font-bold text-gray-900 hover:bg-black/5 transition-colors duration-200"
        >
          Elliot
        </Link>
        <div className="w-px h-5 bg-black/10 mx-1" aria-hidden="true" />
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              isActive(href)
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-700 hover:bg-black/5 hover:text-gray-900'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
