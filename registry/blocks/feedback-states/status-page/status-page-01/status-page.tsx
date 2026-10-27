"use client"

import * as React from "react"
import {
  ActivityIcon,
  AlertCircleIcon,
  BellIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  ClockIcon,
  CloudIcon,
  DatabaseIcon,
  GlobeIcon,
  RefreshCwIcon,
  ServerIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
} from "@sonojs/ui/components/card"
import { cn } from "@/lib/utils"

type ServiceStatus = "operational" | "degraded" | "maintenance" | "outage"

const STATUS_META: Record<
  ServiceStatus,
  { label: string; badge: string; dot: string; bar: string }
> = {
  operational: {
    label: "Operational",
    badge:
      "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500/30",
  },
  degraded: {
    label: "Degraded",
    badge:
      "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  maintenance: {
    label: "Maintenance",
    badge: "border-transparent bg-sky-500/15 text-sky-700 dark:text-sky-400",
    dot: "bg-sky-500",
    bar: "bg-sky-500/40",
  },
  outage: {
    label: "Outage",
    badge: "border-transparent bg-destructive/15 text-destructive",
    dot: "bg-destructive",
    bar: "bg-destructive",
  },
}

const BAR_HEIGHTS = [
  72, 85, 91, 68, 88, 95, 79, 82, 71, 90, 87, 76, 93, 80, 65, 88, 94, 78, 83, 70,
  89, 77, 92, 86,
] as const

const SERVICES: {
  name: string
  status: ServiceStatus
  uptime: string
  latency: string
  icon: React.ElementType
}[] = [
  {
    name: "Global API",
    status: "operational",
    uptime: "99.99%",
    latency: "24ms",
    icon: CloudIcon,
  },
  {
    name: "Authentication",
    status: "operational",
    uptime: "100%",
    latency: "12ms",
    icon: ShieldCheckIcon,
  },
  {
    name: "Primary Database",
    status: "degraded",
    uptime: "98.50%",
    latency: "140ms",
    icon: DatabaseIcon,
  },
  {
    name: "Edge CDN",
    status: "operational",
    uptime: "99.99%",
    latency: "8ms",
    icon: ZapIcon,
  },
  {
    name: "Realtime Messaging",
    status: "operational",
    uptime: "99.95%",
    latency: "45ms",
    icon: ActivityIcon,
  },
  {
    name: "Analytics Engine",
    status: "maintenance",
    uptime: "99.80%",
    latency: "N/A",
    icon: ServerIcon,
  },
]

const REGIONS: { id: string; name: string; status: ServiceStatus }[] = [
  { id: "us-east", name: "US East (N. Virginia)", status: "operational" },
  { id: "us-west", name: "US West (Oregon)", status: "operational" },
  { id: "eu-central", name: "Europe (Frankfurt)", status: "degraded" },
  {
    id: "ap-southeast",
    name: "Asia Pacific (Singapore)",
    status: "operational",
  },
]

const INCIDENTS = [
  {
    date: "April 10, 2026",
    title: "API latency in eu-central-1",
    desc: "Resolved - caused by an upstream provider and fully mitigated.",
  },
  {
    date: "April 8, 2026",
    title: "Scheduled maintenance: Auth DB",
    desc: "Completed - clusters updated to v5.4 with no observed downtime.",
  },
  {
    date: "April 5, 2026",
    title: "CDN cache invalidation delay",
    desc: "Resolved - purge queue capacity tripled during peak traffic.",
  },
] as const

