import type { Artist, Rig } from './manifest';
import type { ArticleEntry } from './articles-content';
import { CURATED_NAME_SEPARATOR, isReviewedArtistName } from './canonical-artists';
import { DNA_SOCIAL_IMAGE } from './seo/social-metadata';
import { ROUTE_KEYWORDS, withBrand } from './seo/keywords';

/**
 * Entity assertions require a reviewed display name. Public archive pages are
 * independently indexable; unresolved names are presented as source labels.
 */
export function artistHasReviewedIdentity(artist: Pick<Artist, 'slug' | 'name'>): boolean {
  return isReviewedArtistName(artist.slug, artist.name);
}

export function artistPageLabel(artist: Pick<Artist, 'slug' | 'name'>): string {
  return artistHasReviewedIdentity(artist) ? artist.name : `Archive label: ${artist.name}`;
}

/** Date the unresolved archive labels gained explicit source-attribution copy. */
export const ARCHIVE_LABEL_COPY_UPDATED_AT = '2026-10-24T00:00:00Z';

/** Split a curated "Player — Band" display name into its parts. */
export function splitArtistName(name: string): { person: string; band?: string } {
  const i = name.indexOf(CURATED_NAME_SEPARATOR);
  if (i === -1) return { person: name };
  return { person: name.slice(0, i), band: name.slice(i + CURATED_NAME_SEPARATOR.length) };
}

export function artistYearRange(artist: Pick<Artist, 'yearMin' | 'yearMax'>): string {
  return artist.yearMin === artist.yearMax
    ? String(artist.yearMin)
    : `${artist.yearMin}–${artist.yearMax}`;
}

/**
 * "Tim Mahoney Guitar Rigs (311), 1997–2004". Leads with the page's primary
 * keyword (`{player} guitar rig`), which the h1 also carries.
 */
export function artistPageTitle(artist: Artist): string {
  if (!artistHasReviewedIdentity(artist)) {
    return `${artistPageLabel(artist)} — Guitar Rigs, ${artistYearRange(artist)}`;
  }
  const { person, band } = splitArtistName(artist.name);
  return `${person} Guitar Rigs${band ? ` (${band})` : ''}, ${artistYearRange(artist)}`;
}

/** The layout's title template appends this to every page title. */
export const SITE_TITLE_SUFFIX = ' · Suede DNA';
/** Longest document title kept whole in a search result. */
export const MAX_DOCUMENT_TITLE = 65;

/**
 * The `<title>` for an artist page. The site suffix is kept when the whole
 * title fits a search result; a long player/band name drops it rather than
 * having the engine cut the title mid-word.
 */
export function artistDocumentTitle(artist: Artist): string | { absolute: string } {
  const title = artistPageTitle(artist);
  return (title + SITE_TITLE_SUFFIX).length <= MAX_DOCUMENT_TITLE ? title : { absolute: title };
}

function artistRigCount(artist: Pick<Artist, 'count'>): string {
  return `${artist.count} documented rig ${artist.count === 1 ? 'setup' : 'setups'}`;
}

export function artistPageDescription(artist: Artist): string {
  const when =
    artist.yearMin === artist.yearMax
      ? `in ${artist.yearMin}`
      : `between ${artist.yearMin} and ${artist.yearMax}`;
  const lead = artistHasReviewedIdentity(artist)
    ? `Explore ${artistRigCount(artist)} for ${artist.name} ${when} in Suede DNA.`
    : `Archive label “${artist.name}”: ${artistRigCount(artist)} ${when}.`;
  // Keep the snippet within 155 characters: shorten the sourcing sentence
  // before ever cutting the artist-specific lead.
  const tails = artistHasReviewedIdentity(artist)
    ? [' Each diagram links to its Guitar Geek Archives source.', ' Each links to its Guitar Geek source.', '']
    : [' Source label, not a verified performer identity.', ' Unverified source attribution.', ''];
  return lead + (tails.find((t) => (lead + t).length <= 155) ?? '');
}

export function artistArchiveContext(
  artist: Pick<Artist, 'slug' | 'name' | 'count' | 'yearMin' | 'yearMax'>,
): string {
  const coverage =
    artist.yearMin === artist.yearMax
      ? `from ${artist.yearMin}`
      : `spanning ${artistYearRange(artist)}`;

  const lead = artistHasReviewedIdentity(artist)
    ? `${artist.name} has ${artistRigCount(artist)} ${coverage} in the Suede DNA collection.`
    : `The upstream archive label “${artist.name}” groups ${artistRigCount(artist)} ${coverage} in the Suede DNA collection. This label is derived from source filenames and has not been verified as a performer identity.`;
  const subject = artistHasReviewedIdentity(artist)
    ? "this artist's equipment or career"
    : 'the equipment or people represented by the source';
  return `${lead} Every entry is indexed from the community-maintained Guitar Geek Archives item on the Internet Archive and links to its original archive.org file. Suede DNA adds a presentation, normalization, and search layer. The manifest records an artist association, year, file format, structured source URL, and stable identifier for each archived diagram. Those fields support browsing and source tracing; Suede DNA does not interpret the photographed gear or independently fact-check the upstream artist and year attribution. Coverage reflects the diagrams available in the upstream collection, not a complete history of ${subject}.`;
}

