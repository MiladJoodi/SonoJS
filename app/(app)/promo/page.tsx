import { CatalogSection } from "@/components/catalog/catalog-section"
import { CatalogThumbCard } from "@/components/catalog/catalog-thumb-card"
import { CATALOG_ATF_THUMB_COUNT } from "@/components/catalog/catalog-grid"
import {
  hasPromoThumb,
  promoSlugFromHref,
  promoThumbSrc,
} from "@/components/promo/gallery"
import { getPromoPages } from "@/lib/promo-nav"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Promo",
  description:
    "Installable sale tags, signup modals, and seasonal promo overlays for React.",
  path: "/promo",
})

export default function PromoIndexPage() {
  const pages = getPromoPages()

  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Promo</h1>
        <p className="text-muted-foreground">
          Sale tags, signup modals, and seasonal overlays — preview live, then
          add with the CLI.
        </p>
      </header>

      <CatalogSection title="Components" count={pages.length} showHeader={false}>
        {pages.map((page, index) => {
          const slug = promoSlugFromHref(page.href)
          const hasThumb = hasPromoThumb(slug)
          return (
            <CatalogThumbCard
              key={page.href}
              href={page.href}
              title={page.title}
              lightSrc={hasThumb ? promoThumbSrc(slug, "light") : undefined}
              darkSrc={hasThumb ? promoThumbSrc(slug, "dark") : undefined}
              loading={index < CATALOG_ATF_THUMB_COUNT ? "eager" : "lazy"}
            />
          )
        })}
      </CatalogSection>
    </article>
  )
}
