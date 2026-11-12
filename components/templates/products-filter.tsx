"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import {
  TEMPLATE_CATEGORY_LABEL,
  type TemplateCategory,
  type TemplateStack,
} from "@/lib/templates-catalog-meta"
import {
  compareTemplateNewest,
  type TemplatePreviewItem,
} from "@/lib/templates-preview-data"
import { cn } from "@/lib/utils"

export type TemplatePriceKey = "all" | "free" | "paid"

export type TemplateProductsFilterState = {
  categories: TemplateCategory[]
  stacks: TemplateStack[]
  price: TemplatePriceKey
}

export const EMPTY_PRODUCTS_FILTER: TemplateProductsFilterState = {
  categories: [],
  stacks: [],
  price: "all",
}

export function applyTemplateProductsFilter(
  items: TemplatePreviewItem[],
  state: TemplateProductsFilterState
): TemplatePreviewItem[] {
  let next = items

  if (state.categories.length > 0) {
    next = next.filter((i) => state.categories.includes(i.category))
  }

  if (state.stacks.length > 0) {
    next = next.filter((i) => state.stacks.every((s) => i.stack.includes(s)))
  }

  if (state.price === "free") {
    next = next.filter((i) => i.priceCents === 0)
  } else if (state.price === "paid") {
    next = next.filter((i) => i.priceCents > 0)
  }

  // Always newest first (later catalog entry wins on same day)
  return [...next].sort(compareTemplateNewest)
}

function toggleIn<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value]
}

export function TemplateProductsFilter({
  items,
  value,
  onChange,
  className,
}: {
  items: TemplatePreviewItem[]
  value: TemplateProductsFilterState
  onChange: (next: TemplateProductsFilterState) => void
  className?: string
}) {
  const categories = React.useMemo(() => {
    const counts = new Map<TemplateCategory, number>()
    for (const item of items) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1)
    }
    return [...counts.entries()].sort(([a], [b]) =>
      TEMPLATE_CATEGORY_LABEL[a].localeCompare(TEMPLATE_CATEGORY_LABEL[b])
    )
  }, [items])

  const hasActive = value.categories.length > 0

  return (
    <aside
      className={cn(
        "relative flex w-full flex-col rounded-[12px] border border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] p-5",
        className
      )}
    >
      {hasActive ? (
        <button
          type="button"
          onClick={() => onChange({ ...value, categories: [] })}
          className="absolute end-3 top-3 z-10 inline-flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 text-[12px] font-medium text-[var(--sm-text-faint)] hover:bg-[var(--sm-chip)] hover:text-[var(--sm-text)]"
        >
          <XIcon className="size-3.5" aria-hidden />
          Clear
        </button>
      ) : null}

      <p className="mb-3 text-[12px] font-semibold tracking-[0.08em] text-[var(--sm-text-faint)] uppercase">
        Category
      </p>
      <ul className="space-y-0.5">
        <li>
          <button
            type="button"
            onClick={() =>
              onChange({
                ...value,
                categories: [],
                stacks: [],
              })
            }
            aria-pressed={!hasActive}
            className={cn(
              "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-1.5 text-start transition-colors",
              !hasActive
                ? "bg-primary/10 text-primary"
                : "text-[var(--sm-text)] hover:bg-[var(--sm-chip)]"
            )}
          >
            <span className="text-[14px] font-medium leading-none">All</span>
            <span
              className={cn(
                "tabular-nums text-[13px]",
                !hasActive ? "text-primary" : "text-[var(--sm-text-faint)]"
              )}
            >
              {items.length}
            </span>
          </button>
        </li>
        {categories.map(([cat, count]) => {
          const active = value.categories.includes(cat)
          return (
            <li key={cat}>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...value,
                    categories: toggleIn(value.categories, cat),
                    stacks: [],
                  })
                }
                aria-pressed={active}
                className={cn(
                  "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-1.5 text-start transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-[var(--sm-text)] hover:bg-[var(--sm-chip)]"
                )}
              >
                <span className="text-[14px] font-medium leading-none">
                  {TEMPLATE_CATEGORY_LABEL[cat]}
                </span>
                <span
                  className={cn(
                    "tabular-nums text-[13px]",
                    active
                      ? "text-primary"
                      : "text-[var(--sm-text-faint)]"
                  )}
                >
                  {count}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
