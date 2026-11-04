import {
  getMarketplaceProject,
  getRelatedMarketplaceProjects,
  MARKETPLACE_CATEGORY_LABEL,
  MARKETPLACE_STACK_LABEL,
  marketplaceProjects,
  type MarketplaceBadge,
  type MarketplaceCategory,
  type MarketplaceProject,
  type MarketplaceStack,
} from "@/lib/marketplace-catalog"

/** Card/list row for marketplace UI (live `/marketplace` hrefs). */
export type MarketplacePreviewItem = {
  slug: string
  title: string
  tagline: string
  category: MarketplaceCategory
  /** Light / default cover under /public */
  coverSrc: string
  /** Dark-mode cover when available */
  coverSrcDark: string | null
  /** Looping cover video when set - preferred over coverSrc in cards/gallery. */
  coverVideo: string | null
  rating: number
  reviewCount: number
  priceLabel: string
  href: string
  stack: MarketplaceStack[]
  updatedAt: string
  /** Index in `marketplaceProjects` - later = newer when dates tie. */
  catalogIndex: number
}

export type MarketplacePreviewDetail = MarketplacePreviewItem & {
  description: string
  version: string
  liveUrl: string
  screens: number
  highlights: { title: string; body: string }[]
  includes: string[]
  requirements: string[]
  stackLabels: string[]
  categoryLabel: string
  gallery: string[]
  badge: MarketplaceBadge | null
  access: "public" | "member" | "pro"
  related: MarketplacePreviewItem[]
  /** Full catalog project for download gating. */
  project: MarketplaceProject
}

/** Light cover for cards - never prefer dark (theme swap is CSS). */
export function marketplaceCoverSrc(project: MarketplaceProject): string {
  return (
    project.coverImage ||
    project.detailCoverImage ||
    project.coverImageDark ||
    project.detailCoverImageDark ||
    ""
  )
}

export function marketplaceCoverSrcDark(
  project: MarketplaceProject
): string | null {
  return (
    project.coverImageDark ||
    project.detailCoverImageDark ||
    null
  )
}

export function marketplaceCoverVideo(
  project: MarketplaceProject
): string | null {
  return project.coverVideo ?? null
}

export function marketplaceDetailCoverSrc(project: MarketplaceProject): string {
  return (
    project.detailCoverImage ||
    project.coverImage ||
    marketplaceCoverSrc(project)
  )
}

export function marketplaceDetailCoverSrcDark(
  project: MarketplaceProject
): string | null {
  return (
    project.detailCoverImageDark ||
    project.coverImageDark ||
    null
  )
}

export function toMarketplaceItem(
  project: MarketplaceProject,
  catalogIndex = 0
): MarketplacePreviewItem {
  return {
    slug: project.slug,
    title: project.title,
    tagline: project.tagline,
    category: project.category,
    coverSrc: marketplaceCoverSrc(project),
    coverSrcDark: marketplaceCoverSrcDark(project),
    coverVideo: marketplaceCoverVideo(project),
    rating: project.rating,
    reviewCount: project.reviewCount,
    priceLabel: project.priceLabel || "Free",
    href: `/marketplace/${project.slug}`,
    stack: project.stack,
    updatedAt: project.updatedAt,
    catalogIndex,
  }
}

/** Newest first: later `updatedAt`, then later catalog index. */
export function compareMarketplaceNewest(
  a: Pick<MarketplacePreviewItem, "updatedAt" | "catalogIndex">,
  b: Pick<MarketplacePreviewItem, "updatedAt" | "catalogIndex">
): number {
  const byDate = b.updatedAt.localeCompare(a.updatedAt)
  if (byDate !== 0) return byDate
  return b.catalogIndex - a.catalogIndex
}

export function getMarketplacePreviewItems(): MarketplacePreviewItem[] {
  return marketplaceProjects
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => p.enabled)
    .map(({ p, i }) => toMarketplaceItem(p, i))
    .sort(compareMarketplaceNewest)
}

export function getMarketplacePreviewDetail(
  slug: string
): MarketplacePreviewDetail | null {
  const project = getMarketplaceProject(slug)
  if (!project || !project.enabled) return null

  const catalogIndex = marketplaceProjects.findIndex((p) => p.slug === slug)
  const base = toMarketplaceItem(project, catalogIndex < 0 ? 0 : catalogIndex)
  const cover = marketplaceDetailCoverSrc(project)
  const coverDark = marketplaceDetailCoverSrcDark(project)

  return {
    ...base,
    coverSrc: cover,
    coverSrcDark: coverDark,
    description: project.description,
    version: project.version,
    liveUrl: project.liveUrl,
    screens: project.screens,
    highlights: project.highlights,
    includes: project.includes,
    requirements: project.requirements,
    stackLabels: project.stack.map((s) => MARKETPLACE_STACK_LABEL[s]),
    categoryLabel: MARKETPLACE_CATEGORY_LABEL[project.category],
    gallery: cover ? [cover] : [],
    badge: project.badge,
    access: project.access ?? "member",
    related: getRelatedMarketplaceProjects(project, 3)
      .filter((p) => p.enabled)
      .map((p) => {
        const i = marketplaceProjects.findIndex((x) => x.slug === p.slug)
        return toMarketplaceItem(p, i < 0 ? 0 : i)
      }),
    project,
  }
}
