"use client"

import * as React from "react"
import { CheckIcon, HomeIcon, TruckIcon } from "lucide-react"

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
    price: "$20.00",
    img: assetSrc(sneakerImg),
  },
  {
    id: 2,
    name: "Smart Watch Timex",
    qty: 1,
    price: "$60.00",
    img: assetSrc(watchImg),
  },
] as const

const BILLING_DETAILS = [
  { label: "Subtotal", value: "$80.00" },
  { label: "Shipping", value: "$4.00" },
  { label: "Tax", value: "$6.00" },
] as const

type TimelineEvent = {
  id: string
  type: "delivery" | "status"
  title: string
  time?: string
  timeIso?: string
  description?: string
  isCurrent?: boolean
  completed?: boolean
  icon?: "home" | "truck" | "check"
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "expected",
    type: "delivery",
    title: "Expected delivery on",
    time: "06 March 2025",
    timeIso: "2025-03-06",
    description: "Products delivered",
    isCurrent: true,
    icon: "home",
  },
  {
    id: "out-for-delivery",
    type: "delivery",
    title: "Out for delivery",
    description: "Courier is on the way",
    icon: "truck",
  },
  {
    id: "warehouse",
    type: "status",
    title: "Arrived at courier warehouse",
    time: "05 March 2025, 01:10",
    timeIso: "2025-03-05T01:10",
    completed: true,
    icon: "check",
  },
  {
    id: "shipped",
    type: "status",
    title: "Shipped from warehouse",
    time: "03 March 2025, 12:00",
    timeIso: "2025-03-03T12:00",
    completed: true,
    icon: "check",
  },
  {
    id: "payment",
    type: "status",
    title: "Payment confirmed",
    time: "28 Feb 2025, 08:30",
    timeIso: "2025-02-28T08:30",
    completed: true,
    icon: "check",
  },
  {
    id: "placed",
    type: "status",
    title: "Order placed",
    time: "28 Feb 2025, 08:00",
    timeIso: "2025-02-28T08:00",
    completed: true,
    icon: "check",
  },
]

function TimelineIcon({ kind }: { kind?: TimelineEvent["icon"] }) {
  if (kind === "home") {
    return <HomeIcon className="size-4 text-foreground" aria-hidden />
  }
  if (kind === "truck") {
    return <TruckIcon className="size-4 text-foreground" aria-hidden />
  }
  return (
    <CheckIcon
      className="size-4 text-primary dark:text-primary-foreground"
      aria-hidden
    />
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
      <div className="mx-auto w-full max-w-6xl max-lg:max-w-2xl">
        <div className="text-start">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Order Tracking
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Tracking Id:{" "}
            <span className="font-medium text-foreground" dir="ltr">
              #51235541
            </span>
          </p>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-12 lg:mt-12 lg:grid-cols-3">
          <div className="min-w-0 lg:col-span-2">
            <section aria-labelledby="order-tracking-02-products-heading">
              <h2 id="order-tracking-02-products-heading" className="sr-only">
                Order items
              </h2>
              <ul className="divide-y divide-border" role="list">
                {PRODUCTS.map((product, index) => (
                  <li
                    key={product.id}
                    className={cn(
                      "grid items-center gap-4 py-4 sm:grid-cols-3",
                      index === 0 && "pt-0"
                    )}
                  >
                    <div className="col-span-2 flex min-w-0 items-center gap-4">
                      <div className="size-20 shrink-0 rounded-md bg-muted p-2">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 text-start">
                        <h3 className="text-sm font-semibold text-foreground">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-xs font-medium text-muted-foreground">
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
                        {product.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section
              className="mt-8 h-max rounded-md bg-muted p-5 sm:p-6"
              aria-labelledby="order-tracking-02-billing-heading"
            >
              <h2
                id="order-tracking-02-billing-heading"
                className="border-b border-border pb-2 text-start text-base font-semibold text-foreground"
              >
                Billing details
              </h2>
              <ul className="mt-6 space-y-4 font-medium" role="list">
                {BILLING_DETAILS.map((detail) => (
                  <li
                    key={detail.label}
                    className="flex flex-wrap gap-4 text-sm text-muted-foreground"
                  >
                    {detail.label}
                    <span
                      className="ms-auto font-semibold text-foreground"
                      dir="ltr"
                    >
                      {detail.value}
                    </span>
                  </li>
                ))}
                <li aria-hidden className="border-t border-border" />
                <li className="flex flex-wrap gap-4 text-sm font-semibold text-foreground">
                  Total
                  <span className="ms-auto" dir="ltr">
                    $90.00
                  </span>
                </li>
              </ul>
            </section>
          </div>

          <aside
            className="h-full min-w-0 border-s border-border ps-4 lg:ps-10"
            aria-labelledby="order-tracking-02-timeline-heading"
          >
            <h2 id="order-tracking-02-timeline-heading" className="sr-only">
              Order timeline
            </h2>
            <ol className="relative border-s border-border">
              {TIMELINE_EVENTS.map((event) => {
                const isDeliveryIcon =
                  event.id === "expected" || event.id === "out-for-delivery"
                const filled =
                  !isDeliveryIcon && (event.completed || event.isCurrent)

                return (
                  <li key={event.id} className="mb-10 ms-7 last:mb-0">
                    <span
                      className={cn(
                        "absolute -start-3.5 flex size-7 items-center justify-center rounded-full ring-8 ring-white dark:ring-background",
                        isDeliveryIcon
                          ? "bg-muted text-foreground"
                          : filled
                            ? "bg-primary/20 text-primary dark:bg-primary dark:text-primary-foreground"
                            : "bg-muted text-foreground"
                      )}
                    >
                      <TimelineIcon kind={event.icon} />
                    </span>

                    <div className="min-w-0 text-start">
                      {event.type === "delivery" ? (
                        <>
                          <p className="mb-0.5 text-base font-semibold text-foreground">
                            {event.title}{" "}
                            {event.time ? (
                              <time dateTime={event.timeIso} dir="ltr">
                                {event.time}
                              </time>
                            ) : null}
                          </p>
                          {event.description ? (
                            <p className="text-sm font-normal text-muted-foreground">
                              {event.description}
                            </p>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {event.time ? (
                            <p className="mb-0.5 text-sm text-muted-foreground">
                              <time dateTime={event.timeIso} dir="ltr">
                                {event.time}
                              </time>
                            </p>
                          ) : null}
                          <p className="text-base font-semibold text-primary">
                            {event.title}
                          </p>
                        </>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
          </aside>
        </div>
      </div>
    </main>
  )
}
