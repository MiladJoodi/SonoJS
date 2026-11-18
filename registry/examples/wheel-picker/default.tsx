"use client"

import * as React from "react"

import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@sonojs/ui/components/wheel-picker"

const options: WheelPickerOption[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Solid", value: "solid" },
]

export function WheelPickerDefault() {
  const [value, setValue] = React.useState("react")

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <WheelPickerWrapper>
        <WheelPicker options={options} value={value} onValueChange={setValue} />
      </WheelPickerWrapper>
      <p className="text-sm text-muted-foreground">
        Selected: <span className="font-medium text-foreground">{value}</span>
      </p>
    </div>
  )
}
