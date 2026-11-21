"use client"

import type { ComponentProps } from "react"

import { CornerRibbon } from "@/registry/promo/fork-ribbon/corner-ribbon"

/**
 * Classic red corner ribbon — “Fork me on GitHub”.
 * Live apps: pass `position="fixed"`. Change `corner` / `tone` for other looks.
 */
export default function ForkRibbon01(
  props: ComponentProps<typeof CornerRibbon>
) {
  return (
    <CornerRibbon
      label="Fork me on GitHub"
      tone="red"
      corner="top-start"
      position="absolute"
      {...props}
    />
  )
}
