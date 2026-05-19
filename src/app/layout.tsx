import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { GridMotif } from '@/components/chrome/GridMotif';
import { getStats } from '@/lib/manifest';
import './globals.css';

const stats = getStats();

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai'),
  title: { default: 'Suede DNA — Signal Chains, Archived', template: '%s · Suede DNA' },
  description: `A compilation archive of guitarists' rigs and signal chains. ${stats.totalRigs} documented setups from ${stats.totalArtists} artists, ${stats.yearMin}–${stats.yearMax}, indexed by year and player.`,
  openGraph: {
    siteName: 'Suede DNA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <GridMotif />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
