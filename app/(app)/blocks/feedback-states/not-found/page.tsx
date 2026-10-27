import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import NotFound01 from "@/registry/blocks/feedback-states/not-found/not-found-01/not-found"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/feedback-states/not-found",
  "Not Found",
  "Ready-to-use Not Found UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import NotFound from "@/components/blocks/feedback-states/${name}/not-found"

export default function Page() {
  return <NotFound />
}`

export default function BlockNotFoundDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Not Found"
        pathname="/blocks/feedback-states/not-found"
        description="404 with search, suggested destinations, and navigation actions."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="not-found-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("not-found-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <NotFound01 />
        </BlockExample>
      </div>
    </article>
  )
}
