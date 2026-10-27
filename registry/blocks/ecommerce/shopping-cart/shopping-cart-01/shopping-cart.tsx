"use client"

import * as React from "react"
import { MinusIcon, PlusIcon, ShoppingBagIcon, TruckIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"
import sunglassImg from "./images/sunglass.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const SHIPPING = 2
const TAX = 4
const FREE_SHIPPING_AT = 150
const SIZES = ["Small", "Medium", "Large"] as const

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
    size: "Small",
  },
  {
    id: 2,
    name: "Smart Watch Timex",
    image: assetSrc(watchImg),
    price: 120,
    quantity: 1,
    size: "Small",
  },
  {
    id: 3,
    name: "Sun Glass",
    image: assetSrc(sunglassImg),
    price: 50,
    quantity: 1,
    size: "Small",
  },
]

function QtyStepper({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
}) {
  return (
    <div className="inline-flex h-10 items-center rounded-md border border-border/70 bg-background">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrease}
        className="flex size-10 cursor-pointer items-center justify-center rounded-s-md outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
      >
        <MinusIcon className="size-3.5" aria-hidden />
      </button>
      <span
        className="min-w-8 text-center text-sm font-medium tabular-nums"
        dir="ltr"
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrease}
        className="flex size-10 cursor-pointer items-center justify-center rounded-e-md outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
      >
        <PlusIcon className="size-3.5" aria-hidden />
      </button>
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

  const itemCount = cartItems.reduce((n, i) => n + i.quantity, 0)
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = subtotal + SHIPPING + TAX
  const freeProgress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100)
  const freeRemaining = Math.max(0, FREE_SHIPPING_AT - subtotal)

  const updateQty = (id: number, quantity: number) => {
    if (quantity < 1) return
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const updateSize = (id: number, size: Size) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, size } : item))
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-8 sm:py-10 md:px-8 dark:bg-background",
        className
      )}
      aria-label="Shopping cart"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
        <div className="min-w-0 text-start">
          <header className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
            <div className="min-w-0">
              <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
                Checkout bag
              </p>
              <h1 className="mt-1 flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground sm:gap-3 sm:text-2xl">
                <ShoppingBagIcon
                  className="size-5 shrink-0 text-primary sm:size-6"
                  aria-hidden
                />
                Your cart
              </h1>
            </div>
            <span className="inline-flex h-8 items-center rounded-full border border-border/70 bg-card px-3 text-sm font-medium text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </header>

          <div className="mb-6 rounded-md border border-border/70 bg-card p-4 shadow-soft sm:mb-8">
            <div className="flex items-start gap-3">
              <TruckIcon
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {freeRemaining === 0
                    ? "You’ve unlocked free shipping"
                    : `You’re $${freeRemaining.toFixed(0)} away from free shipping`}
                </p>
                <div
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-valuenow={Math.round(freeProgress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full origin-start rounded-full bg-primary transition-transform duration-300"
                    style={{ transform: `scaleX(${freeProgress / 100})` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="rounded-md border border-dashed border-border/70 px-6 py-16 text-center">
              <p className="text-base font-medium text-foreground">
                Your cart is empty
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add something you love and it’ll show up here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border rounded-md border border-border/70 bg-card shadow-soft">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
                    <div className="flex size-20 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background p-2 sm:size-24">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-semibold text-foreground">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                        ${item.price.toFixed(2)} each
                      </p>
                      <label className="sr-only" htmlFor={`${baseId}-size-${item.id}`}>
                        Size for {item.name}
                      </label>
                      <select
                        id={`${baseId}-size-${item.id}`}
                        value={item.size}
                        onChange={(e) =>
                          updateSize(item.id, e.target.value as Size)
                        }
                        className="mt-3 h-9 w-max max-w-full cursor-pointer rounded-md border border-border/70 bg-background px-2.5 text-xs font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {SIZES.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="mt-3 block cursor-pointer rounded-sm text-xs font-medium text-destructive outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
                    <QtyStepper
                      quantity={item.quantity}
                      onDecrease={() => updateQty(item.id, item.quantity - 1)}
                      onIncrease={() => updateQty(item.id, item.quantity + 1)}
                    />
                    <p
                      className="text-base font-semibold tabular-nums text-foreground"
                      dir="ltr"
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="h-max rounded-[12px] border border-border/70 bg-card p-6 shadow-soft lg:sticky lg:top-6">
          <h2 className="text-lg font-semibold text-foreground">Order details</h2>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex justify-between gap-4">
              Subtotal
              <span className="font-semibold text-foreground" dir="ltr">
                ${subtotal.toFixed(2)}
              </span>
            </li>
            <li className="flex justify-between gap-4">
              Shipping
              <span className="font-semibold text-foreground" dir="ltr">
                ${SHIPPING.toFixed(2)}
              </span>
            </li>
            <li className="flex justify-between gap-4">
              Tax
              <span className="font-semibold text-foreground" dir="ltr">
                ${TAX.toFixed(2)}
              </span>
            </li>
          </ul>
          <Separator className="my-5" />
          <div className="flex justify-between text-base font-semibold text-foreground">
            Total
            <span dir="ltr">${total.toFixed(2)}</span>
          </div>

          <form
            className="mt-6 space-y-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Label htmlFor={`${baseId}-promo`}>Promo code</Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id={`${baseId}-promo`}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="h-[46px] min-w-0 flex-1 bg-background shadow-none"
              />
              <Button
                type="submit"
                variant="outline"
                className="h-[46px] w-full shrink-0 sm:w-auto"
              >
                Apply
              </Button>
            </div>
          </form>

          <Button type="button" className="mt-6 h-[46px] w-full">
            Proceed to checkout
          </Button>
          <a
            href="#"
            className="mt-3 block text-center text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            Continue shopping
          </a>
        </aside>
      </div>
    </section>
  )
}
