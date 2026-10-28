import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import DataExport01 from "@/registry/blocks/files-media/data-export/data-export-01/data-export"
import DataExport02 from "@/registry/blocks/files-media/data-export/data-export-02/data-export"
import DataExport03 from "@/registry/blocks/files-media/data-export/data-export-03/data-export"
import DataExport04 from "@/registry/blocks/files-media/data-export/data-export-04/data-export"

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

export default function BlockDataExportDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Data Export"
        pathname="/blocks/files-media/data-export"
        description="Full field picker, compact export card, scheduled email delivery, and export history — four production export flows."
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
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <DataExport01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="data-export-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("data-export-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <DataExport02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="data-export-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("data-export-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <DataExport03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="data-export-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("data-export-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <DataExport04 />
        </BlockExample>
      </div>
    </article>
  )
}
