import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import { buildLlmsTxt } from '@/lib/llms';
import { getAllArtists } from '@/lib/manifest';
import { artistIsIndexable, artistPageDescription } from '@/lib/seo';
import { DOCS } from '@/lib/docs-content';
import { ARTICLES } from '@/lib/articles-content';

const SITE_URL = 'https://dna.suedeai.ai';
const body = buildLlmsTxt(SITE_URL);
const listed = [...body.matchAll(/^- \[[^\]]+\]\((https:\/\/dna\.suedeai\.ai[^)]*)\): (.+)$/gm)];
const listedPages = listed.filter(([, url]) => !url.endsWith('/ai-instructions'));

describe('llms.txt', () => {
  it('lists every sitemap URL exactly once, and nothing the sitemap omits', () => {
    const sitemapUrls = sitemap().map((entry) => entry.url);
    expect(sitemapUrls.length).toBeGreaterThan(70);
    expect(listedPages.map(([, url]) => url).sort()).toEqual([...sitemapUrls].sort());
  });

  it('describes each page with that page’s own meta description', () => {
    const byUrl = new Map(listed.map(([, url, description]) => [url, description]));
    for (const doc of DOCS) expect(byUrl.get(`${SITE_URL}/docs/${doc.slug}`)).toBe(doc.description);
    for (const article of ARTICLES) {
      expect(byUrl.get(`${SITE_URL}/articles/${article.slug}`)).toBe(article.description);
    }
    for (const artist of getAllArtists().filter(artistIsIndexable)) {
      expect(byUrl.get(`${SITE_URL}/${artist.slug}`)).toBe(artistPageDescription(artist));
    }
  });

  it('never lists a noindexed artist page', () => {
    const hidden = getAllArtists().filter((artist) => !artistIsIndexable(artist));
    for (const artist of hidden) expect(body).not.toContain(`(${SITE_URL}/${artist.slug})`);
  });
});
