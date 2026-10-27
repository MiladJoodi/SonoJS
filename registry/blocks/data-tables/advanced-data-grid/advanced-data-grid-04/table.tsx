"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  FilterIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  ReceiptIcon,
  SearchIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type ContactRow = {
  id: number
  name: string
  email: string
  phone: string
  balance: string
  lastBill: string
}

const DEFAULT_ROWS: ContactRow[] = [
  {
    id: 1,
    name: "NovaSphere Ltd.",
    email: "emily.ross@nvsphere.com",
    phone: "(318) 555–0192",
    balance: "$1,240.00",
    lastBill: "Mar 12",
  },
  {
    id: 2,
    name: "QuantumEdge Solutions",
    email: "leo.sanders@qedge.io",
    phone: "(272) 555–0138",
    balance: "$0.00",
    lastBill: "Apr 2",
  },
  {
    id: 3,
    name: "MetaBridge Agency",
    email: "mia.foster@metabridge.net",
    phone: "(402) 555–0187",
    balance: "$890.50",
    lastBill: "Mar 28",
  },
  {
    id: 4,
    name: "CloudCrate Systems",
    email: "alex.hughes@cratecloud.com",
    phone: "(213) 555–0159",
    balance: "$2,100.00",
    lastBill: "Apr 8",
  },
  {
    id: 5,
    name: "AlphaFusion",
    email: "chloe.bennett@alphafuse.org",
    phone: "(390) 555–0125",
    balance: "$0.00",
    lastBill: "Feb 19",
  },
  {
    id: 6,
    name: "Loopstack Corp.",
    email: "lucas.morris@loopstack.com",
    phone: "(229) 555–0176",
    balance: "$415.00",
    lastBill: "Mar 30",
  },
  {
    id: 7,
    name: "Skyline Metrics",
    email: "zoe.mitchell@skyline.co",
    phone: "(607) 555–0181",
    balance: "$3,050.00",
    lastBill: "Apr 5",
  },
  {
    id: 8,
    name: "Driftbyte Studio",
    email: "ethan.james@driftbyte.dev",
    phone: "(805) 555–0116",
    balance: "$0.00",
    lastBill: "Jan 22",
  },
  {
    id: 9,
    name: "OrbitForge Enterprises",
    email: "ava.kelly@orbitforge.ai",
    phone: "(509) 555–0199",
    balance: "$675.25",
    lastBill: "Mar 18",
  },
  {
    id: 10,
    name: "NeonAxis Ventures",
    email: "ryan.cole@neonaxis.biz",
    phone: "(270) 555–0168",
    balance: "$1,980.00",
    lastBill: "Apr 9",
  },
]

const PAGES = [1, 2, 3, 4, 5, 6] as const

