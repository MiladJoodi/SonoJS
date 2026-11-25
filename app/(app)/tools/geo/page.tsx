import type { Metadata } from "next"
import { Suspense } from "react"

import { Workspace } from "@/components/tools/geo"
import { noindexMetadata } from "@/lib/seo"

export const metadata: Metadata = noindexMetadata({
  title: "Geo",
  description: "Try country, state, and city selection with @sonojs/geo.",
  path: "/tools/geo",
})

export default function GeoToolPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center bg-canvas text-sm text-muted-foreground">
          Loading geo…
        </div>
      }
    >
      <Workspace />
    </Suspense>
  )
}