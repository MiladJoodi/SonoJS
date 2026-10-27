import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Blog01 from "@/registry/blocks/marketing/blog/blog-01/blog"
import Blog02 from "@/registry/blocks/marketing/blog/blog-02/blog"
import Blog03 from "@/registry/blocks/marketing/blog/blog-03/blog"
import Blog04 from "@/registry/blocks/marketing/blog/blog-04/blog"
import Blog05 from "@/registry/blocks/marketing/blog/blog-05/blog"
import Blog06 from "@/registry/blocks/marketing/blog/blog-06/blog"
import Blog07 from "@/registry/blocks/marketing/blog/blog-07/blog"
import Blog08 from "@/registry/blocks/marketing/blog/blog-08/blog"
import Blog09 from "@/registry/blocks/marketing/blog/blog-09/blog"
import Blog10 from "@/registry/blocks/marketing/blog/blog-10/blog"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/marketing/blog", "Blog", "Ready-to-use Blog UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) => `import Blog from "@/components/blocks/marketing/${name}/blog"

export default function Page() {
  return <Blog />
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

export default function BlockBlogDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Blog"
        pathname="/blocks/marketing/blog"
        description="Article grids and post cards — covers, titles, and short excerpts."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="blog-01"
          usage={[{ title: "app/page.tsx", code: usage("blog-01") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 pt-10 pb-12 md:px-8 md:pt-12 md:pb-14"
        >
          <Blog01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-02"
          usage={[{ title: "app/page.tsx", code: usage("blog-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 pt-10 pb-12 md:px-8 md:pt-12 md:pb-14"
        >
          <Blog02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-03"
          usage={[{ title: "app/page.tsx", code: usage("blog-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 pt-10 pb-12 md:px-8 md:pt-12 md:pb-14"
        >
          <Blog03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-04"
          usage={[{ title: "app/page.tsx", code: usage("blog-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 pt-10 pb-12 md:px-8 md:pt-12 md:pb-14"
        >
          <Blog04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-05"
          usage={[{ title: "app/page.tsx", code: usage("blog-05") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 pt-10 pb-12 md:px-8 md:pt-12 md:pb-14"
        >
          <Blog05 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-06"
          usage={[{ title: "app/page.tsx", code: usage("blog-06") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 pt-10 pb-12 md:px-8 md:pt-12 md:pb-14"
        >
          <Blog06 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-07"
          usage={[{ title: "app/page.tsx", code: usage("blog-07") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 pt-10 pb-12 md:px-8 md:pt-12 md:pb-14"
        >
          <Blog07 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-08"
          usage={[{ title: "app/page.tsx", code: usage("blog-08") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 pt-10 pb-12 md:px-8 md:pt-12 md:pb-14"
        >
          <Blog08 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-09"
          usage={[{ title: "app/page.tsx", code: usage("blog-09") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 pt-10 pb-12 md:px-8 md:pt-12 md:pb-14"
        >
          <Blog09 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="blog-10"
          usage={[{ title: "app/page.tsx", code: usage("blog-10") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 pt-10 pb-12 md:px-8 md:pt-12 md:pb-14"
        >
          <Blog10 />
        </BlockExample>
      </div>
    </article>
  )
}
