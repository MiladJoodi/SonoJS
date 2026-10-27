"use client"

import * as React from "react"
import { EyeIcon, RotateCcwIcon, XIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import echoEleganceImg from "./images/echo-elegance.webp"
import sunscreenImg from "./images/sunscreen.webp"
import tshirtImg from "./images/tshirt.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type OrderStatus = "Completed" | "Processing" | "Cancelled"

type PrimaryAction = {
  label: string
  tone: "primary" | "destructive"
}

type Order = {
  id: string
  name: string
  date: string
  price: string
  status: OrderStatus
  image: string
  alt: string
  primaryAction: PrimaryAction
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
    primaryAction: { label: "Buy again", tone: "primary" },
  },
  {
    id: "#9515",
    name: "Echo Elegance",
    date: "April 22, 2025",
    price: "$24.00",
    status: "Processing",
    image: assetSrc(echoEleganceImg),
    alt: "Echo Elegance product",
    primaryAction: { label: "Cancel", tone: "destructive" },
  },
  {
    id: "#8362",
    name: "Smart Watch Timex",
    date: "May 7, 2025",
    price: "$20.00",
    status: "Cancelled",
    image: assetSrc(watchImg),
    alt: "Smart Watch Timex",
    primaryAction: { label: "Buy again", tone: "primary" },
  },
  {
    id: "#8195",
    name: "Sunscreen",
    date: "May 10, 2025",
    price: "$20.00",
    status: "Completed",
    image: assetSrc(sunscreenImg),
    alt: "Sunscreen bottle",
    primaryAction: { label: "Buy again", tone: "primary" },
  },
]

const FILTERS = ["All orders", "Completed", "Processing", "Cancelled"] as const

type Filter = (typeof FILTERS)[number]

function statusClass(status: OrderStatus) {
  if (status === "Completed") {
    return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
  }
  if (status === "Processing") {
    return "bg-sky-500/15 text-sky-700 dark:text-sky-400"
  }
  return "bg-destructive/10 text-destructive dark:bg-destructive/20"
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
        "w-full bg-white px-4 py-8 sm:py-10 md:px-8 md:py-14 dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl">
        <header className="flex flex-col gap-4 border-b border-border/70 pb-5 sm:gap-6 sm:pb-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Your purchases
            </h1>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Reorder favorites or cancel in-flight packages without leaving
              this list.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <span className="text-sm text-muted-foreground">
              {visible.length} shown
            </span>
            <label htmlFor="order-filter-02" className="sr-only">
              Filter orders
            </label>
            <select
              id="order-filter-02"
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

        <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
          {visible.map((order) => (
            <li
              key={order.id}
              className="grid gap-4 rounded-[12px] border border-border/70 bg-canvas/60 p-4 sm:gap-5 sm:p-5 md:grid-cols-[1fr_auto] md:items-center dark:bg-card/40"
            >
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <div className="size-16 shrink-0 overflow-hidden rounded-md border border-border/70 bg-white p-1.5 sm:size-[4.5rem] dark:bg-card">
                  <img
                    src={order.image}
                    alt={order.alt}
                    className="size-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold break-words text-foreground">
                      {order.name}
                    </h2>
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-[12px] font-medium",
                        statusClass(order.status)
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:flex sm:flex-wrap sm:gap-x-8">
                    <div className="min-w-0">
                      <dt className="text-muted-foreground">Order</dt>
                      <dd className="mt-0.5 font-medium break-all text-foreground">
                        {order.id}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Placed</dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {order.date}
                      </dd>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <dt className="text-muted-foreground">Total</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">
                        {order.price}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 md:flex md:w-[8.5rem] md:flex-col md:items-stretch">
                <Button
                  type="button"
                  size="sm"
                  variant={
                    order.primaryAction.tone === "destructive"
                      ? "destructive"
                      : "default"
                  }
                  className="w-full"
                >
                  {order.primaryAction.tone === "destructive" ? (
                    <XIcon className="size-3.5" aria-hidden />
                  ) : (
                    <RotateCcwIcon className="size-3.5" aria-hidden />
                  )}
                  {order.primaryAction.label}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  <EyeIcon className="size-3.5" aria-hidden />
                  View
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No purchases match this filter.
          </p>
        ) : null}
      </div>
    </div>
  )
}
