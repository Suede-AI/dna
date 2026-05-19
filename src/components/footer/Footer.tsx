import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t hairline mt-32">
      <div className="mx-auto max-w-[1600px] px-6 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
        <div className="mono-label">
          <p className="text-[color:var(--color-bone)] mb-2">CONTACT</p>
          <p className="text-[color:var(--color-mute)] block">REACH OUT ON X</p>
          <a
            href="mailto:info@suedeai.org?subject=Suede%20DNA"
            className="text-[color:var(--color-mute)] hover:text-[color:var(--color-signal)] block mt-1"
          >
            info@suedeai.org
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

      <div className="border-t hairline">
        <div className="mx-auto max-w-[1600px] px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div
            aria-hidden
            className="font-[820] leading-[0.85] tracking-[var(--tracking-tight)] text-white select-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            <span>SUEDE</span>
            <span className="text-[color:var(--color-signal)] mx-2">/</span>
            <span className="text-[color:var(--color-bone)]">DNA</span>
          </div>
          <p className="mono-label text-[color:var(--color-bone)] sm:text-right">
            A SUEDE LABS / JASON COLAPIETRO CREATION
          </p>
        </div>
      </div>

      <div className="h-px w-full" style={{ background: 'var(--color-signal-glow)' }} />
    </footer>
  );
}
