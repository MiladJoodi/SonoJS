import { notFound } from "next/navigation"

import { BlockComingSoon } from "@/components/blocks"
import {
  getAllBlockItems,
  getBlockByHref,
} from "@/lib/blocks-nav"

export const dynamic = "force-static"

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export function generateStaticParams() {
  return getAllBlockItems()
    .filter(
      (item) =>
        item.href !== "/blocks/authentication/login" &&
        item.href !== "/blocks/authentication/signup" &&
        item.href !== "/blocks/ai-agents/agent-run-timeline"
    )
    .map((item) => ({
      slug: item.href.replace(/^\/blocks\//, "").split("/"),
    }))
}

export default async function BlockPlaceholderPage({ params }: PageProps) {
  const { slug } = await params
  const pathname = `/blocks/${slug.join("/")}`

  const match = getBlockByHref(pathname)
  if (!match) notFound()

  return (
    <BlockComingSoon title={match.item.title} category={match.group.title} />
  )
}
