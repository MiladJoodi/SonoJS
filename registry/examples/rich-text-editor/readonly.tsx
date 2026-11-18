"use client"

import { RichTextEditor } from "@sonojs/ui/components/rich-text-editor"

export function RichTextEditorReadonly() {
  return (
    <div className="w-full">
      <RichTextEditor
        readOnly
        defaultValue="<p>Read-only — content cannot be edited.</p>"
      />
    </div>
  )
}
