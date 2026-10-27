"use client"

import * as React from "react"
import {
  HeadphonesIcon,
  HomeIcon,
  RefreshCwIcon,
  ServerCrashIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

export default function ErrorState({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [refreshing, setRefreshing] = React.useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    window.setTimeout(() => {
      window.location.reload()
    }, 400)
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
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-destructive/20 bg-destructive/5">
              <ServerCrashIcon
                className="size-5 text-destructive"
                aria-hidden
              />
            </div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Error 500
            </p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight">
              Something went wrong on our side
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The request failed unexpectedly. We&apos;ve logged the incident —
              you can retry, or head home while we sort it out.
            </p>
          </div>

          <div className="space-y-4 px-6 py-5">
            <Alert variant="destructive">
              <ServerCrashIcon aria-hidden />
              <AlertTitle>Server exception</AlertTitle>
              <AlertDescription>
                Unexpected error while handling this request. Reference{" "}
                <span className="font-mono text-xs" dir="ltr">
                  ERR_SRV_500
                </span>
                .
              </AlertDescription>
            </Alert>

            <dl className="overflow-hidden rounded-lg border border-border/70 divide-y divide-border/70 text-start text-sm">
              <div className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                <dt className="text-muted-foreground">Status</dt>
                <dd className="font-medium">Internal Server Error</dd>
              </div>
              <div className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                <dt className="text-muted-foreground">Trace</dt>
                <dd className="font-mono text-xs tabular-nums" dir="ltr">
                  REQ-5ERV-ER50
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-2 pt-1">
              <Button
                type="button"
                className="w-full gap-2"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCwIcon
                  className={cn("size-4", refreshing && "animate-spin")}
                  aria-hidden
                />
                {refreshing ? "Refreshing…" : "Try again"}
              </Button>
              <Button type="button" variant="outline" className="w-full gap-2">
                <HomeIcon className="size-4" aria-hidden />
                Back to home
              </Button>
            </div>
          </div>

          <Separator />

          <p className="flex items-center justify-center gap-1.5 px-6 py-3 text-xs text-muted-foreground">
            <HeadphonesIcon className="size-3.5 shrink-0" aria-hidden />
            Still stuck?{" "}
            <button
              type="button"
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              Contact support
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}
