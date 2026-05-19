# Suede DNA — Design Spec

> dna.suedeai.ai — a tonal-genealogy archive of guitarists' signal chains, sourced from the Guitar Geek archives, styled in the canonical Suede Sonic Laboratory aesthetic. Drafted 2026-05-19.

## 1. Concept

**Suede DNA** is a compilation site: every documented rig for every documented guitarist, indexed by year, decade, and player. The framing is institutional/archival, not editorial. Each artist's chronological chain of rigs is treated as their **tonal DNA** — a literal signal-chain genome stretched across time. The cyan trace that signals "live" everywhere else in the Suede system here doubles as the DNA strand connecting an artist's rigs across the years.

Source: <https://archive.org/download/guitargeek-archives/> — a public Internet Archive item containing ~1,000+ rig photographs of named guitarists from the mid-1960s through the early 2010s, filename pattern `{artist_slug}_guitar_rig_{year}.{ext}`.

## 2. Scope of v1

- Static Next.js site
- Three route templates: `/`, `/[artist-slug]`, `/about`
- Full SEO surface (titles, descriptions, JSON-LD, OG, sitemap, robots, canonical, semantic HTML)
- Suede Sonic Laboratory visual identity (Deep Ink + Geist + cyan-as-live-signal + oscilloscope grid + sweep-in motion)
- Build-time data ingestion: archive directory listing → `data/rigs.json` manifest
- Deployment: Vercel project `dna`, custom domain `dna.suedeai.ai`, repo `Suede-AI/dna`, pushed from JasonColapietro
- All images served from archive.org via `next/image` with `remotePatterns` (no mirror in v1)

Out of scope for v1:
- Per-rig deep pages (every rig is documented inside its artist page; no separate `/rig/[id]` routes)
- AI/vision extraction of gear lists
- User accounts, favorites, submissions
- Audio playback or sample integration
- Editorial commentary or long-form writing beyond the About page

## 3. Information architecture

```
/
├── /[artist-slug]
└── /about
```

Auxiliary routes (Next.js conventions):

- `/sitemap.xml` (generated)
- `/robots.txt` (generated)
- `/opengraph-image` (root + per-artist)
- `/not-found` (404)

### URL design

- Permanent, lowercase, hyphenated artist slugs derived from filename `artist_slug` with `_` → `-`.
- One canonical slug per artist; the `overrides.json` map fixes display name without changing the slug.
- Trailing slashes redirected (configured in `next.config.ts`).
- Canonical `<link rel="canonical">` set on every page from `process.env.NEXT_PUBLIC_SITE_URL`.

## 4. Data model and ingestion

### Filename grammar

```
{artist_slug}_guitar_rig_{year}.{ext}
```

- `artist_slug`: lowercase, `_`-joined
- `year`: 4 digits, may be absent in malformed cases (excluded from v1 if so)
- `ext` ∈ {`jpg`, `png`, `gif`}

### Manifest shape (`data/rigs.json`)

```ts
type Rig = {
  id: string;             // `{artist_slug}-{year}` (collisions disambiguated with -2, -3)
  artistSlug: string;     // route-ready slug (hyphenated)
  artistName: string;     // display name from override map, else title-cased slug
  year: number;
  src: string;            // full archive.org URL
  format: 'jpg' | 'png' | 'gif';
};

type Manifest = {
  generatedAt: string;    // ISO timestamp
  source: string;         // archive.org listing URL
  rigs: Rig[];
  artists: Array<{
    slug: string;
    name: string;
    count: number;
    yearMin: number;
    yearMax: number;
    decades: number[];    // e.g. [1960, 1970, 1980]
  }>;
};
```

### Ingestion script (`scripts/build-manifest.ts`)

1. Fetch `https://archive.org/download/guitargeek-archives/` HTML.
2. Extract all `<a href>` targets matching `*_guitar_rig_*.{jpg,png,gif}`.
3. Exclude `_thumb.*` variants.
4. Parse each filename into `{ artistSlug, year, ext }`.
5. Apply `data/overrides.json` for display names (seeded with ~30 known edge cases: bands, slashed names, numeric prefixes, etc.).
6. Group by artist; compute `yearMin`, `yearMax`, `decades`.
7. Emit `data/rigs.json` (committed) and `data/artists.json` (derived; can be regenerated).
8. Idempotent — re-running with no upstream change produces an identical file.

The manifest is committed. Build does not call archive.org. A separate `pnpm refresh-manifest` command runs the script and creates a PR-able diff.

## 5. Visual identity

