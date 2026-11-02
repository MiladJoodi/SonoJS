import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { MarketplaceDownloadButton } from "@/components/marketplace/marketplace-download-button"
import { SonoMarketDetailPage } from "@/components/sonomarket/detail-page"
import { marketplaceProjects } from "@/lib/marketplace-catalog"
import { getSonoMarketPreviewDetail } from "@/lib/sonomarket-preview-data"
import { pageMetadata } from "@/lib/seo"

type PageProps = {
  params: Promise<{ slug: string }>
}

/** Auth-gated download CTA — must resolve per request. */
export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return marketplaceProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const detail = getSonoMarketPreviewDetail(slug)
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
  const detail = getSonoMarketPreviewDetail(slug)
  if (!detail) notFound()

  return (
    <SonoMarketDetailPage
      detail={detail}
      downloadCta={<MarketplaceDownloadButton project={detail.project} />}
    />
  )
}
