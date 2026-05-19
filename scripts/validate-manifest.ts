import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { groupByArtist, type Rig } from './build-manifest';

const CONCURRENCY = 10;
const TIMEOUT_MS = 10_000;

async function probe(url: string): Promise<number> {
  const tryFetch = async (method: 'HEAD' | 'GET'): Promise<number> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const init: RequestInit = { method, signal: controller.signal, redirect: 'follow' };
      if (method === 'GET') {
        init.headers = { Range: 'bytes=0-0' };
      }
      const res = await fetch(url, init);
      return res.status;
    } catch {
      return 0;
    } finally {
      clearTimeout(timer);
    }
  };

  const headStatus = await tryFetch('HEAD');
  if (headStatus !== 0 && headStatus !== 405 && headStatus !== 501) {
    return headStatus;
  }
  return tryFetch('GET');
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

async function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const root = join(here, '..');

  const raw = JSON.parse(await readFile(join(root, 'data', 'rigs.json'), 'utf8')) as {
    generatedAt: string;
    source: string;
    rigs: Rig[];
  };

  console.log(`Probing ${raw.rigs.length} rigs against upstream (concurrency=${CONCURRENCY})…`);
  const statuses = await poolMap(raw.rigs, CONCURRENCY, async (rig, i) => {
    const status = await probe(rig.src);
    if ((i + 1) % 50 === 0 || i + 1 === raw.rigs.length) {
      console.log(`  ${i + 1}/${raw.rigs.length} checked`);
    }
    return status;
  });

  const kept: Rig[] = [];
  const dropped: Array<{ id: string; src: string; status: number }> = [];
  raw.rigs.forEach((rig, i) => {
    const s = statuses[i];
    if (isKeep(s)) kept.push(rig);
    else dropped.push({ id: rig.id, src: rig.src, status: s });
  });

  console.log(`Kept ${kept.length}, dropped ${dropped.length}`);

  const validatedAt = new Date().toISOString();
  await writeFile(
    join(root, 'data', 'rigs.json'),
    JSON.stringify({ generatedAt: raw.generatedAt, source: raw.source, validatedAt, rigs: kept }, null, 2) + '\n'
  );
  await writeFile(
    join(root, 'data', 'artists.json'),
    JSON.stringify(groupByArtist(kept), null, 2) + '\n'
  );
  await writeFile(
    join(root, 'data', 'excluded.json'),
    JSON.stringify({ excludedAt: validatedAt, count: dropped.length, entries: dropped }, null, 2) + '\n'
  );

  console.log('Wrote data/rigs.json, data/artists.json, data/excluded.json');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
