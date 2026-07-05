# Suede DNA — Visual Overhaul + Search Spec

Working checklist for the autonomous Codex loop (see `LOOP_PROMPT.md` beside this file).
Goal: make dna.suedeai.ai feel like a precision archival instrument — and make search
actually good. Phases are ordered by priority: **work tasks top to bottom.**

## How to work this file

- Take the **first `[ ]` task**, top to bottom. One task per iteration, one commit.
- Every task: implement → run gates (`pnpm typecheck && pnpm lint && pnpm test && pnpm build`)
  → flip `[ ]` to `[x]` → append a line to the Iteration Log at the bottom → commit.
- If a task is impossible in the sandbox, flip it to `[!]` with a reason in the log,
  commit the spec change, and let the next iteration take the next task.
- Obey `AGENTS.md` at the repo root at all times. Read every file a task names before editing it.

---

## Phase 1 — Search that actually works (P0)

### [x] 1.1 Wire the ranked search into the live grid

**Now:** Two search paths disagree. `src/lib/search.ts` has `searchArtists` — scored
(exact 100 / prefix 80 / word 60 / substring 40) with 4-digit **year queries** matching
an artist's `yearMin..yearMax` — but it is **dead code**: only tests import it. The live
grid (`src/components/grid/CompilationGrid.tsx`) filters via `filterArtists` in
`src/lib/filters.ts`, which is a plain `name.includes(q)` — no ranking, and typing `1997`
into the real UI finds nothing.

**Build:** Make `src/lib/search.ts` the single source of truth. `filterArtists` (or a new
combined function) must delegate text + year matching to it. Ordering: when `q` is a text
query, results are in **relevance order** and the sort control is visually disabled
(`aria-disabled`, muted) since relevance owns the order; when `q` is empty or a pure year
query, the selected `sortArtists` order applies as today.

**Accept:** Typing a 4-digit year in the UI filters artists whose range covers it; a
prefix match ranks above a mere substring match; sort control disables during text search;
`tests/lib/filters.test.ts` + `tests/lib/search.test.ts` updated and green; gates green.

### [x] 1.2 Normalize queries and names

**Now:** Matching is raw lowercase. `"311 tim"` fails against `"311 — Tim Mahoney"`
(em dash), diacritics can't be typed, punctuation breaks matches, token order matters.

**Build:** Add a `normalize()` in `search.ts`: lowercase → Unicode NFD + strip combining
marks → punctuation (`— – - _ ' ’ . / &`) to spaces → collapse whitespace. Multi-token
queries: every query token must match somewhere (AND), order-insensitive; score each token
against name tokens (prefix > substring) and sum.

**Accept:** `"311 tim"`, `"tim mahoney"`, and `"day remember"` each find the right artist
from `data/artists.json`; tests cover em dash, apostrophe, a diacritic, and reversed token
order; gates green.

### [x] 1.3 Typo tolerance tier

**Now:** `"hendrx"` or `"vaughn"` (for "Vaughan") return nothing.

**Build:** A fallback fuzzy tier in `search.ts`, hand-rolled (no deps): a query token also
matches a name token within Damerau–Levenshtein distance 1 (token length ≥ 4; allow
distance 2 at length ≥ 8), with early-exit bounds. Fuzzy scores **below every exact tier**
so typos never outrank real matches.

**Accept:** Pick 3 real artists from `data/artists.json` and prove one-typo queries find
them (e.g. a dropped letter, a swapped pair, a wrong vowel); exact matches still rank
first; edit-distance helper unit-tested; gates green.

### [x] 1.4 Search input UX: shortcuts, clear, count, debounce

**Now:** `src/components/search/SearchInput.tsx` is a bare input. No clear button, no
keyboard shortcut, no result feedback, and every keystroke re-filters and re-renders the
full 409-card grid synchronously.

**Build:** Keep the input controlled and instant, but defer the expensive filter with
`useDeferredValue` (or a ~150ms debounce) in `CompilationGrid`. Add: an ✕ clear button
(visible only when `q` is set); `/` and `⌘K`/`Ctrl+K` focus the search from anywhere
(ignored while typing in an input); `ESC` clears then blurs; a `kbd`-styled `/` hint chip
inside the field; `React.memo` on `RigCard`. Show a live result line near the FilterRail —
`N ARTISTS · M RIGS` — in an `aria-live="polite"` region.

