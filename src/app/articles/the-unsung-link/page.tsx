import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { getArticle } from '@/lib/articles-content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const SLUG = 'the-unsung-link';
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
      <DocSection heading="THE PART OF THE CHAIN NOBODY PHOTOGRAPHS">
        <p>
          Ask what gear made a tone, and the answer is almost always a guitar and an amp, maybe a
          named pedal if one was doing something distinctive. That answer is not wrong. It is
          incomplete in a specific and predictable way: it lists the parts of the signal chain
          that are easy to see in a photo and easy to name in an interview, and it skips almost
          everything that sits between them. A pedalboard photograph shows the pedals. It rarely
          shows the power supply feeding them, the condition of the patch cables, or the order the
          tech actually wired things in versus the order they are laid out on the board for looks.
          None of that is a secret exactly. It is just the part of the chain nobody thinks to
          photograph.
        </p>
      </DocSection>

      <DocSection heading="POWER, NOT JUST SIGNAL">
        <p>
          A 9V supply feeding a board full of pedals is one of the least interesting-looking
          objects in a signal chain and one of the most consequential. Daisy-chaining several
          high-gain pedals off a single unfiltered supply is a well-known way to introduce hum and
          noise that has nothing to do with the pedals themselves. The fix is isolated power, not
          a different pedal, and plenty of players have spent money chasing a &ldquo;bad&rdquo;
          pedal that was actually a power problem. It is a useful reminder that a signal chain
          diagram, which typically shows boxes connected by lines representing audio signal, is
          quietly missing an entire second chain running underneath it: the power chain, which
          affects the sound just as much and gets none of the attention.
        </p>
      </DocSection>

      <DocSection heading="CABLES AS A TONE CONTROL NOBODY ADMITS TO">
        <p>
          A guitar cable is not a neutral wire. Longer cables and cheaper cables carry more
          capacitance, which rolls off high frequencies before the signal even reaches the first
          pedal. It is a real, measurable effect, and also one of the most argued-about topics in
          guitar forums precisely because it is subtle enough to be genuinely debatable in a way a
          distortion pedal is not. Most gear lists do not mention cable length or brand at all,
          which means one real variable in the final tone is almost never recorded anywhere, on
          this site or any other rig-documentation source. It is a small, honest gap worth naming
          rather than pretending a diagram is more complete than it is.
        </p>
      </DocSection>

      <DocSection heading="WHEN ISOLATED POWER BECAME STANDARD">
        <p>
          For most of the electric guitar&apos;s history, powering a pedalboard meant a pile of
          individual 9V batteries or a single daisy-chained adapter, and both had obvious
          downsides: batteries die mid-set, and a shared unfiltered supply lets noise from one
          pedal bleed into every other pedal on the chain. The fix, an isolated multi-output power
          supply giving each pedal its own clean, separated feed, did not become a standard part
          of a serious touring rig until relatively late in the pedalboard&apos;s history, once
          boards grew crowded enough with high-gain and digital pedals that the noise problem
          became impossible to ignore. It is a genuinely unglamorous piece of gear history: no
          player has ever been asked in an interview what power supply they used, and yet the
          answer quietly determines whether a big, ambitious pedalboard is usable on a stage at
          all or plagued with a hum loud enough to hear between songs.
        </p>
      </DocSection>

      <DocSection heading="THE ROOM AND THE MICROPHONE">
        <p>
          For a recorded tone specifically, as opposed to a live one, the guitar and amp are
          arguably not even the last two links in the chain. Microphone choice and placement come
          after them, and change the result more than most gear lists acknowledge. The same
          amplifier, mic&apos;d an inch off the speaker cone versus a foot back in the room, or
          aimed dead center on the dust cap versus off toward the cone&apos;s edge, produces
          audibly different recordings without a single setting on the amp changing. This is
          common knowledge among recording engineers and almost never appears in a rig diagram,
          because a rig diagram is drawn from the player&apos;s side of the signal chain and a
          microphone belongs to the room, not the rig. It is one more reason a photograph of a
          pedalboard, however well documented, is describing half a signal chain at most for
          anything that made it onto a record.
        </p>
      </DocSection>

      <DocSection heading="WHY THIS MATTERS FOR AN ARCHIVE, NOT JUST A SESSION">
        <p>
          None of this is an argument against documenting rigs. It is the opposite: an
          argument for being precise about what a rig photo actually documents. A photograph shows
          the guitar, the pedals, and usually the amp. It does not show the power supply
          underneath the board, the cable running to the input jack, or the microphone that
          captured whatever came out of the speaker. Every rig entry in this archive is exactly
          that: real, useful, and partial. The same honesty applies to the tech-built patch sheets
          and fan-run diagrams discussed in{' '}
          <SuedeLink href="/articles/the-guitar-rig-diagram-as-a-documentary-form">
            the history of the rig diagram as a form
          </SuedeLink>
          . Every version of this documentation tradition has recorded the visible chain and left
          the invisible one to inference. Treating a rig photo as the complete explanation for a
          tone is a small, common mistake. Treating it as a partial, honest record of what was
          actually there (guitar, pedals, amp, and a great deal left unphotographed) is the more
          useful way to read one.
        </p>
      </DocSection>
    </PageShell>
  );
}
