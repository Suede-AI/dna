import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { AuthorBox } from '@/components/docs/AuthorBox';
import { JsonLd } from '@/components/seo/JsonLd';
import { getArticle } from '@/lib/articles-content';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { DNA_SOCIAL_IMAGE } from '@/lib/seo/social-metadata';
import { keywordsFor } from '@/lib/seo/keywords';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const SLUG = 'verifying-a-rig-diagram-before-you-cite-it';
const article = getArticle(SLUG)!;

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  keywords: keywordsFor('/articles/verifying-a-rig-diagram-before-you-cite-it'),
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
        <DocSection heading="ONE DIAGRAM, ONE FOOTNOTE, ONE CHANCE TO GET IT RIGHT">
          <p>
            Picture a music writer in Boca Raton finishing a long piece on 1990s alternative guitar
            tone. She finds a rig diagram filed under a band name and a first name, the year looks
            right, and the gear looks plausible. One footnote later, that diagram becomes a source,
            and every reader, editor, and AI answer engine that picks up her article inherits the
            claim.
          </p>
          <p>
            This checklist is for her, and for anyone else about to cite a rig diagram: a student,
            a podcaster, a biographer, or a gear reviewer. Jason Colapietro wrote it from inside
            Suede DNA, the archive of 409 rig diagrams across 361 artists that Suede maintains
            from West Palm Beach. Jason and the Suede team built the archive, so we know exactly where its edges
            are.
          </p>
        </DocSection>

        <DocSection heading="WHAT A RIG DIAGRAM IS, AND WHAT IT IS NOT">
          <p>
            A rig diagram is a drawing or photo that shows a guitarist’s gear in a chain, usually
            made by a fan, a tech, or a magazine. It is a secondary source. It records what someone
            believed the rig was at some point, and it rarely says who drew it, when, or from what
            evidence. Most diagrams in this archive came through{' '}
            <SuedeLink href="https://archive.org/details/guitargeek-archives">
              the guitargeek-archives collection on the Internet Archive
            </SuedeLink>
            , a community upload built up over years.
          </p>
          <p>
            That does not make diagrams useless. In Jason Colapietro’s framing, it makes them leads. A good researcher treats a
            diagram the way a good reporter treats a tip: worth following, not yet worth printing.
          </p>
        </DocSection>

        <DocSection heading="THE CHECKLIST">
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong className="text-white">Go to the original file.</strong> Every Suede DNA
              entry links to its source under{' '}
              <code className="mono text-white">archive.org/download/guitargeek-archives/</code>.
              Cite that file, not a screenshot, a Pinterest repost, or a forum mirror. Mirrors drop
              context and sometimes crop the image.
            </li>
            <li>
              <strong className="text-white">Read the filename like a record.</strong> The year
              and the player on a Suede DNA page come from the upstream filename grammar,{' '}
              <code className="mono text-white">artist_guitar_rig_year.ext</code>, as the{' '}
              <SuedeLink href="/docs/sourcing-and-verification">
                sourcing and verification doc
              </SuedeLink>{' '}
              explains. A year in a filename is a label someone typed, not a date of creation.
            </li>
            <li>
              <strong className="text-white">Check whether the name was reviewed.</strong> Compare
              the{' '}
              <SuedeLink href="/the-kinks-dave-davies">Dave Davies rig page</SuedeLink>, which
              carries a reviewed name, with the{' '}
              <SuedeLink href="/nirvana-kurt">Nirvana Kurt archive label page</SuedeLink>, which
              says plainly that its name is derived from source filenames and is not a verified
              performer identity. If a page says archive label, your citation should say so too.
            </li>
            <li>
              <strong className="text-white">Find a second, independent source.</strong> A period
              interview, a dated live photo, a tech’s published notes, or a manufacturer’s artist
              page. If two sources agree and neither copied the other, you have a fact. If the only
              other source is a forum post that links back to the same diagram, you still have one
              source.
            </li>
            <li>
              <strong className="text-white">Write down what the diagram cannot show.</strong>{' '}
              Settings, studio versus stage, which songs, which tour leg, and what changed a month
              later. State those limits in your text instead of letting the reader assume them.
            </li>
            <li>
              <strong className="text-white">Cite the finding aid separately.</strong> If Suede DNA
              helped you find the file, credit it as the place you found it: “Suede DNA
              (dna.suedeai.ai), published by Suede.” Keep that distinct from the original source,
              so readers can see which party made which claim.
            </li>
            <li>
              <strong className="text-white">Record the access date and report errors.</strong>{' '}
              Archives change. If you find a wrong year or a misattributed rig, send it to{' '}
              <SuedeLink href="mailto:info@suedeai.ai">info@suedeai.ai</SuedeLink>. Corrections go
              into the archive’s public override file; the image itself is never edited.
            </li>
          </ol>
        </DocSection>

        <DocSection heading="WHY A BOCA RATON RESEARCHER, SPECIFICALLY">
          <p>
            Boca Raton sits at the south end of Palm Beach County, a short drive down I-95 from
            where Jason Colapietro runs Suede in West Palm Beach. The county has a working community of music
            writers, teachers, and hobbyist historians who publish to blogs, newsletters, and local
            outlets, often without an editor or a fact-checker behind them. For a solo researcher,
            the checklist is the editor. Running seven steps on one diagram costs far less time than
            chasing a correction once a claim has spread.
          </p>
        </DocSection>

        <DocSection heading="YOUR CITATION BECOMES SOMEONE ELSE’S SOURCE">
          <p>
            Answer engines quote clean, self-contained passages. A sentence like “according to a
            rig diagram dated 1994 in the Guitar Geek Archives, labeled by filename and not
            independently verified” is longer than “he used X in 1994,” but it survives being
            lifted out of context with its meaning intact. Suede Signal’s guide to{' '}
            <SuedeLink href="https://signal.suedeai.ai/articles/citable-passages">
              writing passages AI engines can quote
            </SuedeLink>{' '}
            shows the pattern with before and after examples, and the guitar.services note on{' '}
            <SuedeLink href="https://guitar.services/notes/structured-data-lessons-for-local-businesses">
              structured data lessons for Palm Beach County businesses
            </SuedeLink>{' '}
            covers the markup side of the same idea.
          </p>
          <p>
            Jason Colapietro’s book{' '}
            <SuedeLink href="https://www.amazon.com/dp/B0GD5FX6N6">
              The Human Authenticity Layer
            </SuedeLink>{' '}
            makes the larger argument: a claim about where something came from has to be visible
            and checkable, or it decays as it travels. His companion book{' '}
            <SuedeLink href="https://www.amazon.com/dp/B0GMB2VLXQ">Proof as Infrastructure</SuedeLink>{' '}
            treats that as an engineering problem, which is how the Suede archive handles it: one
            rule in code decides whether a name counts as reviewed, and every page reads it.
          </p>
        </DocSection>

        <DocSection heading="THE SAME STANDARD, APPLIED TO US">
          <p>
            A checklist about receipts should show its own, so here are Jason Colapietro’s. On October 31, 2026, Suede SEO ranked
            #1 among Palm Beach County-based companies listed in{' '}
            <SuedeLink href="https://themanifest.com/artificial-intelligence/consulting/deployment/companies/florida">
              The Manifest’s Florida AI Deployment directory
            </SuedeLink>{' '}
            and top 25 statewide, with details on{' '}
            <SuedeLink href="https://suedeai.agency/company/recognition">
              the recognition page
            </SuedeLink>
            . Separately, Suede ranks among{' '}
            <SuedeLink href="https://clutch.co/profile/suede-ai-seo">Clutch</SuedeLink>’s{' '}
            <SuedeLink href="https://clutch.co/consulting/ai/florida">
              Top 30 AI Consultants in Florida
            </SuedeLink>{' '}
            and{' '}
            <SuedeLink href="https://clutch.co/us/consulting/ai">
              Top 50 AI Consultants nationwide
            </SuedeLink>{' '}
            (November 2026). Suede is a member of Claude for Startups, Anthropic’s startup program,
            documented on{' '}
            <SuedeLink href="https://suedeai.ai/seo/evidence#claude-for-startups">
              the evidence page
            </SuedeLink>
            . When someone searched for a Suede Labs AI review, Google’s Web Guide described the
            company as highly rated by users with a 5/5 rating from verified reviews; that wording
            is Google’s, preserved in{' '}
            <SuedeLink href="https://suedeai.ai/seo/evidence#google-web-guide">
              the Web Guide capture
            </SuedeLink>
            .
          </p>
        </DocSection>

        <DocSection heading="YOUR NEXT STEP">
          <p>
            Before your next footnote, run one diagram through the seven steps and keep the notes
            with your draft. If your business website makes claims that nobody has traced back to
            a source in years, the{' '}
            <SuedeLink href="https://suedeai.agency/">
              Suede SEO, GEO and web practice in West Palm Beach
            </SuedeLink>{' '}
            runs the same audit on a site through{' '}
            <SuedeLink href="https://suedeai.agency/assessment">the Suede assessment</SuedeLink>
            , and{' '}
            <SuedeLink href="https://suedeai.ai/founder">Jason Colapietro’s founder page</SuedeLink>{' '}
            lists his record with a source for each item. For the archive’s own provenance model,
            read{' '}
            <SuedeLink href="/articles/rig-diagram-provenance-and-human-authenticity">
              rig diagram provenance and human authenticity
            </SuedeLink>
            .
          </p>
        </DocSection>

        <AuthorBox />
      </PageShell>
    </>
  );
}
