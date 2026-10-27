"use client"

import * as React from "react"
import { CheckIcon, MinusIcon, PlusIcon, ShieldCheckIcon, XIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import amexImg from "./images/amex.webp"
import laptop1Img from "./images/laptop-1.webp"
import laptop2Img from "./images/laptop-2.webp"
import mastercardImg from "./images/mastercard.webp"
import visaImg from "./images/visa.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const SHIPPING = 4
const TAX = 4

type CartItem = {
  id: number
  name: string
  image: string
  alt: string
  price: number
  quantity: number
  specs: string[]
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "HP ProBook 455 (15.6) 39.6 cm G9 Business Laptop",
    image: assetSrc(laptop1Img),
    alt: "HP ProBook",
    price: 1020,
    quantity: 1,
    specs: [
      "AMD Ryzen™ 5 processor",
      "FreeDOS",
      "16 GB DDR4 RAM",
      "512 GB PCIe® NVMe™ SSD",
    ],
  },
  {
    id: 2,
    name: "ThinkPad E16 40.64cms — 13th Gen Intel i5",
    image: assetSrc(laptop2Img),
    alt: "ThinkPad E16",
    price: 1100,
    quantity: 1,
    specs: [
      "13th Gen Intel® Core™ i5",
      "FreeDOS",
      "16 GB DDR4 RAM",
      "512 GB PCIe® NVMe™ SSD",
    ],
  },
]

const PAYMENT_LOGOS = [
  { src: assetSrc(mastercardImg), alt: "Mastercard" },
  { src: assetSrc(visaImg), alt: "Visa" },
  { src: assetSrc(amexImg), alt: "American Express" },
] as const

export default function ShoppingCart({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [cartItems, setCartItems] = React.useState(INITIAL_ITEMS)

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = subtotal + SHIPPING + TAX

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-background px-4 py-8 sm:py-10 md:px-8",
        className
      )}
      aria-label="Shopping cart"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 text-start">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5">
            <div>
              <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
                Business devices
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                Configured cart
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {cartItems.length} systems
            </p>
          </header>

          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="relative overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
              >
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={() =>
                    setCartItems((prev) =>
                      prev.filter((row) => row.id !== item.id)
                    )
                  }
                  className="absolute end-3 top-3 z-10 flex size-9 cursor-pointer items-center justify-center rounded-md border border-border/70 bg-card text-muted-foreground outline-none hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <XIcon className="size-4" aria-hidden />
                </button>

                <div className="grid gap-0 md:grid-cols-[200px_minmax(0,1fr)]">
                  <div className="flex items-center justify-center border-b border-border/70 bg-background p-5 md:border-b-0 md:border-e md:p-6">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="max-h-36 w-full object-contain md:max-h-40"
                    />
                  </div>

                  <div className="flex flex-col gap-5 p-4 pe-12 sm:p-6 sm:pe-14">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <h2 className="max-w-md text-base font-semibold leading-snug text-foreground">
                        {item.name}
                      </h2>
                      <p
                        className="shrink-0 text-lg font-semibold tabular-nums tracking-tight sm:text-xl"
                        dir="ltr"
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <ul className="grid gap-2 sm:grid-cols-2">
                      {item.specs.map((spec) => (
                        <li
                          key={spec}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckIcon
                            className="mt-0.5 size-3.5 shrink-0 text-primary"
                            aria-hidden
                          />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-4">
                      <span className="text-xs font-medium text-muted-foreground">
                        Qty
                      </span>
                      <div className="inline-flex h-9 items-center rounded-md border border-border/70 bg-background px-2">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            setCartItems((prev) =>
                              prev.map((row) =>
                                row.id === item.id && row.quantity > 1
                                  ? { ...row, quantity: row.quantity - 1 }
                                  : row
                              )
                            )
                          }
                          className="flex size-7 cursor-pointer items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <MinusIcon className="size-2.5" aria-hidden />
                        </button>
                        <span
                          className="mx-2 text-xs font-medium tabular-nums"
                          dir="ltr"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            setCartItems((prev) =>
                              prev.map((row) =>
                                row.id === item.id
                                  ? { ...row, quantity: row.quantity + 1 }
                                  : row
                              )
                            )
                          }
                          className="flex size-7 cursor-pointer items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <PlusIcon className="size-2.5" aria-hidden />
                        </button>
                      </div>
                      <span className="inline-flex w-full items-center gap-1.5 text-xs text-muted-foreground sm:ms-auto sm:w-auto">
                        <ShieldCheckIcon
                          className="size-3.5 shrink-0 text-primary"
                          aria-hidden
                        />
                        1-year business warranty
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-max rounded-[12px] border border-border/70 bg-card p-6 shadow-soft lg:sticky lg:top-6">
          <h2 className="text-lg font-semibold">Quote summary</h2>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex justify-between gap-3">
              Subtotal
              <span className="font-semibold text-foreground" dir="ltr">
                ${subtotal.toFixed(2)}
              </span>
            </li>
            <li className="flex justify-between gap-3">
              Shipping
              <span className="font-semibold text-foreground" dir="ltr">
                ${SHIPPING.toFixed(2)}
              </span>
            </li>
            <li className="flex justify-between gap-3">
              Tax
              <span className="font-semibold text-foreground" dir="ltr">
                ${TAX.toFixed(2)}
              </span>
            </li>
            <li className="flex justify-between gap-3 border-t border-border pt-3 font-semibold text-foreground">
              Total
              <span dir="ltr">${total.toFixed(2)}</span>
            </li>
          </ul>

          <Button type="button" className="mt-6 h-[46px] w-full">
            Proceed to checkout
          </Button>
          <Button type="button" variant="outline" className="mt-3 h-[46px] w-full">
            Request quote
          </Button>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
            {PAYMENT_LOGOS.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-5 w-auto object-contain opacity-90"
              />
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
