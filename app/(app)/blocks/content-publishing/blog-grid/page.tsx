import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import BlogGrid01 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-01/blog-grid"
import BlogGrid02 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-02/blog-grid"
import BlogGrid03 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-03/blog-grid"
import BlogGrid04 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-04/blog-grid"
import BlogGrid05 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-05/blog-grid"
import BlogGrid06 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-06/blog-grid"
import BlogGrid07 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-07/blog-grid"
import BlogGrid08 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-08/blog-grid"
import BlogGrid09 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-09/blog-grid"
import BlogGrid10 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-10/blog-grid"

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

const WHITE_STAGE = "bg-white p-0 dark:bg-background"

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

export default function BlockBlogGridDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Blog Grid"
        pathname="/blocks/content-publishing/blog-grid"
        description="Publishing indexes — filter studio, featured magazine, bento mosaic, editorial archive, cinematic theater, filter-rail app shell, type index, topic rails, author atelier, and command density."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="blog-grid-01"
          usage={[{ title: "app/page.tsx", code: usage("blog-grid-01") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <BlogGrid01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-grid-02"
          usage={[{ title: "app/page.tsx", code: usage("blog-grid-02") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <BlogGrid02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-grid-03"
          usage={[{ title: "app/page.tsx", code: usage("blog-grid-03") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <BlogGrid03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-grid-04"
          usage={[{ title: "app/page.tsx", code: usage("blog-grid-04") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <BlogGrid04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-grid-05"
          usage={[{ title: "app/page.tsx", code: usage("blog-grid-05") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <BlogGrid05 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-grid-06"
          usage={[{ title: "app/page.tsx", code: usage("blog-grid-06") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <BlogGrid06 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-grid-07"
          usage={[{ title: "app/page.tsx", code: usage("blog-grid-07") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <BlogGrid07 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-grid-08"
          usage={[{ title: "app/page.tsx", code: usage("blog-grid-08") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <BlogGrid08 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-grid-09"
          usage={[{ title: "app/page.tsx", code: usage("blog-grid-09") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <BlogGrid09 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-grid-10"
          usage={[{ title: "app/page.tsx", code: usage("blog-grid-10") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <BlogGrid10 />
        </BlockExample>
      </div>
    </article>
  )
}
