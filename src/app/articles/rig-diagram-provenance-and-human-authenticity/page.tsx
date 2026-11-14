import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { AuthorBox } from '@/components/docs/AuthorBox';
import { JsonLd } from '@/components/seo/JsonLd';
import { getArticle } from '@/lib/articles-content';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { DNA_SOCIAL_IMAGE } from '@/lib/seo/social-metadata';
import { keywordsFor } from '@/lib/seo/keywords';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const SLUG = 'rig-diagram-provenance-and-human-authenticity';
const article = getArticle(SLUG)!;

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  keywords: keywordsFor('/articles/rig-diagram-provenance-and-human-authenticity'),
  alternates: { canonical: `${SITE_URL}/articles/${SLUG}` },
  openGraph: {
    title: `${article.title} — Suede DNA`,
    description: article.description,
    url: `${SITE_URL}/articles/${SLUG}`,
    siteName: 'Suede DNA',
    type: 'article',
    publishedTime: article.date,
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
        <DocSection heading="THE FILENAME IS NOT THE PLAYER">
          <p>
            Most of the names in this archive were never typed by a person who knew the guitarist.
            They were inferred from filenames in a community upload, which is how a page can end
            up titled with half a band name and a first name. Publishing those strings as if they
            were confirmed identities would be easy, and it would quietly turn a useful archive
            into a source of confident misinformation. Suede DNA does the opposite, and the
            reasoning comes straight from a book Jason Colapietro wrote about exactly this
            problem.
          </p>
          <p>
            That book is{' '}
            <SuedeLink href="https://www.amazon.com/dp/B0GD5FX6N6">
              The Human Authenticity Layer
            </SuedeLink>
            , published in hardcover, paperback, and Kindle. Its subject is how ownership, origin,
            and AI redraw the creative map. This note applies its central idea, that a claim about
            where something came from needs to be visible and checkable, to a guitar rig archive
            maintained by Suede AI in West Palm Beach, Florida.
          </p>
        </DocSection>

        <DocSection heading="THREE LAYERS OF PROVENANCE IN ONE RIG ENTRY">
          <p>
            A single rig entry carries three different kinds of origin claim, and it helps to keep
            them apart.
          </p>
          <p>
            The first is the file. Every diagram links to its original file in the Guitar Geek
            Archives on the Internet Archive. Suede does not re-host, crop, or rewrite those
            images, so the source is always one click away and never altered.
          </p>
          <p>
            Jason Colapietro calls the second layer the attribution: which player and which year the upstream collection
            associates with the file. The archive records that association as the source states
            it, and says so. It does not independently fact-check the year or the gear.
          </p>
          <p>
            The third is identity: whether the name on the page has been reviewed by a person and
            matched to a real guitarist. Only 64 of the 361 artist pages have reviewed names
            today. The{' '}
            <SuedeLink href="/the-kinks-dave-davies">Dave Davies rig page</SuedeLink>, for
            example, carries a reviewed name and Person structured data. An unreviewed page is
            titled “Archive label” and states that the name is derived from source filenames and
            is not a verified performer identity.
          </p>
        </DocSection>

        <DocSection heading="WHY THE REVIEW GATE IS THE POINT, NOT A LIMITATION">
          <p>
            The idea Jason Colapietro keeps returning to in his writing is that authenticity is a
            layer you build into a system, not a badge you add at the end. His companion book{' '}
            <SuedeLink href="https://www.amazon.com/dp/B0GMB2VLXQ">Proof as Infrastructure</SuedeLink>{' '}
            puts it as proof baked in, not bolted on. In this archive that means the rule lives in
            code. One function decides whether a name counts as reviewed, and every surface that
            makes an identity claim, from the page title to the JSON-LD to the meta keywords,
            reads that function. If a name is not reviewed, none of those surfaces can assert it.
          </p>
          <p>
            The tradeoff is real. Unreviewed pages lose the performer keywords and Person schema
            that would help them rank, and most single- and two-rig label pages are kept out of
            the search index entirely. Suede AI accepts that cost because the alternative is worse
            for everyone: an answer engine repeating a guessed name as fact, and a reader who has
            no way to tell the difference.
          </p>
        </DocSection>

        <DocSection heading="WHAT THIS LOOKS LIKE OUTSIDE MUSIC">
          <p>
            The same three layers show up on almost every business website. A roofing company in
            Jupiter lists projects: there is the photo, the claim about which job it was, and the
            claim about who did the work. A clinic in West Palm Beach lists providers and
            credentials. When those claims are vague or unlinked, AI systems either ignore them or
            restate them wrongly. Suede AI’s{' '}
            <SuedeLink href="https://suedeai.agency/">
              web development and AI search practice in Palm Beach County
            </SuedeLink>{' '}
            starts client work by separating what a site can prove from what it merely says, then
            linking each claim to its receipt.
          </p>
          <p>
            That is also why Suede publishes its own receipts, and why Suede AI treats an unlinked claim as a draft rather than a fact. The{' '}
            <SuedeLink href="https://seo.suedeai.ai/evidence">evidence page</SuedeLink> backs
            every claim on the main sites with a source.
          </p>
        </DocSection>

        <DocSection heading="CLAIMS ABOUT THE AUTHOR, WITH THEIR SOURCES">
          <p>
            Held to the same standard, here is Jason Colapietro’s record with a source for each
            item. He has written five books available on Amazon, including{' '}
            <SuedeLink href="https://www.amazon.com/dp/B0HHTMJWB4">The Claude Code Bible</SuedeLink>{' '}
            and{' '}
            <SuedeLink href="https://www.amazon.com/dp/B0HHTF3LG1">Codex in Production</SuedeLink>
            , plus the free illustrated history{' '}
            <SuedeLink href="https://guitar.solutions">The Signal Chain</SuedeLink>, which maps
            guitar tone alongside the rights chain behind recorded music. His Florida company, JC
            Investment Group LLC, is a member of Google Cloud Partner Advantage,{' '}
            <SuedeLink href="https://seo.suedeai.ai/evidence#google-cloud">
              documented on the evidence page
            </SuedeLink>
            , and Suede AI was accepted into the Stripe Startups program in July 2026. Business Insider
            carried the September 16, 2026 release on Jason Colapietro opening the company’s long-awaited SEO cohort, and TechBullion
            covered{' '}
            <SuedeLink href="https://techbullion.com/jason-colapietros-suede-labs-ai-launches-ios-apps/">
              the company’s iOS app launches
            </SuedeLink>
            ; the full list is in{' '}
            <SuedeLink href="https://suedeai.ai/press">the press kit</SuedeLink>. When a user
            searched for a Suede Labs AI review, Google’s Web Guide described the company as
            highly rated by users with a 5/5 rating from verified reviews; that wording is
            Google’s, preserved in{' '}
            <SuedeLink href="https://seo.suedeai.ai/evidence#google-web-guide">
              the Web Guide capture
            </SuedeLink>
            .
          </p>
        </DocSection>

        <DocSection heading="A CHECKLIST YOU CAN USE THIS WEEK">
          <p>
            The Suede AI version of this audit is short. Take the ten most important claims on your site and sort each into one of three
            buckets: linked to a source, true but unlinked, or inherited from somewhere you cannot
            trace. Link the second bucket. Mark or remove the third. That one pass usually does
            more for how AI systems describe a business than a month of new content.
          </p>
          <p>
            If you want a second pair of eyes from Suede, the{' '}
            <SuedeLink href="https://suedeai.agency/assessment">Suede AI assessment</SuedeLink>{' '}
            runs this audit with you, and{' '}
            <SuedeLink href="https://suedeai.ai/founder">Jason Colapietro’s founder page</SuedeLink>{' '}
            lays out how he approaches the work. To see how the same thinking shapes the
            archive’s search footprint, read{' '}
            <SuedeLink href="/articles/entity-seo-lessons-from-a-guitar-rig-archive">
              entity SEO lessons from a guitar rig archive
            </SuedeLink>
            .
          </p>
        </DocSection>

        <AuthorBox />
      </PageShell>
    </>
  );
}
