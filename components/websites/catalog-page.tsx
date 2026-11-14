"use client"

import { TemplateCatalogPage } from "@/components/templates/catalog-page"
import type { TemplatePreviewItem } from "@/lib/templates-preview-data"

import { WebsitesHero } from "./hero"

/** Same shop chrome as Templates - only the hero + filtered website items differ. */
export function WebsitesCatalogPage({
  items,
}: {
  items: TemplatePreviewItem[]
}) {
  return (
    <TemplateCatalogPage
      items={items}
      surface="websites"
      hero={<WebsitesHero />}
    />
  )
}
