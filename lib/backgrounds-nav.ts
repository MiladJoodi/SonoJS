import {
  backgroundViewHref,
  backgroundsCatalog,
  isBackgroundFeatured,
} from "@/lib/backgrounds-catalog"

export type BackgroundsNavPage = {
  title: string
  href: string
  featured?: boolean
  badge?: "new"
}

export type BackgroundsNavGroup = {
  title: string
  pages: BackgroundsNavPage[]
}

/** Spotlight group — first in the sidebar; excluded from prev/next order. */
export const BACKGROUNDS_FEATURED_GROUP = "Featured"

/** Featured 🔥 sidebar + gallery first. */
export function isBackgroundSpotlight(id: string) {
  return (
    id === "embers" ||
    id === "event-horizon-study" ||
    id === "galaxy-forge" ||
    id === "halcyon" ||
    id === "harmonia" ||
    id === "ink-flow" ||
    id === "moth-lamp" ||
    id === "neon-circuit" ||
    id === "koi-pond" ||
    id === "noir-terminal" ||
    id === "reef" ||
    id === "tidepool"
  )
}

const allBackgroundPages: BackgroundsNavPage[] = [...backgroundsCatalog]
  .sort((a, b) => a.title.localeCompare(b.title))
  .map((e) => ({
    title: e.title,
    href: backgroundViewHref(e.id),
    featured: isBackgroundFeatured(e.id),
  }))

const featuredBackgroundPages: BackgroundsNavPage[] = [...backgroundsCatalog]
  .filter((e) => isBackgroundSpotlight(e.id))
  .sort((a, b) => a.title.localeCompare(b.title))
  .map((e) => ({
    title: e.title,
    href: backgroundViewHref(e.id),
    featured: isBackgroundFeatured(e.id),
    badge: "new" as const,
  }))

/** Sidebar + index for `/backgrounds` — Featured, then flat A→Z list. */
export const backgroundsNav: {
  top: BackgroundsNavPage[]
  groups: BackgroundsNavGroup[]
} = {
  top: [{ title: "All Backgrounds", href: "/backgrounds" }],
  groups: [
    {
      title: BACKGROUNDS_FEATURED_GROUP,
      pages: featuredBackgroundPages,
    },
    {
      title: "",
      pages: allBackgroundPages,
    },
  ],
}

export function getBackgroundsPages(): BackgroundsNavPage[] {
  return backgroundsNav.groups
    .filter((group) => group.title !== BACKGROUNDS_FEATURED_GROUP)
    .flatMap((group) => group.pages)
}

export function getBackgroundsCurrentLabel(pathname: string): string | null {
  if (pathname === "/backgrounds") return "Backgrounds"
  if (pathname.startsWith("/backgrounds/view/")) {
    const id = pathname.slice("/backgrounds/view/".length)
    return backgroundsCatalog.find((e) => e.id === id)?.title ?? "Background"
  }
  const page = getBackgroundsPages().find((p) => p.href === pathname)
  return page?.title ?? null
}

export function getBackgroundsAdjacent(pathname: string): {
  previous: BackgroundsNavPage | null
  next: BackgroundsNavPage | null
} {
  if (pathname === "/backgrounds") {
    const first = getBackgroundsPages()[0]
    return { previous: null, next: first ?? null }
  }

  const pages = getBackgroundsPages()
  const index = pages.findIndex((p) => p.href === pathname)
  if (index < 0) return { previous: null, next: null }
  return {
    previous:
      index > 0
        ? pages[index - 1]!
        : { title: "All Backgrounds", href: "/backgrounds" },
    next: index < pages.length - 1 ? pages[index + 1]! : null,
  }
}
