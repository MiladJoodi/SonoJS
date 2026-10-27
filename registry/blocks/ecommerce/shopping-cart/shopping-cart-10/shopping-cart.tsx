"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import headphonesImg from "./images/headphones.webp"
import keyboardImg from "./images/keyboard.webp"
import mouseImg from "./images/mouse.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  color: string
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 249.99,
    quantity: 1,
    image: assetSrc(headphonesImg),
    color: "Matte Black",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 159.99,
    quantity: 2,
    image: assetSrc(keyboardImg),
    color: "White",
  },
  {
    id: 3,
    name: "Ergonomic Mouse",
    price: 89.99,
    quantity: 1,
    image: assetSrc(mouseImg),
    color: "Space Gray",
  },
]

export default function ShoppingCart10() {
  const [items, setItems] = React.useState<CartItem[]>(INITIAL_ITEMS)
  const [promoCode, setPromoCode] = React.useState("")
  const [promoApplied, setPromoApplied] = React.useState(false)

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal - discount + shipping

  return (
    <main className="min-h-svh bg-canvas py-12 text-foreground">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <ShoppingBagIcon className="size-7 text-primary" aria-hidden />
          <h1 className="text-3xl font-semibold tracking-tight">
            Shopping Cart
          </h1>
          <Badge
            variant="secondary"
            className="border-transparent bg-primary/10 font-semibold text-primary"
          >
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Badge>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[12px] border border-border/70 bg-card p-12 text-center shadow-soft">
            <ShoppingBagIcon
              className="mx-auto mb-4 size-12 text-muted-foreground"
              aria-hidden
            />
            <h2 className="text-lg font-semibold">Your cart is empty</h2>
            <p className="mt-2 mb-6 text-muted-foreground">
              Add some products to get started.
            </p>
            <Button type="button" className="gap-2">
              Continue shopping
              <ArrowRightIcon className="size-4 icon-dir" aria-hidden />
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <article
                  key={item.id}
                  className={cn(
                    "flex gap-4 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft transition-colors hover:border-primary/20 sm:p-5"
                  )}
                >
                  <div className="size-20 shrink-0 overflow-hidden rounded-[12px] border border-border/70 bg-muted/40 shadow-soft">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start sm:gap-2">
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-sm font-semibold sm:line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Color: {item.color}
                        </p>
                      </div>
                      <p
                        className="mt-1 shrink-0 text-base font-semibold whitespace-nowrap tabular-nums sm:mt-0"
                        dir="ltr"
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div className="inline-flex items-center overflow-hidden rounded-[12px] border border-border/70 bg-muted/40 self-start sm:self-auto">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="rounded-none"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="size-4" aria-hidden />
                        </Button>
                        <span
                          className="w-10 text-center text-sm font-semibold tabular-nums"
                          aria-label={`Quantity: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="rounded-none"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="size-4" aria-hidden />
                        </Button>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        onClick={() => removeItem(item.id)}
                        className="gap-1.5 self-start font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive sm:self-auto"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2Icon className="size-3.5" aria-hidden />
                        Remove
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft">
                <h2 className="mb-4 text-base font-semibold">Order Summary</h2>

                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold tabular-nums" dir="ltr">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {promoApplied ? (
                    <div className="flex justify-between gap-3 text-emerald-700 dark:text-emerald-400">
                      <span>Discount (10%)</span>
                      <span className="font-medium tabular-nums" dir="ltr">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Shipping</span>
                    {shipping === 0 ? (
                      <Badge
                        variant="secondary"
                        className="border-transparent bg-emerald-500/15 font-semibold text-emerald-700 dark:text-emerald-400"
                      >
                        Free
                      </Badge>
                    ) : (
                      <span className="font-medium tabular-nums" dir="ltr">
                        ${shipping.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-semibold tabular-nums" dir="ltr">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex gap-2">
                    <InputGroup className="min-w-0 flex-1">
                      <InputGroupAddon align="inline-start">
                        <TagIcon className="size-4 text-muted-foreground" aria-hidden />
                      </InputGroupAddon>
                      <InputGroupInput
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        aria-label="Promo code"
                      />
                    </InputGroup>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="shrink-0 px-5 font-semibold"
                      onClick={() => {
                        if (promoCode.trim()) setPromoApplied(true)
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied ? (
                    <p className="mt-1.5 text-xs text-emerald-700 dark:text-emerald-400">
                      Promo code applied!
                    </p>
                  ) : null}
                </div>

                <Button type="button" size="lg" className="mt-6 w-full gap-2">
                  Proceed to checkout
                  <ArrowRightIcon className="size-5 icon-dir" aria-hidden />
                </Button>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {shipping === 0
                    ? "Free shipping on your order!"
                    : "Free shipping on orders over $100"}
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
