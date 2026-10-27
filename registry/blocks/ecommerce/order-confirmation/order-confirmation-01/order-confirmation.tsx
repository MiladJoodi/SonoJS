"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CheckIcon,
  CopyIcon,
  CreditCardIcon,
  DownloadIcon,
  MapPinIcon,
  PackageIcon,
  TruckIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import headphonesImg from "./images/headphones.webp"
import keyboardImg from "./images/keyboard.webp"
import mouseImg from "./images/mouse.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const ORDER = {
  id: "SONO-2026-0407",
  date: "April 7, 2026",
  email: "john@example.com",
  items: [
    {
      name: "Wireless Headphones Pro",
      qty: 1,
      price: 249.99,
      image: assetSrc(headphonesImg),
      alt: "Wireless headphones",
    },
    {
      name: "Mechanical Keyboard",
      qty: 2,
      price: 159.99,
      image: assetSrc(keyboardImg),
      alt: "Mechanical keyboard",
    },
    {
      name: "Ergonomic Mouse",
      qty: 1,
      price: 89.99,
      image: assetSrc(mouseImg),
      alt: "Ergonomic mouse",
    },
  ],
  shipping: {
    name: "John Doe",
    address: "123 Main St, New York, NY 10001",
    method: "Express (2–3 days)",
  },
  payment: { brand: "Visa", last4: "4242", expiry: "12/28" },
  subtotal: 659.96,
  shippingCost: 0,
  tax: 52.8,
  total: 712.76,
} as const

const TIMELINE = [
  { label: "Order placed", date: "Apr 7, 2026", done: true },
  { label: "Processing", date: "Apr 7, 2026", done: true },
  { label: "Shipped", date: "Estimated Apr 8", done: false },
  { label: "Delivered", date: "Estimated Apr 10", done: false },
] as const

function CopyOrderIdButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false)

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      className="shrink-0 text-muted-foreground hover:text-foreground"
      aria-label={copied ? "Order ID copied" : "Copy order ID"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1500)
        } catch {
          /* ignore */
        }
      }}
    >
      {copied ? (
        <CheckIcon className="size-4" aria-hidden />
      ) : (
        <CopyIcon className="size-4" aria-hidden />
      )}
    </Button>
  )
}

export default function OrderConfirmation01() {
  return (
    <main className="min-h-svh bg-canvas py-12 text-foreground">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex size-20 items-center justify-center rounded-full bg-emerald-500/10 shadow-soft">
            <CheckCircle2Icon
              className="size-10 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Order confirmed!
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Thank you for your purchase. We&apos;ll send updates to{" "}
            <strong className="font-semibold text-foreground">
              {ORDER.email}
            </strong>
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-[12px] border border-border/70 bg-card px-4 py-2.5 shadow-soft">
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Order ID:
            </span>
            <span className="font-mono text-sm font-semibold" dir="ltr">
              {ORDER.id}
            </span>
            <CopyOrderIdButton value={ORDER.id} />
          </div>
        </div>

        <section className="mb-6 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft">
          <div className="mb-6 flex items-center gap-2">
            <TruckIcon className="size-5 text-primary" aria-hidden />
            <h2 className="text-base font-semibold">Delivery Status</h2>
          </div>
          <ol
            className="flex items-start justify-between gap-1"
            aria-label="Order progress"
          >
            {TIMELINE.map((step, i) => (
              <li
                key={step.label}
                className="flex flex-1 flex-col items-center px-0.5 text-center"
              >
                <div className="relative flex w-full flex-col items-center">
                  <div
                    className={cn(
                      "z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold sm:size-10",
                      step.done
                        ? "bg-emerald-600 text-white shadow-soft dark:bg-emerald-500"
                        : "bg-muted text-muted-foreground"
                    )}
                    aria-current={!step.done && i === 2 ? "step" : undefined}
                  >
                    {step.done ? (
                      <CheckCircle2Icon
                        className="size-4 sm:size-5"
                        aria-hidden
                      />
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < TIMELINE.length - 1 ? (
                    <div
                      className={cn(
                        "absolute inset-s-1/2 top-[15px] z-0 h-1 w-full rounded-full sm:top-[19px]",
                        step.done ? "bg-emerald-500/50" : "bg-border/70"
                      )}
                      aria-hidden
                    />
                  ) : null}
                </div>
                <p
                  className={cn(
                    "mt-3 text-xs leading-tight font-semibold",
                    step.done
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{step.label.split(" ")[0]}</span>
                </p>
                <p className="mt-1 text-[10px] font-medium whitespace-nowrap text-muted-foreground sm:text-xs">
                  {step.date}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mb-6 grid gap-6 sm:grid-cols-2">
          <section className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-2">
              <MapPinIcon className="size-4 text-primary" aria-hidden />
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Shipping Details
              </p>
            </div>
            <p className="text-sm font-semibold">{ORDER.shipping.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {ORDER.shipping.address}
            </p>
            <Badge variant="secondary" className="mt-4 font-semibold">
              {ORDER.shipping.method}
            </Badge>
          </section>

          <section className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-2">
              <CreditCardIcon className="size-4 text-primary" aria-hidden />
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Payment Method
              </p>
            </div>
            <p className="text-sm font-semibold">
              {ORDER.payment.brand} ending in {ORDER.payment.last4}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Expires {ORDER.payment.expiry}
            </p>
          </section>
        </div>

        <section className="mb-10 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft">
          <div className="mb-6 flex items-center gap-2">
            <PackageIcon className="size-5 text-primary" aria-hidden />
            <h2 className="text-base font-semibold">Order Summary</h2>
          </div>

          <ul className="flex flex-col gap-4">
            {ORDER.items.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between gap-4 py-2"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="size-12 shrink-0 rounded-[12px] border border-border/70 object-cover shadow-soft"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Quantity: {item.qty}
                    </p>
                  </div>
                </div>
                <p className="shrink-0 text-sm font-semibold tabular-nums" dir="ltr">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <Separator className="my-4" />

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold tabular-nums" dir="ltr">
                ${ORDER.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Shipping</span>
              <Badge
                variant="secondary"
                className="border-transparent bg-emerald-500/15 font-semibold text-emerald-700 dark:text-emerald-400"
              >
                Free
              </Badge>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-semibold tabular-nums" dir="ltr">
                ${ORDER.tax.toFixed(2)}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between gap-3">
            <span className="text-lg font-semibold">Total Paid</span>
            <span className="text-2xl font-semibold tabular-nums" dir="ltr">
              ${ORDER.total.toFixed(2)}
            </span>
          </div>
        </section>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button type="button" variant="outline" size="lg" className="gap-2 px-8">
            <DownloadIcon className="size-5" aria-hidden />
            Download Receipt
          </Button>
          <Button type="button" size="lg" className="gap-2 px-10">
            Continue Shopping
            <ArrowRightIcon className="size-5 icon-dir" aria-hidden />
          </Button>
        </div>
      </div>
    </main>
  )
}
