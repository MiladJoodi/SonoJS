import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import LogsViewer01 from "@/registry/blocks/developer-tools/logs-viewer/logs-viewer-01/logs-viewer"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/developer-tools/logs-viewer",
  "Logs Viewer",
  "Ready-to-use Logs Viewer UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import LogsViewer from "@/components/blocks/developer-tools/${name}/logs-viewer"

export default function Page() {
  return <LogsViewer />
}`

export default function BlockLogsViewerDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Logs Viewer"
        pathname="/blocks/developer-tools/logs-viewer"
        description="Streamable application logs with level filters, service select, search, and auto-scroll."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="logs-viewer-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("logs-viewer-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <LogsViewer01 />
        </BlockExample>
      </div>
    </article>
  )
}
