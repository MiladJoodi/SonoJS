import { redirect } from "next/navigation"

import { getFirstFeaturedComponentHref } from "@/lib/docs-nav"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Components",
  description:
    "Browse SonoJS React components — accessible, Tailwind-styled, copy-source UI primitives for your app.",
  path: "/docs/components",
})

/** `/docs/components` lands on the first Featured item. */
export default function ComponentsIndexPage() {
  redirect(getFirstFeaturedComponentHref())
}
