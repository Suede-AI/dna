# Suede DNA

**Live:** [dna.suedeai.ai](https://dna.suedeai.ai)

A tonal genealogy archive of guitarists' rigs and signal chains — 409 documented setups from 390 artists, indexed by year and player. Built and maintained by [Suede Labs AI](https://suedeai.ai).

The premise: every distinctive guitar tone lives inside a specific signal chain — the pedalboard, the amp, the mic placement, the unsung 9V power supply that everything depends on. Suede DNA is a browsable compilation of those rigs, sourced from the long-running [guitargeek-archives](https://archive.org/details/guitargeek-archives) on archive.org, normalized into a single searchable manifest, and presented as a static, fast, archival-feeling site.

## What's in here

- A Next.js 15 (App Router) site that renders the rig grid, per-artist pages, search, year filters, and JSON-LD structured data.
- A canonical `data/rigs.json` manifest (~409 rigs, 390 artists, year-stamped) with a `validate-manifest` step that gates builds on schema integrity.
- A small build pipeline (`scripts/build-manifest.ts`, `scripts/validate-manifest.ts`) for refreshing and validating the dataset from the upstream source.
- Vitest tests covering the manifest, search, slug, and filter logic.

## Tech stack

- **Framework:** Next.js 15 (App Router, Turbopack dev server)
- **Language:** TypeScript (strict)
- **Runtime:** Node 20+
- **Package manager:** pnpm
- **Styling:** Tailwind CSS v4 (beta), Geist Sans + Mono
- **Testing:** Vitest + Testing Library + happy-dom
- **Hosting:** Vercel

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000 with Turbopack
pnpm build        # production build
pnpm start        # serve the production build
pnpm test         # run the vitest suite
pnpm lint         # next lint (ESLint)
pnpm typecheck    # tsc --noEmit
pnpm validate-manifest   # verify data/rigs.json schema + integrity
pnpm refresh-manifest    # regenerate data/rigs.json from upstream
```

A clean `pnpm install && pnpm build` should produce a fully static-ish Next.js build with the rig manifest pre-loaded.

## Project structure

```
src/
  app/                 Next.js App Router routes (home, [artist-slug], about, sitemap, robots, og image)
  components/          UI components grouped by surface (grid, header, footer, search, filters, hero, seo, chrome, artist)
  hooks/               React hooks
  lib/                 Domain logic: manifest, search, filters, slug, seo
  styles/              Global styling
data/
  rigs.json            Canonical compilation manifest (generated + validated)
  artists.json         Artist-level metadata
  overrides.json       Manual corrections layered on top of the upstream source
  excluded.json        Items intentionally excluded from the compilation
scripts/
  build-manifest.ts    Rebuild rigs.json from upstream
  validate-manifest.ts Schema + integrity check
tests/                 Vitest suites
public/                Static assets (Suede mark, favicon)
docs/superpowers/      Design notes and plans
```

## Data source & attribution

The rig images and signal-chain references are derived from the [guitargeek-archives](https://archive.org/details/guitargeek-archives) collection on archive.org, a community-maintained compendium of guitarist rig diagrams. Suede DNA is a presentation, normalization, and search layer over that source — not a re-publication of new material. See [`ATTRIBUTION.md`](./ATTRIBUTION.md) for full credit and usage notes.

## License

[MIT](./LICENSE). Code is MIT-licensed; the underlying rig diagrams remain the property of their original creators and are surfaced here under the same archival, non-commercial, citation-friendly spirit as the upstream collection.

## About Suede

Suede DNA is one of several products in the [Suede Labs AI](https://suedeai.ai) family — a small studio building tools at the intersection of guitar, music, and AI. Sibling products include [Strumly](https://strumly.suedeai.ai) (24/7 conversational AI guitar coach) and [FretPulse](https://fretpulse.suedeai.ai) (holistic guitar care companion).

Founded by [Jason Colapietro](https://github.com/JasonColapietro) — Founder and CEO, published author, Forbes contributor.

---

*Keywords: guitar rigs, signal chains, pedalboards, amp settings, tonal genealogy, guitar tone archive, guitargeek, music history, Next.js archive site, guitar gear database.*
