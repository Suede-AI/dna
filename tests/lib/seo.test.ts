import { describe, it, expect } from 'vitest';
import { artistPageTitle, artistPageDescription, artistJsonLd } from '../../src/lib/seo';
import type { Artist } from '../../src/lib/manifest';

const clapton: Artist = {
  slug: 'eric-clapton',
  name: 'Eric Clapton',
  count: 5,
  yearMin: 1966,
  yearMax: 1989,
  decades: [1960, 1970, 1980],
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

  it('emits valid artist JSON-LD shape', () => {
    const ld = artistJsonLd(clapton, [
      { id: 'eric-clapton-1966', src: 'https://example.com/x.jpg', year: 1966, format: 'jpg', artistSlug: 'eric-clapton', artistName: 'Eric Clapton' },
    ], 'https://dna.suedeai.ai');
    expect(ld['@type']).toBe('ProfilePage');
    expect(ld.mainEntity['@type']).toBe('MusicGroup');
    expect(ld.mainEntity.name).toBe('Eric Clapton');
    expect(Array.isArray(ld.hasPart)).toBe(true);
    expect(ld.hasPart[0]['@type']).toBe('ImageObject');
    expect(ld.hasPart[0].creditText).toBe('Guitar Geek Archives');
  });
});
