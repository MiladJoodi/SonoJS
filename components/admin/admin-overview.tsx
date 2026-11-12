"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowUpRightIcon,
  CircleAlertIcon,
  CreditCardIcon,
  DownloadIcon,
  LayoutDashboardIcon,
  UsersIcon,
} from "lucide-react"

import { AdminRefreshButton } from "@/components/admin/admin-refresh-button"
import {
  formatCents,
  formatCount,
  formatDateOnly,
} from "@/components/admin/admin-format"
import {
  adminFetchJson,
  useAdminFetch,
} from "@/components/admin/use-admin-fetch"
import type { AdminOverviewPayload } from "@/db/queries/admin-read"
import { cn } from "@/lib/utils"
import { Spinner } from "@sonojs/ui/components/spinner"

type Metric = {
  label: string
  value: string
  href?: string
  emphasize?: boolean
}

function Panel({
  title,
  href,
  icon: Icon,
  children,
}: {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  children: React.ReactNode
}) {
  return (
    <section className="flex min-w-0 flex-col rounded-[12px] border border-border/70 bg-card">
      <header className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted/70 text-muted-foreground">
            <Icon className="size-3.5" aria-hidden />
          </span>
          <h2 className="text-sm font-medium tracking-tight">{title}</h2>
        </div>
        <Link
          href={href}
          className="inline-flex cursor-pointer items-center gap-0.5 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          View all
          <ArrowUpRightIcon className="size-3" aria-hidden />
        </Link>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </section>
  )
}

