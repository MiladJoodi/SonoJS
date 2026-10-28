import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import RowActions01 from "@/registry/blocks/data-tables/row-actions/row-actions-01/table"
import RowActions02 from "@/registry/blocks/data-tables/row-actions/row-actions-02/table"
import RowActions03 from "@/registry/blocks/data-tables/row-actions/row-actions-03/table"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/data-tables/row-actions",
  "Row Actions",
  "Ready-to-use Row Actions UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import RowActions from "@/components/blocks/data-tables/${name}/table"

export default function Page() {
  return <RowActions />
}`

const previewClassName = "bg-canvas px-3 py-6 sm:px-6 sm:py-10"

export default function BlockRowActionsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Row Actions"
        pathname="/blocks/data-tables/row-actions"
        description="Muted icon rows for tasks, invoices, and content — tooltips, hover reveal, and overflow menus."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="row-actions-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("row-actions-01"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-6xl">
            <RowActions01 />
          </div>
        </BlockExample>

        <BlockExample
          name="row-actions-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("row-actions-02"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-6xl">
            <RowActions02 />
          </div>
        </BlockExample>

        <BlockExample
          name="row-actions-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("row-actions-03"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-6xl">
            <RowActions03 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
