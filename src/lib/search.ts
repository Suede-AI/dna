import type { Artist } from './manifest';

export function searchArtists(artists: Artist[], rawQuery: string): Artist[] {
  const q = normalize(rawQuery);
  if (!q) return artists;

  // Year query (4-digit number): match artists whose year range includes it
  if (/^\d{4}$/.test(q)) {
    const year = Number(q);
    return artists.filter((a) => year >= a.yearMin && year <= a.yearMax);
  }

  return artists
    .map((a, index) => ({ a, index, score: scoreMatch(a.name, q) }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || x.index - y.index)
    .map((x) => x.a);
}

export function isYearQuery(rawQuery: string): boolean {
  return /^\d{4}$/.test(rawQuery.trim());
}

export function usesRelevanceSort(rawQuery: string): boolean {
  const q = rawQuery.trim();
  return q.length > 0 && !isYearQuery(q);
}

export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[\u2014\u2013\-_'"’.\/&]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreMatch(haystack: string, needle: string): number {
  const normalizedHaystack = normalize(haystack);
  if (normalizedHaystack === needle) return 100;
  if (normalizedHaystack.startsWith(needle)) return 80;
  if (normalizedHaystack.includes(' ' + needle)) return 60;
  if (normalizedHaystack.includes(needle)) return 40;

  const queryTokens = needle.split(' ').filter(Boolean);
  const nameTokens = normalizedHaystack.split(' ').filter(Boolean);
  if (queryTokens.length === 0 || nameTokens.length === 0) return 0;

  let total = 0;
  for (const queryToken of queryTokens) {
    const tokenScore = scoreToken(nameTokens, queryToken);
    if (tokenScore === 0) return 0;
    total += tokenScore;
  }
  return total;
}

function scoreToken(nameTokens: string[], queryToken: string): number {
  let best = 0;
  for (const nameToken of nameTokens) {
    if (nameToken === queryToken) best = Math.max(best, 70);
    else if (nameToken.startsWith(queryToken)) best = Math.max(best, 60);
    else if (nameToken.includes(queryToken)) best = Math.max(best, 40);
  }
  return best;
}
