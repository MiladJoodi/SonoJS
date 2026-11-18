"use client"

import {
  TagsInput,
  type TagsInputOption,
} from "@sonojs/ui/components/tags-input"

const people: TagsInputOption[] = [
  {
    value: "sara",
    label: "Sara Chen",
    description: "@sara",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Sara",
  },
  {
    value: "omar",
    label: "Omar Haddad",
    description: "@omar",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Omar",
  },
  {
    value: "lena",
    label: "Lena Rossi",
    description: "@lena",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Lena",
  },
  {
    value: "noah",
    label: "Noah Park",
    description: "@noah",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Noah",
  },
]

export function TagsInputMention() {
  return (
    <TagsInput
      className="max-w-md"
      mode="mention"
      options={people}
      defaultValue={["sara"]}
      placeholder="Mention a teammate…"
      emptyText="No people found."
    />
  )
}
