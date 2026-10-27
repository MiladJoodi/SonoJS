import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Maintenance01 from "@/registry/blocks/feedback-states/maintenance/maintenance-01/maintenance"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/feedback-states/maintenance",
  "Maintenance",
  "Ready-to-use Maintenance UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import Maintenance from "@/components/blocks/feedback-states/${name}/maintenance"

export default function Page() {
  return <Maintenance />
}`

export default function BlockMaintenanceDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Maintenance"
        pathname="/blocks/feedback-states/maintenance"
        description="Scheduled upgrade page with phase rail, ETA, systems board, and notify bar."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="maintenance-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("maintenance-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Maintenance01 />
        </BlockExample>
      </div>
    </article>
  )
}
