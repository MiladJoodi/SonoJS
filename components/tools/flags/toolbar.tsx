"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function FlagsToolbar({
  query,
  onQueryChange,
  inputRef,
}: {
  query: string
  onQueryChange: (value: string) => void
  inputRef?: React.RefObject<HTMLInputElement | null>
}) {
  const hasValue = Boolean(query.trim())

  return (
    <div className="relative min-w-0 w-full">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search name, ISO, or dial…"
        autoComplete="off"
        spellCheck={false}
        className={cn(
          "h-[46px] w-full rounded-md border border-border/70 bg-card pe-10 ps-3.5 text-sm text-foreground outline-none",
          "placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/30"
        )}
      />
      <button
        type="button"
        aria-label="Clear search"
        tabIndex={hasValue ? 0 : -1}
        disabled={!hasValue}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          onQueryChange("")
          inputRef?.current?.focus()
        }}
        className={cn(
          "absolute end-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground",
          hasValue
            ? "cursor-pointer hover:bg-muted hover:text-foreground"
            : "pointer-events-none opacity-0"
        )}
      >
        <XIcon className="size-4" aria-hidden />
      </button>
    </div>
  )
}
