import { JsonLd } from "@/components/seo/json-ld"
import { contentPageJsonLd } from "@/lib/seo-jsonld"
import type { ResolvedContentPage } from "@/lib/seo-content-page"

export function ContentPageJsonLd({ page }: { page: ResolvedContentPage }) {
  const data = contentPageJsonLd(page)
  if (!data) return null
  return <JsonLd data={data} />
}