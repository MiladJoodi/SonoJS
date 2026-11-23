"use client"

import "@ncdai/react-wheel-picker/style.css"

import type { ComponentProps } from "react"
import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker"

import { cn } from "@sonojs/ui/lib/utils"

type WheelPickerValue = WheelPickerPrimitive.WheelPickerValue

type WheelPickerOption<T extends WheelPickerValue = string> =
  WheelPickerPrimitive.WheelPickerOption<T>

type WheelPickerClassNames = WheelPickerPrimitive.WheelPickerClassNames

function WheelPickerWrapper({
  className,
  ...props
}: ComponentProps<typeof WheelPickerPrimitive.WheelPickerWrapper>) {
  return (
    <WheelPickerPrimitive.WheelPickerWrapper
      className={cn(
        // Library CSS sets [data-rwp-wrapper]{width:100%} - force a compact card.
        "!w-44 max-w-full justify-center cursor-pointer rounded-md border border-border/70 bg-card px-1 shadow-soft",
        "*:data-rwp:!flex-none *:data-rwp:w-full",
        "*:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-s-md",
        "*:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-e-md",
        className
      )}
      {...props}
    />
  )
}

function WheelPicker<T extends WheelPickerValue = string>({
  classNames,
  ...props
}: WheelPickerPrimitive.WheelPickerProps<T>) {
  return (
    <WheelPickerPrimitive.WheelPicker
      classNames={{
        optionItem: cn(
          "cursor-pointer text-muted-foreground data-disabled:cursor-not-allowed data-disabled:opacity-40",
          classNames?.optionItem
        ),
        highlightWrapper: cn(
          "bg-muted text-foreground",
          "data-rwp-focused:inset-ring-2 data-rwp-focused:inset-ring-ring/50",
          classNames?.highlightWrapper
        ),
        highlightItem: cn(
          "data-disabled:opacity-40",
          classNames?.highlightItem
        ),
      }}
      {...props}
    />
  )
}

export { WheelPicker, WheelPickerWrapper }
export type { WheelPickerClassNames, WheelPickerOption, WheelPickerValue }
