'use client';

const DECADES = [1960, 1970, 1980, 1990, 2000, 2010];

export function DecadeChips({
  selected,
  onToggle,
}: {
  selected: number[];
  onToggle: (decade: number) => void;
}) {
  return (
    <div role="group" aria-label="Filter by decade" className="flex flex-wrap gap-2">
      {DECADES.map((d) => {
        const isActive = selected.includes(d);
        return (
          <button
            key={d}
            type="button"
            onClick={() => onToggle(d)}
            aria-pressed={isActive}
            className="h-8 px-3 inline-flex items-center gap-2 hairline mono text-[0.6875rem] uppercase tracking-[0.08em]"
            style={{
              borderRadius: 'var(--radius-control)',
              color: isActive ? 'var(--color-white)' : 'var(--color-mute)',
              background: isActive ? 'var(--color-ink-3)' : 'transparent',
            }}
          >
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: isActive ? 'var(--color-signal)' : 'transparent', border: isActive ? 'none' : '1px solid var(--color-mute)' }}
            />
            &apos;{String(d).slice(-2).padStart(2, '0')}s
          </button>
        );
      })}
    </div>
  );
}
