'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

const SIGNAL_PATH = 'M 72 156 C 132 96, 188 96, 248 156 S 364 216, 424 156 S 540 96, 600 156 S 716 216, 776 156';
const NODES = [
  { x: 40, y: 122, label: 'GUITAR' },
  { x: 216, y: 122, label: 'FUZZ' },
  { x: 392, y: 122, label: 'DELAY' },
  { x: 568, y: 122, label: 'AMP' },
];

export function HeroSignalChain() {
  const reduced = useReducedMotion();

  return (
    <div className="hidden lg:block min-h-[360px]" aria-hidden>
      <svg viewBox="0 0 840 360" className="h-full w-full" role="img">
        <defs>
          <linearGradient id="hero-signal-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--color-signal)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path d={SIGNAL_PATH} fill="none" stroke="url(#hero-signal-fade)" strokeWidth="1.5" strokeLinecap="round" />
        {NODES.map((node) => (
          <g key={node.label}>
            <rect
              x={node.x}
              y={node.y}
              width="112"
              height="68"
              rx="6"
              fill="var(--color-ink-2)"
              stroke="var(--color-line)"
            />
            <text
              x={node.x + 56}
              y={node.y + 40}
              textAnchor="middle"
              fill="var(--color-bone)"
              fontFamily="var(--font-geist-mono), ui-monospace, monospace"
              fontSize="12"
              letterSpacing="1.4"
            >
              {node.label}
            </text>
          </g>
        ))}
        <circle cx="72" cy="156" r="5" fill="var(--color-signal)" filter="drop-shadow(0 0 12px var(--color-signal-glow))">
          {!reduced ? <animateMotion dur="7s" repeatCount="indefinite" path={SIGNAL_PATH} /> : null}
        </circle>
      </svg>
    </div>
  );
}
