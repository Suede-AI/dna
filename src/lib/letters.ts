import type { Artist } from './manifest';

export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function getArtistInitial(name: string): string {
  const initial = name.trim().charAt(0).toUpperCase();
  return /^[A-Z]$/.test(initial) ? initial : '#';
}

export function getAvailableLetters(artists: Artist[]): string[] {
  const available = new Set<string>();
  for (const artist of artists) {
    const initial = getArtistInitial(artist.name);
    if (LETTERS.includes(initial)) available.add(initial);
  }
  return LETTERS.filter((letter) => available.has(letter));
}
