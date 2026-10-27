"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"
import watchImg from "./images/watch.webp"
import watchSilverImg from "./images/watch-silver.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const ORDER = {
  details: [
    { label: "Order Number", value: "#95866254" },
    { label: "Order Placed", value: "02 May, 2025" },
    { label: "Order Delivered", value: "04 May, 2025" },
    { label: "No. of items", value: "3 items" },
  ],
  tracking: {
    id: "#4589655",
    steps: [
      {
        title: "Order placed",
        desc: "28 Feb 2025, 08:00",
        active: true,
        done: true,
      },
      {
        title: "Arrived at warehouse",
        desc: "05 March 2025, 01:10",
        active: true,
        done: true,
      },
      {
        title: "Out for delivery",
        desc: "Courier is on the way",
        active: true,
        done: false,
        current: true,
      },
      {
        title: "Expected 06 March 2025",
        desc: "Products delivered",
        active: false,
        done: false,
      },
    ],
  },
  items: [
    {
      name: "Velvet Sneaker",
      color: "Black/White",
      price: "$20.00",
      img: assetSrc(sneakerImg),
    },
    {
      name: "Smart Watch Timex",
      color: "Gray",
      price: "$60.00",
      img: assetSrc(watchImg),
    },
    {
      name: "French Connection",
      color: "Silver",
      price: "$40.00",
      img: assetSrc(watchSilverImg),
    },
  ],
  billing: [
    { label: "Subtotal", value: "$120.00" },
    { label: "Shipping", value: "$4.00" },
    { label: "Tax", value: "$6.00" },
  ],
  total: "$130.00",
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
        <h1 className="mb-6 text-start text-2xl font-bold tracking-tight text-foreground">
          Order Tracking
        </h1>

        <div className="flex flex-wrap justify-between gap-6 border-b border-border pb-6 sm:gap-8">
          {ORDER.details.map((info) => (
            <div key={info.label} className="text-start">
              <p className="text-sm font-medium text-muted-foreground">
                {info.label}
              </p>
              <p
                className="mt-2 text-sm font-medium text-foreground"
                dir="ltr"
              >
                {info.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-b border-border pb-6 sm:mt-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <h2 className="min-w-0 flex-1 text-start text-lg font-semibold text-foreground">
              Order Tracking
            </h2>
            <p className="text-start text-base font-medium text-muted-foreground sm:text-lg">
              Tracking id:{" "}
              <span className="font-semibold text-foreground" dir="ltr">
                {ORDER.tracking.id}
              </span>
            </p>
          </div>

          <ol className="mt-8 flex w-full flex-col items-start space-y-8 pb-2 sm:mt-10 sm:pb-6 lg:flex-row lg:items-center lg:space-y-0">
            {ORDER.tracking.steps.map((step, idx) => {
              const isLast = idx === ORDER.tracking.steps.length - 1
              const isCurrent = Boolean(step.current)

              return (
                <li
                  key={step.title}
                  className="group relative flex w-full min-w-0 flex-row items-start lg:w-auto lg:flex-1 lg:flex-col"
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {!isLast ? (
                    <div
                      className={cn(
                        "absolute start-3 top-6 -bottom-10 w-0.5 lg:hidden",
                        step.done ? "bg-primary" : "bg-border"
                      )}
                      aria-hidden
                    />
                  ) : null}

                  <div className="flex w-max items-center lg:w-full">
                    <div
                      className={cn(
                        "z-10 flex size-6 shrink-0 items-center justify-center rounded-full md:size-7",
                        step.done
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {step.done ? (
                        <CheckIcon className="size-3.5" aria-hidden />
                      ) : (
                        <span
                          className={cn(
                            "size-2 rounded-full",
                            isCurrent ? "bg-primary" : "bg-muted-foreground"
                          )}
                          aria-hidden
                        />
                      )}
                    </div>
                    {!isLast ? (
                      <div
                        className={cn(
                          "mx-4 hidden h-0.5 w-full rounded-md lg:block",
                          step.done ? "bg-primary" : "bg-border"
                        )}
                        aria-hidden
                      />
                    ) : null}
                  </div>

                  <div className="ms-4 text-start lg:ms-0 lg:me-4 lg:mt-3">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        step.done || isCurrent
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </p>
                    <p
                      className="mt-1 block text-xs text-muted-foreground"
                      dir="ltr"
                    >
                      {step.desc}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <section
          className="mt-10 sm:mt-12"
          aria-labelledby="order-tracking-07-items-heading"
        >
          <h2
            id="order-tracking-07-items-heading"
            className="mb-6 text-start text-lg font-semibold text-foreground"
          >
            Items from the order
          </h2>
          <ul className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {ORDER.items.map((item) => (
              <li key={item.name} className="flex items-center gap-4 sm:gap-6">
                <div className="size-20 shrink-0 rounded-md bg-muted p-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="size-full object-contain"
                  />
                </div>
                <div className="min-w-0 text-start">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <div className="mt-2 space-y-1.5">
                    <p className="text-xs text-muted-foreground">
                      Color:{" "}
                      <span className="font-medium text-foreground">
                        {item.color}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Price:{" "}
                      <span className="font-medium text-foreground" dir="ltr">
                        {item.price}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <hr className="my-8 border-border" />

        <section
          className="ms-auto max-w-md"
          aria-labelledby="order-tracking-07-billing-heading"
        >
          <h2
            id="order-tracking-07-billing-heading"
            className="mb-6 text-start text-lg font-semibold text-foreground"
          >
            Billing details
          </h2>
          <ul className="space-y-4 font-medium" role="list">
            {ORDER.billing.map((bill) => (
              <li
                key={bill.label}
                className="flex gap-4 text-sm text-muted-foreground"
              >
                {bill.label}
                <span
                  className="ms-auto font-semibold text-foreground"
                  dir="ltr"
                >
                  {bill.value}
                </span>
              </li>
            ))}
            <li aria-hidden className="border-t border-border" />
            <li className="flex gap-4 text-sm font-bold text-foreground">
              Total
              <span className="ms-auto" dir="ltr">
                {ORDER.total}
              </span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
