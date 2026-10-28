"use client"

import * as React from "react"
import {
  Building2Icon,
  EllipsisVerticalIcon,
  PlusIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import amexLogo from "./images/american-express.webp"
import masterLogo from "./images/master.webp"
import paypalLogo from "./images/paypal.webp"
import visaLogo from "./images/visa.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const BRAND = {
  visa: assetSrc(visaLogo),
  master: assetSrc(masterLogo),
  amex: assetSrc(amexLogo),
  paypal: assetSrc(paypalLogo),
} as const

type MethodKind = "card" | "bank" | "wallet"

type Method = {
  id: string
  kind: MethodKind
  label: string
  detail: string
  brand?: keyof typeof BRAND
  expiry?: string
  isDefault: boolean
}

const INITIAL: Method[] = [
  {
    id: "visa",
    kind: "card",
    label: "Visa ending in 4242",
    detail: "Expires 08/28",
    brand: "visa",
    expiry: "08/28",
    isDefault: true,
  },
  {
    id: "master",
    kind: "card",
    label: "Mastercard ending in 8210",
    detail: "Expires 11/27",
    brand: "master",
    expiry: "11/27",
    isDefault: false,
  },
  {
    id: "amex",
    kind: "card",
    label: "Amex ending in 1005",
    detail: "Expires 03/26",
    brand: "amex",
    expiry: "03/26",
    isDefault: false,
  },
  {
    id: "paypal",
    kind: "wallet",
    label: "PayPal",
    detail: "alex.johnson@example.com",
    brand: "paypal",
    isDefault: false,
  },
  {
    id: "ach",
    kind: "bank",
    label: "Chase Business Checking",
    detail: "ACH ·••• 9912",
    isDefault: false,
  },
]

function BrandMark({ src }: { src: string }) {
  return (
    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border/70 bg-white px-1.5">
      <img src={src} alt="" className="h-4 w-auto max-w-8 object-contain" />
    </span>
  )
}

export default function PaymentMethods({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [methods, setMethods] = React.useState(INITIAL)

  const setDefault = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    )
  }

  const remove = (id: string) => {
    setMethods((prev) => {
      const next = prev.filter((m) => m.id !== id)
      if (next.length && !next.some((m) => m.isDefault)) {
        next[0] = { ...next[0]!, isDefault: true }
      }
      return next
    })
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="payment-methods-02-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <header className="flex flex-col gap-4 border-b border-border/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="text-start">
            <h1
              id="payment-methods-02-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Payment methods
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Cards, wallets, and bank accounts used for billing.
            </p>
          </div>
          <Button type="button" size="sm" className="cursor-pointer gap-1.5">
            <PlusIcon className="size-4" aria-hidden />
            Add method
          </Button>
        </header>

        <ul>
          {methods.map((method, index) => (
            <li key={method.id}>
              {index > 0 ? <Separator /> : null}
              <div className="flex items-center gap-3 px-5 py-4 sm:gap-4 sm:px-6">
                {method.brand ? (
                  <BrandMark src={BRAND[method.brand]} />
                ) : (
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border/70 bg-muted text-muted-foreground">
                    <Building2Icon className="size-4" aria-hidden />
                  </span>
                )}

                <div className="min-w-0 flex-1 text-start">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium">
                      {method.label}
                    </p>
                    {method.isDefault ? (
                      <Badge
                        variant="secondary"
                        className="border-transparent bg-primary/10 font-medium text-primary"
                      >
                        Default
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground" dir="ltr">
                    {method.detail}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-9 shrink-0 cursor-pointer"
                      aria-label={`${method.label} actions`}
                    >
                      <EllipsisVerticalIcon className="size-4" aria-hidden />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    {!method.isDefault ? (
                      <DropdownMenuItem
                        className="cursor-pointer gap-2"
                        onClick={() => setDefault(method.id)}
                      >
                        <StarIcon className="size-4" aria-hidden />
                        Set as default
                      </DropdownMenuItem>
                    ) : null}
                    {!method.isDefault ? <DropdownMenuSeparator /> : null}
                    <DropdownMenuItem
                      variant="destructive"
                      className="cursor-pointer gap-2"
                      onClick={() => remove(method.id)}
                    >
                      <Trash2Icon className="size-4" aria-hidden />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>

        {methods.length === 0 ? (
          <div className="px-5 py-12 text-center sm:px-6">
            <p className="text-sm font-medium">No payment methods</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add a card or bank account to pay invoices.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
