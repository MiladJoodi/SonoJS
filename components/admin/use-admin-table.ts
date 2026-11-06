"use client"

import * as React from "react"

export type SortDir = "asc" | "desc"

export function useAdminTable<T>({
  rows,
  pageSize = 20,
  filter,
  filterFn,
  sortKey,
  sortDir,
  compare,
}: {
  rows: T[] | null | undefined
  pageSize?: number
  filter: string
  filterFn: (row: T, q: string) => boolean
  sortKey: string | null
  sortDir: SortDir
  compare: (a: T, b: T, key: string) => number
}) {
  const filtered = React.useMemo(() => {
    const list = rows ?? []
    const q = filter.trim().toLowerCase()
    if (!q) return list
    return list.filter((row) => filterFn(row, q))
  }, [rows, filter, filterFn])

  const sorted = React.useMemo(() => {
    if (!sortKey) return filtered
    const copy = [...filtered]
    copy.sort((a, b) => {
      const n = compare(a, b, sortKey)
      return sortDir === "asc" ? n : -n
    })
    return copy
  }, [filtered, sortKey, sortDir, compare])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    setPage(1)
  }, [filter, sortKey, sortDir, pageSize, rows])

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount)
  }, [page, pageCount])

  const pageRows = React.useMemo(() => {
    const start = (page - 1) * pageSize
    return sorted.slice(start, start + pageSize)
  }, [sorted, page, pageSize])

  const rowOffset = (page - 1) * pageSize

  return {
    filteredCount: filtered.length,
    totalCount: rows?.length ?? 0,
    page,
    setPage,
    pageCount,
    pageRows,
    rowOffset,
    pageSize,
  }
}

export function cmpStr(a: string | null | undefined, b: string | null | undefined) {
  return (a ?? "").localeCompare(b ?? "", undefined, { sensitivity: "base" })
}

export function cmpNum(a: number | null | undefined, b: number | null | undefined) {
  return (a ?? 0) - (b ?? 0)
}

export function cmpDate(a: string | null | undefined, b: string | null | undefined) {
  const ta = a ? Date.parse(a) : 0
  const tb = b ? Date.parse(b) : 0
  return (Number.isNaN(ta) ? 0 : ta) - (Number.isNaN(tb) ? 0 : tb)
}
