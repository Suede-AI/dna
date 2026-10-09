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

/**
 * A reviewed page is "thin" when it documents a single rig and carries no text
 * beyond the shared template: no essay cites it and no other reviewed page
 * shares its player or band. Thin pages are enriched (see `singleRigFacts`),
 * never hidden or noindexed.
 */
export function artistPageIsThin(artist: Artist, all: Artist[], articles: ArticleEntry[]): boolean {
  return (
    artist.count === 1 &&
    citingArticles(artist, articles).length === 0 &&
    relatedArtists(artist, all).length === 0
  );
}

export type SingleRigFacts = {
  year: number;
  decade: number;
  format: string;
  sourceFile: string;
  /** 1-based position among the archive's rigs ordered by year, then id. */
  yearRank: number;
  yearTotal: number;
  decadeTotal: number;
  totalRigs: number;
  /** Nearest dated rigs on either side, from other reviewed artist pages. */
  before?: { artist: Artist; year: number };
  after?: { artist: Artist; year: number };
};

/**
 * Archive-derived facts for a single-rig page: where its one diagram sits in
 * the dataset by year and decade, its source file, and the closest dated
 * reviewed neighbours. All values come from data/rigs.json; nothing is
 * inferred about the gear.
 */
export function singleRigFacts(artist: Artist, rigs: Rig[], all: Artist[]): SingleRigFacts | null {
  if (artist.count !== 1 || !artistIsIndexable(artist)) return null;
  const rig = rigs.find((r) => r.artistSlug === artist.slug);
  if (!rig) return null;
  const decade = Math.floor(rig.year / 10) * 10;
  const sameYear = rigs
    .filter((r) => r.year === rig.year)
    .sort((a, b) => a.id.localeCompare(b.id));
  const bySlug = new Map(all.map((a) => [a.slug, a]));
  const reviewed = rigs
    .filter((r) => r.artistSlug !== artist.slug && artistIsIndexable(bySlug.get(r.artistSlug) ?? artist))
    .filter((r) => bySlug.has(r.artistSlug));
  const pick = (r?: Rig) => (r ? { artist: bySlug.get(r.artistSlug) as Artist, year: r.year } : undefined);
  const before = reviewed
    .filter((r) => r.year <= rig.year)
    .sort((a, b) => b.year - a.year || a.id.localeCompare(b.id))[0];
  const after = reviewed
    .filter((r) => r.year > rig.year)
    .sort((a, b) => a.year - b.year || a.id.localeCompare(b.id))[0];
  return {
    year: rig.year,
    decade,
    format: rig.format.toUpperCase(),
    sourceFile: rig.src.split('/').pop() ?? rig.src,
    yearRank: sameYear.findIndex((r) => r.id === rig.id) + 1,
    yearTotal: sameYear.length,
    decadeTotal: rigs.filter((r) => Math.floor(r.year / 10) * 10 === decade).length,
    totalRigs: rigs.length,
    before: pick(before),
    after: pick(after),
  };
}
