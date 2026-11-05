import { CatalogSection } from "@/components/catalog/catalog-section"
import { CatalogThumbCard } from "@/components/catalog/catalog-thumb-card"
import { CATALOG_ATF_THUMB_COUNT } from "@/components/catalog/catalog-grid"
import {
  aiSlugFromHref,
  aiThumbSrc,
  hasAiThumb,
} from "@/components/ai/gallery"
import { getAiPages } from "@/lib/ai-nav"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "AI",
  description:
    "Preview installable AI UI for React, then add it with the CLI.",
  path: "/ai",
})

export default function AiIndexPage() {
  const pages = getAiPages()

  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">AI</h1>
        <p className="text-muted-foreground">
          Preview installable AI UI for React, then add it with the CLI.
        </p>
      </header>

      <CatalogSection title="Components" count={pages.length} showHeader={false}>
        {pages.map((page, index) => {
          const slug = aiSlugFromHref(page.href)
          const src = hasAiThumb(slug) ? aiThumbSrc(slug) : undefined
          return (
            <CatalogThumbCard
              key={page.href}
              href={page.href}
              title={page.title}
              lightSrc={src}
              darkSrc={src}
              roundedThumb
              loading={index < CATALOG_ATF_THUMB_COUNT ? "eager" : "lazy"}
            />
          )
        })}
      </CatalogSection>
    </article>
  )
}
