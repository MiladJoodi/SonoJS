"use client"

import * as React from "react"
import Link from "next/link"

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
  cmpStr,
  useAdminTable,
} from "@/components/admin/use-admin-table"
import type { AdminSubscriptionRow } from "@/db/queries/admin-read"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Spinner } from "@sonojs/ui/components/spinner"

const filterSub = (r: AdminSubscriptionRow, q: string) => {
  const hay = [
    r.email,
    r.clerkUserId,
    r.planName,
    r.planSlug,
    r.status,
    r.isManual ? "manual" : "stripe",
    r.stripeSubscriptionId,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
  return hay.includes(q)
}

const compareSub = (
  a: AdminSubscriptionRow,
  b: AdminSubscriptionRow,
  key: string
) => {
  switch (key) {
    case "email":
      return cmpStr(a.email ?? a.clerkUserId, b.email ?? b.clerkUserId)
    case "plan":
      return cmpStr(a.planName || a.planSlug, b.planName || b.planSlug)
    case "status":
      return cmpStr(a.status, b.status)
    case "kind":
      return cmpStr(a.isManual ? "manual" : "stripe", b.isManual ? "manual" : "stripe")
    case "period":
      return cmpDate(a.currentPeriodEnd, b.currentPeriodEnd)
    case "reconciled":
      return cmpDate(a.lastReconciledAt, b.lastReconciledAt)
    default:
      return 0
  }
}

export function AdminSubscriptionsPanel() {
  const [filter, setFilter] = React.useState("")
  const { sortKey, sortDir, onSort } = useAdminSort("period", "desc")

  const { data: rows, error, loading, refreshing, refresh } = useAdminFetch(
    "/api/admin/subscriptions",
    React.useCallback(
      (url) =>
        adminFetchJson(
          url,
          (json) =>
            (json.subscriptions as AdminSubscriptionRow[] | undefined) ?? [],
          "Could not load subscriptions"
        ),
      []
    )
  )

  const table = useAdminTable({
    rows,
    filter,
    filterFn: filterSub,
    sortKey,
    sortDir,
    compare: compareSub,
  })

  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/50 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>
            Recent Neon subscriptions. Filter searches the full list. Manual =
            complimentary `sub_manual_*`.
          </CardDescription>
        </div>
        <AdminRefreshButton onClick={refresh} refreshing={refreshing} />
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <AdminTableFilter
          id="admin-sub-filter"
          value={filter}
          onChange={setFilter}
          placeholder="email, plan, status, manual…"
        />

        {loading && !rows ? (
          <div className="flex min-h-32 items-center justify-center">
            <Spinner className="size-5 text-muted-foreground" />
          </div>
        ) : error && !rows ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : table.filteredCount === 0 ? (
          <p className="text-sm text-muted-foreground">No subscriptions yet.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-220 text-start text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className={cn(adminThClass, "w-12")}>#</th>
                    <AdminSortTh
                      label="Email"
                      column="email"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Plan"
                      column="plan"
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
                      label="Kind"
                      column="kind"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Period end"
                      column="period"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Reconciled"
                      column="reconciled"
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
                      <td className={adminTdClass} dir="ltr">
                        <Link
                          href={`/admin/users/${r.userId}`}
                          className="cursor-pointer underline-offset-4 hover:underline"
                        >
                          {r.email || r.clerkUserId || r.userId}
                        </Link>
                      </td>
                      <td className={adminTdClass}>
                        {r.planName || r.planSlug}
                      </td>
                      <td className={adminTdClass}>
                        <AdminStatus status={r.status} />
                        {r.cancelAtPeriodEnd ? (
                          <span className="ms-1.5 text-xs text-muted-foreground">
                            · cancel at period end
                          </span>
                        ) : null}
                      </td>
                      <td className={adminTdClass}>
                        <AdminStatus
                          status={r.isManual ? "manual" : "stripe"}
                        />
                      </td>
                      <td
                        className={cn(adminTdClass, "text-muted-foreground")}
                        dir="ltr"
                      >
                        {formatDate(r.currentPeriodEnd)}
                      </td>
                      <td
                        className={cn(adminTdClass, "text-muted-foreground")}
                        dir="ltr"
                      >
                        {formatDate(r.lastReconciledAt)}
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
