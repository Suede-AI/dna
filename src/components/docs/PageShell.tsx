import Link from 'next/link';
import type { ReactNode } from 'react';

export function PageShell({
  eyebrow,
  title,
  lede,
  meta,
  children,
  backHref = '/',
  backLabel = '← BACK TO THE COMPILATION',
  maxWidth = '800px',
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
  maxWidth?: string;
}) {
  return (
    <main className="mx-auto px-6 py-24" style={{ maxWidth }}>
      <p className="mono-label">{eyebrow}</p>
      <h1
        className="font-[820] text-white mt-4"
        style={{ fontSize: 'var(--text-section)', lineHeight: 1, letterSpacing: 'var(--tracking-tight)' }}
      >
        {title}
      </h1>
      {meta ? <div className="mono-label mt-4">{meta}</div> : null}
      {lede ? (
        <p
          className="mt-6 text-[color:var(--color-bone)] leading-relaxed"
          style={{ fontSize: 'var(--text-body)' }}
        >
          {lede}
        </p>
      ) : null}

      <article className="mt-12 space-y-10 text-[color:var(--color-bone)] leading-relaxed">
        {children}
      </article>

      <Link href={backHref} className="inline-block mt-16 mono-label hover:text-[color:var(--color-signal)]">
        {backLabel}
      </Link>
    </main>
  );
}

export function DocSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mono-label text-[color:var(--color-white)]">{heading}</h2>
      <div className="mt-3 space-y-4">{children}</div>
    </section>
  );
}

export function SuedeLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http');
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="text-white hover:text-[color:var(--color-signal)] underline-offset-4 hover:underline"
    >
      {children}
    </Link>
  );
}
