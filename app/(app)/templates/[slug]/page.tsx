import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/seo/json-ld"
import { TemplateDetailPage } from "@/components/templates/detail-page"
import { templateProjects } from "@/lib/templates-catalog"
import { getTemplatePreviewDetail } from "@/lib/templates-preview-data"
import { resolveProductOwnership } from "@/lib/resolve-product-ownership"
import { pageMetadata, productDetailPageMetadata } from "@/lib/seo"
import { productCoverImagePath, productJsonLd } from "@/lib/seo-jsonld"

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
  return productDetailPageMetadata({
    title: detail.title,
    description: detail.tagline,
    path: `/templates/${detail.slug}`,
    coverImagePath: productCoverImagePath(detail),
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

  const path = `/templates/${detail.slug}`

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: detail.title,
          description: detail.tagline,
          path,
          priceCents: detail.priceCents,
          imagePath: productCoverImagePath(detail),
        })}
      />
      <TemplateDetailPage detail={detail} ownsProduct={ownsProduct} />
    </>
  )
}
