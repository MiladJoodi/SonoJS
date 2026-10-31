"use client"

import { SearchIcon, XIcon } from "lucide-react"

import {
  listMarketplaceCategories,
  listMarketplaceStacks,
  MARKETPLACE_CATEGORY_LABEL,
  MARKETPLACE_STACK_LABEL,
  type MarketplaceCategory,
  type MarketplaceStack,
} from "@/lib/marketplace-catalog"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

export type CatalogFilterState = {
  q: string
  categories: MarketplaceCategory[]
  stacks: MarketplaceStack[]
}

export function CatalogFilters({
  value,
  onChange,
  resultCount,
  className,
}: {
  value: CatalogFilterState
  onChange: (next: CatalogFilterState) => void
  resultCount: number
  className?: string
}) {
  const categories = listMarketplaceCategories()
  const stacks = listMarketplaceStacks()
  const hasActive =
    value.q.trim().length > 0 ||
    value.categories.length > 0 ||
    value.stacks.length > 0

  function toggleCategory(cat: MarketplaceCategory) {
    const set = new Set(value.categories)
    if (set.has(cat)) set.delete(cat)
    else set.add(cat)
    onChange({ ...value, categories: [...set] })
  }

  function toggleStack(stack: MarketplaceStack) {
    const set = new Set(value.stacks)
    if (set.has(stack)) set.delete(stack)
    else set.add(stack)
    onChange({ ...value, stacks: [...set] })
  }

  return (
    <aside
      className={cn(
        "flex w-full flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft",
        className
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">Filters</p>
          {hasActive ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 cursor-pointer px-2 text-xs shadow-none"
              onClick={() =>
                onChange({ q: "", categories: [], stacks: [] })
              }
            >
              <XIcon className="size-3.5" aria-hidden />
              Clear
            </Button>
          ) : null}
        </div>
        <p className="text-xs text-muted-foreground">
          {resultCount} {resultCount === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="relative">
        <SearchIcon
          className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
          placeholder="Search templates…"
          className="h-[46px] ps-9 shadow-none"
          aria-label="Search marketplace"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Type
        </legend>
        <ul className="space-y-2">
          {categories.map((cat) => {
            const id = `cat-${cat}`
            const checked = value.categories.includes(cat)
            return (
              <li key={cat} className="flex items-center gap-2.5">
                <Checkbox
                  id={id}
                  checked={checked}
                  onCheckedChange={() => toggleCategory(cat)}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={id}
                  className="cursor-pointer text-sm font-normal text-foreground"
                >
                  {MARKETPLACE_CATEGORY_LABEL[cat]}
                </Label>
              </li>
            )
          })}
        </ul>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Built with
        </legend>
        <ul className="max-h-56 space-y-2 overflow-y-auto pe-1">
          {stacks.map((stack) => {
            const id = `stack-${stack}`
            const checked = value.stacks.includes(stack)
            return (
              <li key={stack} className="flex items-center gap-2.5">
                <Checkbox
                  id={id}
                  checked={checked}
                  onCheckedChange={() => toggleStack(stack)}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={id}
                  className="cursor-pointer text-sm font-normal text-foreground"
                >
                  {MARKETPLACE_STACK_LABEL[stack]}
                </Label>
              </li>
            )
          })}
        </ul>
      </fieldset>
    </aside>
  )
}
