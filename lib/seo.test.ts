import { afterEach, describe, expect, it, vi } from "vitest"

import {
  absoluteUrl,
  aiDocsMetadata,
  chartViewMetadata,
  componentDocsMetadata,
  cursorViewMetadata,
  isNoindexPath,
  isProductionIndexingEnabled,
  normalizePath,
  NOINDEX_EXACT_PATHS,
  NOINDEX_PATH_PREFIXES,
  OG_IMAGE,
  ogImageAltForPath,
  pageMetadata,
  twitterHandleFromConfig,
  withKindSuffix,
} from "@/lib/seo"
import {
  AI_META_DESCRIPTIONS,
  COMPONENT_META_DESCRIPTIONS,
} from "@/lib/seo-descriptions"
import {
  breadcrumbItemsFromPath,
  breadcrumbListJsonLd,
  isBreadcrumbLinkedPath,
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo-jsonld"
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

  it("exposes a committed 1200×630 OG image path", () => {
    expect(OG_IMAGE.url).toBe("/og.png")
    expect(OG_IMAGE.width).toBe(1200)
    expect(OG_IMAGE.height).toBe(630)
    expect(OG_IMAGE.type).toBe("image/png")
  })

  it("pageMetadata includes OG/Twitter share images and canonical", () => {
    const meta = pageMetadata({
      title: "Button",
      description: "Button docs",
      path: "/docs/components/button",
    })
    expect(meta.alternates?.canonical).toBe("/docs/components/button")
    expect(meta.openGraph?.url).toBe(`${PRODUCTION_ORIGIN}/docs/components/button`)
    expect(meta.openGraph?.images).toEqual([
      expect.objectContaining({
        url: "/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: ogImageAltForPath("/docs/components/button"),
      }),
    ])
    expect(meta.twitter).toEqual(
      expect.objectContaining({
        card: "summary_large_image",
        images: ["/og.png"],
        site: "@_sonojs",
        creator: "@_sonojs",
      })
    )
  })

  it("uses unique component and AI meta descriptions", () => {
    const button = componentDocsMetadata("button", "Button")
    const input = componentDocsMetadata("input", "Input")
    const dialog = componentDocsMetadata("dialog", "Dialog")
    expect(button.description).toBe(COMPONENT_META_DESCRIPTIONS.button)
    expect(input.description).toBe(COMPONENT_META_DESCRIPTIONS.input)
    expect(dialog.description).toBe(COMPONENT_META_DESCRIPTIONS.dialog)
    expect(button.description).not.toBe(input.description)
    expect(button.description).not.toMatch(/Use the SonoJS Button component/)

    const toolApproval = aiDocsMetadata("tool-approval", "Tool Approval")
    expect(toolApproval.description).toBe(AI_META_DESCRIPTIONS["tool-approval"])
    expect(toolApproval.description).not.toBe(button.description)
    expect(toolApproval.description).toMatch(/tool|approval/i)
  })

  it("avoids redundant chart and cursor title suffixes", () => {
    expect(withKindSuffix("Simple Bar Chart", "chart")).toBe("Simple Bar Chart")
    expect(withKindSuffix("Area Default", "chart")).toBe("Area Default chart")
    expect(withKindSuffix("Ripple Cursor", "cursor")).toBe("Ripple Cursor")
    expect(withKindSuffix("Smooth Follower", "cursor")).toBe(
      "Smooth Follower cursor"
    )

    const chartMeta = chartViewMetadata("simple-bar-chart", "Simple Bar Chart", true)
    expect(chartMeta.title).toBe("Simple Bar Chart")
    expect(chartMeta.description).not.toMatch(/Chart chart/i)

    const cursorMeta = cursorViewMetadata("ripple-cursor", "Ripple Cursor", true)
    expect(cursorMeta.title).toBe("Ripple Cursor")
  })

  it("derives section OG alts and Twitter handle from config", () => {
    expect(twitterHandleFromConfig()).toBe("@_sonojs")
    expect(ogImageAltForPath("/docs/components/button")).toMatch(/docs/i)
    expect(ogImageAltForPath("/blocks/authentication/login")).toMatch(/blocks/i)
    expect(ogImageAltForPath("/charts/view/x")).toMatch(/charts/i)
    expect(ogImageAltForPath("/ai/tool-approval")).toMatch(/AI/i)
  })

  it("builds Organization, SoftwareApplication, WebSite, and breadcrumbs", () => {
    expect(organizationJsonLd()["@type"]).toBe("Organization")
    expect(softwareApplicationJsonLd()["@type"]).toBe("SoftwareApplication")
    expect(websiteJsonLd()["@type"]).toBe("WebSite")
    expect(websiteJsonLd().publisher).toEqual({
      "@id": organizationJsonLd()["@id"],
    })

    const crumbs = breadcrumbItemsFromPath("/docs/components/button")
    expect(crumbs.map((c) => c.name)).toEqual([
      "Home",
      "Docs",
      "Components",
      "Button",
    ])
    const jsonLd = breadcrumbListJsonLd("/docs/components/button")
    expect(jsonLd?.["@type"]).toBe("BreadcrumbList")
    expect(
      (jsonLd?.itemListElement as { position: number }[]).map((i) => i.position)
    ).toEqual([1, 2, 3, 4])
  })

  it("omits non-existent breadcrumb mid-paths like block categories", () => {
    expect(isBreadcrumbLinkedPath("/blocks/authentication")).toBe(false)
    expect(
      isBreadcrumbLinkedPath("/blocks/authentication/login", { isLeaf: true })
    ).toBe(true)
    expect(isBreadcrumbLinkedPath("/blocks")).toBe(true)
    expect(isBreadcrumbLinkedPath("/docs/components")).toBe(true)
    expect(isBreadcrumbLinkedPath("/charts/view")).toBe(false)

    const blockCrumbs = breadcrumbItemsFromPath(
      "/blocks/authentication/login"
    )
    expect(blockCrumbs.map((c) => c.path)).toEqual([
      "/",
      "/blocks",
      "/blocks/authentication/login",
    ])
    expect(blockCrumbs.map((c) => c.name)).toEqual([
      "Home",
      "Blocks",
      "Login",
    ])

    const blockJsonLd = breadcrumbListJsonLd("/blocks/authentication/login")
    const items = blockJsonLd?.itemListElement as {
      item: string
      position: number
    }[]
    expect(items.map((i) => i.item)).toEqual([
      absoluteUrl("/"),
      absoluteUrl("/blocks"),
      absoluteUrl("/blocks/authentication/login"),
    ])
    expect(
      items.some((i) => i.item.endsWith("/blocks/authentication"))
    ).toBe(false)
  })

  it("keeps homepage self-canonical via pageMetadata (not root layout)", () => {
    const home = pageMetadata({
      title: "SonoJS",
      description: "test",
      path: "/",
      absoluteTitle: true,
    })
    expect(home.alternates?.canonical).toBe("/")
  })

  it("classifies noindex paths", () => {
    expect(isNoindexPath("/view/login-01")).toBe(true)
    expect(isNoindexPath("/tools/endpoints")).toBe(true)
    expect(isNoindexPath("/tools/markdown-editor")).toBe(true)
    expect(isNoindexPath("/docs/components/button")).toBe(false)
    expect(NOINDEX_PATH_PREFIXES).toContain("/view")
    expect(NOINDEX_EXACT_PATHS).toContain("/tools/endpoints")
    expect(NOINDEX_EXACT_PATHS).toContain("/tools/markdown-editor")
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
      expect(p).not.toBe("/tools/markdown-editor")
    }
  })

  it("includes core hubs and excludes tool workspaces", () => {
    const paths = new Set(buildSitemapPaths())
    expect(paths.has("/")).toBe(true)
    expect(paths.has("/docs")).toBe(true)
    expect(paths.has("/docs/components")).toBe(true)
    expect(paths.has("/docs/components/button")).toBe(true)
    expect(paths.has("/blocks")).toBe(true)
    expect(paths.has("/charts")).toBe(true)
    expect(paths.has("/cursors")).toBe(true)
    expect(paths.has("/cursors/view/smooth-cursor-follower")).toBe(true)
    expect(paths.has("/ai")).toBe(true)
    expect(paths.has("/ai/prompt-input")).toBe(true)
    expect(paths.has("/docs/components/prompt-input")).toBe(false)
    expect(paths.has("/tools")).toBe(true)
    expect(paths.has("/tools/endpoints")).toBe(false)
    expect(paths.has("/tools/markdown-editor")).toBe(false)
    expect(paths.has("/view/login-01")).toBe(false)
    expect(paths.has("/pricing")).toBe(true)
    expect(paths.has("/marketplace")).toBe(true)
    expect(paths.has("/marketplace/sonojs-dashboard-01")).toBe(true)
    expect(paths.has("/docs/components/toast")).toBe(false)
    expect(paths.has("/docs/components/agent-code-block")).toBe(false)
  })
})
