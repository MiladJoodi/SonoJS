export type CarouselsNavPage = {
  title: string
  href: string
  featured?: boolean
  badge?: "new"
}

export type CarouselsNavGroup = {
  title: string
  pages: CarouselsNavPage[]
}

/** Sidebar + index for `/carousels`. */
export const carouselsNav: {
  top: CarouselsNavPage[]
  groups: CarouselsNavGroup[]
} = {
  top: [{ title: "All Carousels", href: "/carousels" }],
  groups: [
    {
      title: "Components",
      pages: [
        {
          title: "3D Image Carousel",
          href: "/carousels/3d-image-carousel",
          badge: "new",
          featured: true,
        },
        {
          title: "3D Carousel",
          href: "/carousels/3d-carousel",
          badge: "new",
        },
        {
          title: "3D Image Slider",
          href: "/carousels/3d-image-slider",
          badge: "new",
        },
        {
          title: "3D Bend Carousel",
          href: "/carousels/3d-bend-carousel",
          badge: "new",
        },
        {
          title: "3D Slider",
          href: "/carousels/3d-slider",
          badge: "new",
        },
        {
          title: "Angled Slider",
          href: "/carousels/angled-slider",
          badge: "new",
        },
        {
          title: "Chain Carousel",
          href: "/carousels/chain-carousel",
          badge: "new",
        },
        {
          title: "Stylish Carousel",
          href: "/carousels/stylish-carousel",
          badge: "new",
        },
        {
          title: "Cool Slide Gallery",
          href: "/carousels/cool-slide-gallery",
          badge: "new",
        },
      ],
    },
  ],
}

export function getCarouselsPages(): CarouselsNavPage[] {
  return carouselsNav.groups.flatMap((group) => group.pages)
}

export function getCarouselsCurrentLabel(pathname: string): string | null {
  if (pathname === "/carousels") return "Carousels"
  const page = getCarouselsPages().find((p) => p.href === pathname)
  return page?.title ?? null
}

export function getCarouselsAdjacent(pathname: string): {
  previous: CarouselsNavPage | null
  next: CarouselsNavPage | null
} {
  const pages = getCarouselsPages()
  const index = pages.findIndex((page) => page.href === pathname)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: index > 0 ? pages[index - 1]! : null,
    next: index < pages.length - 1 ? pages[index + 1]! : null,
  }
}
