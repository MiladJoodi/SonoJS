"use client"

import type { ComponentProps } from "react"

import { SaleTag } from "@/registry/promo/sale-tag/hanging-tag"

/** Kraft paper hanging price tag — warm paper + dark ink. */
export default function SaleTag03(props: ComponentProps<typeof SaleTag>) {
  return (
    <SaleTag
      tone="kraft"
      eyebrow="WEEKEND DROP"
      headline="Crafted for you"
      offer="20% off"
      code="KRAFT20"
      endsAt="Ends Sunday"
      ctaLabel="Copy code"
      position="absolute"
      defaultOpen
      {...props}
    />
  )
}
