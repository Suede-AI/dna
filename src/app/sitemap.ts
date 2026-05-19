import type { MetadataRoute } from 'next';
import { getAllArtists } from '@/lib/manifest';
import rigsManifest from '../../data/rigs.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date((rigsManifest as { generatedAt: string }).generatedAt);
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    ...getAllArtists().map((a) => ({
      url: `${SITE_URL}/${a.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
