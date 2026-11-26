import { afterEach, describe, expect, it, vi } from "vitest"

import {
  absoluteUrl,
  aiDocsMetadata,
  chartViewMetadata,
  componentDocsMetadata,
  cursorMetadata,
  isNoindexPath,
  isProductionIndexingEnabled,
  normalizePath,
  NOINDEX_EXACT_PATHS,
  NOINDEX_PATH_PREFIXES,
  OG_IMAGE,
  ogImageAltForPath,
  pageMetadata,
  productDetailPageMetadata,
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
  contentPageJsonLd,
  creativeWorkJsonLd,
  isBreadcrumbLinkedPath,
  organizationJsonLd,
  softwareSourceCodeJsonLd,
  techArticleJsonLd,
  webPageJsonLd,
  organizationSameAsUrls,
  PRODUCT_OFFER_CURRENCY,
  productJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo-jsonld"
import { templateProjects } from "@/lib/templates-catalog"
import { siteConfig } from "@/lib/config"
import {
  isBreadcrumbEligiblePath,
  resolveBreadcrumbLeafLabel,
} from "@/lib/seo-breadcrumb-labels"
import { DOCS_GUIDE_PAGE_TITLES } from "@/lib/docs-guide-titles"
import { docsNav } from "@/lib/docs-nav"
import { chartsCatalog } from "@/lib/charts-catalog"
import {
  isContentJsonLdEligiblePath,
  resolveContentPage,
} from "@/lib/seo-content-page"
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

    const cursorMeta = cursorMetadata("ripple-cursor", "Ripple Cursor", true)
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
    const logo = organizationJsonLd().logo as { url?: string }
    expect(logo?.url).toBe(absoluteUrl(OG_IMAGE.url))
    const sameAs = organizationJsonLd().sameAs as string[]
    expect(sameAs).toEqual(organizationSameAsUrls())
    expect(sameAs).toContain(siteConfig.links.github)
    expect(sameAs).toContain(siteConfig.links.x)
    expect(sameAs).toContain(siteConfig.links.linkedin)
    expect(sameAs).toContain(siteConfig.links.youtube)
    expect(sameAs).toContain(siteConfig.links.npm)
    for (const url of sameAs) {
      expect(url.startsWith("https://")).toBe(true)
    }
    const appOffers = softwareApplicationJsonLd().offers as {
      price: number
      priceCurrency: string
    }
    expect(appOffers.price).toBe(0)
    expect(appOffers.priceCurrency).toBe(PRODUCT_OFFER_CURRENCY)
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
    expect(paths.has("/cursors/smooth-cursor-follower")).toBe(true)
    expect(paths.has("/cursors/view/smooth-cursor-follower")).toBe(false)
    expect(paths.has("/backgrounds/embers")).toBe(true)
    expect(paths.has("/backgrounds/view/embers")).toBe(false)
    expect(paths.has("/ai")).toBe(true)
    expect(paths.has("/ai/prompt-input")).toBe(true)
    expect(paths.has("/popups")).toBe(true)
    expect(paths.has("/popups/sale-tag")).toBe(true)
    expect(paths.has("/popups/sale-signup")).toBe(true)
    expect(paths.has("/popups/fork-ribbon")).toBe(true)
    expect(paths.has("/popups/holiday-popup")).toBe(true)
    expect(paths.has("/popups/early-gift")).toBe(true)
    expect(paths.has("/popups/mystery-box")).toBe(true)
    expect(paths.has("/popups/black-friday-hero")).toBe(true)
    expect(paths.has("/popups/black-week")).toBe(true)
    expect(paths.has("/popups/blackout")).toBe(true)
    expect(paths.has("/popups/midnight-drop")).toBe(true)
    expect(paths.has("/popups/price-crash")).toBe(true)
    expect(paths.has("/popups/decrypt")).toBe(true)
    expect(paths.has("/popups/age-check")).toBe(true)
    expect(paths.has("/popups/away-notice")).toBe(true)
    expect(paths.has("/popups/advent-door")).toBe(true)
    expect(paths.has("/popups/feedback")).toBe(true)
    expect(paths.has("/popups/contact")).toBe(true)
    expect(paths.has("/popups/event-invite")).toBe(true)
    expect(paths.has("/popups/get-the-app")).toBe(true)
    expect(paths.has("/popups/follow-us")).toBe(true)
    expect(paths.has("/popups/new-arrival")).toBe(true)
    expect(paths.has("/popups/notify-me")).toBe(true)
    expect(paths.has("/popups/chrome-bloom")).toBe(true)
    expect(paths.has("/popups/glass-cube")).toBe(true)
    expect(paths.has("/popups/welcome-offer")).toBe(true)
    expect(paths.has("/popups/cyber-monday")).toBe(true)
    expect(paths.has("/popups/scratch-to-win")).toBe(true)
    expect(paths.has("/popups/lights-out")).toBe(true)
    expect(paths.has("/popups/luck-wheel")).toBe(true)
    expect(paths.has("/docs/components/prompt-input")).toBe(false)
    expect(paths.has("/tools")).toBe(true)
    expect(paths.has("/tools/endpoints")).toBe(false)
    expect(paths.has("/tools/markdown-editor")).toBe(false)
    expect(paths.has("/view/login-01")).toBe(false)
    expect(paths.has("/pricing")).toBe(true)
    expect(paths.has("/templates")).toBe(true)
    expect(paths.has("/websites")).toBe(true)
    expect(paths.has("/templates/sonojs-dashboard-01")).toBe(true)
    expect(paths.has("/templates/sonojs-website-01")).toBe(false)
    expect(paths.has("/websites/sonojs-website-01")).toBe(true)
    expect(paths.has("/about")).toBe(false)
    expect(paths.has("/contact")).toBe(true)
    expect(paths.has("/backgrounds")).toBe(true)
    expect(paths.has("/legal")).toBe(true)
    expect(paths.has("/legal/terms")).toBe(true)
    expect(paths.has("/docs/components/toast")).toBe(false)
    expect(paths.has("/docs/components/agent-code-block")).toBe(false)
  })
})

