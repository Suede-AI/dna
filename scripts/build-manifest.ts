import { displayNameFromSlug, slugify } from '../src/lib/slug';

export type ParsedFilename = {
  artistSlug: string;
  year: number;
  ext: 'jpg' | 'png' | 'gif';
};

export function parseFilename(name: string): ParsedFilename | null {
  if (name.includes('_thumb.')) return null;
  if (name.startsWith('__ia_')) return null;

  // Pattern A: <slug>_guitar_rig_<year>.<ext>
  const a = name.match(/^([a-z0-9_]+)_guitar_rig_(\d{4})\.(jpg|png|gif)$/i);
  if (a) return { artistSlug: a[1].toLowerCase(), year: Number(a[2]), ext: a[3].toLowerCase() as ParsedFilename['ext'] };

  // Pattern E: <slug>_<year>_rig.<ext>
  const e = name.match(/^([a-z0-9_]+)_(\d{4})_rig\.(jpg|png|gif)$/i);
  if (e) return { artistSlug: e[1].toLowerCase(), year: Number(e[2]), ext: e[3].toLowerCase() as ParsedFilename['ext'] };

  // Pattern B: <slug>_<year>.<ext>
  const b = name.match(/^([a-z0-9_]+)_(\d{4})\.(jpg|png|gif)$/i);
  if (b) return { artistSlug: b[1].toLowerCase(), year: Number(b[2]), ext: b[3].toLowerCase() as ParsedFilename['ext'] };

  return null;
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
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

import { writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ARCHIVE_LISTING = 'https://archive.org/download/guitargeek-archives/';

const HREF_RE = /href="([^"]+\.(?:jpg|png|gif))"/gi;

export function extractHrefs(html: string): string[] {
  const hits: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = HREF_RE.exec(html)) !== null) {
    hits.push(m[1]);
  }
  return hits;
}

const FORMAT_PRIORITY: Record<'jpg' | 'png' | 'gif', number> = { jpg: 3, png: 2, gif: 1 };

export function buildRigs(filenames: string[], overrides: Record<string, string>): Rig[] {
  // Group all parseable filenames by `{artistSlug}-{year}` key.
  const byKey = new Map<string, Array<{ parsed: ParsedFilename; name: string }>>();
  for (const name of filenames) {
    const parsed = parseFilename(name);
    if (!parsed) continue;
    const key = `${parsed.artistSlug}-${parsed.year}`;
    const list = byKey.get(key) ?? [];
    byKey.set(key, [...list, { parsed, name }]);
  }

  // For each group, prefer the highest-priority format.
  const rigs: Rig[] = [];
  for (const items of byKey.values()) {
    const best = [...items].sort(
      (a, b) => FORMAT_PRIORITY[b.parsed.ext] - FORMAT_PRIORITY[a.parsed.ext]
    )[0];
    rigs.push({
      id: `${best.parsed.artistSlug}-${best.parsed.year}`,
      artistSlug: slugify(best.parsed.artistSlug),
      artistName: applyOverride(best.parsed.artistSlug, overrides),
      year: best.parsed.year,
      src: `https://archive.org/download/guitargeek-archives/${best.name}`,
      format: best.parsed.ext,
    });
  }

  rigs.sort((a, b) => a.artistName.localeCompare(b.artistName) || a.year - b.year);
  return rigs;
}

async function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const root = join(here, '..');

  console.log(`Fetching ${ARCHIVE_LISTING}…`);
  const res = await fetch(ARCHIVE_LISTING);
  if (!res.ok) {
    throw new Error(`Archive listing returned ${res.status}`);
  }
  const html = await res.text();
  const hrefs = extractHrefs(html);
  console.log(`Found ${hrefs.length} candidate image hrefs`);

  const overridesRaw = await readFile(join(root, 'data', 'overrides.json'), 'utf8');
  const overrides = JSON.parse(overridesRaw) as Record<string, string>;

  const rigs = buildRigs(hrefs, overrides);
  console.log(`Parsed ${rigs.length} rigs`);

  const artists = groupByArtist(rigs);
  console.log(`Grouped into ${artists.length} artists`);

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: ARCHIVE_LISTING,
    rigs,
  };
  await writeFile(join(root, 'data', 'rigs.json'), JSON.stringify(manifest, null, 2) + '\n');
  await writeFile(join(root, 'data', 'artists.json'), JSON.stringify(artists, null, 2) + '\n');
  console.log('Wrote data/rigs.json and data/artists.json');
}

const invokedDirectly = process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop()!);
if (invokedDirectly) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
