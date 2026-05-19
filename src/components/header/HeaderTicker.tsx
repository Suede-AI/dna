import { getStats } from '@/lib/manifest';

export function HeaderTicker() {
  const { totalRigs, totalArtists, yearMin, yearMax } = getStats();
  return (
    <div className="border-b hairline">
      <div className="mx-auto max-w-[1600px] px-6 py-2 mono-label flex items-center gap-4">
        <span className="text-[color:var(--color-signal)]">●</span>
        <span>{totalRigs.toLocaleString()} RIGS</span>
        <span className="text-[color:var(--color-mute)]">·</span>
        <span>{totalArtists.toLocaleString()} ARTISTS</span>
        <span className="text-[color:var(--color-mute)]">·</span>
        <span>{yearMin} – {yearMax}</span>
        <span className="ml-auto hidden sm:inline text-[color:var(--color-mute)]">
          SOURCE: archive.org/guitargeek-archives
        </span>
      </div>
    </div>
  );
}
