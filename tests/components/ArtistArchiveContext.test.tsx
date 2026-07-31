import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ArtistStrip } from '../../src/components/artist/ArtistStrip';
import { RigDetailCard } from '../../src/components/artist/RigDetailCard';
import type { Artist, Rig } from '../../src/lib/manifest';

vi.mock('../../src/components/media/Lightbox', () => ({
  Lightbox: () => null,
}));

vi.mock('../../src/components/media/RigImage', () => ({
  RigImage: ({ alt }: { alt: string }) => <div role="img" aria-label={alt} />,
}));

const artist: Artist = {
  slug: 'artist',
  name: 'Archive Artist',
  count: 1,
  yearMin: 1997,
  yearMax: 1997,
  decades: [1990],
};

const rig: Rig = {
  id: 'artist-1997',
  artistSlug: artist.slug,
  artistName: artist.name,
  year: 1997,
  src: 'https://archive.org/download/guitargeek-archives/artist_guitar_rig_1997.jpg',
  format: 'jpg',
};

describe('artist archive context', () => {
  it('renders collection-scoped provenance context in the shared artist header', () => {
    render(<ArtistStrip artist={artist} archivePosition={{ index: 1, total: 390 }} />);

    expect(
      screen.getByText(/Archive Artist has 1 documented rig setup from 1997 in the Suede DNA collection/),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sourcing and verification/i })).toHaveAttribute(
      'href',
      '/docs/sourcing-and-verification',
    );
  });

  it('identifies the artist and year in each rig heading and surfaces its archive provenance', () => {
    render(<RigDetailCard rig={rig} index={0} rigs={[rig]} />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Archive Artist — 1997 Guitar Rig' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Guitar Geek Archives via Internet Archive · JPG')).toBeVisible();
  });
});
