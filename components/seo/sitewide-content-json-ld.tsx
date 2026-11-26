import { headers } from "next/headers"

import { ContentPageJsonLd } from "@/components/seo/content-page-json-ld"
import { BREADCRUMB_PATH_HEADER } from "@/lib/seo-breadcrumb-labels"
import {
  isContentJsonLdEligiblePath,
  resolveContentPage,
} from "@/lib/seo-content-page"
import { normalizePath } from "@/lib/seo"

/** Server JSON-LD for docs, blocks, charts, AI, and cursor catalog pages. */
export async function SitewideContentJsonLd() {
  const headerList = await headers()
  const raw = headerList.get(BREADCRUMB_PATH_HEADER)?.trim()
  if (!raw) return null

  const pathname = normalizePath(raw)
  if (!isContentJsonLdEligiblePath(pathname)) return null

  const page = resolveContentPage(pathname)
  if (!page) return null

  return <ContentPageJsonLd page={page} />
}