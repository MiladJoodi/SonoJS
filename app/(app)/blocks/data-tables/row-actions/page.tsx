import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import RowActions01 from "@/registry/blocks/data-tables/row-actions/row-actions-01/table"

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

export default function BlockRowActionsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Row Actions"
        pathname="/blocks/data-tables/row-actions"
        description="Task tables with per-row start, pause, complete, delete, and view actions."
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
          previewClassName="bg-white px-3 py-6 sm:px-6 sm:py-10 dark:bg-background"
        >
          <div className="w-full min-w-0 max-w-6xl">
            <RowActions01 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
