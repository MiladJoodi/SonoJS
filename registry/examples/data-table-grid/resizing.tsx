"use client"

import {
  columnResizingFeature,
  columnSizingFeature,
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"

import {
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

type Metric = {
  label: string
  users: number
  sessions: number
  revenue: number
}

const data: Metric[] = [
  { label: "Organic", users: 1240, sessions: 3102, revenue: 18200 },
  { label: "Paid", users: 860, sessions: 1944, revenue: 24100 },
  { label: "Referral", users: 420, sessions: 988, revenue: 7600 },
  { label: "Email", users: 310, sessions: 702, revenue: 5400 },
]

const features = tableFeatures({
  columnSizingFeature,
  columnResizingFeature,
})

const columnHelper = createColumnHelper<typeof features, Metric>()

const columns = columnHelper.columns([
  columnHelper.accessor("label", {
    header: "Channel",
    size: 140,
    minSize: 100,
  }),
  columnHelper.accessor("users", {
    header: () => <div className="text-end">Users</div>,
    cell: ({ row }) => (
      <div className="text-end tabular-nums">{row.getValue("users")}</div>
    ),
    size: 110,
    minSize: 80,
  }),
  columnHelper.accessor("sessions", {
    header: () => <div className="text-end">Sessions</div>,
    cell: ({ row }) => (
      <div className="text-end tabular-nums">{row.getValue("sessions")}</div>
    ),
    size: 120,
    minSize: 80,
  }),
  columnHelper.accessor("revenue", {
    header: () => <div className="text-end">Revenue</div>,
    cell: ({ row }) => (
      <div className="text-end font-medium tabular-nums">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(Number(row.getValue("revenue")))}
      </div>
    ),
    size: 120,
    minSize: 90,
  }),
])

export function DataTableGridResizing() {
  const { dir } = useDirection()
  const table = useTable({
    features,
    data,
    columns,
    columnResizeMode: "onChange",
    columnResizeDirection: dir,
  })

  return (
    <div className="w-full max-w-2xl space-y-2">
      <p className="text-xs text-muted-foreground">
        Drag the column edge handles - sizing uses{" "}
        <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
          {"columnResizeMode=\"onChange\""}
        </code>
        .
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