The canonical Suede design language as expressed in `Suede-AI-App/launch/DESIGN.md` is adopted verbatim. No new tokens, no deviations, no new gradients, no template aesthetics.

### Palette (locked)

```
--ink-0   #000000   pure black — outer canvas
--ink-1   #050b16   Deep Ink — primary surfaces
--ink-2   #09101b   Panel Ink — cards and modals
--ink-3   #0d1726   Control Ink — inputs and controls
--white   #FFFFFF
--bone    rgba(255,255,255,0.62)
--mute    rgba(255,255,255,0.40)
--line    rgba(255,255,255,0.08)

--signal       #22d3ee   LIVE only (motion, focus, status, selection)
--signal-glow  rgba(34,211,238,0.30)
--proof        #34d399   verified state (sparingly)
--danger       #ef4444
```

Cyan = signal. Never decorative.

### Typography

- Display: Geist Sans 820, `letter-spacing: -0.02em`
- Body: Geist Sans 400/500
- Mono: Geist Mono 400/500 for labels, data, year readouts, source URLs

Loaded via `next/font/local` with subset; preload the 820 weight only.

| Use            | Scale                                       |
| -------------- | ------------------------------------------- |
| Hero headline  | `clamp(3rem, 1rem + 7vw, 8rem)`             |
| Section title  | `clamp(2rem, 1rem + 3vw, 4rem)`             |
| Body           | `clamp(1rem, 0.92rem + 0.4vw, 1.125rem)`    |
| Mono label     | `0.6875rem` (11px), uppercase, `0.08em`     |
| Data readout   | `0.875rem` (14px) mono                      |

### Geometry

- Radii: 4px controls, 6px cards, 0px hairlines
- Stroke: 1px hairlines only
- Spacing: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128
- Section vertical: `clamp(4rem, 3rem + 5vw, 10rem)`
- Page max-width: 1400px content, 1600px header

### Motion vocabulary

1. **Sweep-in** — `cubic-bezier(0.16, 1, 0.3, 1)`, 600ms component / 1200ms hero
2. **Envelope-decay** — cyan flash → white settle, 300ms
3. **Signal-pulse** — 1.5Hz, 60% → 100% opacity, sine

Reduced-motion: sweep becomes fade, pulse holds at 100%, decay holds briefly. No oscillation.

### Grid motif

Fixed 64px blueprint grid in `--line`, with a 256px highlight overlay at `rgba(34,211,238,0.05)`. Bottom-of-viewport soft cyan vignette as the page's signature.

## 6. Page designs

### 6.1 Header (sticky, 64px, hairline bottom, 12px backdrop blur)

```
[S-mark]  DNA · ARCHIVE · ABOUT      [search: artist or year]   SOURCE: archive.org/guitargeek-archives
```

- S-mark 32px (`public/suede-mark.svg` if available, else PNG)
- Nav: Geist Mono 11px uppercase, white default, cyan on hover
- Search: hairline border, cyan focus glow, mono input
- Source pill: mono `SOURCE: …`, hover underline, links to archive.org item page

Below header — single-line ticker:

```
1,247 RIGS · 312 ARTISTS · 1966 – 2010
```

Mono, no scrolling. Values come from the manifest.

### 6.2 Index `/`

1. **Hero band** (≥90vh)
   - Eyebrow (mono): `SUEDE/DNA — TONAL GENEALOGY ARCHIVE`
   - Headline (Geist 820, SVG stroke-drawn letter-by-letter, two lines):
     ```
     SIGNAL CHAINS,
     ARCHIVED.
     ```
   - Sub-headline (≤720px): "The rigs that made the records. One thousand-plus artist setups documented between 1966 and 2010, sourced from the Guitar Geek archives, indexed by year and player."
   - CTAs:
     - Primary `BROWSE THE ARCHIVE ↓` — white solid, black text, 48px, 6px radius, cyan glow `0 0 24px rgba(34,211,238,0.25)`
     - Secondary `READ THE METHOD →` — cyan outline, white text, 48px, 6px radius
   - Hero signature: bottom-edge horizontal oscilloscope waveform, 12s sweep, low-opacity cyan

2. **Sticky filter rail**
   - Decade chips: `'60s · '70s · '80s · '90s · '00s · '10s`. **Multi-select (OR)** — active chips show a cyan dot; with none selected, all decades are shown. URL reflects state via `?decades=70s,80s`.
   - Sort: `ARTIST A–Z · YEAR ↑ · YEAR ↓` (single-select; default `ARTIST A–Z`). URL: `?sort=year-asc`.
   - Search input (mirrors header search). URL: `?q=clapton`.
   - All URL params drive client state on hydration so filter combinations are shareable.

