"use client"

import * as React from "react"
import { CircleCheckIcon, RotateCcwIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import sneakerImg from "./images/sneaker.webp"
import tshirtImg from "./images/tshirt.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type Product = {
  id: number
  name: string
  price: string
  deliveryDate: string
  isoDeliveryDate: string
  image: string
  alt: string
}

const ORDER = {
  id: "5381",
  date: "Feb 12, 2025",
  isoDate: "2025-02-12",
  total: "$44.00",
  products: [
    {
      id: 1,
      name: "Tshirt",
      price: "$20.00",
      deliveryDate: "March 05, 2025",
      isoDeliveryDate: "2025-03-05",
      image: assetSrc(tshirtImg),
      alt: "Dark green t-shirt",
    },
    {
      id: 2,
      name: "Echo Sneaker",
      price: "$24.00",
      deliveryDate: "March 05, 2025",
      isoDeliveryDate: "2025-03-05",
      image: assetSrc(sneakerImg),
      alt: "Echo sneaker",
    },
  ] satisfies Product[],
}

export default function OrderHistory({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-8 sm:py-10 md:px-8 md:py-16",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
            Delivery dossier
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Order #{ORDER.id}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Placed <time dateTime={ORDER.isoDate}>{ORDER.date}</time>
            <span className="mx-2 text-border">·</span>
            Total {ORDER.total}
          </p>
        </div>

        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-white shadow-soft dark:bg-card">
          <div className="grid grid-cols-1 border-b border-border/70 bg-muted/30 sm:grid-cols-3">
            <div className="border-b border-border/70 px-4 py-4 text-center sm:border-b-0 sm:border-e">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Order
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-foreground">
                #{ORDER.id}
              </p>
            </div>
            <div className="border-b border-border/70 px-4 py-4 text-center sm:border-b-0 sm:border-e">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Placed
              </p>
              <time
                dateTime={ORDER.isoDate}
                className="mt-1 block text-sm font-semibold text-foreground"
              >
                {ORDER.date}
              </time>
            </div>
            <div className="px-4 py-4 text-center">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Total
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {ORDER.total}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 border-b border-border/70 px-4 py-4 sm:flex sm:flex-wrap sm:justify-center">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="w-full sm:w-auto"
            >
              View order
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Download invoice
            </Button>
          </div>

          <ul>
            {ORDER.products.map((product, index) => (
              <li key={product.id}>
                {index > 0 ? <Separator /> : null}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                    <div className="mx-auto size-24 shrink-0 overflow-hidden rounded-md border border-border/70 bg-muted/50 p-2 sm:mx-0">
                      <img
                        src={product.image}
                        alt={product.alt}
                        className="size-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-base font-semibold break-words text-foreground">
                          {product.name}
                        </h2>
                        <p className="shrink-0 text-base font-semibold tabular-nums text-foreground">
                          {product.price}
                        </p>
                      </div>
                      <div className="mt-3 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-700 dark:text-emerald-400">
                        <CircleCheckIcon
                          className="size-4 shrink-0"
                          aria-hidden
                        />
                        <span className="min-w-0 break-words">
                          Delivered{" "}
                          <time dateTime={product.isoDeliveryDate}>
                            {product.deliveryDate}
                          </time>
                        </span>
                      </div>
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                        <button
                          type="button"
                          className="cursor-pointer text-start text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          View product
                        </button>
                        <button
                          type="button"
                          className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <RotateCcwIcon className="size-3.5" aria-hidden />
                          Buy again
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
