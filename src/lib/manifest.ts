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

export function getAllRigs(): Rig[] {
  return rigs;
}

export function getAllArtists(): Artist[] {
  return artists;
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getRigsByArtistSlug(slug: string): Rig[] {
  return rigs.filter((r) => r.artistSlug === slug).sort((a, b) => a.year - b.year);
}

export function getArtistNeighbors(slug: string): { prev?: Artist; next?: Artist } {
  const i = artists.findIndex((a) => a.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? artists[i - 1] : undefined,
    next: i < artists.length - 1 ? artists[i + 1] : undefined,
  };
}

export function getStats(): { totalRigs: number; totalArtists: number; yearMin: number; yearMax: number } {
  const totalRigs = rigs.length;
  const totalArtists = artists.length;
  const yearMin = rigs.reduce((m, r) => Math.min(m, r.year), Infinity);
  const yearMax = rigs.reduce((m, r) => Math.max(m, r.year), -Infinity);
  return { totalRigs, totalArtists, yearMin, yearMax };
}
