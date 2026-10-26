"use client"

import * as React from "react"
import {
  PackageCheckIcon,
  PackageIcon,
  TruckIcon,
  WarehouseIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

type Status = "Processing" | "Shipped" | "Delivered"

type Order = {
  id: string
  customer: string
  initials: string
  items: number
  total: string
  placed: string
  status: Status
}

const allOrders: Order[] = [
  {
    id: "#4821",
    customer: "Nora Blake",
    initials: "NB",
    items: 3,
    total: "$128.00",
    placed: "12m ago",
    status: "Processing",
  },
  {
    id: "#4820",
    customer: "Omar Haddad",
    initials: "OH",
    items: 1,
    total: "$64.50",
    placed: "1h ago",
    status: "Shipped",
  },
  {
    id: "#4819",
    customer: "Elena Voss",
    initials: "EV",
    items: 4,
    total: "$210.00",
    placed: "Yesterday",
    status: "Delivered",
  },
  {
    id: "#4818",
    customer: "Kenji Sato",
    initials: "KS",
    items: 2,
    total: "$42.00",
    placed: "Yesterday",
    status: "Processing",
  },
]

const filters = [
  {
    value: "all",
    label: "All",
    icon: PackageIcon,
    rows: allOrders,
  },
  {
    value: "processing",
    label: "Processing",
    icon: WarehouseIcon,
    rows: allOrders.filter((o) => o.status === "Processing"),
  },
  {
    value: "shipped",
    label: "Shipped",
    icon: TruckIcon,
    rows: allOrders.filter((o) => o.status === "Shipped"),
  },
  {
    value: "delivered",
    label: "Delivered",
    icon: PackageCheckIcon,
    rows: allOrders.filter((o) => o.status === "Delivered"),
  },
] as const

type OrderFilter = (typeof filters)[number]["value"]

const triggerClass = cn(
  "relative top-px h-auto min-h-11 flex-none flex-col gap-0.5 rounded-none border-0 border-b-2 border-transparent",
  "bg-transparent px-3 py-2.5 text-muted-foreground shadow-none after:hidden after:opacity-0",
  "hover:text-foreground",
  "data-[state=active]:border-primary data-[state=active]:bg-transparent",
  "data-[state=active]:text-foreground data-[state=active]:shadow-none"
)

function statusTone(status: Status) {
  if (status === "Processing") {
    return "bg-amber-500/15 text-amber-700 dark:text-amber-300"
  }
  if (status === "Shipped") {
    return "bg-sky-500/15 text-sky-700 dark:text-sky-300"
  }
  return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
}

function OrderList({ rows }: { rows: Order[] }) {
  return (
    <ul className="h-full divide-y divide-border/70 overflow-hidden rounded-[12px] border border-border/70 bg-canvas/40">
      {rows.map((order) => (
        <li key={order.id}>
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 px-3 py-3 text-start transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar className="size-9 shrink-0">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {order.initials}
              </AvatarFallback>
            </Avatar>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
                  {order.customer}
                </span>
                <span
                  className={cn(
                    "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
                    statusTone(order.status)
                  )}
                >
                  {order.status}
                </span>
              </span>
              <span className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-xs text-muted-foreground">
                <span className="shrink-0 font-mono">{order.id}</span>
                <span aria-hidden className="opacity-50">
                  ·
                </span>
                <span className="shrink-0 tabular-nums font-medium text-foreground">
                  {order.total}
                </span>
                <span aria-hidden className="opacity-50">
                  ·
                </span>
                <span className="truncate">{order.placed}</span>
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [filter, setFilter] = React.useState<OrderFilter>("all")
  const active = filters.find((f) => f.value === filter) ?? filters[0]
  const queuedTotal = allOrders
    .filter((o) => o.status !== "Delivered")
    .reduce((sum, o) => sum + Number(o.total.replace(/[$,]/g, "")), 0)

  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-2xl overflow-x-clip rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 md:p-6",
        className
      )}
      {...props}
    >
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as OrderFilter)}
        className="min-w-0 w-full gap-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <h3 className="text-h4 text-foreground">Fulfillment</h3>
            <p className="text-sm text-muted-foreground">
              {`Last 7 days · $${queuedTotal.toFixed(2)} still in queue`}
            </p>
          </div>
          <Button variant="outline" className="h-10 rounded-[12px]">
            Export CSV
          </Button>
        </div>

        <TabsList
          aria-label="Order status"
          className="no-scrollbar h-auto w-full min-w-0 justify-start gap-0 overflow-x-auto overflow-y-hidden rounded-none border-b border-border/70 bg-transparent p-0"
        >
          {filters.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={triggerClass}
            >
              <span className="flex items-center gap-1.5 text-sm font-medium whitespace-nowrap">
                <item.icon aria-hidden className="size-3.5 shrink-0 opacity-70" />
                {item.label}
              </span>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  filter === item.value
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.rows.length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Sizer = full queue height so status filters don’t collapse the card. */}
        <div className="relative">
          <div className="invisible" aria-hidden>
            <OrderList rows={allOrders} />
          </div>
          <div className="absolute inset-0">
            <OrderList rows={active.rows} />
          </div>
        </div>
      </Tabs>
    </div>
  )
}
