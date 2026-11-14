import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { AuthorBox } from '@/components/docs/AuthorBox';
import { JsonLd } from '@/components/seo/JsonLd';
import { getArticle } from '@/lib/articles-content';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { DNA_SOCIAL_IMAGE } from '@/lib/seo/social-metadata';
import { keywordsFor } from '@/lib/seo/keywords';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const SLUG = 'rig-archive-structured-data-for-ai-answers';
const article = getArticle(SLUG)!;

const MERGED_PRS =
  'https://github.com/search?q=is%3Apr+author%3AJasonColapietro+is%3Amerged+-user%3AJasonColapietro+-user%3ASuede-AI&type=pullrequests';

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  keywords: keywordsFor('/articles/rig-archive-structured-data-for-ai-answers'),
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
        <DocSection heading="A RIG DIAGRAM IS A PHOTO UNTIL YOU GIVE IT FIELDS">
          <p>
            Ask an answer engine what Tony Iommi played through in 1971 and it will either cite a
            page it can parse or guess from whatever forum thread it half-remembers. A scanned rig
            diagram, on its own, is an image with a filename. Nobody can quote it, filter it by
            decade, or tell whether the name attached to it was ever checked. Suede DNA exists to
            close that gap for 409 guitar rig diagrams from the Guitar Geek Archives on the
            Internet Archive, and the way Suede AI structured it is a working pattern for any
            archive that wants to be read by search engines and AI systems instead of skipped.
          </p>
          <p>
            Jason Colapietro built the archive from Suede AI’s studio in West Palm Beach, Florida.
            This note walks through the decisions in the order they matter: what each record
            holds, which pages are offered to crawlers, how the machine-readable indexes stay in
            step, and what a Palm Beach County business site can borrow from all of it.
          </p>
        </DocSection>

        <DocSection heading="STEP 1: ONE MANIFEST, FIVE FIELDS PER RIG">
          <p>
            Every rig in the archive is one entry in a generated manifest. Each entry records an
            artist association, a year, a file format, a structured source URL pointing back to
            the original archive.org file, and a stable identifier. That is deliberately modest.
            The manifest does not describe the gear in the photo, because Suede does not
            interpret the photographed equipment or re-verify the upstream attribution. It
            records what the source says and where the source lives.
          </p>
          <p>
            The payoff is that every page renders from the same data. The{' '}
            <SuedeLink href="/blacksabbath-tony">Tony Iommi rig page</SuedeLink> and the{' '}
            <SuedeLink href="/iron-maiden-dave">Dave Murray rig page</SuedeLink> are not
            hand-written; their titles, descriptions, timelines, and source links all come from
            the manifest, and a validation step fails the build if the manifest breaks its own
            schema. When one source of truth drives the HTML, the structured data, and the
            indexes, they cannot quietly disagree with each other, which is the single most
            common reason an AI answer misquotes a site.
          </p>
        </DocSection>

        <DocSection heading="STEP 2: DECIDE WHAT DESERVES TO BE INDEXED">
          <p>
            The archive publishes 361 artist pages. Only 69 of them are offered to search engines.
            A page is indexed when its name has been reviewed by a person or when it documents at
            least three rigs. Single- and two-rig pages with unreviewed names render mostly shared
            template copy, so they stay published and linked for visitors but carry a{' '}
            <code className="mono">noindex, follow</code> robots directive.
          </p>
          <p>
            The important part is not the threshold. It is that one function decides it, and the
            robots tag, the sitemap, and llms.txt all read that same function. Most sites that
            leak thin pages into the index do it because three systems each had their own rule.
            At Suede we treat “should this be indexed” as domain logic with test coverage, not as
            a checkbox in a plugin. That is also why the archive never pads the index to look
            bigger: an answer engine that finds thin pages learns to trust the whole domain less.
          </p>
        </DocSection>

        <DocSection heading="STEP 3: KEEP THE MACHINE-READABLE INDEXES IN STEP">
          <p>
            Three files tell machines what the site is. The sitemap lists every indexable URL.
            The llms.txt file lists the same pages and describes each one with its own meta
            description, so a model reading it gets the page’s words rather than a paraphrase.
            The JSON-LD on every page resolves the publisher and author by reference into a
            single graph: the organization is always the canonical Suede AI identity and the
            author is always the canonical Jason Colapietro identity, never a fresh copy minted
            per page.
          </p>
          <p>
            Reviewed artist pages describe their subject as a Person with an image gallery of
            rigs credited to the Guitar Geek Archives. Unreviewed pages make no identity claim at
            all and say plainly that the name is an upstream archive label. That restraint is
            what makes the structured data citable. A crawler that catches one false assertion
            has a reason to discount the rest.
          </p>
        </DocSection>

        <DocSection heading="WHAT A PALM BEACH COUNTY BUSINESS CAN TAKE FROM THIS">
          <p>
            Swap “rigs” for “services,” “projects,” or “locations” and the pattern is the same one
            Suede AI uses for clients through{' '}
            <SuedeLink href="https://suedeai.agency/">
              its West Palm Beach SEO, GEO, and web development practice
            </SuedeLink>
            . A contractor in Jupiter with forty project pages, or a practice in Palm Beach Gardens
            with a dozen service pages, has the same three problems: records that live in
            people’s heads instead of structured data, thin pages competing with strong ones, and
            indexes that drift out of step with the site. The fix is the same too. Put the facts
            in one source, let a single rule decide what is indexed, and generate the sitemap,
            llms.txt, and schema from that source. The{' '}
            <SuedeLink href="https://suedeai.agency/services/technical-seo">
              technical SEO service
            </SuedeLink>{' '}
            and the{' '}
            <SuedeLink href="https://suedeai.agency/services/ai-visibility">
              AI visibility service
            </SuedeLink>{' '}
            are built around exactly that sequence.
          </p>
          <p>
            The honest tradeoff, and Jason Colapietro says it to every client up front: this approach shrinks what you show crawlers before it grows it.
            Suede DNA indexes fewer than a fifth of its artist pages on purpose. Expect a smaller,
            cleaner footprint first and better citations second.
          </p>
        </DocSection>

        <DocSection heading="THE RECORD BEHIND THE BUILD">
          <p>
            Jason Colapietro does not ask anyone to take the method on faith, so the proof is
            public. He has{' '}
            <SuedeLink href={MERGED_PRS}>
              54 pull requests merged across 46 open-source repositories he does not maintain
            </SuedeLink>
            , including Jest, Adobe React Spectrum, Backstage, and the Polkadot SDK. He has
            shipped{' '}
            <SuedeLink href="https://apps.apple.com/us/developer/jason-colapietro/id1895958699">
              nine iOS apps under his own Apple developer account
            </SuedeLink>
            . On October 31, 2026, Suede AI SEO ranked #1 among Palm Beach County-based companies
            listed in The Manifest’s{' '}
            <SuedeLink href="https://themanifest.com/artificial-intelligence/consulting/deployment/companies/florida">
              Florida AI Deployment directory
            </SuedeLink>{' '}
            and in the top 25 statewide, recorded on{' '}
            <SuedeLink href="https://suedeai.agency/company/recognition">
              the recognition page
            </SuedeLink>
            . Suede AI is a member of{' '}
            <SuedeLink href="https://seo.suedeai.ai/evidence#claude-for-startups">
              Claude for Startups, Anthropic’s startup program
            </SuedeLink>
            , and Jason holds 21 earned course credentials across eight providers, including
            Semrush Academy’s Local SEO Essentials and HubSpot’s AEO Fundamentals, all shown in{' '}
            <SuedeLink href="https://seo.suedeai.ai/evidence#training-credentials">
              the evidence gallery
            </SuedeLink>
            . The team started out as Suede Labs, and the same habit of shipping receipts with
            claims runs through the free book{' '}
            <SuedeLink href="https://seo.suedeai.ai/book">The Screenshot</SuedeLink>, which
            explains how answer engines decide who to name.
          </p>
        </DocSection>

        <DocSection heading="YOUR NEXT STEP">
          <p>
            Pick the one page type on your site that matters most for revenue and list the five
            facts every one of those pages should carry. If you cannot fill that list from a
            single source today, that is the first thing to fix. If you want Suede to look at it
            with you, start the{' '}
            <SuedeLink href="https://suedeai.agency/assessment">free Suede AI assessment</SuedeLink>
            , or read more about how Jason Colapietro works on{' '}
            <SuedeLink href="https://suedeai.ai/founder">the Suede AI founder page</SuedeLink>.
            For more on how this archive handles names it has not verified, see{' '}
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
