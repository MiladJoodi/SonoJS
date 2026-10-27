import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AdvancedDataGrid01 from "@/registry/blocks/data-tables/advanced-data-grid/advanced-data-grid-01/table"
import AdvancedDataGrid02 from "@/registry/blocks/data-tables/advanced-data-grid/advanced-data-grid-02/table"
import AdvancedDataGrid03 from "@/registry/blocks/data-tables/advanced-data-grid/advanced-data-grid-03/table"
import AdvancedDataGrid04 from "@/registry/blocks/data-tables/advanced-data-grid/advanced-data-grid-04/table"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/data-tables/advanced-data-grid", "Advanced Data Grid", "Ready-to-use Advanced Data Grid UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) =>
  `import AdvancedDataGrid from "@/components/blocks/data-tables/${name}/table"

export default function Page() {
  return <AdvancedDataGrid />
}`

export default function BlockAdvancedDataGridDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Advanced Data Grid"
        pathname="/blocks/data-tables/advanced-data-grid"
        description="Production data grids — fleet inventory, team directory, file vault, and billing ledger."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="advanced-data-grid-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-data-grid-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AdvancedDataGrid01 />
        </BlockExample>

        <BlockExample
          name="advanced-data-grid-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-data-grid-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AdvancedDataGrid02 />
        </BlockExample>

        <BlockExample
          name="advanced-data-grid-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-data-grid-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AdvancedDataGrid03 />
        </BlockExample>

        <BlockExample
          name="advanced-data-grid-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-data-grid-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AdvancedDataGrid04 />
        </BlockExample>
      </div>
    </article>
  )
}
