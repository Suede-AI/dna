'use client';

export function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-2 h-9 px-3 hairline mono" style={{ borderRadius: 'var(--radius-control)' }}>
      <span className="mono-label">SEARCH</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="artist or year"
        className="bg-transparent outline-none text-white placeholder:text-[color:var(--color-mute)] w-full"
      />
    </label>
  );
}
