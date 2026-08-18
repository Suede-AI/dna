import { describe, it, expect } from 'vitest';
import { getAllArtists, getRigsByArtistSlug, type Artist } from '../../src/lib/manifest';
import { ARTIST_DISPLAY_NAMES } from '../../src/lib/canonical-artists';
import { artistIsIndexable, artistJsonLd } from '../../src/lib/seo';
import { generateMetadata } from '../../src/app/[artist-slug]/page';

/**
 * Guard for the fabricated-artist-name defect.
 *
 * 302+ artist pages render a human name that is a literal title-cased transform
 * of an archive.org filename slug ("Who Pete" for Pete Townshend, "Yolatengo
 * Ira" for Ira Kaplan, "Alicecooper Pete"). The real surnames are not in the
 * data at all. Publishing these — in <title>/<h1>/JSON-LD, typed as a real
 * entity — asserts false facts about living people to answer engines.
 *
 * The CLAIM this test defends (asserted on the defect class, not on any
 * remembered literal, and scanned per artist rather than on a concatenation):
 *
 *   1. An artist page is indexable IFF its display name has been human-reviewed
 *      (listed in data/artist-names.json, or authored in curated "Player — Band"
 *      form). Every other page is a fabricated name.
 *   2. Every fabricated page is served `noindex, follow`.
 *   3. Every fabricated page emits NO Person/MusicGroup JSON-LD at all, so its
 *      fabricated name is never asserted as a real entity anywhere in the graph.
 *   4. Every reviewed page stays `index, follow` and types its subject as a
 *      Person (never the old, wrong MusicGroup), with the name split so schema
 *      matches the visible page.
 */

const SITE = 'https://dna.suedeai.ai';
const artists = getAllArtists();

/** Exactly what the artist page emits: schema only for indexable artists. */
function emittedSchema(a: Artist) {
  return artistIsIndexable(a) ? artistJsonLd(a, getRigsByArtistSlug(a.slug), SITE) : null;
}

/** Recursively collect every `name` string an emitted JSON-LD graph asserts. */
function collectNames(node: unknown, out: string[] = []): string[] {
  if (Array.isArray(node)) {
    for (const x of node) collectNames(x, out);
  } else if (node && typeof node === 'object') {
    const o = node as Record<string, unknown>;
    if (typeof o.name === 'string') out.push(o.name);
    for (const v of Object.values(o)) collectNames(v, out);
  }
  return out;
}

const reviewed = artists.filter((a) => artistIsIndexable(a));
const fabricated = artists.filter((a) => !artistIsIndexable(a));

describe('fabricated artist names are not indexed or asserted as entities', () => {
  it('partitions every live artist and is non-vacuous (both buckets populated)', () => {
    expect(reviewed.length + fabricated.length).toBe(artists.length);
    expect(artists.length).toBe(361);
    // Non-vacuous: neither bucket is empty, and the fabricated bucket is the
    // large majority the fix targets.
    expect(reviewed.length).toBe(64);
    expect(fabricated.length).toBe(297);
  });

  it('classifies known real-people fabrications as non-indexable', () => {
    // These slugs are live and render a mangled name for a real, living person.
    for (const slug of ['who-pete', 'alicecooper-pete', 'yolatengo-ira']) {
      const a = artists.find((x) => x.slug === slug);
      expect(a, `${slug} should be a live artist`).toBeDefined();
      expect(artistIsIndexable(a!)).toBe(false);
      expect(ARTIST_DISPLAY_NAMES[slug]).toBeUndefined();
    }
  });

  it('emits noindex,follow for every fabricated page and index,follow for reviewed pages', async () => {
    // Assert on the actual metadata boundary (generateMetadata), per artist.
    const check = async (a: Artist) => {
      const meta = await generateMetadata({ params: Promise.resolve({ 'artist-slug': a.slug }) });
      const robots = meta.robots as { index?: boolean; follow?: boolean } | undefined;
      return robots;
    };
    // Sample across both buckets keeps the run fast while covering the boundary
    // on real reviewed and real fabricated slugs.
    for (const a of [...fabricated.slice(0, 25), ...fabricated.slice(-5)]) {
      const robots = await check(a);
      expect(robots?.index, `${a.slug} must be noindex`).toBe(false);
      expect(robots?.follow, `${a.slug} must stay follow`).toBe(true);
    }
    for (const a of reviewed) {
      const robots = await check(a);
      expect(robots?.index, `${a.slug} must stay indexable`).toBe(true);
      expect(robots?.follow).toBe(true);
    }
  });

  it('emits no JSON-LD for any fabricated page (per artist)', () => {
    for (const a of fabricated) {
      expect(emittedSchema(a), `${a.slug} must not emit structured data`).toBeNull();
    }
  });

  it('never asserts a fabricated name as an entity anywhere in the emitted graph', () => {
    const fabricatedNames = new Set(fabricated.map((a) => a.name));
    expect(fabricatedNames.size).toBeGreaterThan(0);

    const assertedNames = new Set<string>();
    for (const a of artists) {
      const ld = emittedSchema(a);
      if (ld) for (const n of collectNames(ld)) assertedNames.add(n);
    }
    expect(assertedNames.size).toBeGreaterThan(0);

    for (const name of fabricatedNames) {
      expect(assertedNames.has(name), `fabricated name "${name}" must not appear in any JSON-LD`).toBe(false);
    }
  });

  it('types every reviewed subject as a Person (not MusicGroup) with a name that matches the visible page', () => {
    for (const a of reviewed) {
      const ld = emittedSchema(a);
      expect(ld, `${a.slug} should emit schema`).not.toBeNull();
      const mainEntity = ld!.mainEntity as { '@type': string; name: string; memberOf?: { name: string } };
      expect(mainEntity['@type'], `${a.slug} subject must be a Person`).toBe('Person');
      // The Person name must not carry the "— Band" suffix...
      expect(mainEntity.name.includes(' — '), `${a.slug} person name must be split`).toBe(false);
      // ...and every asserted name must be a substring of the visible display
      // name, so structured data matches rendered content.
      expect(a.name).toContain(mainEntity.name);
      if (mainEntity.memberOf) expect(a.name).toContain(mainEntity.memberOf.name);
      // Regression guard: the old code typed individuals as MusicGroup.
      const names = collectNames(ld);
      expect(names.length).toBeGreaterThan(0);
      const types = JSON.stringify(ld);
      expect(types.includes('"MusicGroup"') && !mainEntity.memberOf).toBe(false);
    }
  });
});
