import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { RETIRED_ARTIST_SLUGS } from '../../src/lib/canonical-artists';
import { getAllArtists } from '../../src/lib/manifest';
import {
  MAX_DOCUMENT_TITLE,
  SITE_TITLE_SUFFIX,
  artistDocumentTitle,
  artistIsIndexable,
  artistPageTitle,
} from '../../src/lib/seo';

function rendered(title: string | { absolute: string }): string {
  return typeof title === 'string' ? title + SITE_TITLE_SUFFIX : title.absolute;
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|mdx?)$/.test(name) ? [path] : [];
  });
}

describe('artist document titles', () => {
  it('fits every indexable artist title in a search result', () => {
    const indexable = getAllArtists().filter(artistIsIndexable);
    expect(indexable.length).toBeGreaterThan(0);
    for (const artist of indexable) {
      const title = rendered(artistDocumentTitle(artist));
      expect(title.length, `${artist.slug}: ${title}`).toBeLessThanOrEqual(MAX_DOCUMENT_TITLE);
    }
  });

  it('keeps the site suffix whenever it fits, and only then', () => {
    for (const artist of getAllArtists().filter(artistIsIndexable)) {
      const base = artistPageTitle(artist);
      const title = artistDocumentTitle(artist);
      if ((base + SITE_TITLE_SUFFIX).length <= MAX_DOCUMENT_TITLE) {
        expect(title, artist.slug).toBe(base);
      } else {
        expect(title, artist.slug).toEqual({ absolute: base });
      }
    }
  });
});

describe('internal links', () => {
  it('never link a retired artist slug, which only 301s to the merged page', () => {
    const files = sourceFiles(resolve(process.cwd(), 'src'));
    for (const file of files) {
      const source = readFileSync(file, 'utf8');
      for (const slug of RETIRED_ARTIST_SLUGS) {
        expect(source.includes(`href="/${slug}"`), `${file} links /${slug}`).toBe(false);
        expect(source.includes(`href="/${slug}#`), `${file} links /${slug}#`).toBe(false);
      }
    }
  });
});
