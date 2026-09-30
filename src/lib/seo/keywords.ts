import type { Artist } from '../manifest';
import { CURATED_NAME_SEPARATOR } from '../canonical-artists';

/**
 * Per-route <meta name="keywords"> lists. In the Next App Router a child
 * route's `keywords` replaces its parent's, so every list is complete on its
 * own. Terms describe what each page actually covers; brand terms are appended
 * by `keywordsFor` with a case-insensitive dedupe.
 */
export const BRAND_KEYWORDS: readonly string[] = ['Suede DNA', 'Suede AI'];

export const ROUTE_KEYWORDS = {
  '/': [
    'guitar rigs',
    'guitar rig archive',
    'guitarist gear',
    'signal chains',
    'guitar signal chain',
    'guitar effects chains',
    'guitar rig diagrams',
    'Guitar Geek archives',
    'vintage guitar rigs',
    'guitar tone archive',
  ],
  '/about': [
    'about Suede DNA',
    'guitar rig archive',
    'Guitar Geek archives',
    'Internet Archive guitar rigs',
    'guitar rig diagrams',
    'musician gear documentation',
  ],
  '/articles': [
    'guitar rig history',
    'guitar tone history',
    'signal chain essays',
    'guitar gear articles',
    'guitarist gear',
  ],
  '/articles/building-a-tone-over-a-career': [
    'Eric Clapton guitar rig',
    'Eric Clapton gear',
    'Yardbirds guitar gear',
    'Bluesbreakers Clapton tone',
    'Cream guitar rig',
    'guitar tone evolution',
    'signal chains',
  ],
  '/articles/the-guitar-rig-diagram-as-a-documentary-form': [
    'guitar rig diagram',
    'guitar gear lists',
    'rig rundown history',
    'guitar rig documentation',
    'Guitar Geek archives',
  ],
  '/articles/shred-signal-and-the-virtuoso-rig': [
    'shred guitar rig',
    'shred guitar gear',
    'virtuoso guitarist gear',
    '1980s guitar rigs',
    'high gain guitar signal chain',
  ],
  '/articles/rig-archaeology-and-the-ear-trained-player': [
    'learning guitar by ear',
    'ear training guitar',
    'guitar tone matching',
    'guitar gear research',
    'guitarist gear',
  ],
  '/articles/the-unsung-link': [
    'guitar pedal power supply',
    'isolated pedal power',
    'patch cables',
    'guitar amp mic placement',
    'guitar signal chain',
    'gear lists',
  ],
  '/docs': [
    'Suede DNA docs',
    'guitar rig archive',
    'rig search',
    'manifest pipeline',
    'Guitar Geek archives',
  ],
  '/docs/faq': [
    'Suede DNA FAQ',
    'guitar rig archive coverage',
    'rig corrections',
    'rig image rights',
    'Guitar Geek archives',
  ],
  '/docs/what-is-suede-dna': [
    'what is Suede DNA',
    'guitar signal chain',
    'guitarist rigs over time',
    'tonal DNA',
    'guitar rig archive',
  ],
  '/docs/sourcing-and-verification': [
    'guitar rig sources',
    'Guitar Geek archives',
    'Internet Archive guitar rigs',
    'rig manifest verification',
    'guitar rig diagrams',
  ],
  '/docs/search-and-filters': [
    'search guitar rigs',
    'guitar rigs by year',
    'guitar rigs by decade',
    'guitarist search',
    'rig filters',
  ],
} as const satisfies Record<string, readonly string[]>;

export type KeywordRoute = keyof typeof ROUTE_KEYWORDS;

export function withBrand(terms: readonly string[]): string[] {
  const seen = new Set<string>();
  return [...terms, ...BRAND_KEYWORDS].filter((term) => {
    const key = term.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function keywordsFor(route: KeywordRoute): string[] {
  return withBrand(ROUTE_KEYWORDS[route]);
}

/** Artist pages: terms built from the curated display name and its years. */
export function artistKeywords(artist: Pick<Artist, 'name'>): string[] {
  const i = artist.name.indexOf(CURATED_NAME_SEPARATOR);
  const person = i === -1 ? artist.name : artist.name.slice(0, i);
  const band = i === -1 ? undefined : artist.name.slice(i + CURATED_NAME_SEPARATOR.length);
  const terms = [
    `${person} guitar rig`,
    `${person} gear`,
    `${person} signal chain`,
    `${person} rig diagram`,
    ...(band ? [`${band} guitar gear`] : []),
    'guitarist gear',
    'guitar rig archive',
  ];
  return withBrand(terms);
}
