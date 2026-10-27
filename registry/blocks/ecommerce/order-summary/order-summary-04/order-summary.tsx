"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"
import watchAltImg from "./images/watch-alt.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Split atelier — start rail for ship/bill, magazine item column. */
const PRODUCTS = [
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
        <header className="mb-6 max-w-2xl sm:mb-10">
          <p className="text-caption font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Sono Atelier
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Order summary
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Your purchase was successful. Review shipping and billing, then your
            pieces.
          </p>
        </header>

        <div className="grid overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-3">
          <aside className="space-y-8 border-b border-border/70 bg-muted/40 p-4 sm:space-y-10 sm:p-8 lg:border-b-0 lg:border-e">
            <section aria-labelledby="os04-ship">
              <h2
                id="os04-ship"
                className="text-sm font-semibold tracking-wide text-foreground uppercase"
              >
                Shipping
              </h2>
              <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {(
                  [
                    ["Customer", "Alex Johnson"],
                    ["Method", "Express Delivery"],
                    ["Address", "425 Park Avenue, San Francisco, CA 94107"],
                    ["Phone", "(555) 123-4567"],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-medium text-muted-foreground">
                      {label}
                    </dt>
                    <dd
                      dir={label === "Phone" ? "ltr" : undefined}
                      className="mt-1.5 text-sm font-medium text-foreground"
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="os04-bill">
              <h2
                id="os04-bill"
                className="text-sm font-semibold tracking-wide text-foreground uppercase"
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
            </section>
          </aside>

          <section
            className="p-4 sm:p-8 lg:col-span-2"
            aria-labelledby="os04-items"
          >
            <div className="mb-4 flex items-baseline justify-between gap-3 sm:mb-6">
              <h2
                id="os04-items"
                className="text-sm font-semibold tracking-wide text-foreground uppercase"
              >
                Pieces
              </h2>
              <p className="text-caption text-muted-foreground">
                {PRODUCTS.length} items
              </p>
            </div>

            <ol className="space-y-0">
              {PRODUCTS.map((product, index) => (
                <li
                  key={product.id}
                  className={cn(
                    "flex flex-col gap-3 py-4 sm:grid sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:py-5",
                    index > 0 && "border-t border-border/70"
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3 sm:contents">
                    <span
                      dir="ltr"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border/70 text-caption font-semibold text-muted-foreground tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                      <div className="size-16 shrink-0 rounded-[12px] bg-muted p-1.5 sm:size-24 sm:p-2">
                        <img
                          src={product.image}
                          alt=""
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold break-words text-foreground">
                          {product.name}
                        </h3>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          Size {product.size}
                          <span className="mx-1.5 text-border">·</span>
                          Qty {product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p
                    dir="ltr"
                    className="ps-11 text-end text-base font-semibold tabular-nums sm:ps-0"
                  >
                    {product.price}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}
