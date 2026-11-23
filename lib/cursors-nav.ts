import {
  cursorHref,
  cursorsCatalog,
  getCursorAdjacent,
  isCursorFeatured,
} from "@/lib/cursors-catalog"

export type CursorsNavItem = {
  id: string
  title: string
  href: string
  featured?: boolean
  status: "pending" | "ported"
}

/** Flat sidebar list - ported first, then pending. */
export const cursorsNav: CursorsNavItem[] = [...cursorsCatalog]
  .sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === "ported" ? -1 : 1
    }
    return a.title.localeCompare(b.title)
  })
  .map((entry) => ({
    id: entry.id,
    title: entry.title,
    href: cursorHref(entry.id),
    featured: isCursorFeatured(entry.id),
    status: entry.status,
  }))

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
  const { previous, next } = getCursorAdjacent(id)
  return {
    previous: previous
      ? { href: cursorHref(previous.id), title: previous.title }
      : null,
    next: next ? { href: cursorHref(next.id), title: next.title } : null,
  }
}

export function getCursorsNavStats() {
  const ported = cursorsCatalog.filter((e) => e.status === "ported").length
  return { total: cursorsCatalog.length, ported }
}
