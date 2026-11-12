"use client"

import { cn } from "@/lib/utils"

import { flagSrc } from "./lib/cdn"
import type { FlagCountry } from "./lib/countries"

export function FlagCard({
  country,
  selected,
  onSelect,
}: {
  country: FlagCountry
  selected?: boolean
  onSelect: (country: FlagCountry) => void
}) {
  return (
    <button
      type="button"
      aria-selected={selected || undefined}
      onClick={() => onSelect(country)}
      className={cn(
        "grid min-h-[68px] cursor-pointer grid-cols-[48px_1fr] items-center gap-3 overflow-hidden rounded-[12px] border border-border/70 bg-card p-3 text-start transition-[border-color,box-shadow,transform]",
        "hover:border-primary/50 hover:shadow-soft active:scale-[0.99]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        selected && "border-primary ring-3 ring-primary/20"
      )}
    >
      <span className="block aspect-[3/2] w-12 shrink-0 overflow-hidden rounded-md border border-border/70 bg-muted/40">
        {/* eslint-disable-next-line @next/next/no-img-element -- CDN SVG; keep page light */}
        <img
          src={flagSrc(country.code)}
          alt=""
          width={48}
          height={32}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-center"
        />
      </span>
      <span className="grid min-w-0 gap-0.5">
        <span className="truncate text-sm font-semibold leading-tight text-foreground">
          {country.name}
        </span>
        <span className="truncate font-mono text-xs text-muted-foreground">
          {country.code} · {country.dial}
        </span>
      </span>
    </button>
  )
}
