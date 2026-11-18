"use client"

import { RichTextEditor } from "@sonojs/ui/components/rich-text-editor"

export function RichTextEditorAdvanced() {
  return (
    <div className="w-full">
      <RichTextEditor
        variant="advanced"
        defaultValue="<p><strong>Advanced</strong> shows both toolbar rows — colors, alignment, tables, tasks, fonts, and more.</p>"
        placeholder="Write something…"
      />
    </div>
  )
}