export function homePageTitle(): string {
  return 'Suede DNA: Guitar Rig Archive of Signal Chains';
}

export function homePageDescription(stats: { totalRigs: number; yearMin: number; yearMax: number }): string {
  return `A compilation archive of guitarists' rigs and signal chains. ${stats.totalRigs.toLocaleString()} documented setups from ${stats.yearMin} to ${stats.yearMax}, indexed by year and player.`;
}

/**
 * Structured data for a reviewed artist page. Each page profiles an individual
 * guitarist, so the subject is a `Person`, not a `MusicGroup` (the prior type
 * asserted every player was a band). A curated "Player — Band" name is split so
 * the person's name and their band are each represented faithfully and match
 * the visible page. Only ever emitted for reviewed identities — see
 * `artistHasReviewedIdentity`. Page indexability does not establish identity.
 */
export function artistJsonLd(artist: Artist, rigs: Rig[], siteUrl: string) {
  const { person, band } = splitArtistName(artist.name);
  const personEntity = {
    '@type': 'Person',
    name: person,
    ...(band ? { memberOf: { '@type': 'MusicGroup', name: band } } : {}),
  } as const;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      ...personEntity,
      url: `${siteUrl}/${artist.slug}`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Suede DNA', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: artist.name, item: `${siteUrl}/${artist.slug}` },
      ],
    },
    hasPart: rigs.map((rig) => ({
      '@type': 'ImageObject',
      contentUrl: rig.src,
      // The archive identifies whose rig is depicted, not who made the image.
      // Its rig year and host terms do not establish image creation or licensing.
      about: personEntity,
      creditText: 'Guitar Geek Archives',
      isAccessibleForFree: true,
    })),
  } as const;
}

/**
 * Structured data for the archive front page. The page is a `CollectionPage`
 * and nothing more: an `ItemList` promises an enumeration a consumer can read
 * out of the markup, and this grid is filtered, sorted, and re-ordered in the
 * browser, so a fixed list baked into the page would stop matching what is on
 * screen the moment a filter is applied. The size of the collection stays in
 * the description prose, which is rendered text rather than a promise of
 * structure.
 */
export function homeJsonLd(
  siteUrl: string,
  stats: { totalRigs: number; yearMin: number; yearMax: number },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: homePageTitle(),
    description: homePageDescription(stats),
    url: siteUrl,
    isPartOf: { '@type': 'WebSite', name: 'Suede DNA', url: siteUrl },
    publisher: { '@id': 'https://suedeai.ai/#organization' },
  } as const;
}

/**
 * BreadcrumbList for a docs or article page. `trail` runs from the first
 * crumb below the site root to the current page; the root is always
 * "Suede DNA". Names mirror the visible page titles.
 */
export function breadcrumbJsonLd(siteUrl: string, trail: { name: string; path: string }[]) {
  const crumbs = [{ name: 'Suede DNA', path: '' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.path ? `${siteUrl}${crumb.path}` : siteUrl,
    })),
  } as const;
}

function articleKeywords(slug: string): string[] {
  const route = `/articles/${slug}`;
  const terms = (ROUTE_KEYWORDS as Record<string, readonly string[]>)[route] ?? ROUTE_KEYWORDS['/articles'];
  return withBrand(terms);
}

/**
 * Structured data for an essay under /articles. Every field mirrors something
 * the page already renders: the headline is the visible `h1`, the date is the
 * visible dateline, and the author and publisher resolve by `@id` into the
 * WebSite/Organization/Person graph the root layout emits on every page.
 */
export function articleJsonLd(article: ArticleEntry, siteUrl: string) {
  const url = `${siteUrl}/articles/${article.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    keywords: articleKeywords(article.slug).join(', '),
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: 'en-US',
    isPartOf: { '@type': 'WebSite', name: 'Suede DNA', url: siteUrl },
    author: {
      '@type': 'Person',
      '@id': 'https://suedeai.ai/founder#person',
      name: 'Jason Colapietro',
      url: 'https://suedeai.ai/founder',
    },
    publisher: { '@id': 'https://suedeai.ai/#organization', name: 'Suede AI' },
    image: `${siteUrl}${DNA_SOCIAL_IMAGE.url}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  } as const;
}
