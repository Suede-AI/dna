'use client';

import { DecadeChips } from './DecadeChips';
import { SearchInput } from '../search/SearchInput';
import type { FilterState, ResultCounts, SortOrder } from '@/lib/filters';

const SORTS: { value: SortOrder; label: string }[] = [
  { value: 'name-asc', label: 'A–Z' },
  { value: 'year-asc', label: 'YEAR ↑' },
  { value: 'year-desc', label: 'YEAR ↓' },
];

export function FilterRail({
  state,
  onChange,
  sortDisabled = false,
  resultCounts,
}: {
  state: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  sortDisabled?: boolean;
  resultCounts?: ResultCounts;
}) {
  const toggleDecade = (d: number) => {
    onChange({
      decades: state.decades.includes(d) ? state.decades.filter((x) => x !== d) : [...state.decades, d],
    });
  };
  return (
    <div className="sticky top-[7.5rem] z-30 border-y hairline backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-ink-1)]/80">
      <div className="mx-auto max-w-[1400px] px-6 py-4 flex flex-wrap items-center gap-6">
        <DecadeChips selected={state.decades} onToggle={toggleDecade} />
        <div role="group" aria-label="Sort order" className="flex items-center gap-2">
          {SORTS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => {
                if (!sortDisabled) onChange({ sort: s.value });
              }}
              aria-pressed={state.sort === s.value}
              aria-disabled={sortDisabled || undefined}
              className="mono-label h-8 px-2"
              style={{
                color: sortDisabled
                  ? 'var(--color-mute)'
                  : state.sort === s.value
                    ? 'var(--color-white)'
                    : 'var(--color-mute)',
                borderBottom:
                  !sortDisabled && state.sort === s.value
                    ? '1px solid var(--color-signal)'
                    : '1px solid transparent',
                cursor: sortDisabled ? 'not-allowed' : 'pointer',
                opacity: sortDisabled ? 0.55 : 1,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="ml-auto w-full sm:w-72">
          <SearchInput value={state.q} onChange={(q) => onChange({ q })} />
        </div>
        {resultCounts ? (
          <p className="mono-label basis-full" aria-live="polite">
            {resultCounts.artists} ARTISTS · {resultCounts.rigs} RIGS
          </p>
        ) : null}
      </div>
    </div>
  );
}
