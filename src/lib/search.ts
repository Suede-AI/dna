import { ARTIST_ALIASES } from './aliases';
import type { Artist } from './manifest';

export type YearRange = {
  min: number;
  max: number;
};

export type ParsedSearchQuery = {
  text: string;
  yearRanges: YearRange[];
};

export function searchArtists(artists: Artist[], rawQuery: string): Artist[] {
  const parsed = parseSearchQuery(rawQuery);
  if (!parsed.text && parsed.yearRanges.length === 0) return artists;

  const yearFiltered =
    parsed.yearRanges.length > 0
      ? artists.filter((artist) => parsed.yearRanges.every((range) => artistOverlapsRange(artist, range)))
      : artists;

  if (!parsed.text) return yearFiltered;

  return yearFiltered
    .map((a, index) => ({ a, index, score: scoreArtist(a, parsed.text) }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || x.index - y.index)
    .map((x) => x.a);
}

export function suggestArtists(artists: Artist[], rawQuery: string, limit = 3): Artist[] {
  const parsed = parseSearchQuery(rawQuery);
  if (!parsed.text) return [];
  return searchArtists(artists, rawQuery).slice(0, limit);
}

export function isYearQuery(rawQuery: string): boolean {
  const parsed = parseSearchQuery(rawQuery);
  return parsed.text.length === 0 && parsed.yearRanges.length > 0;
}

export function usesRelevanceSort(rawQuery: string): boolean {
  return parseSearchQuery(rawQuery).text.length > 0;
}

export function parseSearchQuery(rawQuery: string): ParsedSearchQuery {
  let remainder = ` ${rawQuery} `;
  const yearRanges: YearRange[] = [];

  const consume = (pattern: RegExp, toRange: (match: string[]) => YearRange | null) => {
    remainder = remainder.replace(pattern, (...args: unknown[]) => {
      const fullMatch = String(args[0]);
      const captures = args.slice(1, -2).map((value) => String(value ?? ''));
      const range = toRange([fullMatch, ...captures]);
      if (range) yearRanges.push(normalizeRange(range));
      return ' ';
    });
  };

  consume(/\b(19\d{2}|20\d{2})\s*(?:-|–|—|\.\.|to)\s*(19\d{2}|20\d{2})\b/gi, (match) => ({
    min: Number(match[1]),
    max: Number(match[2]),
  }));
  consume(/\b(?:year|yr)(?::\s*|\s+)(19\d{2}|20\d{2})\b/gi, (match) => exactYear(Number(match[1])));
  consume(/\b(?:before|pre)(?::\s*|\s+)(19\d{2}|20\d{2})\b/gi, (match) => ({
    min: 0,
    max: Number(match[1]) - 1,
  }));
  consume(/\b(?:until|through|thru|to|max)(?::\s*|\s+)(19\d{2}|20\d{2})\b/gi, (match) => ({
    min: 0,
    max: Number(match[1]),
  }));
  consume(/\b(?:after|since)(?::\s*|\s+)(19\d{2}|20\d{2})\b/gi, (match) => ({
    min: Number(match[1]) + 1,
    max: 9999,
  }));
  consume(/\b(?:from|min)(?::\s*|\s+)(19\d{2}|20\d{2})\b/gi, (match) => ({
    min: Number(match[1]),
    max: 9999,
  }));
  consume(/(?:^|\s)(<=|<|>=|>)\s*(19\d{2}|20\d{2})(?=\s|$)/gi, (match) => {
    const year = Number(match[2]);
    if (match[1] === '<') return { min: 0, max: year - 1 };
    if (match[1] === '<=') return { min: 0, max: year };
    if (match[1] === '>') return { min: year + 1, max: 9999 };
    return { min: year, max: 9999 };
  });
  consume(/(?:^|\s)['’](\d{2})(?=\s|$)/g, (match) => exactYear(expandTwoDigitYear(Number(match[1]))));
  consume(/\b(?:'|’)?(\d{2})s\b/gi, (match) => decadeRange(Number(match[1])));
  consume(/\b((?:19|20)\d0)s\b/gi, (match) => {
    const decade = Number(match[1]);
    return { min: decade, max: decade + 9 };
  });
  consume(/\b(19\d{2}|20\d{2})\b/g, (match) => exactYear(Number(match[1])));

  return {
    text: normalize(remainder),
    yearRanges,
  };
}

export function yearMatchesRanges(year: number, ranges: YearRange[]): boolean {
  return ranges.every((range) => year >= range.min && year <= range.max);
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

function artistOverlapsRange(artist: Artist, range: YearRange): boolean {
  return artist.yearMin <= range.max && artist.yearMax >= range.min;
}

function exactYear(year: number): YearRange {
  return { min: year, max: year };
}

function normalizeRange(range: YearRange): YearRange {
  return {
    min: Math.min(range.min, range.max),
    max: Math.max(range.min, range.max),
  };
}

function decadeRange(twoDigitDecade: number): YearRange | null {
  if (twoDigitDecade >= 0 && twoDigitDecade <= 14) {
    return { min: 2000 + twoDigitDecade, max: 2000 + twoDigitDecade + 9 };
  }
  if (twoDigitDecade >= 60 && twoDigitDecade <= 99) {
    return { min: 1900 + twoDigitDecade, max: 1900 + twoDigitDecade + 9 };
  }
  return null;
}

function expandTwoDigitYear(twoDigitYear: number): number {
  return twoDigitYear <= 14 ? 2000 + twoDigitYear : 1900 + twoDigitYear;
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
