"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@sonojs/ui/lib/utils"

import {
  formatTimeSlotLabel,
  type AvailabilityTimeSlot,
} from "./lib"

export type { AvailabilityTimeSlot }

export type AvailabilitySlotsProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  slots: AvailabilityTimeSlot[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  /** Grid columns for the time buttons. Default `1` (Cal.com list). */
  columns?: 1 | 2 | 3
  /** Shown when `slots` is empty. */
  emptyText?: string
  disabled?: boolean
}

function AvailabilitySlots({
  slots,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  columns = 1,
  emptyText = "No times available",
  disabled = false,
  className,
  ...props
}: AvailabilitySlotsProps) {
  const [uncontrolled, setUncontrolled] = React.useState<string | null>(
    defaultValue
  )
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : uncontrolled

  const setValue = React.useCallback(
    (next: string | null) => {
      if (!isControlled) setUncontrolled(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  return (
    <div
      data-slot="availability-slots"
      data-disabled={disabled ? "" : undefined}
      role="listbox"
      aria-label="Available times"
      aria-disabled={disabled || undefined}
      className={cn(
        "w-full min-w-0",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      {slots.length === 0 ? (
        <p className="rounded-[12px] border border-dashed border-border/70 bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
          {emptyText}
        </p>
      ) : (
        <div
          className={cn(
            "grid gap-2",
            columns === 1 && "grid-cols-1",
            columns === 2 && "grid-cols-2",
            columns === 3 && "grid-cols-3"
          )}
        >
          {slots.map((slot) => {
            const selected = value === slot.id
            const label =
              slot.label ??
              formatTimeSlotLabel(slot.startMinutes, slot.endMinutes)
            const slotDisabled = disabled || Boolean(slot.disabled)

            return (
              <Button
                key={slot.id}
                type="button"
                role="option"
                aria-selected={selected}
                variant={selected ? "default" : "outline"}
                size="default"
                disabled={slotDisabled}
                className={cn(
                  "h-[46px] w-full font-medium tabular-nums",
                  !selected && "bg-card"
                )}
                onClick={() => {
                  if (slotDisabled) return
                  setValue(selected ? null : slot.id)
                }}
              >
                {label}
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { AvailabilitySlots }
