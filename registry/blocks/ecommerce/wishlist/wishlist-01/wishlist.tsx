"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  HeartIcon,
  PackageIcon,
  Share2Icon,
  ShoppingCartIcon,
  StarIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import deskEssentialsImg from "./images/desk-essentials.webp"
import desktopSetImg from "./images/desktop-set.webp"
import headphonesImg from "./images/headphones.webp"
import workspaceImg from "./images/workspace.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type WishlistItem = {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  category: string
  inStock: boolean
  addedDate: string
}

const ITEMS: WishlistItem[] = [
  {
    id: "1",
    name: "Studio headphones",
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    reviewCount: 234,
    image: assetSrc(headphonesImg),
    category: "Audio",
    inStock: true,
    addedDate: "Oct 18, 2026",
  },
  {
    id: "2",
    name: "Mechanical desktop set",
    price: 159,
    rating: 4.7,
    reviewCount: 182,
    image: assetSrc(desktopSetImg),
    category: "Peripherals",
    inStock: true,
    addedDate: "Oct 16, 2026",
  },
  {
    id: "3",
    name: "Everyday workspace kit",
    price: 189,
    originalPrice: 219,
    rating: 4.9,
    reviewCount: 88,
    image: assetSrc(workspaceImg),
    category: "Workspace",
    inStock: false,
    addedDate: "Oct 14, 2026",
  },
  {
    id: "4",
    name: "Wireless desk essentials",
    price: 129,
    rating: 4.6,
    reviewCount: 512,
    image: assetSrc(deskEssentialsImg),
    category: "Peripherals",
    inStock: true,
    addedDate: "Oct 12, 2026",
  },
]

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={cn(
            "size-3",
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/30"
          )}
          aria-hidden
        />
      ))}
      <span className="text-xs text-muted-foreground">
        ({count.toLocaleString("en-US")})
      </span>
    </div>
  )
}

export default function Wishlist01() {
  const [items, setItems] = React.useState<WishlistItem[]>(ITEMS)
  const [addedToCart, setAddedToCart] = React.useState<Set<string>>(
    () => new Set()
  )

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id))

  const moveToCart = (id: string) => {
    setAddedToCart((prev) => new Set([...prev, id]))
  }

  const inStockItems = items.filter((i) => i.inStock)
  const totalSavings = items.reduce(
    (acc, i) => acc + (i.originalPrice ? i.originalPrice - i.price : 0),
    0
  )

  return (
    <div className="min-h-svh bg-canvas text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              My Wishlist
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {items.length} saved {items.length === 1 ? "item" : "items"}
              {totalSavings > 0 ? (
                <>
                  {" "}
                  · You&apos;re saving{" "}
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    ${totalSavings.toFixed(2)}
                  </span>
                </>
              ) : null}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" className="gap-1.5">
              <Share2Icon className="size-4" aria-hidden />
              Share list
            </Button>
            {inStockItems.length > 0 ? (
              <Button
                type="button"
                size="sm"
                className="gap-1.5"
                onClick={() => inStockItems.forEach((i) => moveToCart(i.id))}
              >
                <ShoppingCartIcon className="size-4" aria-hidden />
                Add all to cart
              </Button>
            ) : null}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[12px] border border-dashed border-border/70 bg-card p-16 text-center shadow-soft">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-muted">
              <HeartIcon className="size-8 text-muted-foreground" aria-hidden />
            </div>
            <h2 className="mb-3 text-xl font-semibold">Your wishlist is empty</h2>
            <p className="mx-auto mb-8 max-w-sm text-sm text-muted-foreground">
              Save items you love by clicking the heart icon on any product.
              They&apos;ll appear here for easy access.
            </p>
            <Button type="button" size="lg" className="gap-2">
              Explore products
              <ArrowRightIcon className="size-4 icon-dir" aria-hidden />
            </Button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const inCart = addedToCart.has(item.id)
              const discount = item.originalPrice
                ? Math.round((1 - item.price / item.originalPrice) * 100)
                : null

              return (
                <li
                  key={item.id}
                  className="group relative overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft transition-colors hover:border-primary/20"
                >
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="absolute inset-e-3 top-3 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full bg-card/80 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`Remove ${item.name} from wishlist`}
                  >
                    <Trash2Icon className="size-4" aria-hidden />
                  </button>

                  {discount ? (
                    <div className="absolute inset-s-3 top-3 z-10 flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-1 text-xs font-semibold text-white shadow-soft dark:bg-emerald-500">
                      <TagIcon className="size-3" aria-hidden />
                      -{discount}%
                    </div>
                  ) : null}

                  {!item.inStock ? (
                    <div className="pointer-events-none absolute inset-s-3 top-14 z-10">
                      <Badge variant="secondary" className="font-semibold">
                        Out of stock
                      </Badge>
                    </div>
                  ) : null}

                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <Badge variant="outline" className="mb-2">
                      {item.category}
                    </Badge>
                    <h2 className="mb-2 text-sm leading-snug font-semibold">
                      {item.name}
                    </h2>
                    <StarRating rating={item.rating} count={item.reviewCount} />
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-lg font-semibold tabular-nums" dir="ltr">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice ? (
                        <span
                          className="text-sm text-muted-foreground line-through tabular-nums"
                          dir="ltr"
                        >
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 mb-4 text-xs text-muted-foreground">
                      Added {item.addedDate}
                    </p>

                    <Button
                      type="button"
                      variant={inCart ? "secondary" : "default"}
                      className={cn(
                        "w-full justify-center gap-1.5",
                        inCart &&
                          "border-transparent bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400"
                      )}
                      onClick={() => moveToCart(item.id)}
                      disabled={!item.inStock || inCart}
                    >
                      {inCart ? (
                        <>
                          <PackageIcon className="size-4" aria-hidden />
                          Added to cart
                        </>
                      ) : (
                        <>
                          <ShoppingCartIcon className="size-4" aria-hidden />
                          Add to cart
                        </>
                      )}
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
