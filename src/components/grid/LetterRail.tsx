'use client';

import { useRef } from 'react';
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
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const focusRelativeLetter = (current: string, direction: -1 | 1) => {
    const enabledLetters = LETTERS.filter((letter) => available.has(letter));
    const currentIndex = enabledLetters.indexOf(current);
    if (currentIndex === -1) return;
    const next = enabledLetters[Math.min(Math.max(currentIndex + direction, 0), enabledLetters.length - 1)];
    buttonRefs.current[next]?.focus();
  };

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
            ref={(node) => {
              buttonRefs.current[l] = node;
            }}
            onClick={() => {
              if (!disabled) onJump(l);
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowUp') {
                event.preventDefault();
                focusRelativeLetter(l, -1);
              }
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                focusRelativeLetter(l, 1);
              }
            }}
            disabled={disabled}
            aria-disabled={disabled || undefined}
            className="h-5 px-1 transition-colors disabled:cursor-not-allowed"
            style={{
              color: activeLetter === l ? 'var(--color-signal)' : 'var(--color-mute-readable)',
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
