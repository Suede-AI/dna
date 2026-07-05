import Link from 'next/link';
import { HeroSpecimenDeck } from './HeroSpecimenDeck';
import { HeroWaveform } from './HeroWaveform';
import { getAllRigs, getStats } from '@/lib/manifest';

const HERO_RIG_IDS = [
  'vanhalen_eddie-1997',
  'the_kinks_dave_davies-1964',
  'the_pixies_joey_santiago-2014',
];

export function HomeHero() {
  const { totalRigs, yearMin, yearMax } = getStats();
  const allRigs = getAllRigs();
  const heroRigs = HERO_RIG_IDS.flatMap((id) => {
    const rig = allRigs.find((candidate) => candidate.id === id);
    return rig ? [rig] : [];
  });

  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="home-hero__inner">
        <div className="home-hero__copy">
          <p className="mono-label">SUEDE/DNA — GUITAR RIG ARCHIVE</p>
          <h1
            id="hero-heading"
            className="home-hero__title font-[820] text-white"
            style={{
              letterSpacing: 0,
            }}
          >
            <span className="block animate-[sweep-in_var(--duration-hero)_var(--ease-sweep)_both]">
              THE RIGS
            </span>
            <span
              className="block animate-[sweep-in_var(--duration-hero)_var(--ease-sweep)_both]"
              style={{ animationDelay: '200ms' }}
            >
              LEFT A TRACE.
            </span>
          </h1>
          <p
            className="home-hero__lede text-[color:var(--color-bone)]"
            style={{ fontSize: 'var(--text-body)' }}
          >
            {totalRigs.toLocaleString()} documented signal chains from {yearMin}–{yearMax}. Real
            diagrams, preserved as artifacts, indexed by player, year, and the gear decisions that
            made the records.
          </p>
          <div className="home-hero__actions flex flex-wrap gap-4">
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
        </div>
        <HeroSpecimenDeck rigs={heroRigs} />
      </div>
      <HeroWaveform />
    </section>
  );
}
