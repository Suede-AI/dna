'use client';

import { useDeferredValue, useEffect, useMemo, useState, type ReactNode } from 'react';
import { RigCard } from './RigCard';
import { LetterRail } from './LetterRail';
import { FilterRail } from '../filters/FilterRail';
import { useUrlState } from '@/hooks/useUrlState';
import { countResults, filterArtists, sortArtists } from '@/lib/filters';
import { getArtistInitial, getAvailableLetters } from '@/lib/letters';
import { damerauLevenshteinDistanceWithin, normalize, suggestArtists, usesRelevanceSort } from '@/lib/search';
import type { Artist, Rig } from '@/lib/manifest';

export function CompilationGrid({ artists, rigs }: { artists: Artist[]; rigs: Rig[] }) {
  const [state, update] = useUrlState();
  const deferredQ = useDeferredValue(state.q);
  const deferredState = useMemo(() => ({ ...state, q: deferredQ }), [deferredQ, state]);

  const relevanceSort = usesRelevanceSort(state.q);
  const deferredRelevanceSort = usesRelevanceSort(deferredState.q);

  const filteredArtists = useMemo(() => {
    const nextArtists = filterArtists(artists, deferredState);
    return deferredRelevanceSort ? nextArtists : sortArtists(nextArtists, deferredState.sort);
  }, [artists, deferredRelevanceSort, deferredState]);

  const visibleSlugs = useMemo(() => new Set(filteredArtists.map((a) => a.slug)), [filteredArtists]);

  const visibleRigs = useMemo(
    () => rigs.filter((r) => visibleSlugs.has(r.artistSlug)),
    [rigs, visibleSlugs]
  );

  const resultCounts = useMemo(() => countResults(filteredArtists, visibleRigs), [filteredArtists, visibleRigs]);

  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const suggestions = useMemo(() => suggestArtists(artists, state.q), [artists, state.q]);
  const availableLetters = useMemo(() => getAvailableLetters(filteredArtists), [filteredArtists]);
  const showLetterDividers =
    deferredState.sort === 'name-asc' && deferredState.q.trim() === '' && deferredState.decades.length === 0;

  useEffect(() => {
    if (filteredArtists.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const anchors = filteredArtists
      .map((artist) => document.getElementById(`artist-anchor-${artist.slug}`))
      .filter((anchor): anchor is HTMLElement => Boolean(anchor));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        const letter = visible?.target.getAttribute('data-letter');
        if (letter) setActiveLetter(letter);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    anchors.forEach((anchor) => observer.observe(anchor));
    return () => observer.disconnect();
  }, [filteredArtists]);

  const jumpToLetter = (l: string) => {
    const slug = filteredArtists.find((a) => a.name.toUpperCase().startsWith(l))?.slug;
    if (!slug) return;
    setActiveLetter(l);
    const el = document.getElementById(`artist-anchor-${slug}`);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  if (visibleRigs.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <FilterRail state={state} onChange={update} sortDisabled={relevanceSort} resultCounts={resultCounts} />
        <p className="mono-label mt-16">NO MATCHES FOR &ldquo;{state.q || `decades ${state.decades.join(', ')}`}&rdquo;</p>
        {suggestions.length > 0 ? (
          <div className="mt-6">
            <p className="mono-label">DID YOU MEAN</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {suggestions.map((artist) => (
                <button
                  key={artist.slug}
                  type="button"
                  onClick={() => update({ q: artist.name })}
                  className="mono-label hairline px-3 py-2 text-[color:var(--color-bone)] hover:text-[color:var(--color-signal)]"
                  style={{ borderRadius: 'var(--radius-control)' }}
                >
                  {artist.name}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => update({ decades: [], q: '', sort: 'name-asc' })}
          className="mt-4 mono-label hover:text-[color:var(--color-signal)]"
        >
          CLEAR FILTERS →
        </button>
      </div>
    );
  }

  return (
    <>
      <FilterRail state={state} onChange={update} sortDisabled={relevanceSort} resultCounts={resultCounts} />
      <div id="archive" className="relative mx-auto max-w-[1400px] px-6 pt-12 pb-24 grid grid-cols-[1fr_auto] gap-6">
        <div>
          <h2 className="sr-only">Compilation grid</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(() => {
              let cardIndex = 0;
              let currentLetter: string | null = null;
              return filteredArtists.flatMap((artist) => {
                const artistRigs = visibleRigs.filter((r) => r.artistSlug === artist.slug);
                const letter = getArtistInitial(artist.name);
                const nodes: ReactNode[] = [];

                if (showLetterDividers && letter !== currentLetter) {
                  currentLetter = letter;
                  nodes.push(
                    <div key={`divider-${letter}`} className="col-span-full flex items-end gap-5 pt-12 pb-2" aria-hidden>
                      <span
                        className="font-[820] text-white/10"
                        style={{ fontSize: 'var(--text-section)', lineHeight: 0.8 }}
                      >
                        {letter}
                      </span>
                      <span className="mb-2 h-px flex-1 bg-[color:var(--color-line)]" />
                    </div>
                  );
                }

                nodes.push(
                  <div
                    key={`anchor-${artist.slug}`}
                    id={`artist-anchor-${artist.slug}`}
                    data-letter={letter}
                    className="col-span-full pt-6"
                  >
                    <div className="flex flex-wrap items-center gap-3 border-t hairline pt-4">
                      <span className="font-medium text-white">{highlightArtistName(artist.name, deferredState.q)}</span>
                      <span className="mono-label hairline px-2 py-1" style={{ borderRadius: 'var(--radius-control)' }}>
                        {artist.count} RIGS
                      </span>
                      <span className="mono-label hairline px-2 py-1" style={{ borderRadius: 'var(--radius-control)' }}>
                        {formatYearRange(artist)}
                      </span>
                    </div>
                  </div>
                );

                nodes.push(
                  ...artistRigs.map((rig) => {
                    const stagger = cardIndex < 24 ? cardIndex * 30 : null;
                    cardIndex += 1;
                    return <RigCard key={rig.id} rig={rig} index={cardIndex - 1} stagger={stagger} />;
                  })
                );
                return nodes;
              });
            })()}
          </div>
        </div>
        <LetterRail activeLetter={activeLetter} availableLetters={availableLetters} onJump={jumpToLetter} />
      </div>
    </>
  );
}

function formatYearRange(artist: Artist): string {
  return artist.yearMin === artist.yearMax ? String(artist.yearMin) : `${artist.yearMin}-${artist.yearMax}`;
}

function highlightArtistName(name: string, query: string): ReactNode {
  const queryTokens = normalize(query).split(' ').filter(Boolean);
  if (queryTokens.length === 0) return name;

  const nodes: ReactNode[] = [];
  const tokenPattern = /[\p{L}\p{N}]+/gu;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(name)) !== null) {
    const token = match[0];
    const start = match.index;
    if (start > lastIndex) nodes.push(name.slice(lastIndex, start));

    if (queryTokens.some((queryToken) => tokenMatchesQuery(token, queryToken))) {
      nodes.push(
        <mark
          key={`${start}-${token}`}
          className="bg-transparent text-[color:var(--color-signal)] underline decoration-[color:var(--color-signal)] underline-offset-4"
        >
          {token}
        </mark>
      );
    } else {
      nodes.push(token);
    }

    lastIndex = start + token.length;
  }

  if (lastIndex < name.length) nodes.push(name.slice(lastIndex));
  return nodes;
}

function tokenMatchesQuery(token: string, queryToken: string): boolean {
  const normalizedToken = normalize(token);
  if (!normalizedToken || queryToken.length === 0) return false;
  if (normalizedToken === queryToken || normalizedToken.startsWith(queryToken) || normalizedToken.includes(queryToken)) {
    return true;
  }

  const maxDistance = queryToken.length >= 8 ? 2 : queryToken.length >= 4 ? 1 : 0;
  return maxDistance > 0 && damerauLevenshteinDistanceWithin(queryToken, normalizedToken, maxDistance) !== null;
}
