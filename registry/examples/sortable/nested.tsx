"use client"

import { useState } from "react"
import { GripVerticalIcon, LayersIcon } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@sonojs/ui/components/badge"
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@sonojs/ui/components/sortable"

interface OptionValue {
  id: string
  value: string
}

interface OptionGroup {
  id: string
  name: string
  values: OptionValue[]
}

const defaultOptionGroups: OptionGroup[] = [
  {
    id: "1",
    name: "Colors",
    values: [
      { id: "1-1", value: "White" },
      { id: "1-2", value: "Black" },
      { id: "1-3", value: "Grey" },
      { id: "1-4", value: "Green" },
    ],
  },
  {
    id: "2",
    name: "Sizes",
    values: [
      { id: "2-1", value: "Small" },
      { id: "2-2", value: "Medium" },
      { id: "2-3", value: "Large" },
    ],
  },
  {
    id: "3",
    name: "Materials",
    values: [
      { id: "3-1", value: "Cotton" },
      { id: "3-2", value: "Polyester" },
      { id: "3-3", value: "Wool" },
    ],
  },
]

const swatch: Record<string, string> = {
  White: "bg-white border-border dark:border-white/25",
  Black: "bg-zinc-900 border-border dark:bg-zinc-100 dark:border-white/20",
  Grey: "bg-zinc-400 border-transparent dark:bg-zinc-500",
  Green: "bg-emerald-500 border-transparent",
}

export function SortableNested() {
  const [optionGroups, setOptionGroups] =
    useState<OptionGroup[]>(defaultOptionGroups)

  const handleParentReorder = (next: OptionGroup[]) => {
    setOptionGroups(next)
    toast.success("Variant groups reordered", {
      description: next.map((g) => g.name).join(" · "),
    })
  }

  const handleChildReorder = (groupId: string, newValues: OptionValue[]) => {
    setOptionGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, values: newValues } : group
      )
    )
    toast.success("Values reordered", {
      description: newValues.map((v) => v.value).join(" · "),
    })
  }

  return (
    <div className="mx-auto w-full max-w-sm px-1 py-2 sm:p-4">
      <div className="mb-3 flex items-center gap-2.5 px-0.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
          <LayersIcon className="size-4" />
        </div>
        <div className="min-w-0 text-start">
          <p className="text-sm font-semibold tracking-tight">
            Product variants
          </p>
          <p className="text-xs text-muted-foreground">
            Nested lists · groups and values
          </p>
        </div>
      </div>

      <Sortable
        value={optionGroups}
        onValueChange={handleParentReorder}
        getItemValue={(group) => group.id}
        strategy="vertical"
        className="space-y-3"
      >
        {optionGroups.map((group, groupIndex) => (
          <SortableItem key={group.id} value={group.id}>
            <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card">
              <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-1.5 py-1.5 sm:gap-2 sm:px-2.5 sm:py-2">
                <SortableItemHandle className="cursor-grab! flex size-9 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground">
                  <GripVerticalIcon className="size-4" />
                </SortableItemHandle>
                <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-background font-mono text-[10px] tabular-nums text-muted-foreground">
                  {groupIndex + 1}
                </span>
                <h3 className="min-w-0 flex-1 truncate text-start text-sm font-semibold">
                  {group.name}
                </h3>
                <Badge variant="secondary" className="shrink-0 tabular-nums">
                  {group.values.length}
                </Badge>
              </div>

              <div className="bg-muted/30 p-2 dark:bg-muted/20">
                <Sortable
                  value={group.values}
                  onValueChange={(newValues) =>
                    handleChildReorder(group.id, newValues)
                  }
                  getItemValue={(value) => value.id}
                  strategy="vertical"
                  className="space-y-1.5"
                >
                  {group.values.map((value) => (
                    <SortableItem key={value.id} value={value.id}>
                      <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-1.5 py-1 transition-colors hover:border-border sm:gap-2 sm:px-2 sm:py-1.5">
                        <SortableItemHandle className="cursor-grab! flex size-8 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground">
                          <GripVerticalIcon className="size-3.5" />
                        </SortableItemHandle>
                        {swatch[value.value] ? (
                          <span
                            className={`size-3.5 shrink-0 rounded-full border ${swatch[value.value]}`}
                          />
                        ) : (
                          <span className="size-3.5 shrink-0 rounded-full border border-border bg-muted" />
                        )}
                        <span className="min-w-0 flex-1 truncate text-start text-sm">
                          {value.value}
                        </span>
                      </div>
                    </SortableItem>
                  ))}
                </Sortable>
              </div>
            </div>
          </SortableItem>
        ))}
      </Sortable>
    </div>
  )
}
