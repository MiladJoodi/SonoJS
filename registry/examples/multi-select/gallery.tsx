"use client"

import * as React from "react"
import { TagsIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import {
  MultiSelect,
  type MultiSelectOption,
} from "@sonojs/ui/components/multi-select"

const skills: MultiSelectOption[] = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "nextjs", label: "Next.js" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "node", label: "Node.js" },
  { value: "postgres", label: "PostgreSQL" },
  { value: "design", label: "Product design" },
  { value: "a11y", label: "Accessibility" },
]

export function MultiSelectGallery() {
  const [value, setValue] = React.useState<string[]>([
    "react",
    "typescript",
    "tailwind",
  ])

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <TagsIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Skills
          </h3>
          <p className="text-xs text-muted-foreground">
            Pick the tags that show on your profile.
          </p>
        </div>
        <Badge variant="secondary" className="ms-auto shrink-0 font-normal">
          {value.length} selected
        </Badge>
      </div>
      <MultiSelect
        options={skills}
        value={value}
        onValueChange={setValue}
        placeholder="Add skills…"
        searchPlaceholder="Filter skills…"
      />
    </div>
  )
}
