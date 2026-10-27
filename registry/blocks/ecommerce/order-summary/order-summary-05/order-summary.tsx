"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import watchAltImg from "./images/watch-alt.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Account console — editable side panels + compact line cards. */
const PRODUCTS = [
  {
    id: 1,
    name: "Smart Watch Timex",
    color: "Gray",
    price: "$60.00",
    image: assetSrc(watchImg),
  },
  {
    id: 2,
    name: "French Connection",
    color: "Silver",
    price: "$40.00",
    image: assetSrc(watchAltImg),
  },
] as const

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-3.5", className)}
      aria-hidden
    >
      <path d="M12 20h9" />
      <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
    </svg>
  )
}

function Panel({
  title,
  editLabel,
  children,
}: {
  title: string
  editLabel: string
  children: React.ReactNode
}) {
  const headingId = React.useId()
  return (
    <section
      aria-labelledby={headingId}
      className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2
          id={headingId}
          className="text-start text-sm font-semibold text-foreground"
        >
          {title}
        </h2>
        <button
          type="button"
          aria-label={editLabel}
          className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-border/70 bg-canvas text-primary outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring sm:size-[46px]"
        >
          <PencilIcon />
        </button>
      </div>
      {children}
    </section>
  )
}

function Field({
  label,
  value,
  dirLtr,
}: {
  label: string
  value: string
  dirLtr?: boolean
}) {
  return (
    <div>
      <dt className="text-start text-xs font-medium text-muted-foreground">
        {label}
      </dt>
      <dd
        dir={dirLtr ? "ltr" : undefined}
        className="mt-1.5 text-start text-sm font-medium break-words text-foreground"
      >
        {value}
      </dd>
    </div>
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
        <header className="mb-6 flex flex-col gap-3 border-b border-border/70 pb-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-6">
          <div className="min-w-0">
            <h1 className="text-start text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Order console
            </h1>
            <p className="mt-2 text-start text-sm text-muted-foreground">
              Confirmed — thank you for shopping with us.
            </p>
          </div>
          <div className="inline-flex w-full items-center gap-2 rounded-[12px] border border-border/70 bg-card px-3.5 py-2.5 shadow-soft sm:ms-auto sm:w-auto">
            <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden />
            <span className="min-w-0 text-start text-sm font-medium text-foreground">
              Order{" "}
              <span dir="ltr" className="font-semibold tabular-nums">
                #658965487
              </span>
            </span>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="max-lg:-order-1 space-y-5 sm:space-y-6 lg:col-span-2">
            <section aria-labelledby="os05-items">
              <h2
                id="os05-items"
                className="mb-3 text-start text-sm font-semibold text-foreground"
              >
                Line items
              </h2>
              <ul className="space-y-3">
                {PRODUCTS.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-start gap-3 rounded-[12px] border border-border/70 bg-card p-3 shadow-soft min-[400px]:items-center sm:gap-4 sm:p-3.5"
                  >
                    <div className="size-14 shrink-0 rounded-[10px] bg-muted p-1.5 sm:size-20">
                      <img
                        src={product.image}
                        alt=""
                        className="size-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-start text-sm font-semibold break-words text-foreground">
                          {product.name}
                        </h3>
                        <p
                          dir="ltr"
                          className="ms-auto shrink-0 text-sm font-semibold tabular-nums"
                        >
                          {product.price}
                        </p>
                      </div>
                      <p className="mt-1 text-start text-xs text-muted-foreground">
                        Color{" "}
                        <span className="font-medium text-foreground/80">
                          {product.color}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="os05-bill"
              className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft"
            >
              <h2
                id="os05-bill"
                className="mb-5 text-start text-sm font-semibold text-foreground"
              >
                Billing details
              </h2>
              <dl className="space-y-3 text-sm">
                {(
                  [
                    ["Subtotal", "$100.00"],
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
                    $110.00
                  </dd>
                </div>
              </dl>
            </section>
          </div>

          <aside className="space-y-6">
            <Panel
              title="Customer"
              editLabel="Edit customer information"
            >
              <dl className="space-y-4">
                <Field label="Name" value="Alex Johnson" />
                <Field
                  label="Email"
                  value="alexjohnson45@gmail.com"
                  dirLtr
                />
                <Field label="Phone" value="(555) 123-4567" dirLtr />
              </dl>
            </Panel>

            <Panel
              title="Shipping"
              editLabel="Edit shipping information"
            >
              <dl className="space-y-4">
                <Field label="Recipient" value="Alex Johnson" />
                <Field label="Method" value="Express Delivery" />
                <Field
                  label="Address"
                  value="425 Park Avenue, San Francisco, CA 94107"
                />
              </dl>
            </Panel>
          </aside>
        </div>
      </div>
    </div>
  )
}
