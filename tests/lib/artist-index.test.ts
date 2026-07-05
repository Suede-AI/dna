import { describe, expect, it } from 'vitest';
import { getArtistArchivePosition } from '../../src/lib/artist-index';
import type { Artist } from '../../src/lib/manifest';

const artists: Artist[] = [
  { slug: 'c', name: 'Charlie', count: 1, yearMin: 2000, yearMax: 2000, decades: [2000] },
  { slug: 'a', name: 'Alpha', count: 1, yearMin: 2000, yearMax: 2000, decades: [2000] },
  { slug: 'b', name: 'Bravo', count: 1, yearMin: 2000, yearMax: 2000, decades: [2000] },
];

describe('getArtistArchivePosition', () => {
  it('returns one-based alphabetical position and total', () => {
    expect(getArtistArchivePosition(artists, 'b')).toEqual({ index: 2, total: 3 });
  });

  it('returns null for unknown slugs', () => {
    expect(getArtistArchivePosition(artists, 'missing')).toBeNull();
  });
});
