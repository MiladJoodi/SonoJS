import Link from "next/link"

import { getCarouselsPages } from "@/lib/carousels-nav"
import { pageMetadata } from "@/lib/seo"
import { SidebarNavBadge, SidebarNavBullet } from "@/components/sidebar-nav"

export const metadata = pageMetadata({
  title: "Carousels",
  description:
    "Browse SonoJS carousel components - 3D image stacks, swipe decks, and more. Install with the CLI.",
  path: "/carousels",
})

export default function CarouselsIndexPage() {
  const pages = getCarouselsPages()

  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Carousels</h1>
        <p className="text-muted-foreground">
          Swipeable decks and image carousels you can install and own. Open a
          page for a live preview, install command, and source.
        </p>
        <p className="text-sm text-muted-foreground">
          {pages.length} component{pages.length === 1 ? "" : "s"}
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {pages.map((page) => (
          <li key={page.href}>
            <Link
              href={page.href}
              prefetch={false}
              className="flex cursor-pointer items-center gap-2 rounded-[12px] border border-border/70 bg-card px-4 py-3 shadow-soft transition-colors hover:bg-muted/40"
            >
              <SidebarNavBullet featured={page.featured} />
              <span className="min-w-0 flex-1 truncate font-medium">
                {page.title}
              </span>
              {page.badge === "new" ? (
                <SidebarNavBadge>New</SidebarNavBadge>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
