import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { getArticle } from '@/lib/articles-content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const SLUG = 'building-a-tone-over-a-career';
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
      <DocSection heading="THREE YEARS, THREE BANDS">
        <p>
          The archive holds three documented rigs for Eric Clapton, filed under three different
          band names because that is how the source material labeled them:{' '}
          <SuedeLink href="/eric-clapton-the-yardbirds">the Yardbirds, 1964</SuedeLink>,{' '}
          <SuedeLink href="/eric-clapton-bluesbreakers">John Mayall&apos;s Bluesbreakers, 1966</SuedeLink>,
          and <SuedeLink href="/eric-clapton-cream">Cream, 1967</SuedeLink>. Three years, three
          rigs, one guitarist. It is a small sample by any standard: a handful of documented
          setups out of a career that has run more than six decades. But it happens to fall
          across exactly the stretch where Clapton&apos;s reputation as a guitarist was built,
          which makes it a useful case study in how a signal chain accumulates a personality over
          time rather than arriving with one.
        </p>
      </DocSection>

      <DocSection heading="1964: THE PURIST">
        <p>
          Clapton joined the Yardbirds in 1963 as a teenager with a reputation for strict blues
          orthodoxy. By most accounts of the period, he was the member most resistant to the
          band drifting toward pop material. His rig in this era was comparatively plain: a Fender
          guitar and a modest amp setup, the kind of gear a working blues band could afford and
          haul between London clubs. There is no pedalboard to speak of, because the vocabulary of
          the pedalboard did not really exist yet for a player like him. Tone came from fingers,
          a guitar, and an amplifier pushed to its own natural breakup. Nothing sat between the
          two.
        </p>
        <p>
          It is worth pausing on how little that setup asks of anyone trying to understand it. One
          guitar, one amp, no chain to trace. The interesting part of 1964 Clapton is not the gear;
          it is the restraint. He left the Yardbirds in 1965, reportedly over the direction of
          &ldquo;For Your Love,&rdquo; a decision that reads, in hindsight, like an early
          declaration about what kind of guitarist he intended to be.
        </p>
      </DocSection>

      <DocSection heading="1966: THE SOUND THAT DEFINED A GENRE">
        <p>
          The Bluesbreakers rig is the one most guitarists actually know by ear before they know
          it by name. This is the era of the John Mayall album that fans nicknamed &ldquo;Beano&rdquo;
          after the comic Clapton is reading on the cover, and it produced a guitar tone that
          effectively set the template for British blues-rock: a Gibson Les Paul into a cranked
          Marshall combo, pushed loud enough in the studio that the story, repeated often enough
          in guitar circles to have become its own piece of folklore, has an engineer objecting
          and Clapton and Mayall keeping the take anyway. Whether every detail of that story is
          precise or slightly burnished by fifty years of retelling, the tone itself is not in
          dispute. It is on the record.
        </p>
        <p>
          What changed between 1964 and 1966 was not a new pedal or a clever trick. It was volume
          and a different amplifier doing something a smaller, cleaner rig could not: a natural,
          touch-sensitive overdrive that responded to how hard Clapton hit the strings. That single
          shift, the same basic building blocks pushed harder, is arguably more influential on
          decades of guitarists who followed than anything that came later in his career, pedals
          included.
        </p>
      </DocSection>

      <DocSection heading="1967: LOUDER ROOMS, A NEW GUITAR, A WAH">
        <p>
          By the time the archive&apos;s Cream entry picks up in 1967, the context has changed
          again. Cream was a power trio built to fill much bigger rooms than the Bluesbreakers ever
          played, and Clapton&apos;s rig grew to match: Marshall stacks scaled for arena volume
          instead of club volume and, most visibly, a different guitar. The Gibson SG associated
          with this period, famously repainted in psychedelic swirls by the Dutch design
          collective The Fool and known ever since by that name, is one of the most photographed
          guitars in rock history, a visual signal of just how far the aesthetic had drifted from
          a plain-finish Telecaster in a blues club three years earlier.
        </p>
        <p>
          A wah pedal enters the picture around this era too, most audibly on tracks like
          &ldquo;Tales of Brave Ulysses.&rdquo; It is a small addition next to a new guitar and a
          bigger amp stack, but it marks something: the beginning of the pedalboard as part of the
          story, not an afterthought to it. The purist who resisted &ldquo;For Your Love&rdquo;
          three years earlier was now playing psychedelic rock through a wah pedal in an
          arena-scale power trio. Nothing about that is a contradiction. It is what three years of
          a working musician&apos;s life actually looks like when you track the gear instead of the
          reputation.
        </p>
      </DocSection>

      <DocSection heading="WHAT THE SEQUENCE SHOWS">
        <p>
          Looked at individually, each of these three rigs is a snapshot: a guitar, an amp, a year.
          Looked at in sequence, which is exactly what the{' '}
          <SuedeLink href="/eric-clapton-cream">DNA chain on an artist page</SuedeLink> is built to
          do, they read as a chronology. Plainer gear and stricter genre commitments give way to
          louder rooms, a different guitar, and the first pedal in the chain. None of that is a
          single decision. It is accretion: one band, one room size, one new opportunity at a
          time. And that accretion is closer to what &ldquo;a guitarist&apos;s tone&rdquo; usually
          means than any single rig photo could be on its own.
        </p>
        <p>
          It is also a useful reminder about the limits of the archive itself. Suede DNA documents
          three specific years for Clapton because three specific years are what upstream
          photography preserved, not because his tone stood still in between. The chain shows what
          was recorded, not everything that happened. For more on exactly what the archive does
          and does not claim to verify, see{' '}
          <SuedeLink href="/docs/sourcing-and-verification">Sourcing and Verification</SuedeLink>.
        </p>
      </DocSection>
    </PageShell>
  );
}
