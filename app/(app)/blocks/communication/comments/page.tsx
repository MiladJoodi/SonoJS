import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Comments01 from "@/registry/blocks/communication/comments/comments-01/comments"

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

export default function BlockCommentsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Comments"
        pathname="/blocks/communication/comments"
        description="Discussion thread with composer, nested replies, likes, and load-more."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="comments-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("comments-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Comments01 />
        </BlockExample>
      </div>
    </article>
  )
}
