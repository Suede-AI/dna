import { describe, it, expect } from 'vitest';
import {
  artistPageTitle,
  artistPageDescription,
  artistJsonLd,
  rigJsonLd,
  websiteSearchJsonLd,
  isBandArtist,
} from '../../src/lib/seo';
import type { Artist, Rig } from '../../src/lib/manifest';

const clapton: Artist = {
  slug: 'eric-clapton',
  name: 'Eric Clapton',
  count: 5,
  yearMin: 1966,
  yearMax: 1989,
  decades: [1960, 1970, 1980],
};

const nirvana: Artist = {
  slug: 'nirvana',
  name: 'Nirvana',
  count: 3,
  yearMin: 1989,
  yearMax: 1993,
  decades: [1980, 1990],
};

const claptonRig: Rig = {
  id: 'eric-clapton-1966',
  src: 'https://example.com/x.jpg',
  year: 1966,
  format: 'jpg',
  artistSlug: 'eric-clapton',
  artistName: 'Eric Clapton',
};

describe('SEO helpers', () => {
  it('formats artist page title', () => {
    expect(artistPageTitle(clapton)).toBe('Eric Clapton — Guitar Rigs 1966–1989');
  });

  it('formats artist page description with counts', () => {
    expect(artistPageDescription(clapton)).toContain('5 setups');
    expect(artistPageDescription(clapton)).toContain('1966');
    expect(artistPageDescription(clapton)).toContain('1989');
  });

  it('detects solo artists vs bands via isBandArtist', () => {
    expect(isBandArtist(clapton)).toBe(false); // hyphenated slug, name has space → Person
    expect(isBandArtist(nirvana)).toBe(true); // single-token name and slug → MusicGroup
  });

  it('emits Person JSON-LD for solo artists', () => {
    const ld = artistJsonLd(clapton, [claptonRig], 'https://dna.suedeai.ai');
    expect(ld['@type']).toBe('ProfilePage');
    expect(ld.mainEntity['@type']).toBe('Person');
    expect((ld.mainEntity as { jobTitle?: string }).jobTitle).toBe('Musician');
    expect(ld.mainEntity.name).toBe('Eric Clapton');
    expect(Array.isArray(ld.hasPart)).toBe(true);
    expect(ld.hasPart[0]['@type']).toBe('ImageObject');
    expect(ld.hasPart[0].creditText).toBe('Guitar Geek Archives');
  });

  it('emits MusicGroup JSON-LD for bands', () => {
    const ld = artistJsonLd(
      nirvana,
      [{ id: 'nirvana-1989', src: 'https://example.com/n.jpg', year: 1989, format: 'jpg', artistSlug: 'nirvana', artistName: 'Nirvana' }],
      'https://dna.suedeai.ai',
    );
    expect(ld.mainEntity['@type']).toBe('MusicGroup');
  });

  it('emits MusicalInstrument JSON-LD for a rig', () => {
    const ld = rigJsonLd(claptonRig, clapton, 'https://dna.suedeai.ai');
    expect(ld['@type']).toBe('MusicalInstrument');
    expect(ld.image).toBe('https://example.com/x.jpg');
    expect(ld.owner['@type']).toBe('Person');
    expect(ld.subjectOf['@type']).toBe('ImageObject');
  });

  it('emits WebSite + SearchAction JSON-LD', () => {
    const ld = websiteSearchJsonLd('https://dna.suedeai.ai');
    expect(ld['@type']).toBe('WebSite');
    expect(ld.potentialAction['@type']).toBe('SearchAction');
    expect(ld.potentialAction.target.urlTemplate).toContain('{search_term_string}');
  });
});
