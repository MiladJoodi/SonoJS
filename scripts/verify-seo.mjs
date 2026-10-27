/**
 * Smoke checks for SEO builders (no Next server required).
 * Run: npm run verify:seo
 */
import { createRequire } from "node:module"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const require = createRequire(import.meta.url)

// Load compiled-less TS via vitest-style alias is hard; re-run vitest instead for TS.
// This script validates robots/sitemap route modules exist and documents expectations.

const requiredFiles = [
  "app/sitemap.ts",
  "app/robots.ts",
  "app/opengraph-image.tsx",
  "app/not-found.tsx",
  "lib/seo.ts",
  "lib/seo-sitemap.ts",
  "lib/site-origin.ts",
]

let failed = false
for (const rel of requiredFiles) {
  const full = path.join(root, rel)
  try {
    require("node:fs").accessSync(full)
  } catch {
    console.error(`missing: ${rel}`)
    failed = true
  }
}

const robotsSrc = require("node:fs").readFileSync(
  path.join(root, "app/robots.ts"),
  "utf8"
)
if (!robotsSrc.includes("sitemap.xml") && !robotsSrc.includes("absoluteUrl")) {
  console.error("robots.ts should reference the sitemap")
  failed = true
}
if (/disallow:\s*[\"']\/api/i.test(robotsSrc)) {
  console.error("robots.ts must not Disallow /api without justification")
  failed = true
}

const sitemapSrc = require("node:fs").readFileSync(
  path.join(root, "app/sitemap.ts"),
  "utf8"
)
if (!sitemapSrc.includes("buildSitemapEntries")) {
  console.error("sitemap.ts should use buildSitemapEntries")
  failed = true
}

const publicDirs = require("node:fs").readdirSync(path.join(root, "public"), {
  withFileTypes: true,
})
if (publicDirs.some((d) => d.isDirectory() && d.name.startsWith("r.bak"))) {
  console.error("public/r.bak-* must not remain publicly served")
  failed = true
}

if (failed) {
  console.error("verify:seo failed")
  process.exit(1)
}

console.log("verify:seo ok — run `npx vitest run lib/seo.test.ts` for sitemap integrity")
void pathToFileURL
