# Attribution

## Data source

Suede DNA is a presentation, normalization, and search layer over the [**guitargeek-archives**](https://archive.org/details/guitargeek-archives) collection on archive.org. That archive is a community-maintained compendium of guitarist rig diagrams, signal chains, and gear documentation — much of it originally surfaced through guitargeek.com and related rig-documentation communities.

The canonical manifest in `data/rigs.json` records the upstream source explicitly:

```json
{
  "generatedAt": "...",
  "source": "https://archive.org/download/guitargeek-archives/",
  "validatedAt": "...",
  "rigs": [...]
}
```

Every rig image surfaced on `dna.suedeai.ai` is served directly from (or references) `https://archive.org/download/guitargeek-archives/`. Suede DNA does not re-host the underlying images; we curate, normalize artist metadata, and provide a faster browsing/search interface over the upstream collection.

## What Suede DNA adds

- A normalized JSON manifest with consistent artist slugs, year stamps, and a deterministic ID scheme.
- A search + filter layer (`src/lib/search.ts`, `src/lib/filters.ts`).
- Manual corrections (`data/overrides.json`) and intentional exclusions (`data/excluded.json`) for cases where upstream filenames or metadata were ambiguous.
- A static, archival-feeling presentation layer (Next.js 15 + Tailwind v4).
- SEO + JSON-LD structured data so each artist and rig is independently discoverable.

## How to credit a rig you use

If you reference a specific rig diagram from Suede DNA — for a blog post, video, tab, lesson, etc. — please credit the upstream source:

> Rig diagram via the [guitargeek-archives](https://archive.org/details/guitargeek-archives) collection on archive.org, surfaced through [Suede DNA](https://dna.suedeai.ai).

Where the original artist, publication, or rig-documenter is known, credit them first.

## Code license

The code in this repository (the Next.js site, scripts, manifest pipeline, tests) is MIT-licensed — see [`LICENSE`](./LICENSE).

## Image / data rights

The underlying rig diagrams remain the property of their original creators. Suede DNA surfaces them under the same archival, citation-friendly, non-commercial spirit as the upstream archive.org collection. If you are a rights holder and want a specific item removed, please open an issue.

## Contact

- Project lead: [Jason Colapietro](https://github.com/JasonColapietro)
- Studio: [Suede Labs AI](https://suedeai.ai)
- Issues: [github.com/Suede-AI/dna/issues](https://github.com/Suede-AI/dna/issues)
