import { headers } from "next/headers"

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld"
import {
  BREADCRUMB_PATH_HEADER,
  isBreadcrumbEligiblePath,
  resolveBreadcrumbLeafLabel,
} from "@/lib/seo-breadcrumb-labels"
import { normalizePath } from "@/lib/seo"

/**
 * Server-rendered BreadcrumbList for the current App Router page.
 * Pathname is injected by `proxy.ts` into request headers.
 */
export async function SitewideBreadcrumbJsonLd() {
  const headerList = await headers()
  const raw = headerList.get(BREADCRUMB_PATH_HEADER)?.trim()
  if (!raw) return null

  const pathname = normalizePath(raw)
  if (!isBreadcrumbEligiblePath(pathname)) return null

  const leafLabel = resolveBreadcrumbLeafLabel(pathname)
  return (
    <BreadcrumbJsonLd pathname={pathname} leafLabel={leafLabel ?? undefined} />
  )
}