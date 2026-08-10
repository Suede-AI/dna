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
