import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllRigs,
  getArtistBySlug,
  getRigById,
  getRigsByArtistSlug,
} from '@/lib/manifest';
import { JsonLd } from '@/components/seo/JsonLd';
import { rigJsonLd } from '@/lib/seo';
import { RigDetailCard } from '@/components/artist/RigDetailCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';

export function generateStaticParams() {
  return getAllRigs().map((r) => ({ 'rig-id': r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ 'rig-id': string }>;
}): Promise<Metadata> {
  const { 'rig-id': id } = await params;
  const rig = getRigById(id);
  if (!rig) return {};
  const artist = getArtistBySlug(rig.artistSlug);
  if (!artist) return {};

  const title = `${rig.artistName} — ${rig.year} Rig`;
  const description = `${rig.artistName} guitar rig from ${rig.year}. Photo sourced from the Guitar Geek archives, part of the Suede DNA compilation.`;

  return {
    title,
    description,
    alternates: { canonical: `/rigs/${id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/rigs/${id}`,
      type: 'article',
      siteName: 'Suede DNA',
      images: [{ url: rig.src }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [rig.src],
    },
  };
}

export default async function RigPage({
  params,
}: {
  params: Promise<{ 'rig-id': string }>;
}) {
  const { 'rig-id': id } = await params;
  const rig = getRigById(id);
  if (!rig) notFound();
  const artist = getArtistBySlug(rig.artistSlug);
  if (!artist) notFound();

  const siblings = getRigsByArtistSlug(rig.artistSlug);
  const i = siblings.findIndex((r) => r.id === rig.id);
  const prev = i > 0 ? siblings[i - 1] : undefined;
  const next = i < siblings.length - 1 ? siblings[i + 1] : undefined;

  return (
    <main>
      <JsonLd data={rigJsonLd(rig, artist, SITE_URL)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Suede DNA', item: SITE_URL },
            {
              '@type': 'ListItem',
              position: 2,
              name: artist.name,
              item: `${SITE_URL}/${artist.slug}`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: `${rig.year} Rig`,
              item: `${SITE_URL}/rigs/${rig.id}`,
            },
          ],
        }}
      />
      <section aria-labelledby="rig-page-heading" className="border-b hairline">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <nav aria-label="Breadcrumb" className="mono-label mb-6">
            <Link href="/" className="hover:text-[color:var(--color-signal)]">
              SUEDE/DNA
            </Link>
            <span className="mx-2 text-[color:var(--color-mute)]">/</span>
            <Link
              href={`/${artist.slug}`}
              className="hover:text-[color:var(--color-signal)]"
            >
              {artist.name.toUpperCase()}
            </Link>
            <span className="mx-2 text-[color:var(--color-mute)]">/</span>
            <span className="text-white">{rig.year}</span>
          </nav>
          <h1
            id="rig-page-heading"
            className="font-[820] text-white"
            style={{
              fontSize: 'var(--text-hero)',
              lineHeight: 0.95,
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            {artist.name} <span className="text-[color:var(--color-signal)]">/</span> {rig.year}
          </h1>
          <p className="mt-6 mono-data text-[color:var(--color-bone)]">
            ONE RIG · DOCUMENTED {rig.year} · SOURCE: GUITAR GEEK
          </p>
        </div>
      </section>
      <RigDetailCard rig={rig} index={i} prev={prev} next={next} />
      <section
        aria-labelledby="rig-related-heading"
        className="border-t hairline"
      >
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <h2
            id="rig-related-heading"
            className="mono-label text-[color:var(--color-bone)]"
          >
            ALSO BY {artist.name.toUpperCase()}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3 mono-label">
            <li>
              <Link
                href={`/${artist.slug}`}
                className="hairline border px-4 py-3 inline-block hover:text-[color:var(--color-signal)]"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                ALL {artist.count} RIG{artist.count === 1 ? '' : 'S'} →
              </Link>
            </li>
            {siblings
              .filter((r) => r.id !== rig.id)
              .map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/rigs/${r.id}`}
                    className="hairline border px-4 py-3 inline-block hover:text-[color:var(--color-signal)]"
                    style={{ borderRadius: 'var(--radius-card)' }}
                  >
                    {r.year}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
