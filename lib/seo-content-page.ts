import { getAiCurrentLabel } from "@/lib/ai-nav"
import {
  CHART_CATEGORY_META,
  getChartEntry,
  isChartCategory,
} from "@/lib/charts-catalog"
import { cursorsCatalog } from "@/lib/cursors-catalog"
import { getBlocksCurrentLabel } from "@/lib/blocks-nav"
import { getChartsCurrentLabel } from "@/lib/charts-nav"
import { getCursorsCurrentLabel } from "@/lib/cursors-nav"
import {
  DOCS_GUIDE_PAGE_DESCRIPTIONS,
  DOCS_GUIDE_PAGE_TITLES,
  type DocsGuidePagePath,
} from "@/lib/docs-guide-titles"
import { getDocsCurrentLabel, isComponentsDocsPath } from "@/lib/docs-nav"
import { isBreadcrumbEligiblePath } from "@/lib/seo-breadcrumb-labels"
import { isNoindexPath, normalizePath, withKindSuffix } from "@/lib/seo"
import {
  aiMetaDescription,
  componentMetaDescription,
} from "@/lib/seo-descriptions"

export type ContentJsonLdSchemaType =
  | "TechArticle"
  | "WebPage"
  | "SoftwareSourceCode"
  | "CreativeWork"

export type ResolvedContentPage = {
  pathname: string
  title: string
  description: string
  schemaType: ContentJsonLdSchemaType
}

const CONTENT_ROOT_PREFIXES = [
  "/docs",
  "/blocks",
  "/charts",
  "/ai",
  "/cursors",
] as const

const HUB_PAGES: Record<string, { title: string; description: string }> = {
  "/docs/components": {
    title: "Components",
    description:
      "Browse SonoJS React components - accessible, Tailwind-styled, copy-source UI primitives for your app.",
  },
  "/blocks": {
    title: "Blocks",
    description:
      "Copy-ready UI sections for auth, marketing, ecommerce, dashboards, and more, preview variants, then install with the CLI.",
  },
  "/charts": {
    title: "Charts",
    description:
      "Browse SonoJS chart demos with live thumbnails - install React chart examples with the CLI.",
  },
  "/ai": {
    title: "AI",
    description: "Preview installable AI UI for React, then add it with the CLI.",
  },
  "/cursors": {
    title: "Cursors",
    description:
      "Preview installable cursor effects for React, then add them with the CLI.",
  },
}

function isDocsGuidePath(path: string): path is DocsGuidePagePath {
  return path in DOCS_GUIDE_PAGE_TITLES
}

function schemaTypeForPath(normalized: string): ContentJsonLdSchemaType | null {
  if (isDocsGuidePath(normalized)) return "TechArticle"
  if (normalized in HUB_PAGES) return "WebPage"
  if (isComponentsDocsPath(normalized)) return "SoftwareSourceCode"
  if (normalized.startsWith("/ai/")) return "SoftwareSourceCode"
  if (normalized.startsWith("/blocks/")) return "CreativeWork"
  if (normalized.startsWith("/charts/view/")) return "SoftwareSourceCode"
  if (normalized.startsWith("/charts/") && normalized !== "/charts") {
    const segment = normalized.slice("/charts/".length)
    if (isChartCategory(segment)) return "WebPage"
  }
  if (normalized.startsWith("/cursors/") && normalized !== "/cursors") {
    return "CreativeWork"
  }
  return null
}

function chartCategoryDisplayTitle(title: string): string {
  const trimmed = title.trim()
  return /\bcharts?\s*$/i.test(trimmed) ? trimmed : `${trimmed} charts`
}

function blocksMetaDescription(title: string): string {
  return `Ready-to-use ${title} UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.`
}

function resolveChartCategoryDescription(category: string): string | null {
  if (!isChartCategory(category)) return null
  const meta = CHART_CATEGORY_META[category]
  const title = chartCategoryDisplayTitle(meta.title)
  return `${meta.description} Browse ${title} for React with live demos and CLI install.`
}