describe("product JSON-LD", () => {
  it("emits Product with USD offers and no ratings", () => {
    const json = productJsonLd({
      name: "Commerce Admin",
      description: "Admin panel template",
      path: "/templates/sonojs-dashboard-01",
      priceCents: 0,
    })
    expect(json["@type"]).toBe("Product")
    expect(json["@id"]).toBe(
      `${PRODUCTION_ORIGIN}/templates/sonojs-dashboard-01#product`
    )
    expect(json.aggregateRating).toBeUndefined()
    expect(json.review).toBeUndefined()
    const offers = json.offers as { price: string; priceCurrency: string; url: string }
    expect(offers.price).toBe("0.00")
    expect(offers.priceCurrency).toBe(PRODUCT_OFFER_CURRENCY)
    expect(offers.url).toBe(
      `${PRODUCTION_ORIGIN}/templates/sonojs-dashboard-01`
    )
  })

  it("formats paid prices from cents", () => {
    const json = productJsonLd({
      name: "Pro pack",
      description: "Paid template",
      path: "/templates/pro-example",
      priceCents: 1999,
    })
    expect((json.offers as { price: string }).price).toBe("19.99")
  })

  it("includes absolute image when provided", () => {
    const json = productJsonLd({
      name: "T",
      description: "D",
      path: "/websites/site-01",
      priceCents: 0,
      imagePath: "/templates/projects/x/cover-light.webp",
    })
    expect(json.image).toBe(
      absoluteUrl("/templates/projects/x/cover-light.webp")
    )
  })
})

describe("product detail metadata", () => {
  it("uses catalog cover for Open Graph when provided", () => {
    const cover =
      "/templates/projects/dashboard/sonojs-dashboard-01/cover-light.webp"
    const meta = productDetailPageMetadata({
      title: "Commerce Admin Dashboard",
      description: "Admin template",
      path: "/templates/sonojs-dashboard-01",
      coverImagePath: cover,
    })
    expect(meta.alternates?.canonical).toBe("/templates/sonojs-dashboard-01")
    expect(meta.openGraph?.url).toBe(
      `${PRODUCTION_ORIGIN}/templates/sonojs-dashboard-01`
    )
    expect(meta.openGraph?.images).toEqual([
      expect.objectContaining({
        url: cover,
        type: "image/webp",
      }),
    ])
    expect(meta.twitter?.images).toEqual([cover])
  })
})

describe("content page JSON-LD", () => {
  it("emits TechArticle for docs guides with canonical URLs", () => {
    const page = resolveContentPage("/docs/installation")
    expect(page?.schemaType).toBe("TechArticle")
    expect(page?.title).toBe("Installation")
    const json = techArticleJsonLd(page!)
    expect(json["@type"]).toBe("TechArticle")
    expect(json.url).toBe(`${PRODUCTION_ORIGIN}/docs/installation`)
    expect(json).not.toHaveProperty("author")
    expect(json).not.toHaveProperty("datePublished")
    expect(json).not.toHaveProperty("aggregateRating")
  })

  it("emits SoftwareSourceCode for component docs", () => {
    const page = resolveContentPage("/docs/components/button")
    expect(page?.schemaType).toBe("SoftwareSourceCode")
    const json = softwareSourceCodeJsonLd(page!)
    expect(json["@type"]).toBe("SoftwareSourceCode")
    expect(json.programmingLanguage).toBe("TypeScript")
    expect(json.url).toBe(`${PRODUCTION_ORIGIN}/docs/components/button`)
    expect(contentPageJsonLd(page!)?.["@type"]).toBe("SoftwareSourceCode")
  })

  it("emits CreativeWork for blocks and WebPage for hubs", () => {
    const block = resolveContentPage("/blocks/authentication/login")
    expect(block?.schemaType).toBe("CreativeWork")
    expect(creativeWorkJsonLd(block!)["@type"]).toBe("CreativeWork")

    const hub = resolveContentPage("/charts")
    expect(hub?.schemaType).toBe("WebPage")
    expect(webPageJsonLd(hub!)["@type"]).toBe("WebPage")
  })

  it("skips product routes, noindex chart views, and cursor embeds", () => {
    expect(isContentJsonLdEligiblePath("/templates/sonojs-dashboard-01")).toBe(
      false
    )
    const pendingChart = chartsCatalog.find((c) => c.status === "pending")
    if (pendingChart) {
      expect(
        isContentJsonLdEligiblePath(`/charts/view/${pendingChart.id}`)
      ).toBe(false)
    }
    expect(
      isContentJsonLdEligiblePath("/cursors/view/smooth-cursor-follower")
    ).toBe(false)
  })
})

