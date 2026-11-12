import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { MarketplaceDetailPage } from "@/components/marketplace/detail-page"
import { marketplaceProjects } from "@/lib/marketplace-catalog"
import { getMarketplacePreviewDetail } from "@/lib/marketplace-preview-data"
import { pageMetadata } from "@/lib/seo"

type PageProps = {
  params: Promise<{ slug: string }>
}

/** Auth-gated download CTA - must resolve per request. */
export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return marketplaceProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const detail = getMarketplacePreviewDetail(slug)
  if (!detail) {
    return pageMetadata({
      title: "Project",
      description: "Marketplace project",
      path: `/marketplace/${slug}`,
    })
  }
  return pageMetadata({
    title: detail.title,
    description: detail.tagline,
    path: `/marketplace/${detail.slug}`,
  })
}

export default async function MarketplaceProjectPage({ params }: PageProps) {
  const { slug } = await params
  const detail = getMarketplacePreviewDetail(slug)
  if (!detail) notFound()

  return <MarketplaceDetailPage detail={detail} />
}
