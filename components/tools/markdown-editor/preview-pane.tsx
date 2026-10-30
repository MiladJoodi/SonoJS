"use client"

import * as React from "react"

import { markdownToHtml } from "./lib/markdown-html"
import { cn } from "@/lib/utils"

export function PreviewPane({
  markdown,
  className,
}: {
  markdown: string
  className?: string
}) {
  const html = React.useMemo(() => markdownToHtml(markdown), [markdown])

  return (
    <div
      className={cn(
        "markdown-preview-pane scrollbar-soft bg-card h-full min-h-0 overflow-y-auto rounded-none border-0",
        className
      )}
      dir="ltr"
    >
      <article
        className="markdown-preview-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
