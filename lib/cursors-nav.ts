import {
  compareCursorsCatalogOrder,
  cursorHref,
  CURSORS_SPOTLIGHT_IDS,
  cursorsCatalog,
  isCursorFeatured,
} from "@/lib/cursors-catalog"

export type CursorsNavPage = {
  id: string
  title: string
  href: string
  featured?: boolean
  status: "pending" | "ported"
  badge?: "new"
}

export type CursorsNavGroup = {
  title: string
  pages: CursorsNavPage[]
}

/** Spotlight group — first in the sidebar (no heading). */
export const CURSORS_FEATURED_GROUP = "Featured"

function mapNavPage(
  entry: (typeof cursorsCatalog)[number]
): CursorsNavPage {
  return {
    id: entry.id,
    title: entry.title,
    href: cursorHref(entry.id),
    featured: isCursorFeatured(entry.id),
    status: entry.status,
  }
}

const allCursorPages: CursorsNavPage[] = [...cursorsCatalog]
  .sort(compareCursorsCatalogOrder)
  .map(mapNavPage)

const pageById = new Map(allCursorPages.map((page) => [page.id, page]))

const featuredCursorPages: CursorsNavPage[] = CURSORS_SPOTLIGHT_IDS.map(
  (id) => {
    const page = pageById.get(id)
    if (!page) {
      throw new Error(`Missing cursor spotlight page: ${id}`)
    }
    return { ...page, badge: "new" as const }
  }
)

const spotlightIdSet = new Set<string>(CURSORS_SPOTLIGHT_IDS)

/** Gallery / prev-next: spotlight pin first, then remaining catalog order. */
function getCursorsPagesOrdered(): CursorsNavPage[] {
  const rest = allCursorPages.filter((page) => !spotlightIdSet.has(page.id))
  return [...featuredCursorPages, ...rest]
}

/** Sidebar + index for `/cursors` — Featured spotlight first, then flat list. */
export const cursorsNav: {
  top: { title: string; href: string }[]
  groups: CursorsNavGroup[]
} = {
  top: [{ title: "All cursors", href: "/cursors" }],
  groups: [
    {
      title: CURSORS_FEATURED_GROUP,
      pages: featuredCursorPages,
    },
    {
      title: "",
      pages: allCursorPages,
    },
  ],
}

export function getCursorsPages(): CursorsNavPage[] {
  return getCursorsPagesOrdered()
}

export function getCursorsCurrentLabel(pathname: string): string | null {
  if (pathname === "/cursors") return "Cursors"

  if (pathname.startsWith("/cursors/")) {
    const id = pathname.startsWith("/cursors/view/")
      ? pathname.slice("/cursors/view/".length)
      : pathname.slice("/cursors/".length)
    return cursorsCatalog.find((e) => e.id === id)?.title ?? "Cursor"
  }

  return null
}

export function getCursorsAdjacent(pathname: string): {
  previous: { href: string; title: string } | null
  next: { href: string; title: string } | null
} {
  if (!pathname.startsWith("/cursors/")) {
    return { previous: null, next: null }
  }
  const id = pathname.startsWith("/cursors/view/")
    ? pathname.slice("/cursors/view/".length)
    : pathname.slice("/cursors/".length)

  const pages = getCursorsPages().filter((p) => p.status === "ported")
  const index = pages.findIndex((p) => p.id === id)
  if (index < 0) return { previous: null, next: null }

  const previous = index > 0 ? pages[index - 1]! : null
  const next = index < pages.length - 1 ? pages[index + 1]! : null

  return {
    previous: previous
      ? { href: previous.href, title: previous.title }
      : null,
    next: next ? { href: next.href, title: next.title } : null,
  }
}

export function getCursorsNavStats() {
  const ported = cursorsCatalog.filter((e) => e.status === "ported").length
  return { total: cursorsCatalog.length, ported }
}