"use client"

import * as React from "react"

import { AdminRefreshButton } from "@/components/admin/admin-refresh-button"
import { formatCents } from "@/components/admin/admin-format"
import {
  adminFetchJson,
  useAdminFetch,
} from "@/components/admin/use-admin-fetch"
import type { AdminOverviewKpis } from "@/db/queries/admin-read"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Spinner } from "@sonojs/ui/components/spinner"

export function AdminOverview() {
  const { data: kpis, error, loading, refreshing, refresh } = useAdminFetch(
    "/api/admin/overview",
    React.useCallback(
      (url) =>
        adminFetchJson(
          url,
          (json) => (json.kpis as AdminOverviewKpis | undefined) ?? null,
          "Could not load overview"
        ).then((v) => {
          if (!v) throw new Error("Could not load overview")
          return v
        }),
      []
    )
  )

  if (loading && !kpis) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <Spinner className="size-5 text-muted-foreground" />
      </div>
    )
  }

  if (error && !kpis) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-sm text-destructive">{error}</p>
        <AdminRefreshButton onClick={refresh} refreshing={refreshing} />
      </div>
    )
  }

  if (!kpis) return null

  const cards: Array<{ label: string; value: string }> = [
    { label: "Users", value: String(kpis.usersTotal) },
    { label: "Pro (active)", value: String(kpis.proActive) },
    { label: "Free", value: String(kpis.freeUsers) },
    { label: "Subs active", value: String(kpis.subscriptionsActive) },
    { label: "Past due", value: String(kpis.subscriptionsPastDue) },
    { label: "Payments OK", value: String(kpis.paymentsSucceeded) },
    { label: "Payments failed", value: String(kpis.paymentsFailed) },
    {
      label: "Revenue (succeeded)",
      value: formatCents(kpis.revenueCentsSucceeded),
    },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end">
        <AdminRefreshButton onClick={refresh} refreshing={refreshing} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="border-border/60 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {c.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tracking-tight" dir="ltr">
                {c.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
