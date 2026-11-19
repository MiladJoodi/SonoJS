"use client"

import * as React from "react"

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@sonojs/ui/lib/utils"

import {
  getColumnPinStyle,
  pinEdgeShadowClass,
  type PinableColumn,
  type PinTable,
} from "./lib"

export type DataTableGridProps = React.ComponentProps<"div"> & {
  /** Cap vertical height so the header can stick while scrolling. */
  maxHeight?: number | string
}

function DataTableGrid({
  className,
  maxHeight = "min(28rem, 70vh)",
  children,
  style,
  ...props
}: DataTableGridProps) {
  return (
    <div
      data-slot="data-table-grid"
      className={cn(
        "w-full overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-xs",
        className
      )}
      style={style}
      {...props}
    >
      <div
        data-slot="data-table-grid-viewport"
        className="relative w-full overflow-auto overscroll-contain"
        style={{ maxHeight }}
      >
        {children}
      </div>
    </div>
  )
}

export type DataTableGridTableProps = React.ComponentProps<"table"> & {
  /** Prefer `table.getTotalSize()` so resized columns keep layout. */
  totalSize?: number
}

function DataTableGridTable({
  className,
  totalSize,
  style,
  ...props
}: DataTableGridTableProps) {
  return (
    <table
      data-slot="data-table-grid-table"
      className={cn("w-full caption-bottom border-separate border-spacing-0 text-sm", className)}
      style={{
        width: totalSize,
        tableLayout: totalSize != null ? "fixed" : undefined,
        ...style,
      }}
      {...props}
    />
  )
}

function DataTableGridHeader({
  className,
  ...props
}: React.ComponentProps<typeof TableHeader>) {
  return (
    <TableHeader
      data-slot="data-table-grid-header"
      className={cn(
        "sticky top-0 z-30 bg-card [&_tr]:border-b [&_tr]:border-border/70",
        className
      )}
      {...props}
    />
  )
}

export type DataTableGridHeadProps = React.ComponentProps<
  typeof TableHead
> & {
  column: PinableColumn
  table: PinTable
}

function DataTableGridHead({
  column,
  table,
  className,
  style,
  ...props
}: DataTableGridHeadProps) {
  const pinned = column.getIsPinned?.() ?? false
  const pinStyle = getColumnPinStyle(column)
  return (
    <TableHead
      data-slot="data-table-grid-head"
      data-pinned={pinned || undefined}
      className={cn(
        "sticky top-0 z-20 bg-card",
        pinned && "z-30",
        pinEdgeShadowClass(column, table),
        className
      )}
      style={{
        ...pinStyle,
        position: "sticky",
        top: 0,
        ...style,
      }}
      {...props}
    />
  )
}

export type DataTableGridCellProps = React.ComponentProps<
  typeof TableCell
> & {
  column: PinableColumn
  table: PinTable
}

function DataTableGridCell({
  column,
  table,
  className,
  style,
  ...props
}: DataTableGridCellProps) {
  const pinned = column.getIsPinned?.() ?? false
  return (
    <TableCell
      data-slot="data-table-grid-cell"
      data-pinned={pinned || undefined}
      className={cn(
        "bg-card",
        pinned && "z-10",
        pinEdgeShadowClass(column, table),
        className
      )}
      style={{ ...getColumnPinStyle(column), ...style }}
      {...props}
    />
  )
}

export {
  DataTableGrid,
  DataTableGridTable,
  DataTableGridHeader,
  DataTableGridHead,
  DataTableGridCell,
  TableBody as DataTableGridBody,
  TableRow as DataTableGridRow,
}
