"use client"

import * as React from "react"
import { MinusIcon, PlusIcon, ShoppingBagIcon, XIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import echoEleganceImg from "./images/echo-elegance.webp"
import sweaterImg from "./images/sweater.webp"
import tshirtImg from "./images/tshirt.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const SHIPPING = 4
const TAX = 4
const ANIM_MS = 320

type CartItem = {
  id: number
  name: string
  image: string
  alt: string
  color: string
  price: number
  quantity: number
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Dark Green T-shirt",
    image: assetSrc(tshirtImg),
    alt: "Dark green t-shirt",
    color: "Dark Green",
    price: 10,
    quantity: 2,
  },
  {
    id: 2,
    name: "Winter Sweater",
    image: assetSrc(sweaterImg),
    alt: "Winter sweater",
    color: "Black",
    price: 20,
    quantity: 1,
  },
  {
    id: 3,
    name: "Echo Elegance",
    image: assetSrc(echoEleganceImg),
    alt: "Echo elegance",
    color: "Black/White",
    price: 12,
    quantity: 2,
  },
  {
    id: 4,
    name: "Smart Watch Timex",
    image: assetSrc(watchImg),
    alt: "Smart Watch Timex",
    color: "Gray",
    price: 11,
    quantity: 2,
  },
]

function CartModal({
  isOpen,
  onClose,
  cartItems,
  setCartItems,
}: {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}) {
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const titleId = React.useId()
  const [mounted, setMounted] = React.useState(isOpen)
  const [visible, setVisible] = React.useState(false)

  const itemCount = cartItems.reduce((n, i) => n + i.quantity, 0)
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = subtotal + SHIPPING + TAX

  React.useEffect(() => {
    if (isOpen) {
      setMounted(true)
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true)
          dialogRef.current?.focus()
        })
      })
      return () => cancelAnimationFrame(id)
    }

    setVisible(false)
    const t = window.setTimeout(() => setMounted(false), ANIM_MS)
    return () => window.clearTimeout(t)
  }, [isOpen])

  const handleClose = React.useCallback(() => {
    setVisible(false)
    window.setTimeout(onClose, ANIM_MS)
  }, [onClose])

  React.useEffect(() => {
    if (!mounted) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [mounted, handleClose])

  if (!mounted) return null

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center p-3 sm:p-4",
        "before:absolute before:inset-0 before:bg-black/50 before:transition-opacity before:duration-300 before:ease-out dark:before:bg-black/70",
        visible ? "before:opacity-100" : "before:opacity-0"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={dialogRef}
        className={cn(
          "relative flex max-h-[min(92vh,720px)] w-full max-w-xl flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft outline-none",
          "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-[0.97] opacity-0"
        )}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-4 sm:px-5">
          <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ShoppingBagIcon className="size-4" aria-hidden />
          </div>
          <div className="min-w-0 flex-1 text-start">
            <h3 id={titleId} className="text-base font-semibold">
              Your bag
            </h3>
            <p className="text-xs text-muted-foreground">
              {itemCount} items ready to checkout
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="flex size-9 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          >
            <XIcon className="size-4 text-muted-foreground" aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2 sm:px-5">
          <ul className="divide-y divide-border">
            {cartItems.map((item) => (
              <li key={item.id} className="flex gap-3 py-4">
                <div className="size-14 shrink-0 rounded-md border border-border/70 bg-background p-1.5 sm:size-16">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="size-full object-contain"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3 text-start">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.color}
                    </p>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() =>
                        setCartItems((prev) =>
                          prev.filter((row) => row.id !== item.id)
                        )
                      }
                      className="mt-2 cursor-pointer rounded-sm text-xs font-medium text-destructive outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Remove
                    </button>
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
                        className="mx-1.5 text-xs font-medium tabular-nums"
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
                    <p className="text-sm font-semibold tabular-nums" dir="ltr">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="my-4 rounded-md border border-dashed border-border bg-background p-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
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
              <li className="flex justify-between gap-3 border-t border-border pt-2 font-semibold text-foreground">
                Total
                <span dir="ltr">${total.toFixed(2)}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-border bg-card px-4 py-4 sm:flex-row sm:justify-end sm:px-5">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="h-[46px] w-full sm:w-auto"
          >
            Continue shopping
          </Button>
          <Button type="button" className="h-[46px] w-full sm:w-auto">
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ShoppingCart({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [cartItems, setCartItems] = React.useState(INITIAL_ITEMS)
  const openBtnRef = React.useRef<HTMLButtonElement>(null)

  return (
    <section
      className={cn(
        "relative flex min-h-[560px] w-full min-w-0 flex-col items-center justify-center bg-background px-4 py-6 sm:min-h-[720px]",
        className
      )}
      aria-label="Shopping cart"
      {...props}
    >
      <CartModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setTimeout(() => openBtnRef.current?.focus(), ANIM_MS + 20)
        }}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <div className="text-center">
        <p className="text-sm text-muted-foreground">Quick look modal cart</p>
        <Button
          type="button"
          variant="outline"
          ref={openBtnRef}
          onClick={() => setIsOpen(true)}
          className="mt-4 h-[46px]"
        >
          Open bag
        </Button>
      </div>
    </section>
  )
}
