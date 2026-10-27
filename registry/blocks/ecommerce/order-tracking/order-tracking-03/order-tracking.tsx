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

const ORDER = {
  id: "#51235541",
  customer: "Alex Johnson",
  method: "Express Delivery",
  address: "425 Park Avenue, San Francisco, CA 94107",
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
      qty: 1,
      price: 20.0,
      img: assetSrc(sneakerImg),
    },
    {
      id: 2,
      name: "Smart Watch Timex",
      qty: 1,
      price: 60.0,
      img: assetSrc(watchImg),
    },
  ],
  steps: [
    {
      type: "check" as const,
      title: "Order placed",
      date: "28 Feb 2025, 08:00",
      status: "complete" as const,
    },
    {
      type: "check" as const,
      title: "Arrived at warehouse",
      date: "05 March 2025, 01:10",
      status: "complete" as const,
    },
    {
      type: "truck" as const,
      title: "Out for delivery",
      description: "Courier is on the way",
      status: "current" as const,
    },
    {
      type: "home" as const,
      title: "Expected 06 March 2025",
      description: "Products delivered",
      status: "upcoming" as const,
    },
  ],
}

function StepIcon({
  type,
  isComplete,
  isCurrent,
}: {
  type: "check" | "truck" | "home"
  isComplete: boolean
  isCurrent: boolean
}) {
  if (isComplete) {
    return (
      <CheckIcon className="size-3.5 text-primary-foreground" aria-hidden />
    )
  }
  const tone = isCurrent
    ? "text-primary-foreground"
    : "text-foreground dark:text-muted-foreground"
  if (type === "truck") {
    return <TruckIcon className={cn("size-4", tone)} aria-hidden />
  }
  if (type === "home") {
    return <HomeIcon className={cn("size-4", tone)} aria-hidden />
  }
  return null
}

function TimelineStep({
  step,
  isLast,
}: {
  step: (typeof ORDER.steps)[number]
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
            active
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          <StepIcon
            type={step.type}
            isComplete={isComplete}
            isCurrent={isCurrent}
          />
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
        {"date" in step && step.date ? (
          <time className="mt-1 block text-xs text-muted-foreground" dir="ltr">
            {step.date}
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

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-start">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </div>
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
      <div className="mx-auto w-full max-w-7xl">
        <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <div className="min-w-0 flex-1 text-start">
            <h1
              id="order-tracking-03-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Order Tracking
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:mt-4">
              Tracking Id:{" "}
              <span className="font-medium text-foreground" dir="ltr">
                {ORDER.id}
              </span>
            </p>
          </div>
          <Button type="button" className="w-full shrink-0 sm:w-auto">
            Download invoice
          </Button>
        </header>

        <div className="mt-10 border-b border-border pb-6 sm:mt-12">
          <ol className="flex w-full flex-col items-start space-y-8 lg:flex-row lg:items-center lg:space-y-0">
            {ORDER.steps.map((step, idx) => (
              <TimelineStep
                key={step.title}
                step={step}
                isLast={idx === ORDER.steps.length - 1}
              />
            ))}
          </ol>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-12">
          <section aria-labelledby="order-tracking-03-products-heading">
            <div className="border-b border-border pb-2">
              <h2
                id="order-tracking-03-products-heading"
                className="text-start text-base font-semibold text-foreground"
              >
                Products
              </h2>
            </div>
            <ul className="mt-6 space-y-4" role="list">
              {ORDER.products.map((item, idx) => (
                <React.Fragment key={item.id}>
                  <li className="grid items-center gap-4 sm:grid-cols-3">
                    <div className="col-span-2 flex min-w-0 items-center gap-4">
                      <div className="size-20 shrink-0 rounded-md bg-muted p-2">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 text-start">
                        <p className="text-sm font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p className="mt-2 text-xs font-medium text-muted-foreground">
                          Qty:{" "}
                          <span
                            className="font-medium text-foreground"
                            dir="ltr"
                          >
                            {item.qty}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="sm:ms-auto sm:text-end">
                      <p
                        className="text-sm font-semibold text-foreground"
                        dir="ltr"
                      >
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </li>
                  {idx < ORDER.products.length - 1 ? (
                    <hr className="border-border" />
                  ) : null}
                </React.Fragment>
              ))}
            </ul>
          </section>

          <section aria-labelledby="order-tracking-03-delivery-heading">
            <h2
              id="order-tracking-03-delivery-heading"
              className="text-start text-base font-semibold text-foreground"
            >
              Delivery information
            </h2>
            <div className="mt-6 space-y-6">
              <InfoBlock label="Customer" value={ORDER.customer} />
              <InfoBlock label="Shipping Method" value={ORDER.method} />
              <InfoBlock label="Address" value={ORDER.address} />
            </div>

            <div className="mt-8 h-max rounded-md bg-muted p-5 sm:p-6">
              <h3 className="text-start text-base font-semibold text-foreground">
                Billing details
              </h3>
              <ul className="mt-6 space-y-4 font-medium" role="list">
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
        </div>
      </div>
    </main>
  )
}
