"use client"

import * as React from "react"
import { MinusIcon, PlusIcon, SparklesIcon, Trash2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import product1Img from "./images/product-1.webp"
import product2Img from "./images/product-2.webp"
import product3Img from "./images/product-3.webp"
import product4Img from "./images/product-4.webp"
import product5Img from "./images/product-5.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const SHIPPING = 2
const TAX = 4

type CartItem = {
  id: number
  name: string
  image: string
  alt: string
  price: number
  quantity: number
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Sunscreen",
    image: assetSrc(product1Img),
    alt: "Sunscreen",
    price: 18.5,
    quantity: 1,
  },
  {
    id: 2,
    name: "Aloederm Cream",
    image: assetSrc(product2Img),
    alt: "Aloederm cream",
    price: 18,
    quantity: 1,
  },
  {
    id: 3,
    name: "Face Body Cream",
    image: assetSrc(product3Img),
    alt: "Face body cream",
    price: 15.5,
    quantity: 1,
  },
  {
    id: 4,
    name: "Faceclin Facewash",
    image: assetSrc(product4Img),
    alt: "Faceclin facewash",
    price: 18,
    quantity: 1,
  },
  {
    id: 5,
    name: "Gentle Facewash",
    image: assetSrc(product5Img),
    alt: "Gentle facewash",
    price: 18,
    quantity: 1,
  },
]

export default function ShoppingCart({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const baseId = React.useId()
  const [cartItems, setCartItems] = React.useState(INITIAL_ITEMS)
  const [promoCode, setPromoCode] = React.useState("")
  const [discount] = React.useState(0)

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = subtotal - discount + SHIPPING + TAX

  const bumpQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row
        const quantity = row.quantity + delta
        return quantity < 1 ? row : { ...row, quantity }
      })
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((row) => row.id !== id))
  }

  const Qty = ({ item }: { item: CartItem }) => (
    <div className="inline-flex h-9 items-center rounded-md border border-border/70 bg-background px-2">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => bumpQty(item.id, -1)}
        className="flex size-7 cursor-pointer items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <MinusIcon className="size-2.5" aria-hidden />
      </button>
      <span className="mx-2 text-xs font-medium tabular-nums" dir="ltr">
        {item.quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => bumpQty(item.id, 1)}
        className="flex size-7 cursor-pointer items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <PlusIcon className="size-2.5" aria-hidden />
      </button>
    </div>
  )

  return (
    <section
      className={cn("w-full min-w-0 bg-white dark:bg-background", className)}
      aria-label="Shopping cart"
      {...props}
    >
      <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.9fr)]">
        <div className="min-w-0 p-4 sm:p-6 lg:p-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5 text-start">
            <div>
              <p className="inline-flex items-center gap-1.5 text-caption font-medium text-primary">
                <SparklesIcon className="size-3.5" aria-hidden />
                Skincare edit
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                Shopping cart
              </h1>
            </div>
            <p className="rounded-full border border-border/70 px-3 py-1 text-sm font-medium text-muted-foreground">
              {cartItems.length} products
            </p>
          </div>

          <ul className="grid gap-3 md:hidden">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="rounded-md border border-border/70 bg-card p-4 shadow-soft"
              >
                <div className="flex gap-3">
                  <div className="size-16 shrink-0 rounded-md border border-border/70 bg-background p-1.5">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-start">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground" dir="ltr">
                      ${item.price.toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="mt-2 inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-destructive uppercase outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Trash2Icon className="size-3.5" aria-hidden />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Qty item={item} />
                  <p className="font-semibold tabular-nums" dir="ltr">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-start">
              <thead>
                <tr className="border-b border-border text-sm text-muted-foreground">
                  <th className="pb-3 pe-4 font-medium">Product</th>
                  <th className="px-4 pb-3 font-medium">Qty</th>
                  <th className="ps-4 pb-3 font-medium">Line total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border/70 align-middle"
                  >
                    <td className="py-5 pe-4">
                      <div className="flex items-center gap-4">
                        <div className="size-20 shrink-0 rounded-md border border-border/70 bg-background p-2">
                          <img
                            src={item.image}
                            alt={item.alt}
                            className="size-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {item.name}
                          </p>
                          <p
                            className="mt-0.5 text-sm text-muted-foreground"
                            dir="ltr"
                          >
                            ${item.price.toFixed(2)}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-sm text-xs font-semibold tracking-wide text-destructive uppercase outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <Trash2Icon className="size-3.5" aria-hidden />
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <Qty item={item} />
                    </td>
                    <td className="py-5 ps-4">
                      <p className="font-semibold tabular-nums" dir="ltr">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="border-t border-border bg-card p-4 sm:p-6 lg:sticky lg:top-0 lg:h-svh lg:overflow-y-auto lg:border-t-0 lg:border-s lg:p-8">
          <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground">Receipt</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between gap-3">
                Discount
                <span className="font-semibold text-foreground" dir="ltr">
                  ${discount.toFixed(2)}
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
            <Separator className="my-4" />
            <div className="flex justify-between text-base font-semibold">
              Total
              <span dir="ltr">${total.toFixed(2)}</span>
            </div>

            <Button type="button" className="mt-6 h-[46px] w-full">
              Proceed to checkout
            </Button>
            <a
              href="#"
              className="mt-3 block text-center text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              Continue shopping
            </a>
          </div>

          <form
            className="mt-6 space-y-2"
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
              <Button type="submit" className="h-[46px] w-full shrink-0 sm:w-auto">
                Apply
              </Button>
            </div>
          </form>
        </aside>
      </div>
    </section>
  )
}
