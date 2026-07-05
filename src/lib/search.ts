import { ARTIST_ALIASES } from './aliases';
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
    .map((a, index) => ({ a, index, score: scoreArtist(a, q) }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || x.index - y.index)
    .map((x) => x.a);
}

export function suggestArtists(artists: Artist[], rawQuery: string, limit = 3): Artist[] {
  const q = normalize(rawQuery);
  if (!q || isYearQuery(q)) return [];
  return searchArtists(artists, q).slice(0, limit);
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

function scoreArtist(artist: Artist, query: string): number {
  return Math.max(scoreMatch(artist.name, query), scoreAliases(artist.slug, query));
}

function scoreAliases(slug: string, query: string): number {
  const aliases = ARTIST_ALIASES[slug] ?? [];
  return aliases.reduce((best, alias) => Math.max(best, Math.min(scoreMatch(alias, query), 60)), 0);
}

function scoreToken(nameTokens: string[], queryToken: string): number {
  let best = 0;
  for (const nameToken of nameTokens) {
    if (nameToken === queryToken) best = Math.max(best, 70);
    else if (nameToken.startsWith(queryToken)) best = Math.max(best, 60);
    else if (nameToken.includes(queryToken)) best = Math.max(best, 40);
    else best = Math.max(best, fuzzyTokenScore(nameToken, queryToken));
  }
  return best;
}

function fuzzyTokenScore(nameToken: string, queryToken: string): number {
  const maxDistance = queryToken.length >= 8 ? 2 : queryToken.length >= 4 ? 1 : 0;
  if (maxDistance === 0) return 0;
  const distance = damerauLevenshteinDistanceWithin(queryToken, nameToken, maxDistance);
  if (distance === null || distance === 0) return 0;
  return distance === 1 ? 20 : 10;
}

export function damerauLevenshteinDistanceWithin(
  a: string,
  b: string,
  maxDistance: number
): number | null {
  if (Math.abs(a.length - b.length) > maxDistance) return null;
  if (a === b) return 0;
  if (a.length === 0) return b.length <= maxDistance ? b.length : null;
  if (b.length === 0) return a.length <= maxDistance ? a.length : null;

  let previousPrevious: number[] = [];
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let rowMin = current[0];

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let value = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + cost
      );

      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, previousPrevious[j - 2] + 1);
      }

      current[j] = value;
      rowMin = Math.min(rowMin, value);
    }

    if (rowMin > maxDistance) return null;
    previousPrevious = previous;
    previous = current;
  }

  const distance = previous[b.length];
  return distance <= maxDistance ? distance : null;
}
