import { get3dCurrentLabel } from "@/lib/3d-nav"
import { getAiCurrentLabel } from "@/lib/ai-nav"
import { getBackgroundsCurrentLabel } from "@/lib/backgrounds-nav"
import { getBlocksCurrentLabel } from "@/lib/blocks-nav"
import { getCarouselsCurrentLabel } from "@/lib/carousels-nav"
import { getChartsCurrentLabel } from "@/lib/charts-nav"
import { getCursorsCurrentLabel } from "@/lib/cursors-nav"
import { getDocsGuideBreadcrumbTitle } from "@/lib/docs-guide-titles"
import { getDocsCurrentLabel, isComponentsDocsPath } from "@/lib/docs-nav"
import { getLegalCurrentLabel } from "@/lib/legal-nav"
import { getPopupsCurrentLabel } from "@/lib/popups-nav"
import { getTemplateProject } from "@/lib/templates-catalog"
import { getToolsCurrentLabel } from "@/lib/tools-nav"
import { normalizePath } from "@/lib/seo"

/** Request header set in `proxy.ts` for server breadcrumb JSON-LD. */
export const BREADCRUMB_PATH_HEADER = "x-pathname"

const BREADCRUMB_SKIP_PREFIXES = [
  "/view",
  "/admin",
  "/account",
  "/api",
] as const

/** Paths that should not emit BreadcrumbList JSON-LD. */
export function isBreadcrumbEligiblePath(pathname: string): boolean {
  const normalized = normalizePath(pathname)
  if (normalized === "/") return false
  if (
    (BREADCRUMB_SKIP_PREFIXES as readonly string[]).some(
      (prefix) =>
        normalized === prefix || normalized.startsWith(`${prefix}/`)
    )
  ) {
    return false
  }
  if (
    normalized === "/sso-callback" ||
    normalized.startsWith("/sign-in") ||
    normalized.startsWith("/sign-up") ||
    normalized.startsWith("/forgot-password")
  ) {
    return false
  }
  if (normalized.startsWith("/cursors/view")) {
    return false
  }
  return true
}

/** Human-readable label for the current page (leaf crumb). */
export function resolveBreadcrumbLeafLabel(pathname: string): string | undefined {
  const normalized = normalizePath(pathname)

  const guideTitle = getDocsGuideBreadcrumbTitle(normalized)
  if (guideTitle) return guideTitle

  if (isComponentsDocsPath(normalized)) {
    const componentsLabel = getDocsCurrentLabel(normalized)
    if (componentsLabel) return componentsLabel
  }

  const blocks = getBlocksCurrentLabel(normalized)
  if (blocks) return blocks

  const charts = getChartsCurrentLabel(normalized)
  if (charts) return charts

  const cursors = getCursorsCurrentLabel(normalized)
  if (cursors) return cursors

  const backgrounds = getBackgroundsCurrentLabel(normalized)
  if (backgrounds) return backgrounds

  const ai = getAiCurrentLabel(normalized)
  if (ai) return ai

  const threeD = get3dCurrentLabel(normalized)
  if (threeD) return threeD

  const popups = getPopupsCurrentLabel(normalized)
  if (popups) return popups

  const carousels = getCarouselsCurrentLabel(normalized)
  if (carousels) return carousels

  const tools = getToolsCurrentLabel(normalized)
  if (tools) return tools

  const legal = getLegalCurrentLabel(normalized)
  if (legal) return legal

  const templateMatch = normalized.match(/^\/(templates|websites)\/([^/]+)$/)
  if (templateMatch) {
    const slug = templateMatch[2]!
    const project = getTemplateProject(slug)
    if (project?.title) return project.title
  }

  if (normalized === "/contact") return "Contact"
  if (normalized === "/pricing") return "Pricing"

  return undefined
}