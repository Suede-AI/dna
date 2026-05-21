import type { Artist, Rig } from './manifest';
import { getStats } from './manifest';

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
  const { totalRigs, totalArtists, yearMin, yearMax } = getStats();
  return `${totalRigs} documented guitarist rigs, ${totalArtists} artists, ${yearMin} to ${yearMax}. Sourced from the Guitar Geek archive. Suede DNA — signal chains, archived.`;
}

// Heuristic: treat the artist as a band (MusicGroup) when the canonical name
// matches a known band override, contains group cues (and/&/featuring), or has
// no personal-name structure. Solo guitarists become Person.
export function isBandArtist(artist: Artist): boolean {
  const name = artist.name.toLowerCase();
  // Strong band cues
  if (/\b(and the|& the|the )\b/.test(name)) return true;
  if (/\b(band|orchestra|brothers|sisters)\b/.test(name)) return true;
  // Override-prefixed slugs typically encode "band-member" (e.g. allmanbrothers-warren).
  // If the slug contains a hyphen and the prefix is a known group name, treat
  // the entity as a solo musician (Person), not a band.
  // Default rule: single-word slug with no hyphens AND name without space → likely band (e.g. "Nirvana", "Metallica").
  const hasMemberSplit = artist.slug.includes('-');
  if (!hasMemberSplit && !name.includes(' ')) return true;
  return false;
}

export function artistJsonLd(artist: Artist, rigs: Rig[], siteUrl: string) {
  const isBand = isBandArtist(artist);
  const mainEntity = isBand
    ? {
        '@type': 'MusicGroup',
        name: artist.name,
        url: `${siteUrl}/${artist.slug}`,
      }
    : {
        '@type': 'Person',
        name: artist.name,
        jobTitle: 'Musician',
        url: `${siteUrl}/${artist.slug}`,
      };

  const creator = isBand
    ? { '@type': 'MusicGroup', name: artist.name }
    : { '@type': 'Person', name: artist.name };

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity,
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
      name: `${artist.name} guitar rig, ${rig.year}`,
      creator,
      dateCreated: String(rig.year),
      creditText: 'Guitar Geek Archives',
      isAccessibleForFree: true,
      license: 'https://archive.org/about/terms.php',
    })),
  } as const;
}

// Rig-level JSON-LD: MusicalInstrument (primary guitar) + Product (amps/pedals).
// Per-rig gear is not extracted in v1, so emit a generic MusicalInstrument node
// referencing the rig image as a representative artifact. When gear extraction
// lands, populate brand/model/category from rig data.
export function rigJsonLd(rig: Rig, artist: Artist, siteUrl: string) {
  const isBand = isBandArtist(artist);
  const owner = isBand
    ? { '@type': 'MusicGroup', name: artist.name }
    : { '@type': 'Person', name: artist.name };

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicalInstrument',
    name: `${artist.name} guitar rig, ${rig.year}`,
    instrument: 'Electric guitar',
    category: 'Electric guitar',
    image: rig.src,
    dateCreated: String(rig.year),
    owner,
    isPartOf: {
      '@type': 'CollectionPage',
      name: `${artist.name} — Guitar Rigs ${artist.yearMin}–${artist.yearMax}`,
      url: `${siteUrl}/${artist.slug}`,
    },
    subjectOf: {
      '@type': 'ImageObject',
      contentUrl: rig.src,
      creditText: 'Guitar Geek Archives',
      license: 'https://archive.org/about/terms.php',
    },
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

// WebSite + SearchAction so Google can surface the on-page search box as a
// sitelinks search. The home page hosts the search UI; the action URL points
// to the home with a `q` query param consumed by useUrlState.
export function websiteSearchJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Suede DNA',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  } as const;
}
