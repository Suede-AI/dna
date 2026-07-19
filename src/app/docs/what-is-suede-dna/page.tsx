import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { getStats } from '@/lib/manifest';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const PATH = '/docs/what-is-suede-dna';

export const metadata: Metadata = {
  title: 'What Suede DNA Is',
  description:
    'The premise behind the archive: why a guitarist’s rigs form a signal chain across time, and how the site is structured around that idea.',
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: 'What Suede DNA Is — Suede DNA Docs',
    description:
      'The premise behind the archive: why a guitarist’s rigs form a signal chain across time, and how the site is structured around that idea.',
    url: `${SITE_URL}${PATH}`,
    siteName: 'Suede DNA',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Suede DNA Is — Suede DNA Docs',
    description:
      'The premise behind the archive: why a guitarist’s rigs form a signal chain across time, and how the site is structured around that idea.',
  },
};

export default function WhatIsSuedeDnaPage() {
  const stats = getStats();
  return (
    <PageShell eyebrow="SUEDE/DNA / DOCS" title="What Suede DNA is." backHref="/docs" backLabel="← ALL DOCS">
      <DocSection heading="THE PREMISE">
        <p>
          Suede DNA is a compilation archive of guitarists&apos; rigs. Right now it holds{' '}
          {stats.totalRigs} documented setups across {stats.totalArtists} artists, spanning{' '}
          {stats.yearMin}–{stats.yearMax}. Each entry is a photograph of a rig: the guitar, the
          amp, the pedals, sometimes a rack, tied to an artist and a year.
        </p>
        <p>
          The idea underneath the site is simple: a guitarist&apos;s tone is not one fixed thing. It
          changes as they change instruments, amps, and effects, sometimes within the same tour.
          Line up every documented rig for one artist in chronological order and you get
          something closer to a genealogy than a single snapshot: a signal chain stretched
          across a career instead of frozen at one moment.
        </p>
      </DocSection>

      <DocSection heading="TWO VIEWS">
        <p>
          The site is built around two ways of looking at that idea.
        </p>
        <p>
          The <strong className="text-white">compilation grid</strong> on the home page is the
          discovery view: every rig in the archive, grouped by artist, sortable and filterable by
          decade and year. It is meant for browsing: scroll, search, or jump straight to a
          letter with the A–Z rail.
        </p>
        <p>
          Each <strong className="text-white">artist page</strong> is the genealogy view. Rigs for
          that artist are laid out on a horizontal timeline (the &ldquo;DNA chain&rdquo;) joined by a
          single strand, in year order, with a specimen card underneath each one. If an artist has
          three documented rigs across a decade, the artist page is the closest thing on the site
          to watching their tone evolve.
        </p>
      </DocSection>

      <DocSection heading="WHAT IT IS NOT">
        <p>
          Suede DNA is not a gear-list encyclopedia, and it does not claim to catalog every piece
          of equipment an artist ever used. It is not an editorial publication with staff writers
          reporting on rigs firsthand. It does not transcribe signal chains from the photographs;
          see{' '}
          <SuedeLink href="/docs/sourcing-and-verification">Sourcing and Verification</SuedeLink> for
          exactly what the archive does and does not verify. And it is not a retail or
          affiliate-driven gear site. There is nothing to buy here, only the record.
        </p>
        <p>
          What it is: a fast, searchable, citation-friendly index over a much older community
          archive, presented in a way that makes the &ldquo;career as signal chain&rdquo; framing
          visible at a glance.
        </p>
      </DocSection>

      <DocSection heading="WHO IT IS FOR">
        <p>
          Musicians researching a specific era of an artist&apos;s tone. Students of gear history
          looking for a starting point before going deeper. Anyone who has ever looked at a live
          photo and wondered what that pedal on the floor actually was. The archive does not
          answer every question (often it only gives you the photo and the year), but it is
          built so that question is easy to ask.
        </p>
      </DocSection>
    </PageShell>
  );
}
