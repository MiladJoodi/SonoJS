"use client"

import * as React from "react"
import { HeartIcon, MinusIcon, PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import amexImg from "./images/amex.webp"
import mastercardImg from "./images/mastercard.webp"
import sunglassImg from "./images/sunglass.webp"
import visaImg from "./images/visa.webp"
import watch1Img from "./images/watch-1.webp"
import watch5Img from "./images/watch-5.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const SHIPPING = 2
const TAX = 4

type CartItem = {
  id: number
  name: string
  image: string
  color: string
  swatch: string
  price: number
  quantity: number
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Stylish Golden Watch",
    image: assetSrc(watch1Img),
    color: "Silver",
    swatch: "#C0C0C0",
    price: 120,
    quantity: 2,
  },
  {
    id: 2,
    name: "Stylish Smart Watch",
    image: assetSrc(watch5Img),
    color: "Gray",
    swatch: "#6B7280",
    price: 70,
    quantity: 1,
  },
  {
    id: 3,
    name: "Round Glass",
    image: assetSrc(sunglassImg),
    color: "Black",
    swatch: "#111827",
    price: 20,
    quantity: 1,
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
  const baseId = React.useId()
  const [cartItems, setCartItems] = React.useState(INITIAL_ITEMS)
  const [promoCode, setPromoCode] = React.useState("")
  const [saved, setSaved] = React.useState<number[]>([])

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
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 text-start">
          <header className="mb-6">
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Bag
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {cartItems.length} products · save favorites for later
            </p>
          </header>

          <ul className="grid gap-4">
            {cartItems.map((item) => {
              const isSaved = saved.includes(item.id)
              return (
                <li
                  key={item.id}
                  className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="relative mx-auto size-28 shrink-0 overflow-hidden rounded-md border border-border/70 bg-background p-2 sm:mx-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-full object-contain"
                      />
                      <span
                        className="absolute end-2 top-2 size-3 rounded-full border-2 border-card shadow-xs"
                        style={{ backgroundColor: item.swatch }}
                        title={item.color}
                        aria-hidden
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-base font-semibold text-foreground">
                            {item.name}
                          </h2>
                          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            Color
                            <span className="font-medium text-foreground">
                              {item.color}
                            </span>
                          </p>
                        </div>
                        <p
                          className="shrink-0 text-base font-semibold tabular-nums"
                          dir="ltr"
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
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

                        <button
                          type="button"
                          aria-pressed={isSaved}
                          onClick={() =>
                            setSaved((prev) =>
                              isSaved
                                ? prev.filter((id) => id !== item.id)
                                : [...prev, item.id]
                            )
                          }
                          className={cn(
                            "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border px-3 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            isSaved
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : "border-border/70 bg-background text-muted-foreground hover:bg-muted"
                          )}
                        >
                          <HeartIcon
                            className={cn("size-3.5", isSaved && "fill-current")}
                            aria-hidden
                          />
                          {isSaved ? "Saved" : "Save"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setCartItems((prev) =>
                              prev.filter((row) => row.id !== item.id)
                            )
                          }
                          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-border/70 bg-background px-3 text-xs font-medium text-destructive outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Trash2Icon className="size-3.5" aria-hidden />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <aside className="h-max rounded-[12px] border border-border/70 bg-card p-6 shadow-soft lg:sticky lg:top-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
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
          </ul>
          <Separator className="my-5" />
          <div className="flex justify-between font-semibold">
            Total
            <span dir="ltr">${total.toFixed(2)}</span>
          </div>

          <form
            className="mt-6 space-y-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Label htmlFor={`${baseId}-promo`}>Promo</Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id={`${baseId}-promo`}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Code"
                className="h-[46px] min-w-0 flex-1 bg-background shadow-none"
              />
              <Button
                type="submit"
                variant="outline"
                className="h-[46px] w-full sm:w-auto"
              >
                Apply
              </Button>
            </div>
          </form>

          <Button type="button" className="mt-6 h-[46px] w-full">
            Checkout
          </Button>

          <div className="mt-6 border-t border-border pt-5">
            <p className="text-caption text-muted-foreground">We accept</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {PAYMENT_LOGOS.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-6 w-auto object-contain opacity-90"
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
