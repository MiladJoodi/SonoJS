import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Comments01 from "@/registry/blocks/communication/comments/comments-01/comments"
import Comments02 from "@/registry/blocks/communication/comments/comments-02/comments"
import Comments03 from "@/registry/blocks/communication/comments/comments-03/comments"
import Comments04 from "@/registry/blocks/communication/comments/comments-04/comments"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/communication/comments",
  "Comments",
  "Ready-to-use Comments UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import Comments from "@/components/blocks/communication/${name}/comments"

export default function Page() {
  return <Comments />
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

export default function BlockCommentsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Comments"
        pathname="/blocks/communication/comments"
        description="Nested discussion, sorted card feed, review resolve thread, and mentions with reactions."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="comments-01"
          usage={[{ title: "app/page.tsx", code: usage("comments-01") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Comments01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="comments-02"
          usage={[{ title: "app/page.tsx", code: usage("comments-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Comments02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="comments-03"
          usage={[{ title: "app/page.tsx", code: usage("comments-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Comments03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="comments-04"
          usage={[{ title: "app/page.tsx", code: usage("comments-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Comments04 />
        </BlockExample>
      </div>
    </article>
  )
}
