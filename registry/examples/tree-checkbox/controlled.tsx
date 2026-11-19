"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  collectAllIds,
  TreeCheckbox,
  type TreeCheckboxNode,
} from "@sonojs/ui/components/tree-checkbox"

const data: TreeCheckboxNode[] = [
  {
    id: "fruits",
    label: "Fruits",
    children: [
      { id: "apple", label: "Apple" },
      { id: "banana", label: "Banana" },
      { id: "orange", label: "Orange" },
    ],
  },
  {
    id: "vegetables",
    label: "Vegetables",
    children: [
      { id: "carrot", label: "Carrot" },
      { id: "lettuce", label: "Lettuce" },
    ],
  },
]

export function TreeCheckboxControlled() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <TreeCheckbox
        data={data}
        value={value}
        onValueChange={setValue}
        defaultExpanded={["fruits", "vegetables"]}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setValue(collectAllIds(data))}
        >
          Select all
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setValue([])}
        >
          Clear
        </Button>
        <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
          {value.length ? value.join(", ") : "None selected"}
        </p>
      </div>
    </div>
  )
}
