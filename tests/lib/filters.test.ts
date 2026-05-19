import { describe, it, expect } from 'vitest';
import { filterArtists, sortArtists, type FilterState } from '../../src/lib/filters';
import type { Artist } from '../../src/lib/manifest';

const A: Artist[] = [
  { slug: 'a-1', name: 'A One', count: 1, yearMin: 1969, yearMax: 1969, decades: [1960] },
  { slug: 'b-2', name: 'B Two', count: 3, yearMin: 1971, yearMax: 1989, decades: [1970, 1980] },
  { slug: 'c-3', name: 'C Three', count: 2, yearMin: 2003, yearMax: 2005, decades: [2000] },
];

describe('filterArtists', () => {
  it('returns all artists when filters are empty', () => {
    const state: FilterState = { decades: [], q: '', sort: 'name-asc' };
    expect(filterArtists(A, state).map((a) => a.slug)).toEqual(['a-1', 'b-2', 'c-3']);
  });

  it('filters by decade (OR semantics)', () => {
    const state: FilterState = { decades: [1970], q: '', sort: 'name-asc' };
    expect(filterArtists(A, state).map((a) => a.slug)).toEqual(['b-2']);
  });

  it('filters by multiple decades (OR)', () => {
    const state: FilterState = { decades: [1960, 2000], q: '', sort: 'name-asc' };
    expect(filterArtists(A, state).map((a) => a.slug)).toEqual(['a-1', 'c-3']);
  });

  it('filters by query (case-insensitive substring on name)', () => {
    const state: FilterState = { decades: [], q: 'two', sort: 'name-asc' };
    expect(filterArtists(A, state).map((a) => a.slug)).toEqual(['b-2']);
  });

  it('combines decades and query', () => {
    const state: FilterState = { decades: [1970], q: 'b', sort: 'name-asc' };
    expect(filterArtists(A, state).map((a) => a.slug)).toEqual(['b-2']);
  });
});

describe('sortArtists', () => {
  it('sorts by name ascending', () => {
    expect(sortArtists(A, 'name-asc').map((a) => a.slug)).toEqual(['a-1', 'b-2', 'c-3']);
  });
  it('sorts by yearMin ascending', () => {
    expect(sortArtists(A, 'year-asc').map((a) => a.slug)).toEqual(['a-1', 'b-2', 'c-3']);
  });
  it('sorts by yearMax descending', () => {
    expect(sortArtists(A, 'year-desc').map((a) => a.slug)).toEqual(['c-3', 'b-2', 'a-1']);
  });
});
