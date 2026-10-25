"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  clearable?: boolean
  onClear?: () => void
}

function Input({
  className,
  type,
  clearable = false,
  onClear,
  value,
  defaultValue,
  disabled,
  readOnly,
  onChange,
  ...props
}: InputProps) {
  const [uncontrolled, setUncontrolled] = React.useState(
    () => String(defaultValue ?? ""),
  )
  const isControlled = value !== undefined
  const current = isControlled ? String(value ?? "") : uncontrolled
  const showClear =
    clearable && !disabled && !readOnly && current.length > 0

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolled(event.target.value)
    onChange?.(event)
  }

  const handleClear = () => {
    if (onClear) {
      onClear()
      return
    }
    if (!isControlled) setUncontrolled("")
    onChange?.({
      target: { value: "" },
      currentTarget: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>)
  }

  const input = (
    <InputPrimitive
      type={type}
      data-slot="input"
      value={isControlled ? value : clearable ? uncontrolled : undefined}
      defaultValue={isControlled || clearable ? undefined : defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      onChange={handleChange}
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        showClear && "pe-8",
        className
      )}
      {...props}
    />
  )

  if (!clearable) return input

  return (
    <div className="relative w-full min-w-0" data-slot="input-clearable">
      {input}
      {showClear ? (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear"
          className="absolute top-1/2 end-1.5 inline-flex size-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={handleClear}
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </div>
  )
}

export { Input }
