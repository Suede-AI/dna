import type { Artist } from './manifest';

export function searchArtists(artists: Artist[], rawQuery: string): Artist[] {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return artists;

  // Year query (4-digit number): match artists whose year range includes it
  if (/^\d{4}$/.test(q)) {
    const year = Number(q);
    return artists.filter((a) => year >= a.yearMin && year <= a.yearMax);
  }

  return artists
    .map((a) => ({ a, score: scoreMatch(a.name.toLowerCase(), q) }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .map((x) => x.a);
}

export function isYearQuery(rawQuery: string): boolean {
  return /^\d{4}$/.test(rawQuery.trim());
}

export function usesRelevanceSort(rawQuery: string): boolean {
  const q = rawQuery.trim();
  return q.length > 0 && !isYearQuery(q);
}

function scoreMatch(haystack: string, needle: string): number {
  if (haystack === needle) return 100;
  if (haystack.startsWith(needle)) return 80;
  if (haystack.includes(' ' + needle)) return 60;
  if (haystack.includes(needle)) return 40;
  return 0;
}
