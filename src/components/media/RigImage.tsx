'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Rig } from '@/lib/manifest';

export function RigImage({
  rig,
  alt,
  sizes,
  priority = false,
  className = '',
}: {
  rig: Rig;
  alt: string;
  sizes: string;
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
        fill
        priority={priority}
        sizes={sizes}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        unoptimized={rig.format === 'gif'}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  );
}
