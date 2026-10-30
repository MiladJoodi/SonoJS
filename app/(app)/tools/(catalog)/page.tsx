import type { Metadata } from "next"
import Link from "next/link"

import { getAllToolItems } from "@/lib/tools-nav"
import { cn } from "@/lib/utils"

import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Tools",
  description: "Browser utilities for everyday web development.",
  path: "/tools",
})

export default function ToolsIndexPage() {
  const tools = getAllToolItems()

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-h1">Tools</h1>
        <p className="leading-relaxed text-muted-foreground">
          Browser utilities for everyday web development. Each tool runs on
          this page.
        </p>
        {tools.length > 0 ? (
          <p className="text-sm text-muted-foreground">
            {tools.length} {tools.length === 1 ? "tool" : "tools"}
          </p>
        ) : null}
      </header>

      {tools.length === 0 ? (
        <p className="text-sm text-muted-foreground">No tools yet.</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-1">
          {tools.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex min-h-[46px] cursor-pointer flex-col justify-center gap-0.5 rounded-[12px] border border-transparent px-3 py-2 text-sm transition-colors hover:border-border/70 hover:bg-card"
                )}
              >
                <span className="truncate font-medium text-foreground">
                  {item.title}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
