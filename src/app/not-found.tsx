import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — No Signal',
  description: 'This rig is not in the Suede DNA archive.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-32">
      <nav aria-label="Rescue links" className="mono-label flex flex-wrap gap-6">
        <Link href="/" className="hover:text-[color:var(--color-signal)]">BROWSE THE ARCHIVE</Link>
        <Link href="/about" className="hover:text-[color:var(--color-signal)]">ABOUT</Link>
      </nav>
      <p className="mono-label mt-16">SUEDE/DNA / NOT FOUND</p>
      <h1
        className="mt-6 font-[820] text-white"
        style={{ fontSize: 'var(--text-hero)', lineHeight: 1, letterSpacing: 'var(--tracking-tight)' }}
      >
        SIGNAL LOST.
      </h1>
      <p className="mt-8 max-w-[640px] text-[color:var(--color-bone)]">
        This rig is not in the archive. Search the signal-chain index or return to the full compilation.
      </p>
      <form action="/" className="mt-10 flex max-w-[640px] flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="not-found-search">Search the archive</label>
        <input
          id="not-found-search"
          name="q"
          type="search"
          placeholder="artist or year"
          className="h-12 flex-1 hairline bg-transparent px-4 text-white outline-none placeholder:text-[color:var(--color-mute)]"
          style={{ borderRadius: 'var(--radius-control)' }}
        />
        <button
          type="submit"
          className="h-12 px-5 mono-label hairline text-[color:var(--color-bone)] hover:text-[color:var(--color-signal)]"
          style={{ borderRadius: 'var(--radius-control)' }}
        >
          SEARCH ARCHIVE →
        </button>
      </form>
    </main>
  );
}
