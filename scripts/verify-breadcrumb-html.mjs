/**
 * After `npm run build`, fetches representative routes and asserts exactly one
 * BreadcrumbList JSON-LD script per eligible page (zero on excluded embed views).
 *
 * Run: node scripts/verify-breadcrumb-html.mjs
 */
import { spawn } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { setTimeout as sleep } from "node:timers/promises"

const root = process.cwd()
const PORT = Number(process.env.SEO_VERIFY_PORT ?? "31998")
const BASE = `http://127.0.0.1:${PORT}`

const LD_JSON_RE =
  /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi

function parseLdJsonScripts(html) {
  const scripts = []
  for (const match of html.matchAll(LD_JSON_RE)) {
    const raw = match[1]?.trim()
    if (!raw) continue
    try {
      scripts.push(JSON.parse(raw))
    } catch {
      // ignore non-JSON or malformed blocks
    }
  }
  return scripts
}

function parseBreadcrumbListScripts(html) {
  return parseLdJsonScripts(html).filter(
    (data) => data?.["@type"] === "BreadcrumbList"
  )
}

function countSchemaType(html, type) {
  return parseLdJsonScripts(html).filter((data) => data?.["@type"] === type)
    .length
}

function leafName(list) {
  const elements = list?.itemListElement
  if (!Array.isArray(elements) || elements.length === 0) return undefined
  const last = elements[elements.length - 1]
  return last?.name ?? last?.item?.name
}

/** @type {{ path: string, expectCount: number, leaf?: string, redirect?: RequestRedirect, contentType?: string }[]} */
const ROUTES = [
  {
    path: "/docs/installation",
    expectCount: 1,
    leaf: "Installation",
    contentType: "TechArticle",
  },
  {
    path: "/docs/components/button",
    expectCount: 1,
    leaf: "Button",
    contentType: "SoftwareSourceCode",
  },
  {
    path: "/blocks/authentication/login",
    expectCount: 1,
    leaf: "Login",
    contentType: "CreativeWork",
  },
  {
    path: "/templates/sonojs-dashboard-01",
    expectCount: 1,
    leaf: "Commerce Admin Dashboard",
    contentType: "Product",
  },
  {
    path: "/cursors/view/smooth-cursor-follower",
    expectCount: 0,
    // Legacy embed URL redirects to /cursors/:id — probe the view URL only.
    redirect: "manual",
  },
]

async function waitForServer(child, maxMs = 120_000) {
  const started = Date.now()
  while (Date.now() - started < maxMs) {
    try {
      const res = await fetch(`${BASE}/`, { redirect: "manual" })
      if (res.status > 0) return true
    } catch {
      // not ready
    }
    const exit = child.exitCode
    if (exit !== null) {
      throw new Error(`next start exited early with code ${exit}`)
    }
    await sleep(500)
  }
  throw new Error("timed out waiting for next start")
}

async function main() {
  const buildId = path.join(root, ".next", "BUILD_ID")
  if (!fs.existsSync(buildId)) {
    console.error(
      "verify-breadcrumb-html: missing .next/BUILD_ID — run `npm run build` first"
    )
    process.exit(1)
  }

  const proxySrc = fs.readFileSync(path.join(root, "proxy.ts"), "utf8")
  if (
    !proxySrc.includes("BREADCRUMB_PATH_HEADER") ||
    !proxySrc.includes('set(BREADCRUMB_PATH_HEADER')
  ) {
    console.error(
      "proxy.ts must set BREADCRUMB_PATH_HEADER (x-pathname) on each request"
    )
    process.exit(1)
  }

  const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next")
  const child = spawn(
    process.execPath,
    [nextBin, "start", "-p", String(PORT)],
    {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NODE_ENV: "production" },
    }
  )

  let failed = false
  try {
    await waitForServer(child)

    for (const route of ROUTES) {
      const url = `${BASE}${route.path}`
      const res = await fetch(url, {
        redirect: route.redirect ?? "follow",
      })
      const redirectOk = route.redirect === "manual" && res.status >= 300 && res.status < 400
      if (!res.ok && !redirectOk) {
        console.error(`${route.path}: HTTP ${res.status}`)
        failed = true
        continue
      }
      const html = await res.text()
      const lists = parseBreadcrumbListScripts(html)
      if (lists.length !== route.expectCount) {
        console.error(
          `${route.path}: expected ${route.expectCount} BreadcrumbList script(s), got ${lists.length}`
        )
        failed = true
        continue
      }
      if (route.expectCount === 1 && route.leaf) {
        const name = leafName(lists[0])
        if (name !== route.leaf) {
          console.error(
            `${route.path}: expected leaf name "${route.leaf}", got "${name ?? "(missing)"}"`
          )
          failed = true
        }
      }
      if (route.contentType) {
        const contentCount = countSchemaType(html, route.contentType)
        if (contentCount !== 1) {
          console.error(
            `${route.path}: expected 1 ${route.contentType} JSON-LD, got ${contentCount}`
          )
          failed = true
        }
      }
    }
  } finally {
    child.kill("SIGTERM")
    await sleep(300)
    if (!child.killed) child.kill("SIGKILL")
  }

  if (failed) {
    console.error("verify-breadcrumb-html failed")
    process.exit(1)
  }

  console.log(
    `verify-breadcrumb-html ok (${ROUTES.length} routes, x-pathname wired in proxy.ts)`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})