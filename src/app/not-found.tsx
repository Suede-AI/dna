import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[800px] px-6 py-32 text-center">
      <p className="mono-label">SUEDE/DNA / NOT FOUND</p>
      <h1
        className="mt-6 font-[820] text-white"
        style={{ fontSize: 'var(--text-hero)', lineHeight: 1, letterSpacing: 'var(--tracking-tight)' }}
      >
        404 — NO SIGNAL.
      </h1>
      <p className="mt-8 text-[color:var(--color-bone)]">
        This rig is not in the archive.
      </p>
      <Link href="/" className="inline-block mt-12 mono-label hover:text-[color:var(--color-signal)]">
        ← BACK TO THE COMPILATION
      </Link>
    </main>
  );
}
