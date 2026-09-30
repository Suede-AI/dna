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

function expectWellFormed(list: readonly string[]) {
  expect(list.length).toBeGreaterThanOrEqual(5);
  const lowered = list.map((t) => t.toLowerCase());
  expect(new Set(lowered).size).toBe(list.length);
  for (const term of list) {
    expect(term.trim()).toBe(term);
    expect(term).not.toContain(',');
    expect(term.toLowerCase()).not.toContain('suede labs');
  }
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
      for (const brand of BRAND_KEYWORDS) expect(list).toContain(brand);
    }
  });

  it('gives keywords only to indexable artist pages', () => {
    const src = readFileSync(join(APP_DIR, '[artist-slug]', 'page.tsx'), 'utf8');
    expect(src).toContain('...(indexable ? { keywords: artistKeywords(artist) } : {})');
  });

  it('builds artist keywords from the curated name and band', () => {
    const list = artistKeywords({ name: 'Eric Clapton' });
    expectWellFormed(list);
    expect(list).toContain('Eric Clapton guitar rig');
    expect(list).toContain('Suede AI');
  });

  it('adds keywords to every article JSON-LD', () => {
    for (const article of ARTICLES) {
      const ld = articleJsonLd(article, 'https://dna.suedeai.ai');
      expect(ld.keywords).toBe(keywordsFor(`/articles/${article.slug}` as KeywordRoute).join(', '));
    }
  });
});
