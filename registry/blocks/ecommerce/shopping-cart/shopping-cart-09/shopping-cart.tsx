"use client"

import * as React from "react"
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"
import sunscreenImg from "./images/sunscreen.webp"
import sweaterImg from "./images/sweater.webp"
import tshirtImg from "./images/tshirt.webp"

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
  price: number
  quantity: number
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Sunscreen",
    image: assetSrc(sunscreenImg),
    alt: "Sunscreen",
    size: "M",
    price: 5,
    quantity: 2,
  },
  {
    id: 2,
    name: "Sweater",
    image: assetSrc(sweaterImg),
    alt: "Sweater",
    size: "M",
    price: 12.5,
    quantity: 1,
  },
  {
    id: 3,
    name: "Dark Green Tshirt",
    image: assetSrc(tshirtImg),
    alt: "Dark Green Tshirt",
    size: "M",
    price: 9,
    quantity: 1,
  },
  {
    id: 4,
    name: "Sneaker",
    image: assetSrc(sneakerImg),
    alt: "Sneaker",
    size: "M",
    price: 11,
    quantity: 1,
  },
]

export default function ShoppingCart({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [cartItems, setCartItems] = React.useState(INITIAL_ITEMS)

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = subtotal + SHIPPING + TAX
  const units = cartItems.reduce((n, i) => n + i.quantity, 0)

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

  const Summary = () => (
    <div className="w-full max-w-sm ms-auto">
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex justify-between gap-3 py-1">
          Subtotal
          <span className="font-semibold text-foreground" dir="ltr">
            ${subtotal.toFixed(2)}
          </span>
        </li>
        <li className="flex justify-between gap-3 py-1">
          Shipping
          <span className="font-semibold text-foreground" dir="ltr">
            ${SHIPPING.toFixed(2)}
          </span>
        </li>
        <li className="flex justify-between gap-3 py-1">
          Tax
          <span className="font-semibold text-foreground" dir="ltr">
            ${TAX.toFixed(2)}
          </span>
        </li>
        <li className="mt-2 flex justify-between gap-3 border-t border-border pt-3 text-base font-semibold text-foreground">
          Total
          <span dir="ltr">${total.toFixed(2)}</span>
        </li>
      </ul>
      <Button type="button" className="mt-5 h-[46px] w-full">
        Proceed to checkout
      </Button>
    </div>
  )

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-8 sm:py-10 md:px-8 dark:bg-background",
        className
      )}
      aria-label="Shopping cart"
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4 text-start sm:mb-8">
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Shopping cart
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Line items with size, quantity, and remove actions
            </p>
          </div>
          <div className="rounded-md border border-border/70 bg-card px-3 py-2 text-sm shadow-soft">
            <span className="font-medium text-foreground">{units}</span>{" "}
            <span className="text-muted-foreground">units · </span>
            <span className="font-medium text-foreground" dir="ltr">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </header>

        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <ul className="grid gap-0 divide-y divide-border md:hidden">
            {cartItems.map((item) => (
              <li key={item.id} className="p-4">
                <div className="flex gap-3">
                  <div className="size-16 shrink-0 rounded-md border border-border/70 bg-background p-1.5">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-start">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p
                          className="mt-0.5 text-xs text-muted-foreground"
                          dir="ltr"
                        >
                          ${item.price.toFixed(2)} / ea
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.id)}
                        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border/70 outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Trash2Icon
                          className="size-4 text-destructive"
                          aria-hidden
                        />
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-md border border-border/70 text-sm font-semibold">
                        {item.size}
                      </span>
                      <Qty item={item} />
                      <p
                        className="ms-auto font-semibold tabular-nums"
                        dir="ltr"
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-start">
              <thead>
                <tr className="border-b border-border bg-card text-sm text-muted-foreground">
                  <th className="px-4 py-3.5 font-medium">Description</th>
                  <th className="px-4 py-3.5 font-medium">Size</th>
                  <th className="px-4 py-3.5 font-medium">Quantity</th>
                  <th className="px-4 py-3.5 font-medium">Remove</th>
                  <th className="px-4 py-3.5 font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={cn(
                      "align-middle",
                      index !== cartItems.length - 1 &&
                        "border-b border-border/70"
                    )}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        <div className="size-16 shrink-0 rounded-md border border-border/70 bg-background p-1.5">
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
                            className="mt-0.5 text-xs text-muted-foreground"
                            dir="ltr"
                          >
                            ${item.price.toFixed(2)} / ea
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex size-9 items-center justify-center rounded-md border border-border/70 text-sm font-semibold">
                        {item.size}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Qty item={item} />
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.id)}
                        className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-border/70 outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Trash2Icon
                          className="size-4 text-destructive"
                          aria-hidden
                        />
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold tabular-nums" dir="ltr">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-border bg-card px-4 py-6 sm:px-6">
            <Summary />
          </div>
        </div>
      </div>
    </section>
  )
}