function isCursorDetailIndexable(pathname: string): boolean {
  const id = pathname.slice("/cursors/".length)
  const entry = cursorsCatalog.find((e) => e.id === id)
  return entry?.status === "ported"
}

export function isContentJsonLdEligiblePath(pathname: string): boolean {
  const normalized = normalizePath(pathname)
  if (!isBreadcrumbEligiblePath(normalized)) return false
  if (isNoindexPath(normalized)) return false
  if (/^\/(templates|websites)(\/|$)/.test(normalized)) return false

  const inScope = CONTENT_ROOT_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`)
  )
  if (!inScope) return false

  if (normalized.startsWith("/charts/view/")) {
    const id = normalized.slice("/charts/view/".length)
    return getChartEntry(id)?.status === "ported"
  }

  if (
    normalized.startsWith("/cursors/") &&
    normalized !== "/cursors" &&
    !normalized.startsWith("/cursors/view")
  ) {
    return isCursorDetailIndexable(normalized)
  }

  return schemaTypeForPath(normalized) !== null
}

export function resolveContentPage(
  pathname: string
): ResolvedContentPage | null {
  const normalized = normalizePath(pathname)
  if (!isContentJsonLdEligiblePath(normalized)) return null

  const schemaType = schemaTypeForPath(normalized)
  if (!schemaType) return null

  if (isDocsGuidePath(normalized)) {
    return {
      pathname: normalized,
      title: DOCS_GUIDE_PAGE_TITLES[normalized],
      description: DOCS_GUIDE_PAGE_DESCRIPTIONS[normalized],
      schemaType,
    }
  }

  const hub = HUB_PAGES[normalized]
  if (hub) {
    return {
      pathname: normalized,
      title: hub.title,
      description: hub.description,
      schemaType,
    }
  }

  if (normalized === "/docs/components") {
    return {
      pathname: normalized,
      ...HUB_PAGES["/docs/components"],
      schemaType,
    }
  }

  if (isComponentsDocsPath(normalized)) {
    const slug = normalized.slice("/docs/components/".length)
    const title = getDocsCurrentLabel(normalized)
    if (!title) return null
    return {
      pathname: normalized,
      title,
      description: componentMetaDescription(slug, title),
      schemaType,
    }
  }

  if (normalized.startsWith("/ai/")) {
    const slug = normalized.slice("/ai/".length)
    const title = getAiCurrentLabel(normalized)
    if (!title) return null
    return {
      pathname: normalized,
      title,
      description: aiMetaDescription(slug, title),
      schemaType,
    }
  }

  if (normalized.startsWith("/blocks/")) {
    const title = getBlocksCurrentLabel(normalized)
    if (!title) return null
    return {
      pathname: normalized,
      title,
      description: blocksMetaDescription(title),
      schemaType,
    }
  }

  if (normalized.startsWith("/charts/view/")) {
    const id = normalized.slice("/charts/view/".length)
    const entry = getChartEntry(id)
    if (!entry) return null
    const title = withKindSuffix(entry.title, "chart")
    return {
      pathname: normalized,
      title,
      description: `Interactive ${entry.title} demo for SonoJS - preview, install command, and source.`,
      schemaType,
    }
  }

  if (normalized.startsWith("/charts/") && normalized !== "/charts") {
    const category = normalized.slice("/charts/".length)
    const label = getChartsCurrentLabel(normalized)
    const description = resolveChartCategoryDescription(category)
    if (!label || !description) return null
    return {
      pathname: normalized,
      title: chartCategoryDisplayTitle(label),
      description,
      schemaType,
    }
  }

  if (normalized.startsWith("/cursors/") && normalized !== "/cursors") {
    const label = getCursorsCurrentLabel(normalized)
    if (!label) return null
    const title = withKindSuffix(label, "cursor")
    return {
      pathname: normalized,
      title,
      description: `Interactive ${label} demo for SonoJS - preview, install command, and source.`,
      schemaType,
    }
  }

  return null
}