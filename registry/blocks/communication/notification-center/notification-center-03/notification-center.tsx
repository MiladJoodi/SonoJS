"use client"

import * as React from "react"
import { BellIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@/lib/utils"

type Channel = "inApp" | "email"

type PrefRow = {
  id: string
  label: string
  description: string
  inApp: boolean
  email: boolean
}

const INITIAL: PrefRow[] = [
  {
    id: "mentions",
    label: "Mentions",
    description: "When someone @mentions you in a thread or comment.",
    inApp: true,
    email: true,
  },
  {
    id: "access",
    label: "Access requests",
    description: "Workspace invites and role change requests.",
    inApp: true,
    email: true,
  },
  {
    id: "security",
    label: "Security",
    description: "New sign-ins, password changes, and API key alerts.",
    inApp: true,
    email: true,
  },
  {
    id: "product",
    label: "Product updates",
    description: "Release notes, tips, and occasional announcements.",
    inApp: false,
    email: true,
  },
]

export default function NotificationCenter({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [rows, setRows] = React.useState(INITIAL)
  const [dirty, setDirty] = React.useState(false)

  function setChannel(id: string, channel: Channel, value: boolean) {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [channel]: value } : row
      )
    )
    setDirty(true)
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="notification-center-03-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <header className="flex items-start gap-3 border-b border-border/70 px-5 py-5 sm:px-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <BellIcon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 text-start">
            <h1
              id="notification-center-03-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Notification preferences
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose what reaches you in-app and by email.
            </p>
          </div>
        </header>

        <div className="px-5 sm:px-6">
          <div className="flex items-end gap-4 border-b border-border/70 py-2.5">
            <p className="min-w-0 flex-1 text-xs font-medium text-muted-foreground">
              Category
            </p>
            <div className="flex w-[5.5rem] shrink-0 justify-between gap-2 text-center text-xs font-medium text-muted-foreground sm:w-28">
              <span className="w-10">In-app</span>
              <span className="w-10">Email</span>
            </div>
          </div>

          <ul>
            {rows.map((row, index) => (
              <li key={row.id}>
                {index > 0 ? <Separator /> : null}
                <div className="flex items-center gap-4 py-4">
                  <div className="min-w-0 flex-1 text-start">
                    <p className="text-sm font-medium">{row.label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {row.description}
                    </p>
                  </div>

                  <div className="flex w-[5.5rem] shrink-0 items-center justify-between gap-2 sm:w-28">
                    <span className="flex w-10 justify-center">
                      <Switch
                        checked={row.inApp}
                        onCheckedChange={(v) =>
                          setChannel(row.id, "inApp", v)
                        }
                        className="cursor-pointer"
                        aria-label={`${row.label} in-app`}
                      />
                    </span>
                    <span className="flex w-10 justify-center">
                      <Switch
                        checked={row.email}
                        onCheckedChange={(v) =>
                          setChannel(row.id, "email", v)
                        }
                        className="cursor-pointer"
                        aria-label={`${row.label} email`}
                      />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-border/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer disabled:cursor-not-allowed"
            disabled={!dirty}
            onClick={() => {
              setRows(INITIAL)
              setDirty(false)
            }}
          >
            Reset
          </Button>
          <Button
            type="button"
            className="cursor-pointer disabled:cursor-not-allowed"
            disabled={!dirty}
            onClick={() => setDirty(false)}
          >
            Save preferences
          </Button>
        </div>
      </div>
    </section>
  )
}
