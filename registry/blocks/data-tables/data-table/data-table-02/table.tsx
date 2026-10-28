"use client"

import * as React from "react"
import {
  DownloadIcon,
  EllipsisIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Input } from "@sonojs/ui/components/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

type InvoiceStatus = "paid" | "pending" | "overdue" | "draft"

type Invoice = {
  id: string
  number: string
  customer: string
  email: string
  initials: string
  amount: string
  issued: string
  status: InvoiceStatus
}

const FILTERS = [
  { id: "all", label: "All" },
  { id: "paid", label: "Paid" },
  { id: "pending", label: "Pending" },
  { id: "overdue", label: "Overdue" },
  { id: "draft", label: "Draft" },
] as const

type FilterId = (typeof FILTERS)[number]["id"]

const INVOICES: Invoice[] = [
  {
    id: "1",
    number: "INV-2048",
    customer: "Northwind Labs",
    email: "billing@northwind.dev",
    initials: "NL",
    amount: "$2,480.00",
    issued: "Mar 12, 2026",
    status: "paid",
  },
  {
    id: "2",
    number: "INV-2049",
    customer: "Acme Retail",
    email: "ap@acmeretail.com",
    initials: "AR",
    amount: "$890.00",
    issued: "Mar 14, 2026",
    status: "pending",
  },
  {
    id: "3",
    number: "INV-2050",
    customer: "Orbit Media",
    email: "finance@orbit.media",
    initials: "OM",
    amount: "$4,120.00",
    issued: "Mar 02, 2026",
    status: "overdue",
  },
  {
    id: "4",
    number: "INV-2051",
    customer: "Pixel Forge",
    email: "hello@pixelforge.io",
    initials: "PF",
    amount: "$1,050.00",
    issued: "Mar 18, 2026",
    status: "paid",
  },
  {
    id: "5",
    number: "INV-2052",
    customer: "Harbor Health",
    email: "ops@harbor.health",
    initials: "HH",
    amount: "$640.00",
    issued: "Mar 20, 2026",
    status: "draft",
  },
  {
    id: "6",
    number: "INV-2053",
    customer: "Brightline Co",
    email: "accounts@brightline.co",
    initials: "BC",
    amount: "$3,275.00",
    issued: "Mar 08, 2026",
    status: "pending",
  },
]

const statusStyles: Record<
  InvoiceStatus,
  { label: string; className: string; dot: string }
> = {
  paid: {
    label: "Paid",
    className:
      "border-transparent bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    className:
      "border-transparent bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  overdue: {
    label: "Overdue",
    className:
      "border-transparent bg-rose-500/10 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
    dot: "bg-rose-500",
  },
  draft: {
    label: "Draft",
    className: "border-transparent bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
}

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const styles = statusStyles[status]
  return (
    <Badge
      variant="outline"
      className={cn("h-6 gap-1.5 rounded-full px-2", styles.className)}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", styles.dot)} />
      {styles.label}
    </Badge>
  )
}

