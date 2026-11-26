import type { TemplatePreviewDetail } from "@/lib/templates-preview-data"

import { siteConfig } from "@/lib/config"
import type { ResolvedContentPage } from "@/lib/seo-content-page"
import { absoluteUrl, normalizePath, OG_IMAGE } from "@/lib/seo"

/**
 * Matches Stripe catalog checkout default (`create-product-checkout-session.ts`
 * uses `currency ?? "usd"`).
 */
export const PRODUCT_OFFER_CURRENCY = "USD" as const

export const ORGANIZATION_ID = absoluteUrl("/#organization")
export const WEBSITE_ID = absoluteUrl("/#website")
export const SOFTWARE_ID = absoluteUrl("/#software")

export function organizationSameAsUrls(): string[] {
  const candidates = [
    siteConfig.links.github,
    siteConfig.links.x,
    siteConfig.links.linkedin,
    siteConfig.links.youtube,
    siteConfig.links.npm,
  ]
  const seen = new Set<string>()
  const out: string[] = []
  for (const url of candidates) {
    const trimmed = url?.trim()
    if (!trimmed || seen.has(trimmed)) continue
    seen.add(trimmed)
    out.push(trimmed)
  }
  return out
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(OG_IMAGE.url),
    },
    sameAs: organizationSameAsUrls(),
  }
}

export function softwareApplicationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    applicationCategory: "DeveloperApplication",
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/pricing"),
      price: 0,
      priceCurrency: PRODUCT_OFFER_CURRENCY,
    },
    publisher: { "@id": ORGANIZATION_ID },
  }
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    publisher: { "@id": ORGANIZATION_ID },
  }
}

export type BreadcrumbItem = {
  name: string
  path: string
}

function titleCaseSegment(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

const SECTION_LABELS: Record<string, string> = {
  docs: "Docs",
  components: "Components",
  blocks: "Blocks",
  charts: "Charts",
  ai: "AI",
  "3d": "3D",
  carousels: "Carousels",
  cursors: "Cursors",
  tools: "Tools",
  templates: "Templates",
  websites: "Websites",
  backgrounds: "Backgrounds",
  popups: "Popups",
  pricing: "Pricing",
  about: "About",
  contact: "Contact",
  legal: "Legal",
}

/**
 * Whether a breadcrumb crumb may expose a URL in JSON-LD.
 * Skip known non-pages (e.g. `/blocks/authentication`) so Rich Results
 * never point at 404s. The leaf path is always linked (page is rendering).
 */
export function isBreadcrumbLinkedPath(
  path: string,
  options: { isLeaf?: boolean } = {}
): boolean {
  const normalized = normalizePath(path)
  if (options.isLeaf || normalized === "/") return true

  const parts = normalized.replace(/^\//, "").split("/").filter(Boolean)

  // Top-level section hubs with real index pages
  if (parts.length === 1) {
    return (
      SECTION_LABELS[parts[0]] !== undefined ||
      parts[0] === "pricing" ||
      parts[0] === "templates"
    )
  }

  // /docs/components and guide pages under /docs/<slug>
  if (parts[0] === "docs" && parts.length === 2) return true

  // /charts/<category> hubs exist; /charts/view does not (only /charts/view/[id])
  if (parts[0] === "charts" && parts.length === 2 && parts[1] !== "view") {
    return true
  }

  // Block categories like /blocks/authentication have no index page
  if (parts[0] === "blocks" && parts.length === 2) return false

  // Cursor mid-segment without a page
  if (parts[0] === "cursors" && parts.length === 2 && parts[1] === "view") {
    return false
  }

  return false
}

/**
 * Build breadcrumb items from a pathname (leading Home).
 * Intermediate crumbs without a real page are omitted so JSON-LD never
 * links to 404s like `/blocks/authentication`.
 * Example: /docs/components/button → Home › Docs › Components › Button
 * Example: /blocks/authentication/login → Home › Blocks › Login
 */
export type BreadcrumbBuildOptions = {
  /** Override the visible name on the leaf crumb (canonical path unchanged). */
  leafLabel?: string
}

export function breadcrumbItemsFromPath(
  pathname: string,
  options: BreadcrumbBuildOptions = {}
): BreadcrumbItem[] {
  const normalized = normalizePath(pathname)
  const items: BreadcrumbItem[] = [{ name: "Home", path: "/" }]
  if (normalized === "/") return items

  const segments = normalized.replace(/^\//, "").split("/").filter(Boolean)
  let acc = ""
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]!
    acc += `/${segment}`
    const isLeaf = i === segments.length - 1
    if (!isBreadcrumbLinkedPath(acc, { isLeaf })) continue
    const name = SECTION_LABELS[segment] ?? titleCaseSegment(segment)
    items.push({ name, path: acc })
  }

  const leafLabel = options.leafLabel?.trim()
  if (leafLabel && items.length > 1) {
    const last = items[items.length - 1]!
    items[items.length - 1] = { ...last, name: leafLabel }
  }

  return items
}

export function productCoverImagePath(
  detail: Pick<TemplatePreviewDetail, "coverSrc" | "project">
): string | null {
  const fromProject =
    detail.project.detailCoverImage?.trim() ||
    detail.project.coverImage?.trim() ||
    null
  const fromCard = detail.coverSrc?.trim() || null
  return fromProject || fromCard
}

export type ProductJsonLdInput = {
  name: string
  description: string
  path: string
  priceCents: number
  imagePath?: string | null
}

/** Product snippet for a single catalog item. Never emits ratings or reviews. */
export function productJsonLd(input: ProductJsonLdInput): Record<string, unknown> {
  const path = normalizePath(input.path)
  const cents = Number.isFinite(input.priceCents)
    ? Math.max(0, Math.floor(input.priceCents))
    : 0
  const price = (cents / 100).toFixed(2)
  const imagePath = input.imagePath?.trim()

  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(path)}#product`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(path),
    brand: { "@id": ORGANIZATION_ID },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: PRODUCT_OFFER_CURRENCY,
      url: absoluteUrl(path),
    },
  }

  if (imagePath) {
    json.image = absoluteUrl(imagePath)
  }

  return json
}

