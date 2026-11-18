"use client"

import { RichTextEditor } from "@sonojs/ui/components/rich-text-editor"

export function RichTextEditorExpandable() {
  return (
    <div className="w-full">
      <RichTextEditor
        variant="advanced"
        toolbarCollapsible
        defaultValue="<p>Advanced tools start <strong>collapsed</strong>. Tap the chevron to expand the second toolbar row.</p>"
        placeholder="Write something…"
      />
    </div>
  )
}
