import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import DataExport01 from "@/registry/blocks/files-media/data-export/data-export-01/data-export"
import DataExport02 from "@/registry/blocks/files-media/data-export/data-export-02/data-export"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/files-media/data-export",
  "Data Export",
  "Ready-to-use Data Export UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import DataExport from "@/components/blocks/files-media/${name}/data-export"

export default function Page() {
  return <DataExport />
}`

export default function BlockDataExportDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Data Export"
        pathname="/blocks/files-media/data-export"
        description="Full field picker with progress, or a compact Stripe-style export dialog."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="data-export-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("data-export-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <DataExport01 />
        </BlockExample>

        <BlockExample
          name="data-export-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("data-export-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <DataExport02 />
        </BlockExample>
      </div>
    </article>
  )
}
