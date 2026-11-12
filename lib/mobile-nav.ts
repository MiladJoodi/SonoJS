import { siteConfig, type SiteNavItem } from "@/lib/config"

export type MobileBottomNavMatch = "exact" | "prefix"

export type MobileBottomNavLink = {
  id: string
  href: string
  label: string
  match: MobileBottomNavMatch
}

export type MobileBottomNavMore = {
  id: "more"
  label: string
}

export type MobileBottomNavItem = MobileBottomNavLink | MobileBottomNavMore

export function isMobileBottomNavMore(
  item: MobileBottomNavItem
): item is MobileBottomNavMore {
  return item.id === "more"
}

/**
 * Primary tabs - Marketplace is the center tab.
 * Home, AI, Cursors, 3D, Carousels, Tools live in More.
 */
export const mobileBottomNav: MobileBottomNavItem[] = [
  {
    id: "components",
    href: "/docs/components",
    label: "Components",
    match: "prefix",
  },
  { id: "blocks", href: "/blocks", label: "Blocks", match: "prefix" },
  {
    id: "marketplace",
    href: "/marketplace",
    label: "Marketplace",
    match: "prefix",
  },
  { id: "charts", href: "/charts", label: "Charts", match: "prefix" },
  { id: "more", label: "More" },
]

const PRIMARY_HREFS = new Set(
  mobileBottomNav
    .filter((item): item is MobileBottomNavLink => !isMobileBottomNavMore(item))
    .map((item) => item.href)
)

const HOME_NAV_ITEM: SiteNavItem = { href: "/", label: "Home" }

/** Remaining site nav links for the More drawer - Home first. */
export function getMobileMoreNavItems(): SiteNavItem[] {
  const rest = siteConfig.navItems.filter(
    (item) => !PRIMARY_HREFS.has(item.href)
  )
  return [HOME_NAV_ITEM, ...rest, ...siteConfig.footerNavItems]
}

/** Hide on tool workspaces, chart playground, and marketplace product pages. */
export function shouldShowMobileBottomNav(pathname: string): boolean {
  if (pathname.startsWith("/tools/")) return false
  if (pathname.startsWith("/charts/view")) return false
  // Catalog stays; product detail (`/marketplace/[slug]`) hides the tab bar.
  if (/^\/marketplace\/[^/]+/.test(pathname)) return false
  return true
}

function pathMatches(
  pathname: string,
  href: string,
  match: MobileBottomNavMatch
) {
  if (match === "exact" || href === "/") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function longestMatchingHref(
  pathname: string,
  items: { href: string; match?: MobileBottomNavMatch; external?: boolean }[]
): string | null {
  const hits = items
    .filter((item) => !item.external)
    .filter((item) =>
      pathMatches(pathname, item.href, item.match ?? "prefix")
    )
    .sort((a, b) => b.href.length - a.href.length)
  return hits[0]?.href ?? null
}

export type MobileBottomNavActive = {
  /** Active primary tab id, or `"more"` when a More-sheet route is active. */
  tabId: string | null
  /** Matching href inside the More sheet, if any. */
  moreHref: string | null
}

export function getMobileBottomNavActive(
  pathname: string
): MobileBottomNavActive {
  const primaryLinks = mobileBottomNav.filter(
    (item): item is MobileBottomNavLink => !isMobileBottomNavMore(item)
  )
  const primaryHref = longestMatchingHref(pathname, primaryLinks)
  if (primaryHref) {
    const tab = primaryLinks.find((item) => item.href === primaryHref)
    return { tabId: tab?.id ?? null, moreHref: null }
  }

  const moreItems = getMobileMoreNavItems()
  const moreHref = longestMatchingHref(
    pathname,
    moreItems.map((item) => ({
      ...item,
      match: item.href === "/" ? ("exact" as const) : ("prefix" as const),
    }))
  )
  if (moreHref) {
    return { tabId: "more", moreHref }
  }

  return { tabId: null, moreHref: null }
}

/** Tab row height (edge-to-edge bar, excluding safe-area). */
export const MOBILE_BOTTOM_NAV_DOCK_HEIGHT = "3rem"

/**
 * Total clearance for the bottom tab bar: row + safe-area.
 * Used by the in-flow spacer.
 */
export const MOBILE_BOTTOM_NAV_CLEARANCE =
  "calc(3rem + env(safe-area-inset-bottom, 0px))"