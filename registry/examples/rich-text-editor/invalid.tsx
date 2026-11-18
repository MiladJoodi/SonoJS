"use client"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { RichTextEditor } from "@sonojs/ui/components/rich-text-editor"

export function RichTextEditorInvalid() {
  return (
    <Field data-invalid className="w-full">
      <FieldLabel htmlFor="rte-invalid">Article body</FieldLabel>
      <RichTextEditor
        id="rte-invalid"
        aria-invalid
        placeholder="Enter your text…"
      />
      <FieldDescription>
        Body must include at least one valid paragraph.
      </FieldDescription>
    </Field>
  )
}
