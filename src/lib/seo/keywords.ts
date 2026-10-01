import type { Artist } from '../manifest';
import { CURATED_NAME_SEPARATOR } from '../canonical-artists';

/**
 * Per-route <meta name="keywords"> lists. Google ignores the tag, so each list
 * is a per-page target map: the first term is the page's primary term and also
 * appears in its <title> and <h1>; the rest are terms specific to that page.
 * No two routes share a term, so each term has exactly one owner page. In the
 * Next App Router a child route's `keywords` replaces its parent's, so every
 * list is complete on its own. One brand term is appended by `keywordsFor`.
 */
export const BRAND_KEYWORDS: readonly string[] = ['Suede DNA'];

export const ROUTE_KEYWORDS = {
  '/': [
    'guitar rig archive',
    'guitar rigs',
    'guitarist gear',
    'guitar signal chains',
    'guitar rig diagrams',
    'vintage guitar rigs',
    'guitar tone archive',
  ],
  '/about': [
    'about Suede DNA',
    'guitar rig compilation method',
    'rig attribution',
    'musician gear documentation',
  ],
  '/articles': [
    'guitar rig history',
    'guitar tone history',
    'signal chain essays',
    'guitar gear articles',
  ],
  '/articles/building-a-tone-over-a-career': [
    'Eric Clapton guitar rig',
    'Eric Clapton gear',
    'Yardbirds guitar rig',
    'Bluesbreakers Clapton tone',
    'Cream guitar rig',
    'guitar tone evolution',
  ],
  '/articles/the-guitar-rig-diagram-as-a-documentary-form': [
    'guitar rig diagram',
    'rig rundown history',
    'guitar rig documentation',
    'guitar gear photography',
  ],
  '/articles/shred-signal-and-the-virtuoso-rig': [
    'shred guitar rig',
    'shred guitar gear',
    'virtuoso guitarist gear',
    '1980s guitar rigs',
    'high gain signal chain',
  ],
  '/articles/rig-archaeology-and-the-ear-trained-player': [
    'learning guitar by ear',
    'ear training guitar',
    'guitar tone matching',
    'guitar gear research',
  ],
  '/articles/the-unsung-link': [
    'guitar gear lists',
    'guitar pedal power supply',
    'isolated pedal power',
    'patch cables',
    'guitar amp mic placement',
  ],
  '/docs': [
    'Suede DNA docs',
    'guitar rig archive documentation',
    'manifest pipeline',
  ],
  '/docs/faq': [
    'Suede DNA FAQ',
    'guitar rig archive coverage',
    'rig corrections',
    'rig image rights',
  ],
  '/docs/what-is-suede-dna': [
    'what is Suede DNA',
    'guitarist rigs over time',
    'tonal DNA',
    'guitar signal chain history',
  ],
  '/docs/sourcing-and-verification': [
    'guitar rig sourcing',
    'Internet Archive guitar rigs',
    'rig manifest verification',
    'guitar rig diagram sources',
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

/**
 * Artist pages: `{player} guitar rig` leads (it is in the page title and h1),
 * then the band's rig and pedalboard when the curated name has one (otherwise
 * the player's pedalboard and signal chain), the archive, and the brand.
 */
export function artistKeywords(artist: Pick<Artist, 'name'>): string[] {
  const i = artist.name.indexOf(CURATED_NAME_SEPARATOR);
  const person = i === -1 ? artist.name : artist.name.slice(0, i);
  const band = i === -1 ? undefined : artist.name.slice(i + CURATED_NAME_SEPARATOR.length);
  const terms = [
    `${person} guitar rig`,
    // "Tim Mahoney — 311": Tim Mahoney guitar rig, 311 guitar rig, 311 pedalboard.
    // "Eric Clapton": Eric Clapton guitar rig, pedalboard, signal chain.
    ...(band
      ? [`${band} guitar rig`, `${band} pedalboard`]
      : [`${person} pedalboard`, `${person} signal chain`]),
    'guitar rig archive',
  ];
  return withBrand(terms);
}
