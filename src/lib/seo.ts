import type { Artist, Rig } from './manifest';

export function artistYearRange(artist: Pick<Artist, 'yearMin' | 'yearMax'>): string {
  return artist.yearMin === artist.yearMax
    ? String(artist.yearMin)
    : `${artist.yearMin}–${artist.yearMax}`;
}

export function artistPageTitle(artist: Artist): string {
  return `${artist.name} — Guitar Rigs ${artistYearRange(artist)}`;
}

export function artistPageDescription(artist: Artist): string {
  const when =
    artist.yearMin === artist.yearMax
      ? `in ${artist.yearMin}`
      : `between ${artist.yearMin} and ${artist.yearMax}`;
  return `The complete rig archive for ${artist.name} — ${artist.count} setups documented ${when}. Photos sourced from the Guitar Geek archives. Part of Suede DNA.`;
}

export function homePageTitle(): string {
  return 'Suede DNA — Signal Chains, Archived';
}

export function homePageDescription(stats: { totalRigs: number; yearMin: number; yearMax: number }): string {
  return `A compilation archive of guitarists' rigs and signal chains. ${stats.totalRigs.toLocaleString()} documented setups from ${stats.yearMin} to ${stats.yearMax}, indexed by year and player. Suede DNA — signal chains, archived.`;
}

export function artistJsonLd(artist: Artist, rigs: Rig[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'MusicGroup',
      name: artist.name,
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
      creator: { '@type': 'MusicGroup', name: artist.name },
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
    publisher: { '@type': 'Organization', name: 'Suede Labs AI', url: 'https://suedeai.ai' },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Guitar Rig Archive',
      numberOfItems: totalRigs,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      description: `${totalArtists} artists · ${totalRigs} rigs`,
    },
  } as const;
}
