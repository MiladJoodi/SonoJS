"use client"

import * as React from "react"
import {
  ArrowDownToLineIcon,
  ArrowUpFromLineIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon,
  DownloadIcon,
  EyeIcon,
  FilterIcon,
  MoreHorizontalIcon,
  RefreshCcwIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Card, CardContent } from "@sonojs/ui/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@sonojs/ui/components/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

type TxStatus = "completed" | "pending" | "failed"
type TxType = "deposit" | "withdrawal" | "transfer" | "payment"

type Transaction = {
  id: string
  counterparty: string
  initials: string
  category: string
  type: TxType
  amount: number
  currency: string
  status: TxStatus
  date: string
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "tx_091",
    counterparty: "Acme Payout",
    initials: "AP",
    category: "Revenue",
    type: "deposit",
    amount: 4250.0,
    currency: "USD",
    status: "completed",
    date: "2026-06-25T14:30:00Z",
  },
  {
    id: "tx_092",
    counterparty: "Cloud Hosting",
    initials: "CH",
    category: "Infrastructure",
    type: "payment",
    amount: -342.15,
    currency: "USD",
    status: "completed",
    date: "2026-06-24T09:12:00Z",
  },
  {
    id: "tx_093",
    counterparty: "Edge Deploy",
    initials: "ED",
    category: "Software",
    type: "payment",
    amount: -40.0,
    currency: "USD",
    status: "pending",
    date: "2026-06-23T11:05:00Z",
  },
  {
    id: "tx_094",
    counterparty: "Alice Smith",
    initials: "AS",
    category: "Transfer",
    type: "transfer",
    amount: 150.0,
    currency: "USD",
    status: "completed",
    date: "2026-06-22T16:45:00Z",
  },
  {
    id: "tx_095",
    counterparty: "Code Hosting",
    initials: "GH",
    category: "Software",
    type: "payment",
    amount: -48.0,
    currency: "USD",
    status: "completed",
    date: "2026-06-21T08:00:00Z",
  },
  {
    id: "tx_096",
    counterparty: "Bank Withdrawal",
    initials: "BW",
    category: "Banking",
    type: "withdrawal",
    amount: -1000.0,
    currency: "USD",
    status: "completed",
    date: "2026-06-20T10:30:00Z",
  },
  {
    id: "tx_097",
    counterparty: "Storefront",
    initials: "SF",
    category: "Revenue",
    type: "deposit",
    amount: 1205.5,
    currency: "USD",
    status: "failed",
    date: "2026-06-19T13:20:00Z",
  },
  {
    id: "tx_098",
    counterparty: "Workspace Suite",
    initials: "WS",
    category: "Software",
    type: "payment",
    amount: -72.0,
    currency: "USD",
    status: "completed",
    date: "2026-06-18T09:15:00Z",
  },
]

const STATUS_META: Record<
  TxStatus,
  { label: string; dot: string; text: string }
> = {
  completed: {
    label: "Completed",
    dot: "bg-emerald-500",
    text: "text-foreground",
  },
  pending: {
    label: "Pending",
    dot: "bg-amber-500",
    text: "text-foreground",
  },
  failed: {
    label: "Failed",
    dot: "bg-rose-500",
    text: "text-muted-foreground",
  },
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    signDisplay: "always",
  }).format(amount)
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(iso))
}

function TypeIcon({ type }: { type: TxType }) {
  const className = "size-4 text-muted-foreground"
  switch (type) {
    case "deposit":
      return <ArrowDownToLineIcon className={className} aria-hidden />
    case "withdrawal":
      return <ArrowUpFromLineIcon className={className} aria-hidden />
    case "transfer":
      return <RefreshCcwIcon className={className} aria-hidden />
    case "payment":
      return <CreditCardIcon className={className} aria-hidden />
  }
}

