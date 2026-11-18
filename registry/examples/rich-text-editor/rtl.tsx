"use client"

import { RichTextEditor } from "@sonojs/ui/components/rich-text-editor"

export function RichTextEditorRtl() {
  return (
    <div className="w-full">
      <RichTextEditor
        dir="rtl"
        lang="fa"
        placeholder="متن خود را بنویسید…"
        defaultValue="<p>سلام! این ویرایشگر از <strong>راست به چپ</strong> پشتیبانی می‌کند.</p><p>محتوای ترکیبی: React + تایپ‌اسکریپت.</p>"
      />
    </div>
  )
}
