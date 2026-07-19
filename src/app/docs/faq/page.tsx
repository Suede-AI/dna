import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { getStats } from '@/lib/manifest';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const PATH = '/docs/faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Common questions about coverage, corrections, image rights, and how to reach the archive if something is wrong.',
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: 'FAQ — Suede DNA Docs',
    description:
      'Common questions about coverage, corrections, image rights, and how to reach the archive if something is wrong.',
    url: `${SITE_URL}${PATH}`,
    siteName: 'Suede DNA',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Suede DNA Docs',
    description:
      'Common questions about coverage, corrections, image rights, and how to reach the archive if something is wrong.',
  },
};

const FAQS = [
  {
    q: 'Where do the rig photos come from?',
    a: 'The guitargeek-archives collection on the Internet Archive, a community-maintained compendium of guitarist rig diagrams. Suede DNA does not photograph rigs itself; it normalizes and indexes that upstream archive. Full detail in Sourcing and Verification.',
  },
  {
    q: 'Why isn’t [artist] in the archive?',
    a: 'The archive documents 409 rigs from 390 artists: a sample of guitar history, not an exhaustive one. An artist’s absence reflects what the upstream collection happened to document, not a judgment about their significance.',
  },
  {
    q: 'Why does an artist only have one or two rigs when they had a decades-long career?',
    a: 'Coverage depends entirely on what was documented and preserved upstream. Some artists have a single photographed rig from one tour; others have several spread across years. The DNA chain on an artist page shows exactly what is documented. Nothing is extrapolated to fill gaps.',
  },
  {
    q: 'Does Suede DNA tell me the exact pedals and settings in a photo?',
    a: 'No. The site does not transcribe gear lists or signal chains from the images. Each rig is presented as the photograph, the year, the artist, and a link to the upstream source. Reading the actual gear out of a photo is left to you.',
  },
  {
    q: 'I found a wrong year, wrong artist, or broken image. How do I report it?',
    a: 'Message @aisuede on X or email info@suedeai.org. Corrections are applied through data/overrides.json without altering the underlying image.',
  },
  {
    q: 'Can I use a rig image from the archive?',
    a: 'Images remain the property of their original creators and are surfaced here in the same archival, citation-friendly spirit as the upstream archive.org collection. If you reference a rig elsewhere, credit the guitargeek-archives collection (and the original photographer or documenter where known). See the About page for full attribution language.',
  },
  {
    q: 'Is this an official or authorized source for any artist’s gear history?',
    a: 'No. Suede DNA is an independent compilation project, not affiliated with the artists, their labels, or their gear manufacturers.',
  },
  {
    q: 'How is the archive kept up to date?',
    a: 'The manifest is regenerated from the upstream source with a build script and gated by a schema-validation step before it ships. New rigs enter the archive when they enter the upstream collection and get normalized in a refresh.',
  },
  {
    q: 'Is there an API?',
    a: 'Not currently. The canonical dataset lives in data/rigs.json in the project’s open-source repository on GitHub.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function FaqPage() {
  const stats = getStats();
  return (
    <PageShell eyebrow="SUEDE/DNA / DOCS" title="FAQ." backHref="/docs" backLabel="← ALL DOCS">
      <JsonLd data={faqJsonLd} />
      <DocSection heading={`${stats.totalRigs} RIGS, ${stats.totalArtists} ARTISTS`}>
        <p>
          Quick answers below. For the longer explanations, see{' '}
          <SuedeLink href="/docs/what-is-suede-dna">What Suede DNA Is</SuedeLink> and{' '}
          <SuedeLink href="/docs/sourcing-and-verification">Sourcing and Verification</SuedeLink>.
        </p>
      </DocSection>

      {FAQS.map((item) => (
        <DocSection key={item.q} heading={item.q}>
          <p>{item.a}</p>
        </DocSection>
      ))}
    </PageShell>
  );
}
