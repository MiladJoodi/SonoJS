/**
 * Approximate First Load JS for App Router routes from Turbopack build output.
 * Sums unique static/chunks referenced by the route client-reference manifest
 * plus shared rootMain/polyfill files from .next/build-manifest.json.
 */
import fs from "node:fs"
import path from "node:path"

const root = path.join(process.cwd(), ".next")

function fileSize(rel) {
  const full = path.join(root, rel)
  try {
    return fs.statSync(full).size
  } catch {
    return 0
  }
}

function sumFiles(rels) {
  const uniq = [...new Set(rels.filter(Boolean))]
  let total = 0
  const missing = []
  for (const r of uniq) {
    const s = fileSize(r)
    if (!s) missing.push(r)
    total += s
  }
  return { total, count: uniq.length, missing }
}

function extractChunkPaths(text) {
  return text.match(/static\/chunks\/[^"'\\\s)]+\.js/g) || []
}

function analyzeRoute(routeDir) {
  const manifestPath = path.join(routeDir, "page_client-reference-manifest.js")
  const buildManifestPath = path.join(routeDir, "page", "build-manifest.json")
  const files = []

  if (fs.existsSync(manifestPath)) {
    files.push(...extractChunkPaths(fs.readFileSync(manifestPath, "utf8")))
  }
  if (fs.existsSync(buildManifestPath)) {
    const bm = JSON.parse(fs.readFileSync(buildManifestPath, "utf8"))
    files.push(
      ...(bm.polyfillFiles || []),
      ...(bm.rootMainFiles || []),
      ...(bm.lowPriorityFiles || [])
    )
  }

  const rootBm = JSON.parse(
    fs.readFileSync(path.join(root, "build-manifest.json"), "utf8")
  )
  const shared = [
    ...(rootBm.polyfillFiles || []),
    ...(rootBm.rootMainFiles || []),
    ...(rootBm.lowPriorityFiles || []),
  ]

  const routeOnly = sumFiles(files)
  const firstLoad = sumFiles([...files, ...shared])
  const clientManifestBytes = fs.existsSync(manifestPath)
    ? fs.statSync(manifestPath).size
    : 0

  return {
    firstLoadBytes: firstLoad.total,
    firstLoadKB: Math.round(firstLoad.total / 1024),
    routeChunkBytes: routeOnly.total,
    routeChunkKB: Math.round(routeOnly.total / 1024),
    routeChunkCount: routeOnly.count,
    sharedKB: Math.round(sumFiles(shared).total / 1024),
    clientManifestKB: Math.round(clientManifestBytes / 1024),
    missing: firstLoad.missing.slice(0, 8),
  }
}

const routes = {
  "/blocks/authentication/login":
    "server/app/(app)/blocks/authentication/login",
  "/blocks/marketing/faq": "server/app/(app)/blocks/marketing/faq",
  "/charts": "server/app/(app)/charts",
  "/charts/view/[id]": "server/app/(app)/charts/view/[id]",
}

const out = {}
for (const [route, rel] of Object.entries(routes)) {
  out[route] = analyzeRoute(path.join(root, rel))
}

const buildId = fs.existsSync(path.join(root, "BUILD_ID"))
  ? fs.readFileSync(path.join(root, "BUILD_ID"), "utf8").trim()
  : null

console.log(
  JSON.stringify({ buildId, measuredAt: new Date().toISOString(), routes: out }, null, 2)
)
