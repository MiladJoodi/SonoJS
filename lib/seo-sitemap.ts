import { existsSync } from "node:fs"
import path from "node:path"

import { getAllBlockItems } from "@/lib/blocks-nav"
import {
  CHART_CATEGORIES,
  chartsCatalog,
  chartCategoryHref,
  chartViewHref,
} from "@/lib/charts-catalog"
import { getDocsComponentPages, getDocsGuidePages } from "@/lib/docs-nav"
import {
  absoluteUrl,
  isNoindexPath,
  normalizePath,
} from "@/lib/seo"
import { PRODUCTION_ORIGIN } from "@/lib/site-origin"

export type SitemapEntry = {
  path: string
  url: string
}

const APP_ROOT = path.join(process.cwd(), "app", "(app)")

/** Redirect sources that must never appear in the sitemap. */
export const SITEMAP_REDIRECT_SOURCES = ["/blocks/login-01"] as const

function hrefToAppPageFile(href: string): string {
  const normalized = normalizePath(href)
  if (normalized === "/") {
    return path.join(APP_ROOT, "page.tsx")
  }
  const segments = normalized.replace(/^\//, "").split("/")
  return path.join(APP_ROOT, ...segments, "page.tsx")
}

/** Resolve App Router pages, including route-group folders like `(catalog)`. */
function appPageFileCandidates(href: string): string[] {
  const normalized = normalizePath(href)
  const direct = hrefToAppPageFile(normalized)
  const candidates = [direct]
  if (normalized === "/tools") {
    candidates.push(path.join(APP_ROOT, "tools", "(catalog)", "page.tsx"))
  }
  return candidates
}

/** True when a path has a concrete App Router page (not catch-all placeholders). */
export function sitemapPathExists(href: string): boolean {
  const normalized = normalizePath(href)
  if (normalized.startsWith("/charts/view/")) {
    const id = normalized.slice("/charts/view/".length)
    if (!id || id.includes("/")) return false
    return chartsCatalog.some((e) => e.id === id && e.status === "ported")
  }
  if (normalized.startsWith("/charts/") && normalized !== "/charts") {
    const category = normalized.slice("/charts/".length)
    return (CHART_CATEGORIES as readonly string[]).includes(category)
  }
  return appPageFileCandidates(normalized).some((file) => existsSync(file))
}

function pushUnique(
  paths: Set<string>,
  href: string,
  reasons: { skipNoindex?: boolean } = {}
) {
  const normalized = normalizePath(href)
  if ((SITEMAP_REDIRECT_SOURCES as readonly string[]).includes(normalized)) {
    return
  }
  if (reasons.skipNoindex !== false && isNoindexPath(normalized)) {
    return
  }
  if (!sitemapPathExists(normalized)) {
    return
  }
  paths.add(normalized)
}

/**
 * Canonical indexable HTML paths for the XML sitemap.
 * Pure enough for unit tests; filesystem existence checked for static pages.
 */
export function buildSitemapPaths(): string[] {
  const paths = new Set<string>()

  pushUnique(paths, "/")
  pushUnique(paths, "/blocks")
  pushUnique(paths, "/charts")
  pushUnique(paths, "/tools")
  pushUnique(paths, "/docs/components")

  for (const page of getDocsGuidePages()) {
    pushUnique(paths, page.href)
  }
  for (const page of getDocsComponentPages()) {
    pushUnique(paths, page.href)
  }
  for (const item of getAllBlockItems()) {
    if (item.status !== "ready") continue
    pushUnique(paths, item.href)
  }
  for (const category of CHART_CATEGORIES) {
    pushUnique(paths, chartCategoryHref(category))
  }
  for (const entry of chartsCatalog) {
    if (entry.status !== "ported") continue
    pushUnique(paths, chartViewHref(entry.id))
  }

  return [...paths].sort((a, b) => a.localeCompare(b))
}

export function buildSitemapEntries(): SitemapEntry[] {
  return buildSitemapPaths().map((p) => ({
    path: p,
    url: absoluteUrl(p),
  }))
}

export function assertSitemapIntegrity(entries: SitemapEntry[] = buildSitemapEntries()) {
  const paths = entries.map((e) => e.path)
  const urls = entries.map((e) => e.url)

  const uniquePaths = new Set(paths)
  if (uniquePaths.size !== paths.length) {
    throw new Error("Sitemap contains duplicate paths")
  }

  const uniqueUrls = new Set(urls)
  if (uniqueUrls.size !== urls.length) {
    throw new Error("Sitemap contains duplicate URLs")
  }

  for (const entry of entries) {
    if (!entry.url.startsWith(PRODUCTION_ORIGIN)) {
      throw new Error(`Sitemap URL not on production origin: ${entry.url}`)
    }
    if (/localhost|127\.0\.0\.1|vercel\.app/i.test(entry.url)) {
      throw new Error(`Sitemap URL looks like preview/local: ${entry.url}`)
    }
    if (isNoindexPath(entry.path)) {
      throw new Error(`Sitemap includes noindex path: ${entry.path}`)
    }
    if (!sitemapPathExists(entry.path)) {
      throw new Error(`Sitemap path has no backing route: ${entry.path}`)
    }
    for (const source of SITEMAP_REDIRECT_SOURCES) {
      if (entry.path === source) {
        throw new Error(`Sitemap includes redirect source: ${entry.path}`)
      }
    }
  }

  return entries
}
