import { notFound } from "next/navigation"

import { ChartGallery } from "@/components/charts"
import {
  CHART_CATEGORY_META,
  getChartCategoryIcon,
  isChartCategory,
} from "@/lib/charts-catalog"

export default async function ChartCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  if (!isChartCategory(category)) notFound()

  const meta = CHART_CATEGORY_META[category]
  const Icon = getChartCategoryIcon(category)

  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="flex items-center gap-2.5 text-h1">
          <Icon className="size-7 shrink-0 opacity-80" aria-hidden />
          {meta.title}
        </h1>
        <p className="text-muted-foreground">{meta.description}</p>
      </header>

      <ChartGallery categories={[category]} />
    </article>
  )
}
