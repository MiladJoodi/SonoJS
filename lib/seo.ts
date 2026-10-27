import type { Metadata } from "next"

import { siteConfig } from "@/lib/config"
import { PRODUCTION_ORIGIN } from "@/lib/site-origin"

export { PRODUCTION_ORIGIN }

/** Paths / prefixes that must never appear in the sitemap and use noindex. */
export const NOINDEX_PATH_PREFIXES = ["/view"] as const
export const NOINDEX_EXACT_PATHS = ["/tools/endpoints"] as const

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
    `${title} preview — not indexed. See the SonoJS docs and blocks catalogs.`
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
    description: `Use the SonoJS ${title} component in React with Tailwind. Install with the SonoJS CLI and own the source in your app.`,
    path: `/docs/components/${slug}`,
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
  return pageMetadata({
    title: `${title} charts`,
    description,
    path: `/charts/${category}`,
  })
}

export function chartViewMetadata(
  id: string,
  title: string,
  index: boolean
): Metadata {
  return pageMetadata({
    title: `${title} chart`,
    description: `Interactive ${title} chart demo for SonoJS — preview, install command, and source.`,
    path: `/charts/view/${id}`,
    index,
  })
}