export type ContentPageJsonLdInput = Pick<
  ResolvedContentPage,
  "pathname" | "title" | "description" | "schemaType"
>

const TYPESCRIPT = "TypeScript"

function contentPageBase(input: ContentPageJsonLdInput): Record<string, unknown> {
  const path = normalizePath(input.pathname)
  return {
    "@context": "https://schema.org",
    name: input.title,
    headline: input.title,
    description: input.description,
    url: absoluteUrl(path),
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
  }
}

/** Article-style technical docs (`/docs` guides). No fabricated author or date fields. */
export function techArticleJsonLd(
  input: ContentPageJsonLdInput
): Record<string, unknown> {
  const path = normalizePath(input.pathname)
  return {
    ...contentPageBase(input),
    "@type": "TechArticle",
    "@id": `${absoluteUrl(path)}#article`,
    mainEntityOfPage: absoluteUrl(path),
  }
}

/** Section hubs and chart category indexes. */
export function webPageJsonLd(
  input: ContentPageJsonLdInput
): Record<string, unknown> {
  const path = normalizePath(input.pathname)
  return {
    ...contentPageBase(input),
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
  }
}

/** Installable React source (component docs, AI, chart demos). */
export function softwareSourceCodeJsonLd(
  input: ContentPageJsonLdInput
): Record<string, unknown> {
  const path = normalizePath(input.pathname)
  return {
    ...contentPageBase(input),
    "@type": "SoftwareSourceCode",
    "@id": `${absoluteUrl(path)}#sourcecode`,
    programmingLanguage: TYPESCRIPT,
    runtimePlatform: "React",
    codeRepository: siteConfig.links.github,
  }
}

/** Copy-ready UI sections and cursor effects. */
export function creativeWorkJsonLd(
  input: ContentPageJsonLdInput
): Record<string, unknown> {
  const path = normalizePath(input.pathname)
  return {
    ...contentPageBase(input),
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(path)}#creativework`,
    creator: { "@id": ORGANIZATION_ID },
  }
}

export function contentPageJsonLd(
  input: ContentPageJsonLdInput
): Record<string, unknown> | null {
  switch (input.schemaType) {
    case "TechArticle":
      return techArticleJsonLd(input)
    case "WebPage":
      return webPageJsonLd(input)
    case "SoftwareSourceCode":
      return softwareSourceCodeJsonLd(input)
    case "CreativeWork":
      return creativeWorkJsonLd(input)
    default:
      return null
  }
}

export function breadcrumbListJsonLd(
  pathname: string,
  options: BreadcrumbBuildOptions = {}
): Record<string, unknown> | null {
  const items = breadcrumbItemsFromPath(pathname, options)
  if (items.length < 2) return null

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
