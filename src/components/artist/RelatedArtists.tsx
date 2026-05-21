import Link from 'next/link';
import type { Artist } from '@/lib/manifest';

export function RelatedArtists({ artists }: { artists: Artist[] }) {
  if (!artists.length) return null;
  return (
    <section
      aria-labelledby="related-artists-heading"
      className="border-t hairline"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <h2
          id="related-artists-heading"
          className="mono-label text-[color:var(--color-bone)]"
        >
          RELATED ARTISTS
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/${a.slug}`}
                className="block hairline border px-4 py-3 hover:text-[color:var(--color-signal)]"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <p className="text-white">{a.name}</p>
                <p className="mono-data text-[color:var(--color-mute)] mt-1">
                  {a.count} RIG{a.count === 1 ? '' : 'S'} · {a.yearMin}
                  {a.yearMin === a.yearMax ? '' : `–${a.yearMax}`}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
