import { CatalogSection } from "@/components/catalog/catalog-section"
import { CatalogThumbCard } from "@/components/catalog/catalog-thumb-card"
import { CATALOG_ATF_THUMB_COUNT } from "@/components/catalog/catalog-grid"
import {
  carouselSlugFromHref,
  carouselThumbSrc,
  hasCarouselThumb,
} from "@/components/carousels/gallery"
import { getCarouselsPages } from "@/lib/carousels-nav"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Carousels",
  description:
    "Installable carousels for React — preview live, then add with the CLI.",
  path: "/carousels",
})

export default function CarouselsIndexPage() {
  const pages = getCarouselsPages()

  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Carousels</h1>
        <p className="text-muted-foreground">
          Installable carousels for React — preview live, then add with the CLI.
        </p>
      </header>

      <CatalogSection title="Components" count={pages.length} showHeader={false}>
        {pages.map((page, index) => {
          const slug = carouselSlugFromHref(page.href)
          const src = hasCarouselThumb(slug) ? carouselThumbSrc(slug) : undefined
          return (
            <CatalogThumbCard
              key={page.href}
              href={page.href}
              title={page.title}
              lightSrc={src}
              darkSrc={src}
              loading={index < CATALOG_ATF_THUMB_COUNT ? "eager" : "lazy"}
            />
          )
        })}
      </CatalogSection>
    </article>
  )
}
