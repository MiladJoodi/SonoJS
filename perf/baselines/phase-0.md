# Phase 0 baseline — production performance

**Date:** 2026-11-04  
**Build ID:** `EKZa7tcfvEznMGATF4A0G`  
**Next.js:** 16.2.6 (Turbopack production build)  
**Server:** `next start -p 3001` (local)

## Tooling added (behavior-neutral)

| Item | Purpose |
|---|---|
| `@next/bundle-analyzer@16.2.6` | Opt-in via `ANALYZE=true` |
| `npm run build:analyze` → [`scripts/build-analyze.mjs`](../../scripts/build-analyze.mjs) | Webpack + analyzer; default `npm run build` unchanged |
| [`scripts/measure-route-js.mjs`](../../scripts/measure-route-js.mjs) | Approximate First Load JS from Turbopack manifests |
| Gated analyzer require in [`next.config.ts`](../../next.config.ts) | No analyzer unless `ANALYZE=true` |

> Turbopack route table no longer prints classic “First Load JS” columns. Baseline JS sizes come from summing unique `static/chunks/*.js` referenced by each route’s `page_client-reference-manifest.js` plus shared `rootMain`/`polyfill` files. Method: `node scripts/measure-route-js.mjs` → [`phase-0-js.json`](./phase-0-js.json).

## Approximate First Load JS

| Route | First Load (approx) | Route chunks | Shared root | Client-ref manifest |
|---|---:|---:|---:|---:|
| `/blocks/authentication/login` | **1522 KB** | 1521 KB (28) | 558 KB | 258 KB |
| `/blocks/marketing/faq` | **1530 KB** | 1529 KB (28) | 558 KB | 262 KB |
| `/charts` | **1439 KB** | 1438 KB (26) | 558 KB | 198 KB |
| `/charts/view/[id]` | **1439 KB** | 1438 KB (26) | 558 KB | 208 KB |

### Client graph checks (from manifests)

- **Login:** all `login-01` … `login-16` appear in the client-reference manifest (2 hits each) — confirms all 16 variants ship in the route client graph.
- **Charts gallery:** `demo-loaders` = 0, `recharts` = 0, `highcharts` = 0, `ChartDemo` = 0; `chart-demo` string = 2 (path mention only). Phase 2 still worth confirming with analyzer HTML after webpack analyze build.

## Hard navigation TTFB (`next start`, warm, 3 samples)

Source: [`phase-0-ttfb.json`](./phase-0-ttfb.json)

| Path | Avg TTFB | Body bytes | Samples (ms) |
|---|---:|---:|---|
| `/blocks/authentication/login` | 295 ms | 399 022 | 310, 290, 285 |
| `/blocks/marketing/faq` | 379 ms | 515 841 | 356, 434, 346 |
| `/charts` | 303 ms | 436 166 | 305, 309, 296 |
| `/charts/view/simple-bar-chart` | **725 ms** | 641 956 | 755, 704, 715 |
| `/docs` (control) | 65 ms | 73 038 | 65, 62, 68 |

## Browser Navigation Timing (cold-ish hard load, Chromium automation)

| Path | TTFB | FCP | DCL | `load` |
|---|---:|---:|---:|---:|
| `/blocks/authentication/login` | 218 ms | 440 ms | 401 ms | 1410 ms |
| `/charts` | 218 ms | 400 ms | 395 ms | **6017 ms** (many thumb images) |

- **LCP / INP:** not reliably captured in this automation session (`largest-contentful-paint` entries empty without buffered PerformanceObserver). Treat as **not measured** for Phase 0; re-measure in Chrome DevTools Performance after Phase 1.
- Soft-nav timing via in-page `<Link>` clicks was flaky in automation (URL often unchanged before snapshot). Prefer DevTools “soft navigation” / Web Vitals extension for Phase 1 comparison.

## Build notes (for reproducibility)

1. Corrupted `.next/dev/types/routes.d.ts` (truncated `erRoute extends…`) poisoned production typecheck when `next dev` artifacts mixed with `next build`. **Fix:** delete `.next/dev` (or full `.next`) before production build.
2. Empty/broken `node_modules/shiki` blocked earlier builds; reinstalled `shiki@4.6.0`.
3. `process.cwd()` NFT warning still appears for `docs-variant-examples` → `next.config` trace; `/* turbopackIgnore: true */` added on several `cwd` joins. Build still succeeded.
4. Webpack `build:analyze` still needs a clean successful webpack pass for interactive analyzer HTML (shiki resolution under `transpilePackages` was flaky earlier). Prefer Turbopack metrics + `measure-route-js.mjs` for Phase 1 deltas unless analyzer HTML is required.

## Pass criteria

- [x] Analyzer wired without changing default `npm run build` behavior  
- [x] Production build succeeded (`BUILD_ID` present)  
- [x] First Load approx recorded for Login, FAQ, Charts, Chart View  
- [x] Production TTFB recorded  
- [ ] Full LCP/INP + soft-nav Lab numbers — deferred to manual/DevTools in Phase 1 validation  

**Phase 0 gate: PASS for proceeding to Phase 1 (Login),** with the caveat that soft-nav/LCP/INP Lab baselines should be captured in Chrome before claiming Phase 1 wins.
