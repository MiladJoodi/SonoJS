"use client"

import * as React from "react"

import { ColorPicker } from "@sonojs/ui/components/color-picker"

export function ColorPickerHistory() {
  const [value, setValue] = React.useState("#8B5CF6")
  const [recent, setRecent] = React.useState<string[]>([
    "#3B82F6",
    "#22C55E",
    "#EAB308",
  ])

  return (
    <ColorPicker
      value={value}
      onValueChange={setValue}
      showRecent
      recentColors={recent}
      onRecentColorsChange={setRecent}
      showSwatches
      showCopy
    />
  )
}
