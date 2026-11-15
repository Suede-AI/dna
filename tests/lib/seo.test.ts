import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  articleJsonLd,
  artistArchiveContext,
  artistJsonLd,
  artistPageDescription,
  artistPageTitle,
  homeJsonLd,
  homePageDescription,
  homePageTitle,
} from '../../src/lib/seo';
import { getStats } from '../../src/lib/manifest';
import { ARTICLES } from '../../src/lib/articles-content';
import type { Artist } from '../../src/lib/manifest';

const clapton: Artist = {
  slug: 'eric-clapton-cream',
  name: 'Eric Clapton — Cream',
  count: 5,
  yearMin: 1966,
  yearMax: 1989,
  decades: [1960, 1970, 1980],
};

const singleRigArtist: Artist = {
  slug: 'a-day-to-remember-kevin-skaff',
  name: 'A Day To Remember Kevin Skaff',
  count: 1,
  yearMin: 2010,
  yearMax: 2010,
  decades: [2010],
};

describe('SEO helpers', () => {
  it('formats artist page title', () => {
    expect(artistPageTitle(clapton)).toBe('Eric Clapton Guitar Rigs (Cream), 1966–1989');
  });

  it('puts the band after the player in a curated artist title', () => {
    const mahoney: Artist = { ...clapton, slug: '311-tim-mahoney', name: 'Tim Mahoney — 311', yearMin: 1997, yearMax: 2004 };
    expect(artistPageTitle(mahoney)).toBe('Tim Mahoney Guitar Rigs (311), 1997–2004');
  });

  it('formats artist page description with counts', () => {
    expect(artistPageDescription(clapton)).toContain('5 documented rig setups');
    expect(artistPageDescription(clapton)).toContain('1966');
    expect(artistPageDescription(clapton)).toContain('1989');
    expect(artistPageDescription(clapton)).toContain('Suede DNA');
    expect(artistPageDescription(clapton)).not.toContain('complete rig archive');
  });

  it('formats single-rig artist title without duplicate year range', () => {
    expect(artistPageTitle(singleRigArtist)).toBe('Archive label: A Day To Remember Kevin Skaff — Guitar Rigs, 2010');
    expect(artistPageTitle(singleRigArtist)).not.toContain('2010–2010');
  });

  it('formats single-rig artist description without duplicate year range', () => {
    expect(artistPageDescription(singleRigArtist)).toContain('1 documented rig setup');
    expect(artistPageDescription(singleRigArtist)).not.toContain('1 documented rig setups');
    expect(artistPageDescription(singleRigArtist)).toContain('in 2010');
    expect(artistPageDescription(singleRigArtist)).not.toContain('2010–2010');
    expect(artistPageDescription(singleRigArtist)).not.toContain('between 2010 and 2010');
  });

  it('builds artist-specific archive context without overstating upstream verification', () => {
    const context = artistArchiveContext(clapton);

    expect(context.trim().split(/\s+/).length).toBeGreaterThanOrEqual(90);
    expect(context).toContain(
      'Eric Clapton — Cream has 5 documented rig setups spanning 1966–1989 in the Suede DNA collection',
    );
    expect(context).toContain('presentation, normalization, and search layer');
    expect(context).toContain('does not interpret the photographed gear');
    expect(context).toContain('not a complete history');
    expect(context).not.toContain('complete rig archive');
    expect(artistArchiveContext(singleRigArtist)).toContain(
      '1 documented rig setup from 2010 in the Suede DNA collection',
    );
  });

  it('emits valid artist JSON-LD shape typing the subject as a Person', () => {
    const ld = artistJsonLd(clapton, [
      { id: 'eric-clapton-1966', src: 'https://example.com/x.jpg', year: 1966, format: 'jpg', artistSlug: 'eric-clapton', artistName: 'Eric Clapton' },
    ], 'https://dna.suedeai.ai');
    expect(ld['@type']).toBe('ProfilePage');
    // An individual guitarist is a Person, not a MusicGroup.
    expect(ld.mainEntity['@type']).toBe('Person');
    expect(ld.mainEntity.name).toBe('Eric Clapton');
    expect(Array.isArray(ld.hasPart)).toBe(true);
    expect(ld.hasPart[0]['@type']).toBe('ImageObject');
    expect(ld.hasPart[0].about).toEqual({ '@type': 'Person', name: 'Eric Clapton', memberOf: { '@type': 'MusicGroup', name: 'Cream' } });
    expect(ld.hasPart[0].contentUrl).toBe('https://example.com/x.jpg');
    expect(ld.hasPart[0].creditText).toBe('Guitar Geek Archives');
    expect(ld.hasPart[0].isAccessibleForFree).toBe(true);
    // Artist association and rig year do not prove image authorship, creation
    // date, or a reuse license for the archived file.
    expect(ld.hasPart[0]).not.toHaveProperty('creator');
    expect(ld.hasPart[0]).not.toHaveProperty('dateCreated');
    expect(ld.hasPart[0]).not.toHaveProperty('license');
  });

  it('splits a curated "Player — Band" name into Person + memberOf', () => {
    const iommi: Artist = {
      slug: 'blacksabbath-tony',
      name: 'Tony Iommi — Black Sabbath',
      count: 3,
      yearMin: 1970,
      yearMax: 1978,
      decades: [1970],
    };
    const ld = artistJsonLd(iommi, [
      { id: 'blacksabbath-tony-1970', src: 'https://example.com/y.jpg', year: 1970, format: 'jpg', artistSlug: 'blacksabbath-tony', artistName: 'Tony Iommi — Black Sabbath' },
    ], 'https://dna.suedeai.ai');
    expect(ld.mainEntity['@type']).toBe('Person');
    // The person's name must not carry the band suffix...
    expect(ld.mainEntity.name).toBe('Tony Iommi');
    // ...the band is represented via memberOf, and both halves are substrings
    // of the visible display name so schema matches rendered content.
    expect(ld.mainEntity.memberOf).toEqual({ '@type': 'MusicGroup', name: 'Black Sabbath' });
    expect(iommi.name).toContain(ld.mainEntity.name);
    expect(iommi.name).toContain('Black Sabbath');
    expect(ld.hasPart[0].about).toEqual({
      '@type': 'Person',
      name: 'Tony Iommi',
      memberOf: { '@type': 'MusicGroup', name: 'Black Sabbath' },
    });
  });

  it('keeps the home page title free of em dashes across every surface', () => {
    expect(homePageTitle()).toBe('Suede DNA: Guitar Rig Archive of Signal Chains');
    expect(homePageTitle()).not.toContain('\u2014');
    expect(homeJsonLd('https://dna.suedeai.ai', getStats()).name).toBe(homePageTitle());
  });

  it('keeps the home page description within the 160 character snippet limit', () => {
    const description = homePageDescription(getStats());
    expect(description.length).toBeLessThanOrEqual(160);
    expect(description).toContain('409');
    expect(description).toContain('1964 to 2014');
    expect(description).toMatch(/indexed by year and player\.$/);
  });

  it('does not declare a list structure the home page cannot enumerate', () => {
    const ld = homeJsonLd('https://dna.suedeai.ai', {
      totalRigs: 409,
      yearMin: 1964,
      yearMax: 2019,
    });
    expect(ld['@type']).toBe('CollectionPage');
    // An ItemList promises enumerable members. The grid is filtered and sorted
    // in the browser, so no fixed list here can keep matching the page.
    const serialized = JSON.stringify(ld);
    expect(serialized).not.toContain('ItemList');
    expect(serialized).not.toContain('itemListElement');
    expect(serialized).not.toContain('numberOfItems');
    // The size of the collection survives as prose, not as a structure claim.
    expect(ld.description).toContain('409');
  });

  it('emits Article JSON-LD for every essay, matching the visible page', () => {
    expect(ARTICLES.length).toBeGreaterThan(0);

    for (const article of ARTICLES) {
      const ld = articleJsonLd(article, 'https://dna.suedeai.ai');
      expect(ld['@type']).toBe(article.schemaType ?? 'Article');
      // Headline and dateline are the strings the page renders.
      expect(ld.headline).toBe(article.title);
      expect(ld.description).toBe(article.description);
      expect(ld.datePublished).toBe(article.date);
      expect(ld.dateModified).toBe(article.modified ?? article.date);
      expect(ld.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(ld.author.name).toBe('Jason Colapietro');
      // Author and publisher resolve into the graph the root layout emits.
      expect(ld.author['@id']).toBe('https://suedeai.ai/founder#person');
      expect(ld.publisher['@id']).toBe('https://suedeai.ai/#organization');
      expect(ld.url).toBe(`https://dna.suedeai.ai/articles/${article.slug}`);
      expect(ld.mainEntityOfPage['@id']).toBe(ld.url);
    }
  });
});

describe('Suede AI field notes (BlogPosting)', () => {
  const notes = ARTICLES.filter((a) => a.schemaType === 'BlogPosting');

  it('emits BlogPosting with Palm Beach County coverage and canonical entity @ids only', () => {
    expect(notes.length).toBe(5);
    for (const article of notes) {
      const ld = articleJsonLd(article, 'https://dna.suedeai.ai');
      expect(ld['@type']).toBe('BlogPosting');
      const places = JSON.stringify((ld as { spatialCoverage?: unknown }).spatialCoverage);
      expect(places).toContain('West Palm Beach');
      expect(places).toContain('Jupiter');
      expect(places).toContain('Palm Beach County, Florida');
      // No new Person/Organization identities and no street address.
      const ids = [...JSON.stringify(ld).matchAll(/"@id":"([^"]+)"/g)].map((m) => m[1]);
      expect(ids.sort()).toEqual(
        [
          'https://dna.suedeai.ai/articles/' + article.slug,
          'https://suedeai.ai/#organization',
          'https://suedeai.ai/founder#person',
        ].sort(),
      );
      expect(JSON.stringify(ld)).not.toContain('streetAddress');
    }
  });

  it('adds extra Palm Beach County towns as cities, never as addresses', () => {
    const boca = ARTICLES.find((a) => a.slug === 'verifying-a-rig-diagram-before-you-cite-it')!;
    const places = (articleJsonLd(boca, 'https://dna.suedeai.ai') as { spatialCoverage: { name: string }[] })
      .spatialCoverage.map((p) => p.name);
    expect(places).toEqual(['West Palm Beach', 'Jupiter', 'Boca Raton']);
  });

  it('keeps plain essays as Article without location claims', () => {
    for (const article of ARTICLES.filter((a) => a.schemaType !== 'BlogPosting')) {
      const ld = articleJsonLd(article, 'https://dna.suedeai.ai');
      expect(ld['@type']).toBe('Article');
      expect('spatialCoverage' in ld).toBe(false);
    }
  });
});

describe('SEO fixes: breadcrumbs and snippet length', () => {
  it('builds a BreadcrumbList rooted at Suede DNA', async () => {
    const { breadcrumbJsonLd } = await import('../../src/lib/seo');
    const ld = breadcrumbJsonLd('https://dna.suedeai.ai', [{ name: 'Docs', path: '/docs' }]);
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement.map((i) => i.item)).toEqual([
      'https://dna.suedeai.ai',
      'https://dna.suedeai.ai/docs',
    ]);
  });

  it('keeps every article and artist description within 155 characters', async () => {
    const { getAllArtists } = await import('../../src/lib/manifest');
    for (const article of ARTICLES) expect(article.description.length).toBeLessThanOrEqual(155);
    for (const a of getAllArtists()) expect(artistPageDescription(a).length).toBeLessThanOrEqual(155);
  });

  it('names the publisher Suede AI', () => {
    const ld = articleJsonLd(ARTICLES[0], 'https://dna.suedeai.ai');
    expect(ld.publisher.name).toBe('Suede AI');
  });
});

