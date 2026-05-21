import type { Artist } from './manifest';
import { getAllArtists, getArtistBySlug } from './manifest';

/**
 * Returns up to `limit` artists related to `slug`, ranked by:
 *   1. Same band prefix (slug prefix before first hyphen) — e.g. `allmanbrothers-warren` ↔ `allmanbrothers-duane`
 *   2. Year proximity (overlapping or within ±5 years of the target's active span)
 *   3. Same decade tag (any element of `decades` array intersects)
 *
 * The scoring is deterministic at build time so output is stable across rebuilds.
 * Self is excluded. The result is alphabetically stable within score buckets so
 * different runs produce identical HTML (matters for static generation).
 */
export function getRelatedArtists(slug: string, limit = 6): Artist[] {
  const target = getArtistBySlug(slug);
  if (!target) return [];

  const all = getAllArtists().filter((a) => a.slug !== slug);
  const targetPrefix = target.slug.split('-')[0];
  const targetDecades = new Set(target.decades);

  type Scored = { artist: Artist; score: number };
  const scored: Scored[] = all.map((a) => {
    let score = 0;
    const prefix = a.slug.split('-')[0];

    // Same band prefix is the strongest signal (e.g. multiple members of one band).
    // Guard against trivial collisions like "the" by requiring length > 3.
    if (prefix === targetPrefix && prefix.length > 3) score += 100;

    // Year proximity: overlap or within 5 years.
    const yearGap = Math.max(0, Math.max(target.yearMin - a.yearMax, a.yearMin - target.yearMax));
    if (yearGap === 0) score += 20; // overlapping active span
    else if (yearGap <= 5) score += 10;

    // Shared decade tag(s).
    const sharedDecades = a.decades.filter((d) => targetDecades.has(d)).length;
    score += sharedDecades * 5;

    return { artist: a, score };
  });

  // Drop unrelated entries (no shared signal at all).
  return scored
    .filter((s) => s.score > 0)
    .sort((x, y) => {
      if (y.score !== x.score) return y.score - x.score;
      return x.artist.name.localeCompare(y.artist.name);
    })
    .slice(0, limit)
    .map((s) => s.artist);
}
