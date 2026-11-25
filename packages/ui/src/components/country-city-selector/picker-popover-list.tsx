"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, Loader2Icon } from "lucide-react"

import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { cn } from "@sonojs/ui/lib/utils"

function usePopoverMenuWidth(
  open: boolean,
  rootRef: React.RefObject<HTMLDivElement | null>
) {
  const [menuWidth, setMenuWidth] = React.useState<number>()

  React.useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const update = () => setMenuWidth(el.getBoundingClientRect().width)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [open, rootRef])

  return menuWidth
}

export type PickerPopoverListProps<T> = {
  disabled?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  listQuery: string
  onListQueryChange: (query: string) => void
  searchPlaceholder: string
  triggerLabel: React.ReactNode
  triggerAriaLabel: string
  emptyMessage: string
  loading?: boolean
  items: T[]
  getKey: (item: T) => string
  isSelected: (item: T) => boolean
  onPick: (item: T) => void
  renderItem: (item: T) => React.ReactNode
  className?: string
}

function PickerPopoverList<T>({
  disabled = false,
  open,
  onOpenChange,
  listQuery,
  onListQueryChange,
  searchPlaceholder,
  triggerLabel,
  triggerAriaLabel,
  emptyMessage,
  loading = false,
  items,
  getKey,
  isSelected,
  onPick,
  renderItem,
  className,
}: PickerPopoverListProps<T>) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const menuWidth = usePopoverMenuWidth(open, rootRef)

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (disabled) return
        onOpenChange(next)
        if (!next) onListQueryChange("")
      }}
      modal={false}
    >
      <PopoverAnchor asChild>
        <InputGroup
          ref={rootRef}
          data-disabled={disabled ? true : undefined}
          className={cn(
            "h-[46px] w-full rounded-md border-border/70",
            open ? "overflow-visible" : "overflow-hidden",
            disabled && "opacity-50",
            className
          )}
        >
          <PopoverTrigger asChild>
            <InputGroupButton
              type="button"
              disabled={disabled}
              aria-label={triggerAriaLabel}
              aria-expanded={open}
              className="h-full min-h-0 w-full cursor-pointer justify-between gap-2 rounded-md px-3 text-start font-normal disabled:cursor-not-allowed"
            >
              <span className="min-w-0 flex-1 truncate text-sm">
                {triggerLabel}
              </span>
              {loading ? (
                <Loader2Icon
                  className="size-4 shrink-0 animate-spin opacity-50"
                  aria-hidden
                />
              ) : (
                <ChevronsUpDownIcon
                  className="size-4 shrink-0 opacity-50"
                  aria-hidden
                />
              )}
            </InputGroupButton>
          </PopoverTrigger>
        </InputGroup>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        className="w-auto p-0"
        style={menuWidth ? { width: menuWidth } : undefined}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <div className="border-b border-border/50 p-2">
          <InputGroup className="h-9 border-border/70">
            <InputGroupInput
              type="search"
              value={listQuery}
              onChange={(e) => onListQueryChange(e.target.value)}
              placeholder={searchPlaceholder}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="h-9 text-sm"
            />
          </InputGroup>
        </div>
        <div className="max-h-72 overflow-y-auto py-0">
          {loading ? (
            <div className="flex items-center gap-2 px-3 py-6 text-sm text-muted-foreground">
              <Loader2Icon className="size-4 animate-spin" aria-hidden />
              Loading…
            </div>
          ) : items.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          ) : (
            items.map((item, index) => {
              const checked = isSelected(item)
              return (
                <button
                  key={getKey(item)}
                  type="button"
                  data-checked={checked ? true : undefined}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-sm outline-none",
                    "hover:bg-muted/50 focus-visible:bg-muted/50",
                    index < items.length - 1 && "border-b border-border/40"
                  )}
                  onClick={() => {
                    onPick(item)
                    onOpenChange(false)
                  }}
                >
                  {renderItem(item)}
                  {checked ? (
                    <CheckIcon
                      className="icon-dir ms-auto size-4 shrink-0 opacity-70"
                      aria-hidden
                    />
                  ) : null}
                </button>
              )
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { PickerPopoverList, usePopoverMenuWidth }