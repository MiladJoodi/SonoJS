import Link from "next/link"

import { get3dPages } from "@/lib/3d-nav"
import { pageMetadata } from "@/lib/seo"
import { SidebarNavBadge, SidebarNavBullet } from "@/components/sidebar-nav"

export const metadata = pageMetadata({
  title: "3D",
  description:
    "Browse SonoJS 3D components - image rings, clothes racks, and more. Install with the CLI.",
  path: "/3d",
})

export default function ThreeDIndexPage() {
  const pages = get3dPages()

  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">3D</h1>
        <p className="text-muted-foreground">
          Interactive 3D UI pieces you can install and own. Open a page for a
          live preview, install command, and source.
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
