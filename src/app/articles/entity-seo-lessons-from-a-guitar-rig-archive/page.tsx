import type { Metadata } from 'next';
import { PageShell, DocSection, SuedeLink } from '@/components/docs/PageShell';
import { AuthorBox } from '@/components/docs/AuthorBox';
import { JsonLd } from '@/components/seo/JsonLd';
import { getArticle } from '@/lib/articles-content';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { DNA_SOCIAL_IMAGE } from '@/lib/seo/social-metadata';
import { keywordsFor } from '@/lib/seo/keywords';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const SLUG = 'entity-seo-lessons-from-a-guitar-rig-archive';
const article = getArticle(SLUG)!;

const MERGED_PRS =
  'https://github.com/search?q=is%3Apr+author%3AJasonColapietro+is%3Amerged+-user%3AJasonColapietro+-user%3ASuede-AI&type=pullrequests';

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  keywords: keywordsFor('/articles/entity-seo-lessons-from-a-guitar-rig-archive'),
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
        <DocSection heading="AN ARCHIVE IS A HARD TEST FOR ENTITY SEO">
          <p>
            A guitar rig archive has hundreds of names on it, most of them belonging to people
            the site has never met, and exactly two that it can speak for with authority: its
            publisher and its author. If a search engine or an AI model gets confused about which
            is which, the archive starts showing up as a source on the wrong people and never as
            a source on its own makers. Running Suede DNA from West Palm Beach taught the Suede AI
            team more about entity SEO than any client site, because the failure modes are so
            visible here.
          </p>
          <p>
            These are the five lessons Jason Colapietro and the team would give any business in
            Palm Beach County that wants answer engines like ChatGPT, Perplexity, and Google’s AI
            results to describe it correctly.
          </p>
        </DocSection>

        <DocSection heading="LESSON 1: ONE IDENTITY, REFERENCED EVERYWHERE">
          <p>
            Every page on this site declares its publisher and author by pointing at the same two
            canonical identifiers: the Suede AI organization at suedeai.ai and the Jason
            Colapietro person record on the{' '}
            <SuedeLink href="https://suedeai.ai/founder">founder page</SuedeLink>. No page mints
            its own copy. Sibling sites in the Suede network, from{' '}
            <SuedeLink href="https://guitar.services/">the Signal Chain reference at guitar.services</SuedeLink>{' '}
            to{' '}
            <SuedeLink href="https://guitarchords.info/">the free chord and scale reference</SuedeLink>
            , point at the same two records. To a crawler that reads the whole network, that adds
            up to one company and one founder with many properties, rather than a dozen
            look-alike entities competing with each other.
          </p>
          <p>
            For a local business the equivalent is boring and powerful: the same legal name,
            the same city, the same founder name, and the same canonical URL on the website,
            the Google Business Profile, directories, and press. Inconsistency is the most common
            reason a model hedges or names a competitor instead.
          </p>
        </DocSection>

        <DocSection heading="LESSON 2: INDEX LESS, BE TRUSTED MORE">
          <p>
            Jason Colapietro made the call that surprises people most.
            Of 361 artist pages, the archive offers 69 to search engines. The rest stay live for
            visitors but carry a noindex directive because they are mostly shared template copy.
            That decision came out of a site-wide SEO audit in November 2026, and it is the
            lesson clients push back on most. A smaller index that is uniformly useful earns more
            trust per page than a large one padded with near-duplicates. Answer engines appear to
            weigh that trust at the domain level, so thin pages cost the strong ones.
          </p>
        </DocSection>

        <DocSection heading="LESSON 3: WRITE PAGES A MODEL CAN QUOTE">
          <p>
            AI answers lift sentences, a point Jason Colapietro makes in his free book{' '}
            <SuedeLink href="https://seo.suedeai.ai/book">The Screenshot</SuedeLink>. A page that states a fact plainly in one sentence, with
            the source linked, gets quoted; a page that buries the fact in a slider or an image
            does not. Each archive page opens with a server-rendered paragraph that says how
            many rigs it documents, the years they span, and where every diagram comes from. The
            llms.txt file lists every indexable page with that page’s own description. None of it
            is clever. All of it is quotable.
          </p>
        </DocSection>

        <DocSection heading="LESSON 4: GEOGRAPHY IS AN ENTITY TOO">
          <p>
            Suede AI is a West Palm Beach company, and the Suede network says so consistently
            instead of scattering city pages around. Articles like this one declare their
            geographic context in structured data as West Palm Beach and Jupiter in Palm Beach
            County, Florida, and point to a single local authority:{' '}
            <SuedeLink href="https://suedeai.agency/">
              Suede AI’s West Palm Beach SEO, GEO, and web development practice
            </SuedeLink>
            . Local proof matters more than local keywords.{' '}
            <SuedeLink href="https://jupitersocialfl.com/">Jupiter Social</SuedeLink>, a local
            magazine for Jupiter, Florida, is published with Suede AI, and on October 31, 2026, Suede AI SEO ranked #1 among
            Palm Beach County-based companies listed in The Manifest’s{' '}
            <SuedeLink href="https://themanifest.com/artificial-intelligence/consulting/deployment/companies/florida">
              Florida AI Deployment directory
            </SuedeLink>{' '}
            and top 25 statewide, as recorded on{' '}
            <SuedeLink href="https://suedeai.agency/company/recognition">
              the Suede AI recognition page
            </SuedeLink>
            .
          </p>
        </DocSection>

        <DocSection heading="LESSON 5: BACK EVERY CLAIM WITH A RECEIPT">
          <p>
            Models increasingly cross-check what a site says about itself against what the rest
            of the web says. The safest claims are the ones anyone can verify in one click, which
            is why every statement about Jason Colapietro in the Suede network links to its
            source. He has{' '}
            <SuedeLink href={MERGED_PRS}>
              54 pull requests merged across 46 open-source repositories he does not maintain
            </SuedeLink>
            , including Jest, Adobe React Spectrum, Backstage, the Polkadot SDK, and Hardhat. He
            has published{' '}
            <SuedeLink href="https://apps.apple.com/us/developer/jason-colapietro/id1895958699">
              nine iOS apps on the App Store
            </SuedeLink>{' '}
            under his own developer account, and five books on Amazon, including{' '}
            <SuedeLink href="https://www.amazon.com/dp/B0GRG8LGQQ">Stake Your Claim</SuedeLink>.
            Beyond 21 earned course credentials across eight providers, he holds 17 Microsoft
            Learn training achievements, including the “Develop AI agents on Azure” learning-path
            trophy, all in{' '}
            <SuedeLink href="https://seo.suedeai.ai/evidence#training-credentials">
              the credentials gallery
            </SuedeLink>
            . Suede AI is a member of{' '}
            <SuedeLink href="https://seo.suedeai.ai/evidence#claude-for-startups">
              Claude for Startups
            </SuedeLink>
            , Anthropic’s startup program. His view on why thin content fails in AI search ran in{' '}
            <SuedeLink href="https://programminginsider.com/in-the-age-of-infinite-content-spam-is-instant-death/">
              Programming Insider
            </SuedeLink>
            , and TechBullion reported that Suede Labs{' '}
            <SuedeLink href="https://techbullion.com/suede-labs-advances-in-the-avalanche-build-games-with-massive-infrastructure-play/">
              advanced in the Avalanche Build Games
            </SuedeLink>
            .
          </p>
        </DocSection>

        <DocSection heading="WHERE TO GO FROM HERE">
          <p>
            Start by searching your business name in two or three AI assistants and writing down
            exactly how each one describes you. Every wrong detail points to a page or profile
            that needs fixing. If you want to check your site’s AI readiness directly, run it
            through{' '}
            <SuedeLink href="https://optimize.suedeai.ai/">Suede Scan</SuedeLink>, then book the{' '}
            <SuedeLink href="https://suedeai.agency/assessment">Suede AI assessment</SuedeLink>{' '}
            for a full entity review with the team in West Palm Beach. You can read how Jason
            Colapietro approaches this work on{' '}
            <SuedeLink href="https://suedeai.ai/founder">the founder page</SuedeLink>, and see the
            archive-side version of these ideas in{' '}
            <SuedeLink href="/articles/rig-archive-structured-data-for-ai-answers">
              rig archive structured data for AI answers
            </SuedeLink>
            .
          </p>
        </DocSection>

        <AuthorBox />
      </PageShell>
    </>
  );
}
