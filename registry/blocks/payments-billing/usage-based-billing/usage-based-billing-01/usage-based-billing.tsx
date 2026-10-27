"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  DatabaseIcon,
  MailIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

type QuotaTone = "default" | "warning" | "danger" | "success"

type Quota = {
  id: string
  label: string
  detail: string
  usedLabel: string
  percent: number
  status: string
  tone: QuotaTone
  icon: React.ElementType
}

const QUOTAS: Quota[] = [
  {
    id: "seats",
    label: "Team seats",
    detail: "8 of 10 included",
    usedLabel: "80% used",
    percent: 80,
    status: "2 left",
    tone: "default",
    icon: UsersIcon,
  },
  {
    id: "api",
    label: "API requests",
    detail: "920K of 1M this month",
    usedLabel: "92% used",
    percent: 92,
    status: "High usage",
    tone: "warning",
    icon: ZapIcon,
  },
  {
    id: "storage",
    label: "Database storage",
    detail: "4.2 GB of 50 GB",
    usedLabel: "8% used",
    percent: 8,
    status: "On track",
    tone: "success",
    icon: DatabaseIcon,
  },
  {
    id: "email",
    label: "Transactional email",
    detail: "12,500 of 10,000 sent",
    usedLabel: "125% used",
    percent: 100,
    status: "Over limit",
    tone: "danger",
    icon: MailIcon,
  },
]

function toneBadge(tone: QuotaTone) {
  switch (tone) {
    case "warning":
      return "bg-amber-500/10 text-amber-700 dark:text-amber-300"
    case "danger":
      return "bg-destructive/10 text-destructive"
    case "success":
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
    default:
      return ""
  }
}

function meterFill(tone: QuotaTone) {
  switch (tone) {
    case "warning":
      return "bg-amber-500"
    case "danger":
      return "bg-destructive"
    case "success":
      return "bg-emerald-500"
    default:
      return "bg-primary"
  }
}

function UsageMeter({
  percent,
  tone,
  label,
}: {
  percent: number
  tone: QuotaTone
  label: string
}) {
  const value = Math.min(100, Math.max(0, percent))
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-label={label}
    >
      <div
        className={cn("h-full rounded-full transition-all", meterFill(tone))}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default function UsageBasedBilling({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-background px-4 py-10 text-foreground sm:px-6 sm:py-12",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 text-start">
            <h1 className="text-2xl font-semibold tracking-tight">
              Plan & usage
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track quotas for your current billing period.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm">
              Manage billing
            </Button>
            <Button type="button" size="sm" className="gap-1.5">
              <SparklesIcon className="size-3.5" aria-hidden />
              Upgrade
            </Button>
          </div>
        </div>

        <section
          className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
          aria-labelledby="usage-plan-heading"
        >
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="min-w-0 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  id="usage-plan-heading"
                  className="text-sm font-semibold text-foreground"
                >
                  Pro
                </h2>
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground" dir="ltr">
                  $49
                </span>
                /month · Renews Nov 1, 2026
              </p>
            </div>
            <p className="text-sm text-muted-foreground sm:text-end">
              Current period
              <span className="mt-0.5 block font-medium text-foreground" dir="ltr">
                Oct 1 – Nov 1, 2026
              </span>
            </p>
          </div>

          <Separator />

          <ul className="divide-y divide-border/70">
            {QUOTAS.map((quota) => {
              const Icon = quota.icon
              return (
                <li
                  key={quota.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:px-6 sm:py-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border/70 bg-muted/50">
                        <Icon
                          className="size-4 text-muted-foreground"
                          aria-hidden
                        />
                      </div>
                      <div className="min-w-0 text-start">
                        <p className="text-sm font-medium text-foreground">
                          {quota.label}
                        </p>
                        <p
                          className={cn(
                            "mt-0.5 text-sm",
                            quota.tone === "danger"
                              ? "text-destructive"
                              : "text-muted-foreground"
                          )}
                          dir="ltr"
                        >
                          {quota.detail}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn("shrink-0", toneBadge(quota.tone))}
                    >
                      {quota.status}
                    </Badge>
                  </div>
                  <div className="space-y-1.5 ps-0 sm:ps-12">
                    <UsageMeter
                      percent={quota.percent}
                      tone={quota.tone}
                      label={`${quota.label}: ${quota.usedLabel}`}
                    />
                    <p
                      className={cn(
                        "text-xs",
                        quota.tone === "danger"
                          ? "text-destructive"
                          : "text-muted-foreground"
                      )}
                    >
                      {quota.tone === "danger"
                        ? "Over limit — overage charges apply this period."
                        : quota.usedLabel}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <aside className="flex flex-col gap-4 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="min-w-0 text-start">
            <p className="text-sm font-semibold text-foreground">
              Need higher limits?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Enterprise unlocks higher API and email quotas, SAML SSO, and
              dedicated support.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full shrink-0 gap-1.5 sm:w-auto"
          >
            View Enterprise
            <ArrowRightIcon className="icon-dir size-3.5" aria-hidden />
          </Button>
        </aside>
      </div>
    </div>
  )
}
