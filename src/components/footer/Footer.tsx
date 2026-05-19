import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t hairline mt-32">
      <div className="mx-auto max-w-[1600px] px-6 py-12 grid gap-6 sm:grid-cols-3">
        <div className="mono-label">
          <p className="text-[color:var(--color-bone)] mb-2">SUEDE / DNA</p>
          <p className="text-[color:var(--color-mute)]">SIGNAL CHAINS, ARCHIVED.</p>
        </div>
        <div className="mono-label">
          <p className="text-[color:var(--color-bone)] mb-2">SOURCE</p>
          <a
            href="https://archive.org/details/guitargeek-archives"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-mute)] hover:text-[color:var(--color-signal)] block"
          >
            archive.org / guitargeek-archives ↗
          </a>
          <a
            href="mailto:corrections@suedeai.ai?subject=Suede%20DNA%20correction"
            className="text-[color:var(--color-mute)] hover:text-[color:var(--color-signal)] block mt-1"
          >
            corrections@suedeai.ai
          </a>
        </div>
        <div className="mono-label">
          <p className="text-[color:var(--color-bone)] mb-2">SUEDE</p>
          <Link href="/about" className="text-[color:var(--color-mute)] hover:text-[color:var(--color-signal)] block">
            METHOD →
          </Link>
          <a
            href="https://suedeai.ai"
            className="text-[color:var(--color-mute)] hover:text-[color:var(--color-signal)] block mt-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            suedeai.ai ↗
          </a>
        </div>
      </div>
      <div className="h-px w-full" style={{ background: 'var(--color-signal-glow)' }} />
    </footer>
  );
}
