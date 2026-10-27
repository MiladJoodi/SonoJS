"use client"

import * as React from "react"
import { FileTextIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import echoEleganceImg from "./images/echo-elegance.webp"
import sunscreenImg from "./images/sunscreen.webp"
import tshirtImg from "./images/tshirt.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type ItemStatus = "Completed" | "Processing" | "Cancelled"

type OrderItem = {
  name: string
  image: string
  alt: string
  deliveryDate: string
  status: ItemStatus
  price: string
}

type Order = {
  id: string
  purchaseDate: string
  totalPaid: string
  items: OrderItem[]
}

const ORDERS: Order[] = [
  {
    id: "OR981122",
    purchaseDate: "May 05, 2025",
    totalPaid: "$78.00",
    items: [
      {
        name: "Tshirt",
        image: assetSrc(tshirtImg),
        alt: "Dark green t-shirt",
        deliveryDate: "May 12, 2025",
        status: "Completed",
        price: "$24.00",
      },
      {
        name: "Echo Elegance",
        image: assetSrc(echoEleganceImg),
        alt: "Echo Elegance product",
        deliveryDate: "April 22, 2025",
        status: "Processing",
        price: "$30.00",
      },
      {
        name: "Smart Watch Timex",
        image: assetSrc(watchImg),
        alt: "Smart Watch Timex",
        deliveryDate: "May 7, 2025",
        status: "Cancelled",
        price: "$24.00",
      },
    ],
  },
  {
    id: "OR675915",
    purchaseDate: "Jun 16, 2025",
    totalPaid: "$64.00",
    items: [
      {
        name: "Echo Elegance",
        image: assetSrc(echoEleganceImg),
        alt: "Echo Elegance product",
        deliveryDate: "April 22, 2025",
        status: "Processing",
        price: "$24.00",
      },
      {
        name: "Smart Watch Timex",
        image: assetSrc(watchImg),
        alt: "Smart Watch Timex",
        deliveryDate: "May 7, 2025",
        status: "Cancelled",
        price: "$20.00",
      },
      {
        name: "Sunscreen",
        image: assetSrc(sunscreenImg),
        alt: "Sunscreen bottle",
        deliveryDate: "May 10, 2025",
        status: "Completed",
        price: "$20.00",
      },
    ],
  },
]

const FILTERS = ["All orders", "Completed", "Processing", "Cancelled"] as const

type Filter = (typeof FILTERS)[number]

function statusClass(status: ItemStatus) {
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

  const visible = ORDERS.map((order) => ({
    ...order,
    items:
      filter === "All orders"
        ? order.items
        : order.items.filter((item) => item.status === filter),
  })).filter((order) => order.items.length > 0)

  return (
    <div
      className={cn(
        "w-full bg-white px-4 py-8 sm:py-10 md:px-8 md:py-14 dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl">
        <header className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
              Billing
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              Invoice groups
            </h1>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Each purchase is a packing slip — meta up top, line items below.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <label htmlFor="order-filter-04" className="sr-only">
              Filter orders
            </label>
            <select
              id="order-filter-04"
              value={filter}
              onChange={(e) => setFilter(e.target.value as Filter)}
              className="h-10 w-full cursor-pointer appearance-none rounded-md border border-border/70 bg-white px-3.5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:w-auto dark:bg-card"
            >
              {FILTERS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-8">
          {visible.map((order) => (
            <article
              key={order.id}
              className="overflow-hidden rounded-[12px] border border-border/70 shadow-soft"
            >
              <div className="flex flex-col gap-4 bg-foreground px-4 py-4 text-background sm:gap-5 sm:px-5 sm:py-5 md:flex-row md:items-center md:justify-between md:px-7">
                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-x-8 md:gap-x-12">
                  <div>
                    <dt className="text-xs font-medium tracking-wide text-background/65 uppercase">
                      Purchased
                    </dt>
                    <dd className="mt-1 text-sm font-semibold">
                      {order.purchaseDate}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium tracking-wide text-background/65 uppercase">
                      Order
                    </dt>
                    <dd className="mt-1 font-mono text-sm font-semibold break-all">
                      {order.id}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium tracking-wide text-background/65 uppercase">
                      Total paid
                    </dt>
                    <dd className="mt-1 text-sm font-semibold">
                      {order.totalPaid}
                    </dd>
                  </div>
                </dl>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  className="w-full shrink-0 md:w-fit"
                >
                  <FileTextIcon className="size-3.5" aria-hidden />
                  View invoice
                </Button>
              </div>

              <ul className="divide-y divide-border/70 bg-white dark:bg-card">
                {order.items.map((item) => (
                  <li
                    key={`${order.id}-${item.name}-${item.price}`}
                    className="grid gap-3 px-4 py-4 sm:gap-4 sm:px-5 sm:py-5 md:grid-cols-[minmax(0,1.4fr)_1fr_1fr_auto] md:items-center md:px-7"
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <div className="size-12 shrink-0 overflow-hidden rounded-md bg-muted p-1.5 sm:size-14">
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="size-full object-contain"
                        />
                      </div>
                      <h3 className="min-w-0 text-sm font-semibold break-words text-foreground">
                        {item.name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:contents">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Delivery
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground">
                          {item.deliveryDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p
                          className={cn(
                            "mt-1 inline-flex rounded-md px-2 py-1 text-xs font-medium",
                            statusClass(item.status)
                          )}
                        >
                          {item.status}
                        </p>
                      </div>
                    </div>
                    <div className="md:text-end">
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {item.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No invoice groups match this filter.
          </p>
        ) : null}
      </div>
    </div>
  )
}