3. **Compilation grid**
   - Cards: Panel Ink #09101b, 6px radius, 1px hairline border
   - Image fills card with subtle vignette; aspect locked 4:3
   - Bottom strip (Control Ink, hairline top):
     ```
     ARTIST NAME             ↳ 1989
     ─────────────────────────────
     RIG · 042         VIEW DNA →
     ```
   - Hover: cyan border, envelope-decay flash, signal-pulse on the arrow
   - Sweep-in stagger on initial render for the first 24 cards (above-the-fold band, 30ms stagger); subsequent cards reveal via IntersectionObserver with opacity-only fade (no transform), to keep the page light

4. **Right-edge A–Z rail** (sticky on desktop, ≥1024px; hidden below 1024px — replaced by an in-grid letter divider every group)
   - Single column of letters, mono 11px, scroll-spy active letter in cyan
   - Click → smooth scrolls grid to first artist of that letter

5. **Footer**
   - Method statement (3 lines)
   - Source: `archive.org/details/guitargeek-archives` (external link, `rel="noopener"`)
   - S-mark + cyan signature line

### 6.3 Artist `/[artist-slug]`

1. **Strip header**
   - Crumb (mono): `SUEDE/DNA / [ARTIST]`
   - Geist 820 hero name (left-aligned, full hero scale)
   - Readout (mono): `N RIGS · YEAR_MIN – YEAR_MAX · DECADES_LIST`
   - Returns: `← ALL ARTISTS · PREV ARTIST ↑ · NEXT ARTIST →`

2. **The DNA chain** (this page's signature)
   - Full-width horizontal scroller on ≥768px; vertical stack on smaller screens
   - One node per rig in chronological order
   - A **single continuous cyan SVG path** threads through every node — straight horizontal at rest, with a gentle bend where the year changes by ≥5 years (visual indicator of gap). On mobile the path runs vertically.
   - Each node = small rig thumbnail (140 × 105 on desktop) + `YEAR` label + `RIG·NN` index, sweep-in on intersection observer
   - Hover: signal-pulse on node + path segment lights cyan
   - Click: smooth-scroll to the matching detail card below + anchor URL `#rig-{year}-{n}`
   - Keyboard: arrow keys traverse nodes; Enter activates

3. **Detail cards** (stacked below the chain)
   - Each rig as a full-width band, vertical rhythm `clamp(4rem, 3rem + 5vw, 10rem)`
   - Desktop: image left ~60%, mono readout right
     ```
     YEAR    1989
     FORMAT  JPG
     SOURCE  archive.org/…/filename.jpg ↗
     PREV    ← 1987
     NEXT    1991 →
     ```
   - Mobile: stacked, image on top
   - Each card is a `<article>` with `id="rig-{year}-{n}"`

4. **Footer**
   - `← ALL ARTISTS` link
   - Source attribution
   - Cyan signature line

### 6.4 About `/about`

Single full-page article. Mono crumb `SUEDE/DNA / ABOUT`. Sections:

1. **The premise** — what Suede DNA is, what "tonal genealogy" means here.
2. **The source** — the Guitar Geek archives, the Internet Archive item, why this matters as a public record.
3. **The method** — how the manifest is built, what we curate (display-name overrides), what we don't (we don't reconstruct gear lists from photos; v1 is photo + metadata only).
4. **Attribution and rights** — credit to Guitar Geek, Internet Archive terms, contact for corrections.
5. **Colophon** — built by Suede; ledger of stack choices (Next.js, Geist, archive.org); cyan signature.

### 6.5 Empty / error states

- 404 (`/not-found`): mono crumb `SUEDE/DNA / NOT FOUND`, large Geist 820 `404 — NO SIGNAL.`, body line "This rig is not in the archive.", `← BACK TO COMPILATION` link.
- Search no-results: inline replacement of grid with mono `NO MATCHES FOR "{query}"` and a `CLEAR FILTERS` button.

## 7. SEO surface

SEO is a first-class concern, not an afterthought.

### 7.1 Per-route metadata

Every route exports `generateMetadata` returning a complete shape:

```ts
{
  title: string;
  description: string;
  alternates: { canonical: string };
  openGraph: {
    title, description, url, siteName: 'Suede DNA', images: [{ url, width: 1200, height: 630 }],
    type: 'website' | 'profile';
  };
  twitter: { card: 'summary_large_image', title, description, images };
  robots: { index: true, follow: true };
}
```

