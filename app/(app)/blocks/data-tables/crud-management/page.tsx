import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import CrudManagement01 from "@/registry/blocks/data-tables/crud-management/crud-management-01/table"
import CrudManagement02 from "@/registry/blocks/data-tables/crud-management/crud-management-02/table"
import CrudManagement03 from "@/registry/blocks/data-tables/crud-management/crud-management-03/table"
import CrudManagement04 from "@/registry/blocks/data-tables/crud-management/crud-management-04/table"
import CrudManagement05 from "@/registry/blocks/data-tables/crud-management/crud-management-05/table"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/data-tables/crud-management",
  "CRUD Management",
  "Production CRUD workspaces for users, products, orders, content, and support. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import CrudManagement from "@/components/blocks/data-tables/${name}/table"

export default function Page() {
  return <CrudManagement />
}`

const previewClassName = "bg-canvas px-3 py-6 sm:px-6 sm:py-10"

export default function BlockCrudManagementDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="CRUD Management"
        pathname="/blocks/data-tables/crud-management"
        description="Five focused CRUD demos — users, products, orders, content, and support tickets."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="crud-management-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("crud-management-01"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-6xl">
            <CrudManagement01 />
          </div>
        </BlockExample>

        <BlockExample
          name="crud-management-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("crud-management-02"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-6xl">
            <CrudManagement02 />
          </div>
        </BlockExample>

        <BlockExample
          name="crud-management-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("crud-management-03"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-6xl">
            <CrudManagement03 />
          </div>
        </BlockExample>

        <BlockExample
          name="crud-management-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("crud-management-04"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-6xl">
            <CrudManagement04 />
          </div>
        </BlockExample>

        <BlockExample
          name="crud-management-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("crud-management-05"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <div className="mx-auto w-full min-w-0 max-w-6xl">
            <CrudManagement05 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
