"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PackageIcon,
  ReceiptIcon,
  ShoppingBagIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type OrderStatus = "Completed" | "Pending"

type Order = {
  id: string
  customer: string
  email: string
  date: string
  status: OrderStatus
  amount: string
  initials: string
}

const STATS = [
  {
    label: "Total orders",
    value: "21",
    hint: "+3 this week",
    icon: ShoppingBagIcon,
  },
  {
    label: "Order items",
    value: "15",
    hint: "Across SKUs",
    icon: PackageIcon,
  },
  {
    label: "Returns",
    value: "0",
    hint: "Clean slate",
    icon: ReceiptIcon,
  },
  {
    label: "Fulfilled",
    value: "12",
    hint: "57% rate",
    icon: CheckIcon,
  },
] as const

const ORDERS: Order[] = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    date: "May 12, 2023",
    status: "Completed",
    amount: "$128.50",
    initials: "JD",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "May 10, 2023",
    status: "Pending",
    amount: "$89.99",
    initials: "JS",
  },
  {
    id: "#ORD-003",
    customer: "Robert Johnson",
    email: "robert@example.com",
    date: "May 8, 2023",
    status: "Completed",
    amount: "$243.75",
    initials: "RJ",
  },
  {
    id: "#ORD-004",
    customer: "Maria Garcia",
    email: "maria@example.com",
    date: "May 5, 2023",
    status: "Completed",
    amount: "$156.25",
    initials: "MG",
  },
  {
    id: "#ORD-005",
    customer: "David Wilson",
    email: "david@example.com",
    date: "May 3, 2023",
    status: "Pending",
    amount: "$112.00",
    initials: "DW",
  },
]

const TABS = ["All", "Fulfilled", "Unpaid", "Return"] as const

type Tab = (typeof TABS)[number]

const PAGE_NUMBERS = [1, 2, 3, 4, 5, 6] as const

function statusClass(status: OrderStatus) {
  if (status === "Completed") {
    return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
  }
  return "bg-orange-500/15 text-orange-700 dark:text-orange-400"
}

function matchesTab(order: Order, tab: Tab) {
  if (tab === "All") return true
  if (tab === "Fulfilled") return order.status === "Completed"
  if (tab === "Unpaid") return order.status === "Pending"
  return false
}

function Pagination({
  page,
  setPage,
}: {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <nav
      aria-label="Pagination"
      className="inline-flex max-w-full overflow-x-auto rounded-md border border-border/70"
    >
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="flex size-9 shrink-0 cursor-pointer items-center justify-center border-e border-border/70 text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronLeftIcon className="size-3.5 icon-dir" aria-hidden />
      </button>
      {PAGE_NUMBERS.map((num) => (
        <button
          key={num}
          type="button"
          aria-current={page === num ? "page" : undefined}
          onClick={() => setPage(num)}
          className={cn(
            "flex size-9 shrink-0 cursor-pointer items-center justify-center border-e border-border/70 text-xs font-semibold last:border-e-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            page === num
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
          )}
        >
          {num}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        onClick={() => setPage((p) => Math.min(6, p + 1))}
        className="flex size-9 shrink-0 cursor-pointer items-center justify-center text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronRightIcon className="size-3.5 icon-dir" aria-hidden />
      </button>
    </nav>
  )
}

export default function OrderHistory({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [tab, setTab] = React.useState<Tab>("All")
  const [page, setPage] = React.useState(2)

  const visible = ORDERS.filter((order) => matchesTab(order, tab))

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-8 sm:py-10 md:px-8 md:py-14",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
              Merchant
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Command center
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              KPIs, segments, and customer orders in one workspace.
            </p>
          </div>
          <Button type="button" className="w-full sm:w-auto">
            Create new order
          </Button>
        </div>

        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4"
          aria-label="Order statistics"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-[12px] border border-border/70 bg-white p-4 shadow-soft sm:p-5 dark:bg-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {stat.hint}
                    </p>
                  </div>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary sm:size-11">
                    <Icon className="size-5" aria-hidden />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-white shadow-soft dark:bg-card">
          <div className="flex flex-col gap-4 border-b border-border/70 px-4 py-4 sm:px-5 sm:py-5 md:flex-row md:items-center md:justify-between md:px-6">
            <h2 className="text-lg font-semibold text-foreground">
              Recent orders
            </h2>
            <ul
              role="tablist"
              aria-label="Order sections"
              className="flex w-full gap-1 overflow-x-auto rounded-md bg-muted p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:w-auto md:overflow-visible"
            >
              {TABS.map((item) => {
                const active = tab === item
                return (
                  <li key={item} className="shrink-0">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTab(item)}
                      className={cn(
                        "cursor-pointer rounded-[6px] px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3.5",
                        active
                          ? "bg-white text-foreground shadow-sm dark:bg-background"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Mobile cards */}
          <ul className="divide-y divide-border/70 md:hidden">
            {visible.map((order) => (
              <li key={order.id} className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                      aria-hidden
                    >
                      {order.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {order.customer}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {order.email}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
                      statusClass(order.status)
                    )}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="font-mono font-medium text-foreground">
                    {order.id}
                  </span>
                  <span className="text-muted-foreground">{order.date}</span>
                  <span className="font-semibold tabular-nums text-foreground">
                    {order.amount}
                  </span>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  View
                </Button>
              </li>
            ))}
          </ul>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full">
              <caption className="sr-only">Recent orders list</caption>
              <thead>
                <tr className="border-b border-border/70 text-start text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {[
                    "Order",
                    "Customer",
                    "Date",
                    "Status",
                    "Amount",
                    "Action",
                  ].map((head) => (
                    <th key={head} scope="col" className="px-5 py-3.5 md:px-6">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {visible.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="whitespace-nowrap px-5 py-4 md:px-6">
                      <span className="font-mono text-sm font-medium text-foreground">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-5 py-4 md:px-6">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                          aria-hidden
                        >
                          {order.initials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {order.customer}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {order.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-muted-foreground md:px-6">
                      {order.date}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 md:px-6">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                          statusClass(order.status)
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold tabular-nums text-foreground md:px-6">
                      {order.amount}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 md:px-6">
                      <Button type="button" size="sm" variant="ghost">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visible.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No orders in this segment.
            </p>
          ) : null}

          <div className="flex flex-col items-center gap-3 border-t border-border/70 px-4 py-4 sm:flex-row sm:justify-between md:px-6">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">1–10</span> of{" "}
              <span className="font-medium text-foreground">60</span>
            </p>
            <Pagination page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
