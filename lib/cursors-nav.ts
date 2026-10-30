import {
  cursorViewHref,
  cursorsCatalog,
  isCursorFeatured,
} from "@/lib/cursors-catalog"

export type CursorsNavItem = {
  id: string
  title: string
  href: string
  featured?: boolean
  status: "pending" | "ported"
}

/** Flat sidebar list — ported first, then pending. */
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
    href: cursorViewHref(entry.id),
    featured: isCursorFeatured(entry.id),
    status: entry.status,
  }))

export function getCursorsCurrentLabel(pathname: string): string | null {
  if (pathname === "/cursors") return "Cursors"

  if (pathname.startsWith("/cursors/view/")) {
    const id = pathname.slice("/cursors/view/".length)
    return cursorsCatalog.find((e) => e.id === id)?.title ?? "Cursor"
  }

  return null
}

export function getCursorsNavStats() {
  const ported = cursorsCatalog.filter((e) => e.status === "ported").length
  return { total: cursorsCatalog.length, ported }
}
