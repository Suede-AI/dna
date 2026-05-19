import { notFound } from 'next/navigation';
import { getAllArtists, getArtistBySlug, getArtistNeighbors, getRigsByArtistSlug } from '@/lib/manifest';
import { ArtistStrip } from '@/components/artist/ArtistStrip';

export function generateStaticParams() {
  return getAllArtists().map((a) => ({ 'artist-slug': a.slug }));
}

export default async function ArtistPage({ params }: { params: Promise<{ 'artist-slug': string }> }) {
  const { 'artist-slug': slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();
  const rigs = getRigsByArtistSlug(slug);
  const { prev, next } = getArtistNeighbors(slug);

  return (
    <main>
      <ArtistStrip artist={artist} prev={prev} next={next} />
      <section aria-label="DNA chain placeholder" className="mx-auto max-w-[1400px] px-6 py-20">
        <p className="mono-label">DNA CHAIN LANDS IN TASK 11 · {rigs.length} rigs queued</p>
      </section>
    </main>
  );
}
