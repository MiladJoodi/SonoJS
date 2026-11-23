"use client"

import {
  TagsInput,
  type TagsInputOption,
} from "@sonojs/ui/components/tags-input"

const skills: TagsInputOption[] = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "nextjs", label: "Next.js" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "node", label: "Node.js" },
  { value: "postgres", label: "PostgreSQL" },
  { value: "design", label: "Product design" },
  { value: "a11y", label: "Accessibility" },
]

export function TagsInputSuggestions() {
  return (
    <TagsInput
      className="max-w-md"
      options={skills}
      creatable
      defaultValue={["react", "typescript"]}
      placeholder="Add skills…"
      emptyText="No skill match - create a new one."
    />
  )
}
