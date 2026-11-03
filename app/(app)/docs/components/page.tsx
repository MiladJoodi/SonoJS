import { ComponentsDirectory } from "@/components/docs/components-directory"
import {
  COMPONENTS_FEATURED_GROUP,
  componentsNav,
} from "@/lib/docs-nav"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Components",
  description:
    "Browse SonoJS React components — accessible, Tailwind-styled, copy-source UI primitives for your app.",
  path: "/docs/components",
})

export default function ComponentsIndexPage() {
  // Featured is a sidebar spotlight; catalog lists each item once under its category.
  const groups = componentsNav.groups.filter(
    (group) => group.title !== COMPONENTS_FEATURED_GROUP
  )

  return (
    <article className="w-full min-w-0 space-y-6">
      <header className="space-y-3">
        <h1 className="text-h1">Components</h1>
        <p className="leading-relaxed text-muted-foreground">
          Copy-source UI primitives and AI building blocks. Browse by category;
          open a card for docs, install, and examples.
        </p>
      </header>
      <ComponentsDirectory groups={groups} />
    </article>
  )
}
