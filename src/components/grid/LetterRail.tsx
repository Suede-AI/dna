'use client';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function LetterRail({ activeLetter, onJump }: { activeLetter: string | null; onJump: (l: string) => void }) {
  return (
    <nav
      aria-label="Artist letter index"
      className="hidden lg:flex flex-col items-end gap-1 sticky top-32 self-start mono-label"
    >
      {LETTERS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onJump(l)}
          className="h-5 px-1 transition-colors"
          style={{
            color: activeLetter === l ? 'var(--color-signal)' : 'var(--color-mute)',
          }}
          aria-current={activeLetter === l}
        >
          {l}
        </button>
      ))}
    </nav>
  );
}
