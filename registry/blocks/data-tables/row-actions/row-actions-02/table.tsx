"use client"

import * as React from "react"
import {
  CopyIcon,
  DownloadIcon,
  EllipsisIcon,
  EyeIcon,
  SendIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@sonojs/ui/components/tooltip"
import { cn } from "@/lib/utils"

type InvoiceStatus = "paid" | "pending" | "overdue"

type Invoice = {
  id: string
  number: string
  customer: string
  amount: string
  issued: string
  status: InvoiceStatus
}

const INVOICES: Invoice[] = [
  {
    id: "1",
    number: "INV-2481",
    customer: "Northwind Labs",
    amount: "$2,480.00",
    issued: "Mar 12, 2026",
    status: "paid",
  },
  {
    id: "2",
    number: "INV-2482",
    customer: "Acme Retail",
    amount: "$890.00",
    issued: "Mar 14, 2026",
    status: "pending",
  },
  {
    id: "3",
    number: "INV-2483",
    customer: "Orbit Media",
    amount: "$4,120.00",
    issued: "Mar 02, 2026",
    status: "overdue",
  },
  {
    id: "4",
    number: "INV-2484",
    customer: "Pixel Forge",
    amount: "$1,050.00",
    issued: "Mar 18, 2026",
    status: "paid",
  },
  {
    id: "5",
    number: "INV-2485",
    customer: "Brightline Co",
    amount: "$3,275.00",
    issued: "Mar 08, 2026",
    status: "pending",
  },
]

const statusStyles: Record<InvoiceStatus, string> = {
  paid: "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  pending: "border-transparent bg-muted text-muted-foreground",
  overdue: "border-transparent bg-rose-500/10 text-rose-700 dark:text-rose-400",
}

const statusLabel: Record<InvoiceStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
}

const iconBtn =
  "size-8 cursor-pointer rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"

function IconTip({
  label,
  children,
}: {
  label: string
  children: React.ReactElement
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function RowActions({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex items-center gap-0.5">
      <IconTip label="View">
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label={`View ${invoice.number}`}
          className={iconBtn}
        >
          <EyeIcon className="size-4" aria-hidden />
        </Button>
      </IconTip>
      <IconTip label="Copy link">
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label={`Copy link for ${invoice.number}`}
          className={iconBtn}
        >
          <CopyIcon className="size-4" aria-hidden />
        </Button>
      </IconTip>
      <IconTip label="Download PDF">
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label={`Download ${invoice.number}`}
          className={iconBtn}
        >
          <DownloadIcon className="size-4" aria-hidden />
        </Button>
      </IconTip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label={`More actions for ${invoice.number}`}
            className={iconBtn}
          >
            <EllipsisIcon className="size-4" aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem className="cursor-pointer gap-2">
            <SendIcon className="size-4 text-muted-foreground" aria-hidden />
            Send reminder
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer gap-2">
            <CopyIcon className="size-4 text-muted-foreground" aria-hidden />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
            Void invoice
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default function RowActions02({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <TooltipProvider>
      <div className={cn("w-full min-w-0", className)} {...props}>
        <div className="mb-4 text-start">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Invoices
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Soft icon actions — view, copy, download, and overflow menu.
          </p>
        </div>

        <ul className="flex flex-col gap-3 md:hidden">
          {INVOICES.map((invoice) => (
            <li
              key={invoice.id}
              className="rounded-[12px] border border-border/70 bg-white p-4 shadow-soft dark:bg-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p
                    dir="ltr"
                    className="text-sm font-medium tabular-nums text-foreground"
                  >
                    {invoice.number}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {invoice.customer}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "h-6 rounded-full px-2.5 font-medium",
                    statusStyles[invoice.status]
                  )}
                >
                  {statusLabel[invoice.status]}
                </Badge>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/70 pt-3">
                <div className="text-sm">
                  <p dir="ltr" className="font-medium tabular-nums">
                    {invoice.amount}
                  </p>
                  <p
                    dir="ltr"
                    className="text-xs tabular-nums text-muted-foreground"
                  >
                    {invoice.issued}
                  </p>
                </div>
                <RowActions invoice={invoice} />
              </div>
            </li>
          ))}
        </ul>

        <div className="hidden rounded-[12px] border border-border/70 bg-white shadow-soft md:block dark:bg-card">
          <Table className="min-w-180">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium">Invoice</TableHead>
                <TableHead className="font-medium">Customer</TableHead>
                <TableHead className="font-medium">Amount</TableHead>
                <TableHead className="font-medium">Issued</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="w-40 font-medium">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((invoice) => (
                <TableRow key={invoice.id} className="group hover:bg-muted/40">
                  <TableCell>
                    <span
                      dir="ltr"
                      className="text-sm font-medium tabular-nums"
                    >
                      {invoice.number}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {invoice.customer}
                  </TableCell>
                  <TableCell>
                    <span dir="ltr" className="text-sm font-medium tabular-nums">
                      {invoice.amount}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      dir="ltr"
                      className="text-sm tabular-nums text-muted-foreground"
                    >
                      {invoice.issued}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "h-6 rounded-full px-2.5 font-medium",
                        statusStyles[invoice.status]
                      )}
                    >
                      {statusLabel[invoice.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-end">
                    <div className="flex justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                      <RowActions invoice={invoice} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  )
}
