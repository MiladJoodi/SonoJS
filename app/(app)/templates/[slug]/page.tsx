import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { TemplateDetailPage } from "@/components/templates/detail-page"
import { templateProjects } from "@/lib/templates-catalog"
import { getTemplatePreviewDetail } from "@/lib/templates-preview-data"
import { resolveProductOwnership } from "@/lib/resolve-product-ownership"
import { pageMetadata } from "@/lib/seo"

type PageProps = {
  params: Promise<{ slug: string }>
}

/** Auth-gated download CTA - must resolve per request. */
export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return templateProjects
    .filter((p) => p.category !== "website")
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const detail = getTemplatePreviewDetail(slug, "templates")
  if (!detail) {
    return pageMetadata({
      title: "Project",
      description: "Templates project",
      path: `/templates/${slug}`,
    })
  }
  return pageMetadata({
    title: detail.title,
    description: detail.tagline,
    path: `/templates/${detail.slug}`,
  })
}

export default async function TemplateProjectPage({ params }: PageProps) {
  const { slug } = await params
  const detail = getTemplatePreviewDetail(slug, "templates")
  if (!detail) notFound()

  const ownsProduct = await resolveProductOwnership(
    detail.slug,
    detail.priceCents
  )

  return <TemplateDetailPage detail={detail} ownsProduct={ownsProduct} />
}
