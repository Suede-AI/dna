import { describe, it, expect } from 'vitest';
import { parseFilename, applyOverride, groupByArtist } from '../../scripts/build-manifest';

describe('parseFilename', () => {
  it('parses a standard guitargeek filename', () => {
    expect(parseFilename('ace_frehley_guitar_rig_2010.jpg')).toEqual({
      artistSlug: 'ace_frehley',
      year: 2010,
      ext: 'jpg',
    });
  });

  it('parses png and gif extensions', () => {
    expect(parseFilename('eric_clapton_guitar_rig_1966.png')).toEqual({
      artistSlug: 'eric_clapton',
      year: 1966,
      ext: 'png',
    });
    expect(parseFilename('jimi_hendrix_guitar_rig_1969.gif')).toEqual({
      artistSlug: 'jimi_hendrix',
      year: 1969,
      ext: 'gif',
    });
  });

  it('parses numeric-prefixed artist (e.g. band 311)', () => {
    expect(parseFilename('311_tim_mahoney_guitar_rig_2009.jpg')).toEqual({
      artistSlug: '311_tim_mahoney',
      year: 2009,
      ext: 'jpg',
    });
  });

  it('returns null for thumbnails', () => {
    expect(parseFilename('ace_frehley_guitar_rig_2010_thumb.jpg')).toBeNull();
  });

  it('returns null for non-rig files', () => {
    expect(parseFilename('readme.txt')).toBeNull();
    expect(parseFilename('guitargeek-archives_meta.xml')).toBeNull();
  });

  it('returns null for malformed filenames (missing year)', () => {
    expect(parseFilename('eric_clapton_guitar_rig.jpg')).toBeNull();
  });
});

describe('applyOverride', () => {
  const overrides = {
    ac_dc: 'AC/DC',
    eric_clapton_alt: 'Eric Clapton',
  };

  it('returns the override when present', () => {
    expect(applyOverride('ac_dc', overrides)).toBe('AC/DC');
  });

  it('falls back to displayNameFromSlug when missing', () => {
    expect(applyOverride('jimi_hendrix', overrides)).toBe('Jimi Hendrix');
  });
});

describe('groupByArtist', () => {
  const rigs = [
    { id: 'eric_clapton-1966', artistSlug: 'eric-clapton', artistName: 'Eric Clapton', year: 1966, src: 'x', format: 'jpg' as const },
    { id: 'eric_clapton-1970', artistSlug: 'eric-clapton', artistName: 'Eric Clapton', year: 1970, src: 'x', format: 'jpg' as const },
    { id: 'eric_clapton-1989', artistSlug: 'eric-clapton', artistName: 'Eric Clapton', year: 1989, src: 'x', format: 'jpg' as const },
    { id: 'jimi_hendrix-1969', artistSlug: 'jimi-hendrix', artistName: 'Jimi Hendrix', year: 1969, src: 'x', format: 'jpg' as const },
  ];

  it('groups rigs by artist and computes year range and decades', () => {
    const artists = groupByArtist(rigs);
    expect(artists).toHaveLength(2);
    const clapton = artists.find((a) => a.slug === 'eric-clapton')!;
    expect(clapton.name).toBe('Eric Clapton');
    expect(clapton.count).toBe(3);
    expect(clapton.yearMin).toBe(1966);
    expect(clapton.yearMax).toBe(1989);
    expect(clapton.decades).toEqual([1960, 1970, 1980]);
  });

  it('sorts artists alphabetically by name', () => {
    const artists = groupByArtist(rigs);
    expect(artists.map((a) => a.slug)).toEqual(['eric-clapton', 'jimi-hendrix']);
  });
});
