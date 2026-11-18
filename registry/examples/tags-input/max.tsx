"use client"

import { TagsInput } from "@sonojs/ui/components/tags-input"

export function TagsInputMax() {
  return (
    <TagsInput
      className="max-w-md"
      max={5}
      defaultValue={["one", "two", "three"]}
      placeholder="Up to 5 tags…"
    />
  )
}
