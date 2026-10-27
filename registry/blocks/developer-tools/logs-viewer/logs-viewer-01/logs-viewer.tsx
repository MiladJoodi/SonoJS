"use client"

import * as React from "react"
import {
  ActivityIcon,
  AlertCircleIcon,
  AlertTriangleIcon,
  BugIcon,
  ChevronDownIcon,
  InfoIcon,
  PauseIcon,
  PlayIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react"

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
import { cn } from "@/lib/utils"

type LogLevel = "info" | "warn" | "error" | "debug"

interface LogEntry {
  id: string
  ts: string
  level: LogLevel
  service: string
  message: string
}

let nextId = 1

function makeLog(
  level: LogLevel,
  service: string,
  message: string,
  ts: string
): LogEntry {
  return { id: String(nextId++), ts, level, service, message }
}

const SEED_LOGS: LogEntry[] = [
  makeLog(
    "info",
    "auth",
    "User login successful - uid=u_abc123, ip=192.168.1.12",
    "15:18:04.012"
  ),
  makeLog(
    "debug",
    "cache",
    "Cache HIT for key: product_catalog_v3 (TTL: 3420s)",
    "15:18:04.388"
  ),
  makeLog("info", "api", "GET /api/v2/products 200 OK - 42ms", "15:18:05.001"),
  makeLog(
    "warn",
    "db",
    "Slow query detected: SELECT * FROM orders (1842ms) - add index",
    "15:18:05.821"
  ),
  makeLog(
    "error",
    "payment",
    "Webhook signature verification failed: BadSignatureError",
    "15:18:06.190"
  ),
  makeLog(
    "info",
    "api",
    "POST /api/v2/checkout 201 Created - 129ms",
    "15:18:06.400"
  ),
  makeLog(
    "debug",
    "cache",
    "Cache MISS for key: user_prefs_u_xyz999 - fetching from DB",
    "15:18:07.003"
  ),
  makeLog(
    "error",
    "api",
    "Unhandled exception: Cannot read properties of null (reading 'id')",
    "15:18:07.511"
  ),
  makeLog(
    "info",
    "scheduler",
    "Cron job 'sync-inventory' started - 1842 records",
    "15:18:08.000"
  ),
  makeLog(
    "warn",
    "api",
    "Rate limit threshold at 85% - uid=u_def456",
    "15:18:08.340"
  ),
  makeLog(
    "info",
    "mailer",
    "Transactional email queued: order-confirm to alice@example.com",
    "15:18:09.000"
  ),
  makeLog(
    "debug",
    "tracing",
    "Span 'checkout_flow' completed - duration=312ms, status=ok",
    "15:18:09.211"
  ),
  makeLog(
    "info",
    "auth",
    "Token refresh - uid=u_ghi789, expiry extended by 1h",
    "15:18:09.500"
  ),
  makeLog(
    "error",
    "db",
    "Connection pool exhausted - 50/50 connections in use",
    "15:18:10.001"
  ),
  makeLog(
    "warn",
    "storage",
    "Object storage upload latency spike: 3.2s avg (expected <500ms)",
    "15:18:10.500"
  ),
  makeLog(
    "info",
    "api",
    "GET /api/v2/user/profile 200 OK - 18ms",
    "15:18:11.000"
  ),
  makeLog(
    "debug",
    "events",
    "EventEmitter: 'order.placed' dispatched to 3 listeners",
    "15:18:11.420"
  ),
  makeLog(
    "info",
    "cdn",
    "Cache purge successful - 142 edge nodes updated",
    "15:18:12.000"
  ),
]

const LEVEL_CONFIG: Record<
  LogLevel,
  {
    icon: React.ElementType
    color: string
    active: string
    message: string
  }
> = {
  info: {
    icon: InfoIcon,
    color: "text-sky-600 dark:text-sky-400",
    active:
      "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    message: "text-foreground/80",
  },
  warn: {
    icon: AlertTriangleIcon,
    color: "text-amber-600 dark:text-amber-400",
    active:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    message: "text-amber-700 dark:text-amber-400",
  },
  error: {
    icon: AlertCircleIcon,
    color: "text-destructive",
    active: "border-destructive/30 bg-destructive/10 text-destructive",
    message: "text-destructive",
  },
  debug: {
    icon: BugIcon,
    color: "text-muted-foreground",
    active: "border-border/70 bg-muted/50 text-muted-foreground",
    message: "text-muted-foreground",
  },
}

type LevelFilter = LogLevel | "all"

const LEVEL_FILTERS: { label: string; value: LevelFilter }[] = [
  { label: "ALL", value: "all" },
  { label: "INFO", value: "info" },
  { label: "WARN", value: "warn" },
  { label: "ERROR", value: "error" },
  { label: "DEBUG", value: "debug" },
]

const SERVICES = Array.from(new Set(SEED_LOGS.map((l) => l.service))).sort()

const LIVE_LOGS: Omit<LogEntry, "id">[] = [
  {
    ts: "...",
    level: "info",
    service: "api",
    message: "GET /api/v2/metrics 200 OK - 22ms",
  },
  {
    ts: "...",
    level: "warn",
    service: "db",
    message: "Replica lag: 420ms (threshold: 300ms)",
  },
  {
    ts: "...",
    level: "debug",
    service: "cache",
    message: "Evicting 24 expired keys from LRU cache",
  },
  {
    ts: "...",
    level: "error",
    service: "payment",
    message: "Payment declined: insufficient_funds - uid=u_jkl012",
  },
  {
    ts: "...",
    level: "info",
    service: "mailer",
    message: "Daily digest sent to 4,231 subscribers",
  },
]

let liveIdx = 0

function formatNowTs() {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, "0")
  const m = String(now.getMinutes()).padStart(2, "0")
  const s = String(now.getSeconds()).padStart(2, "0")
  const ms = String(now.getMilliseconds()).padStart(3, "0")
  return `${h}:${m}:${s}.${ms}`
}

