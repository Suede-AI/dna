import { notFound } from 'next/navigation';
import { getAllArtists, getArtistBySlug, getArtistNeighbors, getRigsByArtistSlug } from '@/lib/manifest';
import { ArtistStrip } from '@/components/artist/ArtistStrip';
import { DNAChain } from '@/components/artist/DNAChain';
import { RigDetailCard } from '@/components/artist/RigDetailCard';

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
      <DNAChain rigs={rigs} artistName={artist.name} />
      <section aria-label="Rigs in detail">
        {rigs.map((rig, i) => (
          <RigDetailCard
            key={rig.id}
            rig={rig}
            index={i}
            prev={rigs[i - 1]}
            next={rigs[i + 1]}
          />
        ))}
      </section>
    </main>
  );
}
