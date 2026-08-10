import { describe, expect, it } from 'vitest';
import rawRigs from '../../data/rigs.json';
import {
  ARTIST_DISPLAY_NAMES,
  ARTIST_MERGES,
  RETIRED_ARTIST_SLUGS,
  canonicalArtistSlug,
} from '../../src/lib/canonical-artists';
import { getAllArtists, getAllRigs, getArtistBySlug, getRigsByArtistSlug, getStats } from '../../src/lib/manifest';

describe('canonical artist merge', () => {
  it('retires every duplicate slug so it no longer resolves to a page', () => {
    expect(RETIRED_ARTIST_SLUGS.length).toBeGreaterThan(0);
    for (const slug of RETIRED_ARTIST_SLUGS) {
      expect(getArtistBySlug(slug), `${slug} should be merged away`).toBeUndefined();
    }
  });

  it('points every merge at a slug that still exists', () => {
    for (const [from, to] of Object.entries(ARTIST_MERGES)) {
      expect(getArtistBySlug(to), `${from} -> ${to}`).toBeDefined();
      expect(RETIRED_ARTIST_SLUGS).not.toContain(to);
    }
  });

  it('re-parents rigs onto the survivor instead of dropping them', () => {
    // The merge must not lose archive material: the rig total is unchanged.
    expect(getAllRigs()).toHaveLength((rawRigs as { rigs: unknown[] }).rigs.length);
    // /vai-steve held the 1999 rig and /steve-vai the 2007 rig; both land on the survivor.
    expect(getRigsByArtistSlug('steve-vai').map((r) => r.year)).toEqual([1999, 2007]);
    // /blacksabbath-toni held 1971 + 2000, /blacksabbath-tony held 1971.
    expect(getRigsByArtistSlug('blacksabbath-tony')).toHaveLength(3);
    // Three Zakk Wylde slugs collapse into one.
    expect(getRigsByArtistSlug('ozzy-zakk-wylde').map((r) => r.year)).toEqual([1988, 2000, 2011]);
  });

  it('reports the deduplicated artist count, not the slug count', () => {
    const stats = getStats();
    expect(stats.totalArtists).toBe(getAllArtists().length);
    expect(stats.totalArtists).toBe(
      new Set((rawRigs as { rigs: Array<{ artistSlug: string }> }).rigs.map((r) => canonicalArtistSlug(r.artistSlug)))
        .size,
    );
  });
});

describe('canonical artist display names', () => {
  it('applies reviewed names to every surface that reads the manifest', () => {
    expect(getArtistBySlug('blacksabbath-tony')?.name).toBe('Tony Iommi — Black Sabbath');
    expect(getArtistBySlug('vanhalen-eddie')?.name).toBe('Eddie Van Halen — Van Halen');
    expect(getArtistBySlug('angus-acdc')?.name).toBe('Angus Young — AC/DC');
    // Rig-level name (used for img alt text and JSON-LD) must match the artist page.
    for (const rig of getRigsByArtistSlug('vanhalen-eddie')) {
      expect(rig.artistName).toBe('Eddie Van Halen — Van Halen');
    }
  });

  it('never publishes a filename-derived name for a slug we have reviewed', () => {
    const mangled = ['Vanhalen Eddie', 'Blacksabbath Toni', 'Blacksabbath Tony', 'Angus Acdc', 'Vai Steve'];
    const published = new Set(getAllArtists().map((a) => a.name));
    for (const name of mangled) {
      expect(published.has(name), `${name} should no longer be published`).toBe(false);
    }
  });

  it('only maps display names onto slugs that exist', () => {
    for (const slug of Object.keys(ARTIST_DISPLAY_NAMES)) {
      expect(getArtistBySlug(slug), slug).toBeDefined();
    }
  });
});