#### Title templates

- Home: `Suede DNA — Signal Chains, Archived`
- Artist: `{Artist Name} — Guitar Rigs {YEAR_MIN}–{YEAR_MAX} · Suede DNA`
- About: `About · Suede DNA`

#### Description templates

- Home: "A compilation archive of guitarists' rigs and signal chains. One thousand-plus documented setups from 1966 to 2010, indexed by year and player. Suede DNA — signal chains, archived."
- Artist: "The complete rig archive for {Artist Name} — {N} setups documented between {YEAR_MIN} and {YEAR_MAX}. Photos sourced from the Guitar Geek archives. Part of Suede DNA."
- About: "How Suede DNA is sourced, structured, and attributed. The Guitar Geek archives, the Internet Archive, and the method behind the compilation."

### 7.2 Structured data (JSON-LD)

Emitted via inline `<script type="application/ld+json">` in the page head.

- **Home** — `CollectionPage` containing an `ItemList` of artists (top N, with `position`, `url`, `name`).
- **Artist** — `ProfilePage` whose `mainEntity` is a `MusicGroup` (or `Person` if the override marks them solo). The page also embeds `ItemList` of `ImageObject`s for each rig, with:
  ```ts
  {
    '@type': 'ImageObject',
    contentUrl: rig.src,
    creator: { '@type': 'Person' | 'MusicGroup', name: artist.name },
    dateCreated: String(rig.year),
    creditText: 'Guitar Geek Archives',
    isAccessibleForFree: true,
    license: 'https://archive.org/about/terms.php'
  }
  ```
  Plus a `BreadcrumbList` of Home → Artist.
- **About** — `AboutPage`.

### 7.3 Open Graph images

- Root OG: `app/opengraph-image.tsx` — programmatic 1200×630, Deep Ink canvas, Geist 820 wordmark `SUEDE / DNA`, sub `SIGNAL CHAINS, ARCHIVED.`, cyan signature stroke at bottom edge.
- Artist OG: `app/[artist-slug]/opengraph-image.tsx` — same canvas; left half is the artist's earliest documented rig (fetched at build time from archive.org and inlined into the OG response so runtime has no upstream dependency), right half is `{ARTIST NAME}` in Geist 820 + `N RIGS · YEAR_MIN – YEAR_MAX` mono. If the upstream fetch fails at build, fall back to the root OG composition.
- About OG: short copy variant.

### 7.4 Sitemap and robots

- `app/sitemap.ts` returns the full list at build time: `/`, `/about`, and one entry per artist, all with `lastModified` = manifest `generatedAt`.
- `app/robots.ts` allows all crawl, declares the sitemap URL.

### 7.5 Semantic HTML and accessibility

- `<main>` per route; nav and footer outside.
- `<article>` per rig detail card, with `aria-labelledby` pointing to the year readout.
- `<figure><img><figcaption>` for every rig image where the figcaption holds artist + year + source.
- `<time datetime="YYYY">` for every year display.
- `<nav aria-label="Main navigation">`, `<nav aria-label="Artist navigation">`, `<nav aria-label="Rig navigation">`.
- Alt text format: `"{Artist Name} guitar rig setup, {year} — Guitar Geek archive"`. No empty alt.
- All interactive elements keyboard-reachable; focus rings use the envelope-decay flash + persistent cyan outline.
- Colour contrast: white-on-Deep-Ink and mute-on-Deep-Ink both pass WCAG AA at the sizes used.

### 7.6 Internal linking

- Index → every artist (via grid + A–Z rail).
- Artist → prev/next artist (alphabetical), back to index, "all by decade" links in the readout.
- Detail card → prev/next rig (chronological within the artist).
- About ↔ index in footer.

### 7.7 Performance as SEO

The §8 performance budget is also the Core Web Vitals SEO budget. No regressions to LCP, INP, or CLS are allowed in a deploy.

## 8. Performance budget

Per the Suede web performance rules (`~/.claude/rules/ecc/web/performance.md`), microsite tier:

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |
| JS (gz) | < 80 KB |
| CSS (gz) | < 15 KB |

- All images via `next/image` with explicit width/height, AVIF/WebP, lazy below the fold, `priority` on the index hero card and each artist page's first rig.
- Geist Sans + Mono via `next/font/local`, only the 820 Sans weight is preloaded; mono and other weights load with `font-display: swap`.
- No third-party scripts in v1.
- Motion is compositor-only (`transform`, `opacity`, `clip-path`); no layout-bound animations.
- Search index ships inline as a small JSON blob (≤ 30 KB gz) and runs in-memory with a fuzzy matcher (e.g. a 1-2 KB custom matcher; no `fuse.js`).

