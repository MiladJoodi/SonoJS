"use client"

import * as React from "react"

import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@sonojs/ui/components/wheel-picker"

function padOptions(length: number, add = 0): WheelPickerOption<number>[] {
  return Array.from({ length }, (_, i) => {
    const value = i + add
    return {
      label: value.toString().padStart(2, "0"),
      value,
    }
  })
}

const hourOptions = padOptions(12, 1)
const minuteOptions = padOptions(60)
const meridiemOptions: WheelPickerOption[] = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
]

export function WheelPickerTime() {
  const [hour, setHour] = React.useState(9)
  const [minute, setMinute] = React.useState(30)
  const [meridiem, setMeridiem] = React.useState("AM")

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <WheelPickerWrapper className="!w-52 *:data-rwp:!w-[4.25rem]">
        <WheelPicker
          options={hourOptions}
          value={hour}
          onValueChange={setHour}
          infinite
        />
        <WheelPicker
          options={minuteOptions}
          value={minute}
          onValueChange={setMinute}
          infinite
        />
        <WheelPicker
          options={meridiemOptions}
          value={meridiem}
          onValueChange={setMeridiem}
        />
      </WheelPickerWrapper>
      <p className="text-sm text-muted-foreground">
        Time:{" "}
        <span className="font-medium text-foreground">
          {hour.toString().padStart(2, "0")}:
          {minute.toString().padStart(2, "0")} {meridiem}
        </span>
      </p>
    </div>
  )
}
