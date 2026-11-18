"use client"

import { RichTextEditor } from "@sonojs/ui/components/rich-text-editor"

export function RichTextEditorDisabled() {
  return (
    <div className="w-full">
      <RichTextEditor
        disabled
        defaultValue="<p>This editor is disabled.</p>"
      />
    </div>
  )
}
