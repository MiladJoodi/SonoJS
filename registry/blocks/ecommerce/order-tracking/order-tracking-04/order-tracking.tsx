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
  id: "#95866254",
  trackingId: "#4589655",
  placedDate: "02 May, 2025",
  deliveredDate: "04 May, 2025",
  billing: {
    subtotal: 120.0,
    shipping: 4.0,
    tax: 6.0,
    total: 130.0,
  },
  items: [
    {
      id: 1,
      name: "Velvet Sneaker",
      image: assetSrc(sneakerImg),
      color: "Black/White",
      qty: 1,
      price: 20.0,
    },
    {
      id: 2,
      name: "Smart Watch Timex",
      image: assetSrc(watchImg),
      color: "Gray",
      qty: 1,
      price: 60.0,
    },
    {
      id: 3,
      name: "French Connection",
      image: assetSrc(watchSilverImg),
      color: "Silver",
      qty: 1,
      price: 40.0,
    },
  ],
}

const TIMELINE = [
  {
    title: "Order placed",
    time: "28 Feb 2025, 08:00",
    status: "complete" as const,
    dateTime: "2025-02-28T08:00",
  },
  {
    title: "Arrived at warehouse",
    time: "05 March 2025, 01:10",
    status: "complete" as const,
    dateTime: "2025-03-05T01:10",
  },
  {
    title: "Out for delivery",
    description: "Courier is on the way",
    status: "current" as const,
  },
  {
    title: "Expected 06 March 2025",
    description: "Products delivered",
    status: "upcoming" as const,
  },
]

function TimelineStep({
  step,
  index,
  isLast,
}: {
  step: (typeof TIMELINE)[number]
  index: number
  isLast: boolean
}) {
  const isComplete = step.status === "complete"
  const isCurrent = step.status === "current"
  const active = isComplete || isCurrent

  return (
    <li
      className="group relative flex w-full min-w-0 flex-row items-start lg:w-auto lg:flex-1 lg:flex-col"
      aria-current={isCurrent ? "step" : undefined}
    >
      {!isLast ? (
        <div
          className={cn(
            "absolute start-3 top-6 -bottom-10 w-0.5 lg:hidden",
            isComplete ? "bg-primary" : "bg-border"
          )}
          aria-hidden
        />
      ) : null}

      <div className="flex w-max items-center lg:w-full">
        <div
          className={cn(
            "z-10 flex size-6 shrink-0 items-center justify-center rounded-full md:size-7",
            isComplete
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground dark:text-muted-foreground"
          )}
        >
          <span className="sr-only">
            Step {index + 1}: {step.title}
            {isCurrent ? " (current step)" : ""}
          </span>
          {isComplete ? <CheckIcon className="size-3.5" aria-hidden /> : null}
          {isCurrent ? <TruckIcon className="size-4" aria-hidden /> : null}
          {step.status === "upcoming" ? (
            <HomeIcon className="size-4" aria-hidden />
          ) : null}
        </div>
        {!isLast ? (
          <div
            className={cn(
              "mx-4 hidden h-0.5 w-full rounded-md lg:block",
              isComplete ? "bg-primary" : "bg-border"
            )}
            aria-hidden
          />
        ) : null}
      </div>

      <div className="ms-4 text-start lg:ms-0 lg:me-4 lg:mt-3">
        <p
          className={cn(
            "text-sm font-semibold",
            active ? "text-primary" : "text-muted-foreground"
          )}
        >
          {step.title}
        </p>
        {"time" in step && step.time ? (
          <time
            dateTime={"dateTime" in step ? step.dateTime : undefined}
            className="mt-1 block text-xs text-muted-foreground"
            dir="ltr"
          >
            {step.time}
          </time>
        ) : null}
        {"description" in step && step.description ? (
          <span className="mt-1 block text-xs text-muted-foreground">
            {step.description}
          </span>
        ) : null}
      </div>
    </li>
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

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-start">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-medium text-foreground" dir="ltr">
        {value}
      </p>
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
        <header className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <div className="min-w-0 flex-1 text-start">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Order Details
            </h1>
          </div>
          <Button
            type="button"
            className="w-full shrink-0 sm:w-auto"
            aria-label={`Download invoice for order ${ORDER.id}`}
          >
            Download invoice
          </Button>
        </header>

        <div className="mt-6 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6 md:p-8">
          <div className="flex flex-wrap justify-between gap-6 border-b border-border pb-6 sm:gap-8">
            <MetaCell label="Order Number" value={ORDER.id} />
            <MetaCell label="Order Placed" value={ORDER.placedDate} />
            <MetaCell label="Order Delivered" value={ORDER.deliveredDate} />
            <MetaCell
              label="No. of items"
              value={`${ORDER.items.length} items`}
            />
          </div>

          <div className="mt-10 border-b border-border pb-6 sm:mt-12">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <h2 className="min-w-0 flex-1 text-start text-lg font-semibold text-foreground">
                Order Tracking
              </h2>
              <p className="text-start text-base font-medium text-muted-foreground sm:text-lg">
                Tracking id:{" "}
                <span className="font-semibold text-foreground" dir="ltr">
                  {ORDER.trackingId}
                </span>
              </p>
            </div>

            <section
              className="mt-8 pb-2 sm:mt-10 sm:pb-6"
              aria-labelledby="order-tracking-04-progress-heading"
            >
              <h3 id="order-tracking-04-progress-heading" className="sr-only">
                Order progress
              </h3>
              <ol className="flex w-full flex-col items-start space-y-8 lg:flex-row lg:items-center lg:space-y-0">
                {TIMELINE.map((step, index) => (
                  <TimelineStep
                    key={step.title}
                    step={step}
                    index={index}
                    isLast={index === TIMELINE.length - 1}
                  />
                ))}
              </ol>
            </section>
          </div>

          <div className="mt-10 sm:mt-12">
            <h2 className="mb-6 text-start text-lg font-semibold text-foreground">
              Items from the order
            </h2>

            <ul className="space-y-4" role="list">
              {ORDER.items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <li className="grid items-center gap-4 md:grid-cols-4">
                    <div className="col-span-2 flex min-w-0 items-center gap-4">
                      <div className="size-20 shrink-0 rounded-md bg-muted p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 text-start">
                        <h4 className="text-sm font-semibold text-foreground">
                          {item.name}
                        </h4>
                        <p className="mt-2 text-[13px] font-medium text-foreground">
                          <span className="text-muted-foreground">Color:</span>{" "}
                          {item.color}
                        </p>
                      </div>
                    </div>
                    <div className="text-start">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Quantity
                      </h4>
                      <p
                        className="mt-2 text-sm font-medium text-foreground"
                        dir="ltr"
                      >
                        x{item.qty}
                      </p>
                    </div>
                    <div className="md:ms-auto md:text-end">
                      <p
                        className="text-sm font-semibold text-foreground"
                        dir="ltr"
                      >
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </li>
                  {index < ORDER.items.length - 1 ? (
                    <hr className="border-border" />
                  ) : null}
                </React.Fragment>
              ))}
            </ul>

            <hr className="my-8 border-border" />

            <section
              className="ms-auto max-w-md"
              aria-labelledby="order-tracking-04-billing-heading"
            >
              <h2
                id="order-tracking-04-billing-heading"
                className="mb-6 text-start text-lg font-semibold text-foreground"
              >
                Billing details
              </h2>
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
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
