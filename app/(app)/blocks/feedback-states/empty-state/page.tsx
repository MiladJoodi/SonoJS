import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import EmptyState01 from "@/registry/blocks/feedback-states/empty-state/empty-state-01/empty-state"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/feedback-states/empty-state",
  "Empty State",
  "Ready-to-use Empty State UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import EmptyState from "@/components/blocks/feedback-states/${name}/empty-state"

export default function Page() {
  return <EmptyState />
}`

export default function BlockEmptyStateDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Empty State"
        pathname="/blocks/feedback-states/empty-state"
        description="Four empty patterns in one gallery — no results, empty inbox, access restricted, and create-first."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="empty-state-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("empty-state-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <EmptyState01 />
        </BlockExample>
      </div>
    </article>
  )
}
