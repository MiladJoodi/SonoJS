import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbListJsonLd } from "@/lib/seo-jsonld"

export function BreadcrumbJsonLd({
  pathname,
  leafLabel,
}: {
  pathname: string
  leafLabel?: string
}) {
  const data = breadcrumbListJsonLd(pathname, {
    leafLabel: leafLabel?.trim() || undefined,
  })
  if (!data) return null
  return <JsonLd data={data} />
}