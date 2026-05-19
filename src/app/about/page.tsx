import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'How Suede DNA is sourced, structured, and attributed. The Guitar Geek archives, the Internet Archive, and the method behind the compilation.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[800px] px-6 py-24">
      <p className="mono-label">SUEDE/DNA / ABOUT</p>
      <h1
        className="font-[820] text-white mt-4"
        style={{ fontSize: 'var(--text-section)', lineHeight: 1, letterSpacing: 'var(--tracking-tight)' }}
      >
        The method.
      </h1>

      <article className="mt-12 space-y-10 text-[color:var(--color-bone)] leading-relaxed">
        <section>
          <h2 className="mono-label text-[color:var(--color-white)]">PREMISE</h2>
          <p className="mt-3">
            Suede DNA is a compilation archive of guitarists&apos; rigs. Each artist&apos;s chain of
            documented setups across the years is treated as a tonal genealogy — a literal signal
            chain stretched across time. The site is structured around two views: a discovery grid
            of every rig in the archive, and per-artist pages presenting that artist&apos;s rigs as a
            chronological strand.
          </p>
        </section>

        <section>
          <h2 className="mono-label text-[color:var(--color-white)]">SOURCE</h2>
          <p className="mt-3">
            Every photograph in this archive originates from the{' '}
            <a
              href="https://archive.org/details/guitargeek-archives"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[color:var(--color-signal)] underline-offset-4 hover:underline"
            >
              Guitar Geek archive item
            </a>{' '}
            on the Internet Archive. Filenames follow{' '}
            <code className="mono text-white">artist_guitar_rig_year.ext</code>; we parse this
            grammar at build time and curate display names through an{' '}
            <code className="mono text-white">overrides.json</code> map.
          </p>
        </section>

        <section>
          <h2 className="mono-label text-[color:var(--color-white)]">METHOD</h2>
          <p className="mt-3">
            We do not interpret rig content from photos in v1 — no gear-list reconstruction, no
            signal-chain transcription. Each rig is presented as the source documents it: a single
            archival photo, a year, an artist, and the path back to the upstream file. The
            compilation is the value, not the interpretation.
          </p>
        </section>

        <section>
          <h2 className="mono-label text-[color:var(--color-white)]">ATTRIBUTION</h2>
          <p className="mt-3">
            All images are credited to the Guitar Geek Archives and the Internet Archive item that
            hosts them. If you are a rights holder and want a photograph removed, or a name
            corrected, reach out on{' '}
            <a
              href="https://x.com/aisuede"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[color:var(--color-signal)] underline-offset-4 hover:underline"
            >
              @aisuede on X
            </a>{' '}
            or write to{' '}
            <a
              href="mailto:info@suedeai.org"
              className="text-white hover:text-[color:var(--color-signal)] underline-offset-4 hover:underline"
            >
              info@suedeai.org
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mono-label text-[color:var(--color-white)]">COLOPHON</h2>
          <p className="mt-3">
            Built by Suede Labs for{' '}
            <a
              href="https://suede.social"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[color:var(--color-signal)] underline-offset-4 hover:underline"
            >
              suede.social
            </a>{' '}
            on Next.js 15, Tailwind v4, and Geist. The visual language follows the Suede Sonic
            Laboratory specification used across{' '}
            <a
              href="https://suedeai.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[color:var(--color-signal)] underline-offset-4 hover:underline"
            >
              suedeai.ai
            </a>{' '}
            and{' '}
            <a
              href="https://launch.suedeai.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[color:var(--color-signal)] underline-offset-4 hover:underline"
            >
              launch.suedeai.ai
            </a>
            .
          </p>
        </section>
      </article>

      <Link href="/" className="inline-block mt-16 mono-label hover:text-[color:var(--color-signal)]">
        ← BACK TO THE COMPILATION
      </Link>
    </main>
  );
}
