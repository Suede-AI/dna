import type { Metadata } from 'next';
import { PageShell, DocSection } from '@/components/docs/PageShell';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';
const PATH = '/docs/search-and-filters';

export const metadata: Metadata = {
  title: 'Search and Filters',
  description:
    'How the search box parses names, years, and decades, how ranking works, and how decade filters and sort order combine.',
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: 'Search and Filters — Suede DNA Docs',
    description:
      'How the search box parses names, years, and decades, how ranking works, and how decade filters and sort order combine.',
    url: `${SITE_URL}${PATH}`,
    siteName: 'Suede DNA',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search and Filters — Suede DNA Docs',
    description:
      'How the search box parses names, years, and decades, how ranking works, and how decade filters and sort order combine.',
  },
};

function Kbd({ children }: { children: string }) {
  return (
    <code className="mono text-white bg-[color:var(--color-ink-3)] px-1.5 py-0.5 rounded-[var(--radius-control)]">
      {children}
    </code>
  );
}

export default function SearchAndFiltersPage() {
  return (
    <PageShell eyebrow="SUEDE/DNA / DOCS" title="Search and filters." backHref="/docs" backLabel="← ALL DOCS">
      <DocSection heading="ONE BOX, TWO KINDS OF QUERY">
        <p>
          The search box on the home page reads a single string but understands two different
          things inside it: artist-name text and year expressions. It splits a query into those
          two parts before doing anything else, so <Kbd>hendrix 1968</Kbd> filters to rigs from
          1968 and then ranks by how well the remaining text matches an artist name.
        </p>
      </DocSection>

      <DocSection heading="YEAR SYNTAX">
        <p>The parser recognizes several year and range formats inside the same query:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Kbd>1966-1969</Kbd> or <Kbd>1966 to 1969</Kbd>: an explicit range (en dash and em
            dash both work).
          </li>
          <li>
            <Kbd>1975</Kbd>: an exact year.
          </li>
          <li>
            <Kbd>90s</Kbd> or <Kbd>1990s</Kbd>: a full decade.
          </li>
          <li>
            <Kbd>&apos;72</Kbd>: a two-digit year (resolved to 1900s or 2000s depending on the
            value).
          </li>
          <li>
            <Kbd>before 1980</Kbd>, <Kbd>after 1980</Kbd>, <Kbd>since 1980</Kbd>,{' '}
            <Kbd>until 1980</Kbd>, <Kbd>from 1980</Kbd>: open-ended ranges.
          </li>
          <li>
            <Kbd>&lt;1980</Kbd>, <Kbd>&lt;=1980</Kbd>, <Kbd>&gt;1980</Kbd>,{' '}
            <Kbd>&gt;=1980</Kbd>: the same open-ended ranges, comparison-operator style.
          </li>
        </ul>
        <p>
          Multiple year expressions in one query are combined. An artist must satisfy every
          range mentioned, not just one of them. Years are matched against an artist&apos;s full
          documented range (their earliest to latest rig), so a query for a single year will
          surface an artist whose overall range spans that year even if no individual rig lands
          exactly on it; the rig grid itself still only shows rigs from years that satisfy the
          query.
        </p>
      </DocSection>

      <DocSection heading="NAME MATCHING AND RANKING">
        <p>
          Whatever text is left after year expressions are stripped out is matched against artist
          names and a small alias table (for cases like abbreviations or alternate spellings).
          Matching is diacritic-insensitive and punctuation-insensitive, and it tolerates minor
          typos through a bounded edit-distance check: short queries need an exact or near-exact
          token match, longer queries get a little more slack.
        </p>
        <p>
          Results are ranked, not just filtered: an exact name match scores highest, a
          name that starts with the query scores next, a match on a whole word scores above a
          match buried mid-string, and so on down to fuzzy token matches. A query that is only a
          year expression, with no text, switches the result list to chronological order instead
          of relevance order.
        </p>
      </DocSection>

      <DocSection heading="DECADE FILTERS AND SORT">
        <p>
          Independent of the search box, the filter rail exposes decade toggles (multi-select) and
          a sort order: name, earliest year first, or latest year first. Decade filters and search
          text combine: turning on a decade toggle narrows the pool of artists before the search
          query is scored against it.
        </p>
        <p>
          All of this round-trips through the URL as query parameters:{' '}
          <code className="mono text-white">?q=</code> for the search text,{' '}
          <code className="mono text-white">?decades=</code> for a comma-separated list of decade
          years, and <code className="mono text-white">?sort=</code> for the sort order, so a
          filtered view is a link you can share or bookmark.
        </p>
      </DocSection>

      <DocSection heading="KEYBOARD">
        <p>
          Press <Kbd>/</Kbd> or <Kbd>⌘K</Kbd> / <Kbd>Ctrl K</Kbd> from anywhere on the page to
          jump focus to the search box, and <Kbd>Esc</Kbd> while focused to clear it. When a query
          returns no results, the site shows suggested near-matches drawn from the same ranking
          logic that powers normal search, rather than a dead end.
        </p>
      </DocSection>
    </PageShell>
  );
}
