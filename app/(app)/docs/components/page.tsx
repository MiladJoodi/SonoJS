import { ComponentsDirectory } from "@/components/docs/components-directory"
import { getDocsComponentPages } from "@/lib/docs-nav"

export default function ComponentsIndexPage() {
  const components = getDocsComponentPages()

  const items = components.map((page) => ({
    title: page.title,
    href: page.href,
    featured: page.featured,
    slug: page.href.replace(/^\/docs\/components\//, ""),
  }))

  return (
    <article className="w-full min-w-0 space-y-6">
      <h1 className="text-h1">Components</h1>
      <ComponentsDirectory items={items} />
    </article>
  )
}
