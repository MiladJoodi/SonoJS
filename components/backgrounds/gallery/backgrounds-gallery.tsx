import { CatalogSection } from "@/components/catalog/catalog-section"
import { backgroundsCatalog } from "@/lib/backgrounds-catalog"
import { isBackgroundSpotlight } from "@/lib/backgrounds-nav"

import { BackgroundExampleCard } from "./example-card"

export function BackgroundsGallery() {
  const entries = [...backgroundsCatalog].sort((a, b) => {
    const af = isBackgroundSpotlight(a.id) ? 0 : 1
    const bf = isBackgroundSpotlight(b.id) ? 0 : 1
    if (af !== bf) return af - bf
    return a.title.localeCompare(b.title)
  })

  return (
    <CatalogSection title="Backgrounds" count={entries.length} showHeader={false}>
      {entries.map((entry) => (
        <BackgroundExampleCard key={entry.id} entry={entry} />
      ))}
    </CatalogSection>
  )
}
