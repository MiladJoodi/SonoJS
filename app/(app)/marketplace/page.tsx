import { Suspense } from "react"

import { MarketplaceCatalogPage } from "@/components/marketplace"
import { getMarketplacePreviewItems } from "@/lib/marketplace-preview-data"
import { pageMetadata } from "@/lib/seo"
import { LoadingRing } from "@/components/sono-loader"

export const metadata = pageMetadata({
  title: "Marketplace",
  description:
    "Browse SonoJS templates and full projects - filter by stack, preview live demos, and download source kits.",
  path: "/marketplace",
})

export default function MarketplacePage() {
  const items = getMarketplacePreviewItems()

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-canvas">
          <LoadingRing size={40} showLabel label="Loading marketplace…" />
        </div>
      }
    >
      <MarketplaceCatalogPage items={items} />
    </Suspense>
  )
}
