"use client"

import * as React from "react"
import { PaletteIcon } from "lucide-react"

import { ColorPicker } from "@sonojs/ui/components/color-picker"

export function ColorPickerGallery() {
  const [value, setValue] = React.useState("#3B82F6")

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="flex w-full items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PaletteIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Brand color
          </h3>
          <p className="text-xs text-muted-foreground">
            Full panel with opacity, swatches, formats, and copy.
          </p>
        </div>
        <span
          className="ms-auto size-8 shrink-0 rounded-md border border-border/70"
          style={{ backgroundColor: value }}
        />
      </div>
      <ColorPicker
        value={value}
        onValueChange={setValue}
        showOpacity
        showSwatches
        showFormatSelect
        showCopy
        showEyeDropper
      />
    </div>
  )
}
