import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ArticleLayout01 from "@/registry/blocks/content-publishing/article-layout/article-layout-01/article-layout"
import ArticleLayout02 from "@/registry/blocks/content-publishing/article-layout/article-layout-02/article-layout"
import ArticleLayout03 from "@/registry/blocks/content-publishing/article-layout/article-layout-03/article-layout"
import ArticleLayout04 from "@/registry/blocks/content-publishing/article-layout/article-layout-04/article-layout"
import ArticleLayout05 from "@/registry/blocks/content-publishing/article-layout/article-layout-05/article-layout"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/content-publishing/article-layout",
  "Article Layout",
  "Ready-to-use Article Layout UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ArticleLayout from "@/components/blocks/content-publishing/${name}/article-layout"

export default function Page() {
  return <ArticleLayout />
}`

function ExampleRule() {
  return (
    <div
      role="separator"
      className="h-px w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 18%, transparent) 0 8px, transparent 8px 16px)",
      }}
    />
  )
}

const examples = [
  { name: "article-layout-01", Component: ArticleLayout01 },
  { name: "article-layout-02", Component: ArticleLayout02 },
  { name: "article-layout-03", Component: ArticleLayout03 },
  { name: "article-layout-04", Component: ArticleLayout04 },
  { name: "article-layout-05", Component: ArticleLayout05 },
] as const

export default function BlockArticleLayoutDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Article Layout"
        pathname="/blocks/content-publishing/article-layout"
        description="Five long-form layouts — classic sticky TOC, magazine cover, editorial split, product-docs hybrid, and series immersive with progress + sticky actions."
      />

      <div className="flex flex-col gap-8">
        {examples.map(({ name, Component }, i) => (
          <div key={name} className="flex flex-col gap-8">
            {i > 0 ? <ExampleRule /> : null}
            <BlockExample
              name={name}
              usage={[{ title: "app/page.tsx", code: usage(name) }]}
              previewAlign="start"
              previewClassName="bg-white p-0 dark:bg-background"
            >
              <Component />
            </BlockExample>
          </div>
        ))}
      </div>
    </article>
  )
}
