export type PopupsNavPage = {
  title: string
  href: string
  featured?: boolean
  badge?: "new"
}

export type PopupsNavGroup = {
  title: string
  pages: PopupsNavPage[]
}

/** Spotlight group - first in the sidebar (no heading). */
export const POPUPS_FEATURED_GROUP = "Featured"

/**
 * Spotlight order - sidebar Featured + gallery pin (then A→Z for the rest).
 * Keep listed in the flat A→Z group too.
 */
export const POPUPS_SPOTLIGHT_HREFS = [
  "/popups/blackout",
  "/popups/luck-wheel",
  "/popups/sale-tag",
  "/popups/age-check",
] as const

export function isPopupSpotlight(href: string) {
  return (POPUPS_SPOTLIGHT_HREFS as readonly string[]).includes(href)
}

const allPopupPages: PopupsNavPage[] = [
  {
    title: "Advent Door",
    href: "/popups/advent-door",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Age Check",
    href: "/popups/age-check",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Away Notice",
    href: "/popups/away-notice",
    badge: "new" as const,
  },
  {
    title: "Black Friday Hero",
    href: "/popups/black-friday-hero",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Black Week",
    href: "/popups/black-week",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Blackout",
    href: "/popups/blackout",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Chrome Bloom",
    href: "/popups/chrome-bloom",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Contact",
    href: "/popups/contact",
    badge: "new" as const,
  },
  {
    title: "Cyber Monday",
    href: "/popups/cyber-monday",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Decrypt",
    href: "/popups/decrypt",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Early Gift",
    href: "/popups/early-gift",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Event Invite",
    href: "/popups/event-invite",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Feedback",
    href: "/popups/feedback",
    badge: "new" as const,
  },
  {
    title: "Follow Us",
    href: "/popups/follow-us",
    badge: "new" as const,
  },
  {
    title: "Fork me on GitHub",
    href: "/popups/fork-ribbon",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Get the App",
    href: "/popups/get-the-app",
    badge: "new" as const,
  },
  {
    title: "Glass Cube",
    href: "/popups/glass-cube",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Holiday Popup",
    href: "/popups/holiday-popup",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Lights Out",
    href: "/popups/lights-out",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Luck Wheel",
    href: "/popups/luck-wheel",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Midnight Drop",
    href: "/popups/midnight-drop",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Mystery Box",
    href: "/popups/mystery-box",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "New Arrival",
    href: "/popups/new-arrival",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Notify Me",
    href: "/popups/notify-me",
    badge: "new" as const,
  },
  {
    title: "Price Crash",
    href: "/popups/price-crash",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Sale Signup",
    href: "/popups/sale-signup",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Sale Tag",
    href: "/popups/sale-tag",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Scratch to Win",
    href: "/popups/scratch-to-win",
    featured: true,
    badge: "new" as const,
  },
  {
    title: "Welcome Offer",
    href: "/popups/welcome-offer",
    featured: true,
    badge: "new" as const,
  },
].sort((a, b) => a.title.localeCompare(b.title))

const pageByHref = new Map(allPopupPages.map((page) => [page.href, page]))

const featuredPopupPages: PopupsNavPage[] = POPUPS_SPOTLIGHT_HREFS.map(
  (href) => {
    const page = pageByHref.get(href)
    if (!page) {
      throw new Error(`Missing popup spotlight page: ${href}`)
    }
    return { ...page, badge: "new" as const }
  }
)

const spotlightHrefSet = new Set<string>(POPUPS_SPOTLIGHT_HREFS)

/** Gallery / prev-next: spotlight pin first, then remaining A→Z. */
function getPopupsPagesOrdered(): PopupsNavPage[] {
  const rest = allPopupPages.filter((page) => !spotlightHrefSet.has(page.href))
  return [...featuredPopupPages, ...rest]
}

/** Sidebar + index for `/popups` - Featured spotlight first, then flat A→Z list. */
export const popupsNav: {
  top: PopupsNavPage[]
  groups: PopupsNavGroup[]
} = {
  top: [{ title: "All Popups", href: "/popups" }],
  groups: [
    {
      title: POPUPS_FEATURED_GROUP,
      pages: featuredPopupPages,
    },
    {
      title: "",
      pages: allPopupPages,
    },
  ],
}

export function getPopupsPages(): PopupsNavPage[] {
  return getPopupsPagesOrdered()
}

export function getPopupsCurrentLabel(pathname: string): string | null {
  if (pathname === "/popups") return "Popups"
  const page = getPopupsPages().find((p) => p.href === pathname)
  return page?.title ?? null
}

export function getPopupsAdjacent(pathname: string): {
  previous: PopupsNavPage | null
  next: PopupsNavPage | null
} {
  const pages = getPopupsPages()
  const index = pages.findIndex((page) => page.href === pathname)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: index > 0 ? pages[index - 1]! : null,
    next: index < pages.length - 1 ? pages[index + 1]! : null,
  }
}