export default function AdvancedDataGrid({
  rows = DEFAULT_ROWS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  rows?: ContactRow[]
}) {
  const searchId = React.useId()
  const [query, setQuery] = React.useState("")
  const [page, setPage] = React.useState(1)

  const filtered = !query.trim()
    ? rows
    : rows.filter((row) =>
        [row.name, row.email, row.phone, row.balance]
          .join(" ")
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      )

  const openBalanceCount = rows.filter((row) => row.balance !== "$0.00").length

  const initials = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase()

  const balanceBadge = (balance: string) => {
    const settled = balance === "$0.00"
    return (
      <span
        className={cn(
          "inline-flex rounded-md px-2 py-1 text-sm font-semibold tabular-nums",
          settled
            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
            : "bg-amber-500/10 text-amber-800 dark:text-amber-300"
        )}
      >
        {balance}
      </span>
    )
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-card px-4 py-8 sm:py-12 md:px-8 md:py-16",
        className
      )}
      aria-label="Accounts receivable"
      {...props}
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <div className="mb-6 grid gap-5 sm:mb-8 sm:gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="min-w-0 text-start">
            <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Billing · Receivables
            </p>
            <h2 className="text-h3 font-semibold tracking-tight text-foreground">
              Customer accounts
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Raise invoices against open balances and keep contact details
              ready for collections.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <div className="rounded-[12px] border border-border/70 bg-background px-4 py-3 shadow-soft">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Accounts
              </p>
              <p className="mt-0.5 text-xl font-semibold text-foreground tabular-nums">
                {rows.length}
              </p>
            </div>
            <div className="rounded-[12px] border border-border/70 bg-background px-4 py-3 shadow-soft">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Open balances
              </p>
              <p className="mt-0.5 text-xl font-semibold text-foreground tabular-nums">
                {openBalanceCount}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3">
          <form
            className="w-full min-w-0"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex h-[46px] items-center gap-2.5 rounded-md border border-border/70 bg-background px-3 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40">
              <SearchIcon
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <label htmlFor={searchId} className="sr-only">
                Search accounts
              </label>
              <input
                type="search"
                id={searchId}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search company, email, phone…"
                className="min-w-0 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </form>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <button
              type="button"
              className="inline-flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-md border border-border/70 bg-background px-3.5 text-sm font-semibold text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FilterIcon className="size-4 shrink-0" aria-hidden />
              Filter
            </button>
            <button
              type="button"
              className="inline-flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-md border border-border/70 bg-background px-3.5 text-sm font-semibold text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <DownloadIcon className="size-4 shrink-0" aria-hidden />
              Export
            </button>
            <button
              type="button"
              className="col-span-2 inline-flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-3.5 text-sm font-semibold text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring sm:col-span-1"
            >
              <PlusIcon className="size-4 shrink-0" aria-hidden />
              Add account
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[12px] border border-border/70 px-5 py-14 text-center text-sm text-muted-foreground shadow-soft">
            No accounts match your search.
          </div>
        ) : (
          <>
            <ul className="flex flex-col gap-3 md:hidden">
              {filtered.map((row) => (
                <li
                  key={row.id}
                  className="rounded-[12px] border border-border/70 bg-background p-4 shadow-soft"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-border/70 bg-card text-xs font-bold tracking-wide text-foreground">
                      {initials(row.name)}
                    </span>
                    <div className="min-w-0 flex-1 text-start">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground">
                            {row.name}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Account #{String(row.id).padStart(4, "0")} · Last
                            bill {row.lastBill}
                          </p>
                        </div>
                        {balanceBadge(row.balance)}
                      </div>
                      <div className="mt-3 space-y-1.5 text-sm">
                        <p className="flex min-w-0 items-center gap-2 text-muted-foreground">
                          <MailIcon
                            className="size-3.5 shrink-0 opacity-70"
                            aria-hidden
                          />
                          <a
                            href={`mailto:${row.email}`}
                            className="min-w-0 truncate outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {row.email}
                          </a>
                        </p>
                        <p className="flex items-center gap-2 text-muted-foreground tabular-nums">
                          <PhoneIcon
                            className="size-3.5 shrink-0 opacity-70"
                            aria-hidden
                          />
                          {row.phone}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="mt-4 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-border/70 bg-card px-3 text-sm font-semibold text-foreground outline-none hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <ReceiptIcon className="size-4" aria-hidden />
                        Create a bill
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden overflow-hidden rounded-[12px] border border-border/70 shadow-soft md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-start">
                  <thead>
                    <tr className="border-b border-border/70 bg-muted/30 dark:bg-muted/20">
                      <th
                        scope="col"
                        className="px-5 py-3.5 text-start text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                      >
                        Account
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3.5 text-start text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                      >
                        Contact
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3.5 text-end text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                      >
                        Balance
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3.5 text-start text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                      >
                        Last bill
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3.5 text-end text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row, index) => (
                      <tr
                        key={row.id}
                        className={cn(
                          "border-b border-border/70 last:border-b-0 transition-colors hover:bg-muted/25",
                          index % 2 === 1 && "bg-muted/10"
                        )}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-border/70 bg-background text-xs font-bold tracking-wide text-foreground">
                              {initials(row.name)}
                            </span>
                            <div className="min-w-0 text-start">
                              <p className="font-semibold text-foreground">
                                {row.name}
                              </p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                Account #{String(row.id).padStart(4, "0")}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="space-y-1.5 text-sm">
                            <p className="flex min-w-0 items-center gap-2 text-muted-foreground">
                              <MailIcon
                                className="size-3.5 shrink-0 opacity-70"
                                aria-hidden
                              />
                              <a
                                href={`mailto:${row.email}`}
                                className="min-w-0 truncate outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                {row.email}
                              </a>
                            </p>
                            <p className="flex items-center gap-2 text-muted-foreground tabular-nums">
                              <PhoneIcon
                                className="size-3.5 shrink-0 opacity-70"
                                aria-hidden
                              />
                              {row.phone}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-end">
                          {balanceBadge(row.balance)}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-muted-foreground tabular-nums">
                          {row.lastBill}
                        </td>
                        <td className="px-5 py-4 text-end">
                          <button
                            type="button"
                            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border border-border/70 bg-background px-3 text-sm font-semibold text-foreground outline-none hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <ReceiptIcon className="size-4" aria-hidden />
                            Create a bill
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground tabular-nums">
              {filtered.length}
            </span>{" "}
            accounts
          </p>
          <nav
            aria-label="Pagination"
            className="inline-flex w-full items-center justify-between gap-2 rounded-md border border-border/70 bg-background p-1 shadow-soft sm:w-auto sm:justify-start"
          >
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-[10px] px-3 text-sm font-medium text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronLeftIcon className="icon-dir size-4" />
              Prev
            </button>
            <span className="px-2 text-sm text-muted-foreground tabular-nums">
              {page} / {PAGES.length}
            </span>
            <button
              type="button"
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(PAGES.length, p + 1))}
              disabled={page >= PAGES.length}
              className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-[10px] px-3 text-sm font-medium text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Next
              <ChevronRightIcon className="icon-dir size-4" />
            </button>
          </nav>
        </div>
      </div>
    </section>
  )
}
