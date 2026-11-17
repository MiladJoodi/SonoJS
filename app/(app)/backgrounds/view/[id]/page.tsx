import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AccessGate } from "@/components/access"
import {
  BackgroundHtmlDownload,
  BackgroundLiveStage,
  BackgroundViewPager,
} from "@/components/backgrounds"
import {
  backgroundsCatalog,
  getBackgroundAdjacent,
  getBackgroundEntry,
} from "@/lib/backgrounds-catalog"
import { pageMetadata } from "@/lib/seo"

/** AccessGate reads Clerk - must be request-time. */
export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return backgroundsCatalog.map((entry) => ({ id: entry.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const entry = getBackgroundEntry(id)
  if (!entry) return { title: "Background" }
  return pageMetadata({
    title: entry.title,
    description: entry.description,
    path: `/backgrounds/view/${id}`,
  })
}

export default async function BackgroundViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const entry = getBackgroundEntry(id)
  if (!entry) notFound()

  const { previous, next } = getBackgroundAdjacent(id)

  return (
    <article className="w-full max-w-none space-y-8">
      <header className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h1
            className="text-h1 min-w-0 flex-1 truncate"
            title={entry.title}
          >
            {entry.title}
          </h1>
          <BackgroundViewPager
            previous={previous}
            next={next}
            className="mt-1.5"
          />
        </div>
        <p className="text-muted-foreground">{entry.description}</p>
      </header>

      <BackgroundLiveStage entry={entry} />

      <section className="space-y-3">
        <h2 className="text-h3">Download</h2>
        <AccessGate access="member">
          <BackgroundHtmlDownload entry={entry} />
        </AccessGate>
      </section>
    </article>
  )
}
