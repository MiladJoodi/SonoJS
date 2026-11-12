"use client"

import * as React from "react"

import { Label } from "@sonojs/ui/components/label"
import { ColorPicker } from "@sonojs/ui/components/color-picker"

export function ColorPickerOpacity() {
  const [value, setValue] = React.useState("rgba(37, 99, 235, 0.5)")

  return (
    <div className="w-full max-w-[280px] space-y-2">
      <Label>Overlay color</Label>
      <ColorPicker
        value={value}
        onValueChange={setValue}
        defaultFormat="rgba"
        showOpacity
        showFormatSelect
        showCopy
      />
    </div>
  )
}
