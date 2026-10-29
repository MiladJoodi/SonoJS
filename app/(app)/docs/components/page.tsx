import { ComponentsDirectory } from "@/components/docs/components-directory"
import { componentsNav } from "@/lib/docs-nav"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Components",
  description:
    "Browse SonoJS React components — accessible, Tailwind-styled, copy-source UI primitives for your app.",
  path: "/docs/components",
})

export default function ComponentsIndexPage() {
  return (
    <article className="w-full min-w-0 space-y-6">
      <header className="space-y-3">
        <h1 className="text-h1">Components</h1>
        <p className="leading-relaxed text-muted-foreground">
          Copy-source UI primitives and AI building blocks. Browse by category;
          open a card for docs, install, and examples.
        </p>
      </header>
      <ComponentsDirectory groups={componentsNav.groups} />
    </article>
  )
}
