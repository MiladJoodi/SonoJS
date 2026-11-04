"use client"

import { CatalogSection } from "@/components/catalog/catalog-section"
import { cursorsCatalog } from "@/lib/cursors-catalog"

import { CursorExampleCard } from "./example-card"

/** Flat card grid — shared catalog columns (same as 3D / AI / carousels). */
export function CursorGallery() {
  const entries = [...cursorsCatalog].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === "ported" ? -1 : 1
    }
    return a.title.localeCompare(b.title)
  })

  return (
    <CatalogSection title="Cursors" count={entries.length} showHeader={false}>
      {entries.map((entry) => (
        <CursorExampleCard
          key={entry.id}
          id={entry.id}
          title={entry.title}
          status={entry.status}
        />
      ))}
    </CatalogSection>
  )
}
