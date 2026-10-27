"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  SearchIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type OrderStatus = "Completed" | "Pending" | "Cancelled"

type Order = {
  id: string
  date: string
  price: string
  status: OrderStatus
}

const ORDERS: Order[] = [
  {
    id: "#ORD-1001",
    date: "May 01, 2025",
    price: "$45.99",
    status: "Completed",
  },
  {
    id: "#ORD-1002",
    date: "May 02, 2025",
    price: "$89.00",
    status: "Pending",
  },
  {
    id: "#ORD-1003",
    date: "May 03, 2025",
    price: "$120.50",
    status: "Completed",
  },
  {
    id: "#ORD-1004",
    date: "May 04, 2025",
    price: "$58.20",
    status: "Cancelled",
  },
  {
    id: "#ORD-1005",
    date: "May 05, 2025",
    price: "$75.00",
    status: "Pending",
  },
  {
    id: "#ORD-1006",
    date: "May 06, 2025",
    price: "$99.90",
    status: "Completed",
  },
  {
    id: "#ORD-1007",
    date: "May 07, 2025",
    price: "$150.00",
    status: "Pending",
  },
  {
    id: "#ORD-1008",
    date: "May 08, 2025",
    price: "$42.75",
    status: "Completed",
  },
  {
    id: "#ORD-1009",
    date: "May 09, 2025",
    price: "$68.60",
    status: "Cancelled",
  },
  {
    id: "#ORD-1010",
    date: "May 10, 2025",
    price: "$112.00",
    status: "Completed",
  },
]

const STATUS_OPTIONS = [
  "all",
  "completed",
  "processing",
  "cancelled",
] as const

type StatusFilter = (typeof STATUS_OPTIONS)[number]

const DATE_OPTIONS = [
  { value: "all", label: "All dates" },
  { value: "last-7-days", label: "Last 7 days" },
  { value: "last-30-days", label: "Last 30 days" },
  { value: "this-year", label: "This year" },
] as const

const PAGE_NUMBERS = [1, 2, 3, 4, 5, 6] as const

function statusClass(status: OrderStatus) {
  if (status === "Completed") {
    return "text-emerald-600 dark:text-emerald-400"
  }
  if (status === "Pending") {
    return "text-amber-600 dark:text-amber-400"
  }
  return "text-destructive"
}

function matchesStatus(order: Order, filter: StatusFilter) {
  if (filter === "all") return true
  if (filter === "processing") return order.status === "Pending"
  return order.status.toLowerCase() === filter
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
      className="mx-auto inline-flex max-w-full overflow-x-auto rounded-md border border-border/70 sm:mx-0"
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
              ? "bg-foreground text-background"
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
  const [query, setQuery] = React.useState("")
  const [filter, setFilter] = React.useState<StatusFilter>("all")
  const [dateRange, setDateRange] = React.useState("all")
  const [page, setPage] = React.useState(2)

  const q = query.trim().toLowerCase()
  const visible = ORDERS.filter((order) => {
    if (!matchesStatus(order, filter)) return false
    if (!q) return true
    return (
      order.id.toLowerCase().includes(q) ||
      order.date.toLowerCase().includes(q) ||
      order.status.toLowerCase().includes(q)
    )
  })

  return (
    <div
      className={cn(
        "w-full bg-muted/40 px-4 py-8 sm:py-10 md:px-8 md:py-14 dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
              Operations
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              Order ledger
            </h1>
          </div>
          <p className="text-sm tabular-nums text-muted-foreground">
            {visible.length} rows
            <span className="mx-2 text-border">·</span>
            {dateRange === "all" ? "All dates" : dateRange}
          </p>
        </div>

        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-white shadow-soft dark:bg-card">
          <div className="flex flex-col gap-4 border-b border-border/70 p-4 md:p-5">
            <form
              className="w-full"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative">
                <SearchIcon
                  className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <label htmlFor="order-search-06" className="sr-only">
                  Search orders
                </label>
                <input
                  type="search"
                  id="order-search-06"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find by ID or status…"
                  className="h-10 w-full rounded-md border border-border/70 bg-transparent pe-3 ps-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </form>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-2"
                role="radiogroup"
                aria-label="Filter by status"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    htmlFor={`status-06-${opt}`}
                    className="inline-flex cursor-pointer items-center gap-2 text-sm capitalize text-foreground"
                  >
                    <input
                      type="radio"
                      name="order-status-06"
                      id={`status-06-${opt}`}
                      className="size-4 cursor-pointer accent-primary"
                      checked={filter === opt}
                      onChange={() => setFilter(opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              <label htmlFor="date-filter-06" className="sr-only">
                Filter by date
              </label>
              <select
                id="date-filter-06"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="h-10 w-full cursor-pointer appearance-none rounded-md border border-border/70 bg-transparent px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
              >
                {DATE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile cards */}
          <ul className="divide-y divide-border/70 md:hidden">
            {visible.map((order) => (
              <li
                key={order.id}
                className="flex items-start justify-between gap-3 p-4"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[13px] font-medium break-all text-foreground">
                    {order.id}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.date}
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-sm font-medium",
                      statusClass(order.status)
                    )}
                  >
                    {order.status}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <p className="text-sm font-semibold tabular-nums text-foreground">
                    {order.price}
                  </p>
                  <button
                    type="button"
                    title="More options"
                    className="flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <EllipsisVerticalIcon className="size-4" aria-hidden />
                    <span className="sr-only">More options</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[640px] text-sm">
              <caption className="sr-only">Order ledger</caption>
              <thead>
                <tr className="border-b border-border/70 bg-muted/50 text-start text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {["Order ID", "Date", "Price", "Status", ""].map(
                    (header, i) => (
                      <th
                        key={header || "action"}
                        scope="col"
                        className={cn(
                          "px-4 py-3 font-medium",
                          i === 4 && "w-12"
                        )}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {visible.map((order, index) => (
                  <tr
                    key={order.id}
                    className={cn(
                      "border-b border-border/70 last:border-b-0",
                      index % 2 === 1 && "bg-muted/25"
                    )}
                  >
                    <td className="px-4 py-3.5 font-mono text-[13px] font-medium text-foreground">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">
                      {order.date}
                    </td>
                    <td className="px-4 py-3.5 tabular-nums text-foreground">
                      {order.price}
                    </td>
                    <td
                      className={cn(
                        "px-4 py-3.5 font-medium",
                        statusClass(order.status)
                      )}
                    >
                      {order.status}
                    </td>
                    <td className="px-2 py-3.5">
                      <button
                        type="button"
                        title="More options"
                        className="flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <EllipsisVerticalIcon className="size-4" aria-hidden />
                        <span className="sr-only">More options</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visible.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No ledger rows match.
            </p>
          ) : null}

          <div className="flex flex-col items-center gap-3 border-t border-border/70 px-4 py-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Page {page} of {PAGE_NUMBERS.length}
            </p>
            <Pagination page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
