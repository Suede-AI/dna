import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { getArticle } from '@/lib/articles-content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const SLUG = 'rig-archaeology-and-the-ear-trained-player';
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
      <DocSection heading="THE PROBLEM WITH LEARNING BY EAR ALONE">
        <p>
          Learning a part by ear is usually taught as a purely auditory skill: listen closely
          enough, repeat it enough times, and the part reveals itself. That is true as far as it
          goes, but it skips a step that experienced players tend to do without noticing: before
          they try to reproduce a phrase, they make a guess about what produced it. A bend that
          seems to come out of nowhere sounds different if you know the player was using a
          whammy bar instead of a finger bend. A part that sounds impossibly clean at speed sounds
          different once you know it was played through a rack system designed specifically to
          keep gain consistent across the neck. Knowing the rig does not replace listening. It
          changes what you are listening for.
        </p>
      </DocSection>

      <DocSection heading="WHAT GEAR KNOWLEDGE ACTUALLY CHANGES">
        <p>
          Three things, mostly. First, it narrows the search space for technique. If you know a
          part was recorded on a guitar with a scalloped fretboard, an unusually deep, hovering
          vibrato stops being a mystery and starts being an expected consequence of the setup, and
          you stop trying to replicate an effect and start replicating a technique, which is a
          more useful thing to practice. Second, it recalibrates expectations about tone before
          you spend an hour chasing a sound your own gear cannot physically produce. A part cut
          through a heavily gained rack system into a 4x12 cabinet is not going to come out of a
          bedroom amp at low volume no matter how precisely you dial in the knobs, and knowing
          that up front saves the hour. Third, and this is the one that matters most for actual
          ear training, it tells you where to stop listening for gear and start listening for the
          player. Two guitarists with an identical rig still sound like two different people. Once
          the hardware stops being the mystery, what is left is technique, timing, and touch,
          which is the part worth learning by ear in the first place.
        </p>
      </DocSection>

      <DocSection heading="WHERE IT BECOMES A TRAP">
        <p>
          The same habit has an obvious failure mode: treating gear research as a substitute for
          practice instead of a shortcut through it. It is possible to spend far more time
          reading about a rig than playing along to the record it produced, and that time does
          not transfer to the fingers. A signal chain diagram tells you the order of the pedals. It
          does not tell you how hard the player picked, where their hand sat relative to the
          bridge, or how they built a phrase across four bars instead of one. Those things only
          come from listening, slowing the recording down, and playing it back until the hands
          catch up with the ears. Rig knowledge is a lens, not a bypass.
        </p>
        <p>
          There is a related trap worth naming directly: assuming identical gear produces
          identical results. Chase the exact scalloped Stratocaster and cranked Marshall from a
          1966 blues record and you will get closer to the tone, and still not sound like the
          guitarist who played it, because tone is downstream of touch as much as it is downstream
          of hardware. The rig narrows the gap. It does not close it.
        </p>
      </DocSection>

      <DocSection heading="A PRACTICAL SEQUENCE">
        <p>
          The useful order, in practice, tends to run the opposite direction from how gear
          curiosity usually unfolds. Most players hear a tone, immediately want to know the gear,
          and only get around to actually learning the part afterward, or never. A more productive
          sequence starts with the part: listen enough times to attempt it cold, form a hypothesis
          about the technique, and only then check the gear to confirm or correct that hypothesis.
          Used this way, an archive like the one on this site functions less like a shopping list
          and more like an answer key: something you consult after you have already tried, to
          check your guess about why a phrase sounds the way it does, not something you consult
          instead of trying.
        </p>
        <p>
          This is also the reason artist pages here are built as a chronology rather than a single
          gear list. A part learned from a 1966 recording and a part learned from a 1975 recording
          by the same guitarist may call for genuinely different technique assumptions, because the
          rig behind each one was different.
        </p>
      </DocSection>

      <DocSection heading="WHY THE YEAR MATTERS AS MUCH AS THE ARTIST">
        <p>
          One habit worth building deliberately: check the year before you check the gear. It is
          tempting to search an archive by artist name alone and assume whatever rig comes up
          applies to the recording you are trying to learn. A guitarist&apos;s setup at the
          start of a career and twenty years later can differ in every meaningful respect, from
          the guitar itself to the amp voicing to the whole relationship between gain and
          headroom. A rig documented three years after the record you are studying can
          send you chasing a tone that has nothing to do with the one on the track. Cross-checking
          the recording date against the documented year, when both are available, is a small step
          that prevents a real and common mistake.
        </p>
      </DocSection>

      <DocSection heading="A NOTE FOR PLAYERS ACTIVELY BUILDING THEIR EAR">
        <p>
          If ear training is the actual goal rather than gear trivia, rig archaeology works best as
          a supplement to structured practice, not a replacement for it: a resource to check
          after the attempt, alongside whatever method you use to build the skill in the first
          place, whether that is a teacher, a method book, or a tool like{' '}
          <SuedeLink href="https://strumly.suedeai.ai">Strumly</SuedeLink> built specifically around
          working through material by ear. The archive can tell you what a player was holding. It
          cannot tell you how they held it. That part is still yours to figure out.
        </p>
      </DocSection>
    </PageShell>
  );
}
