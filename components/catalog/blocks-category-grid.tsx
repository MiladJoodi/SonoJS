"use client"

import { CatalogSection } from "@/components/catalog/catalog-section"
import { CatalogThumbCard } from "@/components/catalog/catalog-thumb-card"
import {
  blockCategoryThumbSrc,
  hasBlockCategoryThumb,
} from "@/components/catalog/thumbs"
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
      gridClassName="grid-cols-2"
    >
      {groups.map((group) => {
        const category = getBlocksCategorySlug(group)
        const useThumb = hasBlockCategoryThumb(category)
        const wireframe = useThumb
          ? null
          : getBlockCategoryWireframe(category)
        return (
          <CatalogThumbCard
            key={group.title}
            href={getBlocksCategoryEntryHref(group)}
            title={group.title}
            preview={wireframe ?? undefined}
            lightSrc={
              useThumb || !wireframe
                ? blockCategoryThumbSrc(category, "light")
                : undefined
            }
            darkSrc={
              useThumb || !wireframe
                ? blockCategoryThumbSrc(category, "dark")
                : undefined
            }
            roundedThumb
          />
        )
      })}
    </CatalogSection>
  )
}