**Accept:** Shortcuts work and don't fire inside inputs; count line updates with filters
and search; RigCard memoized; any new pure logic (e.g. count derivation) unit-tested;
gates green.

### [x] 1.5 Match highlighting + smart empty state

**Now:** No indication of *why* a result matched. The empty state is a bare
"NO MATCHES" line with a clear button.

**Build:** In the grid's artist header rows, wrap matched spans in `<mark>` styled with a
signal-tinted underline/color on transparent background (AA contrast — not cyan-on-white).
Upgrade the empty state: reuse the fuzzy scorer to offer up to 3 "DID YOU MEAN" artist
names as buttons that set `q`; keep CLEAR FILTERS. Extract a pure
`suggestArtists(artists, q)` into `search.ts`.

**Accept:** Searching a real artist shows highlighted spans; a one-typo query's empty
state suggests the right artist; `suggestArtists` unit-tested; gates green.

### [x] 1.6 Alias layer

**Now:** Nickname queries fail — the archive's names are literal (e.g. searching a common
abbreviation like "SRV" or "EVH" finds nothing if the dataset spells the full name).

**Build:** `src/lib/aliases.ts`: a typed, hand-curated `Record<slug, string[]>` (≤ 20
entries, header comment explaining curation). Verify each slug exists in
`data/artists.json` before adding it; only include aliases genuinely shorter/different
from the name (SRV-style abbreviations, "EVH", common alternate spellings). Search
consults aliases at the word-match tier.

**Accept:** ≥ 5 aliases resolve in tests against real slugs; unknown slugs in the map are
impossible (test iterates the map and asserts every slug exists in the manifest);
gates green.

---

## Phase 2 — Show the diagrams properly (P1)

### [x] 2.1 Stop cropping rig diagrams in the grid

**Now:** `src/components/grid/RigCard.tsx` uses `aspect-[4/3]` + `object-cover`, which
decapitates tall/wide rig scans, plus a darkening gradient over the image bottom.

**Build:** Keep the uniform 4:3 frame (grid rhythm) but switch to `object-contain` on a
`--color-ink-3` backing with slight inner padding — a "specimen slide" look. Remove the
gradient overlay (no text sits on the image). Verify `sizes` stays correct.

**Accept:** No rig content is cropped in the card frame; gradient gone; gates green; log
notes this needs a visual spot-check by Jason.

### [x] 2.2 Never crop on the artist page either

