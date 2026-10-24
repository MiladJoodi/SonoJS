import {
  DocsAdjacentPager,
  type DocsAdjacentLink,
} from "@/components/docs/docs-adjacent-pager"
import { chartViewHref, type ChartsCatalogEntry } from "@/lib/charts-catalog"

function toLink(
  entry: ChartsCatalogEntry | null | undefined
): DocsAdjacentLink | undefined {
  if (!entry) return undefined
  return { href: chartViewHref(entry.id), title: entry.title }
}

/** Chart view prev/next — thin wrapper over shared docs pager. */
export function ChartViewPager({
  previous,
  next,
  className,
}: {
  previous?: ChartsCatalogEntry | null
  next?: ChartsCatalogEntry | null
  className?: string
}) {
  return (
    <DocsAdjacentPager
      previous={toLink(previous)}
      next={toLink(next)}
      className={className}
    />
  )
}
