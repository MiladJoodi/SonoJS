"use client"

import * as React from "react"

import {
  ColorPicker,
  type ColorFormat,
} from "@sonojs/ui/components/color-picker"

export function ColorPickerFormats() {
  const [value, setValue] = React.useState("rgb(59, 130, 246)")
  const [format, setFormat] = React.useState<ColorFormat>("rgb")

  return (
    <ColorPicker
      value={value}
      onValueChange={setValue}
      format={format}
      onFormatChange={setFormat}
      showFormatSelect
      showCopy
    />
  )
}
