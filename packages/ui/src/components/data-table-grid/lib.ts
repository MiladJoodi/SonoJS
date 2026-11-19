import type * as React from "react"

export type ColumnPinningPosition = false | "start" | "end"

export type PinableColumn = {
  id: string
  getIsPinned?: () => ColumnPinningPosition
  getStart?: (position?: ColumnPinningPosition | "center") => number
  getAfter?: (position?: ColumnPinningPosition | "center") => number
  getSize: () => number
}

export type PinTable = {
  getStartVisibleLeafColumns?: () => Array<{ id: string }>
  getEndVisibleLeafColumns?: () => Array<{ id: string }>
}

/** Sticky offsets for a pinned column (logical start/end). */
export function getColumnPinStyle(
  column: PinableColumn
): React.CSSProperties {
  const pinned = column.getIsPinned?.() ?? false
  if (!pinned) {
    return { width: column.getSize() }
  }

  const style: React.CSSProperties = {
    position: "sticky",
    width: column.getSize(),
    zIndex: 1,
  }

  if (pinned === "start") {
    style.insetInlineStart = column.getStart?.("start") ?? 0
  } else {
    style.insetInlineEnd = column.getAfter?.("end") ?? 0
  }

  return style
}

/** True when this column is the edge against the scrollable center. */
export function isPinEdgeColumn(
  column: PinableColumn,
  table: PinTable
): boolean {
  const pinned = column.getIsPinned?.() ?? false
  if (!pinned) return false
  const leaves =
    pinned === "start"
      ? (table.getStartVisibleLeafColumns?.() ?? [])
      : (table.getEndVisibleLeafColumns?.() ?? [])
  if (leaves.length === 0) return false
  if (pinned === "start") {
    return leaves[leaves.length - 1]?.id === column.id
  }
  return leaves[0]?.id === column.id
}

export function pinEdgeShadowClass(
  column: PinableColumn,
  table: PinTable
): string | undefined {
  if (!isPinEdgeColumn(column, table)) return undefined
  const pinned = column.getIsPinned?.() ?? false
  if (pinned === "start") {
    return "shadow-[4px_0_8px_-4px_rgba(0,0,0,0.14)] dark:shadow-[4px_0_8px_-4px_rgba(0,0,0,0.45)]"
  }
  if (pinned === "end") {
    return "shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.14)] dark:shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.45)]"
  }
  return undefined
}
