"use client"

import * as React from "react"

import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@sonojs/ui/components/wheel-picker"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

const monthOptions: WheelPickerOption<number>[] = MONTHS.map((label, i) => ({
  label,
  value: i + 1,
}))

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function dayOptions(year: number, month: number): WheelPickerOption<number>[] {
  const count = daysInMonth(year, month)
  return Array.from({ length: count }, (_, i) => {
    const value = i + 1
    return { label: value.toString(), value }
  })
}

const yearOptions: WheelPickerOption<number>[] = Array.from(
  { length: 80 },
  (_, i) => {
    const value = 2026 - i
    return { label: value.toString(), value }
  }
)

export function WheelPickerDate() {
  const [month, setMonth] = React.useState(6)
  const [day, setDay] = React.useState(15)
  const [year, setYear] = React.useState(2026)

  const days = React.useMemo(() => dayOptions(year, month), [year, month])

  React.useEffect(() => {
    const max = daysInMonth(year, month)
    if (day > max) setDay(max)
  }, [year, month, day])

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <WheelPickerWrapper className="!w-60 *:data-rwp:!w-20">
        <WheelPicker
          options={monthOptions}
          value={month}
          onValueChange={setMonth}
        />
        <WheelPicker options={days} value={day} onValueChange={setDay} />
        <WheelPicker
          options={yearOptions}
          value={year}
          onValueChange={setYear}
        />
      </WheelPickerWrapper>
      <p className="text-sm text-muted-foreground">
        Date:{" "}
        <span className="font-medium text-foreground">
          {MONTHS[month - 1]} {day}, {year}
        </span>
      </p>
    </div>
  )
}
