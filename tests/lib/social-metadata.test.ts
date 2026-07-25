import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DNA_SOCIAL_IMAGE } from '@/lib/seo/social-metadata';

const METADATA_PAGES = [
  'src/app/docs/page.tsx',
  'src/app/docs/search-and-filters/page.tsx',
  'src/app/docs/what-is-suede-dna/page.tsx',
  'src/app/docs/sourcing-and-verification/page.tsx',
  'src/app/docs/faq/page.tsx',
  'src/app/articles/page.tsx',
  'src/app/articles/rig-archaeology-and-the-ear-trained-player/page.tsx',
  'src/app/articles/the-unsung-link/page.tsx',
  'src/app/articles/shred-signal-and-the-virtuoso-rig/page.tsx',
  'src/app/articles/building-a-tone-over-a-career/page.tsx',
  'src/app/articles/the-guitar-rig-diagram-as-a-documentary-form/page.tsx',
] as const;

describe('Suede DNA social metadata', () => {
  it('defines a share card at the required dimensions', () => {
    expect(DNA_SOCIAL_IMAGE).toMatchObject({
      url: '/dna-social-card.webp',
      width: 1200,
      height: 630,
    });
  });

  it.each(METADATA_PAGES)('%s keeps the shared card when metadata is replaced', (path) => {
    const source = readFileSync(resolve(process.cwd(), path), 'utf8');

    expect(source).toContain("from '@/lib/seo/social-metadata'");
    expect(source).toContain('images: [DNA_SOCIAL_IMAGE]');
    expect(source).toContain("card: 'summary_large_image'");
    expect(source).toContain('images: [DNA_SOCIAL_IMAGE.url]');
  });
});
