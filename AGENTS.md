# AGENTS.md — Suede DNA

Suede DNA (dna.suedeai.ai) is a static-ish Next.js 15 (App Router) archive of 409 guitarist
rig diagrams — "signal chains" — sourced from archive.org/guitargeek-archives. The visual
identity is the **Suede Sonic Laboratory**: deep-ink backgrounds, Geist Sans + Mono, hairline
borders, oscilloscope grid motif, sweep-in motion, and cyan (`--color-signal`) reserved for
live/active signal. Institutional and archival, never decorative.

## Commands (pnpm, Node 20+)

```bash
pnpm dev          # dev server (Turbopack)
pnpm typecheck && pnpm lint && pnpm test && pnpm build   # THE GATES — all four must pass before any commit
```

## Hard rules

1. **One task per run, one commit per task.** Small surgical diffs. Conventional commit
   messages (`feat:` / `fix:` / `style:` / `perf:` / `test:` / `docs:`). **Never push.**
   No AI attribution lines in commit messages.
2. **Rig diagrams are the content. Never crop them.** `object-cover` on a rig image is a
   bug — use `object-contain` (letterboxed on ink) or natural aspect. Never vendor, mirror,
   or hotlink-rewrite the archive.org images.
3. **Design tokens only.** Colors, spacing, type, radii, and motion come from
   `src/styles/tokens.css` plus the utilities in `src/app/globals.css` (`.mono`,
   `.mono-label`, `.mono-data`, `.hairline`). No new hex literals in components. Cyan
   means signal/live/active — never use it as passive decoration.
4. **Motion is CSS-first.** Keyframes live in `globals.css`; durations and easings come
   from tokens. Every animation must survive `prefers-reduced-motion` (a global override
   exists — do not defeat it). No animation libraries.
5. **No new runtime dependencies** unless the SPEC task explicitly allows one. Hand-roll
   small utilities and test them.
6. `data/rigs.json` and `data/artists.json` are **generated** by `scripts/build-manifest.ts`
   — never hand-edit them. Hand corrections belong in `data/overrides.json`. Your sandbox
   has **no network**: never run `refresh-manifest`, and don't be surprised that
   archive.org images won't load in dev.
7. **Domain logic lives in `src/lib/`** and must have Vitest coverage in `tests/lib/`
   (happy-dom environment; Testing Library available for components).
8. **Accessibility floor:** keyboard reachable, visible `:focus-visible` ring,
   `aria-pressed`/`aria-current` where state exists, `aria-live` for dynamic counts,
   meaningful `alt` preserved on rig images, dialogs trap focus and close on ESC.
9. **Don't touch SEO surfaces** (metadata, JSON-LD, sitemap, robots, OG images) unless the
   task says so. Server-rendered text (stats, headings) must stay real content — never
   replace SSR text with empty placeholders for animation's sake.
10. **Tailwind v4 beta** (`@theme` in tokens.css). House pattern is utility classes plus
    occasional inline `style` referencing token vars — follow it; don't restructure it.

## Layout facts

- Header is sticky: 64px bar + a ticker row beneath it. `FilterRail` is sticky below that
  (currently a magic `top-[7.5rem]` — a spec task fixes this).
- Home: `HomeHero` → `CompilationGrid` (`src/components/grid/`) renders ALL artists and all
  409 rig cards with per-artist anchor header rows, plus a sticky A–Z `LetterRail` on lg+.
- Artist page: `ArtistStrip` (title block) → `DNAChain` (horizontal rig timeline joined by a
  cyan bezier strand — the "tonal DNA") → stacked `RigDetailCard` sections.
- Filter/search state round-trips through the URL via `src/hooks/useUrlState.ts`
  (`?q=`, `?decades=`, `?sort=`).

## The work queue

The active work order is `docs/visual-overhaul/SPEC.md`. Take the first unchecked task,
top to bottom. Full protocol: `docs/visual-overhaul/LOOP_PROMPT.md`.
