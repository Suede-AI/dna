'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { computeDNAChainLayout, computeDNAPath, DNAPath } from './DNAPath';
import { RigImage } from '../media/RigImage';
import type { Rig } from '@/lib/manifest';

const NODE_W = 180;
const MIN_NODE_GAP = 56;
const MAX_NODE_GAP = 180;
const YEAR_SCALE = 28;
const NODE_H = 132;
const CHAIN_PADDING_X = 32;
const CHAIN_HEIGHT = 220;

export function DNAChain({ rigs, artistName }: { rigs: Rig[]; artistName: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const { nodes, ticks, totalWidth } = useMemo(
    () =>
      computeDNAChainLayout(rigs, {
        nodeWidth: NODE_W,
        minGap: MIN_NODE_GAP,
        maxGap: MAX_NODE_GAP,
        yearScale: YEAR_SCALE,
        paddingX: CHAIN_PADDING_X,
        y: CHAIN_HEIGHT / 2,
      }),
    [rigs]
  );
  const path = useMemo(() => computeDNAPath(nodes), [nodes]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateOverflow = () => setHasOverflow(scroller.scrollWidth > scroller.clientWidth);
    updateOverflow();
    window.addEventListener('resize', updateOverflow);
    return () => window.removeEventListener('resize', updateOverflow);
  }, [totalWidth]);

  if (rigs.length === 0) return null;

  return (
    <section
      aria-label={`${artistName} rig timeline`}
      className="relative border-y hairline"
    >
      {hasOverflow ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12"
            style={{ background: 'linear-gradient(to right, var(--color-ink-1), transparent)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12"
            style={{ background: 'linear-gradient(to left, var(--color-ink-1), transparent)' }}
          />
          <p className="mono-label pointer-events-none absolute bottom-3 right-6 z-20 text-[color:var(--color-bone)]">
            SCROLL →
          </p>
        </>
      ) : null}
      <div ref={scrollerRef} className="overflow-x-auto">
        <div className="relative" style={{ width: totalWidth, height: CHAIN_HEIGHT + 96 }}>
          <div className="absolute inset-0" style={{ height: CHAIN_HEIGHT }}>
            <DNAPath nodes={nodes} />
            {path && nodes.length > 1 ? (
              <span
                aria-hidden
                className="dna-pulse-dot"
                style={{ offsetPath: `path("${path}")` }}
              />
            ) : null}
          </div>
          <div className="absolute left-0 right-0" style={{ top: CHAIN_HEIGHT - 28 }}>
            <div className="h-px bg-[color:var(--color-line)]" />
            {ticks.map((tick) => (
              <div key={tick.year} className="absolute top-0" style={{ left: tick.x }}>
                <span className="block h-3 w-px bg-[color:var(--color-line)]" />
                <span className="mono-label mt-2 block -translate-x-1/2 text-[color:var(--color-bone)]">{tick.year}</span>
              </div>
            ))}
          </div>
          <ol className="relative flex items-center h-full" style={{ height: CHAIN_HEIGHT }}>
            {rigs.map((rig, i) => (
              <li
                key={rig.id}
                className="rig-node absolute"
                style={{
                  left: nodes[i].x - NODE_W / 2,
                  top: CHAIN_HEIGHT / 2 - NODE_H / 2,
                  width: NODE_W,
                  height: NODE_H,
                }}
              >
                <a
                  href={`#rig-${rig.year}`}
                  className="group rig-interactive-card block hairline overflow-hidden focus-visible:outline-1 focus-visible:outline-[color:var(--color-signal)]"
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
                  <span className="rig-arrow text-[color:var(--color-mute)]">VIEW DNA →</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