export default function BillingHistory({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [query, setQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const perPage = 6

  const filtered = React.useMemo(() => {
    let result = TRANSACTIONS
    const q = query.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (tx) =>
          tx.counterparty.toLowerCase().includes(q) ||
          tx.id.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== "all") {
      result = result.filter((tx) => tx.status === statusFilter)
    }
    if (typeFilter !== "all") {
      result = result.filter((tx) => tx.type === typeFilter)
    }
    return result
  }, [query, statusFilter, typeFilter])

  const totals = React.useMemo(() => {
    const inflow = TRANSACTIONS.filter(
      (t) => t.amount > 0 && t.status === "completed"
    ).reduce((s, t) => s + t.amount, 0)
    const outflow = TRANSACTIONS.filter(
      (t) => t.amount < 0 && t.status === "completed"
    ).reduce((s, t) => s + Math.abs(t.amount), 0)
    const pending = TRANSACTIONS.filter((t) => t.status === "pending").length
    return { inflow, outflow, pending }
  }, [])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * perPage, safePage * perPage)

  const clearFilters = () => {
    setQuery("")
    setStatusFilter("all")
    setTypeFilter("all")
    setPage(1)
  }

  const hasFilters =
    !!query.trim() || statusFilter !== "all" || typeFilter !== "all"

  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden bg-white py-10 text-foreground dark:bg-background",
        className
      )}
      aria-labelledby="billing-history-01-heading"
      {...props}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute start-1/2 top-[-18%] size-[26rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-end">
          <div className="min-w-0 text-start">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Ledger
            </p>
            <h1
              id="billing-history-01-heading"
              className="mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Transaction history
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Every deposit, payment, and transfer — searchable, filterable, and
              export-ready.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full shrink-0 cursor-pointer rounded-full sm:w-auto"
          >
            <ArrowDownToLineIcon className="size-4" aria-hidden />
            Export CSV
          </Button>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Inflow (30d)",
              value: formatCurrency(totals.inflow, "USD"),
              tone: "text-emerald-700 dark:text-emerald-400",
            },
            {
              label: "Outflow (30d)",
              value: formatCurrency(-totals.outflow, "USD"),
              tone: "text-foreground",
            },
            {
              label: "Pending",
              value: String(totals.pending),
              tone: "text-amber-700 dark:text-amber-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[12px] border border-border/70 bg-card px-5 py-4 shadow-soft"
            >
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {stat.label}
              </p>
              <p
                dir="ltr"
                className={cn(
                  "mt-1 text-2xl font-semibold tracking-tight tabular-nums",
                  stat.tone
                )}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <Card className="border-border/70 shadow-soft">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <InputGroup className="flex-1">
                <InputGroupAddon align="inline-start">
                  <SearchIcon aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Search counterparty, ID or category…"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setPage(1)
                  }}
                  aria-label="Search transactions"
                />
                {query ? (
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      size="icon-xs"
                      className="cursor-pointer"
                      aria-label="Clear search"
                      onClick={() => {
                        setQuery("")
                        setPage(1)
                      }}
                    >
                      <XIcon aria-hidden />
                    </InputGroupButton>
                  </InputGroupAddon>
                ) : null}
              </InputGroup>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Select
                  value={statusFilter}
                  onValueChange={(v) => {
                    setStatusFilter(v)
                    setPage(1)
                  }}
                >
                  <SelectTrigger className="w-full cursor-pointer sm:w-[160px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={typeFilter}
                  onValueChange={(v) => {
                    setTypeFilter(v)
                    setPage(1)
                  }}
                >
                  <SelectTrigger className="w-full cursor-pointer sm:w-[160px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {hasFilters ? (
              <div className="flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
                <FilterIcon
                  className="size-4 text-muted-foreground"
                  aria-hidden
                />
                <span className="text-sm font-medium text-muted-foreground">
                  Active filters:
                </span>
                {query.trim() ? (
                  <Badge
                    variant="outline"
                    className="h-8 gap-1.5 rounded-full border-border/70 bg-muted/40 px-3 font-medium"
                  >
                    “{query.trim()}”
                    <button
                      type="button"
                      className="ms-0.5 inline-flex size-5 cursor-pointer items-center justify-center rounded-full hover:bg-muted"
                      aria-label="Remove search filter"
                      onClick={() => {
                        setQuery("")
                        setPage(1)
                      }}
                    >
                      <XIcon className="size-3" aria-hidden />
                    </button>
                  </Badge>
                ) : null}
                {statusFilter !== "all" ? (
                  <Badge
                    variant="outline"
                    className="h-8 gap-1.5 rounded-full border-border/70 bg-muted/40 px-3 font-medium capitalize"
                  >
                    Status: {statusFilter}
                    <button
                      type="button"
                      className="ms-0.5 inline-flex size-5 cursor-pointer items-center justify-center rounded-full hover:bg-muted"
                      aria-label="Remove status filter"
                      onClick={() => {
                        setStatusFilter("all")
                        setPage(1)
                      }}
                    >
                      <XIcon className="size-3" aria-hidden />
                    </button>
                  </Badge>
                ) : null}
                {typeFilter !== "all" ? (
                  <Badge
                    variant="outline"
                    className="h-8 gap-1.5 rounded-full border-border/70 bg-muted/40 px-3 font-medium capitalize"
                  >
                    Type: {typeFilter}
                    <button
                      type="button"
                      className="ms-0.5 inline-flex size-5 cursor-pointer items-center justify-center rounded-full hover:bg-muted"
                      aria-label="Remove type filter"
                      onClick={() => {
                        setTypeFilter("all")
                        setPage(1)
                      }}
                    >
                      <XIcon className="size-3" aria-hidden />
                    </button>
                  </Badge>
                ) : null}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ms-auto h-8 cursor-pointer rounded-full"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 shadow-soft">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-12 ps-6 text-xs tracking-wider uppercase">
                    Transaction
                  </TableHead>
                  <TableHead className="h-12 text-xs tracking-wider uppercase">
                    Date
                  </TableHead>
                  <TableHead className="h-12 text-xs tracking-wider uppercase">
                    Type
                  </TableHead>
                  <TableHead className="h-12 text-xs tracking-wider uppercase">
                    Status
                  </TableHead>
                  <TableHead className="h-12 text-end text-xs tracking-wider uppercase">
                    Amount
                  </TableHead>
                  <TableHead className="h-12 w-14 pe-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={6} className="py-16">
                      <Empty className="border-0">
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <SearchIcon aria-hidden />
                          </EmptyMedia>
                          <EmptyTitle>No transactions found</EmptyTitle>
                          <EmptyDescription>
                            Try adjusting your filters or search query.
                          </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                          <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer rounded-full"
                            onClick={clearFilters}
                          >
                            Clear Filters
                          </Button>
                        </EmptyContent>
                      </Empty>
                    </TableCell>
                  </TableRow>
                ) : (
                  paged.map((tx) => {
                    const status = STATUS_META[tx.status]
                    const isPositive = tx.amount > 0
                    const isFailed = tx.status === "failed"
                    return (
                      <TableRow key={tx.id} className="group">
                        <TableCell className="py-5 ps-6">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-10 border border-border/70">
                              <AvatarFallback className="bg-muted text-xs font-semibold">
                                {tx.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 text-start">
                              <p
                                className={cn(
                                  "truncate font-semibold",
                                  isFailed
                                    ? "text-muted-foreground line-through"
                                    : "text-foreground"
                                )}
                              >
                                {tx.counterparty}
                              </p>
                              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <span
                                  dir="ltr"
                                  className="font-mono tracking-wide"
                                >
                                  {tx.id}
                                </span>
                                <span
                                  className="size-1 rounded-full bg-border"
                                  aria-hidden
                                />
                                <span>{tx.category}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-5 whitespace-nowrap">
                          <span
                            dir="ltr"
                            className="font-medium text-muted-foreground"
                          >
                            {formatDate(tx.date)}
                          </span>
                        </TableCell>
                        <TableCell className="py-5">
                          <span className="inline-flex items-center gap-2 capitalize text-muted-foreground">
                            <TypeIcon type={tx.type} />
                            {tx.type}
                          </span>
                        </TableCell>
                        <TableCell className="py-5">
                          <span
                            className={cn(
                              "inline-flex items-center gap-2 text-sm font-medium",
                              status.text
                            )}
                          >
                            <span
                              className={cn("size-2 rounded-full", status.dot)}
                            />
                            {status.label}
                          </span>
                        </TableCell>
                        <TableCell className="py-5 text-end">
                          <span
                            dir="ltr"
                            className={cn(
                              "text-lg font-semibold tracking-tight tabular-nums",
                              isFailed
                                ? "text-muted-foreground/40 line-through"
                                : isPositive
                                  ? "text-emerald-700 dark:text-emerald-400"
                                  : "text-foreground"
                            )}
                          >
                            {formatCurrency(tx.amount, tx.currency)}
                          </span>
                        </TableCell>
                        <TableCell className="py-5 pe-6 text-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                type="button"
                                size="icon-xs"
                                variant="ghost"
                                aria-label="Transaction actions"
                                className="cursor-pointer rounded-full text-muted-foreground"
                              >
                                <MoreHorizontalIcon
                                  className="size-5"
                                  aria-hidden
                                />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                              <DropdownMenuItem className="cursor-pointer gap-2">
                                <EyeIcon className="size-4" aria-hidden />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer gap-2">
                                <DownloadIcon className="size-4" aria-hidden />
                                Download receipt
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer gap-2">
                                Copy ID
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {filtered.length > 0 ? (
            <div className="flex flex-col gap-4 border-t border-border/70 bg-muted/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Showing{" "}
                <span dir="ltr" className="font-semibold text-foreground">
                  {Math.min((safePage - 1) * perPage + 1, filtered.length)}
                </span>{" "}
                to{" "}
                <span dir="ltr" className="font-semibold text-foreground">
                  {Math.min(safePage * perPage, filtered.length)}
                </span>{" "}
                of{" "}
                <span dir="ltr" className="font-semibold text-foreground">
                  {filtered.length}
                </span>{" "}
                results
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer rounded-full disabled:cursor-not-allowed"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeftIcon className="icon-dir size-4" aria-hidden />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer rounded-full disabled:cursor-not-allowed"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <ChevronRightIcon className="icon-dir size-4" aria-hidden />
                </Button>
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </section>
  )
}
