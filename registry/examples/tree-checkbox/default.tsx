"use client"

import {
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

export function TreeCheckboxDefault() {
  return (
    <div className="w-full max-w-sm rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <TreeCheckbox
        data={data}
        defaultExpanded={["fruits", "vegetables"]}
        defaultValue={["apple"]}
      />
    </div>
  )
}
