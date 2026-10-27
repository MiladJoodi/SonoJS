"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import laptopImg from "./images/laptop.webp"
import sunscreenImg from "./images/sunscreen.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Invoice document — letterhead, info tiles, tabular line sheet. */
const PRODUCTS = [
  {
    id: 1,
    sku: "ASUS-VB16X",
    name: 'Laptop ASUS Vivobook 16X, AMD Ryzen 7, 16GB RAM, 512GB SSD, 16" FHD+, Windows 11 Home',
    quantity: 1,
    price: "$1,299.00",
    image: assetSrc(laptopImg),
    link: "#",
  },
  {
    id: 2,
    sku: "TMX-FIT2",
    name: "Smart Watch TIMEX Fit 2.0 with AMOLED Display, Heart Rate & SpO2 Monitoring",
    quantity: 2,
    price: "$60.00",
    image: assetSrc(watchImg),
    link: "#",
  },
  {
    id: 3,
    sku: "NTG-US50",
    name: "Neutrogena Ultra Sheer Dry-Touch Sunscreen SPF 50+, Water Resistant, 88ml",
    quantity: 3,
    price: "$33.00",
    image: assetSrc(sunscreenImg),
    link: "#",
  },
] as const

function InfoTile({
  index,
  title,
  children,
  editLabel,
}: {
  index: string
  title: string
  children: React.ReactNode
  editLabel: string
}) {
  const id = React.useId()
  return (
    <section
      aria-labelledby={id}
      className="relative rounded-[12px] border border-border/70 bg-card p-5 shadow-soft"
    >
      <span
        dir="ltr"
        className="mb-3 inline-flex rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-muted-foreground tabular-nums"
      >
        {index}
      </span>
      <h2 id={id} className="text-sm font-semibold text-foreground">
        {title}
      </h2>
      <div className="mt-3 text-sm leading-relaxed font-medium text-muted-foreground">
        {children}
      </div>
      <button
        type="button"
        aria-label={editLabel}
        className="mt-3 inline-flex min-h-10 cursor-pointer items-center text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
      >
        Edit
      </button>
    </section>
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
        <header className="mb-6 flex flex-col gap-3 border-b border-border/70 pb-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-6">
          <div className="min-w-0">
            <p className="text-caption font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Invoice
            </p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Order summary
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Purchase complete. This document mirrors what appears on your
              emailed receipt.
            </p>
          </div>
          <div className="text-start sm:text-end">
            <p className="text-xs font-medium text-muted-foreground uppercase">
              Document
            </p>
            <p dir="ltr" className="mt-1 text-sm font-semibold tabular-nums">
              INV-2025-0442
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoTile
            index="01"
            title="Billing"
            editLabel="Edit billing information"
          >
            <address className="not-italic">
              John Doe
              <br />
              1234 Elm Street
              <br />
              Springfield, IL 62704
              <br />
              United States
            </address>
          </InfoTile>
          <InfoTile
            index="02"
            title="Shipping"
            editLabel="Edit shipping information"
          >
            <address className="not-italic">
              Jane Smith
              <br />
              5678 Oak Avenue
              <br />
              Los Angeles, CA 90001
              <br />
              United States
            </address>
          </InfoTile>
          <InfoTile
            index="03"
            title="Payment"
            editLabel="Edit payment method"
          >
            <p>
              American Express
              <br />
              Ending in •••• 4587
              <br />
              Exp: 08/27
            </p>
          </InfoTile>
        </div>

        <section className="mt-10" aria-labelledby="os06-items">
          <div className="mb-3 flex items-end justify-between gap-3">
            <h2
              id="os06-items"
              className="text-sm font-semibold text-foreground"
            >
              Line sheet
            </h2>
            <p className="text-caption text-muted-foreground">
              {PRODUCTS.length} SKUs
            </p>
          </div>

          <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
            <div className="hidden grid-cols-[minmax(0,1fr)_4.5rem_6.5rem] gap-4 border-b border-border/70 bg-muted/50 px-5 py-2.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase md:grid">
              <span>Description</span>
              <span className="text-end">Qty</span>
              <span className="text-end">Amount</span>
            </div>

            <ul className="divide-y divide-border/70">
              {PRODUCTS.map((product) => (
                <li
                  key={product.id}
                  className="grid gap-3 px-3 py-4 sm:px-4 md:grid-cols-[minmax(0,1fr)_4.5rem_6.5rem] md:items-center md:gap-4 md:px-5"
                >
                  <div className="flex min-w-0 gap-3 sm:items-center sm:gap-4">
                    <div className="size-16 shrink-0 rounded-[10px] bg-muted p-1.5 sm:size-24">
                      <img
                        src={product.image}
                        alt=""
                        className="size-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        dir="ltr"
                        className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase tabular-nums"
                      >
                        {product.sku}
                      </p>
                      <a
                        href={product.link}
                        className="mt-1 block cursor-pointer outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <h3 className="text-sm font-medium break-words text-foreground sm:text-[15px]">
                          {product.name}
                        </h3>
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 md:contents">
                    <p
                      dir="ltr"
                      className="text-sm font-medium tabular-nums md:text-end"
                    >
                      <span className="me-1.5 text-muted-foreground md:hidden">
                        Qty
                      </span>
                      ×{product.quantity}
                    </p>
                    <p
                      dir="ltr"
                      className="text-sm font-semibold tabular-nums md:text-end"
                    >
                      {product.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="mt-6 w-full sm:ms-auto sm:max-w-md"
          aria-labelledby="os06-sum"
        >
          <h2 id="os06-sum" className="sr-only">
            Totals
          </h2>
          <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
            <dl className="space-y-3 text-sm">
              {(
                [
                  ["Subtotal", "$1,392.00"],
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
              <div className="flex justify-between gap-3 border-t border-border/70 pt-3 text-base font-semibold text-foreground">
                <dt>Total due</dt>
                <dd dir="ltr" className="tabular-nums">
                  $1,402.00
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </div>
  )
}
