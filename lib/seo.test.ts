import { afterEach, describe, expect, it, vi } from "vitest"

import {
  absoluteUrl,
  isNoindexPath,
  isProductionIndexingEnabled,
  normalizePath,
  NOINDEX_EXACT_PATHS,
  NOINDEX_PATH_PREFIXES,
} from "@/lib/seo"
import {
  assertSitemapIntegrity,
  buildSitemapEntries,
  buildSitemapPaths,
  SITEMAP_REDIRECT_SOURCES,
  sitemapPathExists,
} from "@/lib/seo-sitemap"
import { PRODUCTION_ORIGIN } from "@/lib/site-origin"

describe("seo helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("normalizes paths without trailing slashes", () => {
    expect(normalizePath("/docs/")).toBe("/docs")
    expect(normalizePath("docs/components")).toBe("/docs/components")
    expect(normalizePath("/")).toBe("/")
  })

  it("builds absolute production URLs only", () => {
    expect(absoluteUrl("/docs")).toBe(`${PRODUCTION_ORIGIN}/docs`)
    expect(absoluteUrl("/")).toBe(PRODUCTION_ORIGIN)
    expect(absoluteUrl("/docs")).not.toMatch(/localhost|127\.0\.0\.1|vercel\.app/i)
  })

  it("classifies noindex paths", () => {
    expect(isNoindexPath("/view/login-01")).toBe(true)
    expect(isNoindexPath("/tools/endpoints")).toBe(true)
    expect(isNoindexPath("/docs/components/button")).toBe(false)
    expect(NOINDEX_PATH_PREFIXES).toContain("/view")
    expect(NOINDEX_EXACT_PATHS).toContain("/tools/endpoints")
  })

  it("disables indexing on Vercel preview and SEO_NOINDEX", () => {
    vi.stubEnv("VERCEL_ENV", "preview")
    expect(isProductionIndexingEnabled()).toBe(false)
    vi.unstubAllEnvs()
    vi.stubEnv("VERCEL_ENV", "production")
    expect(isProductionIndexingEnabled()).toBe(true)
    vi.unstubAllEnvs()
    vi.stubEnv("SEO_NOINDEX", "1")
    expect(isProductionIndexingEnabled()).toBe(false)
  })
})

describe("sitemap builder", () => {
  it("emits unique absolute production URLs", () => {
    const entries = assertSitemapIntegrity(buildSitemapEntries())
    const paths = buildSitemapPaths()
    expect(paths.length).toBeGreaterThan(50)
    expect(new Set(paths).size).toBe(paths.length)
    for (const entry of entries) {
      expect(entry.url.startsWith(PRODUCTION_ORIGIN)).toBe(true)
    }
  })

  it("excludes noindex, redirects, and non-existent paths", () => {
    const paths = buildSitemapPaths()
    for (const p of paths) {
      expect(isNoindexPath(p)).toBe(false)
      expect(sitemapPathExists(p)).toBe(true)
      expect(SITEMAP_REDIRECT_SOURCES as readonly string[]).not.toContain(p)
      expect(p.startsWith("/view")).toBe(false)
      expect(p.startsWith("/api")).toBe(false)
      expect(p.startsWith("/r")).toBe(false)
      expect(p).not.toBe("/tools/endpoints")
    }
  })

  it("includes core hubs and excludes endpoints", () => {
    const paths = new Set(buildSitemapPaths())
    expect(paths.has("/")).toBe(true)
    expect(paths.has("/docs")).toBe(true)
    expect(paths.has("/docs/components")).toBe(true)
    expect(paths.has("/docs/components/button")).toBe(true)
    expect(paths.has("/blocks")).toBe(true)
    expect(paths.has("/charts")).toBe(true)
    expect(paths.has("/tools")).toBe(true)
    expect(paths.has("/tools/endpoints")).toBe(false)
    expect(paths.has("/view/login-01")).toBe(false)
  })
})
