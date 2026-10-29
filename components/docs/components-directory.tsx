import {
  CatalogSection,
  CatalogThumbCard,
  componentThumbSrc,
} from "@/components/catalog"
import type { DocsNavGroup } from "@/lib/docs-nav"

export type ComponentsDirectoryItem = {
  title: string
  href: string
  slug: string
  featured?: boolean
}

function slugFromHref(href: string) {
  return href.replace(/^\/docs\/components\//, "")
}

/** Sectioned thumb catalog — one card per component, groups from `componentsNav`. */
export function ComponentsDirectory({
  groups,
}: {
  groups: DocsNavGroup[]
}) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-10 md:gap-12">
      {groups.map((group) => (
        <CatalogSection
          key={group.title}
          title={group.title}
          count={group.pages.length}
        >
          {group.pages.map((page) => {
            const slug = slugFromHref(page.href)
            return (
              <CatalogThumbCard
                key={page.href}
                href={page.href}
                title={page.title}
                lightSrc={componentThumbSrc(slug, "light")}
                darkSrc={componentThumbSrc(slug, "dark")}
              />
            )
          })}
        </CatalogSection>
      ))}
    </div>
  )
}
