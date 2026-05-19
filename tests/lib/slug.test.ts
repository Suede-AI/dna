import { describe, it, expect } from 'vitest';
import { slugify, displayNameFromSlug } from '../../src/lib/slug';

describe('slugify', () => {
  it('converts archive slugs to route slugs', () => {
    expect(slugify('eric_clapton')).toBe('eric-clapton');
    expect(slugify('311_tim_mahoney')).toBe('311-tim-mahoney');
  });
});

describe('displayNameFromSlug', () => {
  it('title-cases an underscore-joined slug', () => {
    expect(displayNameFromSlug('eric_clapton')).toBe('Eric Clapton');
    expect(displayNameFromSlug('jimi_hendrix')).toBe('Jimi Hendrix');
  });

  it('preserves all-numeric prefixes', () => {
    expect(displayNameFromSlug('311_tim_mahoney')).toBe('311 Tim Mahoney');
  });

  it('handles single-word slugs', () => {
    expect(displayNameFromSlug('madonna')).toBe('Madonna');
  });
});
