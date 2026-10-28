"use client"

import * as React from "react"
import {
  BarChart3Icon,
  CheckIcon,
  CreditCardIcon,
  ExternalLinkIcon,
  GitBranchIcon,
  MessageSquareIcon,
  SearchIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { Separator } from "@sonojs/ui/components/separator"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@/lib/utils"

type App = {
  id: string
  name: string
  category: string
  description: string
  logo: React.ElementType
  connected: boolean
  enabled: boolean
  scopes: { id: string; label: string; description: string }[]
}

const APPS: App[] = [
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description:
      "Post workspace alerts and digests into the channels your team already watches.",
    logo: MessageSquareIcon,
    connected: true,
    enabled: true,
    scopes: [
      {
        id: "channels",
        label: "Post to channels",
        description: "Send messages to selected public channels.",
      },
      {
        id: "mentions",
        label: "Mention members",
        description: "Notify people when an alert needs attention.",
      },
      {
        id: "history",
        label: "Read channel history",
        description: "Optional — used only for threaded replies.",
      },
    ],
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    description:
      "Sync customers, invoices, and subscription events into Sono billing views.",
    logo: CreditCardIcon,
    connected: true,
    enabled: true,
    scopes: [
      {
        id: "customers",
        label: "Read customers",
        description: "List and look up customer records.",
      },
      {
        id: "invoices",
        label: "Read invoices",
        description: "Pull invoice status and amounts.",
      },
      {
        id: "webhooks",
        label: "Receive events",
        description: "Listen for payment and subscription updates.",
      },
    ],
  },
  {
    id: "github",
    name: "GitHub",
    category: "Development",
    description:
      "Link pull requests, deploy status, and repo activity to your workspace.",
    logo: GitBranchIcon,
    connected: true,
    enabled: false,
    scopes: [
      {
        id: "repos",
        label: "Repository metadata",
        description: "Read names, default branches, and visibility.",
      },
      {
        id: "prs",
        label: "Pull requests",
        description: "Track open PRs and review state.",
      },
      {
        id: "checks",
        label: "Checks & deploys",
        description: "Surface CI and deployment conclusions.",
      },
    ],
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    category: "Analytics",
    description:
      "Forward product events so funnels and retention stay in sync with Sono.",
    logo: BarChart3Icon,
    connected: false,
    enabled: false,
    scopes: [
      {
        id: "export",
        label: "Export events",
        description: "Send selected event types to Mixpanel.",
      },
      {
        id: "identify",
        label: "Identify users",
        description: "Map workspace members to Mixpanel people.",
      },
      {
        id: "groups",
        label: "Group analytics",
        description: "Attribute activity to workspaces and plans.",
      },
    ],
  },
]

export default function Integrations({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [apps, setApps] = React.useState(APPS)
  const [query, setQuery] = React.useState("")
  const [connectedOnly, setConnectedOnly] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState(APPS[0].id)

  const filtered = apps.filter((app) => {
    if (connectedOnly && !app.connected) return false
    if (!query) return true
    const q = query.toLowerCase()
    return (
      app.name.toLowerCase().includes(q) ||
      app.category.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q)
    )
  })

  const selected =
    filtered.find((a) => a.id === selectedId) ?? filtered[0] ?? null

  const Icon = selected?.logo

  function patchApp(id: string, patch: Partial<App>) {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...patch } : app))
    )
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-label="Integration detail studio"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col border-b border-border/70 lg:border-b-0 lg:border-e">
          <div className="space-y-3 border-b border-border/70 p-4">
            <div className="text-start">
              <p className="text-sm font-semibold">Integrations</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Pick an app to review scopes and connection state.
              </p>
            </div>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <SearchIcon className="size-4" aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps…"
                aria-label="Search apps"
              />
            </InputGroup>
            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
              <Switch
                checked={connectedOnly}
                onCheckedChange={setConnectedOnly}
                className="cursor-pointer"
                aria-label="Show connected only"
              />
              Connected only
            </label>
          </div>

          <ul className="max-h-72 overflow-y-auto p-2 lg:max-h-112">
            {filtered.length === 0 ? (
              <li className="px-3 py-8 text-center text-sm text-muted-foreground">
                No apps match.
              </li>
            ) : (
              filtered.map((app) => {
                const AppIcon = app.logo
                const active = selected?.id === app.id
                return (
                  <li key={app.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(app.id)}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-start transition-colors",
                        active
                          ? "bg-primary/10 text-foreground"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <AppIcon className="size-4" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {app.name}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {app.category}
                        </span>
                      </span>
                      {app.connected ? (
                        <Badge
                          variant="secondary"
                          className="shrink-0 border-transparent bg-emerald-500/15 text-[10px] font-medium text-emerald-700 dark:text-emerald-400"
                        >
                          On
                        </Badge>
                      ) : null}
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </aside>

        <div className="flex min-w-0 flex-col">
          {selected && Icon ? (
            <>
              <header className="flex flex-col gap-4 border-b border-border/70 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                <div className="flex min-w-0 items-start gap-3 text-start">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-muted text-muted-foreground">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-lg font-semibold tracking-tight">
                        {selected.name}
                      </h1>
                      {selected.connected ? (
                        <Badge className="gap-1 border-transparent bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400">
                          <CheckIcon className="size-3" aria-hidden />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Not connected</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selected.category}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {selected.description}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {selected.connected ? (
                    <>
                      <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border/70 px-3 py-2 text-sm">
                        <Switch
                          checked={selected.enabled}
                          onCheckedChange={(v) =>
                            patchApp(selected.id, { enabled: v })
                          }
                          className="cursor-pointer"
                          aria-label={`Enable ${selected.name}`}
                        />
                        Enabled
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                      >
                        Configure
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() =>
                        patchApp(selected.id, {
                          connected: true,
                          enabled: true,
                        })
                      }
                    >
                      Connect
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 cursor-pointer"
                    aria-label={`${selected.name} docs`}
                  >
                    <ExternalLinkIcon className="size-4" aria-hidden />
                  </Button>
                </div>
              </header>

              <div className="flex-1 p-5 sm:p-6">
                <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Permissions
                </p>
                <ul className="space-y-0 rounded-[12px] border border-border/70">
                  {selected.scopes.map((scope, index) => (
                    <li key={scope.id}>
                      {index > 0 ? <Separator /> : null}
                      <div className="flex items-start gap-3 px-4 py-3 text-start">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <CheckIcon className="size-3" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{scope.label}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {scope.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {selected.connected ? (
                  <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() =>
                        patchApp(selected.id, {
                          connected: false,
                          enabled: false,
                        })
                      }
                    >
                      Disconnect
                    </Button>
                    <Button type="button" className="cursor-pointer">
                      Save changes
                    </Button>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-10 text-sm text-muted-foreground">
              Select an integration to inspect.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
