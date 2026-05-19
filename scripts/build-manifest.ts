import { displayNameFromSlug } from '../src/lib/slug';

export type ParsedFilename = {
  artistSlug: string;
  year: number;
  ext: 'jpg' | 'png' | 'gif';
};

const FILENAME_RE = /^([a-z0-9_]+)_guitar_rig_(\d{4})\.(jpg|png|gif)$/i;

export function parseFilename(name: string): ParsedFilename | null {
  if (name.includes('_thumb.')) return null;
  const m = name.match(FILENAME_RE);
  if (!m) return null;
  const [, artistSlug, yearStr, extRaw] = m;
  const ext = extRaw.toLowerCase() as 'jpg' | 'png' | 'gif';
  return { artistSlug, year: Number(yearStr), ext };
}

export function applyOverride(archiveSlug: string, overrides: Record<string, string>): string {
  if (overrides[archiveSlug]) return overrides[archiveSlug];
  return displayNameFromSlug(archiveSlug);
}

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

export function groupByArtist(rigs: Rig[]): Artist[] {
  const map = new Map<string, Artist>();
  for (const rig of rigs) {
    const existing = map.get(rig.artistSlug);
    const decade = Math.floor(rig.year / 10) * 10;
    if (!existing) {
      map.set(rig.artistSlug, {
        slug: rig.artistSlug,
        name: rig.artistName,
        count: 1,
        yearMin: rig.year,
        yearMax: rig.year,
        decades: [decade],
      });
    } else {
      existing.count += 1;
      existing.yearMin = Math.min(existing.yearMin, rig.year);
      existing.yearMax = Math.max(existing.yearMax, rig.year);
      if (!existing.decades.includes(decade)) {
        existing.decades = [...existing.decades, decade].sort((a, b) => a - b);
      }
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
