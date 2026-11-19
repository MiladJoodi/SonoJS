"use client"

import * as React from "react"
import {
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  createColumnHelper,
  tableFeatures,
  useTable,
  type ColumnPinningState,
  type ColumnSizingState,
} from "@tanstack/react-table"

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
import { useDirection } from "@sonojs/ui/hooks/use-direction"

type Row = {
  sku: string
  product: string
  stock: number
  warehouse: string
}

const data: Row[] = [
  { sku: "SKU-01", product: "Canvas tote", stock: 42, warehouse: "East" },
  { sku: "SKU-02", product: "Desk lamp", stock: 18, warehouse: "West" },
  { sku: "SKU-03", product: "USB hub", stock: 96, warehouse: "East" },
  { sku: "SKU-04", product: "Notebook set", stock: 61, warehouse: "Central" },
]

const features = tableFeatures({
  columnPinningFeature,
  columnSizingFeature,
  columnResizingFeature,
})

const columnHelper = createColumnHelper<typeof features, Row>()

const columns = columnHelper.columns([
  columnHelper.accessor("sku", {
    header: ({ column }) => (
      <DataTableColumnHeader title="SKU" column={column} />
    ),
    size: 110,
    minSize: 88,
  }),
  columnHelper.accessor("product", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Product" column={column} />
    ),
    size: 180,
    minSize: 120,
  }),
  columnHelper.accessor("stock", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Stock" column={column} />
    ),
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("stock")}</span>
    ),
    size: 100,
    minSize: 80,
  }),
  columnHelper.accessor("warehouse", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Warehouse" column={column} />
    ),
    size: 130,
    minSize: 100,
  }),
])

const defaultPinning: ColumnPinningState = { start: ["sku"], end: [] }

export function DataTableGridControlled() {
  const { dir } = useDirection()
  const [columnPinning, setColumnPinning] =
    React.useState<ColumnPinningState>(defaultPinning)
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({})

  const table = useTable({
    features,
    data,
    columns,
    columnResizeMode: "onChange",
    columnResizeDirection: dir,
    state: { columnPinning, columnSizing },
    onColumnPinningChange: setColumnPinning,
    onColumnSizingChange: setColumnSizing,
  })

  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setColumnPinning({ start: [], end: [] })}
        >
          Clear pins
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setColumnPinning(defaultPinning)
            setColumnSizing({})
          }}
        >
          Reset layout
        </Button>
        <p className="text-xs text-muted-foreground">
          Pins: {columnPinning.start.join(", ") || "none"}
          {columnPinning.end.length
            ? ` · end ${columnPinning.end.join(", ")}`
            : ""}
        </p>
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
