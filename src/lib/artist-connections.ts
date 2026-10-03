import type { Artist, Rig } from './manifest';
import type { ArticleEntry } from './articles-content';
import { artistIsIndexable, splitArtistName } from './seo';

/**
 * Cross-references between artist pages, derived only from data the repo
 * already holds: the reviewed display names (data/artist-names.json), the rig
 * manifest (data/rigs.json) and the artist pages each essay links to
 * (ARTICLES[].artistSlugs). Nothing here interprets a diagram or asserts a fact
 * the archive does not record. Only reviewed (indexable) pages are ever
 * returned, so a fabricated slug-derived name is never promoted as a link.
 */

export type RelatedArtist = { artist: Artist; relation: 'same-player' | 'same-band' };

/** Reviewed pages for the same player under another band, or another player in the same band. */
export function relatedArtists(artist: Artist, all: Artist[]): RelatedArtist[] {
  if (!artistIsIndexable(artist)) return [];
  const { person, band } = splitArtistName(artist.name);
  const out: RelatedArtist[] = [];
  for (const other of all) {
    if (other.slug === artist.slug || !artistIsIndexable(other)) continue;
    const o = splitArtistName(other.name);
    if (o.person === person) out.push({ artist: other, relation: 'same-player' });
    else if (band && o.band === band) out.push({ artist: other, relation: 'same-band' });
  }
  return out.sort((a, b) => a.artist.yearMin - b.artist.yearMin || a.artist.name.localeCompare(b.artist.name));
}

export type YearPeers = { year: number; rigCount: number; peers: Artist[] };

/**
 * For each year this artist has a rig, the archive's total rig count for that
 * year and the other reviewed artists documented in it.
 */
export function yearPeers(artist: Artist, rigs: Rig[], all: Artist[]): YearPeers[] {
  if (!artistIsIndexable(artist)) return [];
  const bySlug = new Map(all.map((a) => [a.slug, a]));
  const years = [...new Set(rigs.filter((r) => r.artistSlug === artist.slug).map((r) => r.year))].sort(
    (a, b) => a - b,
  );
  return years.map((year) => {
    const inYear = rigs.filter((r) => r.year === year);
    const peers = [...new Set(inYear.map((r) => r.artistSlug))]
      .filter((slug) => slug !== artist.slug)
      .map((slug) => bySlug.get(slug))
      .filter((a): a is Artist => Boolean(a && artistIsIndexable(a)))
      .sort((a, b) => a.name.localeCompare(b.name));
    return { year, rigCount: inYear.length, peers };
  });
}

/** Essays on this site that link to this artist's page. */
export function citingArticles(artist: Pick<Artist, 'slug'>, articles: ArticleEntry[]): ArticleEntry[] {
  return articles.filter((a) => a.artistSlugs?.includes(artist.slug));
}
