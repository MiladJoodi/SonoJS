import { ChartGallery } from "@/components/charts"
import { chartsCatalog } from "@/lib/charts-catalog"

export default function ChartsIndexPage() {
  const pending = chartsCatalog.filter((e) => e.status === "pending").length
  const ported = chartsCatalog.filter((e) => e.status === "ported").length

  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Charts</h1>
        <p className="text-muted-foreground">
          Browse every chart demo with a live thumbnail. Open a card for the
          interactive preview, install command, and source.
        </p>
        <p className="text-sm text-muted-foreground">
          {ported} ported · {pending} pending · {chartsCatalog.length} total
        </p>
      </header>

      <ChartGallery />
    </article>
  )
}
