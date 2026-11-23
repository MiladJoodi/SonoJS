import { CatalogSection } from "@/components/catalog/catalog-section"
import { CatalogThumbCard } from "@/components/catalog/catalog-thumb-card"
import { CATALOG_ATF_THUMB_COUNT } from "@/components/catalog/catalog-grid"
import {
  hasPopupsThumb,
  popupsSlugFromHref,
  popupsThumbSrc,
} from "@/components/popups/gallery"
import { getPopupsPages } from "@/lib/popups-nav"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Popups",
  description:
    "Installable sale overlays, signup modals, age gates, and seasonal popups for React.",
  path: "/popups",
})

export default function PopupsIndexPage() {
  const pages = getPopupsPages()

  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Popups</h1>
        <p className="text-muted-foreground">
          Sale overlays, signup modals, ribbons, and seasonal popups - preview live, then
          download the Pro zip.
        </p>
      </header>

      <CatalogSection title="Components" count={pages.length} showHeader={false}>
        {pages.map((page, index) => {
          const slug = popupsSlugFromHref(page.href)
          const hasThumb = hasPopupsThumb(slug)
          return (
            <CatalogThumbCard
              key={page.href}
              href={page.href}
              title={page.title}
              lightSrc={hasThumb ? popupsThumbSrc(slug, "light") : undefined}
              darkSrc={hasThumb ? popupsThumbSrc(slug, "dark") : undefined}
              thumbFit="cover"
              loading={index < CATALOG_ATF_THUMB_COUNT ? "eager" : "lazy"}
            />
          )
        })}
      </CatalogSection>
    </article>
  )
}
