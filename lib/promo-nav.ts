export type PromoNavPage = {
  title: string
  href: string
  featured?: boolean
  badge?: "new"
}

export type PromoNavGroup = {
  title: string
  pages: PromoNavPage[]
}

/** Sidebar + index for `/promo`. */
export const promoNav: {
  top: PromoNavPage[]
  groups: PromoNavGroup[]
} = {
  top: [{ title: "All Promo", href: "/promo" }],
  groups: [
    {
      title: "Components",
      pages: [
        {
          title: "Fork me on GitHub",
          href: "/promo/fork-ribbon",
          featured: true,
          badge: "new",
        },
        {
          title: "Holiday Popup",
          href: "/promo/holiday-popup",
          featured: true,
          badge: "new",
        },
        {
          title: "Sale Signup",
          href: "/promo/sale-signup",
          featured: true,
          badge: "new",
        },
        {
          title: "Sale Tag",
          href: "/promo/sale-tag",
          featured: true,
          badge: "new",
        },
      ],
    },
  ],
}

export function getPromoPages(): PromoNavPage[] {
  return promoNav.groups.flatMap((group) => group.pages)
}

export function getPromoCurrentLabel(pathname: string): string | null {
  if (pathname === "/promo") return "Promo"
  const page = getPromoPages().find((p) => p.href === pathname)
  return page?.title ?? null
}

export function getPromoAdjacent(pathname: string): {
  previous: PromoNavPage | null
  next: PromoNavPage | null
} {
  const pages = getPromoPages()
  const index = pages.findIndex((page) => page.href === pathname)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: index > 0 ? pages[index - 1]! : null,
    next: index < pages.length - 1 ? pages[index + 1]! : null,
  }
}
