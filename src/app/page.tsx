import type { Metadata } from 'next';
import { HomeHero } from '@/components/hero/HomeHero';
import { CompilationGrid } from '@/components/grid/CompilationGrid';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllArtists, getAllRigs, getStats } from '@/lib/manifest';
import { homeJsonLd, homePageDescription, homePageTitle } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';

const stats = getStats();

export const metadata: Metadata = {
  title: homePageTitle(),
  description: homePageDescription(stats),
  alternates: { canonical: '/' },
  openGraph: {
    title: homePageTitle(),
    description: homePageDescription(stats),
    url: SITE_URL,
    siteName: 'Suede DNA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: homePageTitle(),
    description: homePageDescription(stats),
  },
};

export default function HomePage() {
  const artists = getAllArtists();
  const rigs = getAllRigs();
  return (
    <main>
      <JsonLd data={homeJsonLd(SITE_URL, stats.totalArtists, stats.totalRigs, stats)} />
      <HomeHero />
      <CompilationGrid artists={artists} rigs={rigs} />
    </main>
  );
}
