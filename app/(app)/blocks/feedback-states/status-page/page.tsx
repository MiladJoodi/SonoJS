import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import StatusPage01 from "@/registry/blocks/feedback-states/status-page/status-page-01/status-page"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/feedback-states/status-page",
  "Status Page",
  "Ready-to-use Status Page UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import StatusPage from "@/components/blocks/feedback-states/${name}/status-page"

export default function Page() {
  return <StatusPage />
}`

export default function BlockStatusPageDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Status Page"
        pathname="/blocks/feedback-states/status-page"
        description="Public infrastructure status with incident banners, service health, and regional uptime."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="status-page-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("status-page-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <StatusPage01 />
        </BlockExample>
      </div>
    </article>
  )
}
