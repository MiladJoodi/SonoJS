"use client"

import * as React from "react"

import { ColorPicker } from "@sonojs/ui/components/color-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"

export function ColorPickerPopoverExample() {
  const [value, setValue] = React.useState("#EC4899")

  return (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-[46px] cursor-pointer items-center gap-2 rounded-md border border-border/70 bg-card px-3 text-sm shadow-xs"
          >
            <span
              className="size-5 rounded-sm border border-border/70"
              style={{ backgroundColor: value }}
            />
            {value}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto border-0 bg-transparent p-0 shadow-none">
          <ColorPicker
            value={value}
            onValueChange={setValue}
            compact
            showOpacity
            showCopy
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
