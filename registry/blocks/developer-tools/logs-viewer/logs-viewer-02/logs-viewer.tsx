"use client"

import * as React from "react"
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  BugIcon,
  CheckIcon,
  CopyIcon,
  InfoIcon,
  SearchIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

type LogLevel = "info" | "warn" | "error" | "debug"

type LogEntry = {
  id: string
  ts: string
  level: LogLevel
  service: string
  message: string
  requestId: string
  attrs: Record<string, string | number | boolean>
  stack?: string
}

const ENTRIES: LogEntry[] = [
  {
    id: "1",
    ts: "15:18:04.012",
    level: "info",
    service: "auth",
    message: "User login successful - uid=u_abc123, ip=192.168.1.12",
    requestId: "req_7f2a1c",
    attrs: {
      uid: "u_abc123",
      ip: "192.168.1.12",
      method: "password",
      duration_ms: 84,
    },
  },
  {
    id: "2",
    ts: "15:18:05.821",
    level: "warn",
    service: "db",
    message:
      "Slow query detected: SELECT * FROM orders WHERE status='open' (1842ms) - add index",
    requestId: "req_9c41ee",
    attrs: {
      query_ms: 1842,
      rows: 12840,
      table: "orders",
      hint: "idx_orders_status_created",
    },
  },
  {
    id: "3",
    ts: "15:18:06.190",
    level: "error",
    service: "payment",
    message: "Webhook signature verification failed: BadSignatureError",
    requestId: "req_b12d90",
    attrs: {
      provider: "stripe",
      event: "invoice.paid",
      endpoint: "/webhooks/stripe",
      attempt: 3,
    },
    stack: `BadSignatureError: invalid webhook signature
    at verifyStripeSig (payment/webhooks.ts:118:11)
    at handleStripeWebhook (payment/webhooks.ts:64:5)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`,
  },
  {
    id: "4",
    ts: "15:18:07.511",
    level: "error",
    service: "api",
    message:
      "Unhandled exception: Cannot read properties of null (reading 'id')",
    requestId: "req_e88af2",
    attrs: {
      route: "GET /api/v2/checkout/session",
      status: 500,
      uid: "u_def456",
    },
    stack: `TypeError: Cannot read properties of null (reading 'id')
    at resolveCart (api/checkout.ts:92:21)
    at GET (app/api/v2/checkout/session/route.ts:41:18)`,
  },
  {
    id: "5",
    ts: "15:18:08.340",
    level: "warn",
    service: "api",
    message: "Rate limit threshold at 85% - uid=u_def456",
    requestId: "req_11aa0b",
    attrs: {
      uid: "u_def456",
      limit: 120,
      remaining: 18,
      window_s: 60,
    },
  },
  {
    id: "6",
    ts: "15:18:10.001",
    level: "error",
    service: "db",
    message: "Connection pool exhausted - 50/50 connections in use",
    requestId: "req_pool01",
    attrs: {
      pool: "primary",
      active: 50,
      idle: 0,
      waiting: 14,
    },
  },
  {
    id: "7",
    ts: "15:18:11.000",
    level: "info",
    service: "api",
    message: "GET /api/v2/user/profile 200 OK - 18ms",
    requestId: "req_44bcde",
    attrs: {
      route: "GET /api/v2/user/profile",
      status: 200,
      duration_ms: 18,
      cache: "HIT",
    },
  },
  {
    id: "8",
    ts: "15:18:09.211",
    level: "debug",
    service: "tracing",
    message: "Span 'checkout_flow' completed - duration=312ms, status=ok",
    requestId: "req_7f2a1c",
    attrs: {
      span: "checkout_flow",
      trace_id: "4bf92f3577b34da6a3ce929d0e0e4736",
      duration_ms: 312,
      status: "ok",
    },
  },
]

const LEVEL_META: Record<
  LogLevel,
  { icon: React.ElementType; className: string }
> = {
  info: {
    icon: InfoIcon,
    className: "text-sky-600 dark:text-sky-400",
  },
  warn: {
    icon: AlertTriangleIcon,
    className: "text-amber-700 dark:text-amber-400",
  },
  error: {
    icon: AlertCircleIcon,
    className: "text-destructive",
  },
  debug: {
    icon: BugIcon,
    className: "text-muted-foreground",
  },
}

const SERVICES = Array.from(new Set(ENTRIES.map((e) => e.service))).sort()

