"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@sonojs/ui/components/command"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@sonojs/ui/components/popover"
import { cn } from "@sonojs/ui/lib/utils"

export type TagsInputOption = {
  value: string
  label: string
  disabled?: boolean
  /** Mention rows — image URL. */
  avatar?: string
  /** Mention rows — e.g. `@handle` or email. */
  description?: string
}

export type TagsInputProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  options?: TagsInputOption[]
  /** `tags` = freeform chips; `mention` = people picker with `@` display. */
  mode?: "tags" | "mention"
  /** Mention trigger character used when matching typed text. Default `@`. */
  trigger?: string
  /**
   * Allow creating a chip from typed text.
   * Defaults to `true` in `tags` mode and `false` in `mention` mode.
   */
  creatable?: boolean
  /**
   * Keys / characters that commit the current query.
   * `"Enter"` is always treated as a key; other entries are characters (e.g. `,`).
   */
  delimiters?: string[]
  /** Max number of chips. Extra commits are ignored. */
  max?: number
  allowDuplicates?: boolean
  /** Return `false` to reject a creatable commit. */
  validate?: (raw: string) => boolean
  placeholder?: string
  emptyText?: string
  disabled?: boolean
  id?: string
  "aria-invalid"?: boolean
}

const DEFAULT_DELIMITERS = ["Enter", ","]

function normalizeDelimiters(delimiters: string[]) {
  const keys = new Set<string>()
  const chars: string[] = []
  for (const d of delimiters) {
    if (d === "Enter" || d === "Tab") keys.add(d)
    else if (d.length === 1) chars.push(d)
  }
  return { keys, chars }
}

function splitByChars(text: string, chars: string[]) {
  if (chars.length === 0) return [text]
  const escaped = chars.map((c) =>
    c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  )
  return text.split(new RegExp(`[${escaped.join("")}\\n]+`))
}

