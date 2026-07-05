import { describe, it, expect } from 'vitest';
import { computeDNAChainLayout, computeDNAPath } from '../../src/components/artist/DNAPath';

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

describe('computeDNAChainLayout', () => {
  const options = {
    nodeWidth: 180,
    minGap: 56,
    maxGap: 180,
    yearScale: 28,
    paddingX: 32,
    y: 110,
  };

  it('spaces nodes proportionally to year gaps within bounds', () => {
    const layout = computeDNAChainLayout([{ year: 2000 }, { year: 2001 }, { year: 2011 }], options);
    const oneYearGap = layout.nodes[1].x - layout.nodes[0].x;
    const tenYearGap = layout.nodes[2].x - layout.nodes[1].x;

    expect(oneYearGap).toBe(236);
    expect(tenYearGap).toBe(360);
    expect(tenYearGap).toBeGreaterThan(oneYearGap);
  });

  it('deduplicates year ticks and computes total width', () => {
    const layout = computeDNAChainLayout([{ year: 2000 }, { year: 2000 }, { year: 2005 }], options);

    expect(layout.ticks.map((tick) => tick.year)).toEqual([2000, 2005]);
    expect(layout.totalWidth).toBe(layout.nodes[2].x + 90 + 32);
  });
});
