import type { Metadata } from "next"
import Link from "next/link"

import { getAllToolItems, toolsNav } from "@/lib/tools-nav"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Tools",
  description: "Browser utilities for everyday web development.",
}

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
            {toolsNav.length} {toolsNav.length === 1 ? "group" : "groups"} ·{" "}
            {tools.length} {tools.length === 1 ? "tool" : "tools"}
          </p>
        ) : null}
      </header>

      {tools.length === 0 ? (
        <p className="text-sm text-muted-foreground">No tools yet.</p>
      ) : (
        <div className="space-y-8">
          {toolsNav.map((group) => (
            <section key={group.title} className="space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-h4">{group.title}</h2>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {group.items.length}
                </span>
              </div>
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex cursor-pointer flex-col gap-0.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
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
            </section>
          ))}
        </div>
      )}
    </article>
  )
}
