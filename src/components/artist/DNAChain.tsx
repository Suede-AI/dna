'use client';

import { useMemo } from 'react';
import { DNAPath, type ChainNode } from './DNAPath';
import { RigImage } from '../media/RigImage';
import type { Rig } from '@/lib/manifest';

const NODE_W = 180;
const NODE_GAP = 56;
const NODE_H = 132;
const CHAIN_PADDING_X = 32;
const CHAIN_HEIGHT = 220;

export function DNAChain({ rigs, artistName }: { rigs: Rig[]; artistName: string }) {
  const { nodes, totalWidth } = useMemo(() => {
    const ns: ChainNode[] = rigs.map((_, i) => ({
      x: CHAIN_PADDING_X + i * (NODE_W + NODE_GAP) + NODE_W / 2,
      y: CHAIN_HEIGHT / 2,
    }));
    const totalWidth = CHAIN_PADDING_X * 2 + rigs.length * NODE_W + Math.max(0, rigs.length - 1) * NODE_GAP;
    return { nodes: ns, totalWidth };
  }, [rigs]);

  if (rigs.length === 0) return null;

  return (
    <section
      aria-label={`${artistName} rig timeline`}
      className="overflow-x-auto border-y hairline"
    >
      <div className="relative" style={{ width: totalWidth, height: CHAIN_HEIGHT + 80 }}>
        <div className="absolute inset-0" style={{ height: CHAIN_HEIGHT }}>
          <DNAPath nodes={nodes} />
        </div>
        <ol className="relative flex items-center h-full" style={{ height: CHAIN_HEIGHT }}>
          {rigs.map((rig, i) => (
            <li
              key={rig.id}
              className="absolute"
              style={{
                left: nodes[i].x - NODE_W / 2,
                top: CHAIN_HEIGHT / 2 - NODE_H / 2,
                width: NODE_W,
                height: NODE_H,
              }}
            >
              <a
                href={`#rig-${rig.year}`}
                className="block group hairline overflow-hidden focus-visible:outline-1 focus-visible:outline-[color:var(--color-signal)]"
                style={{ borderRadius: 'var(--radius-card)', background: 'var(--color-ink-2)' }}
              >
                <div className="relative aspect-[4/3] bg-[color:var(--color-ink-3)]">
                  <div className="absolute inset-2">
                    <RigImage
                      rig={rig}
                      alt={`${rig.artistName} guitar rig setup, ${rig.year}`}
                      sizes="180px"
                      className="object-contain transition-opacity group-hover:opacity-90"
                    />
                  </div>
                </div>
              </a>
              <div className="mt-2 flex items-center justify-between mono-label">
                <span className="text-[color:var(--color-bone)]">{rig.year}</span>
                <span className="text-[color:var(--color-mute)]">RIG·{String(i + 1).padStart(2, '0')}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
