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
export type SonoMarketPreviewItem = {
  slug: string
  title: string
  tagline: string
  category: MarketplaceCategory
  coverSrc: string
  rating: number
  reviewCount: number
  priceLabel: string
  href: string
  stack: MarketplaceStack[]
  updatedAt: string
}

export type SonoMarketPreviewDetail = SonoMarketPreviewItem & {
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
  related: SonoMarketPreviewItem[]
  /** Full catalog project for download gating. */
  project: MarketplaceProject
}

export function marketplaceCoverSrc(project: MarketplaceProject): string {
  return (
    project.coverImageDark ||
    project.coverImage ||
    project.detailCoverImageDark ||
    project.detailCoverImage ||
    ""
  )
}

export function marketplaceDetailCoverSrc(project: MarketplaceProject): string {
  return (
    project.detailCoverImageDark ||
    project.detailCoverImage ||
    marketplaceCoverSrc(project)
  )
}

export function toSonoMarketItem(
  project: MarketplaceProject
): SonoMarketPreviewItem {
  return {
    slug: project.slug,
    title: project.title,
    tagline: project.tagline,
    category: project.category,
    coverSrc: marketplaceCoverSrc(project),
    rating: project.rating,
    reviewCount: project.reviewCount,
    priceLabel: project.priceLabel || "Free",
    href: `/marketplace/${project.slug}`,
    stack: project.stack,
    updatedAt: project.updatedAt,
  }
}

export function getSonoMarketPreviewItems(): SonoMarketPreviewItem[] {
  return marketplaceProjects.filter((p) => p.enabled).map(toSonoMarketItem)
}

export function getSonoMarketPreviewDetail(
  slug: string
): SonoMarketPreviewDetail | null {
  const project = getMarketplaceProject(slug)
  if (!project || !project.enabled) return null

  const base = toSonoMarketItem(project)
  const cover = marketplaceDetailCoverSrc(project)

  return {
    ...base,
    coverSrc: cover,
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
      .map(toSonoMarketItem),
    project,
  }
}
