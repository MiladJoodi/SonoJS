import type { Metadata } from "next"

import { Workspace } from "@/components/tools/endpoints"
import { noindexMetadata } from "@/lib/seo"

export const metadata: Metadata = noindexMetadata({
  title: "API Client",
  description:
    "Send HTTP requests, inspect responses, and keep collections in the browser.",
  path: "/tools/endpoints",
})

export default function EndpointsToolPage() {
  return <Workspace />
}
