import type { Artist, Rig } from './manifest';
import { parseSearchQuery, searchArtists, yearMatchesRanges } from './search';

export type SortOrder = 'name-asc' | 'year-asc' | 'year-desc';

export type FilterState = {
  decades: number[];
  q: string;
  sort: SortOrder;
};

export type ResultCounts = {
  artists: number;
  rigs: number;
};

export type FilterSummaryFacet =
  | { kind: 'decade'; value: number; label: string }
  | { kind: 'query'; value: string; label: string };

export type FilterSummary = {
  active: boolean;
  countLabel: string;
  facets: FilterSummaryFacet[];
};

export const DEFAULT_FILTER_STATE: FilterState = {
  decades: [],
  q: '',
  sort: 'name-asc',
};

export function filterArtists(artists: Artist[], state: FilterState): Artist[] {
  const decadeFiltered = artists.filter((a) => {
    if (state.decades.length > 0 && !state.decades.some((d) => a.decades.includes(d))) {
      return false;
    }
    return true;
  });

  return searchArtists(decadeFiltered, state.q);
}

export function filterRigs(rigs: Rig[], artists: Artist[], state: FilterState): Rig[] {
  const artistSlugs = new Set(artists.map((artist) => artist.slug));
  const { yearRanges } = parseSearchQuery(state.q);

  return rigs.filter((rig) => {
    if (!artistSlugs.has(rig.artistSlug)) return false;
    if (state.decades.length > 0 && !state.decades.includes(getDecade(rig.year))) return false;
    return yearMatchesRanges(rig.year, yearRanges);
  });
}

export function sortArtists(artists: Artist[], order: SortOrder): Artist[] {
  const copy = [...artists];
  switch (order) {
    case 'name-asc':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'year-asc':
      return copy.sort((a, b) => a.yearMin - b.yearMin || a.name.localeCompare(b.name));
    case 'year-desc':
      return copy.sort((a, b) => b.yearMax - a.yearMax || a.name.localeCompare(b.name));
  }
}

function getDecade(year: number): number {
  return Math.floor(year / 10) * 10;
}

export function countResults(artists: Artist[], rigs: Rig[]): ResultCounts {
  return {
    artists: artists.length,
    rigs: rigs.length,
  };
}

export function summarizeFilters(state: FilterState, counts: ResultCounts): FilterSummary {
  const facets: FilterSummaryFacet[] = [
    ...[...state.decades].sort((a, b) => a - b).map((decade) => ({
      kind: 'decade' as const,
      value: decade,
      label: `'${String(decade).slice(-2).padStart(2, '0')}S`,
    })),
  ];

  const query = state.q.trim();
  if (query) {
    facets.push({ kind: 'query', value: query, label: `"${query.toUpperCase()}"` });
  }

  return {
    active: facets.length > 0,
    countLabel: `${counts.artists} ARTISTS · ${counts.rigs} RIGS`,
    facets,
  };
}
