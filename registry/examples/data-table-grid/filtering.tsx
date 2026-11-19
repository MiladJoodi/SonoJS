"use client"

import {
  columnFilteringFeature,
  columnPinningFeature,
  columnSizingFeature,
  createColumnHelper,
  createFilteredRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
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
} from "@sonojs/ui/components/data-table-grid"
import { Input } from "@sonojs/ui/components/input"

type Contact = {
  name: string
  email: string
  company: string
}

const data: Contact[] = [
  { name: "Ava Chen", email: "ava@acme.com", company: "Acme" },
  { name: "Ken Ortiz", email: "ken@north.io", company: "North" },
  { name: "Sara Ali", email: "sara@bloom.co", company: "Bloom" },
  { name: "Leo Park", email: "leo@acme.com", company: "Acme" },
  { name: "Nina Ross", email: "nina@orbit.dev", company: "Orbit" },
  { name: "Omar Said", email: "omar@bloom.co", company: "Bloom" },
]

const features = tableFeatures({
  columnPinningFeature,
  columnSizingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

const columnHelper = createColumnHelper<typeof features, Contact>()

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Name" column={column} />
    ),
    size: 150,
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Email" column={column} />
    ),
    cell: ({ row }) => (
      <div dir="ltr" className="text-left">
        {String(row.getValue("email"))}
      </div>
    ),
    size: 200,
  }),
  columnHelper.accessor("company", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Company" column={column} />
    ),
    size: 140,
  }),
])

export function DataTableGridFiltering() {
  const table = useTable({
    features,
    data,
    columns,
    initialState: {
      columnPinning: { start: ["name"], end: [] },
    },
  })

  return (
    <div className="w-full max-w-2xl space-y-3">
      <Input
        placeholder="Filter contacts…"
        value={(table.state.globalFilter as string) ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className="max-w-sm"
      />
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
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
              ))
            ) : (
              <DataTableGridRow>
                <td
                  colSpan={columns.length}
                  className="h-20 text-center text-sm text-muted-foreground"
                >
                  No contacts match.
                </td>
              </DataTableGridRow>
            )}
          </DataTableGridBody>
        </DataTableGridTable>
      </DataTableGrid>
    </div>
  )
}
