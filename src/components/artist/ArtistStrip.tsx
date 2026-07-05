import Link from 'next/link';
import type { Artist } from '@/lib/manifest';
import type { ArtistArchivePosition } from '@/lib/artist-index';
import { artistYearRange } from '@/lib/seo';

export function ArtistStrip({
  artist,
  archivePosition,
  prev,
  next,
}: {
  artist: Artist;
  archivePosition: ArtistArchivePosition | null;
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
        <div className="mt-6 flex flex-wrap items-center gap-3 mono-data text-[color:var(--color-bone)]">
          {archivePosition ? (
            <span className="mono-label text-[color:var(--color-bone)]">
              ARTIST {archivePosition.index} / {archivePosition.total}
            </span>
          ) : null}
          <span>{artist.count} RIG{artist.count === 1 ? '' : 'S'}</span>
          <span className="text-[color:var(--color-mute)]">·</span>
          <span>{artistYearRange(artist)}</span>
          <span className="text-[color:var(--color-mute)]">·</span>
          {artist.decades.map((d) => (
            <Link
              key={d}
              href={`/?decades=${d}`}
              className="mono-label hairline px-2 py-1 text-[color:var(--color-bone)] hover:text-[color:var(--color-signal)]"
              style={{ borderRadius: 'var(--radius-control)' }}
            >
              &apos;{String(d).slice(-2).padStart(2, '0')}s
            </Link>
          ))}
        </div>
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
