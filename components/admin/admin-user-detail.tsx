"use client"

import * as React from "react"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { AdminRefreshButton } from "@/components/admin/admin-refresh-button"
import {
  adminTdClass,
  adminThClass,
  formatCents,
  formatDate,
} from "@/components/admin/admin-format"
import { AdminStatus } from "@/components/admin/admin-status"
import { PlanGrantForm } from "@/components/admin/plan-grant-form"
import { CopyButton } from "@/components/docs/copy-button"
import { cn } from "@/lib/utils"
import {
  adminFetchJson,
  invalidateAdminCache,
  useAdminFetch,
} from "@/components/admin/use-admin-fetch"
import type { AdminUserDetail } from "@/db/queries/admin-read"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Spinner } from "@sonojs/ui/components/spinner"

export function AdminUserDetailPanel({ userId }: { userId: string }) {
  const url = `/api/admin/users/${userId}`
  const { data: detail, error, loading, refreshing, refresh } = useAdminFetch(
    url,
    React.useCallback(
      (fetchUrl) =>
        adminFetchJson(
          fetchUrl,
          (json) => {
            const d = json.detail as AdminUserDetail | undefined
            if (!d) throw new Error("Could not load user")
            return d
          },
          "Could not load user"
        ),
      []
    )
  )

  const onGrantSuccess = React.useCallback(() => {
    invalidateAdminCache("/api/admin")
    refresh()
  }, [refresh])

  if (loading && !detail) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <Spinner className="size-5 text-muted-foreground" />
      </div>
    )
  }

  if (error && !detail) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <p className="text-sm text-destructive">{error}</p>
          <AdminRefreshButton onClick={refresh} refreshing={refreshing} />
        </div>
        <Link
          href="/admin/users"
          className="cursor-pointer text-sm underline underline-offset-4"
        >
          Back to users
        </Link>
      </div>
    )
  }

  if (!detail) return null

  const headerLabel =
    detail.user.email ||
    detail.user.clerkFullName ||
    detail.user.clerkUserId

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <Link
            href="/admin/users"
            className="cursor-pointer underline underline-offset-4"
          >
            Users
          </Link>
          <span className="mx-1.5">/</span>
          <span dir="ltr">{headerLabel}</span>
        </p>
        <AdminRefreshButton onClick={refresh} refreshing={refreshing} />
      </div>

      <Card className="border-border/60 shadow-none">
        <CardHeader className="border-b border-border/50">
          <CardTitle dir="ltr">
            {detail.user.email || "No email"}
          </CardTitle>
          <CardDescription>
            {detail.user.clerkFullName ? (
              <span dir="ltr">{detail.user.clerkFullName}</span>
            ) : (
              "Clerk profile name unavailable"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 pt-4 text-sm sm:grid-cols-2">
          <p>
            <span className="text-muted-foreground">Plan · </span>
            {detail.plan.plan === "pro"
              ? detail.plan.planName || detail.plan.planSlug || "Pro"
              : "Free"}
          </p>
          <p>
            <span className="text-muted-foreground">Expires · </span>
            <span dir="ltr">{formatDate(detail.plan.currentPeriodEnd)}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Downloads · </span>
            <span dir="ltr">{detail.downloadsTotal}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Created · </span>
            <span dir="ltr">{formatDate(detail.user.createdAt)}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Stripe customer · </span>
            <span className="font-mono text-xs" dir="ltr">
              {detail.user.stripeCustomerId || "—"}
            </span>
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-none">
        <CardHeader className="border-b border-border/50">
          <CardTitle>Clerk</CardTitle>
          <CardDescription>
            Copy IDs or open the Clerk dashboard (no app-specific profile URL
            configured).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-4 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground">Clerk id</span>
            <span className="font-mono text-xs" dir="ltr">
              {detail.user.clerkUserId}
            </span>
            <CopyButton
              value={detail.user.clerkUserId}
              tone="chrome"
              tooltipIdle="Copy Clerk id"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground">Neon id</span>
            <span className="font-mono text-xs" dir="ltr">
              {detail.user.id}
            </span>
            <CopyButton
              value={detail.user.id}
              tone="chrome"
              tooltipIdle="Copy Neon id"
            />
          </div>
          <a
            href="https://dashboard.clerk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm underline-offset-4 hover:underline"
          >
            Open Clerk dashboard
            <ExternalLinkIcon className="size-3.5" />
          </a>
        </CardContent>
      </Card>

      <PlanGrantForm
        initialClerkUserId={detail.user.clerkUserId}
        onSuccess={onGrantSuccess}
      />

      <Card className="border-border/60 shadow-none">
        <CardHeader className="border-b border-border/50">
          <CardTitle>Subscriptions</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {detail.subscriptions.length === 0 ? (
            <p className="text-sm text-muted-foreground">None.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-180 text-start text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className={adminThClass}>Plan</th>
                    <th className={adminThClass}>Status</th>
                    <th className={adminThClass}>Kind</th>
                    <th className={adminThClass}>Period end</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.subscriptions.map((s) => (
                    <tr key={s.id} className="border-b border-border/40">
                      <td className={adminTdClass}>
                        {s.planName || s.planSlug}
                      </td>
                      <td className={adminTdClass}>
                        <AdminStatus status={s.status} />
                      </td>
                      <td className={adminTdClass}>
                        <AdminStatus
                          status={s.isManual ? "manual" : "stripe"}
                        />
                      </td>
                      <td
                        className={cn(adminTdClass, "text-muted-foreground")}
                        dir="ltr"
                      >
                        {formatDate(s.currentPeriodEnd)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-none">
        <CardHeader className="border-b border-border/50">
          <CardTitle>Downloads</CardTitle>
          <CardDescription>
            Latest {detail.downloads.length} of {detail.downloadsTotal}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {detail.downloads.length === 0 ? (
            <p className="text-sm text-muted-foreground">No downloads yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-160 text-start text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className={adminThClass}>Product</th>
                    <th className={adminThClass}>Source</th>
                    <th className={adminThClass}>When</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.downloads.map((d) => (
                    <tr key={d.id} className="border-b border-border/40">
                      <td className={adminTdClass}>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <Link
                            href={`/marketplace/${d.slug}`}
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
                      <td
                        className={cn(adminTdClass, "text-muted-foreground")}
                        dir="ltr"
                      >
                        {formatDate(d.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-none">
        <CardHeader className="border-b border-border/50">
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {detail.payments.length === 0 ? (
            <p className="text-sm text-muted-foreground">None.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-160 text-start text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className={adminThClass}>When</th>
                    <th className={adminThClass}>Amount</th>
                    <th className={adminThClass}>Status</th>
                    <th className={adminThClass}>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.payments.map((p) => (
                    <tr key={p.id} className="border-b border-border/40">
                      <td
                        className={cn(adminTdClass, "text-muted-foreground")}
                        dir="ltr"
                      >
                        {formatDate(p.createdAt)}
                      </td>
                      <td className={adminTdClass} dir="ltr">
                        {formatCents(p.amountCents, p.currency)}
                      </td>
                      <td className={adminTdClass}>
                        <AdminStatus status={p.status} />
                      </td>
                      <td
                        className={cn(
                          adminTdClass,
                          "max-w-40 truncate font-mono text-xs"
                        )}
                        dir="ltr"
                      >
                        {p.stripeInvoiceId || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
