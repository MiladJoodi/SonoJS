import { siteConfig } from "@/lib/config"
import { absoluteUrl, normalizePath } from "@/lib/seo"

export const ORGANIZATION_ID = absoluteUrl("/#organization")
export const WEBSITE_ID = absoluteUrl("/#website")
export const SOFTWARE_ID = absoluteUrl("/#software")

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.x,
      siteConfig.links.linkedin,
    ],
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
  pricing: "Pricing",
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
export function breadcrumbItemsFromPath(pathname: string): BreadcrumbItem[] {
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
  return items
}

export function breadcrumbListJsonLd(
  pathname: string
): Record<string, unknown> | null {
  const items = breadcrumbItemsFromPath(pathname)
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
