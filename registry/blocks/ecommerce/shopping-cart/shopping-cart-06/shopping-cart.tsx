"use client"

import * as React from "react"
import { HeartIcon, MinusIcon, PlusIcon, TagIcon, Trash2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

import tee1Img from "./images/tee-1.webp"
import tee2Img from "./images/tee-2.webp"
import tee3Img from "./images/tee-3.webp"
import tee4Img from "./images/tee-4.webp"

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
  size: string
  color: string
  price: number
  originalPrice: number
  quantity: number
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Sweater",
    image: assetSrc(tee1Img),
    alt: "Sweater",
    size: "MD",
    color: "Black",
    price: 18.5,
    originalPrice: 22.5,
    quantity: 1,
  },
  {
    id: 2,
    name: "Flat Sweater",
    image: assetSrc(tee2Img),
    alt: "Flat sweater",
    size: "LG",
    color: "Black",
    price: 12,
    originalPrice: 18,
    quantity: 1,
  },
  {
    id: 3,
    name: "Lightweight T-Shirt",
    image: assetSrc(tee3Img),
    alt: "Lightweight t-shirt",
    size: "XL",
    color: "Dark green",
    price: 14,
    originalPrice: 20,
    quantity: 1,
  },
  {
    id: 4,
    name: "Jacket",
    image: assetSrc(tee4Img),
    alt: "Jacket",
    size: "MD",
    color: "Green",
    price: 11.5,
    originalPrice: 16.5,
    quantity: 1,
  },
]

function savingsPct(price: number, original: number) {
  return Math.round(((original - price) / original) * 100)
}

export default function ShoppingCart({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const baseId = React.useId()
  const [cartItems, setCartItems] = React.useState(INITIAL_ITEMS)
  const [promoCode, setPromoCode] = React.useState("")
  const [wishlisted, setWishlisted] = React.useState<number[]>([])

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const compareTotal = cartItems.reduce(
    (s, i) => s + i.originalPrice * i.quantity,
    0
  )
  const saved = compareTotal - subtotal
  const total = subtotal + SHIPPING + TAX

  return (
    <section
      className={cn("w-full min-w-0 bg-white px-4 py-8 md:px-8", className)}
      aria-label="Shopping cart"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5 text-start">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-caption font-medium text-foreground">
              <TagIcon className="size-3.5 text-primary" aria-hidden />
              Sale picks
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight">
              Shopping cart
            </h1>
          </div>
          <div className="text-end">
            <p className="text-sm font-medium text-foreground">
              {cartItems.length} items
            </p>
            {saved > 0 ? (
              <p className="mt-0.5 text-sm text-primary" dir="ltr">
                You’re saving ${saved.toFixed(2)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <ul className="divide-y divide-border lg:col-span-2">
            {cartItems.map((item) => {
              const onWish = wishlisted.includes(item.id)
              const pct = savingsPct(item.price, item.originalPrice)
              return (
                <li
                  key={item.id}
                  className="flex flex-col gap-6 py-7 sm:flex-row sm:items-center"
                >
                  <div className="relative mx-auto size-28 shrink-0 sm:mx-0 sm:size-32">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="size-full object-contain"
                    />
                    <span className="absolute start-0 top-0 rounded-sm bg-foreground px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-background uppercase">
                      −{pct}%
                    </span>
                  </div>

                  <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="min-w-0 flex-1 text-start">
                      <h2 className="text-base font-semibold">{item.name}</h2>
                      <dl className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div>
                          Size{" "}
                          <span className="ms-1 font-medium text-foreground">
                            {item.size}
                          </span>
                        </div>
                        <div>
                          Color{" "}
                          <span className="ms-1 font-medium text-foreground">
                            {item.color}
                          </span>
                        </div>
                      </dl>
                      <div className="mt-4 flex flex-wrap gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setCartItems((prev) =>
                              prev.filter((row) => row.id !== item.id)
                            )
                          }
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm text-sm font-medium text-destructive outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Trash2Icon className="size-4" aria-hidden />
                          Remove
                        </button>
                        <button
                          type="button"
                          aria-pressed={onWish}
                          onClick={() =>
                            setWishlisted((prev) =>
                              onWish
                                ? prev.filter((id) => id !== item.id)
                                : [...prev, item.id]
                            )
                          }
                          className={cn(
                            "inline-flex cursor-pointer items-center gap-1.5 rounded-sm text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring",
                            onWish && "font-semibold"
                          )}
                        >
                          <HeartIcon
                            className={cn("size-4", onWish && "fill-current")}
                            aria-hidden
                          />
                          {onWish ? "In wish list" : "Move to wish list"}
                        </button>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end sm:text-end">
                      <div className="inline-flex h-9 items-center rounded-md border border-border/70 bg-background px-2.5 sm:ms-auto">
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
                          className="flex size-6 cursor-pointer items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <MinusIcon className="size-2.5" aria-hidden />
                        </button>
                        <span className="mx-3 text-xs font-medium tabular-nums" dir="ltr">
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
                          className="flex size-6 cursor-pointer items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <PlusIcon className="size-2.5" aria-hidden />
                        </button>
                      </div>
                      <div className="text-end sm:mt-5">
                        <p className="text-base font-semibold tabular-nums" dir="ltr">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                          <s className="font-medium">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </s>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <aside className="h-max border-border lg:sticky lg:top-6 lg:border-s lg:ps-8">
            <h2 className="border-b border-border pb-4 text-lg font-semibold">
              Order summary
            </h2>
            <ul className="mt-4 divide-y divide-border text-sm text-muted-foreground">
              <li className="flex justify-between gap-3 py-3">
                Subtotal
                <span className="font-semibold text-foreground" dir="ltr">
                  ${subtotal.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between gap-3 py-3">
                Shipping
                <span className="font-semibold text-foreground" dir="ltr">
                  ${SHIPPING.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between gap-3 py-3">
                Tax
                <span className="font-semibold text-foreground" dir="ltr">
                  ${TAX.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between gap-3 py-3 font-semibold text-foreground">
                Total
                <span dir="ltr">${total.toFixed(2)}</span>
              </li>
            </ul>

            <Button type="button" className="mt-6 h-[46px] w-full">
              Proceed to checkout
            </Button>
            <a
              href="#"
              className="mt-3 block text-center text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              Continue shopping
            </a>

            <form
              className="mt-8 space-y-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Label htmlFor={`${baseId}-promo`}>Promo code</Label>
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
                  className="h-[46px] w-full shrink-0 sm:w-auto"
                >
                  Apply
                </Button>
              </div>
            </form>
          </aside>
        </div>
      </div>
    </section>
  )
}
