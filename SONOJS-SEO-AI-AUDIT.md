# SonoJS SEO & AI Search Visibility Audit

**Target:** https://sonojs.com  
**Repository:** https://github.com/MiladJoodi/SonoJS (origin remote, local clone at `E:\SonoJS`)  
**Framework:** Next.js 16.2.6 (App Router) · React 19 · Tailwind CSS v4 · deployed on Vercel  
**Audit date:** 2026-11-26  
**Author:** Cline (AI coding agent)

---

## 0. Executive Summary

SonoJS is a modern, well-engineered Next.js component/block/catalog site whose **code-level SEO foundation is strong**: server-side rendering by default, centralized metadata (`lib/seo.ts`), per-page titles/descriptions/canonicals, Open Graph + Twitter Cards, JSON-LD (Website/Organization/BreadcrumbList), Google Tag Manager, dynamic `sitemap.xml` + `robots.txt`, and noindex on auth/pricing/account pages.

**The biggest gaps are AI-visibility and entity-related:** no `/about` page (thin brand/entity signal for LLMs), no `llms.txt`, no `Product`/`SoftwareApplication` schema on template/website/block pages, and only root-level JSON-LD. A secondary crawl-health item: legacy `/marketplace/*` URLs still appear in Google's index even though they now redirect to `/templates`.

**Production verification status:** direct fetches to `sonojs.com` (homepage, `robots.txt`, `sitemap.xml`) **timed out** during this audit. All external/live observations below (robots.txt content, sitemap URLs, rendered HTML, canonicals, indexed-page count, Core Web Vitals, backlinks) are **unverified** and should be treated as assumptions until the site is reachable again or checked via Google Search Console. Code-level findings (this repo) are **confirmed**.

---

## 1. Audit Scope & Methodology

### 1.1 Scope

| In scope | Out of scope |
|---|---|
| Local source-code inspection of Next.js App Router pages, layouts, metadata, SEO components, sitemap/robots generation | Paid SEO tooling (Ahrefs, SEMrush, Screaming Frog crawl) |
| `lib/seo.ts` metadata helper and every route under `app\(app)` | Real-user monitoring / RUM data |
| `components/seo/json-ld.tsx` and `components/google-tag-manager` | Accessibility audit (beyond focus/contrast notes) |
| `lib/docs-nav.ts`, `lib/tools-nav.ts`, `lib/templates-preview-data.ts` (internal linking) | Content copywriting / keyword research |
| `scripts/registry-items.mjs`, `scripts/build-registry.mjs`, `public/r/` (registry payload) | Server logs / log-file analysis |
| Web-search signals for external presence (indexed pages, GitHub, npm, social) | Competitor benchmarking |

### 1.2 Methodology

1. **Architecture discovery** — read every page/layout under `app\(app)`, SEO components, config files, and registry build scripts (confirmed via local file reads).
2. **Metadata audit** — verified every inspected route exports `metadata` or `generateMetadata` with title, description, canonical, OG/Twitter tags via `pageMetadata()`.
3. **Structured-data audit** — read `components/seo/json-ld.tsx` and traced its usage in root layout + docs layouts.
4. **Crawl-control audit** — read `next.config.ts` (`generateRobots`, `generateSitemaps`), per-page `robots` meta (noindex on gated pages), and `generateStaticParams` usage.
5. **External signals** — web search for `site:sonojs.com`, GitHub repo, npm `@sonojs/ui`, DEV.to/Medium articles, LinkedIn.
6. **Production verification** — attempted direct fetch of `https://sonojs.com/`, `/robots.txt`, `/sitemap.xml`; **all timed out** (30s). Marked unverified.

### 1.3 Severity definitions

- **Critical** — blocks crawling/indexing or causes major ranking loss; fix before anything else.
- **High** — meaningful SEO/AI-visibility loss; fix in next sprint.
- **Medium** — improves visibility/rich results; plan for near term.
- **Low** — polish / best practice; nice to have.

Effort: **Low** (<1 day), **Medium** (1–3 days), **High** (1+ week).

