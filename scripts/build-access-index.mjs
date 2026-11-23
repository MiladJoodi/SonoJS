/**
 * Builds a lean access inventory for /admin/access.
 * Reads public/r/*.json + lib/templates-catalog.ts + lib/popups-nav.ts
 * after registry:build. Also lists known Pro demos (pro-button).
 *
 * Usage: node scripts/build-access-index.mjs
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const registryDir = path.join(root, "public", "r")
const catalogPath = path.join(root, "lib", "templates-catalog.ts")
const popupsNavPath = path.join(root, "lib", "popups-nav.ts")
const outPath = path.join(root, "public", "admin", "access-index.json")

const SKIP_REGISTRY = new Set(["registry.json", "index.json", "access-index.json"])
/** Install helpers — not access-gated product surfaces for this inventory. */
const SKIP_REGISTRY_TYPES = new Set(["registry:hook"])

function normalizeAccess(value) {
  if (value === "member" || value === "pro") return value
  return "public"
}

function surfaceFromItem(item) {
  const type = item.type || ""
  const name = item.name || ""
  const filePath = String(
    item.files?.[0]?.target || item.files?.[0]?.path || ""
  ).replace(/\\/g, "/")

  if (type === "registry:cursor" || filePath.includes("/cursors/")) {
    return "cursors"
  }
  if (type === "registry:chart" || filePath.includes("/charts/")) {
    return "charts"
  }
  if (type === "registry:block" || filePath.includes("/blocks/")) {
    return "blocks"
  }
  if (filePath.includes("/popups/") || filePath.includes("registry/popups/")) {
    return "popups"
  }
  if (filePath.includes("/3d/") || filePath.includes("components/3d/")) {
    return "3d"
  }
  if (
    filePath.includes("/sonojs/") ||
    filePath.includes("components/sonojs/")
  ) {
    return "ai"
  }
  if (type === "registry:hook") return "hooks"
  if (type === "registry:lib") return "lib"
  if (type === "registry:ui" || filePath.includes("/ui/")) return "components"
  if (type === "registry:component") return "components"
  if (name.endsWith("-cursor") || name.includes("cursor")) return "cursors"
  return "other"
}

function hrefForRegistry(item, surface) {
  const name = item.name
  if (!name) return null
  switch (surface) {
    case "cursors":
      return `/cursors/${name}`
    case "charts":
      return `/charts/view/${name}`
    case "ai":
      return `/ai/${name}`
    case "3d":
      return `/3d/${name}`
    case "popups":
      return `/popups/${name}`
    case "components":
      return `/docs/components/${name}`
    case "blocks":
      return `/view/${name}`
    case "hooks":
      return null
    default:
      return null
  }
}

function accessLabel(access) {
  if (access === "pro") return "Pro only"
  if (access === "member") return "Sign-in (Free ok)"
  return "Everyone"
}

function readRegistryItems() {
  if (!existsSync(registryDir)) return []
  const files = readdirSync(registryDir).filter(
    (f) => f.endsWith(".json") && !SKIP_REGISTRY.has(f)
  )
  const items = []
  for (const file of files) {
    try {
      const raw = JSON.parse(
        readFileSync(path.join(registryDir, file), "utf8")
      )
      if (!raw?.name) continue
      const type = raw.type || "registry:ui"
      if (SKIP_REGISTRY_TYPES.has(type)) continue
      const access = normalizeAccess(raw.access)
      const surface = surfaceFromItem(raw)
      items.push({
        kind: "registry",
        name: raw.name,
        title: raw.title || raw.name,
        type,
        surface,
        access,
        accessLabel: accessLabel(access),
        href: hrefForRegistry(raw, surface),
        registryUrl: `/r/${raw.name}.json`,
      })
    } catch {
      // skip corrupt
    }
  }
  items.sort((a, b) => a.name.localeCompare(b.name))
  return items
}

/**
 * Pro popups are not in public/r — parse the docs nav catalog.
 * Shape matches registry rows so summary.byAccess / bySurface stay correct.
 */