export default function LogsViewer({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [levelFilter, setLevelFilter] = React.useState<LogLevel | "all">("all")
  const [serviceFilter, setServiceFilter] = React.useState("all")
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState(ENTRIES[2]!.id)
  const [copied, setCopied] = React.useState(false)

  const filtered = ENTRIES.filter((entry) => {
    if (levelFilter !== "all" && entry.level !== levelFilter) return false
    if (serviceFilter !== "all" && entry.service !== serviceFilter) return false
    if (query) {
      const q = query.toLowerCase()
      if (
        !entry.message.toLowerCase().includes(q) &&
        !entry.service.toLowerCase().includes(q) &&
        !entry.requestId.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  const selected =
    filtered.find((e) => e.id === selectedId) ?? filtered[0] ?? null

  const SelectedIcon = selected ? LEVEL_META[selected.level].icon : null

  async function copyPayload() {
    if (!selected) return
    const payload = {
      ts: selected.ts,
      level: selected.level,
      service: selected.service,
      requestId: selected.requestId,
      message: selected.message,
      attrs: selected.attrs,
      stack: selected.stack ?? null,
    }
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-label="Log entry inspector"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col border-b border-border/70 lg:border-b-0 lg:border-e">
          <div className="space-y-3 border-b border-border/70 p-4">
            <div className="text-start">
              <p className="text-sm font-semibold">Entries</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Select a line to inspect attributes and stack.
              </p>
            </div>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <SearchIcon className="size-4" aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search message, service, req…"
                aria-label="Search log entries"
              />
            </InputGroup>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select
                value={levelFilter}
                onValueChange={(v) =>
                  setLevelFilter(v as LogLevel | "all")
                }
              >
                <SelectTrigger
                  size="sm"
                  className="w-full cursor-pointer font-mono text-xs"
                  aria-label="Filter by level"
                >
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All levels</SelectItem>
                  <SelectItem value="info">info</SelectItem>
                  <SelectItem value="warn">warn</SelectItem>
                  <SelectItem value="error">error</SelectItem>
                  <SelectItem value="debug">debug</SelectItem>
                </SelectContent>
              </Select>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger
                  size="sm"
                  className="w-full cursor-pointer font-mono text-xs"
                  aria-label="Filter by service"
                >
                  <SelectValue placeholder="All services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All services</SelectItem>
                  {SERVICES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ul className="max-h-72 overflow-y-auto p-2 lg:max-h-112">
            {filtered.length === 0 ? (
              <li className="px-3 py-8 text-center text-sm text-muted-foreground">
                No entries match.
              </li>
            ) : (
              filtered.map((entry) => {
                const meta = LEVEL_META[entry.level]
                const Icon = meta.icon
                const active = selected?.id === entry.id
                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(entry.id)}
                      className={cn(
                        "flex w-full cursor-pointer flex-col gap-1 rounded-md px-3 py-2.5 text-start transition-colors",
                        active
                          ? "bg-primary/10"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Icon
                          className={cn("size-3.5 shrink-0", meta.className)}
                          aria-hidden
                        />
                        <span className="font-mono text-[11px] uppercase tabular-nums text-muted-foreground">
                          {entry.level}
                        </span>
                        <span
                          className="ms-auto font-mono text-[11px] text-muted-foreground/70 tabular-nums"
                          dir="ltr"
                        >
                          {entry.ts}
                        </span>
                      </span>
                      <span className="truncate font-mono text-xs text-muted-foreground">
                        [{entry.service}]
                      </span>
                      <span className="line-clamp-2 text-xs leading-snug">
                        {entry.message}
                      </span>
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </aside>

        <div className="flex min-w-0 flex-col">
          {selected && SelectedIcon ? (
            <>
              <header className="flex flex-col gap-3 border-b border-border/70 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                <div className="min-w-0 text-start">
                  <div className="flex flex-wrap items-center gap-2">
                    <SelectedIcon
                      className={cn(
                        "size-4",
                        LEVEL_META[selected.level].className
                      )}
                      aria-hidden
                    />
                    <Badge
                      variant="secondary"
                      className="font-mono text-[10px] uppercase"
                    >
                      {selected.level}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {selected.service}
                    </Badge>
                    <span
                      className="font-mono text-xs text-muted-foreground tabular-nums"
                      dir="ltr"
                    >
                      {selected.ts}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">{selected.message}</p>
                  <p
                    className="mt-2 font-mono text-xs text-muted-foreground"
                    dir="ltr"
                  >
                    request_id={selected.requestId}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer gap-1.5"
                  onClick={copyPayload}
                >
                  {copied ? (
                    <CheckIcon className="size-3.5" aria-hidden />
                  ) : (
                    <CopyIcon className="size-3.5" aria-hidden />
                  )}
                  {copied ? "Copied" : "Copy JSON"}
                </Button>
              </header>

              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Attributes
                  </p>
                  <dl className="overflow-hidden rounded-[12px] border border-border/70">
                    {Object.entries(selected.attrs).map(([key, value], i) => (
                      <div key={key}>
                        {i > 0 ? <Separator /> : null}
                        <div className="grid grid-cols-[8rem_minmax(0,1fr)] gap-3 px-4 py-2.5 text-start font-mono text-xs sm:grid-cols-[10rem_minmax(0,1fr)]">
                          <dt className="text-muted-foreground">{key}</dt>
                          <dd className="min-w-0 wrap-break-word" dir="ltr">
                            {String(value)}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>

                {selected.stack ? (
                  <div>
                    <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Stack
                    </p>
                    <pre
                      className="overflow-x-auto rounded-[12px] border border-border/70 bg-muted/40 p-4 font-mono text-[11px] leading-relaxed text-foreground"
                      dir="ltr"
                    >
                      {selected.stack}
                    </pre>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No stack trace on this entry.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-10 text-sm text-muted-foreground">
              Select an entry to inspect.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
