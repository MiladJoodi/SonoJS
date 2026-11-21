"use client"

import type { ComponentProps } from "react"

import { SaleSignup } from "@/registry/promo/sale-signup/sale-modal"

/**
 * Early Black Friday email signup modal — split cream form + burgundy tier offers.
 * Live apps: pass `position="fixed"`. Docs / view shells supply the relative stage.
 */
export default function SaleSignup01(props: ComponentProps<typeof SaleSignup>) {
  return (
    <SaleSignup
      position="absolute"
      defaultOpen
      {...props}
    />
  )
}
