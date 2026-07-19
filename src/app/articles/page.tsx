import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/lib/articles-content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Essays on rig history, tone genealogy, and the craft of the signal chain — from the Suede DNA archive.',
  alternates: { canonical: `${SITE_URL}/articles` },
  openGraph: {
    title: 'Articles — Suede DNA',
    description:
      'Essays on rig history, tone genealogy, and the craft of the signal chain — from the Suede DNA archive.',
    url: `${SITE_URL}/articles`,
    siteName: 'Suede DNA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles — Suede DNA',
    description:
      'Essays on rig history, tone genealogy, and the craft of the signal chain — from the Suede DNA archive.',
  },
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function ArticlesIndexPage() {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-24">
      <p className="mono-label">SUEDE/DNA / ARTICLES</p>
      <h1
        className="font-[820] text-white mt-4"
        style={{ fontSize: 'var(--text-section)', lineHeight: 1, letterSpacing: 'var(--tracking-tight)' }}
      >
        Articles.
      </h1>
      <p
        className="mt-6 max-w-[640px] text-[color:var(--color-bone)] leading-relaxed"
        style={{ fontSize: 'var(--text-body)' }}
      >
        Essays on rig history, tone genealogy, and the craft of the signal chain, written from
        inside the archive.
      </p>

      <div className="mt-14 divide-y hairline">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="rig-interactive-card block py-8 first:pt-0"
          >
            <p className="mono-label">
              {formatDate(article.date)} · {article.readTime.toUpperCase()} READ
            </p>
            <h2
              className="mt-2 font-[820] text-white"
              style={{ fontSize: 'clamp(1.4rem, 1rem + 1.4vw, 2rem)' }}
            >
              {article.title}
            </h2>
            <p className="mt-3 text-[color:var(--color-bone)] leading-relaxed max-w-[720px]">
              {article.description}
            </p>
            <span className="rig-arrow mono-label mt-4 inline-block text-[color:var(--color-mute-readable)]">
              READ →
            </span>
          </Link>
        ))}
      </div>

      <Link href="/" className="inline-block mt-16 mono-label hover:text-[color:var(--color-signal)]">
        ← BACK TO THE COMPILATION
      </Link>
    </main>
  );
}
