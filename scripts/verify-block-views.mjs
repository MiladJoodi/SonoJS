/**
 * Every `BlockExample` on /blocks must resolve in app/view/[name]/page.tsx.
 * Run: node scripts/verify-block-views.mjs
 */
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const viewPage = fs.readFileSync(
  path.join(root, "app/view/[name]/page.tsx"),
  "utf8"
)
const viewKeys = new Set(
  [...viewPage.matchAll(/^\s+"([^"]+)":/gm)].map((m) => m[1])
)

const blocksDir = path.join(root, "app/(app)/blocks")

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else if (e.name.endsWith(".tsx")) acc.push(p)
  }
  return acc
}

/** Registry block slugs (excludes BlocksPageHeader `pathname=`). */
const BLOCK_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*-\d{2}$/

const names = new Set()
for (const f of walk(blocksDir)) {
  const c = fs.readFileSync(f, "utf8")
  for (const m of c.matchAll(/name="([^"]+)"/g)) {
    const id = m[1]
    if (BLOCK_NAME.test(id)) names.add(id)
  }
}

const missing = [...names].filter((n) => !viewKeys.has(n)).sort()
if (missing.length > 0) {
  console.error(
    `BlockExample names missing from app/view/[name]/page.tsx views (${missing.length}):`
  )
  for (const n of missing) console.error(`  - ${n}`)
  process.exit(1)
}

console.log(`OK: ${names.size} block examples map to /view/[name] routes.`)