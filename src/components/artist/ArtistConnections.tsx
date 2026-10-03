import Link from 'next/link';
import type { Artist } from '@/lib/manifest';
import type { ArticleEntry } from '@/lib/articles-content';
import type { RelatedArtist, YearPeers } from '@/lib/artist-connections';

const linkClass =
  'text-white underline-offset-4 hover:underline hover:text-[color:var(--color-signal)]';

function ArtistLinkList({ artists }: { artists: Artist[] }) {
  return (
    <>
      {artists.map((a, i) => (
        <span key={a.slug}>
          {i > 0 ? ', ' : ''}
          <Link href={`/${a.slug}`} className={linkClass}>
            {a.name}
          </Link>
        </span>
      ))}
    </>
  );
}

/**
 * "In the archive" block on an artist page. Every line is derived from the
 * manifest, the reviewed names, or the essays' own links (see
 * src/lib/artist-connections.ts). Renders nothing when there is nothing real to
 * say.
 */
export function ArtistConnections({
  artist,
  related,
  years,
  articles,
}: {
  artist: Artist;
  related: RelatedArtist[];
  years: YearPeers[];
  articles: ArticleEntry[];
}) {
  if (!related.length && !years.length && !articles.length) return null;
  const samePlayer = related.filter((r) => r.relation === 'same-player').map((r) => r.artist);
  const sameBand = related.filter((r) => r.relation === 'same-band').map((r) => r.artist);

  return (
    <section aria-labelledby="artist-connections-heading" className="border-t hairline">
      <div
        className="mx-auto max-w-[1400px] px-6 py-20 leading-relaxed text-[color:var(--color-bone)]"
        style={{ fontSize: 'var(--text-body)' }}
      >
        <h2
          id="artist-connections-heading"
          className="font-[820] text-white"
          style={{ fontSize: 'var(--text-section)', lineHeight: 0.95, letterSpacing: 'var(--tracking-tight)' }}
        >
          {artist.name} in the archive
        </h2>
        <div className="mt-8 grid max-w-3xl gap-6">
          {samePlayer.length ? (
            <p>
              The same player is filed under another page: <ArtistLinkList artists={samePlayer} />.
            </p>
          ) : null}
          {sameBand.length ? (
            <p>
              Another player from the same band has a page: <ArtistLinkList artists={sameBand} />.
            </p>
          ) : null}
          {years.map(({ year, rigCount, peers }) => (
            <p key={year}>
              <span className="mono-label mr-2">{year}</span>
              The archive holds {rigCount} rig {rigCount === 1 ? 'diagram' : 'diagrams'} dated {year}.{' '}
              {peers.length ? (
                <>
                  Other reviewed artist pages with a {year} rig: <ArtistLinkList artists={peers} />.{' '}
                </>
              ) : null}
              <Link href={`/?q=${year}`} className={linkClass}>
                Search the archive for {year}
              </Link>
              .
            </p>
          ))}
          {articles.length ? (
            <p>
              Discussed in{' '}
              {articles.map((a, i) => (
                <span key={a.slug}>
                  {i > 0 ? ', ' : ''}
                  <Link href={`/articles/${a.slug}`} className={linkClass}>
                    {a.title}
                  </Link>
                </span>
              ))}
              .
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
