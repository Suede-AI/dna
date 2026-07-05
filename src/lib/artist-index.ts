import type { Artist } from './manifest';

export type ArtistArchivePosition = {
  index: number;
  total: number;
};

export function getArtistArchivePosition(artists: Artist[], slug: string): ArtistArchivePosition | null {
  const sorted = [...artists].sort((a, b) => a.name.localeCompare(b.name));
  const index = sorted.findIndex((artist) => artist.slug === slug);
  if (index === -1) return null;
  return { index: index + 1, total: sorted.length };
}
