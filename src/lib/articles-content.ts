export type ArticleEntry = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  readTime: string;
};

export const ARTICLES: ArticleEntry[] = [
  {
    slug: 'building-a-tone-over-a-career',
    title: 'Building a Tone Over a Career: Eric Clapton, 1964–1967',
    description:
      'Three documented rigs, three years apart, from the same guitarist. What the Yardbirds, the Bluesbreakers, and Cream show about how a signal chain accumulates a personality.',
    date: '2026-07-01',
    readTime: '8 min',
  },
  {
    slug: 'the-guitar-rig-diagram-as-a-documentary-form',
    title: 'The Guitar Rig Diagram as a Documentary Form',
    description:
      'Gear lists have been drawn, photographed, and argued over for decades. A short history of how musicians and fans started documenting rigs, and why the habit stuck.',
    date: '2026-07-05',
    readTime: '9 min',
  },
  {
    slug: 'shred-signal-and-the-virtuoso-rig',
    title: 'Shred, Signal, and the Virtuoso Rig',
    description:
      'From the mid-1980s through the 2000s, a generation of technical players built rigs engineered for speed and headroom. What that era’s gear chains have in common.',
    date: '2026-07-09',
    readTime: '10 min',
  },
  {
    slug: 'rig-archaeology-and-the-ear-trained-player',
    title: 'Rig Archaeology and the Ear-Trained Player',
    description:
      'Why knowing what someone played through changes what you hear when you try to learn their part — and where gear research helps or gets in the way.',
    date: '2026-07-13',
    readTime: '8 min',
  },
  {
    slug: 'the-unsung-link',
    title: 'The Unsung Link: What Gear Lists Leave Out',
    description:
      'Guitars and amps get the credit. Power supplies, patch cables, mic placement, and room treatment do the quiet work that gear lists rarely mention.',
    date: '2026-07-17',
    readTime: '8 min',
  },
];

export function getArticle(slug: string): ArticleEntry | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
