import { BlocksCategoryGrid } from "@/components/catalog/blocks-category-grid"
import { blocksNav, getBlocksStats } from "@/lib/blocks-nav"
import { pageMetadata } from "@/lib/seo"

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

      <BlocksCategoryGrid groups={blocksNav} />
    </article>
  )
}
