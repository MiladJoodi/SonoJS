"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import type { SortDir } from "@/components/admin/use-admin-table"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

export function AdminTableFilter({
  id,
  value,
  onChange,
  placeholder = "Filter…",
  label = "Filter",
}: {
  id: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  label?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        dir="ltr"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="cursor-text max-w-md"
      />
    </div>
  )
}

export function AdminSortTh({
  label,
  column,
  sortKey,
  sortDir,
  onSort,
  className,
}: {
  label: string
  column: string
  sortKey: string | null
  sortDir: SortDir
  onSort: (column: string) => void
  className?: string
}) {
  const active = sortKey === column
  return (
    <th className={cn("px-2 py-2 text-start text-xs font-medium", className)}>
      <button
        type="button"
        className={cn(
          "inline-flex cursor-pointer items-center gap-1 text-muted-foreground hover:text-foreground",
          active && "text-foreground"
        )}
        onClick={() => onSort(column)}
      >
        {label}
        <span className="font-mono text-[10px] opacity-70" aria-hidden>
          {active ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
        </span>
      </button>
    </th>
  )
}

export function AdminTablePager({
  page,
  pageCount,
  filteredCount,
  totalCount,
  rowOffset,
  pageSize,
  onPageChange,
}: {
  page: number
  pageCount: number
  filteredCount: number
  totalCount: number
  rowOffset: number
  pageSize: number
  onPageChange: (page: number) => void
}) {
  if (filteredCount === 0) return null

  const from = rowOffset + 1
  const to = Math.min(rowOffset + pageSize, filteredCount)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-sm text-muted-foreground">
      <p dir="ltr">
        {from}–{to} of {filteredCount}
        {filteredCount !== totalCount ? ` (filtered from ${totalCount})` : ""}
      </p>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="cursor-pointer"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="size-4 icon-dir" />
        </Button>
        <span className="min-w-16 px-2 text-center" dir="ltr">
          {page} / {pageCount}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="cursor-pointer"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRightIcon className="size-4 icon-dir" />
        </Button>
      </div>
    </div>
  )
}

export function useAdminSort(
  initialKey: string | null = null,
  initialDir: SortDir = "asc"
) {
  const [sortKey, setSortKey] = React.useState<string | null>(initialKey)
  const [sortDir, setSortDir] = React.useState<SortDir>(initialDir)

  const onSort = React.useCallback((column: string) => {
    setSortKey((prev) => {
      if (prev === column) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"))
        return prev
      }
      setSortDir("asc")
      return column
    })
  }, [])

  return { sortKey, sortDir, onSort }
}