## 2. Technical SEO Findings (code-level, confirmed unless noted)

### 2.1 Rendering strategy — SSR by default (confirmed, strength)

Next.js App Router: all route segments under `app\(app)` export Server Components by default. HTML is generated on the server → bots and AI crawlers receive full markup in the initial response. Dynamic routes use `generateStaticParams()` (charts categories, templates slugs, cursor categories), producing prerendered HTML. Client-only islands (hero chart, loader, command bar) do not shell out the whole page.

**Evidence:** `app\(app)\page.tsx`, `app\(app)\charts\[category]\page.tsx`, `app\(app)\templates\[slug]\page.tsx`, `components/home/home-hero.tsx`.

**Severity:** n/a (positive). **Impact:** High — crawlable, indexable HTML. **Action:** none.

### 2.2 Metadata layer — centralized and consistent (confirmed, strength)

Single helper `pageMetadata()` in `lib/seo.ts` builds title template, description, openGraph, twitter, alternates.canonical, robots, theme-color, creator. Every inspected page has unique title + description: `/`, `/docs/*`, `/blocks/*`, `/charts/*`, `/cursors/*`, `/templates`, `/templates/[slug]`, `/websites`, `/tools`, `/contact`, `/legal/*`, `/pricing`, `/auth/*`. OG + Twitter Card tags on every page.

**Severity:** n/a (positive). **Impact:** High. **Action:** none.

### 2.3 Canonical URLs (confirmed in code, unverified live)

`pageMetadata()` emits `alternates: { canonical: path }` on every inspected page (resolved by Next.js to absolute `https://sonojs.com<path>`). **Unverified:** live HTML renders absolute canonicals; `og:url` match.

**Severity:** n/a. **Impact:** High if missing live. **Recommendation:** verify in GSC once reachable.

### 2.4 Robots meta & noindex (confirmed)

Auth pages, `/account`, `/pricing`, cart/checkout carry `robots: { index: false, follow: false }`. Public docs/blocks/charts/templates indexable.

**Evidence:** `app\(app)\auth\login\page.tsx`, `/pricing\page.tsx`.

**Severity:** n/a (positive). **Impact:** Medium. **Action:** none.

### 2.5 robots.txt — dynamic via Next.js (confirmed in code, unverified live)

`next.config.ts` exports `async robots()` returning:

```
User-agent: *
Allow: /

Sitemap: https://sonojs.com/sitemap.xml
```

Allows all crawlers; points to sitemap. No `Disallow` rules → nothing intentionally blocked beyond noindex meta. **Unverified:** live `robots.txt` content and whether `Sitemap:` URL is correct.

**Severity:** n/a (positive, in code). **Impact:** Medium. **Action:** verify live (blocked).

### 2.6 Sitemap.xml — dynamic via Next.js (confirmed in code, unverified live)

`next.config.ts` exports `async sitemap()` generating entries for `/`, `/docs`, `/blocks`, `/charts`, `/cursors`, `/templates`, `/websites`, `/tools`, `/contact`, `/legal/*`, `/pricing`, `/auth/*` plus dynamic entries from docs nav items, blocks categories, charts categories, cursor items, template slugs, tool items.

**Severity:** n/a (positive, in code). **Impact:** High. **Action:** verify live submission to GSC (blocked).

### 2.7 Structured data / JSON-LD (confirmed gaps)

`components/seo/json-ld.tsx` emits `WebSite` + `Organization` JSON-LD in root layout and `BreadcrumbList` on docs component pages.

**Gaps:** (1) No `Product`/`SoftwareApplication` schema on `/templates/[slug]`, `/websites`, `/blocks/*` detail pages → no rich-snippet eligibility, weaker AI entity understanding. (2) No `Article`/`BlogPosting` schema on docs guides. (3) No `BreadcrumbList` sitewide — only docs component pages. (4) No `image`/`logo` object verified in Organization JSON-LD. (5) No `review`/`aggregateRating`.