## 9. Tech stack

- **Next.js 15** App Router + TypeScript (strict)
- **Tailwind v4** with Suede tokens as `@theme` variables
- **next/image** with `images.remotePatterns` allowing `https://archive.org/**`
- **next/font/local** for Geist Sans + Mono
- **No state library, no UI library**; the design language is hand-rolled to avoid template aesthetics
- **Motion**: CSS keyframes for sweep/pulse/decay; a thin Framer Motion footprint only if the stagger logic is cleaner with it (target: ship without it)
- **Manifest build**: a Node ESM script run as `pnpm refresh-manifest`; emits `data/rigs.json`
- **Lint/format**: Suede ECC TypeScript + web rules
- **Deployment**: Vercel project `dna`; domain `dna.suedeai.ai`; preview deploys on every PR
- **Repo**: `Suede-AI/dna`, pushed from `JasonColapietro`

## 10. Security and rights

- No user input is persisted (search is client-side only).
- CSP: `default-src 'self'; img-src 'self' https://archive.org data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; font-src 'self'` (refined during build-up).
- Headers: HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`.
- All external links use `rel="noopener noreferrer"` when `target="_blank"`.
- Attribution to Guitar Geek and Internet Archive is permanent and on every page footer + About page.
- A `/corrections` mailto link in the footer collects rights complaints and name corrections.

## 11. File layout

```
dna/
├── README.md
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── scripts/
│   └── build-manifest.ts
├── data/
│   ├── rigs.json
│   ├── artists.json
│   └── overrides.json
├── public/
│   ├── suede-mark.svg
│   ├── suede-mark.png
│   └── favicon.svg
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── sitemap.ts
    │   ├── robots.ts
    │   ├── opengraph-image.tsx
    │   ├── not-found.tsx
    │   ├── globals.css
    │   ├── about/
    │   │   ├── page.tsx
    │   │   └── opengraph-image.tsx
    │   └── [artist-slug]/
    │       ├── page.tsx
    │       └── opengraph-image.tsx
    ├── components/
    │   ├── header/
    │   ├── grid/
    │   ├── chain/                 # DNA chain SVG + nodes
    │   ├── filters/
    │   ├── search/
    │   ├── readout/
    │   └── footer/
    ├── lib/
    │   ├── manifest.ts            # typed access to data/rigs.json
    │   ├── slug.ts
    │   ├── seo.ts                 # metadata + JSON-LD helpers
    │   └── motion.ts              # sweep-in/decay helpers
    └── styles/
        └── tokens.css
```

## 12. Verification (before any merge)

- `pnpm typecheck` clean
- `pnpm lint` clean
- `pnpm build` succeeds with no warnings
- Lighthouse on `/` and a sample `/[artist-slug]` page: Performance ≥ 95, Accessibility ≥ 95, SEO = 100, Best Practices ≥ 95
- `next-sitemap` (or equivalent) produces a valid sitemap referencing every artist
- Manual visual check at 320 / 768 / 1024 / 1440 / 1920
- `prefers-reduced-motion: reduce` honoured
- Keyboard-only walk-through of header, grid, filters, A–Z rail, artist DNA chain, detail cards
- Screen-reader spot check: landmark structure, image alt text, time elements

## 13. Out-of-scope / future

- Per-rig pages with neighbour navigation (only relevant if/when we add gear-list extraction)
- AI vision pass to extract gear lists from each photo → `Recipe` objects with structured ingredients
- Reader submissions / corrections workflow
- Audio: linking rigs to representative recordings
- Cross-references: which players used which gear (requires the vision pass)
- Mirror images to Vercel Blob if archive.org latency becomes a problem

## 14. Open items (resolve before / during implementation)

- **About-page copy** — draft after scaffold; ~300 words, technical voice.
- **Display-name overrides** — seed list of ~30 known edge cases; extended via PR over time.
- **DNS** — `dna.suedeai.ai` to be CNAMEd to Vercel after the first preview deploy.
- **Refresh cadence** — manual `pnpm refresh-manifest` for v1; no cron yet.
- **Rights** — confirm the Guitar Geek archive's licensing posture is compatible with display-with-attribution; if any rights holder asks for removal, a `data/excludes.json` mechanism is the lever (out of scope to design v1, but called out).
