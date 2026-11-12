"use client"

import * as React from "react"

import { ColorPicker } from "@sonojs/ui/components/color-picker"

export function ColorPickerOpacity() {
  const [value, setValue] = React.useState("rgba(59, 130, 246, 0.65)")

  return (
    <ColorPicker
      value={value}
      onValueChange={setValue}
      defaultFormat="rgba"
      showOpacity
      showFormatSelect
      showCopy
    />
  )
}
