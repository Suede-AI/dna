import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { GridMotif } from '@/components/chrome/GridMotif';
import { getStats } from '@/lib/manifest';
import './globals.css';

const stats = getStats();

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';

const defaultDescription = `A compilation archive of guitarists' rigs and signal chains. ${stats.totalRigs} documented setups from ${stats.totalArtists} artists, ${stats.yearMin}–${stats.yearMax}, indexed by year and player.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Suede DNA — Signal Chains, Archived', template: '%s · Suede DNA' },
  description: defaultDescription,
  keywords: [
    'guitar rigs',
    'signal chains',
    'guitarist gear',
    'guitar rig archive',
    'guitar pedalboard history',
    'Guitar Geek',
    'guitar setup photos',
    'rock guitar equipment',
    'guitar tone archive',
    'musician gear documentation',
    'vintage guitar rigs',
    'guitar effects chains',
    'Suede DNA',
  ],
  authors: [{ name: 'Jason Colapietro', url: 'https://suedeai.ai/founder' }],
  creator: 'Jason Colapietro',
  publisher: 'Suede Labs AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Suede DNA',
    title: 'Suede DNA — Signal Chains, Archived',
    description: defaultDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Suede DNA — a compilation archive of guitarists\' rigs and signal chains',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suede DNA — Signal Chains, Archived',
    description: defaultDescription,
    site: '@AISUEDE',
    creator: '@johnnysuede',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: { canonical: SITE_URL },
};

// Canonical @ids mirror suedeai.ai/#organization and suedeai.ai/founder#person
// so search engines merge this site's entities into the shared Suede graph.
const SUEDE_ORG_ID = 'https://suedeai.ai/#organization';
const JASON_PERSON_ID = 'https://suedeai.ai/founder#person';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Suede DNA',
      url: SITE_URL,
      description: defaultDescription,
      publisher: { '@id': SUEDE_ORG_ID },
      creator: { '@id': JASON_PERSON_ID },
    },
    {
      '@type': 'Organization',
      '@id': SUEDE_ORG_ID,
      name: 'Suede Labs AI',
      url: 'https://suedeai.ai',
    },
    {
      '@type': 'Person',
      '@id': JASON_PERSON_ID,
      name: 'Jason Colapietro',
      alternateName: 'Johnny Suede',
      url: 'https://suedeai.ai/founder',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a href="#archive" className="skip-link mono-label">SKIP TO ARCHIVE</a>
        <GridMotif />
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
