import { CatalogSection } from "@/components/catalog/catalog-section"
import { CatalogThumbCard } from "@/components/catalog/catalog-thumb-card"
import { CATALOG_ATF_THUMB_COUNT } from "@/components/catalog/catalog-grid"
import {
  hasThreeDThumb,
  threeDSlugFromHref,
  threeDThumbSrc,
} from "@/components/3d/gallery"
import { get3dPages } from "@/lib/3d-nav"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "3D",
  description:
    "Installable 3D scenes for React — preview live, then add with the CLI.",
  path: "/3d",
})

export default function ThreeDIndexPage() {
  const pages = get3dPages()

  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">3D</h1>
        <p className="text-muted-foreground">
          Installable 3D scenes for React — preview live, then add with the CLI.
        </p>
      </header>

      <CatalogSection title="Components" count={pages.length} showHeader={false}>
        {pages.map((page, index) => {
          const slug = threeDSlugFromHref(page.href)
          const src = hasThreeDThumb(slug) ? threeDThumbSrc(slug) : undefined
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
