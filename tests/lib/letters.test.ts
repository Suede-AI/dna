import { describe, expect, it } from 'vitest';
import { getArtistInitial, getAvailableLetters } from '../../src/lib/letters';
import type { Artist } from '../../src/lib/manifest';

const artists: Artist[] = [
  { slug: 'numbers', name: '10000maniacs Rob', count: 1, yearMin: 2000, yearMax: 2000, decades: [2000] },
  { slug: 'alpha', name: 'Alpha Player', count: 1, yearMin: 2000, yearMax: 2000, decades: [2000] },
  { slug: 'beta', name: 'Beta Player', count: 1, yearMin: 2000, yearMax: 2000, decades: [2000] },
  { slug: 'another', name: 'Another Player', count: 1, yearMin: 2000, yearMax: 2000, decades: [2000] },
];

describe('letter helpers', () => {
  it('derives artist initials for rail-compatible letters', () => {
    expect(getArtistInitial('Alpha Player')).toBe('A');
    expect(getArtistInitial('  beta')).toBe('B');
    expect(getArtistInitial('10000maniacs Rob')).toBe('#');
  });

  it('returns sorted available A-Z letters only once', () => {
    expect(getAvailableLetters(artists)).toEqual(['A', 'B']);
  });
});
