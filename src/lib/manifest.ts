import rigsManifest from '../../data/rigs.json';
import artistsManifest from '../../data/artists.json';

export type Rig = {
  id: string;
  artistSlug: string;
  artistName: string;
  year: number;
  src: string;
  format: 'jpg' | 'png' | 'gif';
};

export type Artist = {
  slug: string;
  name: string;
  count: number;
  yearMin: number;
  yearMax: number;
  decades: number[];
};

const rigs = rigsManifest.rigs as Rig[];
const artists = artistsManifest as Artist[];

// Build-time indices. The static manifests never change at runtime, so we
// precompute O(1) lookup tables and a per-artist sorted rig list once at
// module init. This matters during `next build`: each of the 740+ prerendered
// pages calls getArtistBySlug / getRigsByArtistSlug / getRigById at least
// once, and the previous .find/.filter chain was O(n) per call.
const artistBySlug = new Map<string, Artist>(artists.map((a) => [a.slug, a]));
const artistIndexBySlug = new Map<string, number>(
  artists.map((a, i) => [a.slug, i])
);
const rigById = new Map<string, Rig>(rigs.map((r) => [r.id, r]));
const rigsByArtistSlug = (() => {
  const m = new Map<string, Rig[]>();
  for (const r of rigs) {
    const list = m.get(r.artistSlug);
    if (list) list.push(r);
    else m.set(r.artistSlug, [r]);
  }
  for (const list of m.values()) list.sort((a, b) => a.year - b.year);
  return m;
})();

const stats = (() => {
  let yearMin = Infinity;
  let yearMax = -Infinity;
  for (const r of rigs) {
    if (r.year < yearMin) yearMin = r.year;
    if (r.year > yearMax) yearMax = r.year;
  }
  return {
    totalRigs: rigs.length,
    totalArtists: artists.length,
    yearMin,
    yearMax,
  };
})();

const EMPTY_RIGS: readonly Rig[] = Object.freeze([]);

export function getAllRigs(): Rig[] {
  return rigs;
}

export function getAllArtists(): Artist[] {
  return artists;
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artistBySlug.get(slug);
}

export function getRigsByArtistSlug(slug: string): Rig[] {
  // Cached, year-sorted list. Callers historically received a fresh array
  // they could mutate; return the cached array directly since no caller
  // currently mutates it (verified across src/ as of this commit).
  return (rigsByArtistSlug.get(slug) ?? EMPTY_RIGS) as Rig[];
}

export function getArtistNeighbors(slug: string): { prev?: Artist; next?: Artist } {
  const i = artistIndexBySlug.get(slug);
  if (i === undefined) return {};
  return {
    prev: i > 0 ? artists[i - 1] : undefined,
    next: i < artists.length - 1 ? artists[i + 1] : undefined,
  };
}

export function getRigById(id: string): Rig | undefined {
  return rigById.get(id);
}

export function getStats(): { totalRigs: number; totalArtists: number; yearMin: number; yearMax: number } {
  return stats;
}
