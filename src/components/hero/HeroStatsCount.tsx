'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroStatsCount({
  totalRigs,
  totalArtists,
  yearMin,
  yearMax,
}: {
  totalRigs: number;
  totalArtists: number;
  yearMin: number;
  yearMax: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const hasRun = useRef(false);
  const reduced = useReducedMotion();
  const [counts, setCounts] = useState({ totalRigs, totalArtists });

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || hasRun.current) return;

    const run = () => {
      if (hasRun.current) return;
      hasRun.current = true;
      const startRigs = Math.floor(totalRigs * 0.88);
      const startArtists = Math.floor(totalArtists * 0.88);
      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / 600, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCounts({
          totalRigs: Math.round(startRigs + (totalRigs - startRigs) * eased),
          totalArtists: Math.round(startArtists + (totalArtists - startArtists) * eased),
        });
        if (progress < 1) requestAnimationFrame(tick);
      };

      setCounts({ totalRigs: startRigs, totalArtists: startArtists });
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      run();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        run();
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, totalArtists, totalRigs]);

  return (
    <p ref={ref} className="mt-12 mono-label tabular-nums">
      {counts.totalRigs.toLocaleString()} RIGS · {counts.totalArtists.toLocaleString()} ARTISTS · {yearMin}–{yearMax}
    </p>
  );
}
