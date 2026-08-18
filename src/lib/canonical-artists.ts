import artistMerges from '../../data/artist-merges.json';
import artistNames from '../../data/artist-names.json';

const COMMENT_KEY = '_comment';

function withoutComment(record: Record<string, string>): Record<string, string> {
  const { [COMMENT_KEY]: _comment, ...rest } = record;
  return rest;
}

/** Retired archive slug -> surviving canonical slug. */
export const ARTIST_MERGES: Record<string, string> = withoutComment(artistMerges);

/** Canonical slug -> reviewed display name. */
export const ARTIST_DISPLAY_NAMES: Record<string, string> = withoutComment(artistNames);

/** Slugs that no longer have a page and must 301 to their survivor. */
export const RETIRED_ARTIST_SLUGS: string[] = Object.keys(ARTIST_MERGES);

export function canonicalArtistSlug(slug: string): string {
  return ARTIST_MERGES[slug] ?? slug;
}

export function canonicalArtistName(slug: string, fallback: string): string {
  return ARTIST_DISPLAY_NAMES[slug] ?? fallback;
}

/**
 * Separator used by curated "Player — Band" display names (space, EM DASH,
 * space). Its presence marks a name that was authored in reviewed form.
 */
export const CURATED_NAME_SEPARATOR = ' — ';

/**
 * True only when an artist's display name has been human-reviewed — either
 * listed explicitly in data/artist-names.json, or authored in the curated
 * "Player — Band" form. Every other page renders the raw upstream filename
 * grammar (a title-cased slug such as "Who Pete" for Pete Townshend, or
 * "Yolatengo Ira" for Ira Kaplan), which fabricates a human name. Those
 * fabricated names must NOT be indexed or asserted as a real entity in
 * structured data, so this predicate gates both the robots directive and the
 * Person/MusicGroup JSON-LD on every artist page.
 */
export function isReviewedArtistName(slug: string, name: string): boolean {
  return ARTIST_DISPLAY_NAMES[slug] !== undefined || name.includes(CURATED_NAME_SEPARATOR);
}
