"use client"

import { TagsInput } from "@sonojs/ui/components/tags-input"

export function TagsInputDefault() {
  return (
    <TagsInput
      className="max-w-md"
      defaultValue={["react", "typescript"]}
      placeholder="Add a tag…"
    />
  )
}
