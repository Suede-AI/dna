import { afterEach, describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import * as manifest from '../../src/lib/manifest';
import { type Artist } from '../../src/lib/manifest';
import { ARTIST_DISPLAY_NAMES, RETIRED_ARTIST_SLUGS, isReviewedArtistName } from '../../src/lib/canonical-artists';
import { artistArchiveContext, artistPageDescription, artistPageTitle } from '../../src/lib/seo';
import ArtistPage, { generateMetadata } from '../../src/app/[artist-slug]/page';
import sitemap from '../../src/app/sitemap';
import { ArtistStrip } from '../../src/components/artist/ArtistStrip';

const SITE = 'https://dna.suedeai.ai';
const artists = manifest.getAllArtists();
const reviewed = artists.filter((a) => isReviewedArtistName(a.slug, a.name));
const unresolved = artists.filter((a) => !isReviewedArtistName(a.slug, a.name));

afterEach(() => vi.restoreAllMocks());

/** Inspect the actual page's JSON-LD child, not a copy of its eligibility rule. */
async function emittedSchema(artist: Artist) {
  const page = await ArtistPage({ params: Promise.resolve({ 'artist-slug': artist.slug }) });
  return page.props.children[0]?.props?.data ?? null;
}

function collectNames(node: unknown, out: string[] = []): string[] {
  if (Array.isArray(node)) {
    for (const value of node) collectNames(value, out);
  } else if (node && typeof node === 'object') {
    const record = node as Record<string, unknown>;
    if (typeof record.name === 'string') out.push(record.name);
    for (const value of Object.values(record)) collectNames(value, out);
  }
  return out;
}

describe('public archive discovery is independent of performer identity review', () => {
  it('preserves the existing reviewed identities without manufacturing review records', () => {
    expect(artists).toHaveLength(361);
    expect(reviewed).toHaveLength(64);
    expect(unresolved).toHaveLength(297);
    for (const slug of ['who-pete', 'alicecooper-pete', 'yolatengo-ira']) {
      expect(unresolved.some((artist) => artist.slug === slug)).toBe(true);
      expect(ARTIST_DISPLAY_NAMES[slug]).toBeUndefined();
    }
  });

  it('makes every published archive page indexable, self-canonical and discoverable in the sitemap', async () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const artist of artists) {
      const metadata = await generateMetadata({ params: Promise.resolve({ 'artist-slug': artist.slug }) });
      expect(metadata.robots, artist.slug).toEqual({ index: true, follow: true });
      expect(metadata.alternates?.canonical, artist.slug).toBe(`/${artist.slug}`);
      expect(urls.filter((url) => url === `${SITE}/${artist.slug}`), artist.slug).toHaveLength(1);
    }
  });

  it('identifies unresolved names as archive labels in titles, visible headings and source context', async () => {
    for (const artist of unresolved) {
      expect(artistPageTitle(artist), artist.slug).toContain('Archive label:');
      expect(artistPageDescription(artist), artist.slug).toContain('Archive label');
      expect(artistArchiveContext(artist), artist.slug).toContain('not been verified as a performer identity');
      const markup = renderToStaticMarkup(ArtistStrip({ artist, archivePosition: null }));
      expect(markup.match(/<h1[\s\S]*?<\/h1>/)?.[0], artist.slug).toContain('Archive label:');
      const metadata = await generateMetadata({ params: Promise.resolve({ 'artist-slug': artist.slug }) });
      expect(metadata.openGraph).toMatchObject({ type: 'website' });
      expect(metadata.keywords, artist.slug).toBeUndefined();
    }
  });

  it('emits no performer schema for any unresolved archive label', async () => {
    for (const artist of unresolved) {
      expect(await emittedSchema(artist), artist.slug).toBeNull();
    }
  });

  it('preserves all reviewed Person graphs with visible names and original archive image sources', async () => {
    const unresolvedNames = new Set(unresolved.map((artist) => artist.name));
    for (const artist of reviewed) {
      const graph = await emittedSchema(artist);
      expect(graph?.mainEntity['@type'], artist.slug).toBe('Person');
      expect(artist.name).toContain(graph.mainEntity.name);
      if (graph.mainEntity.memberOf) expect(artist.name).toContain(graph.mainEntity.memberOf.name);
      for (const name of collectNames(graph)) expect(unresolvedNames.has(name), name).toBe(false);
      expect(graph.hasPart.map((part: { contentUrl: string }) => part.contentUrl)).toEqual(
        manifest.getRigsByArtistSlug(artist.slug).map((rig) => rig.src),
      );
    }
  });

  it('keeps a future published unreviewed archive label discoverable without creating an identity assertion', async () => {
    const future: Artist = { ...unresolved[0], slug: 'unreviewed-future-label', name: 'Unreviewed Future Label' };
    vi.spyOn(manifest, 'getAllArtists').mockReturnValue([...artists, future]);
    vi.spyOn(manifest, 'getArtistBySlug').mockImplementation((slug) => [...artists, future].find((a) => a.slug === slug));
    const metadata = await generateMetadata({ params: Promise.resolve({ 'artist-slug': future.slug }) });
    expect(metadata.robots).toEqual({ index: true, follow: true });
    expect(metadata.openGraph).toMatchObject({ type: 'website' });
    expect(sitemap().some((entry) => entry.url === `${SITE}/${future.slug}`)).toBe(true);
    expect(await emittedSchema(future)).toBeNull();
  });

  it('does not add retired or nonexistent archive pages to discovery', async () => {
    const urls = new Set(sitemap().map((entry) => entry.url));
    for (const slug of RETIRED_ARTIST_SLUGS) expect(urls.has(`${SITE}/${slug}`), slug).toBe(false);
    const params = Promise.resolve({ 'artist-slug': 'nonexistent-archive-entry' });
    expect(await generateMetadata({ params })).toEqual({});
    await expect(ArtistPage({ params })).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
  });
});
