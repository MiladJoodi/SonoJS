"use client"

import type { ComponentProps } from "react"

import { HolidayPopup } from "@/registry/promo/holiday-popup/holiday-card"

/**
 * Candy Cane holiday offer — crimson card, white CTA, falling snow + snowcap.
 * Live apps: pass `position="fixed"`. Docs / view shells supply the relative stage.
 */
export default function HolidayPopup02(
  props: ComponentProps<typeof HolidayPopup>
) {
  return (
    <HolidayPopup
      look="candy-cane"
      position="absolute"
      defaultOpen
      {...props}
    />
  )
}
