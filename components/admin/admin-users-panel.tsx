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
  AdminTableFilter,
  AdminTablePager,
} from "@/components/admin/admin-table-chrome"
import { PlanGrantForm } from "@/components/admin/plan-grant-form"
import {
  adminFetchJson,
  invalidateAdminCache,
} from "@/components/admin/use-admin-fetch"
import type { AdminUserRow } from "@/db/queries/admin-billing"
import type {
  AdminUserSearchFilter,
  AdminUserSearchSort,
} from "@/db/queries/admin-read"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Label } from "@sonojs/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Spinner } from "@sonojs/ui/components/spinner"

const PAGE_SIZE = 25
const SEARCH_DEBOUNCE_MS = 350

type SearchResponse = {
  users: AdminUserRow[]
  total: number
  page: number
  pageSize: number
}

export function AdminUsersPanel() {
  const [qInput, setQInput] = React.useState("")
  const [q, setQ] = React.useState("")
  const [filter, setFilter] = React.useState<AdminUserSearchFilter>("all")
  const [sort, setSort] = React.useState<AdminUserSearchSort>("newest")
  const [page, setPage] = React.useState(1)
  const [selectedClerkId, setSelectedClerkId] = React.useState("")

  const [users, setUsers] = React.useState<AdminUserRow[] | null>(null)
  const [total, setTotal] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const requestIdRef = React.useRef(0)
  const abortRef = React.useRef<AbortController | null>(null)

  React.useEffect(() => {
    const t = window.setTimeout(() => {
      setQ(qInput.trim())
      setPage(1)
    }, SEARCH_DEBOUNCE_MS)
    return () => window.clearTimeout(t)
  }, [qInput])

  const load = React.useCallback(
    async (opts?: { soft?: boolean }) => {
      const soft = Boolean(opts?.soft)
      const reqId = ++requestIdRef.current
      abortRef.current?.abort()
      const ac = new AbortController()
      abortRef.current = ac

      if (soft) setRefreshing(true)
      else setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        q,
        filter,
        sort,
        page: String(page),
        pageSize: String(PAGE_SIZE),
      })

      try {
        const data = await adminFetchJson(
          `/api/admin/users/search?${params}`,
          (json) => {
            const body = json as SearchResponse
            if (!Array.isArray(body.users)) {
              throw new Error("Could not load users")
            }
            return body
          },
          "Could not load users",
          { signal: ac.signal }
        )
        if (reqId !== requestIdRef.current) return
        setUsers(data.users)
        setTotal(data.total)
      } catch (err) {
        if (ac.signal.aborted) return
        if (err instanceof DOMException && err.name === "AbortError") return
        if (reqId !== requestIdRef.current) return
        const message =
          err instanceof Error ? err.message : "Could not load users"
        setError(message)
        if (!soft) setUsers(null)
      } finally {
        if (reqId === requestIdRef.current) {
          setLoading(false)
          setRefreshing(false)
        }
      }
    },
    [q, filter, sort, page]
  )

  React.useEffect(() => {
    void load()
    return () => {
      abortRef.current?.abort()
    }
  }, [load])

  const onGrantSuccess = React.useCallback(() => {
    invalidateAdminCache("/api/admin")
    void load({ soft: true })
  }, [load])

  const onFilterChange = (v: string) => {
    setFilter((v as AdminUserSearchFilter) || "all")
    setPage(1)
  }

  const onSortChange = (v: string) => {
    setSort((v as AdminUserSearchSort) || "newest")
    setPage(1)
  }

  const onSearchChange = (v: string) => {
    setQInput(v)
  }

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const rowOffset = (page - 1) * PAGE_SIZE

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
              Server search, filter, and sort. Click a row to fill the grant
              form, or open detail.
            </CardDescription>
          </div>
          <AdminRefreshButton
            onClick={() => void load({ soft: true })}
            refreshing={refreshing}
          />
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="min-w-0 flex-1">
              <AdminTableFilter
                id="admin-user-search"
                label="Search"
                value={qInput}
                onChange={onSearchChange}
                placeholder="email, clerk id, neon id…"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="admin-user-filter">Filter</Label>
                <Select value={filter} onValueChange={onFilterChange}>
                  <SelectTrigger
                    id="admin-user-filter"
                    className="cursor-pointer w-44"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="active">Active / trialing</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-user-sort">Sort</Label>
                <Select value={sort} onValueChange={onSortChange}>
                  <SelectTrigger
                    id="admin-user-sort"
                    className="cursor-pointer w-44"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="email_asc">Email A–Z</SelectItem>
                    <SelectItem value="email_desc">Email Z–A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {loading && !users ? (
            <div className="flex min-h-32 items-center justify-center">
              <Spinner className="size-5 text-muted-foreground" />
            </div>
          ) : error && !users ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : !users || users.length === 0 ? (
            <p className="text-sm text-muted-foreground">No users found.</p>
          ) : (
            <>
              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : null}
              <div className="overflow-x-auto">
                <table className="w-full min-w-200 text-start text-sm">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className={cn(adminThClass, "w-12")}>#</th>
                      <th className={adminThClass}>Email</th>
                      <th className={adminThClass}>Clerk id</th>
                      <th className={adminThClass}>Plan</th>
                      <th className={adminThClass}>Status</th>
                      <th className={adminThClass}>Downloads</th>
                      <th className={adminThClass}>Expires</th>
                      <th className={adminThClass}>Sub</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr
                        key={u.id}
                        className="cursor-pointer border-b border-border/40 hover:bg-muted/40"
                        onClick={() => setSelectedClerkId(u.clerkUserId)}
                      >
                        <td
                          className={cn(
                            adminTdClass,
                            "w-12 text-muted-foreground tabular-nums"
                          )}
                          dir="ltr"
                        >
                          {rowOffset + i + 1}
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
                          className={cn(
                            adminTdClass,
                            "tabular-nums text-muted-foreground"
                          )}
                          dir="ltr"
                        >
                          {u.downloadsCount ?? 0}
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
                page={page}
                pageCount={pageCount}
                filteredCount={total}
                totalCount={total}
                rowOffset={rowOffset}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
