"use client"

import * as React from "react"
import { CheckIcon, HomeIcon, TruckIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"
import watchImg from "./images/watch.webp"
import watchSilverImg from "./images/watch-silver.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const ORDER = {
  trackingId: "#51235541",
  customer: {
    name: "Alex Johnson",
    email: "alex125@gmail.com",
    shippingAddress: "425 Park Avenue, San Francisco, CA 94107",
    billingAddress: "Same as shipping address",
    paymentMethod: "Cash on delivery",
  },
  billing: {
    subtotal: 120.0,
    shipping: 4.0,
    tax: 6.0,
    total: 130.0,
  },
  products: [
    {
      id: 1,
      name: "Velvet Sneaker",
      color: "Black/White",
      qty: 1,
      price: 20.0,
      image: assetSrc(sneakerImg),
    },
    {
      id: 2,
      name: "Smart Watch Timex",
      color: "Gray",
      qty: 1,
      price: 60.0,
      image: assetSrc(watchImg),
    },
    {
      id: 3,
      name: "French Connection",
      color: "Silver",
      qty: 1,
      price: 40.0,
      image: assetSrc(watchSilverImg),
    },
  ],
}

const TIMELINE = [
  {
    type: "expected" as const,
    title: "Expected delivery on 06 March 2025",
    description: "Products delivered",
    dateValue: "2025-03-06",
    isCurrent: true,
  },
  {
    type: "outForDelivery" as const,
    title: "Out for delivery",
    description: "Courier is on the way",
  },
  {
    type: "statusUpdate" as const,
    title: "Arrived at courier warehouse",
    time: "05 March 2025, 01:10",
    dateValue: "2025-03-05T01:10",
    completed: true,
  },
  {
    type: "statusUpdate" as const,
    title: "Shipped from warehouse",
    time: "03 March 2025, 12:00",
    dateValue: "2025-03-03T12:00",
    completed: true,
  },
  {
    type: "statusUpdate" as const,
    title: "Payment confirmed",
    time: "28 Feb 2025, 08:30",
    dateValue: "2025-02-28T08:30",
    completed: true,
  },
  {
    type: "statusUpdate" as const,
    title: "Order placed",
    time: "28 Feb 2025, 08:00",
    dateValue: "2025-02-28T08:00",
    completed: true,
  },
]

function TimelineIcon({ type }: { type: (typeof TIMELINE)[number]["type"] }) {
  if (type === "expected") {
    return <HomeIcon className="size-4 text-foreground" aria-hidden />
  }
  if (type === "outForDelivery") {
    return <TruckIcon className="size-4 text-foreground" aria-hidden />
  }
  return (
    <CheckIcon
      className="size-4 text-primary dark:text-primary-foreground"
      aria-hidden
    />
  )
}

