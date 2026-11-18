"use client"

import { RichTextEditor } from "@sonojs/ui/components/rich-text-editor"

export function RichTextEditorDefault() {
  return (
    <div className="w-full">
      <RichTextEditor
        variant="simple"
        defaultValue="<p>Hello! This is a <strong>rich text</strong> editor.</p><p>Try headings, lists, links, and quotes.</p>"
        placeholder="Write something…"
      />
    </div>
  )
}
