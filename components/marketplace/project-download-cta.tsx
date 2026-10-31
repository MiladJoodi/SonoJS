import { MarketplaceDownloadButton } from "@/components/marketplace/marketplace-download-button"
import type { MarketplaceProject } from "@/lib/marketplace-catalog"

/** Always shows the blue download button; access is checked on click. */
export function ProjectDownloadCta({
  project,
}: {
  project: MarketplaceProject
}) {
  return <MarketplaceDownloadButton project={project} />
}
