import Link from "next/link"

import { blocksNav, getBlocksStats } from "@/lib/blocks-nav"
import { pageMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata = pageMetadata({
  title: "Blocks",
  description:
    "Ready-made SonoJS UI blocks — authentication, navigation, marketing, ecommerce, and more. Preview variants and install with the CLI.",
  path: "/blocks",
})

export default function BlocksIndexPage() {
  const stats = getBlocksStats()

  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-3">
        <h1 className="text-h1">Blocks</h1>
        <p className="leading-relaxed text-muted-foreground">
          Ready-made sections and screens for SonoJS apps. Browse shipped
          categories below; more patterns continue to land over time.
        </p>
        <p className="text-sm text-muted-foreground">
          {stats.categories} categories · {stats.total} blocks ·{" "}
          {stats.ready} ready · {stats.comingSoon} under development
        </p>
      </header>

      <div className="space-y-8">
        {blocksNav.map((group) => (
          <section key={group.title} className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-h4">{group.title}</h2>
              <span className="text-xs text-muted-foreground tabular-nums">
                {group.items.length}
              </span>
            </div>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-1">
              {group.items.map((item) => {
                const ready = item.status === "ready"
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-[46px] cursor-pointer items-center justify-between gap-2 rounded-[12px] border border-transparent px-3 text-sm transition-colors hover:border-border/70 hover:bg-card",
                        ready
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <span className="truncate">{item.title}</span>
                      <span
                        className={cn(
                          "shrink-0 text-[0.6875rem] tracking-wide uppercase",
                          ready ? "text-primary" : "text-muted-foreground/80"
                        )}
                      >
                        {ready ? "Ready" : "Soon"}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </article>
  )
}
