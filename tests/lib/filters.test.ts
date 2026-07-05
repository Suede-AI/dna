import { describe, it, expect } from 'vitest';
import { countResults, filterArtists, sortArtists, summarizeFilters, type FilterState } from '../../src/lib/filters';
import type { Artist, Rig } from '../../src/lib/manifest';

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

  it('filters by year query through the ranked search path', () => {
    const state: FilterState = { decades: [], q: '1980', sort: 'name-asc' };
    expect(filterArtists(A, state).map((a) => a.slug)).toEqual(['b-2']);
  });

  it('returns text queries in relevance order before sort is applied', () => {
    const artists: Artist[] = [
      { slug: 'substring', name: 'The Two Index', count: 1, yearMin: 1992, yearMax: 1992, decades: [1990] },
      { slug: 'prefix', name: 'Two Index', count: 1, yearMin: 2002, yearMax: 2002, decades: [2000] },
    ];
    const state: FilterState = { decades: [], q: 'two', sort: 'year-desc' };
    expect(filterArtists(artists, state).map((a) => a.slug)).toEqual(['prefix', 'substring']);
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

describe('countResults', () => {
  it('counts visible artists and rigs', () => {
    const rigs: Rig[] = [
      { id: 'r1', artistSlug: 'a-1', artistName: 'A One', year: 1969, src: 'https://example.com/a.jpg', format: 'jpg' },
      { id: 'r2', artistSlug: 'a-1', artistName: 'A One', year: 1970, src: 'https://example.com/b.jpg', format: 'jpg' },
      { id: 'r3', artistSlug: 'b-2', artistName: 'B Two', year: 1971, src: 'https://example.com/c.jpg', format: 'jpg' },
    ];

    expect(countResults(A.slice(0, 2), rigs)).toEqual({ artists: 2, rigs: 3 });
  });
});

describe('summarizeFilters', () => {
  it('returns inactive summary for default filters', () => {
    const state: FilterState = { decades: [], q: '', sort: 'name-asc' };
    expect(summarizeFilters(state, { artists: 3, rigs: 6 })).toEqual({
      active: false,
      countLabel: '3 ARTISTS · 6 RIGS',
      facets: [],
    });
  });

  it('summarizes decade and query facets with removable descriptors', () => {
    const state: FilterState = { decades: [1990, 1970], q: 'hendrix', sort: 'year-desc' };
    expect(summarizeFilters(state, { artists: 3, rigs: 5 })).toEqual({
      active: true,
      countLabel: '3 ARTISTS · 5 RIGS',
      facets: [
        { kind: 'decade', value: 1970, label: "'70S" },
        { kind: 'decade', value: 1990, label: "'90S" },
        { kind: 'query', value: 'hendrix', label: '"HENDRIX"' },
      ],
    });
  });
});
