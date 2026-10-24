import { getAllArtists, getStats } from './manifest';
import { artistPageLabel, artistPageDescription, homePageDescription } from './seo';
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
 * same sources (DOCS, ARTICLES and all published archive entries), and describes each
 * page with its own meta description, so the two indexes cannot drift.
 */
export function buildLlmsTxt(siteUrl: string): string {
  const stats = getStats();
  const artists = getAllArtists();

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
    'Suede DNA indexes guitar rig diagrams from the Guitar Geek Archives collection on the Internet Archive. Entries link to original archive files. Names without a reviewed identity are explicitly marked as archive labels derived from source filenames, not verified performer identities.',
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
    ...artists.map((artist) => link(artistPageLabel(artist), `${siteUrl}/${artist.slug}`, artistPageDescription(artist))),
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
