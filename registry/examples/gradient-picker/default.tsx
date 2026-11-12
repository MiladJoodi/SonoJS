"use client"

import * as React from "react"

import { GradientPicker } from "@sonojs/ui/components/gradient-picker"

export function GradientPickerDefault() {
  const [css, setCss] = React.useState(
    "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)"
  )

  return (
    <div className="flex w-full flex-col items-start gap-3">
      <GradientPicker
        onValueChange={(_next, nextCss) => {
          setCss(nextCss)
        }}
      />
      <p className="max-w-md break-all font-mono text-xs text-muted-foreground">
        {css}
      </p>
    </div>
  )
}
