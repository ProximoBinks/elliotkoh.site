/**
 * Dynamic keyboard posts.
 *
 * To add a new keyboard:
 *  1. Create a folder under public/images/keyboards/<folder>/
 *  2. Add images following the naming convention:
 *     - <prefix>-<n>.webp          (full resolution)
 *     - <prefix>-<n>-small.webp    (display / carousel)
 *     - <prefix>-<n>-thumb.webp    (thumbnail strip)
 *     - <prefix>-square.webp       (listing page card)
 *  3. Add an entry below.
 */

export const keyboardPosts = [
  {
    slug: 'owlab-spring-2',
    title: 'Owlab Spring #2',
    category: 'end-game',
    folder: '/images/keyboards/owlab-spring-2',
    prefix: 'spring',
    imageCount: 5,
    specs: [
      'Design by Owlab.',
      'Lilac coated aluminum case with mirror purple finish weight.',
      'Creamsicle switches (Novelkeys Cream stem, C3 Tangerine housing, lubed with 205g0, 63.5g Sprit Slow Extreme II springs).',
      'GMK Analog Dreams.',
      'Artisans: Rubrehose BBW, Rubrehose 1.25u Gummy.',
    ],
    seoDescription:
      'Lilac Owlab Spring with GMK Analog Dreams — featuring Creamsicle switches and Rubrehose artisans.',
    videoUrl: null,
  },
  {
    slug: 'think65v2',
    title: 'Think6.5 V2',
    category: 'build',
    folder: '/images/keyboards/think65v2',
    prefix: 'think65v2',
    imageCount: 1,
    specs: [
      'Think6.5 V2 — 2U polycarbonate top, aluminium bottom (hotswap PCB).',
      'FR4 plate with gaskets installed, plate foam and case insulation.',
      'Ultraglide Cherry MX Black switches (320k+ actuations) with 63.5g Spirit Slow springs, lubed with Krytox 205g0 and 105 oil. BCP spacebar.',
      'Durock V2 stabilisers lubed with Krytox 205g0.',
      'GMK Frost Witch.',
    ],
    seoDescription:
      'Polycarbonate Think6.5 V2 with GMK Frost Witch — featuring broken-in Ultraglide MX Blacks on an FR4 plate.',
    videoUrl: null,
  },
  {
    slug: 'neo60',
    title: 'Qwertykeys Neo60',
    category: 'budget build',
    folder: '/images/keyboards/neo60',
    prefix: 'neo60',
    imageCount: 3,
    specs: [
      'Design by Qwertykeys.',
      'Anodised grey coat with silver weight.',
      'HMX Cheese switches.',
      'GMK Modern Dolch 2 (Base kit, Command kit).',
    ],
    seoDescription:
      'Anodised grey Qwertykeys Neo60 with GMK Modern Dolch 2 — featuring HMX Cheese switches.',
    videoUrl: null,
  },
  {
    slug: 'unikorn',
    title: 'TGR x Singa Unikorn',
    category: 'end-game',
    folder: '/images/keyboards/unikorn',
    prefix: 'unikorn',
    imageCount: 5,
    specs: [
      'Design by TGR x Singa.',
      'Berlin Blue case with copper weight (signed by Elaine).',
      'Diamond polished MX Black switches.',
      'GMK Oni (Base kit, Novelties).',
      'Artisans: Keyby OG, SM Bang Bowsette Coco.',
    ],
    seoDescription:
      'Berlin Blue TGR x Singa Unikorn R2.2 with GMK Oni — featuring diamond polished MX Blacks and a signed copper weight.',
    videoUrl: null,
  },
];

/** Look up a single keyboard by its URL slug. */
export function getKeyboardBySlug(slug) {
  return keyboardPosts.find((kb) => kb.slug === slug) || null;
}

/** Generate image arrays from a keyboard entry. */
export function getKeyboardImages(kb) {
  const display = [];
  const full = [];
  const thumbs = [];

  for (let i = 1; i <= kb.imageCount; i++) {
    display.push(`${kb.folder}/${kb.prefix}-${i}-small.webp`);
    full.push(`${kb.folder}/${kb.prefix}-${i}.webp`);
    thumbs.push(`${kb.folder}/${kb.prefix}-${i}-thumb.webp`);
  }

  return { display, full, thumbs };
}
