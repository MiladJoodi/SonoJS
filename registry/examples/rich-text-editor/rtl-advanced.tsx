"use client"

import { RichTextEditor } from "@sonojs/ui/components/rich-text-editor"

export function RichTextEditorRtlAdvanced() {
  return (
    <div className="w-full">
      <RichTextEditor
        dir="rtl"
        lang="fa"
        variant="advanced"
        placeholder="متن خود را بنویسید…"
        defaultValue="<p>حالت <strong>پیشرفته</strong> با تراز، رنگ، جدول و فهرست کارها — کامل راست‌چین.</p>"
      />
    </div>
  )
}
