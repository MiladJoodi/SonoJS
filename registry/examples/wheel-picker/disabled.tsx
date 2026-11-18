"use client"

import * as React from "react"

import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@sonojs/ui/components/wheel-picker"

const options: WheelPickerOption[] = [
  { label: "Starter", value: "starter" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise", disabled: true },
  { label: "Team", value: "team" },
  { label: "Hobby", value: "hobby" },
]

export function WheelPickerDisabled() {
  const [value, setValue] = React.useState("pro")

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <WheelPickerWrapper>
        <WheelPicker options={options} value={value} onValueChange={setValue} />
      </WheelPickerWrapper>
      <p className="text-sm text-muted-foreground">
        Plan: <span className="font-medium text-foreground">{value}</span>
      </p>
    </div>
  )
}
