"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  MultiSelect,
  type MultiSelectOption,
} from "@sonojs/ui/components/multi-select"

const fruits: MultiSelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
]

export function MultiSelectControlled() {
  const [value, setValue] = React.useState<string[]>(["apple", "blueberry"])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <MultiSelect
        options={fruits}
        value={value}
        onValueChange={setValue}
        placeholder="Select fruit…"
      />
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          {value.length === 0
            ? "Nothing selected"
            : `${value.length} selected`}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={value.length === 0}
          onClick={() => setValue([])}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
