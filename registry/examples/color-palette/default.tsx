"use client"

import * as React from "react"

import {
  ColorPalette,
} from "@sonojs/ui/components/color-palette"
import type { ColorHarmony } from "@sonojs/ui/components/color-picker"

export function ColorPaletteDefault() {
  const [base, setBase] = React.useState("#3B82F6")
  const [harmony, setHarmony] = React.useState<ColorHarmony>("analogous")

  return (
    <ColorPalette
      baseColor={base}
      onBaseColorChange={setBase}
      harmony={harmony}
      onHarmonyChange={setHarmony}
    />
  )
}
