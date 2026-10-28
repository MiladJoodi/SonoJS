import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import DataTable01 from "@/registry/blocks/data-tables/data-table/data-table-01/table"
import DataTable02 from "@/registry/blocks/data-tables/data-table/data-table-02/table"
import DataTable03 from "@/registry/blocks/data-tables/data-table/data-table-03/table"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/data-tables/data-table",
  "Data Table",
  "Ready-to-use Data Table UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import DataTable from "@/components/blocks/data-tables/${name}/table"

export default function Page() {
  return <DataTable />
}`

const previewClassName =
  "bg-canvas px-3 py-6 sm:px-6 sm:py-10"

export default function BlockDataTableDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Data Table"
        pathname="/blocks/data-tables/data-table"
        description="Grouped tasks, invoice ledgers with filters, or team access tables with role chips and switches."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="data-table-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("data-table-01"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-5xl">
            <DataTable01 />
          </div>
        </BlockExample>

        <BlockExample
          name="data-table-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("data-table-02"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-5xl">
            <DataTable02 />
          </div>
        </BlockExample>

        <BlockExample
          name="data-table-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("data-table-03"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-5xl">
            <DataTable03 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
