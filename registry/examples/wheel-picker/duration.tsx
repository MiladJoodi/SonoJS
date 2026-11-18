"use client"

import * as React from "react"

import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@sonojs/ui/components/wheel-picker"

const hourOptions: WheelPickerOption<number>[] = Array.from(
  { length: 13 },
  (_, i) => ({
    label: `${i}h`,
    value: i,
  })
)

const minuteOptions: WheelPickerOption<number>[] = Array.from(
  { length: 12 },
  (_, i) => {
    const value = i * 5
    return {
      label: `${value.toString().padStart(2, "0")}m`,
      value,
    }
  }
)

export function WheelPickerDuration() {
  const [hours, setHours] = React.useState(1)
  const [minutes, setMinutes] = React.useState(30)

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <WheelPickerWrapper className="!w-44 *:data-rwp:!w-[5.5rem]">
        <WheelPicker
          options={hourOptions}
          value={hours}
          onValueChange={setHours}
        />
        <WheelPicker
          options={minuteOptions}
          value={minutes}
          onValueChange={setMinutes}
        />
      </WheelPickerWrapper>
      <p className="text-sm text-muted-foreground">
        Duration:{" "}
        <span className="font-medium text-foreground">
          {hours}h {minutes.toString().padStart(2, "0")}m
        </span>
      </p>
    </div>
  )
}
