"use client"

import * as React from "react"

import { AdminRefreshButton } from "@/components/admin/admin-refresh-button"
import {
  adminTdClass,
  adminThClass,
  formatDate,
} from "@/components/admin/admin-format"
import { AdminStatus } from "@/components/admin/admin-status"
import {
  AdminSortTh,
  AdminTableFilter,
  AdminTablePager,
  useAdminSort,
} from "@/components/admin/admin-table-chrome"
import {
  adminFetchJson,
  useAdminFetch,
} from "@/components/admin/use-admin-fetch"
import {
  cmpDate,
  cmpNum,
  cmpStr,
  useAdminTable,
} from "@/components/admin/use-admin-table"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Spinner } from "@sonojs/ui/components/spinner"

type EventRow = {
  id: string
  stripeEventId: string
  type: string
  status: string
  attemptCount: number
  lastError: string | null
  processedAt: string | null
  createdAt: string
}

const filterEvent = (r: EventRow, q: string) => {
  const hay = [r.type, r.status, r.stripeEventId, r.lastError, String(r.attemptCount)]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
  return hay.includes(q)
}

const compareEvent = (a: EventRow, b: EventRow, key: string) => {
  switch (key) {
    case "when":
      return cmpDate(a.createdAt, b.createdAt)
    case "type":
      return cmpStr(a.type, b.type)
    case "status":
      return cmpStr(a.status, b.status)
    case "attempts":
      return cmpNum(a.attemptCount, b.attemptCount)
    case "error":
      return cmpStr(a.lastError, b.lastError)
    default:
      return 0
  }
}

export function AdminStripePanel() {
  const [filter, setFilter] = React.useState("")
  const { sortKey, sortDir, onSort } = useAdminSort("when", "desc")

  const { data: rows, error, loading, refreshing, refresh } = useAdminFetch(
    "/api/admin/stripe-events",
    React.useCallback(
      (url) =>
        adminFetchJson(
          url,
          (json) => (json.events as EventRow[] | undefined) ?? [],
          "Could not load events"
        ),
      []
    )
  )

  const table = useAdminTable({
    rows,
    filter,
    filterFn: filterEvent,
    sortKey,
    sortDir,
    compare: compareEvent,
  })

  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/50 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>Stripe health</CardTitle>
          <CardDescription>
            Recent webhook event log. Filter searches the full list. Replay
            stays on CLI (`npm run stripe:reprocess`).
          </CardDescription>
        </div>
        <AdminRefreshButton onClick={refresh} refreshing={refreshing} />
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <AdminTableFilter
          id="admin-stripe-filter"
          value={filter}
          onChange={setFilter}
          placeholder="type, status, error…"
        />

        {loading && !rows ? (
          <div className="flex min-h-32 items-center justify-center">
            <Spinner className="size-5 text-muted-foreground" />
          </div>
        ) : error && !rows ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : table.filteredCount === 0 ? (
          <p className="text-sm text-muted-foreground">No webhook events yet.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-220 text-start text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className={cn(adminThClass, "w-12")}>#</th>
                    <AdminSortTh
                      label="When"
                      column="when"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Type"
                      column="type"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Status"
                      column="status"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Attempts"
                      column="attempts"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Error"
                      column="error"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                  </tr>
                </thead>
                <tbody>
                  {table.pageRows.map((r, i) => (
                    <tr key={r.id} className="border-b border-border/40">
                      <td
                        className={cn(
                          adminTdClass,
                          "w-12 text-muted-foreground tabular-nums"
                        )}
                        dir="ltr"
                      >
                        {table.rowOffset + i + 1}
                      </td>
                      <td
                        className={cn(adminTdClass, "text-muted-foreground")}
                        dir="ltr"
                      >
                        {formatDate(r.createdAt)}
                      </td>
                      <td
                        className={cn(adminTdClass, "font-mono text-xs")}
                        dir="ltr"
                      >
                        {r.type}
                      </td>
                      <td className={adminTdClass}>
                        <AdminStatus status={r.status} />
                      </td>
                      <td className={adminTdClass} dir="ltr">
                        {r.attemptCount}
                      </td>
                      <td
                        className={cn(
                          adminTdClass,
                          "max-w-72 truncate text-xs text-muted-foreground"
                        )}
                        title={r.lastError ?? undefined}
                      >
                        {r.lastError || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AdminTablePager
              page={table.page}
              pageCount={table.pageCount}
              filteredCount={table.filteredCount}
              totalCount={table.totalCount}
              rowOffset={table.rowOffset}
              pageSize={table.pageSize}
              onPageChange={table.setPage}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
