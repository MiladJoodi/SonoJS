"use client"

import type { ComponentProps } from "react"

import { SaleTag } from "@/registry/promo/sale-tag/hanging-tag"

/** Cyber Monday hanging price tag — navy + cyan. */
export default function SaleTag02(props: ComponentProps<typeof SaleTag>) {
  return (
    <SaleTag
      tone="cyber-monday"
      eyebrow="CYBER MONDAY"
      headline="Digital deals only"
      offer="20% off"
      code="CYBER20"
      endsAt="Ends Dec 2"
      ctaLabel="Copy code"
      position="absolute"
      defaultOpen
      {...props}
    />
  )
}
