"use client"

import * as React from "react"
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"
import watch2Img from "./images/watch-2.webp"
import watchAltImg from "./images/watch-alt.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const SIZES = ["SM", "MD", "LG", "XL"] as const
const SHIPPING = 2
const TAX = 4

type Size = (typeof SIZES)[number]

type CartItem = {
  id: number
  name: string
  image: string
  price: number
  quantity: number
  size: Size
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Velvet Sneaker",
    image: assetSrc(sneakerImg),
    price: 20,
    quantity: 2,
    size: "SM",
  },
  {
    id: 2,
    name: "Smart Watch Timex",
    image: assetSrc(watchImg),
    price: 60,
    quantity: 1,
    size: "MD",
  },
  {
    id: 3,
    name: "French Connection",
    image: assetSrc(watchAltImg),
    price: 40,
    quantity: 1,
    size: "XL",
  },
  {
    id: 4,
    name: "Smart Watch",
    image: assetSrc(watch2Img),
    price: 60,
    quantity: 1,
    size: "SM",
  },
]

function SizeChips({
  value,
  onChange,
  name,
}: {
  value: Size
  onChange: (size: Size) => void
  name: string
}) {
  return (
    <div
      className="mt-3 flex flex-wrap gap-1.5"
      role="group"
      aria-label={`Size for ${name}`}
    >
      {SIZES.map((size) => {
        const selected = value === size
        return (
          <button
            key={size}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(size)}
            className={cn(
              "flex size-8 cursor-pointer items-center justify-center rounded-md border text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "border-foreground bg-foreground text-background"
                : "border-border/70 bg-background text-foreground hover:bg-muted"
            )}
          >
            {size}
          </button>
        )
      })}
    </div>
  )
}

export default function ShoppingCart({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const baseId = React.useId()
  const [cartItems, setCartItems] = React.useState(INITIAL_ITEMS)
  const [promoCode, setPromoCode] = React.useState("")

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = subtotal + SHIPPING + TAX

  return (
    <section
      className={cn("w-full min-w-0 bg-white dark:bg-background", className)}
      aria-label="Shopping cart"
      {...props}
    >
      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.85fr)]">
        <div className="border-border px-4 py-8 sm:px-6 sm:py-10 lg:border-e lg:px-10">
          <div className="mx-auto max-w-2xl text-start">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-5">
              <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Shopping cart
              </h1>
              <p className="text-sm font-medium text-muted-foreground">
                {cartItems.length} lines
              </p>
            </div>

            <ul className="divide-y divide-border">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-4 py-6 sm:flex-row sm:gap-5 sm:py-7"
                >
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-border/70 bg-card p-2 sm:size-28 sm:p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-semibold text-foreground">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                        Unit ${item.price.toFixed(2)}
                      </p>
                      <SizeChips
                        name={item.name}
                        value={item.size}
                        onChange={(size) =>
                          setCartItems((prev) =>
                            prev.map((row) =>
                              row.id === item.id ? { ...row, size } : row
                            )
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setCartItems((prev) =>
                            prev.filter((row) => row.id !== item.id)
                          )
                        }
                        className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-sm text-xs font-semibold tracking-wide text-destructive uppercase outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Trash2Icon className="size-3.5" aria-hidden />
                        Remove
                      </button>
                    </div>

                    <div className="flex shrink-0 flex-row items-center justify-between gap-4 sm:flex-col sm:items-end">
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
                        <span className="mx-2.5 text-xs font-medium tabular-nums" dir="ltr">
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
                      <p className="text-base font-semibold tabular-nums" dir="ltr">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="border-t border-border bg-card px-4 py-8 sm:px-6 sm:py-10 lg:sticky lg:top-0 lg:h-svh lg:overflow-y-auto lg:border-t-0 lg:px-8">
          <div className="mx-auto max-w-sm text-start">
            <h2 className="text-lg font-semibold text-foreground">
              Order summary
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Review totals before you pay.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
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
            </ul>

            <Separator className="my-6" />

            <div className="flex justify-between text-base font-semibold">
              Total
              <span dir="ltr">${total.toFixed(2)}</span>
            </div>

            <Button type="button" className="mt-8 h-[46px] w-full">
              Proceed to checkout
            </Button>
            <a
              href="#"
              className="mt-3 block text-center text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              Continue shopping
            </a>

            <form
              className="mt-10 space-y-2 border-t border-border pt-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <Label htmlFor={`${baseId}-promo`}>Have a promo code?</Label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  id={`${baseId}-promo`}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="h-[46px] min-w-0 flex-1 bg-background shadow-none"
                />
                <Button
                  type="submit"
                  className="h-[46px] w-full shrink-0 sm:w-max"
                >
                  Apply
                </Button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </section>
  )
}
