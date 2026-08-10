import rigsManifest from '../../data/rigs.json';
import artistsManifest from '../../data/artists.json';
import { canonicalArtistName, canonicalArtistSlug } from './canonical-artists';

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

// The upstream filename grammar produces several slugs for the same person and a
// display name that is the raw slug. Both are normalized here, at read time, so the
// generated manifests stay a faithful record of the upstream archive while every
// rendered surface — grid, hero, alt text, titles, descriptions, JSON-LD, sitemap,
// stats — reads one canonical entity per artist.
const baseNames = new Map((artistsManifest as Artist[]).map((a) => [a.slug, a.name]));

function resolvedName(slug: string): string {
  return canonicalArtistName(slug, baseNames.get(slug) ?? slug);
}

function groupByArtist(source: Rig[]): Artist[] {
  const map = new Map<string, Artist>();
  for (const rig of source) {
    const decade = Math.floor(rig.year / 10) * 10;
    const existing = map.get(rig.artistSlug);
    if (!existing) {
      map.set(rig.artistSlug, {
        slug: rig.artistSlug,
        name: rig.artistName,
        count: 1,
        yearMin: rig.year,
        yearMax: rig.year,
        decades: [decade],
      });
      continue;
    }
    map.set(rig.artistSlug, {
      ...existing,
      count: existing.count + 1,
      yearMin: Math.min(existing.yearMin, rig.year),
      yearMax: Math.max(existing.yearMax, rig.year),
      decades: existing.decades.includes(decade)
        ? existing.decades
        : [...existing.decades, decade].sort((a, b) => a - b),
    });
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

const rigs: Rig[] = (rigsManifest.rigs as Rig[])
  .map((rig) => {
    const slug = canonicalArtistSlug(rig.artistSlug);
    return { ...rig, artistSlug: slug, artistName: resolvedName(slug) };
  })
  .sort((a, b) => a.artistName.localeCompare(b.artistName) || a.year - b.year);

const artists: Artist[] = groupByArtist(rigs);

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
