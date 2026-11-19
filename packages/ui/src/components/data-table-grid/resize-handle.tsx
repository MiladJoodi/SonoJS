"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

export type ResizeHeader = {
  getResizeHandler: (context?: Document) => (event: unknown) => void
  column: {
    getCanResize: () => boolean
    getIsResizing: () => boolean
  }
}

export type DataTableResizeHandleProps = {
  header: ResizeHeader
  className?: string
}

function DataTableResizeHandle({
  header,
  className,
}: DataTableResizeHandleProps) {
  if (!header.column.getCanResize()) return null

  const resizing = header.column.getIsResizing()

  return (
    <span
      data-slot="data-table-resize-handle"
      data-resizing={resizing ? "" : undefined}
      role="separator"
      aria-orientation="vertical"
      aria-hidden
      className={cn(
        "absolute inset-y-0 end-0 z-30 w-1 cursor-col-resize touch-none select-none",
        "after:absolute after:inset-y-1 after:end-0 after:w-px after:bg-border/80",
        "hover:after:bg-primary/50 data-[resizing]:after:bg-primary",
        className
      )}
      onDoubleClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      onMouseDown={header.getResizeHandler() as React.MouseEventHandler}
      onTouchStart={header.getResizeHandler() as React.TouchEventHandler}
    />
  )
}

export { DataTableResizeHandle }
