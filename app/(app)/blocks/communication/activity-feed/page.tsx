import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ActivityFeed01 from "@/registry/blocks/communication/activity-feed/activity-feed-01/activity-feed"
import ActivityFeed02 from "@/registry/blocks/communication/activity-feed/activity-feed-02/activity-feed"
import ActivityFeed03 from "@/registry/blocks/communication/activity-feed/activity-feed-03/activity-feed"
import ActivityFeed04 from "@/registry/blocks/communication/activity-feed/activity-feed-04/activity-feed"
import ActivityFeed05 from "@/registry/blocks/communication/activity-feed/activity-feed-05/activity-feed"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/communication/activity-feed",
  "Activity Feed",
  "Ready-to-use Activity Feed UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ActivityFeed from "@/components/blocks/communication/${name}/activity-feed"

export default function Page() {
  return <ActivityFeed />
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

export default function BlockActivityFeedDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Activity Feed"
        pathname="/blocks/communication/activity-feed"
        description="Card timeline, rich events, compact rail, day-grouped filters, and live + highlights."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="activity-feed-01"
          usage={[{ title: "app/page.tsx", code: usage("activity-feed-01") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ActivityFeed01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="activity-feed-02"
          usage={[{ title: "app/page.tsx", code: usage("activity-feed-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ActivityFeed02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="activity-feed-03"
          usage={[{ title: "app/page.tsx", code: usage("activity-feed-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ActivityFeed03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="activity-feed-04"
          usage={[{ title: "app/page.tsx", code: usage("activity-feed-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ActivityFeed04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="activity-feed-05"
          usage={[{ title: "app/page.tsx", code: usage("activity-feed-05") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ActivityFeed05 />
        </BlockExample>
      </div>
    </article>
  )
}
