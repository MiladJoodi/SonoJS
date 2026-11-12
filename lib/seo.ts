import type { Metadata } from "next"

import { siteConfig } from "@/lib/config"
import {
  aiMetaDescription,
  componentMetaDescription,
} from "@/lib/seo-descriptions"
import { PRODUCTION_ORIGIN } from "@/lib/site-origin"

export { PRODUCTION_ORIGIN }

/** Committed share image at `public/og.png` (1200×630). */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "SonoJS - React components, blocks, charts, and tools",
} as const

/** Twitter/X handle from siteConfig.links.x (e.g. https://x.com/_sonojs → @_sonojs). */
export function twitterHandleFromConfig(): string {
  try {
    const { pathname } = new URL(siteConfig.links.x)
    const handle = pathname.replace(/^\/+/, "").split("/")[0]
    if (!handle) return "@_sonojs"
    return handle.startsWith("@") ? handle : `@${handle}`
  } catch {
    return "@_sonojs"
  }
}

export type OgSection = "docs" | "blocks" | "charts" | "ai" | "default"

export function ogSectionFromPath(path: string): OgSection {
  const normalized = normalizePath(path)
  if (normalized === "/docs" || normalized.startsWith("/docs/")) return "docs"
  if (normalized === "/blocks" || normalized.startsWith("/blocks/")) return "blocks"
  if (normalized === "/charts" || normalized.startsWith("/charts/")) return "charts"
  if (normalized === "/ai" || normalized.startsWith("/ai/")) return "ai"
  return "default"
}

const OG_SECTION_ALT: Record<OgSection, string> = {
  docs: "SonoJS docs — React components for Tailwind apps",
  blocks: "SonoJS blocks — ready-to-use interface sections",
  charts: "SonoJS charts — interactive React chart demos",
  ai: "SonoJS AI — components for agent and chat interfaces",
  default: OG_IMAGE.alt,
}

export function ogImageAltForPath(path: string, titleFallback?: string): string {
  const section = ogSectionFromPath(path)
  if (section !== "default") return OG_SECTION_ALT[section]
  return titleFallback ? `${titleFallback} — ${siteConfig.name}` : OG_SECTION_ALT.default
}

function shareImages(
  path: string,
  title?: string
): NonNullable<Metadata["openGraph"]>["images"] {
  return [
    {
      url: OG_IMAGE.url,
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
      type: OG_IMAGE.type,
      alt: ogImageAltForPath(path, title),
    },
  ]
}

/** Append kind only when the title does not already end with that word. */
export function withKindSuffix(
  title: string,
  kind: "chart" | "cursor"
): string {
  const trimmed = title.trim()
  const pattern = kind === "chart" ? /\bcharts?\s*$/i : /\bcursors?\s*$/i
  if (pattern.test(trimmed)) return trimmed
  return `${trimmed} ${kind}`
}

/** Paths / prefixes that must never appear in the sitemap and use noindex. */
export const NOINDEX_PATH_PREFIXES = ["/view"] as const
export const NOINDEX_EXACT_PATHS = [
  "/tools/endpoints",
  "/tools/markdown-editor",
  "/tools/flags",
] as const

export function isProductionIndexingEnabled(): boolean {
  if (process.env.SEO_NOINDEX === "1") return false
  const vercelEnv = process.env.VERCEL_ENV
  if (vercelEnv && vercelEnv !== "production") return false
  return true
}

/** Normalize to a leading-slash path without trailing slash (except `/`). */
export function normalizePath(path: string): string {
  const trimmed = path.trim()
  if (!trimmed || trimmed === "/") return "/"
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`
  return withSlash.replace(/\/+$/, "") || "/"
}

export function absoluteUrl(path: string): string {
  const normalized = normalizePath(path)
  if (normalized === "/") return PRODUCTION_ORIGIN
  return `${PRODUCTION_ORIGIN}${normalized}`
}

export function isNoindexPath(path: string): boolean {
  const normalized = normalizePath(path)
  if ((NOINDEX_EXACT_PATHS as readonly string[]).includes(normalized)) {
    return true
  }
  return NOINDEX_PATH_PREFIXES.some(
    (prefix) =>
      normalized === prefix || normalized.startsWith(`${prefix}/`)
  )
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
  /** Defaults to true when production indexing is enabled. */
  index?: boolean
  /** Use absolute title (skip `%s · SonoJS` template). */
  absoluteTitle?: boolean
}

function robotsFor(index: boolean): Metadata["robots"] {
  if (!isProductionIndexingEnabled() || !index) {
    return {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    }
  }
  return { index: true, follow: true }
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const normalized = normalizePath(path)
  const url = absoluteUrl(normalized)
  const shouldIndex = index && !isNoindexPath(normalized)
  const twitterHandle = twitterHandleFromConfig()

  const images = shareImages(normalized, title)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: normalized,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
      site: twitterHandle,
      creator: twitterHandle,
    },
    robots: robotsFor(shouldIndex),
  }
}

export function noindexMetadata({
  title,
  description,
  path,
}: {
  title: string
  description?: string
  path?: string
}): Metadata {
  const desc =
    description ??
    `${title} preview - not indexed. See the SonoJS docs and blocks catalogs.`
  if (path) {
    return pageMetadata({
      title,
      description: desc,
      path,
      index: false,
    })
  }
  return {
    title,
    description: desc,
    robots: robotsFor(false),
  }
}

export function componentDocsMetadata(slug: string, title: string): Metadata {
  return pageMetadata({
    title,
    description: componentMetaDescription(slug, title),
    path: `/docs/components/${slug}`,
  })
}

export function aiDocsMetadata(slug: string, title: string): Metadata {
  return pageMetadata({
    title,
    description: aiMetaDescription(slug, title),
    path: `/ai/${slug}`,
  })
}

export function docsGuideMetadata(
  path: string,
  title: string,
  description: string
): Metadata {
  return pageMetadata({ title, description, path })
}

export function blocksPageMetadata(
  path: string,
  title: string,
  description: string
): Metadata {
  return pageMetadata({ title, description, path })
}

export function chartCategoryMetadata(
  category: string,
  title: string,
  description: string
): Metadata {
  const trimmed = title.trim()
  const displayTitle = /\bcharts?\s*$/i.test(trimmed)
    ? trimmed
    : `${trimmed} charts`
  return pageMetadata({
    title: displayTitle,
    description,
    path: `/charts/${category}`,
  })
}

export function chartViewMetadata(
  id: string,
  title: string,
  index: boolean
): Metadata {
  const displayTitle = withKindSuffix(title, "chart")
  return pageMetadata({
    title: displayTitle,
    description: `Interactive ${title} demo for SonoJS - preview, install command, and source.`,
    path: `/charts/view/${id}`,
    index,
  })
}

export function cursorCategoryMetadata(
  category: string,
  title: string,
  description: string
): Metadata {
  const trimmed = title.trim()
  const displayTitle = /\bcursors?\s*$/i.test(trimmed)
    ? trimmed
    : `${trimmed} cursors`
  return pageMetadata({
    title: displayTitle,
    description,
    path: `/cursors/${category}`,
  })
}

export function cursorViewMetadata(
  id: string,
  title: string,
  index: boolean
): Metadata {
  const displayTitle = withKindSuffix(title, "cursor")
  return pageMetadata({
    title: displayTitle,
    description: `Interactive ${title} demo for SonoJS - preview, install command, and source.`,
    path: `/cursors/view/${id}`,
    index,
  })
}
