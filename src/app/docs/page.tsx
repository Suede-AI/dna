import type { Metadata } from 'next';
import Link from 'next/link';
import { DOCS } from '@/lib/docs-content';
import { IndexCard } from '@/components/docs/IndexCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';

export const metadata: Metadata = {
  title: 'Docs',
  description:
    'How Suede DNA is built: sourcing, the manifest pipeline, search syntax, and answers to common questions about the archive.',
  alternates: { canonical: `${SITE_URL}/docs` },
  openGraph: {
    title: 'Docs — Suede DNA',
    description:
      'How Suede DNA is built: sourcing, the manifest pipeline, search syntax, and answers to common questions about the archive.',
    url: `${SITE_URL}/docs`,
    siteName: 'Suede DNA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docs — Suede DNA',
    description:
      'How Suede DNA is built: sourcing, the manifest pipeline, search syntax, and answers to common questions about the archive.',
  },
};

export default function DocsIndexPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-24">
      <p className="mono-label">SUEDE/DNA / DOCS</p>
      <h1
        className="font-[820] text-white mt-4"
        style={{ fontSize: 'var(--text-section)', lineHeight: 1, letterSpacing: 'var(--tracking-tight)' }}
      >
        Documentation.
      </h1>
      <p
        className="mt-6 max-w-[640px] text-[color:var(--color-bone)] leading-relaxed"
        style={{ fontSize: 'var(--text-body)' }}
      >
        Reference material on how the archive is built, sourced, and searched. For the short
        version, see the{' '}
        <Link href="/about" className="text-white hover:text-[color:var(--color-signal)] underline-offset-4 hover:underline">
          about page
        </Link>
        . For the long version, start here.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {DOCS.map((doc) => (
          <IndexCard
            key={doc.slug}
            href={`/docs/${doc.slug}`}
            eyebrow="DOC"
            title={doc.title}
            description={doc.description}
          />
        ))}
      </div>

      <Link href="/" className="inline-block mt-16 mono-label hover:text-[color:var(--color-signal)]">
        ← BACK TO THE COMPILATION
      </Link>
    </main>
  );
}
