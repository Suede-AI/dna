import { SuedeLink } from './PageShell';

/**
 * Byline card for the Suede AI field notes. Names the canonical founder page
 * and personal site; the structured identity lives in the root layout graph.
 */
export function AuthorBox() {
  return (
    <aside
      aria-label="About the author"
      className="hairline rounded-[var(--radius-card)] p-6"
      style={{ background: 'var(--color-ink-2)' }}
    >
      <p className="mono-label">ABOUT THE AUTHOR</p>
      <p className="mt-3 font-[820] text-white">Jason Colapietro</p>
      <p className="mono-label mt-1 text-[color:var(--color-mute-readable)]">
        FOUNDER AND CEO, SUEDE AI · WEST PALM BEACH, FLORIDA
      </p>
      <p className="mt-3">
        Jason Colapietro is the engineer who founded Suede AI in 2024, an agentic platform company
        based in West Palm Beach with an AI search visibility practice serving Palm Beach County.
        Read the full record on <SuedeLink href="https://suedeai.ai/founder">his founder page</SuedeLink>{' '}
        or at <SuedeLink href="https://jasoncolapietro.com/">jasoncolapietro.com</SuedeLink>.
      </p>
    </aside>
  );
}
