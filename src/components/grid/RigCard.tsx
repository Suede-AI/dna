import Link from 'next/link';
import { memo } from 'react';
import { RigImage } from '../media/RigImage';
import type { Rig } from '@/lib/manifest';

function RigCardComponent({ rig, index, stagger }: { rig: Rig; index: number; stagger?: number | null }) {
  const animationStyle =
    stagger !== null && stagger !== undefined
      ? { animation: `sweep-in var(--duration-component) var(--ease-sweep) ${stagger}ms both` }
      : undefined;
  return (
    <Link
      href={`/${rig.artistSlug}#rig-${rig.year}`}
      className="group block hairline transition-colors"
      style={{
        background: 'var(--color-ink-2)',
        borderRadius: 'var(--radius-card)',
        ...animationStyle,
      }}
    >
      <figure className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-ink-3)]">
        <div className="absolute inset-3">
          <RigImage
            rig={rig}
            alt={`${rig.artistName} guitar rig setup, ${rig.year} — Guitar Geek archive`}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain transition-opacity duration-300 group-hover:opacity-90"
          />
        </div>
      </figure>
      <div className="border-t hairline px-4 py-3 flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-white truncate" style={{ fontWeight: 600 }}>{rig.artistName}</p>
          <p className="mono-label">RIG · {String(index + 1).padStart(3, '0')}</p>
        </div>
        <div className="text-right">
          <p className="mono-data text-[color:var(--color-bone)]">{rig.year}</p>
          <p className="mono-label group-hover:text-[color:var(--color-signal)] transition-colors">
            VIEW DNA →
          </p>
        </div>
      </div>
    </Link>
  );
}

export const RigCard = memo(RigCardComponent);
