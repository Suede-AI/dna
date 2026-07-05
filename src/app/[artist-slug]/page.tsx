import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllArtists, getArtistBySlug, getArtistNeighbors, getRigsByArtistSlug } from '@/lib/manifest';
import { ArtistStrip } from '@/components/artist/ArtistStrip';
import { DNAChain } from '@/components/artist/DNAChain';
import { RigDetailCard } from '@/components/artist/RigDetailCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { getArtistArchivePosition } from '@/lib/artist-index';
import { artistJsonLd, artistPageDescription, artistPageTitle } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';

export function generateStaticParams() {
  return getAllArtists().map((a) => ({ 'artist-slug': a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ 'artist-slug': string }>;
}): Promise<Metadata> {
  const { 'artist-slug': slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return {};
  return {
    title: artistPageTitle(artist),
    description: artistPageDescription(artist),
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: artistPageTitle(artist),
      description: artistPageDescription(artist),
      url: `${SITE_URL}/${slug}`,
      type: 'profile',
      siteName: 'Suede DNA',
    },
    twitter: {
      card: 'summary_large_image',
      title: artistPageTitle(artist),
      description: artistPageDescription(artist),
    },
  };
}

export default async function ArtistPage({ params }: { params: Promise<{ 'artist-slug': string }> }) {
  const { 'artist-slug': slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();
  const archivePosition = getArtistArchivePosition(getAllArtists(), artist.slug);
  const rigs = getRigsByArtistSlug(slug);
  const { prev, next } = getArtistNeighbors(slug);

  return (
    <main>
      <JsonLd data={artistJsonLd(artist, rigs, SITE_URL)} />
      <ArtistStrip artist={artist} archivePosition={archivePosition} prev={prev} next={next} />
      <DNAChain rigs={rigs} artistName={artist.name} />
      <section aria-label="Rigs in detail">
        {rigs.map((rig, i) => (
          <RigDetailCard key={rig.id} rig={rig} index={i} rigs={rigs} prev={rigs[i - 1]} next={rigs[i + 1]} />
        ))}
      </section>
    </main>
  );
}
