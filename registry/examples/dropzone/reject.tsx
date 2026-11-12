"use client"

import * as React from "react"
import { AlertCircleIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import {
  Dropzone,
  type DropzoneFile,
  type DropzoneRejection,
} from "@sonojs/ui/components/dropzone"

export function DropzoneReject() {
  const [files, setFiles] = React.useState<DropzoneFile[]>([])
  const [message, setMessage] = React.useState<string | null>(null)

  function onReject(rejections: DropzoneRejection[]) {
    const codes = new Set(rejections.flatMap((r) => r.errors))
    if (codes.has("too-many-files")) {
      setMessage("You can only add 2 files here.")
      return
    }
    if (codes.has("file-too-large")) {
      setMessage("One or more files exceed 1 MB.")
      return
    }
    if (codes.has("file-invalid-type")) {
      setMessage("Only PNG or JPG images are accepted.")
      return
    }
    setMessage("Some files were rejected.")
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <Dropzone
        accept="image/png,image/jpeg"
        maxSize={1024 * 1024}
        maxFiles={2}
        multiple
        value={files}
        onValueChange={(next) => {
          setMessage(null)
          setFiles(next)
        }}
        onReject={onReject}
        label="Try dropping a large PDF"
        description="PNG/JPG only · max 1 MB · 2 files"
      />

      {message ? (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Couldn’t add file</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}
    </div>
  )
}