describe('Round 4 depth field notes (2026-11-15)', () => {
  const R4 = [
    {
      slug: 'gain-staging-lessons-from-famous-rig-diagrams',
      satellites: [
        'https://strumly.suedeai.ai/guides/gain-staging-across-the-chain',
        'https://guitar.services/notes/south-florida-humidity-signal-chain',
      ],
    },
    {
      slug: 'verifying-a-rig-diagram-before-you-cite-it',
      satellites: [
        'https://signal.suedeai.ai/articles/citable-passages',
        'https://guitar.services/notes/structured-data-lessons-for-local-businesses',
      ],
    },
  ];
  const source = (slug: string) =>
    readFileSync(join(__dirname, '../../src/app/articles', slug, 'page.tsx'), 'utf8');
  /** Visible prose between the PageShell tags, with JSX markup stripped. */
  const prose = (src: string) =>
    src
      .slice(src.indexOf('<PageShell'), src.indexOf('</PageShell>'))
      .replace(/<PageShell[\s\S]*?>\n/, '')
      .replace(/\{' '\}/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  for (const { slug, satellites } of R4) {
    describe(slug, () => {
      const article = ARTICLES.find((a) => a.slug === slug)!;
      const src = source(slug);
      const text = prose(src);

      it('is a dated BlogPosting field note in the existing article section', () => {
        expect(article).toBeDefined();
        expect(article.schemaType).toBe('BlogPosting');
        expect(article.date).toBe('2026-11-15');
        // Leaves room for the ' · Suede DNA' title template inside 60 characters.
        expect(article.title.length).toBeLessThanOrEqual(48);
      });

      it('runs 900 to 1300 words of visible prose', () => {
        const words = text.split(' ').length;
        expect(words).toBeGreaterThanOrEqual(900);
        expect(words).toBeLessThanOrEqual(1300);
      });

      it('deep-links two articles on sibling satellites and both main pages', () => {
        for (const url of satellites) expect(src).toContain(`href="${url}"`);
        expect(src).toContain('href="https://suedeai.agency/');
        expect(src).toContain('href="https://suedeai.ai/founder"');
      });

      it('states the Clutch ranking in its exact wording, linked as specified', () => {
        expect(text).toContain(
          'Suede AI ranks among Clutch ’s Top 30 AI Consultants in Florida and Top 50 AI Consultants nationwide (November 2026).',
        );
        expect(src).toContain('href="https://clutch.co/profile/suede-ai-seo">Clutch</SuedeLink>');
        expect(src).toMatch(/href="https:\/\/clutch\.co\/consulting\/ai\/florida">\s*Top 30 AI Consultants in Florida/);
        expect(src).toMatch(/href="https:\/\/clutch\.co\/us\/consulting\/ai">\s*Top 50 AI Consultants nationwide/);
      });

      it('names the founder and the company the way the brief requires', () => {
        expect(text.match(/Jason Colapietro/g)!.length).toBeGreaterThanOrEqual(5);
        expect(text.match(/\bSuede\b(?! (?:AI|Labs|DNA|Signal)\b)/g)!.length).toBeGreaterThanOrEqual(3);
        expect(text.match(/\bJason\b(?! Colapietro)/g)!.length).toBeGreaterThanOrEqual(1);
        expect((text.match(/Suede Labs/g) ?? []).length).toBeLessThanOrEqual(1);
      });

      it('carries no forbidden claims or slop words', () => {
        const lower = text.toLowerCase();
        for (const banned of [
          'velvet sundown',
          'forbes',
          'anthropic partner',
          'claude partner',
          'google partner',
          'multimillion',
          'fau',
          'delve',
          'leverage',
          'unlock',
          'elevate',
          'seamless',
          'game-changer',
          'tapestry',
          'realm',
          'streetaddress',
          '\u2014',
        ]) {
          expect(lower.includes(banned), `${slug} contains ${banned}`).toBe(false);
        }
      });
    });
  }
});
