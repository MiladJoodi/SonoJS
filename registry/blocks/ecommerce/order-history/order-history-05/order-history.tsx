"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import echoEleganceImg from "./images/echo-elegance.webp"
import sunscreenImg from "./images/sunscreen.webp"
import tshirtImg from "./images/tshirt.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type OrderStatus = "Completed" | "Pending" | "Cancelled"

type Order = {
  id: string
  product: string
  image: string
  alt: string
  status: OrderStatus
  total: string
}

const ORDERS: Order[] = [
  {
    id: "#5381",
    product: "Tshirt",
    image: assetSrc(tshirtImg),
    alt: "Dark green t-shirt",
    status: "Completed",
    total: "$20.00",
  },
  {
    id: "#5381",
    product: "Echo Elegance",
    image: assetSrc(echoEleganceImg),
    alt: "Echo Elegance product",
    status: "Pending",
    total: "$20.00",
  },
  {
    id: "#5381",
    product: "Smart Watch Timex",
    image: assetSrc(watchImg),
    alt: "Smart Watch Timex",
    status: "Completed",
    total: "$30.00",
  },
  {
    id: "#83112",
    product: "Sunscreen",
    image: assetSrc(sunscreenImg),
    alt: "Sunscreen bottle",
    status: "Cancelled",
    total: "$16.00",
  },
]

const TABS = [
  { label: "All Order", count: 10 },
  { label: "Pending", count: 2 },
  { label: "Completed", count: 6 },
  { label: "Cancelled", count: 2 },
] as const

type TabLabel = (typeof TABS)[number]["label"]

function statusClass(status: OrderStatus) {
  if (status === "Completed") {
    return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
  }
  if (status === "Pending") {
    return "bg-amber-500/15 text-amber-700 dark:text-amber-400"
  }
  return "bg-destructive/10 text-destructive dark:bg-destructive/20"
}

export default function OrderHistory({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [activeTab, setActiveTab] = React.useState<TabLabel>("All Order")

  const visible =
    activeTab === "All Order"
      ? ORDERS
      : ORDERS.filter((order) => order.status === activeTab)

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
          <div className="flex flex-col gap-4 border-b border-border/70 px-4 py-5 sm:gap-6 sm:px-5 sm:py-6 md:flex-row md:items-end md:justify-between md:px-8">
            <div className="min-w-0">
              <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
                Console
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                Order console
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Segment by status, then open invoice or order details.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-full sm:w-auto"
              >
                View invoice
              </Button>
              <Button type="button" size="sm" className="w-full sm:w-auto">
                View order
              </Button>
            </div>
          </div>

          <div className="border-b border-border/70 px-2 md:px-4">
            <nav
              aria-label="Order status filter"
              className="-mb-px flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TABS.map((tab) => {
                const active = activeTab === tab.label
                return (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActiveTab(tab.label)}
                    className={cn(
                      "shrink-0 cursor-pointer border-b-2 px-3 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4",
                      active
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.label}
                    <span
                      className={cn(
                        "ms-2 rounded-full px-1.5 py-0.5 text-[11px] font-medium tabular-nums",
                        active
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Mobile cards */}
          <ul className="divide-y divide-border/70 md:hidden">
            {visible.map((order, index) => (
              <li
                key={`${order.id}-${order.product}-${index}`}
                className="space-y-4 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="size-14 shrink-0 overflow-hidden rounded-md bg-muted p-1.5">
                    <img
                      src={order.image}
                      alt={order.alt}
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold break-words text-foreground">
                      {order.product}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {order.id}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                          statusClass(order.status)
                        )}
                      >
                        {order.status}
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-foreground">
                        {order.total}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  View details
                </Button>
              </li>
            ))}
          </ul>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px]">
              <caption className="sr-only">Order history table</caption>
              <thead>
                <tr className="border-b border-border/70 text-start text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  <th scope="col" className="px-5 py-3.5 md:px-8">
                    Product
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Total
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-end md:px-8">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {visible.map((order, index) => (
                  <tr
                    key={`${order.id}-${order.product}-${index}`}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <td className="px-5 py-4 md:px-8">
                      <div className="flex items-center gap-4">
                        <div className="size-16 shrink-0 overflow-hidden rounded-md bg-muted p-1.5">
                          <img
                            src={order.image}
                            alt={order.alt}
                            className="size-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground">
                            {order.product}
                          </p>
                          <p className="mt-1 font-mono text-xs text-muted-foreground">
                            {order.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                          statusClass(order.status)
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold tabular-nums text-foreground">
                      {order.total}
                    </td>
                    <td className="px-5 py-4 text-end md:px-8">
                      <Button type="button" size="sm" variant="outline">
                        View details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visible.length === 0 ? (
            <p className="py-14 text-center text-sm text-muted-foreground">
              No rows in this segment.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
