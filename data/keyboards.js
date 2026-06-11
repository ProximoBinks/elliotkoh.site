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
    category: 'ergo',
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
  {
    slug: 'tgrshi',
    title: 'TGR Shi',
    category: 'end-game',
    folder: '/images/keyboards/tgrshi',
    prefix: 'shi',
    imageCount: 1,
    specs: [
      'Design by TGR.',
      'Aluminium plate.',
      'Diamond polished Cherry MX Brown switches.',
      'TX stabilisers.',
      'GMK Oni.',
    ],
    seoDescription:
      'TGR Shi with GMK Oni — featuring diamond polished Cherry MX Browns on an aluminium plate.',
    videoUrl: null,
  },
  {
    slug: 'mrsuit',
    title: 'OwLab Mr. Suit',
    category: '2022 end-game',
    folder: '/images/keyboards/mrsuit',
    prefix: 'mr-suit',
    imageCount: 1,
    specs: [
      'Design by OwLab.',
      'Babypowder Silver TKL case with all foams.',
      'POM plate with gasket socks installed, hotswap WKL PCB.',
      'Creamsicle switches (Novelkeys Cream stem, C3 Tangerine housing, 63.5g Spirit Slow Extreme springs, lubed with Krytox 205g0 and 105 oil).',
      'Durock V2 stabilisers lubed with Krytox 205g0.',
      'GMK Frost Witch.',
    ],
    seoDescription:
      'Babypowder Silver OwLab Mr. Suit TKL with GMK Frost Witch — featuring Creamsicle switches on a POM plate.',
    videoUrl: 'https://www.youtube.com/embed/n5Yr_RBdGlM',
  },
  {
    slug: 'owlab-spring',
    title: 'Owlab Spring',
    category: 're:zero build',
    folder: '/images/keyboards/owlab-spring',
    prefix: 'spring',
    imageCount: 1,
    specs: [
      'Design by Owlab.',
      'Lilac coated aluminum case with purple mirror weight bottom.',
      'Lubed (205g0, dielectric grease) TX clip-in stabilisers.',
      'Creamsicle Frankenstein Switch (C3 Tangerine Housing, 63.5g Sprit Slow Extreme Springs, Novelkeys Cream Stem) (housing and stem 205g0, 105 on the springs).',
      'Hotswap PCB (QMK/VIA).',
      'GMK Frost Witch R1.',
    ],
    seoDescription:
      'Lilac Owlab Spring with GMK Frost Witch R1 — featuring Creamsicle Frankenswitch on a hotswap PCB.',
    videoUrl: 'https://www.youtube.com/embed/2IfhuZq8n1w',
  },
  {
    slug: 'keycult-2-65',
    title: 'Keycult 2/65',
    category: 'end-game',
    folder: '/images/keyboards/keycult',
    prefix: 'keycult',
    imageCount: 8,
    specs: [
      'Design by Keycult.',
      'Ocean grey-anodized aluminum case with "Unfinish silver"-anodized bottom piece.',
      'Lubed (205g0, dielectric grease) TX clip-in stabilisers.',
      'Broken-in MX Black linear switches, with 68g springs and laserninja films, lubed (205g0) - mounted on an aluminum full plate.',
      'WT65-A PCB (QMK/VIA).',
      'GMK Shoko R2.',
    ],
    seoDescription:
      'Ocean grey Keycult 2/65 with GMK Shoko R2 — featuring lubed MX Blacks on an aluminum plate with WT65-A PCB.',
    videoUrl: 'https://www.youtube.com/embed/1sujkpKXem0',
  },
  {
    slug: 'ai03-vega',
    title: 'ai03 Vega',
    category: '2019 end-game',
    folder: '/images/keyboards/ai03-vega',
    prefix: 'vega',
    imageCount: 1,
    specs: [
      'Design by ai03 and kevinplus.',
      'Rose gold anodized aluminum case with black bottom weight.',
      'Lubed (205g0, dielectric grease) C3 screw-in stabilisers.',
      'Holy Boba Switches (Halo true stem, Boba U4T Opaque Top with 62g springs. Switches lubed with Krytox 205g0 and springs lubed with Krytox 105 Oil.)',
      'Hotswap PCB (QMK/VIA).',
      'POM Plate.',
      'Plate & case foam.',
      'GMK Peaches n Cream R1.',
    ],
    seoDescription:
      'Rose gold ai03 Vega with GMK Peaches n Cream R1 — featuring Holy Boba switches on a POM plate with hotswap PCB.',
    videoUrl: 'https://www.youtube.com/embed/XrqDb7-uKL4',
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
