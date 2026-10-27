"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Boutique receipt — compact confirmation ticket with success stamp. */
const ORDER = {
  number: "#ORD-78945",
  date: "June 15, 2025",
  dateTime: "2025-06-15",
  status: "Paid",
  customer: "Alex Johnson",
  method: "Express Delivery",
  address: "123 Main St, Apt 4B",
  phone: "(555) 123-4567",
  items: [
    {
      id: 1,
      name: "Stylish Golden Watch",
      meta: "Golden · Qty 1",
      price: "$129.00",
      image: assetSrc(watchImg),
    },
    {
      id: 2,
      name: "Velvet Sneaker",
      meta: "Black/White · Qty 1",
      price: "$238.00",
      image: assetSrc(sneakerImg),
    },
  ],
  summary: {
    subtotal: "$367.00",
    shipping: "$0.00",
    tax: "$29.36",
    total: "$396.36",
  },
} as const

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-5", className)}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function Row({
  label,
  value,
  emphasize,
}: {
  label: string
  value: string
  emphasize?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 text-sm",
        emphasize && "border-t border-border/70 pt-3 font-semibold"
      )}
    >
      <dt
        className={cn(
          emphasize ? "text-foreground" : "text-muted-foreground font-medium"
        )}
      >
        {label}
      </dt>
      <dd
        dir="ltr"
        className={cn(
          "tabular-nums",
          emphasize ? "text-foreground" : "font-semibold text-foreground"
        )}
      >
        {value}
      </dd>
    </div>
  )
}

export default function OrderSummary({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-canvas px-4 py-10 md:px-8 md:py-14",
        className
      )}
      {...props}
    >
      <article
        className="w-full max-w-md overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        style={{
          backgroundColor: "var(--card, #ffffff)",
          boxShadow:
            "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
        }}
      >
        <header className="relative overflow-hidden bg-primary px-5 py-6 text-primary-foreground sm:px-6 sm:py-7">
          <div
            className="pointer-events-none absolute -end-10 -top-10 size-36 rounded-full bg-primary-foreground/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -start-6 bottom-0 size-24 rounded-full bg-primary-foreground/10"
            aria-hidden
          />
          <div className="relative flex items-start gap-3 sm:gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary shadow-soft sm:size-11">
              <CheckIcon />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base font-semibold tracking-tight sm:text-lg">
                  Payment confirmed
                </h1>
                <span className="rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[11px] font-medium">
                  {ORDER.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-primary-foreground/85">
                Thanks, {ORDER.customer.split(" ")[0]} — your receipt is ready.
              </p>
            </div>
          </div>

          <ol className="relative mt-5 flex gap-2 text-[11px] font-medium text-primary-foreground/80 sm:mt-6">
            {["Ordered", "Paid", "Preparing"].map((step, i) => (
              <li key={step} className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span
                  className={cn(
                    "h-1 rounded-full",
                    i < 2 ? "bg-primary-foreground" : "bg-primary-foreground/30"
                  )}
                />
                <span className="truncate">{step}</span>
              </li>
            ))}
          </ol>
        </header>

        <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
          <dl className="grid grid-cols-1 gap-3 rounded-[12px] border border-border/70 bg-canvas p-3.5 min-[400px]:grid-cols-3">
            <div>
              <dt className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Order
              </dt>
              <dd
                dir="ltr"
                className="mt-1 truncate text-sm font-semibold tabular-nums"
              >
                {ORDER.number}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Date
              </dt>
              <dd className="mt-1 text-sm font-semibold">
                <time dateTime={ORDER.dateTime}>{ORDER.date}</time>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Total
              </dt>
              <dd
                dir="ltr"
                className="mt-1 text-sm font-semibold text-primary tabular-nums"
              >
                {ORDER.summary.total}
              </dd>
            </div>
          </dl>

          <section aria-labelledby="os01-ship">
            <h2
              id="os01-ship"
              className="mb-3 text-sm font-semibold text-foreground"
            >
              Ships to
            </h2>
            <div className="rounded-[12px] border border-border/70 bg-canvas p-3.5 text-sm">
              <p className="font-medium">{ORDER.customer}</p>
              <p className="mt-1 text-muted-foreground">{ORDER.address}</p>
              <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-caption text-muted-foreground">
                <span>{ORDER.method}</span>
                <span dir="ltr" className="tabular-nums">
                  {ORDER.phone}
                </span>
              </p>
            </div>
          </section>

          <section aria-labelledby="os01-items">
            <h2
              id="os01-items"
              className="mb-3 text-sm font-semibold text-foreground"
            >
              Items ({ORDER.items.length})
            </h2>
            <ul className="space-y-3">
              {ORDER.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 min-[360px]:items-center"
                >
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-[10px] bg-muted p-1.5">
                    <img
                      src={item.image}
                      alt=""
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium break-words">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-caption text-muted-foreground">
                      {item.meta}
                    </p>
                  </div>
                  <p
                    dir="ltr"
                    className="shrink-0 pt-0.5 text-sm font-semibold tabular-nums min-[360px]:pt-0"
                  >
                    {item.price}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="os01-sum"
            className="rounded-[12px] border border-border/70 bg-canvas p-3.5"
          >
            <h2 id="os01-sum" className="sr-only">
              Totals
            </h2>
            <dl className="space-y-2.5">
              <Row label="Subtotal" value={ORDER.summary.subtotal} />
              <Row label="Shipping" value={ORDER.summary.shipping} />
              <Row label="Tax" value={ORDER.summary.tax} />
              <Row label="Total" value={ORDER.summary.total} emphasize />
            </dl>
          </section>
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-border/70 bg-canvas px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <a
            href="#"
            className="cursor-pointer py-2 text-center text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring sm:py-0 sm:text-start"
          >
            Contact support
          </a>
          <Button
            type="button"
            size="sm"
            className="w-full sm:w-auto"
            aria-label={`Download invoice for ${ORDER.number}`}
          >
            Download invoice
          </Button>
        </footer>
      </article>
    </div>
  )
}
