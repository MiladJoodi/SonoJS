"use client"

import {
  columnPinningFeature,
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
} from "@sonojs/ui/components/data-table-grid"

type Row = {
  id: string
  name: string
  role: string
  team: string
  location: string
}

const data: Row[] = [
  { id: "u1", name: "Ava Chen", role: "Design", team: "Product", location: "SF" },
  { id: "u2", name: "Ken Ortiz", role: "Eng", team: "Platform", location: "NYC" },
  { id: "u3", name: "Sara Ali", role: "Eng", team: "Growth", location: "Remote" },
  { id: "u4", name: "Leo Park", role: "Support", team: "CX", location: "Austin" },
  { id: "u5", name: "Nina Ross", role: "PM", team: "Product", location: "London" },
]

const features = tableFeatures({
  columnPinningFeature,
  columnSizingFeature,
})

const columnHelper = createColumnHelper<typeof features, Row>()

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Name" column={column} />
    ),
    size: 160,
  }),
  columnHelper.accessor("role", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Role" column={column} />
    ),
    size: 120,
  }),
  columnHelper.accessor("team", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Team" column={column} />
    ),
    size: 140,
  }),
  columnHelper.accessor("location", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Location" column={column} />
    ),
    size: 120,
  }),
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader title="ID" column={column} />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.getValue("id")}
      </span>
    ),
    size: 80,
  }),
])

export function DataTableGridPinning() {
  const table = useTable({
    features,
    data,
    columns,
    initialState: {
      columnPinning: { start: ["name"], end: ["id"] },
    },
  })

  return (
    <div className="w-full max-w-3xl space-y-2">
      <p className="text-xs text-muted-foreground">
        Name is pinned to start, ID to end. Use the pin menu on any header to
        move columns.
      </p>
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
                      <table.FlexRender header={header} />
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
