"use client"

import { CatalogSection } from "@/components/catalog/catalog-section"
import { CatalogThumbCard } from "@/components/catalog/catalog-thumb-card"
import { CATALOG_ATF_THUMB_COUNT } from "@/components/catalog/catalog-grid"
import { getComponentWireframe } from "@/components/catalog/wireframes/components"
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

/** Sectioned thumb catalog - one card per component, groups from `componentsNav`. */
export function ComponentsDirectory({
  groups,
}: {
  groups: DocsNavGroup[]
}) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-10 md:gap-12">
      {groups.map((group, groupIndex) => (
        <CatalogSection
          key={group.title}
          title={group.title}
          count={group.pages.length}
        >
          {group.pages.map((page, pageIndex) => {
            const slug = slugFromHref(page.href)
            return (
              <CatalogThumbCard
                key={page.href}
                href={page.href}
                title={page.title}
                preview={getComponentWireframe(slug)}
                captureName={slug}
                loading={
                  groupIndex === 0 && pageIndex < CATALOG_ATF_THUMB_COUNT
                    ? "eager"
                    : "lazy"
                }
              />
            )
          })}
        </CatalogSection>
      ))}
    </div>
  )
}
