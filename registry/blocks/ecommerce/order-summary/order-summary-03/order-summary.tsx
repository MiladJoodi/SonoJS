"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import mastercardImg from "./images/mastercard.webp"
import sneakerImg from "./images/sneaker.webp"
import watchAltImg from "./images/watch-alt.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Commerce success — celebration masthead, meta chips, sticky track card. */
const ITEMS = [
  {
    id: 1,
    name: "Velvet Sneaker",
    size: "MD",
    quantity: 1,
    price: "$20.00",
    image: assetSrc(sneakerImg),
  },
  {
    id: 2,
    name: "Smart Watch Timex",
    size: "SM",
    quantity: 1,
    price: "$60.00",
    image: assetSrc(watchImg),
  },
  {
    id: 3,
    name: "French Connection",
    size: "LG",
    quantity: 1,
    price: "$40.00",
    image: assetSrc(watchAltImg),
  },
] as const

const mastercardSrc = assetSrc(mastercardImg)

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4", className)}
      aria-hidden
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
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
        <header className="relative overflow-hidden rounded-[12px] border border-border/70 bg-card px-4 py-6 shadow-soft sm:px-8 sm:py-9">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary"
            aria-hidden
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase">
                <TruckIcon />
                In transit
              </p>
              <h1 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-3xl">
                You&apos;re all set
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                Purchase confirmed. Track your parcel or review the items below.
              </p>
            </div>
            <div className="w-full shrink-0 rounded-[12px] border border-border/70 bg-canvas px-4 py-3 text-start sm:w-auto sm:text-end">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Arrives by
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums">
                Apr 15, 2025
              </p>
            </div>
          </div>
        </header>

        <section
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          aria-labelledby="os03-meta"
        >
          <h2 id="os03-meta" className="sr-only">
            Order information
          </h2>
          {(
            [
              ["Delivery", "Apr 15, 2025"],
              ["Order ID", "#9876543210"],
              ["Payment", "mastercard"],
              ["Ship to", "45 Hudson St, New York 10013"],
            ] as const
          ).map(([label, value]) => (
            <div
              key={label}
              className="rounded-[12px] border border-border/70 bg-card px-4 py-3.5 shadow-soft"
            >
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                {label}
              </p>
              {value === "mastercard" ? (
                <span className="mt-2 inline-flex rounded-md bg-white px-1.5 py-1">
                  <img
                    src={mastercardSrc}
                    alt="Mastercard"
                    className="h-7 w-auto object-contain"
                  />
                </span>
              ) : (
                <p
                  dir={label === "Order ID" ? "ltr" : undefined}
                  className="mt-2 text-sm font-semibold break-words text-foreground"
                >
                  {value}
                </p>
              )}
            </div>
          ))}
        </section>

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-3 lg:gap-8">
          {/* Billing first in DOM for mobile CTA + a11y; desktop places it end-edge. */}
          <aside
            className="h-max rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 lg:col-start-3 lg:row-start-1 lg:sticky lg:top-6"
            style={{
              backgroundColor: "var(--card, #ffffff)",
              boxShadow:
                "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
            }}
            aria-labelledby="os03-bill"
          >
            <h2
              id="os03-bill"
              className="border-b border-border/70 pb-3 text-base font-semibold"
            >
              Billing
            </h2>
            <dl className="mt-5 space-y-3 text-sm">
              {(
                [
                  ["Subtotal", "$120.00"],
                  ["Shipping", "$4.00"],
                  ["Tax", "$6.00"],
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
                    {value}
                  </dd>
                </div>
              ))}
              <div className="flex justify-between gap-3 border-t border-border/70 pt-3 font-semibold text-foreground">
                <dt>Total</dt>
                <dd dir="ltr" className="tabular-nums">
                  $130.00
                </dd>
              </div>
            </dl>
            <Button asChild className="mt-6 w-full">
              <a href="#">Track order</a>
            </Button>
            <p className="mt-3 text-center text-caption text-muted-foreground">
              Updates via email & SMS
            </p>
          </aside>

          <section
            className="space-y-0 lg:col-span-2 lg:col-start-1 lg:row-start-1"
            aria-labelledby="os03-items"
          >
            <h2
              id="os03-items"
              className="mb-4 text-sm font-semibold text-foreground"
            >
              Bag ({ITEMS.length})
            </h2>
            <ul className="divide-y divide-border/70 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
              {ITEMS.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-3 p-3.5 sm:items-center sm:gap-4 sm:p-4"
                >
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="size-16 shrink-0 rounded-[12px] bg-muted p-1.5 sm:size-24 sm:p-2">
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
                        Size {item.size}
                        <span className="mx-1.5 text-border">·</span>
                        Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p
                    dir="ltr"
                    className="shrink-0 pt-1 text-sm font-semibold tabular-nums sm:ps-4 sm:pt-0 sm:text-base"
                  >
                    {item.price}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
