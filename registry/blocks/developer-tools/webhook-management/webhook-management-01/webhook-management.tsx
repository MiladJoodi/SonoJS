"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  CopyIcon,
  EllipsisVerticalIcon,
  GlobeIcon,
  PencilIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  Trash2Icon,
  XCircleIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

const WEBHOOKS = [
  {
    id: "wh_12345",
    url: "https://api.acmecorp.com/webhooks/billing",
    status: "active" as const,
    events: ["invoice.created", "invoice.paid", "invoice.payment_failed"],
    lastFired: "10 mins ago",
    successRate: "99.8%",
  },
  {
    id: "wh_67890",
    url: "https://hooks.slack.com/services/T01/B02/xyz",
    status: "active" as const,
    events: ["customer.created", "customer.deleted"],
    lastFired: "2 hours ago",
    successRate: "100%",
  },
  {
    id: "wh_11223",
    url: "https://zapier.com/hooks/catch/123/abc",
    status: "failing" as const,
    events: ["subscription.canceled"],
    lastFired: "1 day ago",
    successRate: "45.2%",
  },
]

const LOGS = [
  {
    id: "evt_1",
    event: "invoice.paid",
    status: 200,
    time: "10:24 AM",
    duration: "124ms",
  },
  {
    id: "evt_2",
    event: "invoice.created",
    status: 200,
    time: "10:23 AM",
    duration: "89ms",
  },
  {
    id: "evt_3",
    event: "customer.created",
    status: 200,
    time: "09:15 AM",
    duration: "156ms",
  },
  {
    id: "evt_4",
    event: "subscription.canceled",
    status: 500,
    time: "Yesterday",
    duration: "3004ms",
  },
] as const

const EVENT_OPTIONS = [
  { id: "all", label: "All events (wildcard)" },
  { id: "inv", label: "invoice.*", defaultChecked: true },
  { id: "cus", label: "customer.*" },
  { id: "sub", label: "subscription.*" },
  { id: "pay", label: "payment_intent.*" },
] as const