**Now:** `RigDetailCard.tsx` (the page's hero artifact) is `aspect-[4/3]` + `object-cover`;
`DNAChain.tsx` node thumbs are also `object-cover`.

**Build:** RigDetailCard: natural presentation — `object-contain` inside a frame capped at
`max-h-[75vh]` on ink-3 with the card radius token. DNAChain thumbs: `object-contain` on
ink-3.

**Accept:** Detail images never cropped; very wide scans don't collapse the layout
(min-height on the frame); gates green.

### [x] 2.3 Image loading + failure polish

**Now:** No placeholders; archive.org is slow and occasionally down, leaving broken-image
glyphs.

**Build:** A shared client component `src/components/media/RigImage.tsx` wrapping
`next/image`: CSS shimmer skeleton (ink-2 → ink-3 sweep; static under reduced motion)
until `onLoad`, fade-in on load, and an `onError` fallback tile — hairline box with
mono-label `SOURCE OFFLINE`, the year, and an `OPEN ON ARCHIVE.ORG ↗` link to `rig.src`.
Adopt it in `RigCard`, `RigDetailCard`, and `DNAChain`.

**Accept:** One shared component used in all three; error path unit-tested (force error,
assert fallback + link render); gates green.

### [ ] 2.4 Card hover/focus language

**Now:** Hover is only a 90% image opacity dip and a label color swap.

**Build:** For `RigCard` and `DNAChain` nodes: hover = hairline border shifts toward
signal, a low-opacity `0 0 24px var(--color-signal-glow)` shadow, `translateY(-2px)` lift,
and the `VIEW DNA →` arrow nudges right — all with token durations/easing.
`:focus-visible` mirrors hover. Reduced motion: color/border only, no transform.

**Accept:** Pure CSS (no JS), tokens only, applied to both surfaces; gates green.

### [ ] 2.5 Zoom lightbox for diagrams

**Now:** No way to read a dense rig schematic full-screen — the single biggest missing
feature for a diagram archive.

**Build:** Dependency-free `<dialog>` lightbox (`src/components/media/Lightbox.tsx`):
opens from the RigDetailCard image (click) and an explicit `OPEN FULL SIZE` mono button;
ink-0 backdrop; zoom via +/− buttons and double-click (2–3 steps), pan by drag when
zoomed; `←`/`→` steps through the artist's rigs; ESC and backdrop click close; native
dialog focus trap, `aria-modal`, focus returns to the opener. Use a plain `<img>` with the
full-res archive URL inside the dialog.

**Accept:** Fully keyboard operable (open, zoom, navigate, close); no new deps;
open/close + prev/next logic unit-tested where feasible; gates green.

---

## Phase 3 — The archive grid as an instrument (P1)

### [ ] 3.1 Letter dividers + artist header redesign

**Now:** Per-artist anchor rows in `CompilationGrid.tsx` are plain mono lines; 409 cards
read as an undifferentiated wall.

**Build:** When sort is A–Z and no search is active: insert one letter divider row per
initial — an oversized ghost letter (`--text-section` scale, low-opacity white) beside a
hairline rule. Restyle artist header rows: artist name in white medium weight + mono chips
for `N RIGS · YYYY–YYYY`. Keep `artist-anchor-{slug}` ids stable for the LetterRail.

**Accept:** Dividers appear only in unfiltered A–Z view; letter jump still lands
correctly; gates green.

### [ ] 3.2 LetterRail scroll-spy + disabled letters

**Now:** `LetterRail.tsx` highlights a letter only after you click it, and letters with no
artists are still clickable no-ops.

**Build:** IntersectionObserver over the artist anchors updates `activeLetter` while
scrolling. Letters absent from the *current filtered* artist set render disabled
(opacity ~0.25, `aria-disabled`, no-op). Smooth scroll only when motion is allowed.

**Accept:** Rail tracks scroll position; disabled letters inert and update with filters;
letter-availability derivation extracted pure + unit-tested; gates green.

### [ ] 3.3 Header-height system (kill the magic sticky offsets)

**Now:** FilterRail hardcodes `top-[7.5rem]`; anchors hardcode `scroll-mt-32`; the header
is a 64px bar + ticker. Offsets drift whenever chrome changes, and mobile overlap is
unverified.

**Build:** Define `--header-h` (and `--filter-rail-h`) in `tokens.css`; derive all sticky
tops and `scroll-margin-top`s from them. Check 375px: ticker + filter rail must not
overlap content or wrap brokenly; fix what you find.

**Accept:** Zero hardcoded sticky offsets remain (grep proves it); gates green; log notes
mobile spot-check for Jason.

### [ ] 3.4 Active-filter feedback row

**Now:** Active decade chips + a search term give no combined feedback and no per-facet
removal.

**Build:** A summary line in/under the FilterRail, only when non-default state:
`3 ARTISTS · 5 RIGS — '90S ✕ · "HENDRIX" ✕` — each fragment a button removing that facet
(this can absorb the count line from 1.4 — one `aria-live` region total). Extract a pure
`summarizeFilters(state, counts)` helper.

**Accept:** Facets individually removable; hidden at default state; helper unit-tested;
gates green.

### [ ] 3.5 Grid render performance

**Now:** All 409 cards render eagerly; filter changes re-render everything.

**Build:** `content-visibility: auto` + `contain-intrinsic-size` on card wrappers (via a
utility class); confirm `RigCard` memoization from 1.4 held; keys stay `rig.id`. No
virtualization library.

**Accept:** Utility applied; no CLS regressions from intrinsic sizing (reasonable
estimate documented); gates green.

---

## Phase 4 — Artist page: the genome view (P2)

### [ ] 4.1 DNAChain strand upgrade

**Now:** `DNAChain.tsx` spaces nodes evenly regardless of year gaps; the strand is a flat
1px bezier; no year axis; overflow gives no affordance.

**Build:** Space nodes proportionally to year gaps (clamped min/max spacing so 1-year and
10-year gaps differ visibly but bounded); add baseline year tick marks + mono labels; edge
fade masks left/right plus a `SCROLL →` mono hint when `scrollWidth > clientWidth`; a slow
traveling pulse dot along the path (CSS `offset-path`; none under reduced motion).

**Accept:** `computeDNAPath`/position math covered by updated `tests/components/DNAPath.test.tsx`
(proportional spacing asserted); gates green.

### [ ] 4.2 Chain ↔ sections scroll-sync

**Now:** Chain nodes don't know which rig section you're reading.

**Build:** IntersectionObserver on `RigDetailCard` sections marks the corresponding chain
node active — signal ring + brightened year label; keep anchor-click smooth scroll (auto
under reduced motion).

**Accept:** Active node follows scroll on artists with 2+ rigs; single-rig artists
unaffected; gates green.

### [ ] 4.3 RigDetailCard as a specimen sheet

**Now:** Meta column is a plain `dl`; prev/next are bare year links; no tie-in to the
lightbox; no index context.

**Build:** On md+: meta column sticky (top from `--header-h`). Style the `dl` as a
bordered specimen label (hairline box, row separators). Add `RIG 002 / 005` index line,
an `OPEN FULL SIZE` button wired to the 2.5 lightbox, and prev/next links showing year +
a small thumb.

**Accept:** Holds for 1-rig artists (no sticky jank, no prev/next); gates green.

### [ ] 4.4 ArtistStrip context

**Now:** `ArtistStrip.tsx` shows name/count/years but no position in the archive, and its
decade text isn't actionable.

**Build:** Add `ARTIST 213 / 390` (alphabetical index from the manifest, pure helper +
test); make decade chips link to `/?decades=1990` (already decoded by `useUrlState`);
keep the breadcrumb.

**Accept:** Links round-trip through URL state; index helper tested; gates green.

---

## Phase 5 — Hero + chrome (P2)

### [ ] 5.1 Hero signal-chain diagram

**Now:** The hero's right half is empty; the only graphic is the bottom waveform.

**Build:** An `aria-hidden` inline SVG signal chain on lg+ (hidden below): hairline node
boxes labeled in mono — `GUITAR → FUZZ → DELAY → AMP` — joined by a cyan strand with a
traveling pulse dot (SMIL or CSS `offset-path`; static under reduced motion). < 6KB, no
images, no layout shift (reserved space).

**Accept:** Pure SVG/CSS; hidden on mobile; hero LCP text unaffected; gates green.

### [ ] 5.2 Waveform depth

**Now:** `HeroWaveform.tsx` is a single 1px path at 0.4 opacity.

**Build:** Add a second phase-shifted path at lower opacity and a gradient stroke
(signal → transparent) on the primary; keep the 12s loop; total SVG < 2KB; static under
reduced motion (existing hook).

**Accept:** Gates green; reduced-motion renders static single-frame.

### [ ] 5.3 Stats count-up (SEO-safe)

**Now:** Hero stat line and ticker are static text.

**Build:** Once-on-view count-up (~600ms, `tabular-nums`) for the hero stat line ONLY —
and it must be SEO-safe: SSR/no-JS shows the final real numbers; the animation may only
run client-side after mount, animating from a lower value up to the already-rendered
number. Instant under reduced motion. Ticker stays static.

**Accept:** View-source shows real numbers; no hydration mismatch warnings in build;
runs once; gates green.

### [ ] 5.4 Header scroll elevation + nav state

**Now:** Header is a constant translucent bar; nav links have no current-page state.

**Build:** After ~8px scroll set a `data-scrolled` attribute (tiny client hook): deepen bg
(`ink-1`/90) and brighten the border slightly. Add `aria-current="page"` styling to nav
(DNA vs ABOUT). Ticker's source note truncates with ellipsis on small screens.

**Accept:** No layout shift on state change; nav reflects route; gates green.

### [ ] 5.5 404 rescue page

**Now:** `src/app/not-found.tsx` is minimal.

**Build:** Style it as an archive miss: `SIGNAL LOST` treatment, a search input that
submits to `/?q=…`, and top links (BROWSE THE ARCHIVE / ABOUT). Note: App Router
`not-found` can't read the missed URL — no slug-based suggestions; don't fake it.

**Accept:** Search submit lands on home with `q` applied via URL state; gates green.

---

## Phase 6 — Motion, accessibility, wrap-up (P3)

### [ ] 6.1 View transitions (attempt; revert-safe)

**Build:** Try Next 15's experimental `viewTransition` flag for grid → artist navigation
(cards morphing into the artist page is the dream; a crossfade is acceptable). This is the
one experimental task: if types/build/tests object, revert to zero diff and mark `[!]`
with the error in the log.

**Accept:** Either gates green with the flag on and no console errors — or a clean `[!]`
with reasoning and no leftover diff.

### [ ] 6.2 Scroll reveals for detail sections

**Build:** IO-driven one-time sweep-in for `RigDetailCard` sections and Phase 3 letter
dividers: translate ≤ 12px, stagger ≤ 120ms, and **no-JS safe** (content default-visible;
hide-then-reveal only arms after hydration). Global reduced-motion override already
neutralizes it.

**Accept:** Content visible with JS disabled (reason it through and note it); gates green.

### [ ] 6.3 Contrast + focus audit

**Now:** `--color-mute` is 0.40-alpha white (~3.2:1 on ink) and is used for *meaningful*
text (card index labels, placeholder, ticker source).

**Build:** Add `--color-mute-readable` (~0.55 alpha) to tokens; move meaningful small text
to it (or to `bone`); leave true decoration at `mute`. Sweep every interactive element for
a visible `:focus-visible` ring (chips, rail, cards, dialog, clear buttons).

**Accept:** Token added + applied; changed surfaces listed in the log; gates green.

### [ ] 6.4 Keyboard sweep + skip link

**Build:** A `SKIP TO ARCHIVE` skip link first in tab order (visually hidden until
focused); LetterRail arrow-key navigation (↑/↓ move focus, Enter jumps);
`aria-keyshortcuts` on the search input; confirm lightbox arrows and search shortcuts
don't collide.

**Accept:** Manual test steps documented in the log; gates green.

### [ ] 6.5 Wrap-up sweep

**Build:** Fresh full gate run; update README "What's in here" to mention ranked/fuzzy
search, the lightbox, and the upgraded chain; append a CHANGELOG-style summary of the
whole overhaul to the Iteration Log; grep for leftover TODOs from earlier tasks and
resolve or log them.

**Accept:** Gates green; README updated; final summary written. Only after this task may
the loop print its completion sentinel.

---

## Iteration Log

<!-- One line per iteration: task id — what changed — files touched — gates result. -->
- 1.1 — wired live filtering to ranked/year-aware search and disabled sort while text relevance owns ordering — src/lib/search.ts, src/lib/filters.ts, src/components/grid/CompilationGrid.tsx, src/components/filters/FilterRail.tsx, tests/lib/search.test.ts, tests/lib/filters.test.ts — gates: green.
- 1.2 — normalized punctuation/diacritics and made multi-token search order-insensitive — src/lib/search.ts, tests/lib/search.test.ts, docs/visual-overhaul/SPEC.md — gates: green.
- 1.3 — added bounded Damerau-Levenshtein fuzzy token fallback below exact tiers — src/lib/search.ts, tests/lib/search.test.ts, docs/visual-overhaul/SPEC.md — gates: green.
- 1.4 — added deferred grid filtering, search shortcuts/clear, live result counts, and memoized rig cards — src/components/search/SearchInput.tsx, src/components/grid/CompilationGrid.tsx, src/components/filters/FilterRail.tsx, src/components/grid/RigCard.tsx, src/lib/filters.ts, tests/lib/filters.test.ts, docs/visual-overhaul/SPEC.md — gates: green.
- 1.5 — highlighted artist-name token matches and added did-you-mean suggestion buttons — src/components/grid/CompilationGrid.tsx, src/lib/search.ts, tests/lib/search.test.ts, docs/visual-overhaul/SPEC.md — gates: green.
- 1.6 — added curated manifest-validated alias map for shorthand/alternate guitarist queries — src/lib/aliases.ts, src/lib/search.ts, tests/lib/search.test.ts, docs/visual-overhaul/SPEC.md — gates: green.
- 2.1 — changed grid rig images to contained specimen-slide frames and removed the image gradient; needs Jason visual spot-check — src/components/grid/RigCard.tsx, docs/visual-overhaul/SPEC.md — gates: green.
- 2.2 — changed detail and DNA-chain rig images to contained ink-backed frames with a capped detail viewport — src/components/artist/RigDetailCard.tsx, src/components/artist/DNAChain.tsx, docs/visual-overhaul/SPEC.md — gates: green.
- 2.3 — added shared RigImage shimmer/fallback component across grid, detail, and DNA chain — src/components/media/RigImage.tsx, src/app/globals.css, src/components/grid/RigCard.tsx, src/components/artist/RigDetailCard.tsx, src/components/artist/DNAChain.tsx, tests/components/RigImage.test.tsx, docs/visual-overhaul/SPEC.md — gates: green.
