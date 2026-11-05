import {
  DocsAdjacentPager,
  type DocsAdjacentLink,
} from "@/components/docs/docs-adjacent-pager"
import {
  cursorViewHref,
  type CursorsCatalogEntry,
} from "@/lib/cursors-catalog"
import { cn } from "@/lib/utils"

function toLink(
  entry: CursorsCatalogEntry | null | undefined
): DocsAdjacentLink | undefined {
  if (!entry) return undefined
  return { href: cursorViewHref(entry.id), title: entry.title }
}

export function CursorViewPager({
  previous,
  next,
  className,
}: {
  previous?: CursorsCatalogEntry | null
  next?: CursorsCatalogEntry | null
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
