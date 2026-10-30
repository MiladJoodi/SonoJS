import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import TableToolbar01 from "@/registry/blocks/data-tables/table-toolbar/table-toolbar-01/table"
import TableToolbar02 from "@/registry/blocks/data-tables/table-toolbar/table-toolbar-02/table"
import TableToolbar03 from "@/registry/blocks/data-tables/table-toolbar/table-toolbar-03/table"
import TableToolbar04 from "@/registry/blocks/data-tables/table-toolbar/table-toolbar-04/table"
import TableToolbar05 from "@/registry/blocks/data-tables/table-toolbar/table-toolbar-05/table"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/data-tables/table-toolbar",
  "Table Toolbar",
  "Production data-table toolbars for admin, CRM, and enterprise tables. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import DataTableToolbar from "@/components/blocks/data-tables/${name}/table"

export default function Page() {
  return <DataTableToolbar />
}`

const previewClassName = "bg-canvas px-3 py-6 sm:px-6 sm:py-10"

export default function BlockTableToolbarDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Table Toolbar"
        pathname="/blocks/data-tables/table-toolbar"
        description="Five distinct toolbar products — from everyday admin filters to enterprise query builders — each with a working table."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="table-toolbar-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("table-toolbar-01"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-5xl">
            <TableToolbar01 />
          </div>
        </BlockExample>

        <BlockExample
          name="table-toolbar-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("table-toolbar-02"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-5xl">
            <TableToolbar02 />
          </div>
        </BlockExample>

        <BlockExample
          name="table-toolbar-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("table-toolbar-03"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-5xl">
            <TableToolbar03 />
          </div>
        </BlockExample>

        <BlockExample
          name="table-toolbar-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("table-toolbar-04"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-5xl">
            <TableToolbar04 />
          </div>
        </BlockExample>

        <BlockExample
          name="table-toolbar-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("table-toolbar-05"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-5xl">
            <TableToolbar05 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
