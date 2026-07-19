import type { MetadataRoute } from 'next';
import { getAllArtists } from '@/lib/manifest';
import { DOCS } from '@/lib/docs-content';
import { ARTICLES } from '@/lib/articles-content';
import rigsManifest from '../../data/rigs.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date((rigsManifest as { generatedAt: string }).generatedAt);
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/docs`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    ...DOCS.map((doc) => ({
      url: `${SITE_URL}/docs/${doc.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/articles`, lastModified, changeFrequency: 'weekly', priority: 0.6 },
    ...ARTICLES.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: new Date(`${article.date}T00:00:00Z`),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...getAllArtists().map((a) => ({
      url: `${SITE_URL}/${a.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
