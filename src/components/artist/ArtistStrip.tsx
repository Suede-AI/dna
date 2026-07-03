import Link from 'next/link';
import type { Artist } from '@/lib/manifest';
import { artistYearRange } from '@/lib/seo';

export function ArtistStrip({
  artist,
  prev,
  next,
}: {
  artist: Artist;
  prev?: Artist;
  next?: Artist;
}) {
  return (
    <section aria-labelledby="artist-heading" className="border-b hairline">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <nav aria-label="Breadcrumb" className="mono-label mb-6">
          <Link href="/" className="hover:text-[color:var(--color-signal)]">SUEDE/DNA</Link>
          <span className="mx-2 text-[color:var(--color-mute)]">/</span>
          <span className="text-white">{artist.name.toUpperCase()}</span>
        </nav>
        <h1
          id="artist-heading"
          className="font-[820] text-white"
          style={{
            fontSize: 'var(--text-hero)',
            lineHeight: 0.95,
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          {artist.name}
        </h1>
        <p className="mt-6 mono-data text-[color:var(--color-bone)]">
          {artist.count} RIG{artist.count === 1 ? '' : 'S'} · {artistYearRange(artist)} ·{' '}
          {artist.decades.map((d) => `'${String(d).slice(-2).padStart(2, '0')}s`).join(' · ')}
        </p>
        <nav aria-label="Artist navigation" className="mt-10 flex gap-6 mono-label">
          <Link href="/" className="hover:text-[color:var(--color-signal)]">← ALL ARTISTS</Link>
          {prev && (
            <Link href={`/${prev.slug}`} className="hover:text-[color:var(--color-signal)]">
              ↑ PREV: {prev.name.toUpperCase()}
            </Link>
          )}
          {next && (
            <Link href={`/${next.slug}`} className="ml-auto hover:text-[color:var(--color-signal)]">
              NEXT: {next.name.toUpperCase()} →
            </Link>
          )}
        </nav>
      </div>
    </section>
  );
}
