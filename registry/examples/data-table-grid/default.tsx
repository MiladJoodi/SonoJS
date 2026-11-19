"use client"

import {
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
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
} from "@sonojs/ui/components/data-table-grid"
import { useDirection } from "@sonojs/ui/hooks/use-direction"

type Task = {
  id: string
  title: string
  owner: string
  priority: string
}

const data: Task[] = [
  { id: "TASK-1", title: "Fix billing webhook", owner: "Ava", priority: "High" },
  { id: "TASK-2", title: "Ship onboarding email", owner: "Ken", priority: "Med" },
  { id: "TASK-3", title: "Audit SSO claims", owner: "Sara", priority: "High" },
  { id: "TASK-4", title: "Trim unused deps", owner: "Leo", priority: "Low" },
  { id: "TASK-5", title: "Document pin API", owner: "Nina", priority: "Med" },
]

const features = tableFeatures({
  columnPinningFeature,
  columnSizingFeature,
  columnResizingFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

const columnHelper = createColumnHelper<typeof features, Task>()

const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader title="ID" column={column} />
    ),
    size: 110,
    minSize: 88,
  }),
  columnHelper.accessor("title", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Title" column={column} />
    ),
    size: 240,
    minSize: 140,
  }),
  columnHelper.accessor("owner", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Owner" column={column} />
    ),
    size: 120,
    minSize: 90,
  }),
  columnHelper.accessor("priority", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Priority" column={column} />
    ),
    size: 110,
    minSize: 90,
  }),
])

export function DataTableGridDefault() {
  const { dir } = useDirection()
  const table = useTable({
    features,
    data,
    columns,
    columnResizeMode: "onChange",
    columnResizeDirection: dir,
    initialState: {
      columnPinning: { start: ["id"], end: [] },
    },
  })

  return (
    <div className="w-full max-w-3xl">
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
    </div>
  )
}
