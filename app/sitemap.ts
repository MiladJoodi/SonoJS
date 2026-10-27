import type { MetadataRoute } from "next"

import { assertSitemapIntegrity, buildSitemapEntries } from "@/lib/seo-sitemap"

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = assertSitemapIntegrity(buildSitemapEntries())
  return entries.map((entry) => ({
    url: entry.url,
    // Omit lastModified — no defensible per-URL timestamps available.
  }))
}
