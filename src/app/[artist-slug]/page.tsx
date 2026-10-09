import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllArtists, getAllRigs, getArtistBySlug, getArtistNeighbors, getRigsByArtistSlug } from '@/lib/manifest';
import { ArtistStrip } from '@/components/artist/ArtistStrip';
import { DNAChain } from '@/components/artist/DNAChain';
import { RigDetailCard } from '@/components/artist/RigDetailCard';
import { ArtistConnections } from '@/components/artist/ArtistConnections';
import { ARTICLES } from '@/lib/articles-content';
import { citingArticles, relatedArtists, singleRigFacts, yearPeers } from '@/lib/artist-connections';
import { JsonLd } from '@/components/seo/JsonLd';
import { getArtistArchivePosition } from '@/lib/artist-index';
import { artistIsIndexable, artistJsonLd, artistPageDescription, artistPageTitle } from '@/lib/seo';
import { artistKeywords } from '@/lib/seo/keywords';

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
  // Pages whose name has not been human-reviewed render a fabricated,
  // slug-derived name. Keep them out of the index (noindex) while still letting
  // crawlers follow their real archive.org links, until names are curated.
  const indexable = artistIsIndexable(artist);
  return {
    title: artistPageTitle(artist),
    description: artistPageDescription(artist),
    // Noindex pages carry a fabricated slug-derived name: no keywords for them.
    ...(indexable ? { keywords: artistKeywords(artist) } : {}),
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
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
      {/* Only reviewed pages assert their subject in structured data; fabricated
          slug-derived names must not be published as a real Person entity. */}
      {artistIsIndexable(artist) && <JsonLd data={artistJsonLd(artist, rigs, SITE_URL)} />}
      <ArtistStrip artist={artist} archivePosition={archivePosition} prev={prev} next={next} />
      <DNAChain rigs={rigs} artistName={artist.name} />
      <section aria-label="Rigs in detail">
        {rigs.map((rig, i) => (
          <RigDetailCard key={rig.id} rig={rig} index={i} rigs={rigs} prev={rigs[i - 1]} next={rigs[i + 1]} />
        ))}
      </section>
      <ArtistConnections
        artist={artist}
        related={relatedArtists(artist, getAllArtists())}
        years={yearPeers(artist, getAllRigs(), getAllArtists())}
        articles={citingArticles(artist, ARTICLES)}
        facts={singleRigFacts(artist, getAllRigs(), getAllArtists())}
      />
    </main>
  );
}
