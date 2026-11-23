import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
  DocsRelated,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata(
  "data-table-grid",
  "Data Table Grid"
)

const exampleDefs = [
  {
    name: "data-table-grid-gallery",
    title: "Gallery",
    description:
      "Filter, sort, pin, resize, and paginate in one grid - pin menus on headers, drag edges to resize.",
    requires: ["table", "button", "dropdown-menu", "badge", "input"],
    npmRequires: ["@tanstack/react-table@^9.3.1", "lucide-react"],
  },
  {
    name: "data-table-grid-default",
    title: "Basic",
    description: "Pinned ID column with resize handles and sortable headers.",
    requires: ["table", "button", "dropdown-menu"],
    npmRequires: ["@tanstack/react-table@^9.3.1", "lucide-react"],
  },
  {
    name: "data-table-grid-pinning",
    title: "Pinning",
    description: "Pin start and end with sticky cells and edge shadows.",
    requires: ["table", "button", "dropdown-menu"],
    npmRequires: ["@tanstack/react-table@^9.3.1", "lucide-react"],
  },
  {
    name: "data-table-grid-resizing",
    title: "Resizing",
    description: "Drag column edges with `columnResizeMode=\"onChange\"`.",
    requires: ["table"],
    npmRequires: ["@tanstack/react-table@^9.3.1"],
  },
  {
    name: "data-table-grid-filtering",
    title: "Filtering",
    description: "Global search over a pinned grid via `setGlobalFilter`.",
    requires: ["table", "button", "dropdown-menu", "input"],
    npmRequires: ["@tanstack/react-table@^9.3.1", "lucide-react"],
  },
  {
    name: "data-table-grid-controlled",
    title: "Controlled",
    description: "External Clear pins / Reset layout for pinning and sizing state.",
    requires: ["table", "button", "dropdown-menu"],
    npmRequires: ["@tanstack/react-table@^9.3.1", "lucide-react"],
  },
]

const usageSource = `import {
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"

import {
  DataTableColumnHeader,
  DataTableGrid,
  DataTableGridBody,
  DataTableGridCell,
  DataTableGridHead,
  DataTableGridHeader,
  DataTableGridRow,
  DataTableGridTable,
  DataTableResizeHandle,
} from "@/components/data-table-grid"

const features = tableFeatures({
  columnPinningFeature,
  columnSizingFeature,
  columnResizingFeature,
})

const columnHelper = createColumnHelper<typeof features, { id: string; name: string }>()

const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader title="ID" column={column} />
    ),
    size: 100,
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Name" column={column} />
    ),
    size: 180,
  }),
])

export function Example({ data }: { data: { id: string; name: string }[] }) {
  const table = useTable({
    features,
    data,
    columns,
    columnResizeMode: "onChange",
    initialState: { columnPinning: { start: ["id"], end: [] } },
  })

  return (
    <DataTableGrid>
      <DataTableGridTable totalSize={table.getTotalSize()}>
        <DataTableGridHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <DataTableGridRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <DataTableGridHead
                  key={header.id}
                  column={header.column}
                  table={table}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <table.FlexRender header={header} />
                      <DataTableResizeHandle header={header} />
                    </>
                  )}
                </DataTableGridHead>
              ))}
            </DataTableGridRow>
          ))}
        </DataTableGridHeader>
        <DataTableGridBody>
          {table.getRowModel().rows.map((row) => (
            <DataTableGridRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <DataTableGridCell
                  key={cell.id}
                  column={cell.column}
                  table={table}
                >
                  <table.FlexRender cell={cell} />
                </DataTableGridCell>
              ))}
            </DataTableGridRow>
          ))}
        </DataTableGridBody>
      </DataTableGridTable>
    </DataTableGrid>
  )
}`

export default async function DataTableGridDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Data Table Grid"
        pathname="/docs/components/data-table-grid"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Advanced grid chrome for TanStack Table v9 - sticky pinned columns,
            resize handles, and sort/pin headers. Pair with the basic{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              Data Table
            </code>{" "}
            docs when you only need sort, filter, and pagination.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="canvas"
          previewClassName="items-start !min-h-0 py-6 sm:py-8"
        />
      </section>

      <DocsInstallation name="data-table-grid" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="data-table-grid.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "DataTableGrid maxHeight",
              type: "number | string",
              defaultValue: '"min(28rem, 70vh)"',
              description: "Viewport max height so sticky headers can scroll.",
            },
            {
              name: "DataTableGridTable totalSize",
              type: "number",
              defaultValue: "-",
              description: "Pass `table.getTotalSize()` for fixed layout + resize.",
            },
            {
              name: "DataTableGridHead / Cell column + table",
              type: "PinableColumn + PinTable",
              defaultValue: "-",
              description: "Applies sticky pin offsets and edge shadows.",
            },
            {
              name: "DataTableColumnHeader title + column",
              type: "string + column",
              defaultValue: "-",
              description: "Sort toggle and pin start/end/unpin menu.",
            },
            {
              name: "DataTableResizeHandle header",
              type: "Header",
              defaultValue: "-",
              description: "Column edge handle via `header.getResizeHandler()`.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/data-table",
            title: "Data Table",
            description: "basic sort, filter, and pagination examples",
          },
          {
            href: "/docs/components/table",
            title: "Table",
            description: "table chrome primitives",
          },
          {
            href: "/docs/components/dropdown-menu",
            title: "Dropdown Menu",
            description: "pin menu on column headers",
          },
        ]}
      />
    </article>
  )
}
