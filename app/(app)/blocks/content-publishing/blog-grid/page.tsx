import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import BlogGrid01 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-01/blog-grid"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/content-publishing/blog-grid",
  "Blog Grid",
  "Ready-to-use Blog Grid UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import BlogGrid from "@/components/blocks/content-publishing/${name}/blog-grid"

export default function Page() {
  return <BlogGrid />
}`

export default function BlockBlogGridDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Blog Grid"
        pathname="/blocks/content-publishing/blog-grid"
        description="Category chips, search, empty state, post cards, and pagination for a filtered blog listing."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="blog-grid-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("blog-grid-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <BlogGrid01 />
        </BlockExample>
      </div>
    </article>
  )
}