function RowMenu({ number }: { number: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-8 cursor-pointer rounded-lg text-muted-foreground"
          aria-label={`Actions for ${number}`}
        >
          <EllipsisIcon className="size-4" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem className="cursor-pointer">View</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Download PDF
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Send reminder
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
          Void invoice
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function InvoiceCard({
  invoice,
  checked,
  onCheckedChange,
}: {
  invoice: Invoice
  checked: boolean
  onCheckedChange: (next: boolean) => void
}) {
  return (
    <li className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          aria-label={`Select ${invoice.number}`}
          className="mt-1 cursor-pointer"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p dir="ltr" className="font-medium tabular-nums text-foreground">
              {invoice.number}
            </p>
            <StatusBadge status={invoice.status} />
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                {invoice.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {invoice.customer}
              </p>
              <p
                dir="ltr"
                className="truncate text-xs text-muted-foreground text-start"
              >
                {invoice.email}
              </p>
            </div>
          </div>
          <dl className="mt-3 grid gap-1.5 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Amount</dt>
              <dd
                dir="ltr"
                className="font-medium tabular-nums text-foreground"
              >
                {invoice.amount}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Issued</dt>
              <dd dir="ltr" className="tabular-nums text-foreground">
                {invoice.issued}
              </dd>
            </div>
          </dl>
          <div className="mt-3 flex justify-end">
            <RowMenu number={invoice.number} />
          </div>
        </div>
      </div>
    </li>
  )
}

export default function DataTable02({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("")
  const [filter, setFilter] = React.useState<FilterId>("all")
  const [selected, setSelected] = React.useState<Set<string>>(new Set())

  const rows = INVOICES.filter((invoice) => {
    if (filter !== "all" && invoice.status !== filter) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      invoice.number.toLowerCase().includes(q) ||
      invoice.customer.toLowerCase().includes(q) ||
      invoice.email.toLowerCase().includes(q)
    )
  })

  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id))
  const someSelected = rows.some((r) => selected.has(r.id))

  const toggleAll = (next: boolean) => {
    setSelected((prev) => {
      const copy = new Set(prev)
      for (const row of rows) {
        if (next) copy.add(row.id)
        else copy.delete(row.id)
      }
      return copy
    })
  }

  const toggleOne = (id: string, next: boolean) => {
    setSelected((prev) => {
      const copy = new Set(prev)
      if (next) copy.add(id)
      else copy.delete(id)
      return copy
    })
  }

  return (
    <div className={cn("w-full min-w-0", className)} {...props}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-start">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Invoices
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Track payments, send reminders, and export statements.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-10 cursor-pointer gap-2 rounded-lg"
            >
              <DownloadIcon className="size-4" aria-hidden />
              Export
            </Button>
            <Button
              type="button"
              className="h-10 cursor-pointer gap-2 rounded-lg"
            >
              <PlusIcon className="size-4" aria-hidden />
              New invoice
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-sm">
            <SearchIcon
              aria-hidden
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search invoices…"
              className="h-10 ps-9"
              aria-label="Search invoices"
            />
          </div>
          <div
            role="tablist"
            aria-label="Filter by status"
            className="flex flex-wrap gap-1.5"
          >
            {FILTERS.map((item) => {
              const active = filter === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "inline-flex h-8 cursor-pointer items-center rounded-full border px-3 text-xs font-medium transition-colors",
                    active
                      ? "border-transparent bg-foreground text-background"
                      : "border-border/70 bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        {someSelected ? (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[12px] border border-border/70 bg-muted/40 px-3 py-2 text-sm">
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground tabular-nums">
                {selected.size}
              </span>{" "}
              selected
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 cursor-pointer rounded-lg"
              >
                Mark paid
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 cursor-pointer rounded-lg"
                onClick={() => setSelected(new Set())}
              >
                Clear
              </Button>
            </div>
          </div>
        ) : null}

        <ul className="flex flex-col gap-3 md:hidden">
          {rows.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              checked={selected.has(invoice.id)}
              onCheckedChange={(next) => toggleOne(invoice.id, next)}
            />
          ))}
          {rows.length === 0 ? (
            <li className="rounded-[12px] border border-dashed border-border/70 px-4 py-10 text-center text-sm text-muted-foreground">
              No invoices match your filters.
            </li>
          ) : null}
        </ul>

        <div className="hidden rounded-[12px] border border-border/70 bg-card shadow-soft md:block">
          <Table className="min-w-200">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12 pe-0">
                  <Checkbox
                    checked={
                      allSelected ? true : someSelected ? "indeterminate" : false
                    }
                    onCheckedChange={(v) => toggleAll(v === true)}
                    aria-label="Select all invoices"
                    className="cursor-pointer"
                  />
                </TableHead>
                <TableHead className="font-medium">Invoice</TableHead>
                <TableHead className="font-medium">Customer</TableHead>
                <TableHead className="font-medium">Amount</TableHead>
                <TableHead className="font-medium">Issued</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  data-state={selected.has(invoice.id) ? "selected" : undefined}
                  className="group"
                >
                  <TableCell className="pe-0">
                    <Checkbox
                      checked={selected.has(invoice.id)}
                      onCheckedChange={(v) =>
                        toggleOne(invoice.id, v === true)
                      }
                      aria-label={`Select ${invoice.number}`}
                      className="cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>
                    <span
                      dir="ltr"
                      className="font-medium tabular-nums text-foreground"
                    >
                      {invoice.number}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                          {invoice.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {invoice.customer}
                        </p>
                        <p
                          dir="ltr"
                          className="truncate text-xs text-muted-foreground text-start"
                        >
                          {invoice.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span dir="ltr" className="tabular-nums font-medium">
                      {invoice.amount}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span dir="ltr" className="tabular-nums text-muted-foreground">
                      {invoice.issued}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="text-end">
                    <RowMenu number={invoice.number} />
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={7}
                    className="h-28 text-center text-muted-foreground"
                  >
                    No invoices match your filters.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
