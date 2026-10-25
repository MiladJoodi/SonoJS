import type { Metadata } from "next"

import { Workspace } from "@/components/tools/endpoints"

export const metadata: Metadata = {
  title: "API Client",
  description:
    "Send HTTP requests, inspect responses, and keep collections in the browser.",
}

export default function EndpointsToolPage() {
  return <Workspace />
}
