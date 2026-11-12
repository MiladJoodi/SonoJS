"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { ColorPicker } from "@sonojs/ui/components/color-picker"

export function ColorPickerControlled() {
  const [value, setValue] = React.useState("#22C55E")

  return (
    <div className="flex flex-col items-start gap-3">
      <ColorPicker value={value} onValueChange={setValue} showCopy />
      <div className="flex items-center gap-2">
        <p className="font-mono text-xs text-muted-foreground">{value}</p>
        <Button
          type="button"
          size="xs"
          variant="outline"
          onClick={() => setValue("#3B82F6")}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