function MetricsBlock({ rows }: { rows: Metric[] }) {
  return (
    <dl className="px-4 py-1">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-3 border-b border-border/40 py-2.5 last:border-b-0"
        >
          <dt className="text-sm text-muted-foreground">
            {row.href ? (
              <Link
                href={row.href}
                className="cursor-pointer text-foreground/90 underline-offset-4 hover:underline"
              >
                {row.label}
              </Link>
            ) : (
              row.label
            )}
          </dt>
          <dd
            className={cn(
              "shrink-0 tabular-nums tracking-tight text-foreground",
              row.emphasize
                ? "text-xl font-semibold"
                : "text-sm font-medium"
            )}
            dir="ltr"
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function AlertList({
  items,
}: {
  items: Array<{ id: string; label: string; count: number; href: string }>
}) {
  if (items.length === 0) return null
  return (
    <div className="border-t border-border/50 bg-destructive/5 px-4 py-2">
      <p className="mb-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-destructive/80 uppercase">
        <CircleAlertIcon className="size-3" aria-hidden />
        Needs attention
      </p>
      <ul className="space-y-1">
        {items.map((a) => (
          <li key={a.id}>
            <Link
              href={a.href}
              className="flex cursor-pointer items-baseline justify-between gap-3 rounded-md py-1 text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              <span className="min-w-0">{a.label}</span>
              <span className="shrink-0 font-semibold tabular-nums" dir="ltr">
                {formatCount(a.count)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RecentList({
  empty,
  title = "Recent",
  children,
}: {
  empty: boolean
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-auto border-t border-border/50">
      <p className="px-4 pt-3 pb-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </p>
      {empty ? (
        <p className="px-4 pb-4 text-sm text-muted-foreground">Nothing yet.</p>
      ) : (
        <ul className="px-2 pb-2">{children}</ul>
      )}
    </div>
  )
}

function RecentRow({
  href,
  primary,
  secondary,
  meta,
}: {
  href: string
  primary: React.ReactNode
  secondary?: React.ReactNode
  meta?: React.ReactNode
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex cursor-pointer items-start justify-between gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/50"
      >
        <div className="min-w-0 space-y-0.5">
          <p className="truncate text-sm font-medium" dir="ltr">
            {primary}
          </p>
          {secondary ? (
            <p className="truncate text-xs text-muted-foreground">{secondary}</p>
          ) : null}
        </div>
        {meta ? (
          <div className="shrink-0 pt-0.5 text-end text-xs text-muted-foreground">
            {meta}
          </div>
        ) : null}
      </Link>
    </li>
  )
}

export function AdminOverview() {
  const { data, error, loading, refreshing, refresh } = useAdminFetch(
    "/api/admin/overview",
    React.useCallback(
      (url) =>
        adminFetchJson(
          url,
          (json) => {
            const overview = json.overview as AdminOverviewPayload | undefined
            if (!overview) throw new Error("Could not load overview")
            return overview
          },
          "Could not load overview"
        ),
      []
    )
  )

  if (loading && !data) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center gap-2">
        <Spinner className="size-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading overview…</p>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="flex min-h-48 flex-col items-start justify-center gap-3 rounded-[12px] border border-border/70 bg-card px-5 py-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-destructive">
            Couldn’t load overview
          </p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        <AdminRefreshButton onClick={refresh} refreshing={refreshing} />
      </div>
    )
  }

  if (!data) {
    return (
      <p className="text-sm text-muted-foreground">No overview data yet.</p>
    )
  }

  const {
    primary,
    status,
    alerts,
    recentUsers,
    recentPayments,
    recentDownloads,
    topDownloads,
  } = data

  const usersMetrics: Metric[] = [
    {
      label: "Total users",
      value: formatCount(primary.usersTotal),
      href: "/admin/users",
      emphasize: true,
    },
    {
      label: "Active Pro",
      value: formatCount(primary.proActive),
      href: "/admin/users",
      emphasize: true,
    },
    {
      label: "New (7 days)",
      value: formatCount(status.usersLast7Days),
    },
    {
      label: "New (30 days)",
      value: formatCount(status.usersLast30Days),
    },
  ]

  const billingMetrics: Metric[] = [
    {
      label: "Revenue (30 days)",
      value: formatCents(primary.revenueCents30d),
      href: "/admin/payments",
      emphasize: true,
    },
    {
      label: "Manual Pro",
      value: formatCount(status.manualPro),
      href: "/admin/users",
    },
    {
      label: "Canceling",
      value: formatCount(status.canceling),
      href: "/admin/subscriptions",
    },
    {
      label: "Expiring in 7 days",
      value: formatCount(status.expiringIn7Days),
      href: "/admin/subscriptions",
    },
  ]

  const downloadMetrics: Metric[] = [
    {
      label: "Downloads (30 days)",
      value: formatCount(primary.downloads30d),
      href: "/admin/downloads",
      emphasize: true,
    },
  ]

  const billingAlerts = alerts.filter(
    (a) =>
      a.id === "past_due" ||
      a.id === "failed_payments_7d" ||
      a.id === "paid_now_free"
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/70 text-muted-foreground">
            <LayoutDashboardIcon className="size-4" aria-hidden />
          </span>
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Overview</p>
            <p className="text-xs text-muted-foreground">
              Live snapshot from Neon · users, billing, downloads
            </p>
          </div>
        </div>
        <AdminRefreshButton onClick={refresh} refreshing={refreshing} />
      </div>

      {error ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          Refresh failed: {error}. Showing last loaded numbers.
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Users" href="/admin/users" icon={UsersIcon}>
          <MetricsBlock rows={usersMetrics} />
          <RecentList empty={recentUsers.length === 0}>
            {recentUsers.map((u) => (
              <RecentRow
                key={u.id}
                href={`/admin/users/${u.id}`}
                primary={u.email || "No email"}
                secondary={
                  <span dir="ltr">{formatDateOnly(u.createdAt)}</span>
                }
                meta={
                  <span
                    className={cn(
                      "text-xs font-medium",
                      u.plan === "pro"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-muted-foreground"
                    )}
                  >
                    {u.plan === "pro" ? "Pro" : "Free"}
                  </span>
                }
              />
            ))}
          </RecentList>
        </Panel>

        <Panel title="Billing" href="/admin/payments" icon={CreditCardIcon}>
          <MetricsBlock rows={billingMetrics} />
          <AlertList items={billingAlerts} />
          <RecentList empty={recentPayments.length === 0}>
            {recentPayments.map((p) => (
              <RecentRow
                key={p.id}
                href={`/admin/users/${p.userId}`}
                primary={p.email || "No email"}
                secondary={
                  <span dir="ltr">{formatDateOnly(p.createdAt)}</span>
                }
                meta={
                  <span
                    className="font-medium text-foreground tabular-nums"
                    dir="ltr"
                  >
                    {formatCents(p.amountCents, p.currency)}
                  </span>
                }
              />
            ))}
          </RecentList>
        </Panel>

        <Panel title="Downloads" href="/admin/downloads" icon={DownloadIcon}>
          <MetricsBlock rows={downloadMetrics} />
          <RecentList
            title="Top (30 days)"
            empty={!topDownloads || topDownloads.length === 0}
          >
            {(topDownloads ?? []).map((d, i) => (
              <RecentRow
                key={d.slug}
                href={`/templates/${d.slug}`}
                primary={
                  <span className="truncate" dir="ltr">
                    <span className="text-muted-foreground tabular-nums">
                      {i + 1}.{" "}
                    </span>
                    {d.title}
                    {d.title !== d.slug ? (
                      <span className="text-muted-foreground">
                        {" "}
                        · {d.slug}
                      </span>
                    ) : null}
                  </span>
                }
                meta={
                  <span className="font-medium text-foreground tabular-nums" dir="ltr">
                    {formatCount(d.downloads)}
                  </span>
                }
              />
            ))}
          </RecentList>
          <RecentList empty={recentDownloads.length === 0}>
            {recentDownloads.map((d) => (
              <RecentRow
                key={d.id}
                href={`/admin/users/${d.userId}`}
                primary={d.email || "No email"}
                secondary={
                  <span className="truncate" dir="ltr">
                    {d.title}
                    {d.title !== d.slug ? (
                      <span className="text-muted-foreground">
                        {" "}
                        · {d.slug}
                      </span>
                    ) : null}
                  </span>
                }
                meta={<span dir="ltr">{formatDateOnly(d.createdAt)}</span>}
              />
            ))}
          </RecentList>
        </Panel>
      </div>
    </div>
  )
}