describe("breadcrumb coverage", () => {
  it("skips ineligible routes", () => {
    expect(isBreadcrumbEligiblePath("/")).toBe(false)
    expect(isBreadcrumbEligiblePath("/view/login-01")).toBe(false)
    expect(isBreadcrumbEligiblePath("/admin")).toBe(false)
    expect(isBreadcrumbEligiblePath("/account")).toBe(false)
    expect(isBreadcrumbEligiblePath("/sign-in")).toBe(false)
    expect(
      isBreadcrumbEligiblePath("/cursors/view/smooth-cursor-follower")
    ).toBe(false)
    expect(isBreadcrumbEligiblePath("/docs")).toBe(true)
    expect(isBreadcrumbEligiblePath("/templates")).toBe(true)
  })

  it("uses each guide page title as the breadcrumb leaf", () => {
    expect(resolveBreadcrumbLeafLabel("/docs")).toBe("Introduction")
    expect(resolveBreadcrumbLeafLabel("/docs/installation")).toBe("Installation")
    expect(resolveBreadcrumbLeafLabel("/docs/mcp")).toBe("MCP Server")
    expect(resolveBreadcrumbLeafLabel("/docs/direction")).toBe(
      "Direction (RTL / LTR)"
    )
  })

  it("keeps DOCS_GUIDE_PAGE_TITLES aligned with docsNav.top", () => {
    for (const page of docsNav.top) {
      expect(
        DOCS_GUIDE_PAGE_TITLES[
          page.href as keyof typeof DOCS_GUIDE_PAGE_TITLES
        ]
      ).toBe(page.title)
    }
  })

  it("resolves catalog leaf labels", () => {
    expect(resolveBreadcrumbLeafLabel("/docs/components/button")).toBe("Button")
    expect(resolveBreadcrumbLeafLabel("/legal/privacy")).toBe("Privacy Policy")
    expect(resolveBreadcrumbLeafLabel("/templates/sonojs-dashboard-01")).toBe(
      "Commerce Admin Dashboard"
    )
  })

  it("builds template detail trails with canonical URLs", () => {
    const path = "/templates/sonojs-dashboard-01"
    const crumbs = breadcrumbItemsFromPath(path, {
      leafLabel: resolveBreadcrumbLeafLabel(path) ?? undefined,
    })
    expect(crumbs.map((c) => c.path)).toEqual(["/", "/templates", path])
    expect(crumbs.map((c) => c.name)).toEqual([
      "Home",
      "Templates",
      "Commerce Admin Dashboard",
    ])
    const jsonLd = breadcrumbListJsonLd(path, {
      leafLabel: resolveBreadcrumbLeafLabel(path) ?? undefined,
    })
    const items = jsonLd?.itemListElement as { item: string }[]
    expect(items.map((i) => i.item)).toEqual([
      absoluteUrl("/"),
      absoluteUrl("/templates"),
      absoluteUrl(path),
    ])
  })

  it("builds chart view trails without linking /charts/view", () => {
    const path = "/charts/view/simple-bar-chart"
    const crumbs = breadcrumbItemsFromPath(path, {
      leafLabel: resolveBreadcrumbLeafLabel(path) ?? undefined,
    })
    expect(crumbs.map((c) => c.path)).toEqual(["/", "/charts", path])
    expect(crumbs.some((c) => c.path === "/charts/view")).toBe(false)
  })

  it("builds website hub and detail trails", () => {
    const hub = breadcrumbItemsFromPath("/websites")
    expect(hub.map((c) => c.name)).toEqual(["Home", "Websites"])
    const slug = templateProjects.find((p) => p.category === "website")?.slug
    expect(slug).toBeTruthy()
    if (!slug) return
    const path = `/websites/${slug}`
    const crumbs = breadcrumbItemsFromPath(path, {
      leafLabel: resolveBreadcrumbLeafLabel(path) ?? undefined,
    })
    expect(crumbs[1]?.path).toBe("/websites")
  })
})

describe("legacy marketplace slug mapping", () => {
  const slugs = new Set(templateProjects.map((p) => p.slug))

  it("keeps indexed marketplace examples on real template slugs", () => {
    expect(slugs.has("sonojs-landing-02")).toBe(true)
    expect(slugs.has("sonojs-landing-03")).toBe(true)
    expect(slugs.has("sonojs-hero-05")).toBe(true)
  })
})
