'use client';

import { LETTERS } from '@/lib/letters';

export function LetterRail({
  activeLetter,
  availableLetters,
  onJump,
}: {
  activeLetter: string | null;
  availableLetters: string[];
  onJump: (l: string) => void;
}) {
  const available = new Set(availableLetters);

  return (
    <nav
      aria-label="Artist letter index"
      className="hidden lg:flex flex-col items-end gap-1 sticky self-start mono-label"
      style={{ top: 'calc(var(--header-h) + var(--filter-rail-h) + 1rem)' }}
    >
      {LETTERS.map((l) => {
        const disabled = !available.has(l);
        return (
          <button
            key={l}
            type="button"
            onClick={() => {
              if (!disabled) onJump(l);
            }}
            disabled={disabled}
            aria-disabled={disabled || undefined}
            className="h-5 px-1 transition-colors disabled:cursor-not-allowed"
            style={{
              color: activeLetter === l ? 'var(--color-signal)' : 'var(--color-mute)',
              opacity: disabled ? 0.25 : 1,
            }}
            aria-current={activeLetter === l ? 'location' : undefined}
          >
            {l}
          </button>
        );
      })}
    </nav>
  );
}
