import { describe, it, expect } from 'vitest';
import { isYearQuery, searchArtists, usesRelevanceSort } from '../../src/lib/search';
import type { Artist } from '../../src/lib/manifest';

const A: Artist[] = [
  { slug: 'eric-clapton', name: 'Eric Clapton', count: 5, yearMin: 1966, yearMax: 1989, decades: [1960, 1970, 1980] },
  { slug: 'eric-johnson', name: 'Eric Johnson', count: 3, yearMin: 1990, yearMax: 1998, decades: [1990] },
  { slug: 'jimi-hendrix', name: 'Jimi Hendrix', count: 2, yearMin: 1967, yearMax: 1970, decades: [1960, 1970] },
];

describe('searchArtists', () => {
  it('returns full list when query is empty', () => {
    expect(searchArtists(A, '').length).toBe(3);
  });

  it('ranks exact name match first', () => {
    const results = searchArtists(A, 'Eric Clapton');
    expect(results[0].slug).toBe('eric-clapton');
  });

  it('matches partial first name', () => {
    const results = searchArtists(A, 'eric');
    expect(results.map((a) => a.slug)).toEqual(expect.arrayContaining(['eric-clapton', 'eric-johnson']));
  });

  it('matches year-like queries', () => {
    const results = searchArtists(A, '1990');
    expect(results.find((a) => a.slug === 'eric-johnson')).toBeTruthy();
  });

  it('ranks prefix matches above substring matches', () => {
    const artists: Artist[] = [
      { slug: 'sub', name: 'The Electric Erics', count: 1, yearMin: 1990, yearMax: 1990, decades: [1990] },
      { slug: 'prefix', name: 'Eric Machine', count: 1, yearMin: 1990, yearMax: 1990, decades: [1990] },
    ];
    expect(searchArtists(artists, 'eric')[0].slug).toBe('prefix');
  });
});

describe('query classification', () => {
  it('treats only pure 4-digit queries as year queries', () => {
    expect(isYearQuery('1997')).toBe(true);
    expect(isYearQuery(' 1997 ')).toBe(true);
    expect(isYearQuery('1997 tone')).toBe(false);
  });

  it('uses relevance sort only for text queries', () => {
    expect(usesRelevanceSort('hendrix')).toBe(true);
    expect(usesRelevanceSort('1997')).toBe(false);
    expect(usesRelevanceSort('')).toBe(false);
  });
});
