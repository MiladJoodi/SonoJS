"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"
import sunglassImg from "./images/sunglass.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Fulfillment desk — wide sheet with per-line status chips and pipeline. */
const ITEMS = [
  {
    id: 1,
    name: "Sun Glass",
    size: "LG",
    quantity: 1,
    price: 20,
    status: "Dispatched" as const,
    tone: "done" as const,
    image: assetSrc(sunglassImg),
  },
  {
    id: 2,
    name: "Echo Elegance",
    size: "XL",
    quantity: 1,
    price: 24,
    status: "Processing" as const,
    tone: "warn" as const,
    image: assetSrc(sneakerImg),
  },
  {
    id: 3,
    name: "Smart Watch Timex",
    size: "MD",
    quantity: 1,
    price: 22,
    status: "Shipped" as const,
    tone: "info" as const,
    image: assetSrc(watchImg),
  },
]

const SUMMARY = { subtotal: 66, shipping: 4, tax: 10, total: 80 }

function money(n: number) {
  return `$${n.toFixed(2)}`
}

function statusClass(tone: "done" | "warn" | "info") {
  if (tone === "done") return "bg-primary/10 text-primary"
  if (tone === "warn") return "bg-amber-500/15 text-amber-700 dark:text-amber-400"
  return "bg-sky-500/15 text-sky-700 dark:text-sky-400"
}

export default function OrderSummary({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full bg-canvas px-4 py-8 md:px-8 md:py-12", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col gap-6 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
              Fulfillment
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              Order board
            </h1>
            <address className="mt-3 not-italic">
              <p className="text-sm font-medium text-foreground">
                Emily Johnson
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                425 Park Avenue, Unit 3C, San Francisco, CA 94107
              </p>
            </address>
          </div>

          <ol
            className="flex w-full gap-1.5 sm:max-w-xs"
            aria-label="Pipeline"
          >
            {["Placed", "Packed", "In transit", "Delivered"].map((label, i) => (
              <li key={label} className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span
                  className={cn(
                    "h-1.5 rounded-full",
                    i < 3 ? "bg-primary" : "bg-muted"
                  )}
                />
                <span className="truncate text-[10px] font-medium text-muted-foreground">
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </header>

        <section className="mt-2" aria-labelledby="os02-items">
          <h2 id="os02-items" className="sr-only">
            Ordered items
          </h2>

          <div className="hidden border-b border-border/70 py-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase sm:grid sm:grid-cols-[minmax(0,1fr)_7rem_6rem] sm:gap-6 md:grid-cols-[minmax(0,1fr)_8rem_7rem]">
            <span>Product</span>
            <span>Status</span>
            <span className="text-end">Price</span>
          </div>

          <ul className="divide-y divide-border/70">
            {ITEMS.map((item) => (
              <li
                key={item.id}
                className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_7rem_6rem] sm:items-center sm:gap-6 md:grid-cols-[minmax(0,1fr)_8rem_7rem]"
              >
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-[12px] border border-border/70 bg-card p-1.5 shadow-soft sm:size-24 sm:p-2">
                    <img
                      src={item.image}
                      alt=""
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold break-words text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Size{" "}
                      <span className="font-medium text-foreground/80">
                        {item.size}
                      </span>
                      <span className="mx-1.5 text-border">·</span>
                      Qty{" "}
                      <span className="font-medium text-foreground/80">
                        {item.quantity}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:contents">
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-muted-foreground sm:hidden">
                      Status
                    </p>
                    <span
                      className={cn(
                        "inline-flex rounded-md px-2 py-1 text-xs font-medium",
                        statusClass(item.tone)
                      )}
                      aria-label={`Status: ${item.status}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="text-end sm:text-end">
                    <p className="mb-1.5 text-xs font-medium text-muted-foreground sm:hidden">
                      Price
                    </p>
                    <p
                      dir="ltr"
                      className="text-sm font-semibold text-foreground tabular-nums"
                    >
                      {money(item.price)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="mt-6 w-full rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:ms-auto sm:max-w-sm sm:p-5"
          aria-labelledby="os02-sum"
          style={{
            backgroundColor: "var(--card, #ffffff)",
            boxShadow:
              "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
          }}
        >
          <h2
            id="os02-sum"
            className="mb-4 text-sm font-semibold text-foreground"
          >
            Settlement
          </h2>
          <dl className="space-y-3 text-sm">
            {(
              [
                ["Subtotal", SUMMARY.subtotal],
                ["Shipping", SUMMARY.shipping],
                ["Tax", SUMMARY.tax],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-3 text-muted-foreground"
              >
                <dt>{label}</dt>
                <dd
                  dir="ltr"
                  className="font-semibold text-foreground tabular-nums"
                >
                  {money(value)}
                </dd>
              </div>
            ))}
            <div className="flex justify-between gap-3 border-t border-border/70 pt-3 font-semibold text-foreground">
              <dt>Total</dt>
              <dd dir="ltr" className="tabular-nums">
                {money(SUMMARY.total)}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  )
}
