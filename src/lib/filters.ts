import type { Artist } from './manifest';
import { searchArtists } from './search';

export type SortOrder = 'name-asc' | 'year-asc' | 'year-desc';

export type FilterState = {
  decades: number[];
  q: string;
  sort: SortOrder;
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
