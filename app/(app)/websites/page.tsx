import { Suspense } from "react"

import { WebsitesCatalogPage } from "@/components/websites"
import { getWebsitePreviewItems } from "@/lib/templates-preview-data"
import { pageMetadata } from "@/lib/seo"
import { LoadingRing } from "@/components/sono-loader"

export const metadata = pageMetadata({
  title: "Websites",
  description:
    "Browse SonoJS multi-page website packs - preview live demos and download source kits for cafés, salons, gyms, boutiques, and more.",
  path: "/websites",
})

export default function WebsitesPage() {
  const items = getWebsitePreviewItems()

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-canvas">
          <LoadingRing size={40} showLabel label="Loading websites…" />
        </div>
      }
    >
      <WebsitesCatalogPage items={items} />
    </Suspense>
  )
}
