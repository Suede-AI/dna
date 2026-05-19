import { getStats } from '@/lib/manifest';

export default function HomePage() {
  const stats = getStats();
  return (
    <main className="mx-auto max-w-[1400px] px-6 py-24">
      <p className="mono-label">SUEDE/DNA — TONAL GENEALOGY ARCHIVE</p>
      <h1
        className="font-[820] tracking-[var(--tracking-tight)] mt-4"
        style={{ fontSize: 'var(--text-hero)', lineHeight: 1, letterSpacing: 'var(--tracking-tight)' }}
      >
        SIGNAL CHAINS,
        <br />
        ARCHIVED.
      </h1>
      <p className="mt-8 max-w-[720px] text-[color:var(--color-bone)]">
        {stats.totalRigs.toLocaleString()} setups · {stats.totalArtists.toLocaleString()} artists ·{' '}
        {stats.yearMin}–{stats.yearMax}
      </p>
    </main>
  );
}
