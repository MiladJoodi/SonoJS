import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import DataTable01 from "@/registry/blocks/data-tables/data-table/data-table-01/table"

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

export default function BlockDataTableDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Data Table"
        pathname="/blocks/data-tables/data-table"
        description="Grouped project tables with assignee stacks and status badges."
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
          previewClassName="bg-white px-3 py-6 sm:px-6 sm:py-10 dark:bg-background"
        >
          <div className="w-full min-w-0 max-w-5xl">
            <DataTable01 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
