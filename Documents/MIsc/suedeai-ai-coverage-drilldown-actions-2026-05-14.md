# suedeai.ai Coverage Drilldown Action List - 2026-05-14

Source: `suedeai.ai-Coverage-Drilldown-2026-05-14.xlsx`.

Drive note: the Google Drive connector search/recent-file calls failed with `Unknown tool`, and no Google Drive Desktop mirror was found under `~/Library/CloudStorage`, so this pass used the synced iCloud mirror at `/Users/jason/Library/Mobile Documents/com~apple~CloudDocs/suedeai.ai-Coverage-Drilldown-2026-05-14.xlsx`.

Issue in sheet: `Discovered - currently not indexed`.

| Affected route | Likely issue type | Status / fix |
| --- | --- | --- |
| `/founder` | Discovery lag after page/sitemap changes | Live URL returns `200`; sitemap includes route. No code change needed. |
| `/jason-colapietro-images/jason-colapietro-suede-ai-fun-closeup` | Deep media page discovery lag | Live URL returns `200`; sitemap includes route. No code change needed. |
| `/manifesto` | Discovery lag after page/sitemap changes | Live URL returns `200`; sitemap includes route. No code change needed. |
| `/rewards` | Apex route redirected to `app.suedeai.ai/rewards`, so Google discovered a public URL that was not an indexable `suedeai.ai` page and was missing from sitemap | Fixed: removed the apex redirect, added a crawlable `/rewards` page, added canonical/OG/schema, added `/rewards` to sitemap, and updated apex internal links to point at `/rewards`. |
| `/vaults/create` | Discovery lag after page/sitemap changes | Live URL returns `200`; sitemap includes route. No code change needed. |

Files changed for the active issue:

- `/Users/jason/Documents/Ramboed/Suede-AI-App/suede-home/next.config.ts`
- `/Users/jason/Documents/Ramboed/Suede-AI-App/suede-home/src/app/rewards/page.tsx`
- `/Users/jason/Documents/Ramboed/Suede-AI-App/suede-home/src/app/sitemap.ts`
- `/Users/jason/Documents/Ramboed/Suede-AI-App/suede-home/src/app/homepage/HomePage.tsx`
- `/Users/jason/Documents/Ramboed/Suede-AI-App/suede-home/src/app/homepage/ExploreDropdown.tsx`
- `/Users/jason/Documents/Ramboed/Suede-AI-App/suede-home/src/app/homepage/HomeHeader.tsx`

Verification:

- `npx eslint src/app/rewards/page.tsx src/app/sitemap.ts src/app/homepage/HomePage.tsx src/app/homepage/ExploreDropdown.tsx src/app/homepage/HomeHeader.tsx`
- `npm run build`
- Local route checks: `/rewards`, `/sitemap.xml`, and `/robots.txt` return `200`.
- Local sitemap contains `/founder`, `/manifesto`, `/vaults/create`, `/rewards`, and `/jason-colapietro-images/jason-colapietro-suede-ai-fun-closeup`.
- Browser QA at `http://127.0.0.1:3068/rewards` passed desktop/mobile page identity, nonblank render, and console error checks.
