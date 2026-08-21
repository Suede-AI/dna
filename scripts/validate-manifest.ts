import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { groupByArtist, type Artist, type Rig } from './build-manifest';

const CONCURRENCY = 10;
const TIMEOUT_MS = 10_000;
const PROBE_ATTEMPTS = 3;

/**
 * Upstream link rot can only be proven by a definitive "gone" answer. Anything
 * else — a timeout, a reset, a rate limit, a 5xx — says the archive was
 * unreachable at that moment, not that the rig disappeared. Dropping on those
 * deletes real pages every time the network hiccups.
 */
const GONE_STATUSES = new Set([404, 410]);

/** Refuse to write a sweep that would delete more than this share of the archive. */
const MAX_DROP_RATIO = 0.1;

type RigsFile = { generatedAt: string; source: string; validatedAt?: string; rigs: Rig[] };
type ExcludedFile = { excludedAt: string; count: number; entries: Array<{ id: string; src: string; status: number }> };

// ---------------------------------------------------------------------------
// Structural validation — deterministic, no network, no writes. This is what CI
// runs, and what the production deploy gates on.
// ---------------------------------------------------------------------------

function validateStructure(rigsFile: RigsFile, artists: Artist[], excluded: ExcludedFile): string[] {
  const errors: string[] = [];

  if (!Array.isArray(rigsFile.rigs) || rigsFile.rigs.length === 0) {
    errors.push('data/rigs.json has no rigs — refusing to treat an empty archive as valid');
    return errors;
  }

  const seen = new Set<string>();
  for (const rig of rigsFile.rigs) {
    for (const field of ['id', 'artistSlug', 'artistName', 'src'] as const) {
      if (typeof rig[field] !== 'string' || rig[field].length === 0) {
        errors.push(`rig ${rig.id ?? '<no id>'}: ${field} is missing or empty`);
      }
    }
    if (!Number.isInteger(rig.year) || rig.year < 1900 || rig.year > 2100) {
      errors.push(`rig ${rig.id}: year ${rig.year} is not a plausible four-digit year`);
    }
    if (!['jpg', 'png', 'gif'].includes(rig.format)) {
      errors.push(`rig ${rig.id}: format ${rig.format} is not one of jpg/png/gif`);
    }
    if (seen.has(rig.id)) errors.push(`rig ${rig.id}: duplicate id`);
    seen.add(rig.id);
  }

  // artists.json is derived, never hand-edited. If it has drifted from rigs.json
  // the site renders artist pages that disagree with the rigs behind them.
  const derived = groupByArtist(rigsFile.rigs);
  if (JSON.stringify(derived) !== JSON.stringify(artists)) {
    errors.push(
      `data/artists.json is not groupByArtist(data/rigs.json) — ` +
        `${artists.length} artists on disk vs ${derived.length} derived. Run: pnpm validate-manifest --probe --write`
    );
  }

  if (excluded.count !== excluded.entries.length) {
    errors.push(`data/excluded.json: count ${excluded.count} does not match ${excluded.entries.length} entries`);
  }
  for (const entry of excluded.entries) {
    if (seen.has(entry.id)) errors.push(`rig ${entry.id}: present in both rigs.json and excluded.json`);
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Upstream sweep — network-bound, opt-in, and only writes when asked.
// ---------------------------------------------------------------------------

async function probeOnce(url: string, method: 'HEAD' | 'GET'): Promise<number> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const init: RequestInit = { method, signal: controller.signal, redirect: 'follow' };
    if (method === 'GET') init.headers = { Range: 'bytes=0-0' };
    const res = await fetch(url, init);
    return res.status;
  } catch {
    return 0;
  } finally {
    clearTimeout(timer);
  }
}

async function probe(url: string): Promise<number> {
  let status = 0;
  for (let attempt = 1; attempt <= PROBE_ATTEMPTS; attempt++) {
    const head = await probeOnce(url, 'HEAD');
    status = head !== 0 && head !== 405 && head !== 501 ? head : await probeOnce(url, 'GET');
    // A definitive answer either way ends the retries; only ambiguity is retried.
    if (isKeep(status) || GONE_STATUSES.has(status)) return status;
    if (attempt < PROBE_ATTEMPTS) await new Promise((r) => setTimeout(r, 500 * attempt));
  }
  return status;
}