export default function LogsViewer01() {
  const [logs, setLogs] = React.useState<LogEntry[]>(SEED_LOGS)
  const [levelFilter, setLevelFilter] = React.useState<LevelFilter>("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [serviceFilter, setServiceFilter] = React.useState("all")
  const [autoScroll, setAutoScroll] = React.useState(true)
  const [streaming, setStreaming] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const streamRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const filtered = logs.filter((log) => {
    if (levelFilter !== "all" && log.level !== levelFilter) return false
    if (serviceFilter !== "all" && log.service !== serviceFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (
        !log.message.toLowerCase().includes(q) &&
        !log.service.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  React.useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [filtered.length, autoScroll])

  const stopStreaming = React.useCallback(() => {
    setStreaming(false)
    if (streamRef.current) {
      clearInterval(streamRef.current)
      streamRef.current = null
    }
  }, [])

  const startStreaming = React.useCallback(() => {
    setStreaming(true)
    streamRef.current = setInterval(() => {
      const src = LIVE_LOGS[liveIdx % LIVE_LOGS.length]!
      liveIdx++
      setLogs((prev) => [
        ...prev.slice(-99),
        { ...src, id: String(nextId++), ts: formatNowTs() },
      ])
    }, 1200)
  }, [])

  React.useEffect(
    () => () => {
      if (streamRef.current) clearInterval(streamRef.current)
    },
    []
  )

  const errorCount = logs.filter((l) => l.level === "error").length
  const warnCount = logs.filter((l) => l.level === "warn").length

  return (
    <div className="min-h-svh bg-canvas text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <ActivityIcon className="size-5 text-primary" aria-hidden />
              <h1 className="text-xl font-semibold tracking-tight">
                Log Viewer
              </h1>
              {streaming ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                  LIVE
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="text-muted-foreground tabular-nums">
                {logs.length} entries
              </span>
              {errorCount > 0 ? (
                <span className="font-semibold text-destructive tabular-nums">
                  {errorCount} errors
                </span>
              ) : null}
              {warnCount > 0 ? (
                <span className="font-semibold text-amber-700 tabular-nums dark:text-amber-400">
                  {warnCount} warnings
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={streaming ? "destructive" : "default"}
              size="sm"
              className="gap-1.5"
              onClick={streaming ? stopStreaming : startStreaming}
            >
              {streaming ? (
                <>
                  <PauseIcon className="size-4" aria-hidden />
                  Pause
                </>
              ) : (
                <>
                  <PlayIcon className="size-4" aria-hidden />
                  Stream
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Clear logs"
              onClick={() => {
                stopStreaming()
                setLogs([])
              }}
            >
              <Trash2Icon className="size-4" aria-hidden />
            </Button>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div
            className="flex items-center gap-1 overflow-x-auto rounded-[12px] border border-border/70 bg-card p-1 shadow-soft"
            role="tablist"
            aria-label="Filter by level"
          >
            {LEVEL_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={levelFilter === f.value}
                onClick={() => setLevelFilter(f.value)}
                className={cn(
                  "shrink-0 cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-colors",
                  levelFilter === f.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger
              size="sm"
              className="w-full font-mono text-xs sm:w-40"
              aria-label="Filter by service"
            >
              <SelectValue placeholder="All services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All services</SelectItem>
              {SERVICES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <InputGroup className="h-10 flex-1">
            <InputGroupAddon align="inline-start">
              <SearchIcon className="size-3.5" aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs..."
              className="font-mono text-xs"
              aria-label="Search logs"
            />
          </InputGroup>

          <button
            type="button"
            onClick={() => setAutoScroll((v) => !v)}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-[12px] border px-3 py-2 text-xs font-semibold transition-colors",
              autoScroll
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border/70 bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            <ChevronDownIcon className="size-3.5" aria-hidden />
            Auto-scroll
          </button>
        </div>

        <div
          ref={scrollRef}
          className="h-130 overflow-y-auto rounded-[12px] border border-border/70 bg-card font-mono text-xs shadow-soft"
          aria-label="Log output"
          aria-live={streaming ? "polite" : "off"}
          aria-atomic="false"
          aria-relevant="additions"
        >
          {filtered.length === 0 ? (
            <div className="flex h-full items-center justify-center text-muted-foreground/60">
              No logs match your filters.
            </div>
          ) : (
            filtered.map((log, idx) => {
              const cfg = LEVEL_CONFIG[log.level]
              const Icon = cfg.icon
              return (
                <div
                  key={log.id}
                  className={cn(
                    "border-b border-border/70 px-4 py-2.5 transition-colors hover:bg-muted/30",
                    idx === filtered.length - 1 && "border-b-0"
                  )}
                >
                  <div className="mb-0.5 flex items-center gap-2 sm:hidden">
                    <div className={cn("flex items-center gap-1", cfg.color)}>
                      <Icon className="size-3 shrink-0" aria-hidden />
                      <span className="text-xs font-semibold uppercase">
                        {log.level}
                      </span>
                    </div>
                    <span className="text-xs capitalize text-muted-foreground">
                      [{log.service}]
                    </span>
                    <span
                      className="ms-auto text-xs text-muted-foreground/50 tabular-nums"
                      dir="ltr"
                    >
                      {log.ts}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "block wrap-break-word text-xs sm:hidden",
                      cfg.message
                    )}
                  >
                    {log.message}
                  </span>

                  <div className="hidden items-start gap-3 sm:flex">
                    <span
                      className="mt-0.5 w-28 shrink-0 text-muted-foreground/50 tabular-nums"
                      dir="ltr"
                    >
                      {log.ts}
                    </span>
                    <div
                      className={cn(
                        "flex w-16 shrink-0 items-center gap-1",
                        cfg.color
                      )}
                    >
                      <Icon className="size-3.5 shrink-0" aria-hidden />
                      <span className="font-semibold uppercase">
                        {log.level}
                      </span>
                    </div>
                    <span className="w-20 shrink-0 capitalize text-muted-foreground">
                      [{log.service}]
                    </span>
                    <span className={cn("flex-1 wrap-break-word", cfg.message)}>
                      {log.message}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {(["info", "warn", "error", "debug"] as LogLevel[]).map((level) => {
            const count = logs.filter((l) => l.level === level).length
            const cfg = LEVEL_CONFIG[level]
            const Icon = cfg.icon
            const active = levelFilter === level
            return (
              <button
                key={level}
                type="button"
                onClick={() =>
                  setLevelFilter(levelFilter === level ? "all" : level)
                }
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase transition-colors",
                  active
                    ? cfg.active
                    : "border-border/70 bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-3" aria-hidden />
                {level}: {count}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
