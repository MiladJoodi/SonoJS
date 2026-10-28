"use client"

import * as React from "react"
import { PauseIcon, PlayIcon, Trash2Icon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type LogLevel = "info" | "warn" | "error" | "debug"

type LogEntry = {
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

const SEED: LogEntry[] = [
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
    "error",
    "api",
    "Unhandled exception: Cannot read properties of null (reading 'id')",
    "15:18:07.511"
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
    "info",
    "cdn",
    "Cache purge successful - 142 edge nodes updated",
    "15:18:12.000"
  ),
]

const LIVE: Omit<LogEntry, "id">[] = [
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
    service: "scheduler",
    message: "Cron job 'sync-inventory' finished - 1842 records in 6.4s",
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

const LEVEL_COLOR: Record<LogLevel, string> = {
  info: "text-[color:var(--code-syntax-variable)]",
  warn: "text-[color:var(--code-syntax-string)]",
  error: "text-[#f48771]",
  debug: "text-[color:var(--code-syntax-comment)]",
}

type LevelFilter = LogLevel | "all"

const FILTERS: { label: string; value: LevelFilter }[] = [
  { label: "ALL", value: "all" },
  { label: "INFO", value: "info" },
  { label: "WARN", value: "warn" },
  { label: "ERROR", value: "error" },
  { label: "DEBUG", value: "debug" },
]

export default function LogsViewer({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [logs, setLogs] = React.useState(SEED)
  const [levelFilter, setLevelFilter] = React.useState<LevelFilter>("all")
  const [streaming, setStreaming] = React.useState(true)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const streamRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const filtered = logs.filter(
    (log) => levelFilter === "all" || log.level === levelFilter
  )

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [filtered.length])

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
      const src = LIVE[liveIdx % LIVE.length]!
      liveIdx++
      setLogs((prev) => [
        ...prev.slice(-79),
        { ...src, id: String(nextId++), ts: formatNowTs() },
      ])
    }, 1400)
  }, [])

  React.useEffect(() => {
    startStreaming()
    return () => {
      if (streamRef.current) clearInterval(streamRef.current)
    }
  }, [startStreaming])

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="logs-viewer-03-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <header className="flex flex-col gap-3 border-b border-border/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex min-w-0 items-center gap-2 text-start">
            <h1
              id="logs-viewer-03-heading"
              className="text-sm font-semibold tracking-tight"
            >
              production · sonojs-web
            </h1>
            {streaming ? (
              <Badge className="border-transparent bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400">
                LIVE
              </Badge>
            ) : (
              <Badge variant="secondary">Paused</Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              className="flex items-center gap-0.5 rounded-md border border-border/70 p-0.5"
              role="tablist"
              aria-label="Filter by level"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  role="tab"
                  aria-selected={levelFilter === f.value}
                  onClick={() => setLevelFilter(f.value)}
                  className={cn(
                    "cursor-pointer rounded px-2 py-1 font-mono text-[10px] font-semibold transition-colors",
                    levelFilter === f.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <Button
              type="button"
              variant={streaming ? "outline" : "default"}
              size="sm"
              className="h-8 cursor-pointer gap-1.5 px-2.5"
              onClick={streaming ? stopStreaming : startStreaming}
            >
              {streaming ? (
                <>
                  <PauseIcon className="size-3.5" aria-hidden />
                  Pause
                </>
              ) : (
                <>
                  <PlayIcon className="size-3.5" aria-hidden />
                  Tail
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer"
              aria-label="Clear terminal"
              onClick={() => {
                stopStreaming()
                setLogs([])
              }}
            >
              <Trash2Icon className="size-3.5" aria-hidden />
            </Button>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="h-80 overflow-y-auto bg-(--code-bg) p-3 font-mono text-[12px] leading-relaxed text-(--code-fg) sm:h-96 sm:p-4"
          aria-label="Terminal log tail"
          aria-live={streaming ? "polite" : "off"}
          dir="ltr"
        >
          {filtered.length === 0 ? (
            <p className="text-(--code-syntax-comment)">
              # no lines match this level filter
            </p>
          ) : (
            filtered.map((log) => (
              <div key={log.id} className="flex gap-2 whitespace-pre-wrap">
                <span className="shrink-0 text-(--code-line-number) tabular-nums">
                  {log.ts}
                </span>
                <span
                  className={cn(
                    "w-12 shrink-0 uppercase",
                    LEVEL_COLOR[log.level]
                  )}
                >
                  {log.level}
                </span>
                <span className="shrink-0 text-(--code-syntax-type)">
                  [{log.service}]
                </span>
                <span className="min-w-0 flex-1 wrap-break-word">
                  {log.message}
                </span>
              </div>
            ))
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-border/70 px-4 py-2.5 text-xs text-muted-foreground sm:px-5">
          <span className="tabular-nums">{filtered.length} lines shown</span>
          <span className="font-mono tabular-nums" dir="ltr">
            tail -f /var/log/sonojs-web.log
          </span>
        </footer>
      </div>
    </section>
  )
}