export default function StatusPage01() {
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    window.setTimeout(() => setIsRefreshing(false), 1200)
  }

  return (
    <main className="min-h-svh bg-canvas px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-[12px] border border-border/70 bg-card shadow-soft">
                <GlobeIcon className="size-6 text-primary" aria-hidden />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  System Status
                </h1>
                <p className="text-xs text-muted-foreground">
                  Platform infrastructure
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCwIcon
                  className={cn("size-4", isRefreshing && "animate-spin")}
                  aria-hidden
                />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </Button>
              <Button type="button" size="sm" className="gap-2">
                <BellIcon className="size-4" aria-hidden />
                Subscribe
              </Button>
            </div>
          </div>

          <Alert className="border-amber-500/30 bg-amber-500/5">
            <AlertCircleIcon className="text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-900 dark:text-amber-200">
              Partial system degradation
            </AlertTitle>
            <AlertDescription className="text-amber-900/80 dark:text-amber-200/80">
              <p>
                Increased latency in Europe (Frankfurt) is affecting the Primary
                Database. Engineers are investigating.{" "}
                <button
                  type="button"
                  className="cursor-pointer font-semibold underline underline-offset-2 hover:no-underline"
                >
                  View incident report
                </button>
              </p>
            </AlertDescription>
          </Alert>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Global uptime",
              value: "99.98%",
              help: (
                <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2Icon className="size-3" aria-hidden />
                  Within SLA
                </span>
              ),
            },
            {
              label: "Avg. latency",
              value: "42ms",
              help: (
                <span className="font-semibold text-amber-700 dark:text-amber-400">
                  +12% vs last 24h
                </span>
              ),
            },
            {
              label: "Requests / sec",
              value: "12.4k",
              help: (
                <span className="text-muted-foreground">Peak: 18.2k</span>
              ),
            },
            {
              label: "Security probes",
              value: "0",
              help: (
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  All systems secure
                </span>
              ),
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft"
            >
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums">
                {stat.value}
              </p>
              <div className="mt-2 text-xs">{stat.help}</div>
            </div>
          ))}
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Core services</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon
              const meta = STATUS_META[service.status]
              return (
                <li key={service.name}>
                  <Card className="h-full border-border/70 transition-colors hover:border-primary/25">
                    <CardContent className="p-5">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex size-10 items-center justify-center rounded-[12px] border border-border/70 bg-muted/40 text-muted-foreground">
                          <Icon className="size-5" aria-hidden />
                        </div>
                        <Badge variant="outline" className={meta.badge}>
                          {meta.label}
                        </Badge>
                      </div>
                      <h3 className="mb-3 text-sm font-semibold">
                        {service.name}
                      </h3>
                      <div className="flex flex-col gap-2 border-t border-border/70 pt-4 text-xs">
                        <div className="flex justify-between gap-3">
                          <span className="text-muted-foreground">Uptime</span>
                          <span className="font-semibold tabular-nums">
                            {service.uptime}
                          </span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="text-muted-foreground">Latency</span>
                          <span className="font-semibold tabular-nums">
                            {service.latency}
                          </span>
                        </div>
                      </div>
                      <div
                        className="mt-4 flex h-6 items-end gap-1"
                        aria-hidden
                      >
                        {BAR_HEIGHTS.map((h, i) => (
                          <div
                            key={i}
                            className={cn(
                              "flex-1 rounded-sm",
                              service.status !== "operational" && i === 18
                                ? meta.bar
                                : "bg-emerald-500/25",
                              i === 23 && "animate-pulse"
                            )}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </li>
              )
            })}
          </ul>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Incident history</h2>
            <ul className="divide-y divide-border/70 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
              {INCIDENTS.map((incident) => (
                <li
                  key={incident.title}
                  className="p-6 transition-colors hover:bg-muted/30"
                >
                  <div className="flex items-start gap-4">
                    <ClockIcon
                      className="mt-1 size-4 shrink-0 text-muted-foreground/40"
                      aria-hidden
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {incident.date}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold">
                        {incident.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {incident.desc}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Regional health</h2>
            <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
              <ul className="flex flex-col gap-3">
                {REGIONS.map((region) => (
                  <li
                    key={region.id}
                    className="flex items-center justify-between gap-3 rounded-[12px] border border-border/70 bg-muted/20 px-3 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">{region.name}</p>
                      <p className="text-xs text-muted-foreground" dir="ltr">
                        {region.id}-1
                      </p>
                    </div>
                    <span
                      className={cn(
                        "size-3 rounded-full shadow-soft",
                        STATUS_META[region.status].dot
                      )}
                      title={STATUS_META[region.status].label}
                      aria-label={STATUS_META[region.status].label}
                    />
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-4 w-full gap-2 font-semibold"
              >
                View full metrics
                <ChevronRightIcon className="size-4 icon-dir" aria-hidden />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
