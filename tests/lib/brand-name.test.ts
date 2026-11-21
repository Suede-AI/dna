import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * The company is "Suede" (owner direction, 2026-11-21). "Suede AI" and
 * "Suede Labs" stay only as the Organization's schema alternateName, alias
 * statements about the earlier name, and records of someone else's words.
 */
const OLD_NAME = [/\bsuede[ \t]+(ai|labs)\b/i, /\bSuede(AI|Labs)\b(?![.\-/@])/];
const ALIAS_LIST = /"?alternateName"?:\s*\[[^\]]*\]/g;
const ALLOWED_LINE = [
  /formerly (known as )?Suede (AI|Labs)|started out as Suede Labs/, // alias statements
  /TechBullion reported that Suede Labs/, // press headline, quoted as published
  /searched for a Suede Labs AI review/, // the search query Google's Web Guide answered
];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return files(full);
    return /\.(tsx?|html|txt|xml|json|svg|md)$/.test(name) ? [full] : [];
  });
}

describe('brand name', () => {
  it('public copy names the company Suede, not Suede AI or Suede Labs', () => {
    const hits: string[] = [];
    for (const file of [...files(join(process.cwd(), 'src')), ...files(join(process.cwd(), 'public'))]) {
      const text = readFileSync(file, 'utf8').replace(ALIAS_LIST, '');
      text.split('\n').forEach((line, i) => {
        if (ALLOWED_LINE.some((re) => re.test(line))) return;
        if (OLD_NAME.some((re) => re.test(line))) hits.push(`${relative(process.cwd(), file)}:${i + 1}`);
      });
    }
    expect(hits).toEqual([]);
  });
});
