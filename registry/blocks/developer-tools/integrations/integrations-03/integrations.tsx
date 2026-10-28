"use client"

import * as React from "react"
import {
  BarChart3Icon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  GitBranchIcon,
  MessageSquareIcon,
  PlusIcon,
  Settings2Icon,
  UnplugIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@/lib/utils"

type Row = {
  id: string
  name: string
  category: string
  lastSync: string
  enabled: boolean
  status: "healthy" | "needs-attention" | "paused"
  logo: React.ElementType
}

const INITIAL: Row[] = [
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    lastSync: "2 min ago",
    enabled: true,
    status: "healthy",
    logo: MessageSquareIcon,
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    lastSync: "14 min ago",
    enabled: true,
    status: "healthy",
    logo: CreditCardIcon,
  },
  {
    id: "github",
    name: "GitHub",
    category: "Development",
    lastSync: "1 hr ago",
    enabled: false,
    status: "paused",
    logo: GitBranchIcon,
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    category: "Analytics",
    lastSync: "3 hr ago",
    enabled: true,
    status: "needs-attention",
    logo: BarChart3Icon,
  },
]

function statusBadge(status: Row["status"]) {
  if (status === "needs-attention") {
    return (
      <Badge
        variant="secondary"
        className="border-transparent bg-amber-500/15 font-medium text-amber-700 dark:text-amber-400"
      >
        Needs attention
      </Badge>
    )
  }
  if (status === "paused") {
    return <Badge variant="secondary">Paused</Badge>
  }
  return (
    <Badge
      variant="secondary"
      className="border-transparent bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400"
    >
      Healthy
    </Badge>
  )
}

export default function Integrations({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [rows, setRows] = React.useState(INITIAL)

  const toggle = (id: string, enabled: boolean) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              enabled,
              status: enabled
                ? row.status === "needs-attention"
                  ? "needs-attention"
                  : "healthy"
                : "paused",
            }
          : row
      )
    )
  }

  const remove = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id))
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="integrations-03-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <header className="flex flex-col gap-4 border-b border-border/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="text-start">
            <h1
              id="integrations-03-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Connected apps
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enable, configure, or remove apps linked to this workspace.
            </p>
          </div>
          <Button type="button" size="sm" className="cursor-pointer gap-1.5">
            <PlusIcon className="size-4" aria-hidden />
            Add integration
          </Button>
        </header>

        <ul className="divide-y divide-border/70">
          {rows.map((row) => {
            const Icon = row.logo
            return (
              <li
                key={row.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 text-start">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-medium">{row.name}</p>
                      {statusBadge(row.status)}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {row.category}
                      <span className="mx-1.5 text-border" aria-hidden>
                        ·
                      </span>
                      Last sync {row.lastSync}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                    <Switch
                      checked={row.enabled}
                      onCheckedChange={(v) => toggle(row.id, v)}
                      className="cursor-pointer"
                      aria-label={`Enable ${row.name}`}
                    />
                    <span className="sm:sr-only">Enabled</span>
                  </label>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="cursor-pointer gap-1.5"
                  >
                    <Settings2Icon className="size-3.5" aria-hidden />
                    Configure
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-9 cursor-pointer"
                        aria-label={`${row.name} actions`}
                      >
                        <EllipsisVerticalIcon className="size-4" aria-hidden />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem className="cursor-pointer gap-2">
                        <ExternalLinkIcon className="size-4" aria-hidden />
                        Open docs
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        className="cursor-pointer gap-2"
                        onClick={() => remove(row.id)}
                      >
                        <UnplugIcon className="size-4" aria-hidden />
                        Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </li>
            )
          })}
        </ul>

        {rows.length === 0 ? (
          <div className="px-5 py-12 text-center sm:px-6">
            <p className="text-sm font-medium">No connected apps</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add an integration to start syncing data.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
