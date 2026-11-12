import { Suspense } from "react"

import { TemplateCatalogPage } from "@/components/templates"
import { getTemplatePreviewItems } from "@/lib/templates-preview-data"
import { pageMetadata } from "@/lib/seo"
import { LoadingRing } from "@/components/sono-loader"

export const metadata = pageMetadata({
  title: "Templates",
  description:
    "Browse SonoJS templates and full projects - filter by stack, preview live demos, and download source kits.",
  path: "/templates",
})

export default function TemplatesPage() {
  const items = getTemplatePreviewItems()

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-canvas">
          <LoadingRing size={40} showLabel label="Loading templates…" />
        </div>
      }
    >
      <TemplateCatalogPage items={items} />
    </Suspense>
  )
}
