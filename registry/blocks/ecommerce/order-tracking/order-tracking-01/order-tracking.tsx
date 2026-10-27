"use client"

import * as React from "react"
import { CheckIcon, HomeIcon, TruckIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const PRODUCTS = [
  {
    id: 1,
    name: "Velvet Sneaker",
    qty: 1,
    price: 20.0,
    image: assetSrc(sneakerImg),
  },
  {
    id: 2,
    name: "Smart Watch Timex",
    qty: 1,
    price: 60.0,
    image: assetSrc(watchImg),
  },
] as const

const STEPS = [
  {
    title: "Order placed",
    date: "28 Feb 2025, 08:00",
    datetime: "2025-02-28T08:00",
    completed: true,
    icon: CheckIcon,
  },
  {
    title: "Arrived at courier warehouse",
    date: "05 March 2025, 01:10",
    datetime: "2025-03-05T01:10",
    completed: true,
    icon: CheckIcon,
  },
  {
    title: "Out for delivery",
    date: "Courier is on the way",
    datetime: undefined as string | undefined,
    completed: false,
    icon: TruckIcon,
  },
  {
    title: "Expected delivery",
    date: "06 March 2025",
    datetime: "2025-03-06",
    completed: false,
    icon: HomeIcon,
  },
] as const

const BILLING = {
  subtotal: 120,
  shipping: 4,
  tax: 6,
  total: 130,
} as const

export default function OrderTracking({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "w-full min-w-0 bg-white px-4 py-8 sm:py-10 md:px-8 dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <div className="min-w-0 flex-1 text-start">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Order Tracking
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:mt-4">
              Tracking Id:{" "}
              <span className="font-medium text-foreground" dir="ltr">
                #51235541
              </span>
            </p>
          </div>

          <Button type="button" className="w-full shrink-0 sm:w-auto">
            Download invoice
          </Button>
        </div>

        <section
          className="mt-10 border-b border-border pb-6 sm:mt-12"
          aria-labelledby="order-tracking-01-steps-heading"
        >
          <h2 id="order-tracking-01-steps-heading" className="sr-only">
            Tracking steps
          </h2>
          <ol className="grid grid-cols-1 gap-6 min-[400px]:grid-cols-2 md:grid-cols-4">
            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <li key={step.title} className="min-w-0 text-start">
                  <span
                    className={cn(
                      "mb-4 flex size-9 items-center justify-center rounded-full",
                      step.completed
                        ? "bg-emerald-500 text-white"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-[18px]",
                        step.completed ? "stroke-[2.5]" : undefined
                      )}
                      aria-hidden
                    />
                  </span>
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.datetime ? (
                      <time dateTime={step.datetime} dir="ltr">
                        {step.date}
                      </time>
                    ) : (
                      step.date
                    )}
                  </p>
                </li>
              )
            })}
          </ol>
        </section>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-12">
          <section aria-labelledby="order-tracking-01-products-heading">
            <div className="border-b border-border pb-2">
              <h2
                id="order-tracking-01-products-heading"
                className="text-start text-base font-semibold text-foreground"
              >
                Products
              </h2>
            </div>

            <ul className="mt-6 space-y-4">
              {PRODUCTS.map((product, index) => (
                <React.Fragment key={product.id}>
                  <li className="grid items-center gap-4 sm:grid-cols-3">
                    <div className="col-span-2 flex min-w-0 items-center gap-4">
                      <div className="size-20 shrink-0 rounded-md bg-muted p-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 text-start">
                        <p className="text-sm font-semibold text-foreground">
                          {product.name}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Qty:{" "}
                          <span
                            className="font-medium text-foreground"
                            dir="ltr"
                          >
                            {product.qty}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="sm:ms-auto sm:text-end">
                      <p
                        className="text-sm font-semibold text-foreground"
                        dir="ltr"
                      >
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </li>
                  {index < PRODUCTS.length - 1 ? (
                    <hr className="border-border" />
                  ) : null}
                </React.Fragment>
              ))}
            </ul>
          </section>

          <section
            className="h-max rounded-md bg-muted p-5 sm:p-6"
            aria-labelledby="order-tracking-01-billing-heading"
          >
            <div className="border-b border-border pb-2">
              <h2
                id="order-tracking-01-billing-heading"
                className="text-start text-base font-semibold text-foreground"
              >
                Billing details
              </h2>
            </div>

            <ul className="mt-6 space-y-4 font-medium" role="list">
              {(
                [
                  ["Subtotal", BILLING.subtotal],
                  ["Shipping", BILLING.shipping],
                  ["Tax", BILLING.tax],
                ] as const
              ).map(([label, value]) => (
                <li
                  key={label}
                  className="flex flex-wrap gap-4 text-sm text-muted-foreground"
                >
                  {label}
                  <span
                    className="ms-auto font-semibold text-foreground"
                    dir="ltr"
                  >
                    ${value.toFixed(2)}
                  </span>
                </li>
              ))}
              <li aria-hidden className="border-t border-border" />
              <li className="flex flex-wrap gap-4 text-sm font-semibold text-foreground">
                Total
                <span className="ms-auto" dir="ltr">
                  ${BILLING.total.toFixed(2)}
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
