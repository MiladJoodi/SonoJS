"use client"

import { CatalogSection } from "@/components/catalog/catalog-section"
import {
  compareCursorsCatalogOrder,
  cursorsCatalog,
} from "@/lib/cursors-catalog"

import { CursorExampleCard } from "./example-card"
import { cursorThumbSrc } from "./thumbs"

/** Flat card grid, shared catalog columns (same as 3D / AI / carousels). */
export function CursorGallery() {
  const entries = [...cursorsCatalog].sort(compareCursorsCatalogOrder)

  return (
    <CatalogSection title="Cursors" count={entries.length} showHeader={false}>
      {entries.map((entry) => (
        <CursorExampleCard
          key={entry.id}
          id={entry.id}
          title={entry.title}
          status={entry.status}
          imageSrc={cursorThumbSrc(entry.id)}
          disableLivePreview={entry.id === "splash-cursor"}
        />
      ))}
    </CatalogSection>
  )
}
