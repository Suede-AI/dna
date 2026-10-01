import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  BRAND_KEYWORDS,
  ROUTE_KEYWORDS,
  artistKeywords,
  keywordsFor,
  type KeywordRoute,
} from '../../src/lib/seo/keywords';
import { articleJsonLd } from '../../src/lib/seo';
import { ARTICLES } from '../../src/lib/articles-content';

const APP_DIR = join(process.cwd(), 'src', 'app');

function listPages(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === 'api' ? [] : listPages(full);
    return name === 'page.tsx' ? [full] : [];
  });
}

/** `src/app/docs/faq/page.tsx` -> `/docs/faq`. */
function routeOf(file: string): string {
  const rel = relative(APP_DIR, file).replace(/\\/g, '/').replace(/\/?page\.tsx$/, '');
  return `/${rel}`;
}

const BANNED_TERMS = ['suede labs', 'guitar geek', 'pedalboard planner'];

function expectWellFormed(list: readonly string[]) {
  expect(list.length).toBeGreaterThanOrEqual(3);
  expect(list.length).toBeLessThanOrEqual(10);
  const lowered = list.map((t) => t.toLowerCase());
  expect(new Set(lowered).size).toBe(list.length);
  for (const term of list) {
    expect(term.trim()).toBe(term);
    expect(term).not.toMatch(/[,.:;!?]/);
    expect(term.length).toBeLessThanOrEqual(40);
    for (const banned of BANNED_TERMS) expect(term.toLowerCase()).not.toContain(banned);
  }
  // At most one standalone brand term, and it goes last.
  const brands = list.filter((t) => BRAND_KEYWORDS.includes(t));
  expect(brands.length).toBeLessThanOrEqual(1);
  expect(BRAND_KEYWORDS.includes(list[0])).toBe(false);
}

describe('meta keywords guard', () => {
  it('fails when an indexable page has no keywords', () => {
    const pages = listPages(APP_DIR);
    expect(pages.length).toBeGreaterThan(0);
    for (const file of pages) {
      const src = readFileSync(file, 'utf8');
      const rel = relative(process.cwd(), file);
      expect(/keywords\s*:/.test(src), `${rel} is missing metadata keywords`).toBe(true);
      const route = routeOf(file);
      if (!route.includes('[')) {
        expect(
          Object.hasOwn(ROUTE_KEYWORDS, route),
          `${route} has no entry in ROUTE_KEYWORDS`,
        ).toBe(true);
        expect(src, `${rel} should read its own route's keywords`).toContain(
          `keywordsFor('${route}')`,
        );
      }
    }
  });

  it('keeps every route list complete, deduped, and branded', () => {
    for (const route of Object.keys(ROUTE_KEYWORDS) as KeywordRoute[]) {
      const list = keywordsFor(route);
      expectWellFormed(list);
      expect(list.at(-1)).toBe(BRAND_KEYWORDS[0]);
    }
  });

  it('gives every route its own list: no shared non-brand term, so each term has one owner page', () => {
    const owner = new Map<string, string>();
    const signatures = new Set<string>();
    for (const [route, terms] of Object.entries(ROUTE_KEYWORDS)) {
      const signature = [...terms].map((t) => t.toLowerCase()).sort().join('|');
      expect(signatures.has(signature), `${route} repeats another route's list`).toBe(false);
      signatures.add(signature);
      for (const term of terms) {
        const key = term.toLowerCase();
        expect(owner.get(key), `"${term}" is on ${owner.get(key)} and ${route}`).toBeUndefined();
        owner.set(key, route);
      }
    }
  });

  it('gives keywords only to indexable artist pages', () => {
    const src = readFileSync(join(APP_DIR, '[artist-slug]', 'page.tsx'), 'utf8');
    expect(src).toContain('...(indexable ? { keywords: artistKeywords(artist) } : {})');
  });

  it('builds artist keywords from the curated name and band', () => {
    const solo = artistKeywords({ name: 'Eric Clapton' });
    expectWellFormed(solo);
    expect(solo).toEqual([
      'Eric Clapton guitar rig',
      'Eric Clapton pedalboard',
      'Eric Clapton signal chain',
      'guitar rig archive',
      'Suede DNA',
    ]);
    const banded = artistKeywords({ name: 'Tim Mahoney — 311' });
    expectWellFormed(banded);
    expect(banded).toEqual([
      'Tim Mahoney guitar rig',
      '311 guitar rig',
      '311 pedalboard',
      'guitar rig archive',
      'Suede DNA',
    ]);
  });

  it('adds keywords to every article JSON-LD', () => {
    for (const article of ARTICLES) {
      const ld = articleJsonLd(article, 'https://dna.suedeai.ai');
      expect(ld.keywords).toBe(keywordsFor(`/articles/${article.slug}` as KeywordRoute).join(', '));
    }
  });
});
