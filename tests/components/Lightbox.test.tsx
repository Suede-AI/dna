import { describe, expect, it } from 'vitest';
import { getNextLightboxIndex, getNextZoom } from '../../src/components/media/Lightbox';

describe('Lightbox helpers', () => {
  it('wraps previous and next rig indices', () => {
    expect(getNextLightboxIndex(0, 3, -1)).toBe(2);
    expect(getNextLightboxIndex(2, 3, 1)).toBe(0);
    expect(getNextLightboxIndex(1, 3, 1)).toBe(2);
  });

  it('clamps zoom steps', () => {
    expect(getNextZoom(1, 1)).toBe(1.5);
    expect(getNextZoom(1.5, 1)).toBe(2);
    expect(getNextZoom(3, 1)).toBe(3);
    expect(getNextZoom(1, -1)).toBe(1);
  });
});