function TagsInput({
  value: valueProp,
  defaultValue = [],
  onValueChange,
  options = [],
  mode = "tags",
  trigger = "@",
  creatable: creatableProp,
  delimiters = DEFAULT_DELIMITERS,
  max,
  allowDuplicates = false,
  validate,
  placeholder = mode === "mention" ? "Mention someone…" : "Add a tag…",
  emptyText = "No results found.",
  disabled = false,
  id,
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: TagsInputProps) {
  const creatable = creatableProp ?? mode === "tags"
  const { keys: delimiterKeys, chars: delimiterChars } =
    React.useMemo(() => normalizeDelimiters(delimiters), [delimiters])

  const inputRef = React.useRef<HTMLInputElement>(null)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [anchorWidth, setAnchorWidth] = React.useState<number>()
  const [query, setQuery] = React.useState("")
  const [focused, setFocused] = React.useState(false)
  const [listDismissed, setListDismissed] = React.useState(false)
  const [uncontrolled, setUncontrolled] =
    React.useState<string[]>(defaultValue)

  React.useEffect(() => {
    const node = rootRef.current
    if (!node || typeof ResizeObserver === "undefined") return
    const sync = () => setAnchorWidth(node.offsetWidth)
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  const isControlled = valueProp !== undefined
  const selected = isControlled ? valueProp : uncontrolled

  const optionByValue = React.useMemo(() => {
    const map = new Map<string, TagsInputOption>()
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

  const atMax =
    typeof max === "number" && max >= 0 && selected.length >= max

  const filterText = React.useMemo(() => {
    const raw = query.trim()
    if (mode === "mention" && raw.startsWith(trigger)) {
      return raw.slice(trigger.length).trimStart()
    }
    return raw
  }, [mode, query, trigger])

  const filteredOptions = React.useMemo(() => {
    const q = filterText.toLowerCase()
    return options.filter((opt) => {
      if (!allowDuplicates && selected.includes(opt.value)) return false
      if (!q) return true
      const hay = `${opt.label} ${opt.description ?? ""} ${opt.value}`.toLowerCase()
      return hay.includes(q)
    })
  }, [allowDuplicates, filterText, options, selected])

  const showSuggestions = options.length > 0 && focused && !disabled && !atMax
  const popoverOpen = showSuggestions && !listDismissed

  const addValue = React.useCallback(
    (nextValue: string) => {
      const trimmed = nextValue.trim()
      if (!trimmed || disabled || atMax) return false
      if (!allowDuplicates && selected.includes(trimmed)) return false
      setSelected([...selected, trimmed])
      setQuery("")
      return true
    },
    [allowDuplicates, atMax, disabled, selected, setSelected]
  )

  const commitQuery = React.useCallback(() => {
    if (!creatable) return false
    let raw = query.trim()
    if (!raw) return false
    if (mode === "mention" && raw.startsWith(trigger)) {
      raw = raw.slice(trigger.length).trim()
    }
    if (!raw) return false
    if (validate && !validate(raw)) return false
    // Prefer matching option value when label/description matches creatable text.
    const match = options.find(
      (opt) =>
        opt.value === raw ||
        opt.label.toLowerCase() === raw.toLowerCase() ||
        (opt.description &&
          opt.description.replace(/^@/, "").toLowerCase() ===
            raw.replace(/^@/, "").toLowerCase())
    )
    return addValue(match?.value ?? raw)
  }, [
    addValue,
    creatable,
    mode,
    options,
    query,
    trigger,
    validate,
  ])

  const remove = React.useCallback(
    (chipValue: string) => {
      if (disabled) return
      setSelected(selected.filter((v) => v !== chipValue))
    },
    [disabled, selected, setSelected]
  )

  const pickOption = React.useCallback(
    (opt: TagsInputOption) => {
      if (opt.disabled || disabled || atMax) return
      if (!allowDuplicates && selected.includes(opt.value)) return
      setSelected([...selected, opt.value])
      setQuery("")
      inputRef.current?.focus()
    },
    [allowDuplicates, atMax, disabled, selected, setSelected]
  )

  const chipLabel = React.useCallback(
    (chipValue: string) => {
      const opt = optionByValue.get(chipValue)
      if (mode === "mention") {
        if (opt?.description?.startsWith("@")) return opt.description
        if (opt?.label) return `${trigger}${opt.label}`
        return chipValue.startsWith(trigger)
          ? chipValue
          : `${trigger}${chipValue}`
      }
      return opt?.label ?? chipValue
    },
    [mode, optionByValue, trigger]
  )

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    if (event.key === "Backspace" && query.length === 0 && selected.length > 0) {
      event.preventDefault()
      remove(selected[selected.length - 1]!)
      return
    }

    if (event.key === "Escape") {
      setListDismissed(true)
      setQuery("")
      return
    }

    if (delimiterKeys.has(event.key)) {
      if (!query.trim()) return
      event.preventDefault()
      if (creatable) {
        commitQuery()
        return
      }
      if (filteredOptions[0]) pickOption(filteredOptions[0])
      return
    }

    if (
      event.key.length === 1 &&
      delimiterChars.includes(event.key) &&
      query.trim()
    ) {
      event.preventDefault()
      if (creatable) commitQuery()
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value
    if (delimiterChars.some((c) => next.includes(c))) {
      const parts = splitByChars(next, delimiterChars)
      const last = parts.pop() ?? ""
      for (const part of parts) {
        const piece = part.trim()
        if (!piece) continue
        if (creatable) {
          let raw = piece
          if (mode === "mention" && raw.startsWith(trigger)) {
            raw = raw.slice(trigger.length).trim()
          }
          if (raw && (!validate || validate(raw))) addValue(raw)
        }
      }
      setQuery(last)
      return
    }
    setQuery(next)
  }

  const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (!creatable || disabled || atMax) return
    const text = event.clipboardData.getData("text")
    if (!text || (!delimiterChars.some((c) => text.includes(c)) && !text.includes("\n"))) {
      return
    }
    event.preventDefault()
    const parts = splitByChars(text, [...delimiterChars, "\n"])
    for (const part of parts) {
      let raw = part.trim()
      if (!raw) continue
      if (mode === "mention" && raw.startsWith(trigger)) {
        raw = raw.slice(trigger.length).trim()
      }
      if (!raw) continue
      if (validate && !validate(raw)) continue
      if (!addValue(raw)) break
    }
  }

  return (
    <Popover
      open={popoverOpen}
      onOpenChange={(next) => {
        if (!next) setListDismissed(true)
      }}
    >
      <PopoverAnchor asChild>
        <div
          ref={rootRef}
          data-slot="tags-input"
          data-disabled={disabled ? "" : undefined}
          aria-invalid={ariaInvalid || undefined}
          className={cn(
            "flex min-h-[46px] w-full cursor-text flex-wrap items-center gap-1.5 rounded-md border border-border/70 bg-card px-3 py-2 text-base shadow-xs transition-[color,box-shadow] md:text-sm dark:bg-card",
            "focus-within:border-ring",
            "aria-invalid:border-destructive",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          onClick={() => {
            if (!disabled) inputRef.current?.focus()
          }}
          {...props}
        >
          {selected.map((chipValue) => {
            const label = chipLabel(chipValue)
            const opt = optionByValue.get(chipValue)
            return (
              <Badge
                key={chipValue}
                variant="secondary"
                data-slot="tags-input-chip"
                className="gap-1 pe-1 font-normal"
              >
                {mode === "mention" && opt?.avatar ? (
                  <Avatar size="sm" className="size-4">
                    <AvatarImage src={opt.avatar} alt="" />
                    <AvatarFallback className="text-[9px]">
                      {opt.label.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : null}
                <span className="truncate">{label}</span>
                <button
                  type="button"
                  tabIndex={disabled ? -1 : 0}
                  aria-label={`Remove ${label}`}
                  disabled={disabled}
                  className={cn(
                    "inline-flex size-4 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    "disabled:pointer-events-none disabled:cursor-not-allowed"
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    remove(chipValue)
                  }}
                >
                  <XIcon className="size-3" aria-hidden />
                </button>
              </Badge>
            )
          })}
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={query}
            disabled={disabled || atMax}
            placeholder={selected.length === 0 ? placeholder : undefined}
            aria-invalid={ariaInvalid}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            data-slot="tags-input-field"
            className={cn(
              "min-w-[8ch] flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-sm",
              "disabled:cursor-not-allowed"
            )}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            onPaste={onPaste}
            onFocus={() => {
              setFocused(true)
              setListDismissed(false)
            }}
            onBlur={(e) => {
              const next = e.relatedTarget as Node | null
              const root = e.currentTarget.closest('[data-slot="tags-input"]')
              // Keep open when focus moves into the popover portal.
              if (
                next &&
                (root?.contains(next) ||
                  (next instanceof Element &&
                    next.closest('[data-slot="popover-content"]')))
              ) {
                return
              }
              setFocused(false)
              setListDismissed(false)
              if (creatable && query.trim()) commitQuery()
              else setQuery("")
            }}
          />
        </div>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        sideOffset={6}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        style={anchorWidth ? { width: anchorWidth } : undefined}
        className="p-0"
      >
        <Command shouldFilter={false}>
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={`${opt.label} ${opt.description ?? ""} ${opt.value}`}
                  disabled={opt.disabled}
                  onSelect={() => pickOption(opt)}
                  className="rounded-md border-b-0 last:border-b-0"
                >
                  {mode === "mention" ? (
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                      <Avatar size="sm" className="size-6">
                        {opt.avatar ? (
                          <AvatarImage src={opt.avatar} alt="" />
                        ) : null}
                        <AvatarFallback>
                          {opt.label.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">
                          {opt.label}
                        </span>
                        {opt.description ? (
                          <span className="block truncate text-xs text-muted-foreground">
                            {opt.description}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  ) : (
                    <span className="truncate">{opt.label}</span>
                  )}
                </CommandItem>
              ))}
              {creatable &&
              filterText &&
              !filteredOptions.some(
                (o) =>
                  o.value.toLowerCase() === filterText.toLowerCase() ||
                  o.label.toLowerCase() === filterText.toLowerCase()
              ) &&
              (validate ? validate(filterText) : true) &&
              (allowDuplicates || !selected.includes(filterText)) ? (
                <CommandItem
                  value={`create-${filterText}`}
                  onSelect={() => addValue(filterText)}
                  className="rounded-md border-b-0 last:border-b-0"
                >
                  Create “{filterText}”
                </CommandItem>
              ) : null}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { TagsInput }
