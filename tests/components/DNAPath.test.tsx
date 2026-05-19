import { describe, it, expect } from 'vitest';
import { computeDNAPath } from '../../src/components/artist/DNAPath';

describe('computeDNAPath', () => {
  it('generates a single horizontal path with smooth curves', () => {
    const nodes = [{ x: 0, y: 50 }, { x: 200, y: 50 }, { x: 400, y: 50 }];
    const d = computeDNAPath(nodes);
    expect(d.startsWith('M 0 50')).toBe(true);
    expect(d).toContain('C ');
  });

  it('returns empty path for empty nodes', () => {
    expect(computeDNAPath([])).toBe('');
  });

  it('returns a single move for one node', () => {
    expect(computeDNAPath([{ x: 10, y: 20 }])).toBe('M 10 20');
  });

  it('uses cubic curves between adjacent nodes', () => {
    const nodes = [{ x: 0, y: 0 }, { x: 100, y: 0 }];
    const d = computeDNAPath(nodes);
    expect(d).toMatch(/^M 0 0 C \d+ -?\d+, \d+ -?\d+, 100 0$/);
  });
});
