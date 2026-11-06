"use client"

import * as React from "react"

import { AdminRefreshButton } from "@/components/admin/admin-refresh-button"
import {
  adminTdClass,
  adminThClass,
  formatCents,
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

type PlanRow = {
  id: string
  slug: string
  name: string
  interval: string
  stripeProductId: string | null
  stripePriceId: string | null
  amountCents: number
  currency: string
  active: boolean
}

const filterPlan = (r: PlanRow, q: string) => {
  const hay = [
    r.slug,
    r.name,
    r.interval,
    r.stripePriceId,
    r.active ? "yes" : "no",
    String(r.amountCents),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
  return hay.includes(q)
}

const comparePlan = (a: PlanRow, b: PlanRow, key: string) => {
  switch (key) {
    case "slug":
      return cmpStr(a.slug, b.slug)
    case "name":
      return cmpStr(a.name, b.name)
    case "interval":
      return cmpStr(a.interval, b.interval)
    case "amount":
      return cmpNum(a.amountCents, b.amountCents)
    case "active":
      return cmpNum(a.active ? 1 : 0, b.active ? 1 : 0)
    case "price":
      return cmpStr(a.stripePriceId, b.stripePriceId)
    default:
      return 0
  }
}

export function AdminPlansPanel() {
  const [filter, setFilter] = React.useState("")
  const { sortKey, sortDir, onSort } = useAdminSort("slug")

  const { data: rows, error, loading, refreshing, refresh } = useAdminFetch(
    "/api/admin/plans",
    React.useCallback(
      (url) =>
        adminFetchJson(
          url,
          (json) => (json.plans as PlanRow[] | undefined) ?? [],
          "Could not load plans"
        ),
      []
    )
  )

  const table = useAdminTable({
    rows,
    filter,
    filterFn: filterPlan,
    sortKey,
    sortDir,
    compare: comparePlan,
  })

  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/50 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>Plans</CardTitle>
          <CardDescription>
            Read-only catalog from Neon. Checkout needs a non-null Stripe price
            id.
          </CardDescription>
        </div>
        <AdminRefreshButton onClick={refresh} refreshing={refreshing} />
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <AdminTableFilter
          id="admin-plans-filter"
          value={filter}
          onChange={setFilter}
          placeholder="slug, name, price id…"
        />

        {loading && !rows ? (
          <div className="flex min-h-32 items-center justify-center">
            <Spinner className="size-5 text-muted-foreground" />
          </div>
        ) : error && !rows ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : table.filteredCount === 0 ? (
          <p className="text-sm text-muted-foreground">No plans seeded.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-200 text-start text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className={cn(adminThClass, "w-12")}>#</th>
                    <AdminSortTh
                      label="Slug"
                      column="slug"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Name"
                      column="name"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Interval"
                      column="interval"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Amount"
                      column="amount"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Active"
                      column="active"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Stripe price"
                      column="price"
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
                        className={cn(adminTdClass, "font-mono text-xs")}
                        dir="ltr"
                      >
                        {r.slug}
                      </td>
                      <td className={adminTdClass}>{r.name}</td>
                      <td className={adminTdClass}>{r.interval}</td>
                      <td className={adminTdClass} dir="ltr">
                        {formatCents(r.amountCents, r.currency)}
                      </td>
                      <td className={adminTdClass}>
                        <AdminStatus status={r.active ? "yes" : "no"} />
                      </td>
                      <td
                        className={cn(
                          adminTdClass,
                          "max-w-48 truncate font-mono text-xs text-muted-foreground"
                        )}
                        dir="ltr"
                        title={r.stripePriceId ?? undefined}
                      >
                        {r.stripePriceId || "— missing —"}
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
