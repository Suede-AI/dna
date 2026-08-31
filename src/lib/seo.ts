import type { Artist, Rig } from './manifest';
import { CURATED_NAME_SEPARATOR, isReviewedArtistName } from './canonical-artists';

/**
 * A page may be indexed and may assert its subject in structured data only when
 * its display name has been human-reviewed. Unreviewed pages render a
 * fabricated slug-derived name, so they are served `noindex, follow` with no
 * Person/MusicGroup JSON-LD. Single source of truth for both decisions.
 */
export function artistIsIndexable(artist: Pick<Artist, 'slug' | 'name'>): boolean {
  return isReviewedArtistName(artist.slug, artist.name);
}

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

export function artistPageTitle(artist: Artist): string {
  return `${artist.name} — Guitar Rigs ${artistYearRange(artist)}`;
}

function artistRigCount(artist: Pick<Artist, 'count'>): string {
  return `${artist.count} documented rig ${artist.count === 1 ? 'setup' : 'setups'}`;
}

export function artistPageDescription(artist: Artist): string {
  const when =
    artist.yearMin === artist.yearMax
      ? `in ${artist.yearMin}`
      : `between ${artist.yearMin} and ${artist.yearMax}`;
  return `Explore ${artistRigCount(artist)} for ${artist.name} ${when} in the Suede DNA collection. Each diagram links to its Guitar Geek Archives source on the Internet Archive.`;
}

export function artistArchiveContext(
  artist: Pick<Artist, 'name' | 'count' | 'yearMin' | 'yearMax'>,
): string {
  const coverage =
    artist.yearMin === artist.yearMax
      ? `from ${artist.yearMin}`
      : `spanning ${artistYearRange(artist)}`;

  return `${artist.name} has ${artistRigCount(artist)} ${coverage} in the Suede DNA collection. Every entry is indexed from the community-maintained Guitar Geek Archives item on the Internet Archive and links to its original archive.org file. Suede DNA adds a presentation, normalization, and search layer. The manifest records an artist association, year, file format, structured source URL, and stable identifier for each archived diagram. Those fields support browsing and source tracing; Suede DNA does not interpret the photographed gear or independently fact-check the upstream artist and year attribution. Coverage reflects the diagrams available in the upstream collection, not a complete history of this artist's equipment or career.`;
}

export function homePageTitle(): string {
  return 'Suede DNA — Signal Chains, Archived';
}

export function homePageDescription(stats: { totalRigs: number; yearMin: number; yearMax: number }): string {
  return `A compilation archive of guitarists' rigs and signal chains. ${stats.totalRigs.toLocaleString()} documented setups from ${stats.yearMin} to ${stats.yearMax}, indexed by year and player. Suede DNA — signal chains, archived.`;
}

/**
 * Structured data for a reviewed artist page. Each page profiles an individual
 * guitarist, so the subject is a `Person`, not a `MusicGroup` (the prior type
 * asserted every player was a band). A curated "Player — Band" name is split so
 * the person's name and their band are each represented faithfully and match
 * the visible page. Only ever emitted for indexable (reviewed) artists — see
 * `artistIsIndexable`.
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
      creator: personEntity,
      dateCreated: String(rig.year),
      creditText: 'Guitar Geek Archives',
      isAccessibleForFree: true,
      license: 'https://archive.org/about/terms.php',
    })),
  } as const;
}

export function homeJsonLd(
  siteUrl: string,
  totalArtists: number,
  totalRigs: number,
  stats: { totalRigs: number; yearMin: number; yearMax: number },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Suede DNA — Signal Chains, Archived',
    description: homePageDescription(stats),
    url: siteUrl,
    isPartOf: { '@type': 'WebSite', name: 'Suede DNA', url: siteUrl },
    publisher: { '@id': 'https://suedeai.ai/#organization' },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Guitar Rig Archive',
      numberOfItems: totalRigs,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      description: `${totalArtists} artists · ${totalRigs} rigs`,
    },
  } as const;
}
