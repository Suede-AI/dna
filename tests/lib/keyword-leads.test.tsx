import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ROUTE_KEYWORDS, artistKeywords, type KeywordRoute } from '../../src/lib/seo/keywords';
import { artistPageTitle } from '../../src/lib/seo';
import { ArtistStrip } from '../../src/components/artist/ArtistStrip';
import type { Artist } from '../../src/lib/manifest';

vi.mock('../../src/components/grid/CompilationGrid', () => ({ CompilationGrid: () => null }));

const PAGES: Record<KeywordRoute, () => Promise<{ default: ComponentType; metadata: Metadata }>> = {
  '/': () => import('../../src/app/page'),
  '/about': () => import('../../src/app/about/page'),
  '/articles': () => import('../../src/app/articles/page'),
  '/articles/building-a-tone-over-a-career': () =>
    import('../../src/app/articles/building-a-tone-over-a-career/page'),
  '/articles/the-guitar-rig-diagram-as-a-documentary-form': () =>
    import('../../src/app/articles/the-guitar-rig-diagram-as-a-documentary-form/page'),
  '/articles/shred-signal-and-the-virtuoso-rig': () =>
    import('../../src/app/articles/shred-signal-and-the-virtuoso-rig/page'),
  '/articles/rig-archaeology-and-the-ear-trained-player': () =>
    import('../../src/app/articles/rig-archaeology-and-the-ear-trained-player/page'),
  '/articles/the-unsung-link': () => import('../../src/app/articles/the-unsung-link/page'),
  '/docs': () => import('../../src/app/docs/page'),
  '/docs/faq': () => import('../../src/app/docs/faq/page'),
  '/docs/what-is-suede-dna': () => import('../../src/app/docs/what-is-suede-dna/page'),
  '/docs/sourcing-and-verification': () => import('../../src/app/docs/sourcing-and-verification/page'),
  '/docs/search-and-filters': () => import('../../src/app/docs/search-and-filters/page'),
};

/** The <title> Next renders: a plain string goes through the root layout's `%s · Suede DNA` template. */
function renderedTitle(title: Metadata['title']): string {
  if (typeof title === 'string') return `${title} · Suede DNA`;
  if (title && typeof title === 'object' && 'absolute' in title && title.absolute) return title.absolute;
  throw new Error('page metadata needs a string or absolute title');
}

function h1Text(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const h1s = doc.querySelectorAll('h1');
  expect(h1s.length).toBe(1);
  return (h1s[0].textContent ?? '').replace(/\s+/g, ' ');
}

describe('keyword lead term', () => {
  for (const route of Object.keys(PAGES) as KeywordRoute[]) {
    it(`${route} leads with a term that is in its <title> and <h1>`, async () => {
      const lead = ROUTE_KEYWORDS[route][0].toLowerCase();
      const page = await PAGES[route]();
      const title = renderedTitle(page.metadata.title);
      expect(title.toLowerCase()).toContain(lead);
      expect(title.length).toBeLessThanOrEqual(65);
      const Page = page.default;
      expect(h1Text(renderToStaticMarkup(<Page />)).toLowerCase()).toContain(lead);
    });
  }

  it('artist pages lead with "{player} guitar rig" in the title and h1', () => {
    const artist: Artist = {
      slug: '311-tim-mahoney',
      name: 'Tim Mahoney — 311',
      count: 3,
      yearMin: 1997,
      yearMax: 2004,
      decades: [1990, 2000],
    };
    const lead = artistKeywords(artist)[0].toLowerCase();
    expect(lead).toBe('tim mahoney guitar rig');
    expect(artistPageTitle(artist).toLowerCase()).toContain(lead);
    const html = renderToStaticMarkup(<ArtistStrip artist={artist} archivePosition={null} />);
    const h1 = h1Text(html).toLowerCase();
    expect(h1).toContain(lead);
    expect(h1).toContain('311');
  });
});
