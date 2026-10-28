"use client"

import * as React from "react"
import {
  LaptopIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type Session = {
  id: string
  device: string
  location: string
  lastActive: string
  current?: boolean
  Icon: typeof MonitorIcon
}

const SESSIONS: Session[] = [
  {
    id: "1",
    device: "MacBook Pro · Chrome",
    location: "San Francisco, US",
    lastActive: "Active now",
    current: true,
    Icon: LaptopIcon,
  },
  {
    id: "2",
    device: "iPhone 16 · Safari",
    location: "San Francisco, US",
    lastActive: "2 hours ago",
    Icon: SmartphoneIcon,
  },
  {
    id: "3",
    device: "iPad Air · Safari",
    location: "Oakland, US",
    lastActive: "Yesterday",
    Icon: TabletIcon,
  },
  {
    id: "4",
    device: "Windows · Edge",
    location: "Austin, US",
    lastActive: "Mar 12, 2026",
    Icon: MonitorIcon,
  },
]

export default function AccountSettings({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas py-8 text-foreground sm:py-10",
        className
      )}
      aria-labelledby="account-settings-03-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 sm:px-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5 text-start">
            <h1
              id="account-settings-03-heading"
              className="text-h3 font-semibold tracking-tight"
            >
              Sessions & devices
            </h1>
            <p className="text-sm text-muted-foreground">
              Places you&apos;re signed in. Revoke anything you don&apos;t
              recognize.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer self-start"
          >
            Sign out all other sessions
          </Button>
        </header>

        <ul className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          {SESSIONS.map((session) => (
            <li
              key={session.id}
              className="flex flex-col gap-3 border-b border-border/70 px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <session.Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1 text-start">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{session.device}</p>
                  {session.current ? (
                    <Badge className="border-0 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                      This device
                    </Badge>
                  ) : null}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {session.location}
                  <span className="mx-1.5 text-muted-foreground/40">·</span>
                  <span dir="ltr">{session.lastActive}</span>
                </p>
              </div>
              {session.current ? (
                <span className="text-sm text-muted-foreground">Current</span>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 cursor-pointer self-start sm:self-center"
                >
                  Revoke
                </Button>
              )}
            </li>
          ))}
        </ul>

        <p className="text-start text-xs text-muted-foreground">
          Signing out other sessions keeps this browser signed in.
        </p>
      </div>
    </section>
  )
}
