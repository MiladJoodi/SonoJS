"use client"

import {
  TagsInput,
  type TagsInputOption,
} from "@sonojs/ui/components/tags-input"

const options: TagsInputOption[] = [
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed", disabled: true },
  { value: "archived", label: "Archived" },
]

export function TagsInputDisabled() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <TagsInput
        disabled
        defaultValue={["locked"]}
        placeholder="Disabled…"
      />
      <TagsInput
        options={options}
        creatable={false}
        defaultValue={["open"]}
        placeholder="Pick a status…"
      />
    </div>
  )
}
