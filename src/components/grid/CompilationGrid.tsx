'use client';

import { useMemo, useState } from 'react';
import { RigCard } from './RigCard';
import { LetterRail } from './LetterRail';
import { FilterRail } from '../filters/FilterRail';
import { useUrlState } from '@/hooks/useUrlState';
import { filterArtists, sortArtists } from '@/lib/filters';
import type { Artist, Rig } from '@/lib/manifest';

export function CompilationGrid({ artists, rigs }: { artists: Artist[]; rigs: Rig[] }) {
  const [state, update] = useUrlState();

  const filteredArtists = useMemo(
    () => sortArtists(filterArtists(artists, state), state.sort),
    [artists, state]
  );

  const visibleSlugs = useMemo(() => new Set(filteredArtists.map((a) => a.slug)), [filteredArtists]);

  const visibleRigs = useMemo(
    () => rigs.filter((r) => visibleSlugs.has(r.artistSlug)),
    [rigs, visibleSlugs]
  );

  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const jumpToLetter = (l: string) => {
    const slug = filteredArtists.find((a) => a.name.toUpperCase().startsWith(l))?.slug;
    if (!slug) return;
    setActiveLetter(l);
    const el = document.getElementById(`artist-anchor-${slug}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (visibleRigs.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <FilterRail state={state} onChange={update} />
        <p className="mono-label mt-16">NO MATCHES FOR &ldquo;{state.q || `decades ${state.decades.join(', ')}`}&rdquo;</p>
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
      <FilterRail state={state} onChange={update} />
      <div id="archive" className="relative mx-auto max-w-[1400px] px-6 pt-12 pb-24 grid grid-cols-[1fr_auto] gap-6">
        <div>
          <h2 className="sr-only">Compilation grid</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(() => {
              let cardIndex = 0;
              return filteredArtists.flatMap((artist) => {
                const artistRigs = visibleRigs.filter((r) => r.artistSlug === artist.slug);
                const nodes = [
                  <div
                    key={`anchor-${artist.slug}`}
                    id={`artist-anchor-${artist.slug}`}
                    className="col-span-full mono-label pt-6"
                  >
                    {artist.name} <span className="text-[color:var(--color-mute)]">· {artist.count}</span>
                  </div>,
                  ...artistRigs.map((rig) => {
                    const stagger = cardIndex < 24 ? cardIndex * 30 : null;
                    cardIndex += 1;
                    return <RigCard key={rig.id} rig={rig} index={cardIndex - 1} stagger={stagger} />;
                  }),
                ];
                return nodes;
              });
            })()}
          </div>
        </div>
        <LetterRail activeLetter={activeLetter} onJump={jumpToLetter} />
      </div>
    </>
  );
}
