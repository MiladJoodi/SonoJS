"use client"

import * as React from "react"
import Link from "next/link"

import { AdminRefreshButton } from "@/components/admin/admin-refresh-button"
import {
  adminTdClass,
  adminThClass,
  formatCount,
  formatDate,
} from "@/components/admin/admin-format"
import { AdminStatus } from "@/components/admin/admin-status"
import {
  AdminTableFilter,
  AdminTablePager,
} from "@/components/admin/admin-table-chrome"
import { adminFetchJson } from "@/components/admin/use-admin-fetch"
import type {
  AdminDownloadSearchSort,
  AdminDownloadSearchSource,
  AdminMarketplaceDownloadRow,
  TopMarketplaceDownloadRow,
} from "@/db/queries/marketplace-downloads"
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
  downloads: AdminMarketplaceDownloadRow[]
  total: number
  page: number
  pageSize: number
  top?: TopMarketplaceDownloadRow[]
}

export function AdminDownloadsPanel() {
  const [qInput, setQInput] = React.useState("")
  const [q, setQ] = React.useState("")
  const [source, setSource] = React.useState<AdminDownloadSearchSource>("all")
  const [sort, setSort] = React.useState<AdminDownloadSearchSort>("newest")
  const [page, setPage] = React.useState(1)

  const [downloads, setDownloads] = React.useState<
    AdminMarketplaceDownloadRow[] | null
  >(null)
  const [top, setTop] = React.useState<TopMarketplaceDownloadRow[]>([])
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
        source,
        sort,
        page: String(page),
        pageSize: String(PAGE_SIZE),
      })

      try {
        const data = await adminFetchJson(
          `/api/admin/downloads?${params}`,
          (json) => {
            const body = json as SearchResponse
            if (!Array.isArray(body.downloads)) {
              throw new Error("Could not load downloads")
            }
            return body
          },
          "Could not load downloads",
          { signal: ac.signal }
        )
        if (reqId !== requestIdRef.current) return
        setDownloads(data.downloads)
        setTotal(data.total)
        if (Array.isArray(data.top)) setTop(data.top)
      } catch (err) {
        if (ac.signal.aborted) return
        if (err instanceof DOMException && err.name === "AbortError") return
        if (reqId !== requestIdRef.current) return
        const message =
          err instanceof Error ? err.message : "Could not load downloads"
        setError(message)
        if (!soft) setDownloads(null)
      } finally {
        if (reqId === requestIdRef.current) {
          setLoading(false)
          setRefreshing(false)
        }
      }
    },
    [q, source, sort, page]
  )

  React.useEffect(() => {
    void load()
    return () => {
      abortRef.current?.abort()
    }
  }, [load])

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const rowOffset = (page - 1) * PAGE_SIZE

  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/50 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>Template downloads</CardTitle>
          <CardDescription>
            Who downloaded what — search by email, clerk id, product name, or
            slug.
          </CardDescription>
        </div>
        <AdminRefreshButton
          onClick={() => void load({ soft: true })}
          refreshing={refreshing}
        />
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {top.length > 0 ? (
          <div className="rounded-[12px] border border-border/60 bg-muted/20 px-3 py-3 sm:px-4">
            <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              Top products · last 30 days
            </p>
            <ol className="mt-2 divide-y divide-border/50">
              {top.map((item, i) => (
                <li
                  key={item.slug}
                  className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-baseline gap-2">
                    <span
                      className="w-5 shrink-0 text-xs tabular-nums text-muted-foreground"
                      dir="ltr"
                    >
                      {i + 1}.
                    </span>
                    <Link
                      href={`/templates/${item.slug}`}
                      className="min-w-0 cursor-pointer truncate text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {item.title}
                      {item.title !== item.slug ? (
                        <span className="text-muted-foreground">
                          {" "}
                          · {item.slug}
                        </span>
                      ) : null}
                    </Link>
                  </div>
                  <span
                    className="shrink-0 text-sm font-medium tabular-nums text-foreground"
                    dir="ltr"
                  >
                    {formatCount(item.downloads)}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="min-w-0 flex-1">
            <AdminTableFilter
              id="admin-download-search"
              label="Search"
              value={qInput}
              onChange={setQInput}
              placeholder="email, clerk id, product, slug…"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="admin-download-source">Source</Label>
              <Select
                value={source}
                onValueChange={(v) => {
                  setSource((v as AdminDownloadSearchSource) || "all")
                  setPage(1)
                }}
              >
                <SelectTrigger
                  id="admin-download-source"
                  className="cursor-pointer w-44"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All sources</SelectItem>
                  <SelectItem value="zip">Zip</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-download-sort">Sort</Label>
              <Select
                value={sort}
                onValueChange={(v) => {
                  setSort((v as AdminDownloadSearchSort) || "newest")
                  setPage(1)
                }}
              >
                <SelectTrigger
                  id="admin-download-sort"
                  className="cursor-pointer w-44"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="email_asc">Email A–Z</SelectItem>
                  <SelectItem value="email_desc">Email Z–A</SelectItem>
                  <SelectItem value="slug_asc">Slug A–Z</SelectItem>
                  <SelectItem value="slug_desc">Slug Z–A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {loading && !downloads ? (
          <div className="flex min-h-32 items-center justify-center">
            <Spinner className="size-5 text-muted-foreground" />
          </div>
        ) : error && !downloads ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : !downloads || downloads.length === 0 ? (
          <p className="text-sm text-muted-foreground">No downloads found.</p>
        ) : (
          <>
            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}
            <div className="overflow-x-auto">
              <table className="w-full min-w-220 text-start text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className={cn(adminThClass, "w-12")}>#</th>
                    <th className={adminThClass}>When</th>
                    <th className={adminThClass}>Email</th>
                    <th className={adminThClass}>Product</th>
                    <th className={adminThClass}>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {downloads.map((d, i) => (
                    <tr key={d.id} className="border-b border-border/40">
                      <td
                        className={cn(
                          adminTdClass,
                          "w-12 text-muted-foreground tabular-nums"
                        )}
                        dir="ltr"
                      >
                        {rowOffset + i + 1}
                      </td>
                      <td
                        className={cn(adminTdClass, "text-muted-foreground")}
                        dir="ltr"
                      >
                        {formatDate(d.createdAt)}
                      </td>
                      <td className={adminTdClass} dir="ltr">
                        <Link
                          href={`/admin/users/${d.userId}`}
                          className="cursor-pointer underline-offset-4 hover:underline"
                        >
                          {d.email || d.clerkUserId || "—"}
                        </Link>
                      </td>
                      <td className={adminTdClass}>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <Link
                            href={`/templates/${d.slug}`}
                            className="cursor-pointer truncate underline-offset-4 hover:underline"
                          >
                            {d.title}
                          </Link>
                          {d.title !== d.slug ? (
                            <span
                              className="truncate font-mono text-xs text-muted-foreground"
                              dir="ltr"
                            >
                              {d.slug}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className={adminTdClass}>
                        <AdminStatus status={d.source} />
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
  )
}
