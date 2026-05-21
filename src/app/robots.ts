import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';

// Known AI training / scraper user agents we want to keep out of the
// compilation archive. Search engines (Googlebot, Bingbot, etc.) are
// allowed in via the catch-all `*` rule so the 700+ artist pages stay
// fully indexable. No `crawl-delay` on the open rule — we want search
// crawlers moving through the archive at their own pace.
const AI_CRAWLER_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'cohere-ai',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
  'Bytespider',
  'Amazonbot',
  'FacebookBot',
  'Meta-ExternalAgent',
  'Applebot-Extended',
  'Diffbot',
  'omgili',
  'ImagesiftBot',
  'PetalBot',
  'AwarioRssBot',
  'AwarioSmartBot',
  'DataForSeoBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLER_AGENTS.map((userAgent) => ({ userAgent, disallow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