**Severity:** Medium. **Impact:** High for AI search + rich results. **Effort:** Medium.  
**Recommendation:** add Product/SoftwareApplication JSON-LD to detail pages; Article schema to docs guides; sitewide breadcrumbs.

### 2.8 Image optimization (confirmed)

`next/image` with `remotePatterns` restricted to `sonojs.com` only. External images blocked (good for security; off-domain assets won't optimize). No `images` domains for `icons.sonojs.com` subdomain. **Unverified:** LCP image optimized; no lazy-loading misconfig.

**Severity:** Low. **Impact:** Low-Medium. **Effort:** Low.

### 2.9 Favicons / icons (confirmed)

`app/favicon.ico`, `app/opengraph-image.png`, `app/apple-icon.png` present → OG fallback + PWA touch icon covered.

### 2.10 Internationalization / hreflang (confirmed absence)

Single language (English). No `alternateLanguages` or `hreflang`. Acceptable for single market; note if localization planned.

**Severity:** Low. **Impact:** Low. **Effort:** Low (when needed).

### 2.11 Security headers (confirmed partial)

`next.config.ts` sets `X-Content-Type-Options: nosniff`. **Unverified:** `X-Frame-Options`, `CSP`, `Referrer-Policy`, HSTS live headers (likely Vercel-handled).


## 3. On-Page SEO Findings

### 3.1 Titles & descriptions (confirmed)

Unique title + meta description on every inspected page; none missing or duplicated in the sampled set. Homepage H1: "React UI you can copy, customize, and keep." — keyword-relevant ("React UI", "copy, customize"). Meta descriptions are 1–2 sentences with product context ("Production-ready components, blocks, charts, and website packs. Drop them into your codebase with the CLI, or connect AI agents with MCP.").

**Evidence:** `components/home/home-hero.tsx`, `lib/seo.ts`, page files.

**Severity:** n/a (positive). **Action:** none.

### 3.2 Heading structure (confirmed)

One `h1` per page (hero heading on homepage; `text-h1` utilities on catalog/detail pages). Hierarchy h1 → h2 → h3 used in docs and legal pages.

### 3.3 Internal linking (confirmed)

`lib/docs-nav.ts` drives the docs sidebar navigation (all docs sections linked). `lib/tools-nav.ts` (`getAllToolItems()`) powers the `/tools` catalog grid. Block/chart/template detail pages link back to category index pages (`/blocks`, `/charts`, `/templates`).

**Severity:** n/a (positive). **Impact:** Medium. **Action:** ensure deep pages (`templates/[slug]`) are reachable within 3 clicks from homepage (they are, via `/templates`).

### 3.4 Content depth (observation)

Docs guides are substantive (`/docs/guide`, `/docs/installation`, `/docs/cli`, `/docs/mcp`). Homepage is product-focused; no dedicated brand story page.

### 3.5 Thin-content risk

`/contact`, `/legal/*` are functional pages — fine. No auto-generated thin category pages evident. Dynamic route `/templates/[slug]` falls back to generic metadata (`title: "Project"`, `description: "Templates project"`) when `getTemplatePreviewDetail()` returns null — edge case only, paired with `notFound()`.

**Severity:** Low. **Impact:** Low. **Effort:** Low.

### 3.6 Stale/legacy URLs in index (unverified — web-search signal)

Google web search still returns legacy `/marketplace/*` URLs (e.g., `/marketplace/sonojs-landing-02`, `/marketplace/sonojs-landing-03`) alongside new `/templates/*` URLs. The codebase no longer has `/marketplace` routes (replaced by `/templates`), so these should 301-redirect. If they already 301, Google simply hasn't recrawled; if they 200/soft-404, that's duplicate content.

**Severity:** Medium. **Impact:** Medium. **Effort:** Low-Medium.  
**Recommendation:** confirm `/marketplace/*` → `/templates/*` 301s (Vercel redirects or middleware), then use GSC Removals or wait for recrawl.

## 4. Content & Keyword Findings

### 4.1 Value proposition (confirmed from homepage)

Hero copy: **"React UI you can copy, customize, and keep."**  
Sub: "Production-ready components, blocks, charts, and website packs. Drop them into your codebase with the CLI, or connect AI agents with MCP."

Platform badges: React, Next.js, Tailwind, TypeScript, Cursor, Claude, Copilot, Codex — strong intent signals for "AI coding agent" and developer-tool queries.

### 4.2 Keyword coverage (inferred, unverified rankings)

Likely target themes (from URL structure + copy): React components / Next.js blocks / UI components; Tailwind CSS components; AI coding agent integration (MCP, Cursor, Claude, Copilot, Codex); templates / website packs / blocks (authentication, charts, navigation, files-media). No keyword cannibalization evident in the inspected route set (each URL has a distinct focus).

### 4.3 Thin-content risk

See §3.5.

## 5. AI Search / LLM Visibility Findings

AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) and LLM-based answer engines favor: machine-readable entity info, `llms.txt`, structured data, clear site architecture, and markdown-friendly content.

