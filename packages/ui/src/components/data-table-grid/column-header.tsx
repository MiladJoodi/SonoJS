"use client"

import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  PinIcon,
  PinOffIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { cn } from "@sonojs/ui/lib/utils"

import type { ColumnPinningPosition } from "./lib"

export type SortableColumn = {
  getCanSort?: () => boolean
  getIsSorted?: () => false | "asc" | "desc"
  getToggleSortingHandler?: () =>
    | ((event: unknown) => void)
    | undefined
}

export type PinColumn = {
  getCanPin?: () => boolean
  getIsPinned?: () => ColumnPinningPosition
  pin?: (position: ColumnPinningPosition) => void
}

export type DataTableColumnHeaderProps = {
  title: string
  column: SortableColumn & PinColumn
  className?: string
  /** Hide the pin menu (sort-only header). */
  disablePinning?: boolean
}

function DataTableColumnHeader({
  title,
  column,
  className,
  disablePinning = false,
}: DataTableColumnHeaderProps) {
  const sorted = column.getIsSorted?.() ?? false
  const canSort = Boolean(column.getCanSort?.())
  const canPin =
    !disablePinning &&
    Boolean(column.getCanPin?.()) &&
    typeof column.pin === "function"
  const pinned = column.getIsPinned?.() ?? false

  if (!canSort && !canPin) {
    return (
      <span className={cn("text-sm font-medium", className)}>{title}</span>
    )
  }

  return (
    <div
      data-slot="data-table-column-header"
      className={cn("flex items-center gap-1", className)}
    >
      {canSort ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="-ms-2 h-8 gap-1.5 px-2 font-medium"
          onClick={column.getToggleSortingHandler?.()}
        >
          <span className="truncate">{title}</span>
          {sorted === "asc" ? (
            <ArrowUpIcon className="size-3.5 opacity-70" aria-hidden />
          ) : sorted === "desc" ? (
            <ArrowDownIcon className="size-3.5 opacity-70" aria-hidden />
          ) : (
            <ArrowUpDownIcon className="size-3.5 opacity-50" aria-hidden />
          )}
        </Button>
      ) : (
        <span className="truncate px-1 text-sm font-medium">{title}</span>
      )}

      {canPin ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="size-8 shrink-0 text-muted-foreground"
              aria-label={`Pin ${title}`}
            >
              {pinned ? (
                <PinIcon className="size-3.5" aria-hidden />
              ) : (
                <PinOffIcon className="size-3.5 opacity-60" aria-hidden />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-40">
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={pinned === "start"}
              onSelect={() => column.pin?.("start")}
            >
              Pin start
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={pinned === "end"}
              onSelect={() => column.pin?.("end")}
            >
              Pin end
            </DropdownMenuItem>
            {pinned ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => column.pin?.(false)}
                >
                  Unpin
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  )
}

export { DataTableColumnHeader }
