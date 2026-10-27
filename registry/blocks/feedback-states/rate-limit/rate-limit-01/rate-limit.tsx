"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  ClockIcon,
  GaugeIcon,
  RefreshCwIcon,
  SparklesIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const COUNTDOWN_SECONDS = 60

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, "0")}`
}

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = React.useState(seconds)

  React.useEffect(() => {
    if (remaining <= 0) return
    const timer = window.setInterval(() => {
      setRemaining((s) => Math.max(0, s - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [remaining])

  const reset = React.useCallback(() => setRemaining(seconds), [seconds])
  return { remaining, reset, done: remaining <= 0 }
}

export default function RateLimit({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const { remaining, reset, done } = useCountdown(COUNTDOWN_SECONDS)
  const [retried, setRetried] = React.useState(false)
  const progress =
    ((COUNTDOWN_SECONDS - remaining) / COUNTDOWN_SECONDS) * 100

  const handleRetry = () => {
    if (!done) return
    setRetried(true)
    reset()
    window.setTimeout(() => setRetried(false), 2000)
  }

  return (
    <main
      className={cn(
        "flex min-h-[min(40rem,100svh)] w-full flex-col items-center justify-center bg-canvas px-4 py-12 text-foreground sm:px-6",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="border-b border-border/70 px-6 py-8 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-amber-500/25 bg-amber-500/10">
              <GaugeIcon
                className="size-5 text-amber-700 dark:text-amber-300"
                aria-hidden
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Error 429
              </p>
              <Badge
                variant="secondary"
                className="bg-amber-500/10 text-amber-700 dark:text-amber-300"
              >
                Rate limit
              </Badge>
            </div>
            <h1 className="mt-2 text-xl font-semibold tracking-tight">
              Too many requests
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You&apos;ve hit the request ceiling for this window. Wait for the
              cooldown, then try again — or raise your plan limit.
            </p>
          </div>

          <div className="space-y-5 px-6 py-5">
            <Alert>
              <GaugeIcon aria-hidden />
              <AlertTitle>Slow down to stay online</AlertTitle>
              <AlertDescription>
                Bursting past the limit can delay new requests until the window
                resets.
              </AlertDescription>
            </Alert>

            <div>
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                  <ClockIcon
                    className="size-3.5 text-muted-foreground"
                    aria-hidden
                  />
                  Retry in
                </span>
                <span
                  className={cn(
                    "text-lg font-semibold tabular-nums",
                    done
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-foreground"
                  )}
                  dir="ltr"
                  aria-live="polite"
                >
                  {done ? "Ready" : formatTime(remaining)}
                </span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-muted"
                role="meter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-label="Cooldown progress"
              >
                <div
                  className={cn(
                    "h-full rounded-full transition-[width] duration-1000 ease-linear",
                    done ? "bg-emerald-500" : "bg-amber-500"
                  )}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div
                className="mt-1.5 flex justify-between text-[11px] text-muted-foreground tabular-nums"
                dir="ltr"
              >
                <span>0:00</span>
                <span>{formatTime(COUNTDOWN_SECONDS)}</span>
              </div>
            </div>

            <Button
              type="button"
              className="w-full gap-2"
              variant={done ? "default" : "outline"}
              disabled={!done || retried}
              onClick={handleRetry}
            >
              <RefreshCwIcon
                className={cn("size-4", retried && "animate-spin")}
                aria-hidden
              />
              {retried
                ? "Retrying…"
                : done
                  ? "Retry now"
                  : `Wait ${formatTime(remaining)}`}
            </Button>

            <dl className="overflow-hidden rounded-lg border border-border/70 divide-y divide-border/70 text-sm">
              {[
                { label: "Plan limit", value: "100 req/min" },
                {
                  label: "Your usage",
                  value: "148 req/min",
                  danger: true,
                },
                {
                  label: "Resets",
                  value: done ? "Now" : `in ${formatTime(remaining)}`,
                },
                { label: "Request ID", value: "rl_abc1234xyz", mono: true },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3 px-3.5 py-2.5"
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd
                    className={cn(
                      "font-medium",
                      row.danger && "text-destructive",
                      row.mono && "font-mono text-xs tabular-nums"
                    )}
                    dir="ltr"
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Separator />

          <div className="space-y-3 bg-muted/30 px-6 py-5 text-center">
            <p className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold">
              <SparklesIcon className="size-3.5 text-primary" aria-hidden />
              Need higher limits?
            </p>
            <p className="text-sm text-muted-foreground">
              Pro raises the ceiling to 1,000 req/min with burst protection.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button type="button" size="sm" className="gap-1.5">
                Upgrade to Pro
                <ArrowUpRightIcon className="size-3.5" aria-hidden />
              </Button>
              <Button type="button" variant="ghost" size="sm">
                View plan limits
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
