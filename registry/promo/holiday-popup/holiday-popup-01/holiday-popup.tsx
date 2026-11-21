"use client"

import type { ComponentProps } from "react"

import { HolidayPopup } from "@/registry/promo/holiday-popup/holiday-card"

/**
 * Winter Night holiday offer — navy card, gold CTA, falling snow + snowcap.
 * Live apps: pass `position="fixed"`. Docs / view shells supply the relative stage.
 */
export default function HolidayPopup01(
  props: ComponentProps<typeof HolidayPopup>
) {
  return (
    <HolidayPopup
      look="winter-night"
      position="absolute"
      defaultOpen
      {...props}
    />
  )
}
