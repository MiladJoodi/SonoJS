import {
  DocsAdjacentPager,
  type DocsAdjacentLink,
} from "@/components/docs/docs-adjacent-pager"
import {
  backgroundHref,
  type BackgroundsCatalogEntry,
} from "@/lib/backgrounds-catalog"
import { cn } from "@/lib/utils"

function toLink(
  entry: BackgroundsCatalogEntry | null | undefined
): DocsAdjacentLink | undefined {
  if (!entry) return undefined
  return { href: backgroundHref(entry.id), title: entry.title }
}

export function BackgroundViewPager({
  previous,
  next,
  className,
}: {
  previous?: BackgroundsCatalogEntry | null
  next?: BackgroundsCatalogEntry | null
  className?: string
}) {
  return (
    <DocsAdjacentPager
      previous={toLink(previous)}
      next={toLink(next)}
      className={cn("hidden lg:flex", className)}
    />
  )
}
