import type { MetadataRoute } from "next"

import { absoluteUrl, isProductionIndexingEnabled } from "@/lib/seo"
import { PRODUCTION_ORIGIN } from "@/lib/site-origin"

export default function robots(): MetadataRoute.Robots {
  if (!isProductionIndexingEnabled()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /api is POST-only (contact + tools proxy) — no Disallow; not in sitemap.
      // /view allowed so crawlers can see noindex meta + X-Robots-Tag.
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: PRODUCTION_ORIGIN,
  }
}