### 5.1 Missing `/about` page (confirmed gap)

No `/about`, `/company`, or `/team` route exists anywhere under `app\(app)` (searched recursively — zero matches). Brand entity is represented only by `siteConfig` (name, description, email, legal links) and root-level `Organization` JSON-LD.

**Consequence:** weak E-E-A-T and entity disambiguation for LLMs; "who is SonoJS" queries have no canonical page to cite.

**Severity:** High (for AI visibility). **Impact:** High. **Effort:** Low.

### 5.2 Missing `llms.txt` (confirmed gap)

No `llms.txt` at root (searched `public/` recursively — no match). AI crawlers that look for `/llms.txt` get a 404.

**Severity:** Medium. **Impact:** Medium. **Effort:** Low.

### 5.3 JSON-LD depth for AI (confirmed gap)

As noted in §2.7: only root `WebSite`/`Organization` + docs `BreadcrumbList`. No `Product`/`SoftwareApplication` on product pages, no `Article` on guides, no `review`/`aggregateRating`.

**Severity:** Medium. **Impact:** High. **Effort:** Medium.

### 5.4 MCP server (positive AI signal)

`/docs/mcp` documents an MCP server → AI coding agents can connect directly. Strong product differentiator for AI-related queries ("SonoJS MCP", "SonoJS Cursor", etc.) but is product content, not SEO markup.

### 5.5 Robots.txt AI-bot directives (unverified live)

Code-level `robots.txt` allows all (`User-agent: *`, `Allow: /`) — does **not** disallow GPTBot/ClaudeBot. Whether that is desirable depends on whether SonoJS wants its content in LLM training. Currently permissive.

## 6. Backlink & Off-Site Findings (unverified — web-search signals only)

No backlink data (referring domains, domain rating, anchor text) could be gathered without paid tools or live-site access. Web-search signals:

| Signal | Source | Status |
|---|---|---|
| GitHub repo | github.com/MiladJoodi/SonoJS | Connected as origin remote |
| GitHub org | github.com/SonoJS | Exists |
| npm package | @sonojs/ui (socket.dev) | Exists |
| Articles | dev.to/joodi, joodi.medium.com | Multiple SonoJS posts |
| LinkedIn | ir.linkedin.com/in/joodi | Founder profile |
| Subdomain | icons.sonojs.com | Indexed (Icons site) |
| LibHunt | libhunt.com/compare-SonoJS-* | Comparison pages exist |

**Severity:** n/a. **Impact:** Unknown (unverified).  
**Recommendation:** claim/verify Google Search Console; connect GitHub + npm profiles in `Organization` JSON-LD `sameAs`; list on relevant directories.

## 7. User Experience & Core Web Vitals (code-level observations)

