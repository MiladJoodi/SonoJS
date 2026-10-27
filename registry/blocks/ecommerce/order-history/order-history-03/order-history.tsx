"use client"

import * as React from "react"
import {
  FileTextIcon,
  RotateCcwIcon,
  SearchIcon,
  ShoppingBagIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import echoEleganceImg from "./images/echo-elegance.webp"
import facewashImg from "./images/facewash.webp"
import sunscreenImg from "./images/sunscreen.webp"
import sweaterImg from "./images/sweater.webp"
import tshirtImg from "./images/tshirt.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type OrderItem = {
  name: string
  qty: number
  image: string
  alt: string
}

type Order = {
  id: string
  status: string
  date: string
  totalPrice: string
  items: OrderItem[]
}

const ORDERS: Order[] = [
  {
    id: "3245",
    status: "Delivered",
    date: "May 12, 2025 at 12:30 PM",
    totalPrice: "248.75",
    items: [
      {
        name: "Tshirt",
        qty: 1,
        image: assetSrc(tshirtImg),
        alt: "Dark green t-shirt",
      },
      {
        name: "Echo Elegance",
        qty: 1,
        image: assetSrc(echoEleganceImg),
        alt: "Echo Elegance product",
      },
      {
        name: "Smart Watch Timex",
        qty: 1,
        image: assetSrc(watchImg),
        alt: "Smart Watch Timex",
      },
    ],
  },
  {
    id: "8651",
    status: "Delivered",
    date: "May 16, 2025 at 10:30 AM",
    totalPrice: "208.00",
    items: [
      {
        name: "Organic Sunscreen",
        qty: 1,
        image: assetSrc(sunscreenImg),
        alt: "Organic sunscreen",
      },
      {
        name: "Facewash",
        qty: 1,
        image: assetSrc(facewashImg),
        alt: "Face wash",
      },
      {
        name: "Sweater",
        qty: 1,
        image: assetSrc(sweaterImg),
        alt: "Purple sweater",
      },
    ],
  },
]

const FILTERS = ["All Orders", "Completed", "Processing", "Cancelled"] as const

type Filter = (typeof FILTERS)[number]

const SORTS = [
  "Newest first",
  "Oldest first",
  "Highest total",
  "Lowest total",
] as const

type Sort = (typeof SORTS)[number]

export default function OrderHistory({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("")
  const [filter, setFilter] = React.useState<Filter>("All Orders")
  const [sort, setSort] = React.useState<Sort>("Newest first")

  const q = query.trim().toLowerCase()
  let visible = ORDERS.filter((order) => {
    if (filter !== "All Orders") {
      const statusMatch =
        filter === "Completed"
          ? order.status === "Delivered" || order.status === "Completed"
          : order.status === filter
      if (!statusMatch) return false
    }
    if (!q) return true
    return (
      order.id.toLowerCase().includes(q) ||
      order.items.some((item) => item.name.toLowerCase().includes(q))
    )
  })

  visible = [...visible].sort((a, b) => {
    const priceA = Number(a.totalPrice)
    const priceB = Number(b.totalPrice)
    if (sort === "Oldest first") return a.id.localeCompare(b.id)
    if (sort === "Highest total") return priceB - priceA
    if (sort === "Lowest total") return priceA - priceB
    return b.id.localeCompare(a.id)
  })

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-8 sm:py-10 md:px-8 md:py-14",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-white shadow-soft dark:bg-card">
          <div className="border-b border-border/70 bg-muted/30 px-4 py-5 sm:px-5 sm:py-6 md:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
              <div className="min-w-0">
                <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
                  Fulfillment
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                  Shipment board
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Multi-item deliveries with quick reorder and invoice access.
                </p>
              </div>
              <form
                className="w-full lg:max-w-sm"
                role="search"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative">
                  <SearchIcon
                    className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <label htmlFor="order-search-03" className="sr-only">
                    Search orders
                  </label>
                  <input
                    type="search"
                    id="order-search-03"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search order or product…"
                    className="h-[46px] w-full rounded-md border border-border/70 bg-white pe-3 ps-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring dark:bg-background"
                  />
                </div>
              </form>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-border/70 pt-5 sm:mt-6 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter orders"
              >
                {FILTERS.map((status) => {
                  const active = filter === status
                  return (
                    <Button
                      key={status}
                      type="button"
                      size="sm"
                      variant="outline"
                      aria-pressed={active}
                      onClick={() => setFilter(status)}
                      className={cn(
                        "shrink-0 shadow-none transition-colors",
                        active &&
                          "border-primary bg-primary !text-white hover:bg-primary/90 hover:!text-white hover:border-primary"
                      )}
                    >
                      {status}
                    </Button>
                  )
                })}
              </div>
              <div className="w-full sm:ms-auto sm:w-auto">
                <label htmlFor="sort-orders-03" className="sr-only">
                  Sort orders
                </label>
                <select
                  id="sort-orders-03"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="h-10 w-full cursor-pointer appearance-none rounded-md border border-border/70 bg-white px-3.5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-[11rem] dark:bg-background"
                >
                  {SORTS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <ul className="divide-y divide-border/70">
            {visible.map((order) => (
              <li key={order.id} className="p-4 sm:p-5 md:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h2 className="text-base font-semibold text-foreground">
                        Order #{order.id}
                      </h2>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        <span
                          className="size-1.5 rounded-full bg-emerald-500"
                          aria-hidden
                        />
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Placed {order.date}
                    </p>
                  </div>
                  <div className="sm:text-end">
                    <p className="text-xl font-semibold tracking-tight text-foreground">
                      ${order.totalPrice}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.items.length} line items
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-2 sm:mt-6 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {order.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 rounded-md border border-border/70 bg-canvas/50 p-3 dark:bg-background/40"
                    >
                      <div className="size-12 shrink-0 overflow-hidden rounded-md bg-muted p-1 sm:size-14">
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Qty {item.qty}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2 sm:mt-6 sm:flex sm:flex-wrap">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <ShoppingBagIcon className="size-3.5" aria-hidden />
                    View details
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <RotateCcwIcon className="size-3.5" aria-hidden />
                    Reorder
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <FileTextIcon className="size-3.5" aria-hidden />
                    Invoice
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {visible.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No shipments match this search.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