function BillingRow({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex flex-wrap gap-4 text-sm text-muted-foreground">
      {label}
      <span className="ms-auto font-semibold text-foreground" dir="ltr">
        ${value.toFixed(2)}
      </span>
    </li>
  )
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-start">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}

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
        <header className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <div className="min-w-0 flex-1 text-start">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Order Tracking
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Tracking Id:{" "}
              <span className="font-semibold text-foreground" dir="ltr">
                {ORDER.trackingId}
              </span>
            </p>
          </div>
          <Button
            type="button"
            className="w-full shrink-0 sm:w-auto"
            aria-label={`Download invoice for order ${ORDER.trackingId}`}
          >
            Download invoice
          </Button>
        </header>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-3">
          <div className="min-w-0 space-y-8 lg:col-span-2">
            <section aria-labelledby="order-tracking-05-products-heading">
              <h2
                id="order-tracking-05-products-heading"
                className="text-start text-lg font-semibold text-foreground"
              >
                Products
              </h2>
              <ul
                className="mt-4 space-y-4 rounded-md border border-border/70 p-4 sm:p-5"
                role="list"
              >
                {ORDER.products.map((product, index) => (
                  <React.Fragment key={product.id}>
                    <li className="grid grid-cols-2 items-center gap-4 sm:grid-cols-5">
                      <div className="col-span-full flex min-w-0 items-center gap-4 sm:col-span-3">
                        <div className="size-[70px] shrink-0 rounded-md bg-muted p-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="size-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 text-start">
                          <h3 className="text-sm font-semibold text-foreground">
                            {product.name}
                          </h3>
                          <p className="mt-2 text-xs text-muted-foreground">
                            Color:{" "}
                            <span className="text-muted-foreground">
                              {product.color}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="text-start">
                        <p className="text-sm font-medium text-muted-foreground">
                          Qty
                        </p>
                        <p
                          className="mt-2 text-sm font-semibold text-foreground"
                          dir="ltr"
                        >
                          x{product.qty}
                        </p>
                      </div>
                      <div className="ms-auto text-end">
                        <p
                          className="text-sm font-semibold text-foreground"
                          dir="ltr"
                        >
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </li>
                    {index < ORDER.products.length - 1 ? (
                      <hr className="border-border" />
                    ) : null}
                  </React.Fragment>
                ))}
              </ul>
            </section>

            <section aria-labelledby="order-tracking-05-billing-heading">
              <h2
                id="order-tracking-05-billing-heading"
                className="text-start text-lg font-semibold text-foreground"
              >
                Billing details
              </h2>
              <div className="mt-4 rounded-md border border-border/70 p-4 sm:p-5">
                <ul className="space-y-4 font-medium" role="list">
                  <BillingRow label="Subtotal" value={ORDER.billing.subtotal} />
                  <BillingRow label="Shipping" value={ORDER.billing.shipping} />
                  <BillingRow label="Tax" value={ORDER.billing.tax} />
                  <li aria-hidden className="border-t border-border" />
                  <li className="flex flex-wrap gap-4 text-sm font-semibold text-foreground">
                    Total
                    <span className="ms-auto" dir="ltr">
                      ${ORDER.billing.total.toFixed(2)}
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section aria-labelledby="order-tracking-05-timeline-heading">
              <h2
                id="order-tracking-05-timeline-heading"
                className="text-start text-lg font-semibold text-foreground"
              >
                Timeline
              </h2>
              <div className="mt-4 rounded-md border border-border/70 p-4 sm:p-5">
                <ul className="flex flex-col" role="list">
                  {TIMELINE.map((event, idx) => {
                    const isLast = idx === TIMELINE.length - 1
                    const completed = "completed" in event && event.completed
                    const isCurrent = "isCurrent" in event && event.isCurrent

                    return (
                      <li
                        key={event.title}
                        className={cn(
                          "flex gap-3",
                          !isLast && "pb-10"
                        )}
                        aria-current={isCurrent ? "step" : undefined}
                      >
                        <div className="flex w-7 shrink-0 flex-col items-center self-stretch">
                          <span
                            className={cn(
                              "flex size-7 shrink-0 items-center justify-center rounded-full",
                              completed
                                ? "bg-primary/20 dark:bg-primary"
                                : "bg-muted"
                            )}
                          >
                            <TimelineIcon type={event.type} />
                          </span>
                          {!isLast ? (
                            <span
                              className="mt-2 w-px flex-1 bg-border"
                              aria-hidden
                            />
                          ) : null}
                        </div>

                        <div className="min-w-0 flex-1 text-start">
                          {"time" in event && event.time ? (
                            <p className="mb-1.5 text-sm font-medium text-muted-foreground">
                              <time
                                dateTime={
                                  "dateValue" in event
                                    ? event.dateValue
                                    : undefined
                                }
                                dir="ltr"
                              >
                                {event.time}
                              </time>
                            </p>
                          ) : null}

                          <p
                            className={cn(
                              "mb-1.5 text-sm font-semibold",
                              completed ? "text-primary" : "text-foreground"
                            )}
                          >
                            {event.title}
                          </p>

                          {"description" in event && event.description ? (
                            <p className="text-sm font-medium text-muted-foreground">
                              {event.description}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
          </div>

          <aside aria-labelledby="order-tracking-05-customer-heading">
            <h2
              id="order-tracking-05-customer-heading"
              className="text-start text-lg font-semibold text-foreground"
            >
              Customer information
            </h2>
            <div className="mt-4 space-y-6 rounded-md border border-border/70 p-4 sm:p-5">
              <InfoBlock label="Name" value={ORDER.customer.name} />
              <InfoBlock label="Email" value={ORDER.customer.email} />
              <InfoBlock
                label="Shipping address"
                value={ORDER.customer.shippingAddress}
              />
              <InfoBlock
                label="Billing address"
                value={ORDER.customer.billingAddress}
              />
              <InfoBlock label="Payment" value={ORDER.customer.paymentMethod} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
