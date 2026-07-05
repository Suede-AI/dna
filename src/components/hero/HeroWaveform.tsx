'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroWaveform() {
  const reduced = useReducedMotion();
  const primaryPath = 'M0 40 Q60 20 120 40T240 40T360 40T480 40T600 40T720 40T840 40T960 40T1080 40T1200 40';
  const secondaryPath = 'M0 44 Q60 58 120 44T240 44T360 44T480 44T600 44T720 44T840 44T960 44T1080 44T1200 44';
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 w-full h-20 pointer-events-none"
    >
      <defs>
        <linearGradient id="hero-wave-signal" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0" />
          <stop offset="35%" stopColor="var(--color-signal)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={secondaryPath}
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.18"
      >
        {!reduced && (
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values={`${secondaryPath};M0 36 Q60 24 120 36T240 36T360 36T480 36T600 36T720 36T840 36T960 36T1080 36T1200 36;${secondaryPath}`}
          />
        )}
      </path>
      <path
        d={primaryPath}
        fill="none"
        stroke="url(#hero-wave-signal)"
        strokeWidth="1"
        strokeLinecap="round"
      >
        {!reduced && (
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values={`${primaryPath};M0 40 Q60 60 120 40T240 40T360 40T480 40T600 40T720 40T840 40T960 40T1080 40T1200 40;${primaryPath}`}
          />
        )}
      </path>
    </svg>
  );
}
