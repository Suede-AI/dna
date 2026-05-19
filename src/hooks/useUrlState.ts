'use client';

import { useCallback, useEffect, useState } from 'react';
import { type FilterState, DEFAULT_FILTER_STATE, type SortOrder } from '@/lib/filters';

function decodeDecades(raw: string | null): number[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((d) => Number(d.trim()))
    .filter((n) => Number.isFinite(n) && n >= 1900 && n <= 2100 && n % 10 === 0);
}

function decodeSort(raw: string | null): SortOrder {
  if (raw === 'year-asc' || raw === 'year-desc' || raw === 'name-asc') return raw;
  return 'name-asc';
}

function readFromUrl(): FilterState {
  if (typeof window === 'undefined') return DEFAULT_FILTER_STATE;
  const params = new URLSearchParams(window.location.search);
  return {
    decades: decodeDecades(params.get('decades')),
    q: params.get('q') ?? '',
    sort: decodeSort(params.get('sort')),
  };
}

function writeToUrl(state: FilterState) {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams();
  if (state.decades.length) params.set('decades', state.decades.map(String).join(','));
  if (state.q) params.set('q', state.q);
  if (state.sort !== 'name-asc') params.set('sort', state.sort);
  const qs = params.toString();
  const url = qs ? `?${qs}` : window.location.pathname;
  window.history.replaceState(null, '', url);
}

export function useUrlState(): [FilterState, (next: Partial<FilterState>) => void] {
  const [state, setState] = useState<FilterState>(DEFAULT_FILTER_STATE);

  useEffect(() => {
    setState(readFromUrl());
  }, []);

  const update = useCallback((next: Partial<FilterState>) => {
    setState((curr) => {
      const merged = { ...curr, ...next };
      writeToUrl(merged);
      return merged;
    });
  }, []);

  return [state, update];
}
