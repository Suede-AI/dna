import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { getArticle } from '@/lib/articles-content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const SLUG = 'shred-signal-and-the-virtuoso-rig';
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
      <DocSection heading="A RIG BUILT FOR ONE JOB">
        <p>
          Somewhere in the mid-1980s, a certain kind of guitar rig stopped being a general-purpose
          tool and started being built for one job: making extremely difficult things easy to play
          live, night after night, at volume. Call it the virtuoso rig. It shows up across a run
          of players documented in this archive: Yngwie Malmsteen, Steve Vai, Joe Satriani, Zakk
          Wylde, who otherwise have little in common stylistically, but whose gear, looked at
          side by side, is solving the same handful of problems: sustain without mush, gain
          without losing note definition, and a level of physical reliability that a touring
          rig from a decade earlier was never asked to provide.
        </p>
      </DocSection>

      <DocSection heading="THE NECK AS PART OF THE SIGNAL CHAIN">
        <p>
          Malmsteen&apos;s <SuedeLink href="/malmsteen-yngwie">1988 rig</SuedeLink> and his{' '}
          <SuedeLink href="/yngwie-malmsteen">2008 rig</SuedeLink> are two decades apart and built
          around the same core idea: a Fender Stratocaster with a scalloped fretboard, played
          through a Marshall stack pushed hard enough to sustain a note indefinitely. The
          scalloped neck is worth pausing on, because it is not really an effect in the pedal
          sense. It is a piece of physical modification to the instrument that exists purely to
          serve a playing style built on speed and vibrato depth, letting the fingertips push
          past the fretboard surface instead of stopping at it. It is a reminder that the
          &ldquo;signal chain&rdquo; framing this whole archive is built around does not start at
          the guitar&apos;s output jack. For a player like Malmsteen, it starts at the neck.
        </p>
      </DocSection>

      <DocSection heading="THE RACK YEARS">
        <p>
          Steve Vai and Joe Satriani both came up through session and sideman work. Vai
          transcribed and performed famously difficult material for Frank Zappa before going
          solo, and both built rigs in the late 1980s and 1990s around rack-mounted effects and
          MIDI switching rather than a pedalboard on the floor. The instinct is practical: a rack
          system lets a player recall a complex combination of gain, delay, and modulation
          settings with a single footswitch press instead of stomping four pedals in sequence
          mid-solo. <SuedeLink href="/vai-steve">Vai&apos;s 1999 rig</SuedeLink> and{' '}
          <SuedeLink href="/steve-vai">2007 rig</SuedeLink>, alongside{' '}
          <SuedeLink href="/satriani-joe">Satriani&apos;s 2000 setup</SuedeLink>, all sit in this
          rack-and-signature-guitar tradition: Vai&apos;s Ibanez JEM, built to his own
          specifications down to the handle cut into the body, and Satriani&apos;s equally
          personalized Ibanez JS line. Neither rig reads as minimal. Both read as engineered: built
          by players who knew exactly which sound they needed at which moment of a solo and
          designed the hardware backward from that requirement.
        </p>
      </DocSection>

      <DocSection heading="THE OTHER KIND OF VIRTUOSO">
        <p>
          Not every rig in this era chased speed. Tom Morello&apos;s{' '}
          <SuedeLink href="/ratm-tom-morello">1998</SuedeLink> and{' '}
          <SuedeLink href="/audioslave-tom-morello">2004</SuedeLink> rigs belong to the same period
          and the same broad instinct: engineer the hardware around a specific technical
          requirement. But the requirement was texture, not velocity. Morello built a career on
          making a guitar sound like a turntable and a DJ rig: a DigiTech Whammy pedal for
          pitch-shift dive effects, a toggle switch wired to kill the signal for stutter and
          scratch effects, and a playing approach that treated the guitar as a sound-design tool
          first and a melodic instrument second. It is worth including next to Malmsteen, Vai, and
          Satriani precisely because it proves the era was not defined by any one technique. It
          was defined by a shared willingness to over-engineer a rig in service of a very specific,
          very personal sound.
        </p>
      </DocSection>

      <DocSection heading="THE TRADITIONALISTS, SAME DECADE">
        <p>
          Not every player working in this window bought into rack systems or scalloped necks at
          all. Zakk Wylde&apos;s <SuedeLink href="/wylde-zakk">2000</SuedeLink> and{' '}
          <SuedeLink href="/ozzy-zakk-wylde">2011</SuedeLink> rigs are built around a Gibson Les
          Paul, the black-and-white &ldquo;Bullseye&rdquo; finish that became as much a visual
          signature as a tonal one, into a straightforward, heavily overdriven Marshall stack,
          closer in spirit to the Clapton-era approach of guitar-into-loud-amp than to Vai&apos;s
          racks. <SuedeLink href="/jeff-beck">Jeff Beck&apos;s 2003 rig</SuedeLink> and{' '}
          <SuedeLink href="/joe-bonamassa">Joe Bonamassa&apos;s 2010 rig</SuedeLink> sit even
          further toward that traditionalist end: vintage-style guitars into vintage-voiced amps,
          virtuosity expressed through touch and phrasing rather than hardware complexity. Put next
          to Vai&apos;s rack, Wylde&apos;s and Bonamassa&apos;s rigs make the same point from the
          opposite direction: the engineering-heavy virtuoso rig was a choice this era made
          available, not a requirement it imposed.
        </p>
      </DocSection>

      <DocSection heading="WHAT THE ERA LEFT BEHIND">
        <p>
          The most durable legacy of this stretch of gear history is not any specific pedal or
          amp. It is the idea that a rig could be designed, not just assembled, that the distance
          between a player&apos;s intention and their live sound was an engineering problem worth
          solving with a scalloped neck, a MIDI rack, a kill switch, or nothing more than a Les
          Paul and a loud amp, depending on what the player was actually trying to do. That
          plurality of approach, all coexisting in the same fifteen-year stretch, is easier to see
          lined up side by side in an archive than it ever was one artist at a time.
        </p>
      </DocSection>
    </PageShell>
  );
}
