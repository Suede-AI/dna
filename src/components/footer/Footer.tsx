import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t hairline mt-32">
      <div className="mx-auto max-w-[1600px] px-6 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="mono-label">
          <p className="text-[color:var(--color-bone)] mb-2">SUEDE / DNA</p>
          <p className="text-[color:var(--color-mute-readable)]">SIGNAL CHAINS, ARCHIVED.</p>
        </div>
        <div className="mono-label">
          <p className="text-[color:var(--color-bone)] mb-2">SOURCE</p>
          <a
            href="https://archive.org/details/guitargeek-archives"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)] block"
          >
            archive.org / guitargeek-archives ↗
          </a>
        </div>
        <div className="mono-label">
          <p className="text-[color:var(--color-bone)] mb-2">CONTACT</p>
          <a
            href="https://x.com/aisuede"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)] block"
          >
            @aisuede on X ↗
          </a>
          <a
            href="mailto:info@suedeai.ai?subject=Suede%20DNA"
            className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)] block mt-1"
          >
            info@suedeai.ai
          </a>
        </div>
        <div className="mono-label">
          <p className="text-[color:var(--color-bone)] mb-2">SUEDE</p>
          <Link href="/about" className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)] block">
            METHOD →
          </Link>
          <Link href="/docs" className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)] block mt-1">
            DOCS →
          </Link>
          <Link href="/articles" className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)] block mt-1">
            ARTICLES →
          </Link>
          {/* Suede DNA is published by Suede AI and is covered by the estate
              privacy policy, so the footer links to the policy that governs it
              rather than restating it on this host. */}
          <a
            href="https://suedeai.ai/privacy"
            className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)] block mt-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            PRIVACY ↗
          </a>
          <a
            href="https://hub.suedeai.ai"
            className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)] block mt-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Suede estate directory ↗
          </a>
          <a
            href="https://guitar.solutions"
            className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)] block mt-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            THE SIGNAL CHAIN ↗
          </a>
          <a
            href="https://social.suedeai.ai"
            className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)] block mt-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            social.suedeai.ai ↗
          </a>
          <a
            href="https://suedeai.ai"
            className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)] block mt-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            suedeai.ai ↗
          </a>
        </div>
      </div>

      <BuiltInWestPalmBeach />

      <div className="border-t hairline">
        <div className="mx-auto max-w-[1600px] px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div
            aria-hidden
            className="flex flex-wrap sm:block font-[820] leading-[0.85] tracking-[var(--tracking-tight)] text-white select-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            <span>SUEDE</span>
            <span className="text-[color:var(--color-signal)] mx-2">/</span>
            <span className="text-[color:var(--color-bone)]">DNA</span>
          </div>
          <div className="mono-label text-[color:var(--color-bone)] sm:text-right space-y-1">
            <p>
              Built by{' '}
              <a
                href="https://suedeai.ai/founder"
                className="hover:text-[color:var(--color-signal)] underline-offset-4 hover:underline"
              >
                Jason Colapietro
              </a>
              , founder of Suede AI
            </p>
            <p className="text-[color:var(--color-mute-readable)]">
              SOURCED FROM GUITAR GEEK FOR{' '}
              <a
                href="https://social.suedeai.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--color-signal)] underline-offset-4 hover:underline"
              >
                SOCIAL.SUEDEAI.AI ↗
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="h-px w-full" style={{ background: 'var(--color-signal-glow)' }} />
    </footer>
  );
}

const FOOTER_LINK =
  'text-white hover:text-[color:var(--color-signal)] underline-offset-4 hover:underline';

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
      {children}
    </a>
  );
}

/**
 * Sitewide "who made this, and where" block: Suede AI in West Palm Beach,
 * Florida, with the main Suede pages and a few related archive siblings.
 */
function BuiltInWestPalmBeach() {
  return (
    <section aria-labelledby="built-by-suede" className="border-t hairline">
      <div className="mx-auto max-w-[1600px] px-6 py-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 id="built-by-suede" className="mono-label text-[color:var(--color-bone)]">
            BUILT BY SUEDE AI IN WEST PALM BEACH, FLORIDA
          </h2>
          <p className="mt-3 max-w-[720px] text-[color:var(--color-bone)] leading-relaxed">
            Suede DNA is designed, engineered, and maintained by{' '}
            <Out href="https://suedeai.ai/">Suede AI</Out>, the agentic platform company founded by{' '}
            <Out href="https://suedeai.ai/founder">Jason Colapietro</Out> (
            <Out href="https://jasoncolapietro.com/">jasoncolapietro.com</Out>). The same team runs{' '}
            <Out href="https://suedeai.agency/">
              Suede AI’s SEO, GEO, and web development practice
            </Out>{' '}
            for businesses in West Palm Beach, Jupiter, and across Palm Beach County.{' '}
            <Out href="https://jupitersocialfl.com/">Jupiter Social</Out>, a local magazine for
            Jupiter, Florida, is published with Suede AI. New here? Read the{' '}
            <Link href="/articles" className={FOOTER_LINK}>
              field notes on archives and AI search
            </Link>
            .
          </p>
        </div>
        <div className="mono-label">
          <p className="text-[color:var(--color-bone)] mb-2">MORE FROM SUEDE AI</p>
          <ul className="space-y-1">
            {[
              ['https://guitar.services/', 'Signal Chain reference'],
              ['https://guitarchords.info/', 'Chords, scales, and tuner'],
              ['https://guitarhub.org/', 'Guitar Hub'],
              ['https://signal.suedeai.ai/', 'Suede Signal'],
              ['https://optimize.suedeai.ai/', 'Suede Scan: AI readiness'],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)]"
                >
                  {label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
