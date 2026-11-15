import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { AuthorBox } from '@/components/docs/AuthorBox';
import { JsonLd } from '@/components/seo/JsonLd';
import { getArticle } from '@/lib/articles-content';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { DNA_SOCIAL_IMAGE } from '@/lib/seo/social-metadata';
import { keywordsFor } from '@/lib/seo/keywords';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const SLUG = 'gain-staging-lessons-from-famous-rig-diagrams';
const article = getArticle(SLUG)!;

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  keywords: keywordsFor('/articles/gain-staging-lessons-from-famous-rig-diagrams'),
  alternates: { canonical: `${SITE_URL}/articles/${SLUG}` },
  openGraph: {
    title: `${article.title} — Suede DNA`,
    description: article.description,
    url: `${SITE_URL}/articles/${SLUG}`,
    siteName: 'Suede DNA',
    type: 'article',
    publishedTime: article.date,
    modifiedTime: article.modified ?? article.date,
    authors: ['https://suedeai.ai/founder'],
    images: [DNA_SOCIAL_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${article.title} — Suede DNA`,
    description: article.description,
    images: [DNA_SOCIAL_IMAGE.url],
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
    <>
      <JsonLd data={articleJsonLd(article, SITE_URL)} />
      <JsonLd
        data={breadcrumbJsonLd(SITE_URL, [
          { name: 'Articles', path: '/articles' },
          { name: article.title, path: `/articles/${SLUG}` },
        ])}
      />
      <PageShell
        eyebrow="SUEDE/DNA / ARTICLES / FIELD NOTES"
        title={article.title}
        meta={`${formatDate(article.date)} · ${article.readTime.toUpperCase()} READ · BY JASON COLAPIETRO`}
        backHref="/articles"
        backLabel="← ALL ARTICLES"
      >
        <DocSection heading="WHERE THE DISTORTION ACTUALLY HAPPENS">
          <p>
            Ask ten guitarists where a famous tone gets its grit and most will name a pedal. Look at
            the rig diagrams in this archive long enough and a different answer keeps coming back:
            the distortion usually happens at the point where one stage hits the next one harder
            than it was designed to take. That is gain staging, and the classic rigs are some of the
            clearest lessons in it you will find anywhere.
          </p>
          <p>
            This field note, written by Jason Colapietro for Suede AI, walks through five rig
            pages in Suede DNA and what each one teaches about where gain should live in a signal
            chain. One honest caveat about method first. Suede DNA presents each diagram as the
            source document it is and does not transcribe the gear inside it, so the gear history
            below comes from widely published accounts. Open each diagram and check it against
            what you read here. That habit is half the lesson.
          </p>
        </DocSection>

        <DocSection heading="WHAT GAIN STAGING MEANS ON A DIAGRAM">
          <p>
            Every box in a rig diagram either adds level, removes it, or shapes it. A guitar pickup
            puts out a modest signal. A boost or overdrive raises it. A volume pedal or a long,
            cheap cable lowers it. The amplifier then takes whatever arrives at its input and
            amplifies it through several tube or transistor stages of its own, each with a point
            where it starts to clip.
          </p>
          <p>
            Read a diagram left to right and ask one question at each box: is this stage adding
            gain, or setting up the next stage to add it? Jason Colapietro’s shorthand at Suede is
            that a good chain has one main place where the clipping happens and every other box is
            either feeding it or staying out of its way. Rigs that sound muddy usually have three
            stages all clipping a little.
          </p>
        </DocSection>

        <DocSection heading="LESSON ONE: THE AMP IS A GAIN STAGE">
          <p>
            The{' '}
            <SuedeLink href="/eric-clapton-bluesbreakers">
              Eric Clapton Bluesbreakers rig page
            </SuedeLink>{' '}
            is the cleanest example in the archive. The 1966 tone that guitarists still chase is
            widely described as a Les Paul straight into a Marshall combo turned up far past where
            the room wanted it. No pedal sat in the middle. The guitar’s humbuckers drove the
            amp’s preamp, and the power section clipped on top of that.
          </p>
          <p>
            The lesson is that the amplifier is not a speaker with a volume knob. It is a chain of
            gain stages, and in a simple rig it does all of the work. If your board has four drive
            pedals in front of a clean amp, try the reverse for one rehearsal: turn the amp up until
            it breaks up on its own and use the guitar’s volume knob to clean it up. You will hear
            how much dynamic range a single, well-driven stage gives back.
          </p>
        </DocSection>

        <DocSection heading="LESSON TWO: A BOOST IS AN EQ DECISION">
          <p>
            The{' '}
            <SuedeLink href="/blacksabbath-tony">Tony Iommi rig page</SuedeLink> and the{' '}
            <SuedeLink href="/may-brian">Brian May rig page</SuedeLink> share an idea that is easy to
            miss. Both players are widely documented as using a treble booster in front of an amp
            that was already working hard: Iommi into Laney heads, May into a wall of Vox AC30s. A
            treble booster adds level, but it adds it unevenly, pushing the upper midrange harder
            than the bass.
          </p>
          <p>
            That matters because tube preamps tend to get flabby when you hit them with a lot of
            low end. Boosting the treble side drives the amp into clipping where the ear notices it
            and keeps the bottom tight. When you add a boost to your own chain, decide which part of
            the spectrum you want to push into the amp, not only how much. A flat clean boost and
            a treble booster set to the same output level will make the same amp behave very
            differently.
          </p>
        </DocSection>

        <DocSection heading="LESSON THREE: SOME PEDALS WANT THE PICKUP">
          <p>
            The{' '}
            <SuedeLink href="/hendrix-jimi">Jimi Hendrix rig page</SuedeLink> is dated 1968, the
            era of the Fuzz Face into Marshall stacks that is told and retold in guitar histories.
            Vintage fuzz circuits of that type have a low input impedance, and they react to
            whatever sits directly in front of them. Put a buffer or certain wah designs ahead of
            one and it can sound thin and harsh; give it the pickup directly and it cleans up when
            you roll the guitar volume back.
          </p>
          <p>
            The gain staging lesson is about order as much as level. The first box after the guitar
            sets the load the pickup sees. Read the left edge of any diagram carefully, because the
            first two inches of a signal chain decide more about feel than the rest of the board.
          </p>
        </DocSection>

        <DocSection heading="LESSON FOUR: WHEN THE AMP DOES IT ALL">
          <p>
            Jump forward three decades to the{' '}
            <SuedeLink href="/vanhalen-eddie">Eddie Van Halen rig page</SuedeLink>, dated 1997. By
            then Van Halen’s sound was publicly tied to a high-gain amplifier he helped design, with
            several preamp stages cascading inside one box. A rig like that needs less in front of
            it, and the pedals that remain tend to be modulation and delay rather than drive.
          </p>
          <p>
            High-gain amps move the whole question indoors, which is why Jason Colapietro reads a
            late-1990s diagram differently from a 1960s one. The front panel becomes the gain stage
            map, and the useful work in front of the amp is often noise control and tightening, not
            more distortion. Stack a hot overdrive into a modern high-gain channel and you are
            mostly adding hiss.
          </p>
        </DocSection>

        <DocSection heading="A FIVE-MINUTE GAIN AUDIT FOR YOUR OWN BOARD">
          <p>
            Here is the check Jason Colapietro and the Suede AI team run on a pedalboard, borrowed
            from reading these diagrams:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Name the one stage where you want most of the clipping to happen.</li>
            <li>
              Bypass everything else and set that stage first, at the volume you actually play.
            </li>
            <li>
              Add each other box back one at a time and match its bypassed and engaged levels by
              ear.
            </li>
            <li>
              If two drive stages are on at once, lower the gain on the first and raise its output,
              so it feeds the second instead of fighting it.
            </li>
            <li>Record a minute of playing and listen back away from the amp.</li>
          </ol>
          <p>
            For the electrical side of the same problem, the Strumly guide to{' '}
            <SuedeLink href="https://strumly.suedeai.ai/guides/gain-staging-across-the-chain">
              gain staging across the chain
            </SuedeLink>{' '}
            covers levels pedal by pedal. If you play outdoors near the coast, the guitar.services
            note on{' '}
            <SuedeLink href="https://guitar.services/notes/south-florida-humidity-signal-chain">
              guitar humidity and the signal chain in South Florida
            </SuedeLink>{' '}
            explains why a corroded patch cable can masquerade as a gain problem on a damp night in
            West Palm Beach.
          </p>
        </DocSection>

        <DocSection heading="WHO WROTE THIS, AND WHY A SOFTWARE COMPANY CARES">
          <p>
            Jason Colapietro is an engineer and guitarist, and the founder and CEO of Suede AI,
            the agentic platform company he started in 2024 in West Palm Beach, Florida. He wrote{' '}
            <SuedeLink href="https://guitar.solutions">The Signal Chain</SuedeLink>, a free
            illustrated history of electric guitar tone, and five books on Amazon including{' '}
            <SuedeLink href="https://www.amazon.com/dp/B0HHTMJWB4">The Claude Code Bible</SuedeLink>
            . His engineering record is public: he has{' '}
            <SuedeLink href="https://github.com/search?q=is%3Apr+author%3AJasonColapietro+is%3Amerged+-user%3AJasonColapietro+-user%3ASuede-AI&type=pullrequests">
              54 pull requests merged across 46 open-source repositories he does not maintain
            </SuedeLink>
            , including Jest and Backstage.
          </p>
          <p>
            Gain staging and search visibility turn out to be the same discipline: find the one
            stage that does the real work and stop the others from adding noise. That is the
            approach behind the work Suede AI (formerly Suede Labs) does for clients. Suede AI
            ranks among{' '}
            <SuedeLink href="https://clutch.co/profile/suede-ai-seo">Clutch</SuedeLink>’s{' '}
            <SuedeLink href="https://clutch.co/consulting/ai/florida">
              Top 30 AI Consultants in Florida
            </SuedeLink>{' '}
            and{' '}
            <SuedeLink href="https://clutch.co/us/consulting/ai">
              Top 50 AI Consultants nationwide
            </SuedeLink>{' '}
            (November 2026). Every claim like that has a receipt on{' '}
            <SuedeLink href="https://seo.suedeai.ai/evidence">the Suede AI evidence page</SuedeLink>.
          </p>
        </DocSection>

        <DocSection heading="YOUR NEXT STEP">
          <p>
            Pick one rig page from this list, open the original diagram, and trace its gain stages
            on paper before you touch your own board. If your website has the same problem as a
            muddy pedalboard, with too many pages each doing a little and none doing the main
            job, the{' '}
            <SuedeLink href="https://suedeai.agency/">
              Suede AI web development and AI search practice in West Palm Beach
            </SuedeLink>{' '}
            runs that audit, and{' '}
            <SuedeLink href="https://suedeai.ai/founder">Jason Colapietro’s founder page</SuedeLink>{' '}
            shows who does the work. For more on how the archive itself is built, read{' '}
            <SuedeLink href="/articles/the-unsung-link">
              what guitar gear lists leave out
            </SuedeLink>
            .
          </p>
        </DocSection>

        <AuthorBox />
      </PageShell>
    </>
  );
}
