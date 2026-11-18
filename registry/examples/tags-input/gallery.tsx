"use client"

import * as React from "react"
import { TagsIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { TagsInput } from "@sonojs/ui/components/tags-input"

export function TagsInputGallery() {
  const [value, setValue] = React.useState<string[]>([
    "design",
    "rtl",
    "sonojs",
  ])

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <TagsIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Post tags
          </h3>
          <p className="text-xs text-muted-foreground">
            Type a tag and press Enter or comma.
          </p>
        </div>
        <Badge variant="secondary" className="ms-auto shrink-0 font-normal">
          {value.length} tags
        </Badge>
      </div>
      <TagsInput
        value={value}
        onValueChange={setValue}
        placeholder="Add a tag…"
      />
    </div>
  )
}
