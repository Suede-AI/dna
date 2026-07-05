import Link from 'next/link';
import { HeroSignalChain } from './HeroSignalChain';
import { HeroWaveform } from './HeroWaveform';
import { getStats } from '@/lib/manifest';

export function HomeHero() {
  const { totalRigs, totalArtists, yearMin, yearMax } = getStats();

  return (
    <section className="relative min-h-[90vh] flex items-center" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-[1400px] w-full items-center gap-12 px-6 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.82fr)]">
        <div>
          <p className="mono-label">SUEDE/DNA — TONAL GENEALOGY ARCHIVE</p>
          <h1
            id="hero-heading"
            className="mt-6 font-[820] text-white"
            style={{
              fontSize: 'var(--text-hero)',
              lineHeight: 0.95,
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            <span className="block animate-[sweep-in_var(--duration-hero)_var(--ease-sweep)_both]">
              SIGNAL CHAINS,
            </span>
            <span
              className="block animate-[sweep-in_var(--duration-hero)_var(--ease-sweep)_both]"
              style={{ animationDelay: '200ms' }}
            >
              ARCHIVED.
            </span>
          </h1>
          <p
            className="mt-10 max-w-[720px] text-[color:var(--color-bone)]"
            style={{ fontSize: 'var(--text-body)' }}
          >
            The rigs that made the records. {totalRigs.toLocaleString()} artist setups documented
            between {yearMin} and {yearMax}, sourced from the Guitar Geek archives, indexed by year
            and player.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#archive"
              className="h-12 px-6 inline-flex items-center gap-2 bg-white text-[color:var(--color-ink-1)] mono text-sm font-medium"
              style={{ borderRadius: 'var(--radius-card)', boxShadow: '0 0 24px var(--color-signal-glow)' }}
            >
              BROWSE THE ARCHIVE ↓
            </Link>
            <Link
              href="/about"
              className="h-12 px-6 inline-flex items-center gap-2 border text-white mono text-sm"
              style={{
                borderColor: 'var(--color-signal)',
                borderRadius: 'var(--radius-card)',
              }}
            >
              READ THE METHOD →
            </Link>
          </div>
          <p className="mt-12 mono-label">
            {totalRigs.toLocaleString()} RIGS · {totalArtists.toLocaleString()} ARTISTS · {yearMin}–{yearMax}
          </p>
        </div>
        <HeroSignalChain />
      </div>
      <HeroWaveform />
    </section>
  );
}
