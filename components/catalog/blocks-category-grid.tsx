"use client"

import { CatalogSection } from "@/components/catalog/catalog-section"
import { CatalogThumbCard } from "@/components/catalog/catalog-thumb-card"
import { blockCategoryThumbSrc } from "@/components/catalog/thumbs"
import { getBlockCategoryWireframe } from "@/components/catalog/wireframes/blocks"
import {
  getBlocksCategoryEntryHref,
  getBlocksCategorySlug,
  type BlocksNavGroup,
} from "@/lib/blocks-nav"

export function BlocksCategoryGrid({
  groups,
}: {
  groups: BlocksNavGroup[]
}) {
  return (
    <CatalogSection
      title="Categories"
      count={groups.length}
      showHeader={false}
    >
      {groups.map((group) => {
        const category = getBlocksCategorySlug(group)
          const wireframe = getBlockCategoryWireframe(category)
          return (
            <CatalogThumbCard
              key={group.title}
              href={getBlocksCategoryEntryHref(group)}
              title={group.title}
              preview={wireframe ?? undefined}
              lightSrc={
                wireframe
                  ? undefined
                  : blockCategoryThumbSrc(category, "light")
              }
              darkSrc={
                wireframe
                  ? undefined
                  : blockCategoryThumbSrc(category, "dark")
              }
            />
          )
      })}
    </CatalogSection>
  )
}
