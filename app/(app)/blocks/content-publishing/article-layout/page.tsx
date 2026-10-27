import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ArticleLayout01 from "@/registry/blocks/content-publishing/article-layout/article-layout-01/article-layout"

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

export default function BlockArticleLayoutDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Article Layout"
        pathname="/blocks/content-publishing/article-layout"
        description="Long-form post chrome — hero meta, prose, sticky TOC, author card, and adjacent posts."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="article-layout-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("article-layout-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ArticleLayout01 />
        </BlockExample>
      </div>
    </article>
  )
}
