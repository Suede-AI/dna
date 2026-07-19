import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const PATH = '/docs/sourcing-and-verification';

export const metadata: Metadata = {
  title: 'Sourcing and Verification',
  description:
    'Where the rig photos come from, how the manifest is built and validated, and exactly what Suede DNA does and does not verify.',
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: 'Sourcing and Verification — Suede DNA Docs',
    description:
      'Where the rig photos come from, how the manifest is built and validated, and exactly what Suede DNA does and does not verify.',
    url: `${SITE_URL}${PATH}`,
    siteName: 'Suede DNA',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sourcing and Verification — Suede DNA Docs',
    description:
      'Where the rig photos come from, how the manifest is built and validated, and exactly what Suede DNA does and does not verify.',
  },
};

export default function SourcingPage() {
  return (
    <PageShell eyebrow="SUEDE/DNA / DOCS" title="Sourcing and verification." backHref="/docs" backLabel="← ALL DOCS">
      <DocSection heading="THE SOURCE">
        <p>
          Every photograph in Suede DNA originates from{' '}
          <SuedeLink href="https://archive.org/details/guitargeek-archives">
            the guitargeek-archives item
          </SuedeLink>{' '}
          on the Internet Archive, a community-maintained compendium of guitarist rig diagrams
          built up over years, much of it originally surfaced through guitargeek.com and related
          rig-documentation communities. Suede DNA does not photograph rigs, does not commission
          photography, and does not re-host the underlying images on its own infrastructure. Rig
          images are served directly from{' '}
          <code className="mono text-white">archive.org/download/guitargeek-archives/</code>.
        </p>
        <p>
          What Suede DNA adds is a presentation, normalization, and search layer over that
          upstream collection, not a re-publication of new material.
        </p>
      </DocSection>

      <DocSection heading="THE MANIFEST PIPELINE">
        <p>
          The canonical dataset is <code className="mono text-white">data/rigs.json</code>, built
          by a script (<code className="mono text-white">scripts/build-manifest.ts</code>) that
          parses upstream filenames against a known grammar,{' '}
          <code className="mono text-white">artist_guitar_rig_year.ext</code>, and produces a
          flat list of rig records: an id, an artist slug, a year, a source URL, and a file
          format. A companion script (
          <code className="mono text-white">scripts/validate-manifest.ts</code>) checks the
          manifest&apos;s schema and integrity before every build; a broken or malformed manifest
          fails the build rather than shipping.
        </p>
        <p>
          Two small hand-maintained files sit on top of the automated parse:{' '}
          <code className="mono text-white">data/overrides.json</code>, which corrects display
          names where the upstream filename grammar is ambiguous or abbreviated (turning{' '}
          <code className="mono text-white">ac_dc</code> into{' '}
          <code className="mono text-white">AC/DC</code>, for instance), and{' '}
          <code className="mono text-white">data/excluded.json</code>, a short list of items
          intentionally left out, mostly upstream files that returned an error status when
          fetched and could not be resolved to a valid image.
        </p>
      </DocSection>

      <DocSection heading="WHAT GETS VERIFIED, AND WHAT DOESN'T">
        <p>
          It is worth being precise here, because &ldquo;verified&rdquo; can mean very different
          things. The manifest pipeline verifies structure: that a rig record has a valid artist,
          a plausible year, a working source URL, and a consistent id. It does not verify content.
          Suede DNA does not interpret what is inside a rig photo. There is no gear-list
          reconstruction, no signal-chain transcription, no cross-referencing against interviews
          or magazine features. Each rig is presented as the source document it is: one archival
          photo, one year, one artist, and a link back to the upstream file. The compilation is
          the value here, not an editorial interpretation layered on top of it.
        </p>
        <p>
          That also means Suede DNA does not independently fact-check the accuracy of the
          upstream archive itself. If a photo in guitargeek-archives was mislabeled with the wrong
          year or the wrong artist before it reached this site, that error can carry through. The{' '}
          <code className="mono text-white">overrides.json</code> file exists specifically to
          catch and correct cases like that as they are found. It is a living correction log, not
          a guarantee that every record is error-free.
        </p>
      </DocSection>

      <DocSection heading="COVERAGE IS NOT COMPLETE">
        <p>
          The archive documents 409 rigs across 390 artists. That is a meaningful sample of
          guitar history, not an exhaustive one. Many artists have no entry at all; many who do
          have only one or two documented years out of a much longer career. Absence from the
          archive says nothing about an artist&apos;s significance. It only reflects what the
          upstream guitargeek-archives collection happened to document and what has been
          normalized into the manifest so far.
        </p>
      </DocSection>

      <DocSection heading="CORRECTIONS">
        <p>
          If you find a misattributed rig, a wrong year, or a broken image, the fastest path to a
          fix is <SuedeLink href="https://x.com/aisuede">@aisuede on X</SuedeLink> or{' '}
          <SuedeLink href="mailto:info@suedeai.org">info@suedeai.org</SuedeLink>. Corrections are
          applied through <code className="mono text-white">data/overrides.json</code>. The
          underlying image is never edited or re-hosted, only the metadata around it.
        </p>
      </DocSection>
    </PageShell>
  );
}
