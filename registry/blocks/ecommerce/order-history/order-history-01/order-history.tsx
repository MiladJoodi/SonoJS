"use client"

import * as React from "react"
import { PackageIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import echoEleganceImg from "./images/echo-elegance.webp"
import sunscreenImg from "./images/sunscreen.webp"
import tshirtImg from "./images/tshirt.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type OrderStatus = "Completed" | "Processing" | "Cancelled"

type Order = {
  id: string
  name: string
  date: string
  price: string
  status: OrderStatus
  image: string
  alt: string
}

const ORDERS: Order[] = [
  {
    id: "#5381",
    name: "T-shirt",
    date: "May 12, 2025",
    price: "$20.00",
    status: "Completed",
    image: assetSrc(tshirtImg),
    alt: "Dark green t-shirt",
  },
  {
    id: "#9515",
    name: "Echo Elegance",
    date: "April 22, 2025",
    price: "$24.00",
    status: "Processing",
    image: assetSrc(echoEleganceImg),
    alt: "Echo Elegance product",
  },
  {
    id: "#8362",
    name: "Smart Watch Timex",
    date: "May 7, 2025",
    price: "$20.00",
    status: "Cancelled",
    image: assetSrc(watchImg),
    alt: "Smart Watch Timex",
  },
  {
    id: "#8195",
    name: "Sunscreen",
    date: "May 10, 2025",
    price: "$20.00",
    status: "Completed",
    image: assetSrc(sunscreenImg),
    alt: "Sunscreen bottle",
  },
]

const FILTERS = ["All orders", "Completed", "Processing", "Cancelled"] as const

type Filter = (typeof FILTERS)[number]

function statusTone(status: OrderStatus) {
  if (status === "Completed") {
    return {
      pill: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
      dot: "bg-emerald-500",
    }
  }
  if (status === "Processing") {
    return {
      pill: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
      dot: "bg-sky-500",
    }
  }
  return {
    pill: "bg-destructive/10 text-destructive dark:bg-destructive/20",
    dot: "bg-destructive",
  }
}

export default function OrderHistory({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [filter, setFilter] = React.useState<Filter>("All orders")

  const visible =
    filter === "All orders"
      ? ORDERS
      : ORDERS.filter((order) => order.status === filter)

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-8 sm:py-10 md:px-8 md:py-14",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
              Account
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Order timeline
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              A quiet chronology of purchases, deliveries, and returns.
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <label htmlFor="order-filter-01" className="sr-only">
              Filter orders
            </label>
            <select
              id="order-filter-01"
              value={filter}
              onChange={(e) => setFilter(e.target.value as Filter)}
              className="h-10 w-full cursor-pointer appearance-none rounded-md border border-border/70 bg-white px-3.5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto dark:bg-card"
            >
              {FILTERS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </header>

        <ol className="mt-8 sm:mt-10">
          {visible.map((order, index) => {
            const tone = statusTone(order.status)
            const isLast = index === visible.length - 1
            return (
              <li key={order.id} className="flex gap-3 sm:gap-6">
                <div className="flex w-3 shrink-0 flex-col items-center sm:w-4">
                  <span
                    className={cn(
                      "mt-6 size-3 shrink-0 rounded-full ring-4 ring-canvas sm:mt-7 sm:size-3.5",
                      tone.dot
                    )}
                    aria-hidden
                  />
                  {!isLast ? (
                    <span
                      className="mt-2 w-px flex-1 bg-border/70"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <article
                  className={cn(
                    "min-w-0 flex-1 overflow-hidden rounded-[12px] border border-border/70 bg-white shadow-soft dark:bg-card",
                    !isLast && "mb-4 sm:mb-6"
                  )}
                >
                  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
                    <div className="flex items-start gap-3 sm:contents">
                      <div className="size-16 shrink-0 overflow-hidden rounded-md bg-muted p-1.5 sm:size-20 sm:p-2">
                        <img
                          src={order.image}
                          alt={order.alt}
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1 sm:contents">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-base font-semibold text-foreground">
                              {order.name}
                            </h2>
                            <span
                              className={cn(
                                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                                tone.pill
                              )}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm text-muted-foreground">
                            {order.date}
                            <span className="mx-2 text-border">·</span>
                            Order {order.id}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-2 sm:mt-0 sm:flex-col sm:items-end sm:gap-1">
                          <PackageIcon
                            className="size-4 text-muted-foreground sm:hidden"
                            aria-hidden
                          />
                          <p className="text-lg font-semibold tracking-tight text-foreground">
                            {order.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No orders on this timeline.
          </p>
        ) : null}
      </div>
    </div>
  )
}