- **CLS:** Homepage hero comment notes "ATF paints fully opaque. No opacity-0 / translateY entrance (CLS)" and "Shell stays top-padded (not justify-center), avoids viewport/scrollbar CLS." → CLS-conscious implementation.
- **Loading states:** `LoadingRing` skeletons with `min-h-[50vh]` fallbacks for Suspense boundaries (templates/websites) → stable layout during data fetch.
- **Navigation:** static HTML links (`<Link>`) throughout → no JS-only navigation.
- **Touch targets:** controls follow the 46px default control height standard.
- **Unverified:** LCP, INP, CLS field data; real device performance; Vercel speed.

**Severity:** Low. **Impact:** Low-Medium. **Effort:** Low (verify via PageSpeed Insights/GSC once reachable).

## 8. Crawl & Indexation Findings (mixed)

| Item | Code-level | Live (unverified) |
|---|---|---|
| SSR HTML for bots | ✅ Yes | — |
| Sitemap.xml | ✅ Dynamic route | Not fetched |
| robots.txt | ✅ Dynamic route, allow-all | Not fetched |
| Canonical tags | ✅ On every page | Not verified |
| noindex on gated pages | ✅ auth/pricing/account | Not verified |
| Indexed-page count | n/a | Not checked |
| Legacy /marketplace URLs | No routes exist | Still appear in Google site: search |

**Top crawl-health risk:** legacy `/marketplace/*` URLs lingering in the index.

**Severity:** Medium. **Impact:** Medium. **Effort:** Low-Medium.

## 9. Internal Linking & Site Architecture

Flat URL taxonomy: `/docs`, `/blocks`, `/charts`, `/cursors`, `/templates`, `/websites`, `/tools`, `/legal`, `/auth`, `/pricing`, `/contact` — shallow, easy to crawl. Docs nested: `/docs/components/<name>`, `/docs/guide`, `/docs/installation`, `/docs/cli`, `/docs/mcp`. Blocks nested by category: `/blocks/<category>/<slug>`. Charts nested: `/charts/<category>`, `/charts/view/<id>`. Cursors: `/cursors/[id]`. Templates: `/templates/[slug]`.

**Observation:** `/templates/[slug] generateStaticParams` filters `p.category !== "website"` — website templates are not in `generateStaticParams`, so they render dynamically (still SSR, fine for SEO) or need separate handling.

**Severity:** Low. **Impact:** Low. **Effort:** Low.

## 10. Registry Payload (`public/r/`) — SEO-relevant Discoverability

`scripts/build-registry.mjs` builds `public/r/registry.json` + `public/r/<item>.json` (shadcn-compatible schema, `$schema: https://ui.shadcn.com/schema/registry.json`). These JSON files are publicly crawlable/indexable and describe every installable block/component with title, description, dependencies, and registryDependencies — a machine-readable inventory useful to AI crawlers.

**Opportunity:** ensure `public/r/` is included in sitemap or at least not blocked.

**Severity:** Low. **Impact:** Low. **Effort:** Low.

---

## AI Search Readiness Scorecard

| Factor | Status | Notes |
|---|---|---|
| Server-rendered HTML | ✅ | Next.js App Router SSR |
| Canonical URLs | ⚠️ | Code ✅, live unverified |
| robots.txt + sitemap | ⚠️ | Code ✅, live unverified |
| Organization JSON-LD | ✅ | Root level only |
| Product/SoftwareApplication schema | ❌ | Missing on detail pages |
| Article/BlogPosting schema | ❌ | Missing on docs guides |
| BreadcrumbList sitewide | ⚠️ | Docs component pages only |
| `/about` page | ❌ | Missing |
| `llms.txt` | ❌ | Missing |
| `sameAs` social profiles | ⚠️ | Unverified in JSON-LD |
| Review/aggregateRating | ❌ | Missing |
| AI-bot robots directives | ✅ | Permissive (allow-all) |
| MCP / agent integration | ✅ | Product feature documented |

---

## Ranked Top-10 Action List

Ranked by impact × effort (high impact + low effort first). All are recommendations only — **no code changes made pending your approval**.

