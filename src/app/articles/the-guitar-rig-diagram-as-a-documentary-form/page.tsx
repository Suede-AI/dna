import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { getArticle } from '@/lib/articles-content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const SLUG = 'the-guitar-rig-diagram-as-a-documentary-form';
const article = getArticle(SLUG)!;

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: { canonical: `${SITE_URL}/articles/${SLUG}` },
  openGraph: {
    title: `${article.title} — Suede DNA`,
    description: article.description,
    url: `${SITE_URL}/articles/${SLUG}`,
    siteName: 'Suede DNA',
    type: 'article',
    publishedTime: article.date,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${article.title} — Suede DNA`,
    description: article.description,
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

export default function ArticlePage() {
  return (
    <PageShell
      eyebrow="SUEDE/DNA / ARTICLES"
      title={article.title}
      meta={`${formatDate(article.date)} · ${article.readTime.toUpperCase()} READ`}
      backHref="/articles"
      backLabel="← ALL ARTICLES"
    >
      <DocSection heading="A GENRE WITH NO NAME">
        <p>
          There is no formal name for the rig diagram as a document: the flattened, labeled
          drawing of a pedalboard signal path, or the photograph annotated with amp settings and
          guitar-to-amp order. It sits somewhere between a technical schematic and a fan artifact,
          and it has been produced, informally and without much coordination, by three different
          groups for three different reasons: touring techs who needed setups to be reproducible,
          magazine editors who needed content, and fans who wanted to know how a record actually
          sounded like that. None of those groups set out to build an archive. The archive is what
          happened anyway.
        </p>
      </DocSection>

      <DocSection heading="THE TECH'S VERSION: A PATCH LIST, NOT A STORY">
        <p>
          The oldest and least glamorous form of rig documentation is the patch sheet a guitar
          tech keeps so a rig can be rebuilt identically after a flight case gets thrown around an
          airport for a week. This version has no interest in narrative. It is a list: guitar,
          cable, pedal one, pedal two, amp input, amp settings, in order. Its entire job is
          reproducibility, and it succeeds by being boring. Most of this material never left the
          touring party that produced it. It existed to solve a Tuesday-night problem, not to
          inform anyone. When it does surface publicly, decades later, in an interview or a book,
          it tends to be treated as a small revelation, because for most of the history of
          recorded music this was the only version of the diagram that existed at all.
        </p>
      </DocSection>

      <DocSection heading="THE MAGAZINE'S VERSION: GEAR AS EDITORIAL CONTENT">
        <p>
          Guitar magazines turned rig documentation into a recurring feature decades before video
          made it easy. A writer would visit a tour, ask the guitarist or their tech to walk
          through the board, and publish a gear list alongside the interview, sometimes with a
          hand-drawn signal chain, sometimes just prose description. This is where a lot of gear
          folklore actually originates: the studio anecdote about an amp pushed past its intended
          volume, the pedal a player swears by that nobody else uses, the guitar that shows up in
          every photo from one specific era and then never again. Video eventually did to this
          format what it did to most print journalism. Premier Guitar&apos;s long-running{' '}
          <em>Rig Rundown</em> series is the clearest modern descendant, walking a tech or a
          player through an actual board on camera instead of describing it in a paragraph. The
          underlying instinct did not change: readers and viewers wanted the signal chain, not
          just the anecdote.
        </p>
      </DocSection>

      <DocSection heading="THE FAN'S VERSION: GUITARGEEK.COM AND THE ARCHIVE UNDER THIS SITE">
        <p>
          The material underneath Suede DNA comes from a third lineage: a fan-run website,{' '}
          <SuedeLink href="https://archive.org/details/guitargeek-archives">
            guitargeek.com
          </SuedeLink>
          , that posted rig diagrams from the late 1990s onward, at a moment when doing this took
          real effort. There was no universal video platform to point to. Building a rig diagram
          meant sourcing a photo, cross-referencing gear against magazine features and forum
          threads, and laying it out by hand, one artist at a time, for an audience that would
          find it by searching or browsing rather than having it served up by an algorithm. Nobody
          was paying for this work. It got done because enough people wanted a place where &ldquo;what
          did they actually play through&rdquo; had an answer, and were willing to build that place
          themselves.
        </p>
        <p>
          That collection was eventually preserved on the Internet Archive as{' '}
          <SuedeLink href="https://archive.org/details/guitargeek-archives">
            the guitargeek-archives item
          </SuedeLink>
          , which is the direct upstream source for every rig photograph on this site. Suede DNA
          did not create that material. It is a normalization and search layer over it, described
          in full in <SuedeLink href="/docs/sourcing-and-verification">Sourcing and Verification</SuedeLink>. But it inherits something from the lineage it sits on top of: the
          diagram-as-document tradition was never an official record. It was maintained by people
          who cared enough to keep it, using whatever format made that possible at the time:
          hand-drawn charts, scanned magazine pages, a website built one entry at a time.
        </p>
      </DocSection>

      <DocSection heading="WHY THE FORM PERSISTS">
        <p>
          What ties the tech&apos;s patch list, the magazine feature, and the fan-run website
          together is not format. It is the belief that a signal chain is worth writing down
          because it is not obvious from listening. Two guitarists can describe the same tone in
          completely different vocabulary; a diagram forces the ambiguity out. It says: this
          guitar, into this pedal, into this amp, set here. It is a bad tool for describing feel,
          phrasing, or a player&apos;s touch (those don&apos;t survive translation to a diagram at
          all), but it is close to the best tool available for describing the physical chain
          feel travels through.
        </p>
        <p>
          That is also the limit worth being honest about. A diagram, or a photo of a
          pedalboard, tells you the hardware. It does not tell you how hard someone hit the
          strings, how the room was mic&apos;d, or what got adjusted between takes and never
          written down anywhere. The form has always been partial. It has just been useful enough,
          for long enough, that three separate communities kept producing it without ever agreeing
          on a name for what they were doing.
        </p>
      </DocSection>
    </PageShell>
  );
}
