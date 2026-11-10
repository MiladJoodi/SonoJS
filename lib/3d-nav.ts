export type ThreeDNavPage = {
  title: string
  href: string
  featured?: boolean
  badge?: "new"
}

export type ThreeDNavGroup = {
  title: string
  pages: ThreeDNavPage[]
}

/** Sidebar + index for `/3d`. */
export const threeDNav: {
  top: ThreeDNavPage[]
  groups: ThreeDNavGroup[]
} = {
  top: [{ title: "All 3D", href: "/3d" }],
  groups: [
    {
      title: "Components",
      pages: [
        {
          title: "Beam Circle",
          href: "/3d/beam-circle",
          badge: "new",
          featured: true,
        },
        {
          title: "3D Beam Circle",
          href: "/3d/beam-circle-3d",
          badge: "new",
          featured: true,
        },
        {
          title: "Clothes Rack",
          href: "/3d/clothes-rack",
          featured: true,
        },
        {
          title: "Glass Coin Carousel",
          href: "/3d/glass-coin-carousel",
          badge: "new",
          featured: true,
        },
        {
          title: "Globe",
          href: "/3d/globe",
          badge: "new",
          featured: true,
        },
        {
          title: "Hanging Id Card",
          href: "/3d/hanging-id-card",
          badge: "new",
          featured: true,
        },
        {
          title: "Hover Gallery",
          href: "/3d/hover-gallery",
          badge: "new",
          featured: true,
        },
        {
          title: "Icon Cloud",
          href: "/3d/icon-cloud",
          badge: "new",
          featured: true,
        },
        {
          title: "Image Pageflip",
          href: "/3d/image-pageflip",
          badge: "new",
          featured: true,
        },
        {
          title: "Image Ring",
          href: "/3d/image-ring",
          badge: "new",
          featured: true,
        },
        {
          title: "Infinite Drift",
          href: "/3d/infinite-drift",
          badge: "new",
          featured: true,
        },
        {
          title: "Infinite Drift 2",
          href: "/3d/infinite-drift-2",
          badge: "new",
          featured: true,
        },
        {
          title: "Image Marquee",
          href: "/3d/image-marquee",
          badge: "new",
          featured: true,
        },
        {
          title: "Orbiting Circles",
          href: "/3d/orbiting-circles",
          badge: "new",
          featured: true,
        },
        {
          title: "Perspective Card",
          href: "/3d/perspective-card",
          badge: "new",
          featured: true,
        },
        {
          title: "Plasma Globe",
          href: "/3d/plasma-globe",
          badge: "new",
          featured: true,
        },
        {
          title: "Scroll Trigger",
          href: "/3d/scroll-trigger",
          badge: "new",
          featured: true,
        },
        {
          title: "Smokey Frame",
          href: "/3d/smokey-frame",
          badge: "new",
          featured: true,
        },
      ],
    },
  ],
}

export function get3dPages(): ThreeDNavPage[] {
  return threeDNav.groups.flatMap((group) => group.pages)
}

export function get3dCurrentLabel(pathname: string): string | null {
  if (pathname === "/3d") return "3D"
  const page = get3dPages().find((p) => p.href === pathname)
  return page?.title ?? null
}

export function get3dAdjacent(pathname: string): {
  previous: ThreeDNavPage | null
  next: ThreeDNavPage | null
} {
  const pages = get3dPages()
  const index = pages.findIndex((page) => page.href === pathname)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: index > 0 ? pages[index - 1]! : null,
    next: index < pages.length - 1 ? pages[index + 1]! : null,
  }
}
