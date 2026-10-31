import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectDetail } from "@/components/marketplace"
import { ProjectDownloadCta } from "@/components/marketplace/project-download-cta"
import {
  getMarketplaceProject,
  marketplaceProjects,
} from "@/lib/marketplace-catalog"
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
  const project = getMarketplaceProject(slug)
  if (!project) {
    return pageMetadata({
      title: "Project",
      description: "Marketplace project",
      path: `/marketplace/${slug}`,
    })
  }
  return pageMetadata({
    title: project.title,
    description: project.tagline,
    path: `/marketplace/${project.slug}`,
  })
}

export default async function MarketplaceProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getMarketplaceProject(slug)
  if (!project) notFound()
  return (
    <ProjectDetail
      project={project}
      downloadCta={<ProjectDownloadCta project={project} />}
    />
  )
}
