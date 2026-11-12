"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@sonojs/ui/components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { cn } from "@sonojs/ui/lib/utils"

export type MultiSelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type MultiSelectProps = Omit<
  React.ComponentProps<"button">,
  "value" | "defaultValue" | "onChange" | "children"
> & {
  options: MultiSelectOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  /** Show the search field inside the popover. Defaults to `true`. */
  searchable?: boolean
  /** Max chips shown in the trigger before a “+N more” badge. */
  maxCount?: number
}

function MultiSelect({
  options,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No results found.",
  disabled = false,
  searchable = true,
  maxCount,
  className,
  id,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [uncontrolled, setUncontrolled] = React.useState<string[]>(defaultValue)
  const isControlled = valueProp !== undefined
  const selected = isControlled ? valueProp : uncontrolled

  const optionByValue = React.useMemo(() => {
    const map = new Map<string, MultiSelectOption>()
    for (const opt of options) map.set(opt.value, opt)
    return map
  }, [options])

  const setSelected = React.useCallback(
    (next: string[]) => {
      if (!isControlled) setUncontrolled(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const toggle = React.useCallback(
    (optionValue: string) => {
      const next = selected.includes(optionValue)
        ? selected.filter((v) => v !== optionValue)
        : [...selected, optionValue]
      setSelected(next)
    },
    [selected, setSelected]
  )

  const remove = React.useCallback(
    (optionValue: string) => {
      setSelected(selected.filter((v) => v !== optionValue))
    },
    [selected, setSelected]
  )

  const clear = React.useCallback(() => {
    setSelected([])
  }, [setSelected])

  const visibleValues =
    typeof maxCount === "number" && maxCount >= 0
      ? selected.slice(0, maxCount)
      : selected
  const overflowCount = Math.max(0, selected.length - visibleValues.length)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-multiselectable="true"
          disabled={disabled}
          data-slot="multi-select"
          className={cn(
            "flex min-h-[46px] w-full cursor-pointer items-center justify-between gap-2 rounded-md border bg-card px-3 py-2 text-sm transition-colors outline-none",
            open
              ? "border-ring"
              : "border-border/70 hover:border-border",
            "focus-visible:border-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
            {selected.length === 0 ? (
              <span className="truncate text-muted-foreground">
                {placeholder}
              </span>
            ) : (
              <>
                {visibleValues.map((v) => {
                  const opt = optionByValue.get(v)
                  const label = opt?.label ?? v
                  return (
                    <Badge
                      key={v}
                      variant="secondary"
                      data-slot="multi-select-chip"
                      className="gap-1 pe-1 font-normal"
                    >
                      <span className="truncate">{label}</span>
                      <span
                        role="button"
                        tabIndex={disabled ? -1 : 0}
                        aria-label={`Remove ${label}`}
                        className={cn(
                          "inline-flex size-4 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                          disabled && "pointer-events-none"
                        )}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (!disabled) remove(v)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            e.stopPropagation()
                            if (!disabled) remove(v)
                          }
                        }}
                      >
                        <XIcon className="size-3" aria-hidden />
                      </span>
                    </Badge>
                  )
                })}
                {overflowCount > 0 ? (
                  <Badge variant="outline" className="font-normal">
                    +{overflowCount} more
                  </Badge>
                ) : null}
              </>
            )}
          </div>
          <ChevronDownIcon
            className={cn(
              "icon-dir size-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command>
          {searchable ? (
            <CommandInput placeholder={searchPlaceholder} />
          ) : null}
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const isSelected = selected.includes(opt.value)
                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.label}
                    disabled={opt.disabled}
                    onSelect={() => {
                      if (opt.disabled) return
                      toggle(opt.value)
                    }}
                    className="rounded-md border-b-0 last:border-b-0"
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-border/70",
                        isSelected &&
                          "border-primary bg-primary text-primary-foreground"
                      )}
                      aria-hidden
                    >
                      {isSelected ? (
                        <CheckIcon className="size-3 text-primary-foreground" />
                      ) : null}
                    </span>
                    <span className="truncate">{opt.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
          {selected.length > 0 ? (
            <div className="border-t border-border/70 p-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 w-full cursor-pointer justify-center text-muted-foreground"
                onClick={clear}
              >
                Clear
              </Button>
            </div>
          ) : null}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSelect }
