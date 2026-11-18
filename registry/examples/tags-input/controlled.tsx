"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { TagsInput } from "@sonojs/ui/components/tags-input"

export function TagsInputControlled() {
  const [value, setValue] = React.useState<string[]>(["beta", "feedback"])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <TagsInput
        value={value}
        onValueChange={setValue}
        placeholder="Add a tag…"
      />
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          {value.length === 0 ? "No tags" : `${value.length} tags`}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={value.length === 0}
          onClick={() => setValue([])}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
