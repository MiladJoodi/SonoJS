"use client"

import type { ComponentProps } from "react"

import { SaleTag } from "@/registry/promo/sale-tag/hanging-tag"

/**
 * Black Friday hanging price tag — drops in on a string, swings, copies the code.
 * Live apps: pass `position="fixed"`. Docs / view shells supply the relative stage.
 */
export default function SaleTag01(props: ComponentProps<typeof SaleTag>) {
  return (
    <SaleTag
      tone="black-friday"
      eyebrow="BLACK FRIDAY"
      headline="Storewide sale"
      offer="20% off"
      code="BF20"
      endsAt="Ends Nov 30"
      ctaLabel="Copy code"
      position="absolute"
      defaultOpen
      {...props}
    />
  )
}
