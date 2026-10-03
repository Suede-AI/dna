import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ARTICLES } from '../../src/lib/articles-content';
import { canonicalArtistSlug } from '../../src/lib/canonical-artists';
import { citingArticles, relatedArtists, yearPeers } from '../../src/lib/artist-connections';
import { getAllArtists, getAllRigs, getArtistBySlug } from '../../src/lib/manifest';
import { artistIsIndexable } from '../../src/lib/seo';

const artists = getAllArtists();
const rigs = getAllRigs();
const get = (slug: string) => {
  const a = getArtistBySlug(slug);
  if (!a) throw new Error(`missing ${slug}`);
  return a;
};

describe('relatedArtists', () => {
  it('links the same player across bands', () => {
    const r = relatedArtists(get('ratm-tom-morello'), artists);
    expect(r.map((x) => [x.artist.slug, x.relation])).toEqual([['audioslave-tom-morello', 'same-player']]);
  });

  it('links two players of the same band', () => {
    const r = relatedArtists(get('iron-maiden-dave'), artists);
    expect(r.map((x) => [x.artist.slug, x.relation])).toEqual([['iron-maiden-adrian-smith', 'same-band']]);
  });

  it('returns nothing for an artist with no reviewed relative', () => {
    expect(relatedArtists(get('hendrix-jimi'), artists)).toEqual([]);
  });

  it('never returns or is computed for an unreviewed page', () => {
    for (const a of artists) {
      const r = relatedArtists(a, artists);
      if (!artistIsIndexable(a)) expect(r).toEqual([]);
      for (const x of r) expect(artistIsIndexable(x.artist)).toBe(true);
    }
  });
});

describe('yearPeers', () => {
  it('counts the archive rigs dated in each of the artist’s years', () => {
    const [entry] = yearPeers(get('311-tim-mahoney'), rigs, artists);
    expect(entry.year).toBe(2009);
    expect(entry.rigCount).toBe(rigs.filter((r) => r.year === 2009).length);
    expect(entry.peers.map((p) => p.slug)).not.toContain('311-tim-mahoney');
    for (const p of entry.peers) {
      expect(artistIsIndexable(p)).toBe(true);
      expect(rigs.some((r) => r.artistSlug === p.slug && r.year === 2009)).toBe(true);
    }
  });

  it('gives one entry per distinct rig year', () => {
    const years = yearPeers(get('ozzy-zakk-wylde'), rigs, artists).map((y) => y.year);
    expect(years).toEqual([1988, 2000, 2011]);
  });
});

describe('citingArticles', () => {
  it('lists the essays that link to an artist page', () => {
    expect(citingArticles(get('eric-clapton-cream'), ARTICLES).map((a) => a.slug)).toEqual([
      'building-a-tone-over-a-career',
    ]);
  });

  it('keeps each essay’s artistSlugs equal to the artist pages its body actually links', () => {
    const slugs = new Set(artists.map((a) => a.slug));
    for (const article of ARTICLES) {
      const src = readFileSync(join(__dirname, '../../src/app/articles', article.slug, 'page.tsx'), 'utf8');
      const linked = new Set(
        [...src.matchAll(/href="\/([a-z0-9-]+)"/g)]
          .map((m) => canonicalArtistSlug(m[1]))
          .filter((s) => slugs.has(s)),
      );
      expect(new Set(article.artistSlugs ?? []), article.slug).toEqual(linked);
    }
  });
});
