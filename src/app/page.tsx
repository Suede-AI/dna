import type { Metadata } from 'next';
import { HomeHero } from '@/components/hero/HomeHero';
import { CompilationGrid } from '@/components/grid/CompilationGrid';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllArtists, getAllRigs, getStats } from '@/lib/manifest';
import { homeJsonLd, homePageDescription, homePageTitle, websiteSearchJsonLd } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';

export const metadata: Metadata = {
  title: homePageTitle(),
  description: homePageDescription(),
  alternates: { canonical: '/' },
  openGraph: {
    title: homePageTitle(),
    description: homePageDescription(),
    url: SITE_URL,
    siteName: 'Suede DNA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: homePageTitle(),
    description: homePageDescription(),
  },
};

export default function HomePage() {
  const artists = getAllArtists();
  const rigs = getAllRigs();
  const stats = getStats();
  return (
    <main>
      <JsonLd data={homeJsonLd(SITE_URL, stats.totalArtists, stats.totalRigs)} />
      <JsonLd data={websiteSearchJsonLd(SITE_URL)} />
      <HomeHero />
      <CompilationGrid artists={artists} rigs={rigs} />
    </main>
  );
}
