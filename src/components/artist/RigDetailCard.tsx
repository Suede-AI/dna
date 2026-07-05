'use client';

import { useState } from 'react';
import { Lightbox } from '../media/Lightbox';
import { RigImage } from '../media/RigImage';
import type { Rig } from '@/lib/manifest';

export function RigDetailCard({
  rig,
  index,
  rigs,
  prev,
  next,
}: {
  rig: Rig;
  index: number;
  rigs: Rig[];
  prev?: Rig;
  next?: Rig;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <article
      id={`rig-${rig.year}`}
      aria-labelledby={`rig-${rig.year}-heading`}
      data-rig-index={index}
      className="border-t hairline"
      style={{ scrollMarginTop: 'calc(var(--header-h) + 1rem)' }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 grid gap-12 md:grid-cols-[3fr_2fr]">
        <figure
          className="relative min-h-[18rem] max-h-[75vh] cursor-zoom-in overflow-hidden bg-[color:var(--color-ink-3)]"
          style={{ borderRadius: 'var(--radius-card)', height: 'min(75vh, 64vw)' }}
          onClick={(event) => {
            if (event.target instanceof HTMLElement && event.target.closest('a')) return;
            setLightboxOpen(true);
          }}
        >
          <div className="absolute inset-4">
            <RigImage
              rig={rig}
              alt={`${rig.artistName} guitar rig setup, ${rig.year} — Guitar Geek archive`}
              priority={index === 0}
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-contain"
            />
          </div>
          <figcaption className="sr-only">
            {rig.artistName} rig, <time dateTime={String(rig.year)}>{rig.year}</time>.
          </figcaption>
        </figure>
        <div className="flex flex-col gap-6">
          <header>
            <p className="mono-label">RIG · {String(index + 1).padStart(3, '0')}</p>
            <h2
              id={`rig-${rig.year}-heading`}
              className="font-[820] text-white mt-2"
              style={{
                fontSize: 'var(--text-section)',
                lineHeight: 0.95,
                letterSpacing: 'var(--tracking-tight)',
              }}
            >
              <time dateTime={String(rig.year)}>{rig.year}</time>
            </h2>
          </header>
          <dl className="mono-data grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[color:var(--color-bone)]">
            <dt className="mono-label self-center">YEAR</dt>
            <dd className="text-white">{rig.year}</dd>
            <dt className="mono-label self-center">FORMAT</dt>
            <dd className="text-white uppercase">{rig.format}</dd>
            <dt className="mono-label self-center">SOURCE</dt>
            <dd>
              <a
                href={rig.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source file for ${rig.artistName} ${rig.year} rig on archive.org (opens in new tab)`}
                className="underline-offset-4 hover:underline hover:text-[color:var(--color-signal)] break-all"
              >
                archive.org/…/{rig.src.split('/').pop()}↗
              </a>
            </dd>
          </dl>
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="mono-label hairline w-fit px-3 py-2 text-[color:var(--color-bone)] hover:text-[color:var(--color-signal)]"
            style={{ borderRadius: 'var(--radius-control)' }}
          >
            OPEN FULL SIZE
          </button>
          <nav aria-label="Rig navigation" className="mt-auto flex gap-6 mono-label">
            {prev && <a href={`#rig-${prev.year}`} className="hover:text-[color:var(--color-signal)]">← {prev.year}</a>}
            {next && <a href={`#rig-${next.year}`} className="ml-auto hover:text-[color:var(--color-signal)]">{next.year} →</a>}
          </nav>
        </div>
      </div>
      <Lightbox rigs={rigs} initialIndex={index} open={lightboxOpen} onOpenChange={setLightboxOpen} />
    </article>
  );
}
