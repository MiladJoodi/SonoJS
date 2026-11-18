"use client"

import * as React from "react"

import { RichTextEditor } from "@sonojs/ui/components/rich-text-editor"

export function RichTextEditorControlled() {
  const [html, setHtml] = React.useState("<p>Controlled content from the parent.</p>")

  return (
    <div className="flex w-full flex-col gap-4">
      <RichTextEditor
        value={html}
        onChange={({ html: next }) => setHtml(next)}
        placeholder="Edit me…"
      />
      <div className="rounded-md border border-border bg-muted/40 p-3 text-xs">
        <p className="mb-1 font-medium text-muted-foreground">HTML output</p>
        <pre dir="ltr" className="max-h-32 overflow-auto whitespace-pre-wrap">
          {html}
        </pre>
      </div>
    </div>
  )
}