async function poolMap<T, R>(items: T[], concurrency: number, fn: (item: T, idx: number) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (true) {
      const i = nextIndex++;
      if (i >= items.length) return;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

function isKeep(status: number): boolean {
  return (status >= 200 && status < 300) || status === 206;
}

async function sweep(root: string, rigsFile: RigsFile, write: boolean): Promise<number> {
  console.log(`Probing ${rigsFile.rigs.length} rigs against upstream (concurrency=${CONCURRENCY})…`);
  const statuses = await poolMap(rigsFile.rigs, CONCURRENCY, async (rig, i) => {
    const status = await probe(rig.src);
    if ((i + 1) % 50 === 0 || i + 1 === rigsFile.rigs.length) {
      console.log(`  ${i + 1}/${rigsFile.rigs.length} checked`);
    }
    return status;
  });

  const kept: Rig[] = [];
  const gone: Array<{ id: string; src: string; status: number }> = [];
  const unreachable: Array<{ id: string; src: string; status: number }> = [];
  rigsFile.rigs.forEach((rig, i) => {
    const status = statuses[i];
    if (isKeep(status)) kept.push(rig);
    else if (GONE_STATUSES.has(status)) gone.push({ id: rig.id, src: rig.src, status });
    else unreachable.push({ id: rig.id, src: rig.src, status });
  });

  console.log(`Kept ${kept.length}, gone ${gone.length}, unreachable ${unreachable.length}`);
  if (unreachable.length > 0) {
    console.log(
      `  ${unreachable.length} rigs gave no definitive answer after ${PROBE_ATTEMPTS} attempts and are KEPT.\n` +
        `  Unreachable is not gone — only ${[...GONE_STATUSES].join('/')} removes a rig.`
    );
  }

  if (!write) {
    console.log('\nReport only. Re-run with --write to apply the removals.');
    return gone.length > 0 ? 1 : 0;
  }

  const dropRatio = gone.length / rigsFile.rigs.length;
  if (dropRatio > MAX_DROP_RATIO) {
    console.error(
      `\nRefusing to write: ${gone.length} of ${rigsFile.rigs.length} rigs ` +
        `(${(dropRatio * 100).toFixed(1)}%) came back gone, over the ${(MAX_DROP_RATIO * 100).toFixed(0)}% ceiling.\n` +
        `An archive does not lose a tenth of itself at once. Check upstream before forcing this through.`
    );
    return 1;
  }

  const validatedAt = new Date().toISOString();
  await writeFile(
    join(root, 'data', 'rigs.json'),
    JSON.stringify({ generatedAt: rigsFile.generatedAt, source: rigsFile.source, validatedAt, rigs: kept }, null, 2) + '\n'
  );
  await writeFile(join(root, 'data', 'artists.json'), JSON.stringify(groupByArtist(kept), null, 2) + '\n');
  await writeFile(
    join(root, 'data', 'excluded.json'),
    JSON.stringify({ excludedAt: validatedAt, count: gone.length, entries: gone }, null, 2) + '\n'
  );
  console.log('Wrote data/rigs.json, data/artists.json, data/excluded.json');
  return 0;
}

async function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const root = join(here, '..');
  const args = process.argv.slice(2);
  const doProbe = args.includes('--probe');
  const doWrite = args.includes('--write');

  if (doWrite && !doProbe) {
    console.error('--write only applies to --probe. Structural validation never writes.');
    process.exit(1);
  }

  const [rigsFile, artists, excluded] = await Promise.all([
    readFile(join(root, 'data', 'rigs.json'), 'utf8').then((s) => JSON.parse(s) as RigsFile),
    readFile(join(root, 'data', 'artists.json'), 'utf8').then((s) => JSON.parse(s) as Artist[]),
    readFile(join(root, 'data', 'excluded.json'), 'utf8').then((s) => JSON.parse(s) as ExcludedFile),
  ]);

  const errors = validateStructure(rigsFile, artists, excluded);
  if (errors.length > 0) {
    console.error(`Manifest is inconsistent — ${errors.length} problem(s):`);
    for (const e of errors.slice(0, 20)) console.error(`  · ${e}`);
    if (errors.length > 20) console.error(`  … and ${errors.length - 20} more`);
    process.exit(1);
  }
  console.log(`Manifest consistent: ${rigsFile.rigs.length} rigs across ${artists.length} artists, ${excluded.count} excluded.`);

  if (!doProbe) return;
  process.exit(await sweep(root, rigsFile, doWrite));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
