"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const ORDER = {
  id: "#A7849210",
  summary: [
    { label: "Purchased On:", value: "05 March 2025" },
    { label: "Amount Paid:", value: "$80.00" },
    { label: "Paid Via:", value: "Card - 4585" },
    { label: "Order Method:", value: "Online" },
  ],
  pricing: {
    subtotal: 80.0,
    shipping: 0,
    tax: 12.0,
  },
  products: [
    {
      id: 1,
      name: "Canvas Sneakers",
      image: assetSrc(sneakerImg),
      color: "Black/White",
      qty: 1,
      price: "$40.00",
    },
  ],
  steps: [
    { title: "Order Received", status: "complete" as const },
    { title: "Shipped", status: "complete" as const },
    { title: "Delivered", status: "pending" as const },
  ],
  recipient: "Alex Johnson",
  address: "425 Park Avenue, San Francisco, CA 94107",
  expectedDelivery: "Friday, March 08",
}

export default function OrderTracking({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const grandTotal =
    ORDER.pricing.subtotal + ORDER.pricing.shipping + ORDER.pricing.tax

  return (
    <main
      className={cn(
        "w-full min-w-0 bg-white px-4 py-8 sm:py-10 md:px-8 dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl">
        <header className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <div className="min-w-0 flex-1 text-start">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Order Tracking
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Tracking Id:{" "}
              <span className="font-semibold text-foreground" dir="ltr">
                {ORDER.id}
              </span>
            </p>
          </div>
          <Button type="button" className="w-full shrink-0 sm:w-auto">
            Download invoice
          </Button>
        </header>

        <div className="mt-8 grid gap-x-14 gap-y-10 md:grid-cols-2 lg:gap-x-24">
          <ul className="space-y-4" role="list">
            {ORDER.summary.map((item) => (
              <li
                key={item.label}
                className="flex justify-between gap-4 text-sm"
              >
                <span className="font-semibold text-foreground">
                  {item.label}
                </span>
                <span className="text-end text-muted-foreground" dir="ltr">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          <ul className="space-y-4" role="list">
            <li className="flex justify-between gap-4 text-sm font-semibold text-foreground">
              <span>Subtotal:</span>
              <span dir="ltr">${ORDER.pricing.subtotal.toFixed(2)}</span>
            </li>
            <li className="flex justify-between gap-4 text-sm">
              <span className="font-semibold text-foreground">
                Shipping Fee:
              </span>
              <span className="text-muted-foreground" dir="ltr">
                {ORDER.pricing.shipping === 0
                  ? "Free"
                  : `$${ORDER.pricing.shipping.toFixed(2)}`}
              </span>
            </li>
            <li className="flex justify-between gap-4 text-sm">
              <span className="font-semibold text-foreground">Tax Charges:</span>
              <span className="text-muted-foreground" dir="ltr">
                ${ORDER.pricing.tax.toFixed(2)}
              </span>
            </li>
            <li aria-hidden className="border-t border-border" />
            <li className="flex justify-between gap-4 text-sm font-semibold text-foreground">
              <span>Grand Total:</span>
              <span dir="ltr">${grandTotal.toFixed(2)}</span>
            </li>
          </ul>
        </div>

        <hr className="my-8 border-border" />

        <div className="grid gap-x-14 gap-y-10 md:grid-cols-2 lg:gap-x-24">
          <section aria-labelledby="order-tracking-06-items-heading">
            <h2
              id="order-tracking-06-items-heading"
              className="mb-6 text-start text-lg font-semibold text-foreground sm:mb-8"
            >
              Items Ordered
            </h2>
            <div className="space-y-6 sm:space-y-8">
              {ORDER.products.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 border-b border-border pb-6 last:border-0 sm:gap-6"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-[70px] shrink-0 rounded-md bg-muted object-contain"
                  />
                  <div className="min-w-0 space-y-1.5 text-start text-sm">
                    <p className="mb-2 font-bold text-foreground">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Color:{" "}
                      <span className="font-medium text-foreground">
                        {product.color}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty:{" "}
                      <span className="font-medium text-foreground" dir="ltr">
                        {product.qty}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Price:{" "}
                      <span className="font-medium text-foreground" dir="ltr">
                        {product.price}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" className="mt-4 w-full">
              Reorder All Items
            </Button>
          </section>

          <section aria-labelledby="order-tracking-06-status-heading">
            <h2 id="order-tracking-06-status-heading" className="sr-only">
              Delivery status
            </h2>
            <p className="mb-6 text-start text-sm font-semibold text-foreground">
              Expected Delivery:{" "}
              <span dir="ltr">{ORDER.expectedDelivery}</span>
            </p>

            <ol className="flex w-full items-start">
              {ORDER.steps.map((step, i) => {
                const isComplete = step.status === "complete"
                const isLast = i === ORDER.steps.length - 1

                return (
                  <li key={step.title} className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full",
                          isComplete
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {isComplete ? (
                          <CheckIcon className="size-4" aria-hidden />
                        ) : (
                          <span
                            className="size-2 rounded-full bg-muted-foreground"
                            aria-hidden
                          />
                        )}
                      </div>
                      {!isLast ? (
                        <div
                          className={cn(
                            "mx-2 h-[3px] flex-1",
                            isComplete ? "bg-primary" : "bg-muted"
                          )}
                          aria-hidden
                        />
                      ) : null}
                    </div>
                    <p
                      className={cn(
                        "mt-3 text-start text-[12px] font-semibold",
                        isComplete
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </p>
                  </li>
                )
              })}
            </ol>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="text-start">
                <p className="text-sm font-semibold text-foreground">
                  Recipient
                </p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {ORDER.recipient}
                </p>
              </div>
              <div className="text-start">
                <p className="text-sm font-semibold text-foreground">
                  Shipping Address
                </p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {ORDER.address}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