function parsePopupItems() {
  if (!existsSync(popupsNavPath)) return []
  const src = readFileSync(popupsNavPath, "utf8")
  const items = []
  const seen = new Set()
  const re =
    /\{\s*title:\s*"([^"]+)"\s*,\s*href:\s*"(\/popups\/[^"]+)"/g
  let match
  while ((match = re.exec(src)) !== null) {
    const title = match[1]
    const href = match[2]
    if (!href || href === "/popups") continue
    const name = href.slice("/popups/".length)
    if (!name || seen.has(name)) continue
    seen.add(name)
    items.push({
      kind: "registry",
      name,
      title,
      type: "pro:popup",
      surface: "popups",
      access: "pro",
      accessLabel: accessLabel("pro"),
      href,
      registryUrl: null,
    })
  }
  items.sort((a, b) => a.name.localeCompare(b.name))
  return items
}

/** Known Pro demos that live outside public/r (Pro API / site chrome). */
function proDemoItems() {
  return [
    {
      kind: "registry",
      name: "pro-button",
      title: "Pro Button",
      type: "pro:component",
      surface: "components",
      access: "pro",
      accessLabel: accessLabel("pro"),
      href: "/docs/components/pro-button",
      registryUrl: null,
    },
  ]
}

function parseCatalogProjects() {
  if (!existsSync(catalogPath)) return []
  const src = readFileSync(catalogPath, "utf8")
  const blocks = src.split(/\{\s*\n\s*slug:/).slice(1)
  const rows = []
  for (const block of blocks) {
    const slug = (block.match(/^\s*"([^"]+)"/) || [])[1]
    if (!slug) continue
    const title = (block.match(/title:\s*"([^"]*)"/) || [])[1] || slug
    const category = (block.match(/category:\s*"([^"]*)"/) || [])[1] || ""
    const access = normalizeAccess(
      (block.match(/access:\s*"([^"]*)"/) || [])[1]
    )
    const priceCents = Number(
      (block.match(/priceCents:\s*(-?\d+)/) || [])[1] || 0
    )
    const priceLabel =
      (block.match(/priceLabel:\s*"([^"]*)"/) || [])[1] ||
      (priceCents > 0 ? `$${(priceCents / 100).toFixed(0)}` : "Free")
    const liveUrl = (block.match(/liveUrl:\s*"([^"]*)"/) || [])[1] || null
    const isWebsite = category === "website"
    rows.push({
      kind: isWebsite ? "website" : "template",
      slug,
      title,
      category,
      access,
      accessLabel: accessLabel(access),
      priceCents,
      priceLabel,
      paid: priceCents > 0,
      gate: priceCents > 0 ? "buy" : access,
      gateLabel:
        priceCents > 0
          ? "Buy separately"
          : accessLabel(access),
      href: isWebsite ? `/websites/${slug}` : `/templates/${slug}`,
      liveUrl,
    })
  }
  rows.sort((a, b) => a.slug.localeCompare(b.slug))
  return rows
}

function countBy(list, keyFn) {
  const out = {}
  for (const item of list) {
    const key = keyFn(item)
    out[key] = (out[key] || 0) + 1
  }
  return out
}

function main() {
  const generatedAt = new Date().toISOString()
  const registry = [
    ...readRegistryItems(),
    ...parsePopupItems(),
    ...proDemoItems(),
  ].sort((a, b) => a.name.localeCompare(b.name))
  const catalog = parseCatalogProjects()
  const templates = catalog.filter((r) => r.kind === "template")
  const websites = catalog.filter((r) => r.kind === "website")

  const payload = {
    generatedAt,
    people: [
      {
        id: "guest",
        label: "Guest",
        meaning: "Not signed in",
      },
      {
        id: "signed-in",
        label: "Signed-in (Free)",
        meaning: "Has an account, not Pro",
      },
      {
        id: "pro",
        label: "Pro",
        meaning: "Active Pro plan",
      },
    ],
    gates: [
      {
        id: "public",
        label: "Everyone",
        guest: true,
        signedIn: true,
        pro: true,
        note: "No account needed",
      },
      {
        id: "member",
        label: "Sign-in (Free ok)",
        guest: false,
        signedIn: true,
        pro: true,
        note: "Any signed-in user. Free is enough. Not a separate plan named Member.",
      },
      {
        id: "pro",
        label: "Pro only",
        guest: false,
        signedIn: false,
        pro: true,
        note: "Needs active Pro",
      },
      {
        id: "buy",
        label: "Buy separately",
        guest: false,
        signedIn: "if purchased",
        pro: "if purchased",
        note: "Pro alone does not unlock. Needs product purchase entitlement.",
      },
    ],
    summary: {
      registry: {
        total: registry.length,
        byAccess: countBy(registry, (r) => r.access),
        bySurface: countBy(registry, (r) => r.surface),
      },
      templates: {
        total: templates.length,
        free: templates.filter((r) => !r.paid).length,
        paid: templates.filter((r) => r.paid).length,
        byAccess: countBy(templates, (r) => r.access),
        byGate: countBy(templates, (r) => r.gate),
        byCategory: countBy(templates, (r) => r.category || "uncategorized"),
      },
      websites: {
        total: websites.length,
        free: websites.filter((r) => !r.paid).length,
        paid: websites.filter((r) => r.paid).length,
        byAccess: countBy(websites, (r) => r.access),
        byGate: countBy(websites, (r) => r.gate),
        byCategory: countBy(websites, (r) => r.category || "uncategorized"),
      },
    },
    notes: [
      {
        id: "member-word",
        title: "member ≠ a plan",
        body: "In registry JSON, access:\"member\" means sign-in required. Free accounts can download those items. It is not a paid plan name.",
      },
      {
        id: "buy-websites",
        title: "Websites = buy separately",
        body: "Paid websites need a product entitlement. Pro alone does not unlock them. Grant/revoke from a user detail page.",
        href: "/admin/users",
      },
      {
        id: "cli",
        title: "CLI / MCP",
        body: "Site Installation panels respect access. Public /r JSON files are still fetchable - gating is mainly website UI + Pro APIs.",
      },
      {
        id: "pro-api",
        title: "Pro packages + popups",
        body: "Pro-only items (popups from lib/popups-nav.ts, Pro Button demo) are listed here with access:\"pro\". Install/source still comes from /api/pro/components (private GitHub Pro registry) — this index does not fetch that repo at build time.",
        href: "/docs/components/pro-button",
      },
      {
        id: "backgrounds-cursors",
        title: "Backgrounds / cursors downloads",
        body: "Catalog pages may wrap downloads in AccessGate (sign-in) even when browsing is open.",
        href: "/cursors",
      },
      {
        id: "rebuild",
        title: "Keep this page fresh",
        body: "After changing registry access, popups-nav, or templates-catalog prices, run npm run registry:build (or npm run access:index).",
      },
    ],
    registry,
    catalog,
  }

  mkdirSync(path.dirname(outPath), { recursive: true })
  writeFileSync(outPath, `${JSON.stringify(payload)}\n`, "utf8")
  const kb = (Buffer.byteLength(JSON.stringify(payload)) / 1024).toFixed(1)
  console.log(
    `Wrote access index → public/admin/access-index.json (${registry.length} registry + ${catalog.length} catalog, ${kb} KB)`
  )
}

main()
