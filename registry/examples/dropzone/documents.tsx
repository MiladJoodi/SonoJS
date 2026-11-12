"use client"

import * as React from "react"
import { FileTextIcon } from "lucide-react"

import {
  Dropzone,
  type DropzoneFile,
  type DropzoneRejection,
} from "@sonojs/ui/components/dropzone"

export function DropzoneDocuments() {
  const [files, setFiles] = React.useState<DropzoneFile[]>([])
  const [hint, setHint] = React.useState<string | null>(null)

  function onReject(rejections: DropzoneRejection[]) {
    const first = rejections[0]
    if (!first) return
    const reason = first.errors.includes("file-too-large")
      ? "File is too large (max 12 MB)."
      : first.errors.includes("file-invalid-type")
        ? "Only PDF or Word docs are allowed."
        : "Too many files for this slot."
    setHint(reason)
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-md border border-border/70 bg-muted/40 text-muted-foreground">
          <FileTextIcon className="size-4" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-medium text-foreground">Contracts</p>
          <p className="text-xs text-muted-foreground">
            Attach supporting documents for review.
          </p>
        </div>
      </div>

      <Dropzone
        accept="application/pdf,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        maxSize={12 * 1024 * 1024}
        maxFiles={4}
        multiple
        value={files}
        onValueChange={(next) => {
          setHint(null)
          setFiles(next)
        }}
        onReject={onReject}
        label="Drop documents here or browse"
        description="PDF, DOC, DOCX · up to 12 MB · max 4"
      />

      {hint ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
