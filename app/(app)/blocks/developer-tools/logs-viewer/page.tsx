import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import LogsViewer01 from "@/registry/blocks/developer-tools/logs-viewer/logs-viewer-01/logs-viewer"
import LogsViewer02 from "@/registry/blocks/developer-tools/logs-viewer/logs-viewer-02/logs-viewer"
import LogsViewer03 from "@/registry/blocks/developer-tools/logs-viewer/logs-viewer-03/logs-viewer"

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

export default function BlockLogsViewerDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Logs Viewer"
        pathname="/blocks/developer-tools/logs-viewer"
        description="Live stream console, entry inspector with stack traces, and compact terminal tail."
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

        <ExampleRule />

        <BlockExample
          name="logs-viewer-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("logs-viewer-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <LogsViewer02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="logs-viewer-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("logs-viewer-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <LogsViewer03 />
        </BlockExample>
      </div>
    </article>
  )
}
