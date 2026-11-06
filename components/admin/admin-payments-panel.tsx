"use client"

import * as React from "react"
import Link from "next/link"

import { AdminRefreshButton } from "@/components/admin/admin-refresh-button"
import {
  adminTdClass,
  adminThClass,
  formatCents,
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
import type { AdminPaymentRow } from "@/db/queries/admin-read"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Spinner } from "@sonojs/ui/components/spinner"

const filterPay = (r: AdminPaymentRow, q: string) => {
  const hay = [
    r.email,
    r.clerkUserId,
    r.status,
    r.stripeInvoiceId,
    r.currency,
    String(r.amountCents),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
  return hay.includes(q)
}

const comparePay = (a: AdminPaymentRow, b: AdminPaymentRow, key: string) => {
  switch (key) {
    case "when":
      return cmpDate(a.createdAt, b.createdAt)
    case "email":
      return cmpStr(a.email ?? a.clerkUserId, b.email ?? b.clerkUserId)
    case "amount":
      return cmpNum(a.amountCents, b.amountCents)
    case "status":
      return cmpStr(a.status, b.status)
    case "invoice":
      return cmpStr(a.stripeInvoiceId, b.stripeInvoiceId)
    default:
      return 0
  }
}

export function AdminPaymentsPanel() {
  const [filter, setFilter] = React.useState("")
  const { sortKey, sortDir, onSort } = useAdminSort("when", "desc")

  const { data: rows, error, loading, refreshing, refresh } = useAdminFetch(
    "/api/admin/payments",
    React.useCallback(
      (url) =>
        adminFetchJson(
          url,
          (json) => (json.payments as AdminPaymentRow[] | undefined) ?? [],
          "Could not load payments"
        ),
      []
    )
  )

  const table = useAdminTable({
    rows,
    filter,
    filterFn: filterPay,
    sortKey,
    sortDir,
    compare: comparePay,
  })

  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/50 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>Payments</CardTitle>
          <CardDescription>
            Recent rows from Neon `payments`. Filter searches the full list.
          </CardDescription>
        </div>
        <AdminRefreshButton onClick={refresh} refreshing={refreshing} />
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <AdminTableFilter
          id="admin-pay-filter"
          value={filter}
          onChange={setFilter}
          placeholder="email, status, invoice…"
        />

        {loading && !rows ? (
          <div className="flex min-h-32 items-center justify-center">
            <Spinner className="size-5 text-muted-foreground" />
          </div>
        ) : error && !rows ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : table.filteredCount === 0 ? (
          <p className="text-sm text-muted-foreground">No payments yet.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-200 text-start text-sm">
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
                      label="Email"
                      column="email"
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
                      label="Status"
                      column="status"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Invoice"
                      column="invoice"
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
                      <td className={adminTdClass} dir="ltr">
                        {r.userId ? (
                          <Link
                            href={`/admin/users/${r.userId}`}
                            className="cursor-pointer underline-offset-4 hover:underline"
                          >
                            {r.email || r.clerkUserId || r.userId}
                          </Link>
                        ) : (
                          r.email || "—"
                        )}
                      </td>
                      <td className={adminTdClass} dir="ltr">
                        {formatCents(r.amountCents, r.currency)}
                      </td>
                      <td className={adminTdClass}>
                        <AdminStatus status={r.status} />
                      </td>
                      <td
                        className={cn(
                          adminTdClass,
                          "max-w-40 truncate font-mono text-xs"
                        )}
                        dir="ltr"
                      >
                        {r.stripeInvoiceId || "—"}
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
