"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRightIcon, ShieldIcon } from "lucide-react"

import {
  AdminSortTh,
  AdminTableFilter,
  AdminTablePager,
  useAdminSort,
} from "@/components/admin/admin-table-chrome"
import {
  cmpStr,
  useAdminTable,
} from "@/components/admin/use-admin-table"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Spinner } from "@sonojs/ui/components/spinner"

type AccessTier = "public" | "member" | "pro"
type GateId = AccessTier | "buy"

type RegistryRow = {
  kind: "registry"
  name: string
  title: string
  type: string
  surface: string
  access: AccessTier
  accessLabel: string
  href: string | null
  registryUrl: string
}

type CatalogRow = {
  kind: "template" | "website"
  slug: string
  title: string
  category: string
  access: AccessTier
  accessLabel: string
  priceCents: number
  priceLabel: string
  paid: boolean
  gate: GateId
  gateLabel: string
  href: string
  liveUrl: string | null
}

type AccessIndex = {
  generatedAt: string
  summary: {
    registry: {
      total: number
      byAccess: Record<string, number>
      bySurface: Record<string, number>
    }
    templates: {
      total: number
      free: number
      paid: number
      byAccess: Record<string, number>
      byGate?: Record<string, number>
      byCategory?: Record<string, number>
    }
    websites: {
      total: number
      free: number
      paid: number
      byAccess: Record<string, number>
      byGate?: Record<string, number>
      byCategory?: Record<string, number>
    }
  }
  registry: RegistryRow[]
  catalog: CatalogRow[]
}

type TabId = "registry" | "templates" | "websites"

const GATE_CHIP: Record<GateId, string> = {
  public: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  member: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  pro: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  buy: "bg-amber-500/15 text-amber-800 dark:text-amber-300",
}

const GATE_SHORT: Record<GateId, string> = {
  public: "Everyone",
  member: "Sign-in",
  pro: "Pro",
  buy: "Buy",
}

function GateChip({ gate }: { gate: GateId }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 text-xs font-medium tabular-nums",
        GATE_CHIP[gate]
      )}
    >
      {GATE_SHORT[gate]}
    </span>
  )
}

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function matchesGate(
  gateFilter: "all" | GateId,
  row: { access?: AccessTier; gate?: GateId }
) {
  if (gateFilter === "all") return true
  if ("gate" in row && row.gate) return row.gate === gateFilter
  return row.access === gateFilter
}

