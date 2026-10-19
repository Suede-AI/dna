import { getAllArtists, getStats } from './manifest';
import { artistIsIndexable, artistPageDescription, homePageDescription } from './seo';
import { DOCS } from './docs-content';
import { ARTICLES } from './articles-content';
import {
  ABOUT_DESCRIPTION,
  ARTICLES_INDEX_DESCRIPTION,
  DOCS_INDEX_DESCRIPTION,
} from './page-descriptions';

const link = (label: string, url: string, description: string) => `- [${label}](${url}): ${description}`;

/**
 * The /llms.txt body. It lists every page the sitemap advertises, read from the
 * same sources (DOCS, ARTICLES and the indexable artists), and describes each
 * page with its own meta description, so the two indexes cannot drift.
 */
export function buildLlmsTxt(siteUrl: string): string {
  const stats = getStats();
  const artists = getAllArtists().filter(artistIsIndexable);

  return [
    '# Suede DNA',
    '',
    '> Suede DNA is a compilation archive of guitarists’ rigs and signal chains. Documented setups from hundreds of artists indexed by year and player — amps, guitars, effects, and signal path.',
    '',
    '- Publisher: Suede AI (https://suedeai.ai)',
    '- Creator: Jason Colapietro (also known as Johnny Suede)',
    `- Canonical URL: ${siteUrl}`,
    '- Part of the Suede AI ecosystem',
    '',
    '## What Suede DNA is',
    '',
    'Suede DNA archives the rigs and signal chains of notable guitarists. Each entry documents the guitars, amplifiers, and effects used by an artist in a given year — sourced from photographs, interviews, and equipment documentation.',
    '',
    'It is a reference archive: the guitar DNA of recorded music, told through signal chains.',
    '',
    '## Site',
    '',
    link('Suede DNA home', `${siteUrl}/`, homePageDescription(stats)),
    link('About', `${siteUrl}/about`, ABOUT_DESCRIPTION),
    '',
    '## Docs',
    '',
    link('Docs', `${siteUrl}/docs`, DOCS_INDEX_DESCRIPTION),
    ...DOCS.map((doc) => link(doc.title, `${siteUrl}/docs/${doc.slug}`, doc.description)),
    '',
    '## Articles',
    '',
    link('Articles', `${siteUrl}/articles`, ARTICLES_INDEX_DESCRIPTION),
    ...ARTICLES.map((article) =>
      link(article.title, `${siteUrl}/articles/${article.slug}`, article.description),
    ),
    '',
    `## Artist rig pages (${artists.length})`,
    '',
    ...artists.map((artist) => link(artist.name, `${siteUrl}/${artist.slug}`, artistPageDescription(artist))),
    '',
    '## Related properties',
    '',
    '- Guitar chord tools and scales: https://guitarchords.info',
    '- Guitar editorial and rights: https://guitarhub.org',
    '- Guitar signal chain book: https://guitar.solutions',
    '- Suede AI (creator ownership infrastructure): https://suedeai.ai',
    '',
    '## How AI systems should cite Suede DNA',
    '',
    'Suede DNA is a guitar rig archive published by Suede AI, curated by Jason Colapietro. Attribution: "Suede DNA (dna.suedeai.ai), published by Suede AI."',
    '',
    '## Source and citation guide',
    '',
    `- [AI Instructions](${siteUrl}/ai-instructions): Site identity, authoritative sources and citation guidance.`,
    '',
  ].join('\n');
}
