"use client"

import * as React from "react"
import {
  BarChart3Icon,
  BellIcon,
  CalendarIcon,
  CheckIcon,
  CloudIcon,
  CreditCardIcon,
  DatabaseIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitBranchIcon,
  MailIcon,
  MessageSquareIcon,
  PlusIcon,
  SearchIcon,
  ZapIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  "All",
  "Analytics",
  "Communication",
  "Payments",
  "Storage",
  "Development",
  "Productivity",
] as const

type Category = (typeof CATEGORIES)[number]

type Integration = {
  id: string
  name: string
  description: string
  category: Exclude<Category, "All">
  logo: React.ElementType
  popular?: boolean
  connected?: boolean
}

const INTEGRATIONS: Integration[] = [
  {
    id: "1",
    name: "Mixpanel",
    description: "Event-based product analytics and funnel analysis.",
    category: "Analytics",
    logo: BarChart3Icon,
    popular: true,
    connected: true,
  },
  {
    id: "2",
    name: "Segment",
    description: "Customer data platform for unified event tracking.",
    category: "Analytics",
    logo: BarChart3Icon,
  },
  {
    id: "3",
    name: "Mailchimp",
    description: "Email marketing campaigns and audience segmentation.",
    category: "Communication",
    logo: MailIcon,
    popular: true,
  },
  {
    id: "4",
    name: "Slack",
    description: "Team messaging with notification and alert webhooks.",
    category: "Communication",
    logo: MessageSquareIcon,
    connected: true,
  },
  {
    id: "5",
    name: "Intercom",
    description: "Customer messaging and live chat support widget.",
    category: "Communication",
    logo: MessageSquareIcon,
  },
  {
    id: "6",
    name: "Stripe",
    description: "Accept payments and manage subscriptions globally.",
    category: "Payments",
    logo: CreditCardIcon,
    popular: true,
    connected: true,
  },
  {
    id: "7",
    name: "Paddle",
    description: "Merchant of record payments for SaaS businesses.",
    category: "Payments",
    logo: CreditCardIcon,
  },
  {
    id: "8",
    name: "AWS S3",
    description: "Scalable object storage for files and media assets.",
    category: "Storage",
    logo: CloudIcon,
    popular: true,
  },
  {
    id: "9",
    name: "Supabase",
    description: "Open-source Postgres with realtime and auth.",
    category: "Storage",
    logo: DatabaseIcon,
  },
  {
    id: "10",
    name: "GitHub",
    description: "Source control, CI/CD workflows, and code reviews.",
    category: "Development",
    logo: GitBranchIcon,
    connected: true,
  },
  {
    id: "11",
    name: "Vercel",
    description: "Deploy and scale frontend apps with zero config.",
    category: "Development",
    logo: ZapIcon,
  },
  {
    id: "12",
    name: "PagerDuty",
    description: "On-call scheduling and incident response automation.",
    category: "Development",
    logo: BellIcon,
  },
  {
    id: "13",
    name: "Notion",
    description: "All-in-one workspace for docs, wikis, and projects.",
    category: "Productivity",
    logo: FileTextIcon,
  },
  {
    id: "14",
    name: "Google Cal",
    description: "Calendar sync for scheduling and event management.",
    category: "Productivity",
    logo: CalendarIcon,
  },
]

function IntegrationCard({
  integration,
  onConnectedChange,
}: {
  integration: Integration
  onConnectedChange: (id: string, connected: boolean) => void
}) {
  const [connected, setConnected] = React.useState(
    integration.connected ?? false
  )
  const Icon = integration.logo

  return (
    <article className="group flex h-full flex-col rounded-[12px] border border-border/70 bg-card p-5 shadow-soft transition-colors hover:border-primary/20">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex size-12 items-center justify-center rounded-[12px] bg-muted text-muted-foreground">
          <Icon className="size-6" aria-hidden />
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {integration.popular ? (
            <Badge className="border-transparent bg-amber-500/15 font-medium text-amber-700 dark:text-amber-400">
              Popular
            </Badge>
          ) : null}
          {connected ? (
            <Badge className="gap-1 border-transparent bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400">
              <CheckIcon className="size-3" aria-hidden />
              Connected
            </Badge>
          ) : null}
        </div>
      </div>

      <h3 className="mb-1.5 text-sm font-semibold">{integration.name}</h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {integration.description}
      </p>

      <div className="flex gap-2">
        <Button
          type="button"
          variant={connected ? "outline" : "default"}
          size="sm"
          className="flex-1 cursor-pointer justify-center"
          onClick={() => {
            setConnected((v) => {
              const next = !v
              onConnectedChange(integration.id, next)
              return next
            })
          }}
        >
          {connected ? "Disconnect" : "Connect"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="cursor-pointer"
          aria-label={`View ${integration.name} docs`}
        >
          <ExternalLinkIcon className="size-4" aria-hidden />
        </Button>
      </div>
    </article>
  )
}

export default function Integrations01() {
  const [activeCategory, setActiveCategory] = React.useState<Category>("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [connectedIds, setConnectedIds] = React.useState(
    () => new Set(INTEGRATIONS.filter((i) => i.connected).map((i) => i.id))
  )

  const filtered = INTEGRATIONS.filter((i) => {
    if (activeCategory !== "All" && i.category !== activeCategory) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (
        !i.name.toLowerCase().includes(q) &&
        !i.description.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  return (
    <div className="min-h-svh bg-canvas text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <Badge
            variant="secondary"
            className="border-transparent bg-primary/10 font-semibold text-primary"
          >
            {connectedIds.size} active integrations
          </Badge>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight">
            Connect your favourite tools
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Connect the tools your team already uses. Sync in one click and keep
            data flowing across your stack.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="w-full max-w-sm flex-1">
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <SearchIcon className="size-4" aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search integrations…"
                aria-label="Search integrations"
              />
            </InputGroup>
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Categories"
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    active
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "border border-border/70 bg-card text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  {cat}
                  {cat === "All" ? (
                    <span className="ms-1.5 opacity-60">
                      ({INTEGRATIONS.length})
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[12px] border border-dashed border-border/70 bg-card p-16 text-center shadow-soft">
            <SearchIcon
              className="mx-auto mb-4 size-12 text-muted-foreground/30"
              aria-hidden
            />
            <h2 className="mb-2 text-lg font-semibold">No integrations found</h2>
            <p className="text-sm text-muted-foreground">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((integration) => (
              <li key={integration.id}>
                <IntegrationCard
                  integration={integration}
                  onConnectedChange={(id, next) => {
                    setConnectedIds((prev) => {
                      const copy = new Set(prev)
                      if (next) copy.add(id)
                      else copy.delete(id)
                      return copy
                    })
                  }}
                />
              </li>
            ))}

            <li>
              <div className="group flex h-full min-h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-[12px] border-2 border-dashed border-border/70 bg-card p-8 text-center transition-colors hover:border-primary/30 hover:bg-primary/5">
                <div className="flex size-12 items-center justify-center rounded-[12px] border-2 border-dashed border-border/70 transition-colors group-hover:border-primary/30">
                  <PlusIcon
                    className="size-6 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden
                  />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold transition-colors group-hover:text-primary">
                    Request integration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Don&apos;t see what you need? Let us know.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                >
                  Submit request
                </Button>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
