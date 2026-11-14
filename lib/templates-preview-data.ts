import {
  getTemplateProject,
  getRelatedTemplateProjects,
  templateProjects,
} from "@/lib/templates-catalog"
import {
  TEMPLATE_CATEGORY_LABEL,
  TEMPLATE_STACK_LABEL,
  type TemplateBadge,
  type TemplateCategory,
  type TemplateProject,
  type TemplateStack,
} from "@/lib/templates-catalog-meta"

/**
 * Thin card/list row for templates UI (no long `description` / highlight bodies).
 * Build on the server and pass into client catalog chrome.
 */
export type TemplatePreviewItem = {
  slug: string
  title: string
  tagline: string
  category: TemplateCategory
  /** Light / default cover under /public */
  coverSrc: string
  /** Dark-mode cover when available */
  coverSrcDark: string | null
  /** Looping cover video when set - preferred over coverSrc in cards/gallery. */
  coverVideo: string | null
  rating: number
  reviewCount: number
  priceLabel: string
  priceCents: number
  href: string
  /** External live demo when set. */
  liveUrl: string | null
  stack: TemplateStack[]
  updatedAt: string
  /** Index in `templateProjects` - later = newer when dates tie. */
  catalogIndex: number
  access: "public" | "member" | "pro"
}

export type TemplatePreviewDetail = TemplatePreviewItem & {
  description: string
  version: string
  liveUrl: string
  screens: number
  highlights: { title: string; body: string }[]
  includes: string[]
  requirements: string[]
  /** Copyable local run command when the package needs a static server / CLI. */
  runCommand: string | null
  stackLabels: string[]
  categoryLabel: string
  gallery: string[]
  badge: TemplateBadge | null
  access: "public" | "member" | "pro"
  related: TemplatePreviewItem[]
  /** Full catalog project for download gating. */
  project: TemplateProject
}

/** Light cover for cards - never prefer dark (theme swap is CSS). */
export function templateCoverSrc(project: TemplateProject): string {
  return (
    project.coverImage ||
    project.detailCoverImage ||
    project.coverImageDark ||
    project.detailCoverImageDark ||
    ""
  )
}

export function templateCoverSrcDark(
  project: TemplateProject
): string | null {
  return (
    project.coverImageDark ||
    project.detailCoverImageDark ||
    null
  )
}

export function templateCoverVideo(
  project: TemplateProject
): string | null {
  return project.coverVideo ?? null
}

export function templateDetailCoverSrc(project: TemplateProject): string {
  return (
    project.detailCoverImage ||
    project.coverImage ||
    templateCoverSrc(project)
  )
}

export function templateDetailCoverSrcDark(
  project: TemplateProject
): string | null {
  return (
    project.detailCoverImageDark ||
    project.coverImageDark ||
    null
  )
}

/** Catalog surface for a project - websites are a separate shop from Templates. */
export function isWebsiteProject(
  project: Pick<TemplateProject, "category">
): boolean {
  return project.category === "website"
}

export function catalogBasePathForProject(
  project: Pick<TemplateProject, "category">
): "/templates" | "/websites" {
  return isWebsiteProject(project) ? "/websites" : "/templates"
}

export function catalogHrefForProject(
  project: Pick<TemplateProject, "category" | "slug">
): string {
  return `${catalogBasePathForProject(project)}/${project.slug}`
}

export function toTemplateItem(
  project: TemplateProject,
  catalogIndex = 0
): TemplatePreviewItem {
  return {
    slug: project.slug,
    title: project.title,
    tagline: project.tagline,
    category: project.category,
    coverSrc: templateCoverSrc(project),
    coverSrcDark: templateCoverSrcDark(project),
    coverVideo: templateCoverVideo(project),
    rating: project.rating,
    reviewCount: project.reviewCount,
    priceLabel: project.priceLabel || "Free",
    priceCents: project.priceCents ?? 0,
    href: catalogHrefForProject(project),
    liveUrl: project.liveUrl?.trim() ? project.liveUrl.trim() : null,
    stack: project.stack,
    updatedAt: project.updatedAt,
    catalogIndex,
    access: project.access ?? "member",
  }
}

/** Newest first: later `updatedAt`, then later catalog index. */
export function compareTemplateNewest(
  a: Pick<TemplatePreviewItem, "updatedAt" | "catalogIndex">,
  b: Pick<TemplatePreviewItem, "updatedAt" | "catalogIndex">
): number {
  const byDate = b.updatedAt.localeCompare(a.updatedAt)
  if (byDate !== 0) return byDate
  return b.catalogIndex - a.catalogIndex
}

export type TemplateCatalogSurface = "templates" | "websites"

export function getTemplatePreviewItems(
  surface: TemplateCatalogSurface = "templates"
): TemplatePreviewItem[] {
  return templateProjects
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => p.enabled)
    .filter(({ p }) =>
      surface === "websites" ? isWebsiteProject(p) : !isWebsiteProject(p)
    )
    .map(({ p, i }) => toTemplateItem(p, i))
    .sort(compareTemplateNewest)
}

export function getWebsitePreviewItems(): TemplatePreviewItem[] {
  return getTemplatePreviewItems("websites")
}

export function getTemplatePreviewDetail(
  slug: string,
  surface?: TemplateCatalogSurface
): TemplatePreviewDetail | null {
  const project = getTemplateProject(slug)
  if (!project || !project.enabled) return null
  if (surface === "websites" && !isWebsiteProject(project)) return null
  if (surface === "templates" && isWebsiteProject(project)) return null

  const catalogIndex = templateProjects.findIndex((p) => p.slug === slug)
  const base = toTemplateItem(project, catalogIndex < 0 ? 0 : catalogIndex)
  const cover = templateDetailCoverSrc(project)
  const coverDark = templateDetailCoverSrcDark(project)

  return {
    ...base,
    coverSrc: cover,
    coverSrcDark: coverDark,
    // Detail gallery uses stills (main.webp). Cover video is catalog-card only.
    coverVideo: cover ? null : base.coverVideo,
    description: project.description,
    version: project.version,
    liveUrl: project.liveUrl,
    screens: project.screens,
    highlights: project.highlights,
    includes: project.includes,
    requirements: project.requirements,
    runCommand: project.runCommand ?? null,
    stackLabels: project.stack.map((s) => TEMPLATE_STACK_LABEL[s]),
    categoryLabel: TEMPLATE_CATEGORY_LABEL[project.category],
    gallery: cover ? [cover] : [],
    badge: project.badge,
    access: project.access ?? "member",
    related: getRelatedTemplateProjects(project, 3)
      .filter((p) => p.enabled)
      .map((p) => {
        const i = templateProjects.findIndex((x) => x.slug === p.slug)
        return toTemplateItem(p, i < 0 ? 0 : i)
      }),
    project,
  }
}
