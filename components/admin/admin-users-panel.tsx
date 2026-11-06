"use client"

import * as React from "react"
import Link from "next/link"

import { AdminRefreshButton } from "@/components/admin/admin-refresh-button"
import {
  adminTdClass,
  adminThClass,
  formatDateOnly,
  isManualSubId,
} from "@/components/admin/admin-format"
import { AdminStatus } from "@/components/admin/admin-status"
import {
  AdminSortTh,
  AdminTableFilter,
  AdminTablePager,
  useAdminSort,
} from "@/components/admin/admin-table-chrome"
import { PlanGrantForm } from "@/components/admin/plan-grant-form"
import {
  adminFetchJson,
  invalidateAdminCache,
  useAdminFetch,
} from "@/components/admin/use-admin-fetch"
import {
  cmpDate,
  cmpStr,
  useAdminTable,
} from "@/components/admin/use-admin-table"
import type { AdminUserRow } from "@/db/queries/admin-billing"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Spinner } from "@sonojs/ui/components/spinner"

const filterUser = (u: AdminUserRow, q: string) => {
  const hay = [
    u.email,
    u.clerkUserId,
    u.planName,
    u.planSlug,
    u.plan,
    u.status,
    u.stripeSubscriptionId,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
  return hay.includes(q)
}

const compareUser = (a: AdminUserRow, b: AdminUserRow, key: string) => {
  switch (key) {
    case "email":
      return cmpStr(a.email, b.email)
    case "clerk":
      return cmpStr(a.clerkUserId, b.clerkUserId)
    case "plan":
      return cmpStr(
        a.plan === "pro" ? a.planName || a.planSlug || "Pro" : "Free",
        b.plan === "pro" ? b.planName || b.planSlug || "Pro" : "Free"
      )
    case "status":
      return cmpStr(a.status, b.status)
    case "expires":
      return cmpDate(a.currentPeriodEnd, b.currentPeriodEnd)
    case "sub":
      return cmpStr(
        isManualSubId(a.stripeSubscriptionId)
          ? "manual"
          : a.stripeSubscriptionId
            ? "stripe"
            : "",
        isManualSubId(b.stripeSubscriptionId)
          ? "manual"
          : b.stripeSubscriptionId
            ? "stripe"
            : ""
      )
    default:
      return 0
  }
}

export function AdminUsersPanel() {
  const [filter, setFilter] = React.useState("")
  const [selectedClerkId, setSelectedClerkId] = React.useState("")
  const { sortKey, sortDir, onSort } = useAdminSort("email")

  const { data: users, error, loading, refreshing, refresh } = useAdminFetch(
    "/api/admin/users",
    React.useCallback(
      (fetchUrl) =>
        adminFetchJson(
          fetchUrl,
          (json) => (json.users as AdminUserRow[] | undefined) ?? [],
          "Could not load users"
        ),
      []
    )
  )

  const table = useAdminTable({
    rows: users,
    filter,
    filterFn: filterUser,
    sortKey,
    sortDir,
    compare: compareUser,
  })

  const onGrantSuccess = React.useCallback(() => {
    invalidateAdminCache("/api/admin")
    refresh()
  }, [refresh])

  return (
    <div className="flex flex-col gap-6">
      <PlanGrantForm
        initialClerkUserId={selectedClerkId}
        onSuccess={onGrantSuccess}
      />

      <Card className="border-border/60 shadow-none">
        <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/50 space-y-0">
          <div className="space-y-1.5">
            <CardTitle>Users in Neon</CardTitle>
            <CardDescription>
              Search filters the full list (not just the current page). Click a
              row to fill the grant form, or open detail.
            </CardDescription>
          </div>
          <AdminRefreshButton onClick={refresh} refreshing={refreshing} />
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <AdminTableFilter
            id="admin-user-search"
            label="Search"
            value={filter}
            onChange={setFilter}
            placeholder="email, clerk id, plan, status…"
          />

          {loading && !users ? (
            <div className="flex min-h-32 items-center justify-center">
              <Spinner className="size-5 text-muted-foreground" />
            </div>
          ) : error && !users ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : table.filteredCount === 0 ? (
            <p className="text-sm text-muted-foreground">No users found.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-200 text-start text-sm">
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
                        label="Clerk id"
                        column="clerk"
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
                        label="Expires"
                        column="expires"
                        sortKey={sortKey}
                        sortDir={sortDir}
                        onSort={onSort}
                      />
                      <AdminSortTh
                        label="Sub"
                        column="sub"
                        sortKey={sortKey}
                        sortDir={sortDir}
                        onSort={onSort}
                      />
                    </tr>
                  </thead>
                  <tbody>
                    {table.pageRows.map((u, i) => (
                      <tr
                        key={u.id}
                        className={cn(
                          "cursor-pointer border-b border-border/40 hover:bg-muted/40"
                        )}
                        onClick={() => setSelectedClerkId(u.clerkUserId)}
                      >
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
                            href={`/admin/users/${u.id}`}
                            className="cursor-pointer underline-offset-4 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {u.email || "—"}
                          </Link>
                        </td>
                        <td
                          className={cn(
                            adminTdClass,
                            "max-w-48 truncate font-mono text-xs"
                          )}
                          dir="ltr"
                          title={u.clerkUserId}
                        >
                          {u.clerkUserId}
                        </td>
                        <td className={adminTdClass}>
                          {u.plan === "pro"
                            ? u.planName || u.planSlug || "Pro"
                            : "Free"}
                        </td>
                        <td className={adminTdClass}>
                          <AdminStatus status={u.status} />
                        </td>
                        <td
                          className={cn(adminTdClass, "text-muted-foreground")}
                          dir="ltr"
                        >
                          {formatDateOnly(u.currentPeriodEnd)}
                        </td>
                        <td className={adminTdClass} dir="ltr">
                          {isManualSubId(u.stripeSubscriptionId) ? (
                            <AdminStatus status="manual" />
                          ) : u.stripeSubscriptionId ? (
                            <AdminStatus status="stripe" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
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
    </div>
  )
}
