"use client"

import type { ComponentProps } from "react"

import { HolidayPopup } from "@/registry/promo/holiday-popup/holiday-card"

/**
 * Evergreen holiday offer — cream card, deep green CTA, falling snow + snowcap.
 * Live apps: pass `position="fixed"`. Docs / view shells supply the relative stage.
 */
export default function HolidayPopup03(
  props: ComponentProps<typeof HolidayPopup>
) {
  return (
    <HolidayPopup
      look="evergreen"
      position="absolute"
      defaultOpen
      {...props}
    />
  )
}
