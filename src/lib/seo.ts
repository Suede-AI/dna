import type { Artist, Rig } from './manifest';

export function artistPageTitle(artist: Artist): string {
  return `${artist.name} — Guitar Rigs ${artist.yearMin}–${artist.yearMax}`;
}

export function artistPageDescription(artist: Artist): string {
  return `The complete rig archive for ${artist.name} — ${artist.count} setups documented between ${artist.yearMin} and ${artist.yearMax}. Photos sourced from the Guitar Geek archives. Part of Suede DNA.`;
}

export function homePageTitle(): string {
  return 'Suede DNA — Signal Chains, Archived';
}

export function homePageDescription(): string {
  return 'A compilation archive of guitarists\' rigs and signal chains. One thousand-plus documented setups from 1966 to 2010, indexed by year and player. Suede DNA — signal chains, archived.';
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

export function homeJsonLd(siteUrl: string, totalArtists: number, totalRigs: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Suede DNA',
    description: homePageDescription(),
    url: siteUrl,
    isPartOf: { '@type': 'WebSite', name: 'Suede DNA', url: siteUrl },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalArtists,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      additionalType: `${totalRigs} rigs`,
    },
  } as const;
}