export default function WebhookManagement({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [isAdding, setIsAdding] = React.useState(false)

  return (
    <main
      className={cn(
        "w-full min-w-0 bg-canvas p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0 text-start">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Webhooks
            </h1>
            <p className="text-muted-foreground">
              Manage webhook endpoints and view delivery logs.
            </p>
          </div>
          <Button
            type="button"
            className="cursor-pointer"
            onClick={() => setIsAdding((v) => !v)}
          >
            <PlusIcon aria-hidden />
            Add Endpoint
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="min-w-0 space-y-6 lg:col-span-2">
            {isAdding ? (
              <Card className="gap-0 border-border/70 py-0 shadow-soft">
                <CardHeader className="border-b border-border/70 py-6">
                  <CardTitle>Add Webhook Endpoint</CardTitle>
                  <CardDescription>
                    Listen to events from your workspace.
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-6">
                  <FieldGroup className="gap-6">
                    <Field>
                      <FieldLabel htmlFor="webhook-management-01-url">
                        Endpoint URL
                      </FieldLabel>
                      <Input
                        id="webhook-management-01-url"
                        name="url"
                        type="url"
                        placeholder="https://your-domain.com/webhooks"
                        dir="ltr"
                        required
                      />
                    </Field>

                    <div>
                      <p className="mb-3 text-sm font-medium text-foreground">
                        Events to send
                      </p>
                      <div className="grid gap-3 rounded-[12px] border border-border/70 bg-muted/40 p-4 sm:grid-cols-2">
                        {EVENT_OPTIONS.map((opt) => (
                          <div
                            key={opt.id}
                            className="flex items-center gap-3"
                          >
                            <Checkbox
                              id={`webhook-management-01-${opt.id}`}
                              className="cursor-pointer"
                              defaultChecked={
                                "defaultChecked" in opt
                                  ? opt.defaultChecked
                                  : false
                              }
                            />
                            <Label
                              htmlFor={`webhook-management-01-${opt.id}`}
                              className="cursor-pointer font-normal"
                            >
                              <span dir="ltr">{opt.label}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FieldGroup>
                </CardContent>
                <CardFooter className="justify-end gap-3 border-t border-border/70 bg-muted/40 py-4">
                  <Button
                    type="button"
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => setIsAdding(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="button" className="cursor-pointer">
                    Save Endpoint
                  </Button>
                </CardFooter>
              </Card>
            ) : null}

            <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-soft">
              <CardHeader className="flex flex-col gap-4 border-b border-border/70 py-6 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Active Endpoints</CardTitle>
                <div className="relative w-full sm:w-64">
                  <SearchIcon
                    className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    placeholder="Search endpoints..."
                    aria-label="Search endpoints"
                    className="h-10 ps-9"
                    dir="ltr"
                  />
                </div>
              </CardHeader>

              <ul className="divide-y divide-border/70" role="list">
                {WEBHOOKS.map((webhook) => (
                  <li
                    key={webhook.id}
                    className="p-5 transition-colors hover:bg-muted/40"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                          <GlobeIcon className="size-5" aria-hidden />
                        </div>
                        <div className="min-w-0 text-start">
                          <div className="flex flex-wrap items-center gap-2">
                            <p
                              dir="ltr"
                              className="min-w-0 break-all text-sm font-medium text-foreground"
                            >
                              {webhook.url}
                            </p>
                            <Badge
                              variant={
                                webhook.status === "active"
                                  ? "secondary"
                                  : "destructive"
                              }
                              className={cn(
                                "capitalize",
                                webhook.status === "active" &&
                                  "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                              )}
                            >
                              {webhook.status}
                            </Badge>
                          </div>
                          <p
                            dir="ltr"
                            className="mt-1 font-mono text-xs text-muted-foreground"
                          >
                            {webhook.id}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="hidden h-8 cursor-pointer text-xs sm:inline-flex"
                        >
                          Test
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              className="size-8 cursor-pointer"
                              aria-label={`Actions for ${webhook.id}`}
                            >
                              <EllipsisVerticalIcon
                                className="size-4"
                                aria-hidden
                              />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="cursor-pointer">
                              <PencilIcon className="size-4" aria-hidden />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <CopyIcon className="size-4" aria-hidden />
                              Copy Secret
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              className="cursor-pointer"
                            >
                              <Trash2Icon className="size-4" aria-hidden />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="grid gap-4 ps-12 sm:grid-cols-3">
                      <div className="text-start">
                        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          Events
                        </p>
                        <p className="mt-1 text-xs font-medium text-foreground">
                          {webhook.events.length} subscribed
                        </p>
                      </div>
                      <div className="text-start">
                        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          Success Rate
                        </p>
                        <p
                          dir="ltr"
                          className="mt-1 text-xs font-medium tabular-nums text-foreground"
                        >
                          {webhook.successRate}
                        </p>
                      </div>
                      <div className="text-start">
                        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          Last Fired
                        </p>
                        <p className="mt-1 text-xs font-medium text-foreground">
                          {webhook.lastFired}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <aside className="min-w-0 lg:col-span-1">
            <Card className="sticky top-6 gap-0 overflow-hidden border-border/70 py-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/70 py-4">
                <CardTitle className="text-base">Recent Deliveries</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="size-8 cursor-pointer"
                  aria-label="Refresh"
                >
                  <RefreshCwIcon className="size-4" aria-hidden />
                </Button>
              </CardHeader>

              <ul className="divide-y divide-border/70" role="list">
                {LOGS.map((log) => {
                  const ok = log.status === 200
                  return (
                    <li key={log.id}>
                      <button
                        type="button"
                        className="w-full cursor-pointer p-4 text-start transition-colors hover:bg-muted/40"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            {ok ? (
                              <CheckCircle2Icon
                                className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                                aria-hidden
                              />
                            ) : (
                              <XCircleIcon
                                className="size-4 shrink-0 text-destructive"
                                aria-hidden
                              />
                            )}
                            <span
                              dir="ltr"
                              className="truncate text-sm font-medium text-foreground"
                            >
                              {log.event}
                            </span>
                          </div>
                          <Badge
                            variant={ok ? "secondary" : "destructive"}
                            className={cn(
                              ok &&
                                "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                            )}
                          >
                            <span dir="ltr">{log.status}</span>
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center justify-between ps-6 text-xs text-muted-foreground">
                          <span>{log.time}</span>
                          <span dir="ltr" className="tabular-nums">
                            {log.duration}
                          </span>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>

              <CardFooter className="border-t border-border/70 p-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-full cursor-pointer text-xs"
                >
                  View all logs
                </Button>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