export function AdminAccessPanel() {
  const [data, setData] = React.useState<AccessIndex | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [tab, setTab] = React.useState<TabId>("registry")
  const [filter, setFilter] = React.useState("")
  const [gateFilter, setGateFilter] = React.useState<"all" | GateId>("all")
  const [surfaceFilter, setSurfaceFilter] = React.useState("all")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const { sortKey, sortDir, onSort } = useAdminSort(
    tab === "registry" ? "name" : "slug"
  )

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/admin/access-index.json", {
        cache: "no-store",
      })
      if (!res.ok) {
        throw new Error(
          res.status === 404
            ? "Index missing. Run npm run registry:build"
            : `Failed to load (${res.status})`
        )
      }
      const json = (await res.json()) as AccessIndex
      setData(json)
    } catch (e) {
      setData(null)
      setError(e instanceof Error ? e.message : "Failed to load")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void load()
  }, [load])

  const registrySurfaces = React.useMemo(() => {
    if (!data) return []
    return Object.keys(data.summary.registry.bySurface).sort()
  }, [data])

  const catalogCategories = React.useMemo(() => {
    if (!data) return []
    const source =
      tab === "templates"
        ? data.summary.templates.byCategory
        : tab === "websites"
          ? data.summary.websites.byCategory
          : null
    if (!source) return []
    return Object.keys(source).sort()
  }, [data, tab])

  const registryRows = React.useMemo(() => {
    if (!data) return []
    return data.registry.filter((row) => {
      if (!matchesGate(gateFilter, row)) return false
      if (surfaceFilter !== "all" && row.surface !== surfaceFilter) return false
      return true
    })
  }, [data, gateFilter, surfaceFilter])

  const templateRows = React.useMemo(() => {
    if (!data) return []
    return data.catalog.filter((row) => {
      if (row.kind !== "template") return false
      if (!matchesGate(gateFilter, row)) return false
      if (categoryFilter !== "all" && row.category !== categoryFilter) {
        return false
      }
      return true
    })
  }, [data, gateFilter, categoryFilter])

  const websiteRows = React.useMemo(() => {
    if (!data) return []
    return data.catalog.filter((row) => {
      if (row.kind !== "website") return false
      if (!matchesGate(gateFilter, row)) return false
      if (categoryFilter !== "all" && row.category !== categoryFilter) {
        return false
      }
      return true
    })
  }, [data, gateFilter, categoryFilter])

  const activeRows =
    tab === "registry"
      ? registryRows
      : tab === "templates"
        ? templateRows
        : websiteRows

  const filterFn = React.useCallback(
    (row: RegistryRow | CatalogRow, q: string) => {
      if ("name" in row) {
        return [row.name, row.title, row.surface, row.type, row.accessLabel]
          .join(" ")
          .toLowerCase()
          .includes(q)
      }
      return [
        row.slug,
        row.title,
        row.category,
        row.gateLabel,
        row.priceLabel,
        row.accessLabel,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    },
    []
  )

  const compare = React.useCallback(
    (a: RegistryRow | CatalogRow, b: RegistryRow | CatalogRow, key: string) => {
      if ("name" in a && "name" in b) {
        if (key === "name") return cmpStr(a.name, b.name)
        if (key === "surface") return cmpStr(a.surface, b.surface)
        if (key === "access") return cmpStr(a.access, b.access)
        if (key === "title") return cmpStr(a.title, b.title)
      }
      if ("slug" in a && "slug" in b) {
        if (key === "slug") return cmpStr(a.slug, b.slug)
        if (key === "title") return cmpStr(a.title, b.title)
        if (key === "category") return cmpStr(a.category, b.category)
        if (key === "gate") return cmpStr(a.gate, b.gate)
        if (key === "price") return (a.priceCents || 0) - (b.priceCents || 0)
      }
      return 0
    },
    []
  )

  const table = useAdminTable({
    rows: activeRows as Array<RegistryRow | CatalogRow>,
    pageSize: 40,
    filter,
    filterFn,
    sortKey,
    sortDir,
    compare,
  })

  function switchTab(next: TabId) {
    setTab(next)
    setFilter("")
    setGateFilter("all")
    setSurfaceFilter("all")
    setCategoryFilter("all")
  }

  React.useEffect(() => {
    setCategoryFilter("all")
  }, [tab])

  if (loading) {
    return (
      <div className="flex min-h-40 items-center justify-center gap-2 text-sm text-muted-foreground">
        <Spinner className="size-4" />
        Loading access index…
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="space-y-3 rounded-[12px] border border-border/70 bg-card p-4">
        <p className="text-sm font-medium text-destructive">
          {error || "No data"}
        </p>
        <p className="text-sm text-muted-foreground">
          Generate with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            npm run registry:build
          </code>
          .
        </p>
        <Button type="button" variant="outline" onClick={() => void load()}>
          Retry
        </Button>
      </div>
    )
  }

  const s = data.summary
  const gateCountsForTab = (() => {
    if (tab === "registry") {
      return {
        public: s.registry.byAccess.public ?? 0,
        member: s.registry.byAccess.member ?? 0,
        pro: s.registry.byAccess.pro ?? 0,
        buy: 0,
      }
    }
    const byGate =
      tab === "templates" ? s.templates.byGate : s.websites.byGate
    return {
      public: byGate?.public ?? 0,
      member: byGate?.member ?? 0,
      pro: byGate?.pro ?? 0,
      buy: byGate?.buy ?? 0,
    }
  })()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <ShieldIcon className="size-4 text-muted-foreground" aria-hidden />
            Access
          </h2>
          <p className="text-sm text-muted-foreground">
            Registry · templates · websites ·{" "}
            <span dir="ltr">{formatWhen(data.generatedAt)}</span>
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void load()}
        >
          Reload
        </Button>
      </div>

      <section className="space-y-3 rounded-[12px] border border-border/70 bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                ["registry", `Registry (${s.registry.total})`],
                ["templates", `Templates (${s.templates.total})`],
                ["websites", `Websites (${s.websites.total})`],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => switchTab(id)}
                className={cn(
                  "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  tab === id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground tabular-nums">
            {table.filteredCount} of {activeRows.length}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <FilterPill
            active={gateFilter === "all"}
            onClick={() => setGateFilter("all")}
            label="All gates"
          />
          {(
            [
              ["public", "Everyone"],
              ["member", "Sign-in"],
              ["pro", "Pro"],
              ["buy", "Buy"],
            ] as const
          ).map(([id, label]) => {
            const count = gateCountsForTab[id]
            if (tab === "registry" && id === "buy") return null
            return (
              <FilterPill
                key={id}
                active={gateFilter === id}
                onClick={() => setGateFilter(id)}
                label={`${label} (${count})`}
              />
            )
          })}
        </div>

        {tab === "registry" && registrySurfaces.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            <FilterPill
              active={surfaceFilter === "all"}
              onClick={() => setSurfaceFilter("all")}
              label="All surfaces"
            />
            {registrySurfaces.map((name) => (
              <FilterPill
                key={name}
                active={surfaceFilter === name}
                onClick={() => setSurfaceFilter(name)}
                label={`${name} (${s.registry.bySurface[name] ?? 0})`}
              />
            ))}
          </div>
        ) : null}

        {tab !== "registry" && catalogCategories.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            <FilterPill
              active={categoryFilter === "all"}
              onClick={() => setCategoryFilter("all")}
              label="All categories"
            />
            {catalogCategories.map((name) => {
              const counts =
                tab === "templates"
                  ? s.templates.byCategory
                  : s.websites.byCategory
              return (
                <FilterPill
                  key={name}
                  active={categoryFilter === name}
                  onClick={() => setCategoryFilter(name)}
                  label={`${name} (${counts?.[name] ?? 0})`}
                />
              )
            })}
          </div>
        ) : null}

        <AdminTableFilter
          id="access-filter"
          label="Search"
          value={filter}
          onChange={setFilter}
          placeholder={
            tab === "registry"
              ? "Name, title, surface…"
              : "Slug, title, category, price…"
          }
        />

        <div className="overflow-x-auto rounded-md border border-border/60">
          <table className="w-full min-w-160 text-sm">
            <thead className="bg-muted/40">
              <tr>
                {tab === "registry" ? (
                  <>
                    <AdminSortTh
                      label="Name"
                      column="name"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Surface"
                      column="surface"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Gate"
                      column="access"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <th className="px-2 py-2 text-start text-xs font-medium text-muted-foreground">
                      Links
                    </th>
                  </>
                ) : (
                  <>
                    <AdminSortTh
                      label="Slug"
                      column="slug"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Title"
                      column="title"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Category"
                      column="category"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Gate"
                      column="gate"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <AdminSortTh
                      label="Price"
                      column="price"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <th className="px-2 py-2 text-start text-xs font-medium text-muted-foreground">
                      Unlock
                    </th>
                    <th className="px-2 py-2 text-start text-xs font-medium text-muted-foreground">
                      Links
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {table.pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 py-8 text-center text-sm text-muted-foreground"
                  >
                    No rows match.
                  </td>
                </tr>
              ) : tab === "registry" ? (
                (table.pageRows as RegistryRow[]).map((row) => (
                  <tr
                    key={row.name}
                    className="border-t border-border/50 hover:bg-muted/20"
                  >
                    <td className="px-2 py-2">
                      <div className="font-medium" dir="ltr">
                        {row.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {row.title}
                      </div>
                    </td>
                    <td className="px-2 py-2 text-xs capitalize" dir="ltr">
                      {row.surface}
                    </td>
                    <td className="px-2 py-2">
                      <GateChip gate={row.access} />
                    </td>
                    <td className="px-2 py-2">
                      <RowLinks
                        links={[
                          row.href
                            ? { href: row.href, label: "Page" }
                            : null,
                          {
                            href: row.registryUrl,
                            label: "JSON",
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                (table.pageRows as CatalogRow[]).map((row) => (
                  <tr
                    key={row.slug}
                    className="border-t border-border/50 hover:bg-muted/20"
                  >
                    <td className="px-2 py-2 font-mono text-xs" dir="ltr">
                      {row.slug}
                    </td>
                    <td className="px-2 py-2 font-medium">{row.title}</td>
                    <td className="px-2 py-2 text-xs capitalize" dir="ltr">
                      {row.category}
                    </td>
                    <td className="px-2 py-2">
                      <GateChip gate={row.gate} />
                    </td>
                    <td className="px-2 py-2 text-xs" dir="ltr">
                      {row.priceLabel}
                    </td>
                    <td className="px-2 py-2 text-xs text-muted-foreground">
                      {row.paid ? (
                        <Link
                          href="/admin/users"
                          className="cursor-pointer font-medium text-primary underline-offset-4 hover:underline"
                        >
                          Grant
                        </Link>
                      ) : (
                        "Sign-in"
                      )}
                    </td>
                    <td className="px-2 py-2">
                      <RowLinks
                        links={[
                          { href: row.href, label: "Catalog" },
                          row.liveUrl
                            ? {
                                href: row.liveUrl,
                                label: "Live",
                                external: true,
                              }
                            : null,
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
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
          onPrev={() => table.setPage(Math.max(1, table.page - 1))}
          onNext={() =>
            table.setPage(Math.min(table.pageCount, table.page + 1))
          }
        />
      </section>
    </div>
  )
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-foreground text-background"
          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {label}
    </button>
  )
}

function RowLinks({
  links,
}: {
  links: Array<{ href: string; label: string; external?: boolean } | null>
}) {
  const items = links.filter(Boolean) as Array<{
    href: string
    label: string
    external?: boolean
  }>
  if (items.length === 0) {
    return <span className="text-xs text-muted-foreground">-</span>
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((l) =>
        l.external ? (
          <a
            key={l.href + l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex cursor-pointer items-center gap-0.5 text-xs font-medium text-primary underline-offset-4 hover:underline"
          >
            {l.label}
            <ArrowUpRightIcon className="size-3" aria-hidden />
          </a>
        ) : (
          <Link
            key={l.href + l.label}
            href={l.href}
            className="inline-flex cursor-pointer items-center gap-0.5 text-xs font-medium text-primary underline-offset-4 hover:underline"
          >
            {l.label}
            <ArrowUpRightIcon className="size-3" aria-hidden />
          </Link>
        )
      )}
    </div>
  )
}
