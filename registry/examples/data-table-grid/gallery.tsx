"use client"

import * as React from "react"
import {
  columnFilteringFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import { TableIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
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
import { Badge } from "@sonojs/ui/components/badge"
import { Input } from "@sonojs/ui/components/input"
import { useDirection } from "@sonojs/ui/hooks/use-direction"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  customer: string
}

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
    customer: "Malik",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
    customer: "Ava",
  },
  {
    id: "a1b2c3d4",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
    customer: "Ken",
  },
  {
    id: "b2c3d4e5",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
    customer: "Abe",
  },
  {
    id: "c3d4e5f6",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
    customer: "Monserrat",
  },
  {
    id: "d4e5f6a7",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
    customer: "Silas",
  },
  {
    id: "e5f6a7b8",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
    customer: "Carmella",
  },
  {
    id: "f6a7b8c9",
    amount: 450,
    status: "pending",
    email: "sara@example.com",
    customer: "Sara",
  },
  {
    id: "a7b8c9d0",
    amount: 199,
    status: "success",
    email: "leo@example.com",
    customer: "Leo",
  },
  {
    id: "b8c9d0e1",
    amount: 560,
    status: "processing",
    email: "nina@example.com",
    customer: "Nina",
  },
  {
    id: "c9d0e1f2",
    amount: 88,
    status: "failed",
    email: "omar@example.com",
    customer: "Omar",
  },
  {
    id: "d0e1f2a3",
    amount: 1020,
    status: "success",
    email: "priya@example.com",
    customer: "Priya",
  },
]

const features = tableFeatures({
  columnPinningFeature,
  columnSizingFeature,
  columnResizingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

const columnHelper = createColumnHelper<typeof features, Payment>()

const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader title="ID" column={column} />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.getValue("id")}
      </span>
    ),
    size: 120,
    minSize: 88,
    enableGlobalFilter: false,
  }),
  columnHelper.accessor("customer", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Customer" column={column} />
    ),
    size: 140,
    minSize: 100,
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
    size: 220,
    minSize: 140,
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Status" column={column} />
    ),
    cell: ({ row }) => {
      const status = String(row.getValue("status"))
      return (
        <Badge variant="secondary" className="font-normal capitalize">
          {status}
        </Badge>
      )
    },
    size: 130,
    minSize: 100,
  }),
  columnHelper.accessor("amount", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Amount" column={column} />
    ),
    cell: ({ row }) => {
      const amount = Number(row.getValue("amount"))
      return (
        <div className="text-end font-medium tabular-nums">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)}
        </div>
      )
    },
    size: 120,
    minSize: 96,
  }),
])

export function DataTableGridGallery() {
  const { dir } = useDirection()
  const table = useTable({
    features,
    data,
    columns,
    columnResizeMode: "onChange",
    columnResizeDirection: dir,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 6 },
      columnPinning: { start: ["id"], end: [] },
    },
  })

  const rows = table.getRowModel().rows

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex items-start gap-3 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <TableIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Payments grid
          </h3>
          <p className="text-xs text-muted-foreground">
            Sort headers, pin columns, drag edges to resize, and filter the
            whole table.
          </p>
        </div>
        <Badge variant="secondary" className="shrink-0 font-normal">
          {table.getFilteredRowModel().rows.length} rows
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search…"
          value={(table.state.globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-xs"
        />
      </div>

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
            {rows.length ? (
              rows.map((row) => (
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
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No results.
                </td>
              </DataTableGridRow>
            )}
          </DataTableGridBody>
        </DataTableGridTable>
      </DataTableGrid>

      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
