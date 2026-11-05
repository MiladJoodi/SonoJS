import { BlocksCategoryGrid } from "@/components/catalog/blocks-category-grid"
import { blocksNav } from "@/lib/blocks-nav"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Blocks",
  description:
    "Copy-ready UI sections for auth, marketing, ecommerce, dashboards, and more — preview variants, then install with the CLI.",
  path: "/blocks",
})

export default function BlocksIndexPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Blocks</h1>
        <p className="leading-relaxed text-muted-foreground">
          Copy-ready sections for auth, marketing, ecommerce, dashboards, and
          more — open a category, preview variants, install with the CLI.
        </p>
      </header>

      <BlocksCategoryGrid groups={blocksNav} />
    </article>
  )
}
