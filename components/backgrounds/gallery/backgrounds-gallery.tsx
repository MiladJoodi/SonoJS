import { CatalogSection } from "@/components/catalog/catalog-section"
import { backgroundsCatalog } from "@/lib/backgrounds-catalog"

import { BackgroundExampleCard } from "./example-card"

export function BackgroundsGallery() {
  const entries = [...backgroundsCatalog].sort((a, b) =>
    a.title.localeCompare(b.title)
  )

  return (
    <CatalogSection title="Backgrounds" count={entries.length} showHeader={false}>
      {entries.map((entry) => (
        <BackgroundExampleCard key={entry.id} entry={entry} />
      ))}
    </CatalogSection>
  )
}