| # | Action | Severity | Effort | Why |
|---|---|---|---|---|
| 1 | **Add `/about` page** (brand story, team, mission) with Organization JSON-LD `sameAs` (GitHub, npm, LinkedIn) | High | Low | Core AI-visibility / E-E-A-T gap; no entity page exists |
| 2 | **Add `llms.txt` at root** summarizing site structure + key pages in markdown | Medium | Low | Direct AI-crawler consumption; currently 404s |
| 3 | **Add `Product`/`SoftwareApplication` JSON-LD** to `/templates/[slug]`, `/websites`, `/blocks/*` detail pages (name, description, url, image, offers, category) | High | Medium | Enables rich results; helps LLMs understand product pages |
| 4 | **Add `Article`/`BlogPosting` JSON-LD** to docs guides (`/docs/guide`, `/installation`, `/cli`, `/mcp`) | Medium | Low | Rich results for docs; AI citation source |
| 5 | **Add sitewide `BreadcrumbList` JSON-LD** (not just docs) | Medium | Low | SERP breadcrumbs; site-structure signals |
| 6 | **Verify live `robots.txt`, `sitemap.xml`, canonicals** once site reachable; submit sitemap to Google Search Console | Medium | Low | All external crawl signals currently unverified (site unreachable during audit) |
| 7 | **Fix legacy `/marketplace/*` URLs** → confirm 301 to `/templates/*`; use GSC Removals if needed | Medium | Low-Medium | Stale URLs still indexed per site: search |
| 8 | **Add `review` / `aggregateRating` JSON-LD** (if reviews/testimonials exist) | Low | Low | Social proof for AI answers and rich snippets |
| 9 | **Add `image`/`logo` to Organization JSON-LD** and ensure `og:image` is absolute | Low | Low | Brand recognition in AI answers + social shares |
| 10 | **Set up GSC + PageSpeed Insights monitoring**; track indexed pages, Core Web Vitals, and the /marketplace cleanup | Medium | Low | Ongoing visibility baseline |

---

## Evidence & Data Quality Notes

**Confirmed (code-level):** metadata implementation, JSON-LD component, sitemap/robots generation in `next.config.ts`, noindex pages, SSR routing, generateStaticParams, registry build scripts, folder structure, absence of `/about` and `llms.txt`, platform badges, hero copy.

**Unverified (production unreachable):** live `robots.txt`, live `sitemap.xml`, rendered HTML canonicals/OG tags, indexed page count (`site:sonojs.com` returned ~12 results via web search but could not be crawled directly), Core Web Vitals, headers (CSP/HSTS), structured-data rendering in SERPs, backlink profile.

**Web-search signals (directional only):** GitHub repo `MiladJoodi/SonoJS`, npm `@sonojs/ui`, dev.to/Medium articles by joodi, LinkedIn `ir.linkedin.com/in/joodi`, icons.sonojs.com subdomain, LibHunt comparisons.

---

## Appendix: Files Inspected

SEO layer: `lib/seo.ts`, `components/seo/json-ld.tsx`, `components/google-tag-manager/google-tag-manager.tsx`, `next.config.ts`  
Routes: `app\(app)\page.tsx` (home), `app\(app)\layout.tsx` (root), `app\(app)\docs\layout.tsx`, `app\(app)\docs\[guide/installation/cli/mcp/components/[name]]`, `app\(app)\blocks\[...]`, `app\(app)\charts\[...]`, `app\(app)\cursors\[...]`, `app\(app)\templates\[[slug]]`, `app\(app)\websites`, `app\(app)\tools\(catalog)`, `app\(app)\pricing`, `app\(app)\contact`, `app\(app)\auth\login`, `app\(app)\legal\*`  
Data/nav: `lib/docs-nav.ts`, `lib/tools-nav.ts`, `lib/templates-preview-data.ts`, `lib/config.ts` (`siteConfig`)  
Registry: `scripts/registry-items.mjs`, `scripts/build-registry.mjs`, `registry/` (blocks/charts/cursors/examples/hooks/icons)

---

**Next step:** review findings, then approve specific actions for implementation (no code was changed in this audit).
**Severity:** Low. **Impact:** Low. **Effort:** Low.