'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Rig } from '@/lib/manifest';

// The intrinsic size of an archive.org original is unknown at render time, so every
// caller places this in a sized, positioned slot and passes that slot's proportions as
// width/height. The image is pinned to the slot (absolute, 100% x 100%) and the diagram
// is letterboxed inside it by the caller's object-contain, so nothing is cropped and the
// <img> still carries explicit dimensions.

// Archive.org serves these originals, but the image optimizer returns 502 for them.
const OPTIMIZER_FAILURES = new Set([
  'https://archive.org/download/guitargeek-archives/melvins_buzzo_2001.png',
  'https://archive.org/download/guitargeek-archives/mightylemondrops_dave_1990.png',
]);

export function RigImage({
  rig,
  alt,
  sizes,
  width,
  height,
  priority = false,
  className = '',
}: {
  rig: Rig;
  alt: string;
  sizes: string;
  /** Pixel box of the sized slot this image fills; fixes the aspect ratio before the file loads. */
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 hairline bg-[color:var(--color-ink-2)] p-4 text-center">
        <p className="mono-label text-[color:var(--color-bone)]">SOURCE OFFLINE</p>
        <p className="mono-data text-white">{rig.year}</p>
        <a
          href={rig.src}
          target="_blank"
          rel="noopener noreferrer"
          className="mono-label text-[color:var(--color-bone)] underline-offset-4 hover:text-[color:var(--color-signal)] hover:underline"
        >
          OPEN ON ARCHIVE.ORG ↗
        </a>
      </div>
    );
  }

  return (
    <>
      {!loaded ? <div aria-hidden className="rig-image-shimmer absolute inset-0 bg-[color:var(--color-ink-2)]" /> : null}
      <Image
        src={rig.src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        unoptimized={rig.format === 'gif' || OPTIMIZER_FAILURES.has(rig.src)}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  );
}
