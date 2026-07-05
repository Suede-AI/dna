'use client';

import { useEffect, useId, useRef } from 'react';

export function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) return;
      if (event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex items-center gap-2 h-9 px-3 hairline mono" style={{ borderRadius: 'var(--radius-control)' }}>
      <label htmlFor={id} className="mono-label">
        SEARCH
      </label>
      <input
        id={id}
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onChange('');
            e.currentTarget.blur();
          }
        }}
        placeholder="artist, year, range"
        aria-keyshortcuts="/ Meta+K Control+K"
        className="bg-transparent outline-none text-white placeholder:text-[color:var(--color-mute-readable)] w-full focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-signal)]"
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          className="mono-label px-1 text-[color:var(--color-bone)] hover:text-[color:var(--color-signal)]"
          aria-label="Clear search"
        >
          X
        </button>
      ) : (
        <kbd className="mono-label px-1.5 py-0.5 hairline" style={{ borderRadius: 'var(--radius-control)' }}>
          /
        </kbd>
      )}
    </div>
  );
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}
