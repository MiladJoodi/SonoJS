import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import EmptyState01 from "@/registry/blocks/feedback-states/empty-state/empty-state-01/empty-state"
import EmptyState02 from "@/registry/blocks/feedback-states/empty-state/empty-state-02/empty-state"
import EmptyState03 from "@/registry/blocks/feedback-states/empty-state/empty-state-03/empty-state"
import EmptyState04 from "@/registry/blocks/feedback-states/empty-state/empty-state-04/empty-state"
import EmptyState05 from "@/registry/blocks/feedback-states/empty-state/empty-state-05/empty-state"
import EmptyState06 from "@/registry/blocks/feedback-states/empty-state/empty-state-06/empty-state"
import EmptyState07 from "@/registry/blocks/feedback-states/empty-state/empty-state-07/empty-state"
import EmptyState08 from "@/registry/blocks/feedback-states/empty-state/empty-state-08/empty-state"
import EmptyState09 from "@/registry/blocks/feedback-states/empty-state/empty-state-09/empty-state"

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

const EXAMPLES = [
  { name: "empty-state-01", Component: EmptyState01 },
  { name: "empty-state-02", Component: EmptyState02 },
  { name: "empty-state-03", Component: EmptyState03 },
  { name: "empty-state-04", Component: EmptyState04 },
  { name: "empty-state-05", Component: EmptyState05 },
  { name: "empty-state-06", Component: EmptyState06 },
  { name: "empty-state-07", Component: EmptyState07 },
  { name: "empty-state-08", Component: EmptyState08 },
  { name: "empty-state-09", Component: EmptyState09 },
] as const

export default function BlockEmptyStateDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Empty State"
        pathname="/blocks/feedback-states/empty-state"
        description="Product-ready empties — search, inbox, projects, tables, team, files, charts, notifications, and first-run setup."
      />

      <div className="flex flex-col gap-8">
        {EXAMPLES.map(({ name, Component }) => (
          <BlockExample
            key={name}
            name={name}
            usage={[
              {
                title: "app/page.tsx",
                code: usage(name),
              },
            ]}
            previewAlign="start"
            previewClassName="bg-canvas p-0"
          >
            <Component />
          </BlockExample>
        ))}
      </div>
    </article>
  )
}
