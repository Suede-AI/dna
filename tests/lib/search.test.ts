import { describe, it, expect } from 'vitest';
import artistsData from '../../data/artists.json';
import { ARTIST_ALIASES } from '../../src/lib/aliases';
import {
  damerauLevenshteinDistanceWithin,
  isYearQuery,
  normalize,
  searchArtists,
  suggestArtists,
  usesRelevanceSort,
} from '../../src/lib/search';
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

  it('matches punctuation-normalized real artist names', () => {
    const artists = artistsData as Artist[];
    expect(searchArtists(artists, '311 tim')[0].slug).toBe('311-tim-mahoney');
    expect(searchArtists(artists, 'tim mahoney')[0].slug).toBe('311-tim-mahoney');
  });

  it('matches order-insensitive multi-token real artist names', () => {
    const artists = artistsData as Artist[];
    expect(searchArtists(artists, 'day remember')[0].slug).toBe('a-day-to-remember-kevin-skaff');
  });

  it('handles apostrophes, diacritics, and reversed token order', () => {
    const artists: Artist[] = [
      { slug: 'one', name: "Café O'Connor", count: 1, yearMin: 1998, yearMax: 1998, decades: [1990] },
      { slug: 'two', name: 'Plain Name', count: 1, yearMin: 1998, yearMax: 1998, decades: [1990] },
    ];
    expect(searchArtists(artists, 'cafe connor')[0].slug).toBe('one');
    expect(searchArtists(artists, 'oconnor')[0].slug).toBe('one');
    expect(searchArtists(artists, 'connor cafe')[0].slug).toBe('one');
  });

  it('finds real artists from one-typo queries', () => {
    const artists = artistsData as Artist[];
    expect(searchArtists(artists, 'hendrx')[0].slug).toBe('hendrix-jimi');
    expect(searchArtists(artists, 'calpton')[0].slug).toBe('eric-clapton-bluesbreakers');
    expect(searchArtists(artists, 'frusciant')[0].slug).toBe('rhcp-john-frusciante');
  });

  it('keeps exact and substring matches ahead of fuzzy matches', () => {
    const artists: Artist[] = [
      { slug: 'exact', name: 'Hendrx', count: 1, yearMin: 2000, yearMax: 2000, decades: [2000] },
      { slug: 'fuzzy', name: 'Hendrix', count: 1, yearMin: 2000, yearMax: 2000, decades: [2000] },
      { slug: 'substring', name: 'The Hendrx Machine', count: 1, yearMin: 2000, yearMax: 2000, decades: [2000] },
    ];
    expect(searchArtists(artists, 'hendrx').map((a) => a.slug)).toEqual(['exact', 'substring', 'fuzzy']);
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

describe('normalize', () => {
  it('strips marks, converts punctuation to spaces, and collapses whitespace', () => {
    expect(normalize(" Café — O'Connor / Delay & Fuzz ")).toBe('cafe o connor delay fuzz');
  });
});

describe('suggestArtists', () => {
  it('suggests fuzzy artist matches and respects the limit', () => {
    const artists = artistsData as Artist[];
    const suggestions = suggestArtists(artists, 'hendrx', 2);
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].slug).toBe('hendrix-jimi');
  });

  it('returns no suggestions for blank and year queries', () => {
    expect(suggestArtists(A, '')).toEqual([]);
    expect(suggestArtists(A, '1990')).toEqual([]);
  });

  it('caps suggestions at three by default', () => {
    const artists: Artist[] = [
      { slug: 'one', name: 'Alpha Tone', count: 1, yearMin: 1990, yearMax: 1990, decades: [1990] },
      { slug: 'two', name: 'Alpha Drive', count: 1, yearMin: 1990, yearMax: 1990, decades: [1990] },
      { slug: 'three', name: 'Alpha Delay', count: 1, yearMin: 1990, yearMax: 1990, decades: [1990] },
      { slug: 'four', name: 'Alpha Amp', count: 1, yearMin: 1990, yearMax: 1990, decades: [1990] },
    ];
    expect(suggestArtists(artists, 'alpha').map((a) => a.slug)).toEqual(['one', 'two', 'three']);
  });
});

describe('artist aliases', () => {
  it('resolves curated aliases against real slugs', () => {
    const artists = artistsData as Artist[];
    expect(searchArtists(artists, 'evh')[0].slug).toBe('vanhalen-eddie');
    expect(searchArtists(artists, 'stevie ray vaughan')[0].slug).toBe('srv');
    expect(searchArtists(artists, 'satch')[0].slug).toBe('satriani-joe');
    expect(searchArtists(artists, 'saul hudson')[0].slug).toBe('slash');
    expect(searchArtists(artists, 'pete townshend')[0].slug).toBe('who-pete');
  });

  it('contains only real manifest slugs and stays small', () => {
    const slugs = new Set((artistsData as Artist[]).map((artist) => artist.slug));
    expect(Object.keys(ARTIST_ALIASES)).toHaveLength(7);
    for (const slug of Object.keys(ARTIST_ALIASES)) {
      expect(slugs.has(slug)).toBe(true);
    }
  });
});

describe('damerauLevenshteinDistanceWithin', () => {
  it('detects substitutions, deletions, and adjacent swaps inside the bound', () => {
    expect(damerauLevenshteinDistanceWithin('hendrx', 'hendrix', 1)).toBe(1);
    expect(damerauLevenshteinDistanceWithin('frusciant', 'frusciante', 2)).toBe(1);
    expect(damerauLevenshteinDistanceWithin('calpton', 'clapton', 1)).toBe(1);
  });

  it('returns null when length or distance exceeds the bound', () => {
    expect(damerauLevenshteinDistanceWithin('srv', 'stevie', 1)).toBeNull();
    expect(damerauLevenshteinDistanceWithin('hendzzz', 'hendrix', 1)).toBeNull();
  });
});
