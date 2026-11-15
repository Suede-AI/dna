export type ArticleEntry = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  /** ISO date of the last substantive edit; falls back to `date`. */
  modified?: string;
  readTime: string;
  /**
   * Canonical artist pages this essay links to in its body. Kept in step with
   * the essay's own links by tests/lib/artist-connections.test.ts, and used to
   * link back from each artist page to the essays that cite it.
   */
  artistSlugs?: string[];
  /**
   * Schema.org type for the page's JSON-LD. Essays default to `Article`; the
   * Suede AI field notes from West Palm Beach are `BlogPosting` and carry a
   * Palm Beach County `spatialCoverage`.
   */
  schemaType?: 'Article' | 'BlogPosting';
  /**
   * Extra Palm Beach County towns a field note is written for, added to the
   * West Palm Beach and Jupiter `spatialCoverage`. City names only, never an address.
   */
  extraCoverage?: string[];
};

export const ARTICLES: ArticleEntry[] = [
  {
    slug: 'building-a-tone-over-a-career',
    title: 'Eric Clapton Guitar Rig, 1964–1967: Building a Tone',
    description:
      'Three documented rigs, three years apart, from one guitarist. What the Yardbirds, Bluesbreakers, and Cream show about how a signal chain gains personality.',
    date: '2026-07-01',
    readTime: '8 min',
    artistSlugs: ['eric-clapton-the-yardbirds', 'eric-clapton-bluesbreakers', 'eric-clapton-cream'],
  },
  {
    slug: 'the-guitar-rig-diagram-as-a-documentary-form',
    title: 'The Guitar Rig Diagram as a Documentary Form',
    description:
      'Gear lists have been drawn, photographed, and argued over for decades. A short history of how players and fans began documenting rigs, and why it stuck.',
    date: '2026-07-05',
    readTime: '9 min',
  },
  {
    slug: 'shred-signal-and-the-virtuoso-rig',
    title: 'Shred Guitar Rigs and the Virtuoso Signal Chain',
    description:
      'From the mid-1980s through the 2000s, technical players built rigs engineered for speed and headroom. What that era’s gear chains have in common.',
    date: '2026-07-09',
    readTime: '10 min',
    artistSlugs: [
      'yngwie-malmsteen',
      'steve-vai',
      'satriani-joe',
      'ozzy-zakk-wylde',
      'jeff-beck',
      'joe-bonamassa',
      'ratm-tom-morello',
      'audioslave-tom-morello',
    ],
  },
  {
    slug: 'rig-archaeology-and-the-ear-trained-player',
    title: 'Learning Guitar by Ear with Rig Archaeology',
    description:
      'Why knowing what someone played through changes what you hear when you try to learn their part — and where gear research helps or gets in the way.',
    date: '2026-07-13',
    readTime: '8 min',
  },
  {
    slug: 'the-unsung-link',
    title: 'The Unsung Link: What Guitar Gear Lists Leave Out',
    description:
      'Guitars and amps get the credit. Power supplies, patch cables, mic placement, and room treatment do the quiet work that gear lists rarely mention.',
    date: '2026-07-17',
    readTime: '8 min',
  },
  {
    slug: 'rig-archive-structured-data-for-ai-answers',
    title: 'Rig Archive Structured Data for AI Answers',
    description:
      'How Suede AI turned 409 guitar rig diagrams into a manifest that search engines and answer engines can read, cite, and trust, built in West Palm Beach.',
    date: '2026-11-14',
    modified: '2026-11-15',
    readTime: '6 min',
    artistSlugs: ['blacksabbath-tony', 'iron-maiden-dave'],
    schemaType: 'BlogPosting',
  },
  {
    slug: 'rig-diagram-provenance-and-human-authenticity',
    title: 'Rig Diagram Provenance and Human Authenticity',
    description:
      'Jason Colapietro’s book The Human Authenticity Layer, applied to a guitar rig archive: source labels, review gates, and why unverified names stay marked.',
    date: '2026-11-14',
    modified: '2026-11-15',
    readTime: '6 min',
    artistSlugs: ['the-kinks-dave-davies'],
    schemaType: 'BlogPosting',
  },
  {
    slug: 'entity-seo-lessons-from-a-guitar-rig-archive',
    title: 'Entity SEO Lessons from a Guitar Rig Archive',
    description:
      'What a West Palm Beach team learned about entity SEO from running Suede DNA: one identity graph, honest indexing, and pages answer engines can quote.',
    date: '2026-11-14',
    modified: '2026-11-15',
    readTime: '6 min',
    schemaType: 'BlogPosting',
  },
  {
    slug: 'gain-staging-lessons-from-famous-rig-diagrams',
    title: 'Gain Staging Lessons from Famous Guitar Rig Diagrams',
    description:
      'Where famous guitar tones clip, read from five rig diagrams in the Suede DNA archive: amp as gain stage, treble boosters, fuzz order, and high-gain amps.',
    date: '2026-11-15',
    readTime: '6 min',
    artistSlugs: [
      'eric-clapton-bluesbreakers',
      'blacksabbath-tony',
      'may-brian',
      'hendrix-jimi',
      'vanhalen-eddie',
    ],
    schemaType: 'BlogPosting',
  },
  {
    slug: 'verifying-a-rig-diagram-before-you-cite-it',
    title: 'Verify a Rig Diagram Before You Cite It: Checklist',
    description:
      'A seven-step provenance checklist for a Boca Raton researcher citing a guitar rig diagram: original file, filename year, reviewed name, second source.',
    date: '2026-11-15',
    readTime: '6 min',
    artistSlugs: ['the-kinks-dave-davies', 'nirvana-kurt'],
    schemaType: 'BlogPosting',
    extraCoverage: ['Boca Raton'],
  },
];

export function getArticle(slug: string): ArticleEntry | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
