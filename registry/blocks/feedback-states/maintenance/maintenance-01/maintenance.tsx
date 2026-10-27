"use client"

import * as React from "react"
import {
  BellIcon,
  CheckIcon,
  CircleDotIcon,
  Loader2Icon,
  MailIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { cn } from "@/lib/utils"

const PHASES = [
  { id: "backup", label: "Backup", state: "done" as const },
  { id: "migrate", label: "Migrate", state: "active" as const },
  { id: "verify", label: "Verify", state: "pending" as const },
  { id: "resume", label: "Resume", state: "pending" as const },
]

const SYSTEMS = [
  {
    name: "API",
    detail: "Rolling deploy",
    status: "upgrading" as const,
  },
  {
    name: "Dashboard",
    detail: "Temporarily offline",
    status: "offline" as const,
  },
  {
    name: "Auth",
    detail: "Sessions preserved",
    status: "online" as const,
  },
  {
    name: "Webhooks",
    detail: "Queued for replay",
    status: "queued" as const,
  },
]

function statusMeta(status: (typeof SYSTEMS)[number]["status"]) {
  switch (status) {
    case "online":
      return {
        label: "Online",
        className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        dot: "bg-emerald-500",
      }
    case "upgrading":
      return {
        label: "Upgrading",
        className: "bg-primary/10 text-primary",
        dot: "bg-primary",
      }
    case "queued":
      return {
        label: "Queued",
        className: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
        dot: "bg-amber-500",
      }
    default:
      return {
        label: "Offline",
        className: "bg-muted text-muted-foreground",
        dot: "bg-muted-foreground/50",
      }
  }
}

export default function Maintenance({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  return (
    <main
      className={cn(
        "relative flex min-h-[min(44rem,100svh)] w-full flex-col bg-canvas text-foreground",
        className
      )}
      {...props}
    >
      {/* Full-bleed progress rail — not a card Progress bar */}
      <div
        className="h-1 w-full bg-muted"
        role="progressbar"
        aria-valuenow={62}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Maintenance progress"
      >
        <div className="h-full w-[62%] bg-primary transition-all" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-10 px-4 py-12 sm:px-6 lg:gap-14 lg:py-16">
        {/* Horizontal phase rail */}
        <ol className="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Maintenance phases">
          {PHASES.map((phase, index) => {
            const active = phase.state === "active"
            const done = phase.state === "done"
            return (
              <li key={phase.id} className="flex items-center gap-2 sm:gap-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
                    done &&
                      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                    active && "border-primary/30 bg-primary/10 text-primary",
                    !done &&
                      !active &&
                      "border-border/70 bg-card text-muted-foreground"
                  )}
                >
                  {done ? (
                    <CheckIcon className="size-3" aria-hidden />
                  ) : active ? (
                    <Loader2Icon className="size-3 animate-spin" aria-hidden />
                  ) : (
                    <CircleDotIcon className="size-3 opacity-50" aria-hidden />
                  )}
                  {phase.label}
                </span>
                {index < PHASES.length - 1 ? (
                  <span
                    className="hidden h-px w-4 bg-border/70 sm:block sm:w-6"
                    aria-hidden
                  />
                ) : null}
              </li>
            )
          })}
        </ol>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          {/* Editorial left — big quiet type, no wrench */}
          <div className="text-start">
            <Badge variant="secondary" className="mb-4">
              Scheduled window
            </Badge>
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              SonoJS is paused
            </p>
            <h1 className="mt-2 max-w-md text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Upgrading the rails.
            </h1>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
              Database migration is underway. Dashboards are offline; auth
              sessions stay intact. We expect service back around the time below.
            </p>
            <div className="mt-8 flex flex-wrap items-end gap-6">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Estimated return
                </p>
                <p
                  className="mt-1 text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl"
                  dir="ltr"
                >
                  11:30
                </p>
                <p className="mt-1 text-sm text-muted-foreground">AM · local</p>
              </div>
              <div className="hidden h-12 w-px bg-border/70 sm:block" aria-hidden />
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Window
                </p>
                <p className="mt-1 text-sm font-medium" dir="ltr">
                  10:00 – 11:30
                </p>
                <p className="mt-1 text-sm text-muted-foreground">~30 min left</p>
              </div>
            </div>
          </div>

          {/* Systems board */}
          <div className="rounded-[12px] border border-border/70 bg-card p-2 shadow-soft sm:p-3">
            <p className="px-2 pb-2 pt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Systems
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {SYSTEMS.map((system) => {
                const meta = statusMeta(system.status)
                return (
                  <li
                    key={system.name}
                    className="rounded-lg border border-border/70 bg-canvas px-3.5 py-3 text-start"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold">{system.name}</span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
                          meta.className
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            meta.dot,
                            system.status === "upgrading" && "animate-pulse"
                          )}
                          aria-hidden
                        />
                        {meta.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {system.detail}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Notify as a quiet bottom bar — not a hero form */}
        <div className="rounded-[12px] border border-border/70 bg-card px-4 py-4 shadow-soft sm:px-5">
          {subscribed ? (
            <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 sm:justify-start">
              <CheckIcon className="size-4 shrink-0" aria-hidden />
              You&apos;re on the list — we&apos;ll email{" "}
              <span className="font-medium text-foreground">{email}</span> when
              we&apos;re live.
            </p>
          ) : (
            <form
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
              onSubmit={(e) => {
                e.preventDefault()
                if (email.trim()) setSubscribed(true)
              }}
            >
              <p className="shrink-0 text-sm text-muted-foreground sm:me-auto">
                Get one email when traffic opens again.
              </p>
              <InputGroup className="min-w-0 flex-1 sm:max-w-xs">
                <InputGroupAddon align="inline-start">
                  <MailIcon aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-label="Email for maintenance notification"
                  autoComplete="email"
                />
              </InputGroup>
              <Button type="submit" className="shrink-0 gap-1.5">
                <BellIcon className="size-3.5" aria-hidden />
                Notify me
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
