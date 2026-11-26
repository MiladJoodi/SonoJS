import type { Metadata } from "next"

import { ToolTile, ToolsCatalogGrid } from "@/components/tools/catalog"
import { getAllToolItems } from "@/lib/tools-nav"

import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Tools",
  description: "Browser utilities for everyday web development.",
  path: "/tools",
})

export default function ToolsIndexPage() {
  const tools = getAllToolItems()

  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-3">
        <h1 className="text-h1">Tools</h1>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          Browser utilities for everyday web development. Each tool runs on
          this page.
        </p>
      </header>

      {tools.length === 0 ? (
        <p className="text-sm text-muted-foreground">No tools yet.</p>
      ) : (
        <div className="w-full max-w-5xl">
          <ToolsCatalogGrid>
            {tools.map((item) => (
              <li key={item.href} className="min-w-0">
                <ToolTile item={item} />
              </li>
            ))}
          </ToolsCatalogGrid>
        </div>
      )}
    </article>
  )
}