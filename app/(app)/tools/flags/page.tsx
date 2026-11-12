import type { Metadata } from "next"
import { Suspense } from "react"

import { Workspace } from "@/components/tools/flags"
import { noindexMetadata } from "@/lib/seo"

export const metadata: Metadata = noindexMetadata({
  title: "Flags",
  description: "Browse flags and copy CDN URLs.",
  path: "/tools/flags",
})

export default function FlagsToolPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center bg-canvas text-sm text-muted-foreground">
          Loading flags…
        </div>
      }
    >
      <Workspace />
    </Suspense>
  )
}
