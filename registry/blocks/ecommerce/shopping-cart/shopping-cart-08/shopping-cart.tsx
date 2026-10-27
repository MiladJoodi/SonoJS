"use client"

import * as React from "react"
import { MinusIcon, PlusIcon, Trash2Icon, TruckIcon, XIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@sonojs/ui/components/drawer"
import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"
import watch1Img from "./images/watch-1.webp"
import watch2Img from "./images/watch-2.webp"
import watch3Img from "./images/watch-3.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const SIZES = ["SM", "MD", "LG", "XL"] as const
const FREE_SHIPPING_AT = 150

type Size = (typeof SIZES)[number]

type CartItem = {
  id: number
  name: string
  image: string
  alt: string
  size: Size
  price: number
  quantity: number
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Velvet Sneaker",
    image: assetSrc(sneakerImg),
    alt: "Velvet sneaker",
    size: "SM",
    price: 20,
    quantity: 2,
  },
  {
    id: 2,
    name: "Smart Watch Timex",
    image: assetSrc(watch1Img),
    alt: "Smart Watch Timex",
    size: "MD",
    price: 60,
    quantity: 1,
  },
  {
    id: 3,
    name: "French Connection",
    image: assetSrc(watch2Img),
    alt: "French Connection",
    size: "XL",
    price: 40,
    quantity: 1,
  },
  {
    id: 4,
    name: "Smart Watch",
    image: assetSrc(watch3Img),
    alt: "Smart Watch",
    size: "SM",
    price: 60,
    quantity: 1,
  },
]

export default function ShoppingCart({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [open, setOpen] = React.useState(false)
  const [cartItems, setCartItems] = React.useState(INITIAL_ITEMS)

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const freeProgress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100)
  const freeRemaining = Math.max(0, FREE_SHIPPING_AT - subtotal)

  return (
    <section
      className={cn(
        "flex min-h-[280px] w-full min-w-0 flex-col items-center justify-center bg-white px-4 py-10 dark:bg-background",
        className
      )}
      aria-label="Shopping cart"
      {...props}
    >
      <Drawer direction="end" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button type="button" variant="outline" className="h-[46px]">
            Open drawer
          </Button>
        </DrawerTrigger>

        <DrawerContent className="w-full max-w-full gap-0 p-0 sm:max-w-md">
          <DrawerHeader className="space-y-0 border-b border-border px-4 py-4 text-start sm:px-5">
            <div className="flex items-center gap-3">
              <DrawerTitle className="flex-1 text-base font-semibold sm:text-lg">
                Shopping cart
              </DrawerTitle>
              <DrawerClose asChild>
                <button
                  type="button"
                  aria-label="Close drawer"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <XIcon
                    className="size-4 text-muted-foreground"
                    aria-hidden
                  />
                </button>
              </DrawerClose>
            </div>
            <DrawerDescription className="sr-only">
              Review items, quantities, and proceed to checkout.
            </DrawerDescription>

            <div className="mt-4 rounded-md border border-border/70 bg-background p-3">
              <div className="flex items-start gap-2">
                <TruckIcon
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                <div className="min-w-0 flex-1 text-start">
                  <p className="text-xs font-medium text-foreground">
                    {freeRemaining === 0
                      ? "Free shipping unlocked"
                      : `Add $${freeRemaining.toFixed(0)} for free shipping`}
                  </p>
                  <div
                    className="mt-2 h-1 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuenow={Math.round(freeProgress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full origin-start rounded-full bg-primary transition-transform"
                      style={{ transform: `scaleX(${freeProgress / 100})` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DrawerHeader>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-5">
            <ul className="divide-y divide-border">
              {cartItems.map((item, index) => (
                <li
                  key={item.id}
                  className={cn(
                    "flex flex-col gap-4 py-5",
                    index === 0 && "pt-4",
                    index === cartItems.length - 1 && "pb-4"
                  )}
                >
                  <div className="flex gap-3">
                    <div className="size-16 shrink-0 rounded-md border border-border/70 bg-background p-2 sm:size-20">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="size-full object-contain"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-3 text-start">
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <select
                          aria-label={`Size for ${item.name}`}
                          value={item.size}
                          onChange={(e) =>
                            setCartItems((prev) =>
                              prev.map((row) =>
                                row.id === item.id
                                  ? { ...row, size: e.target.value as Size }
                                  : row
                              )
                            )
                          }
                          className="mt-2 h-8 w-max max-w-full cursor-pointer rounded-md border border-border/70 bg-background px-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {SIZES.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="inline-flex h-8 items-center rounded-md border border-border/70 bg-background px-1.5">
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
                            className="flex size-6 cursor-pointer items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <PlusIcon className="size-2.5" aria-hidden />
                          </button>
                        </div>
                        <p
                          className="text-sm font-semibold tabular-nums"
                          dir="ltr"
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setCartItems((prev) =>
                            prev.filter((row) => row.id !== item.id)
                          )
                        }
                        className="inline-flex w-max cursor-pointer items-center gap-1.5 rounded-sm text-xs font-semibold text-destructive outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Trash2Icon className="size-3.5" aria-hidden />
                        REMOVE
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <DrawerFooter className="border-t border-border bg-card p-4 sm:p-5">
            <p className="flex justify-between gap-3 text-base font-semibold text-foreground">
              Subtotal
              <span dir="ltr">${subtotal.toFixed(2)}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Shipping and tax calculated at checkout.
            </p>
            <Button type="button" className="mt-2 h-[46px] w-full">
              Proceed to checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  )
}
