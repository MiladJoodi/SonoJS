"use client"

import * as React from "react"

import {
  Dropzone,
  type DropzoneFile,
} from "@sonojs/ui/components/dropzone"

export function DropzoneImages() {
  const [files, setFiles] = React.useState<DropzoneFile[]>([])

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-canvas/80 p-4 sm:p-5">
      <Dropzone
        accept="image/*"
        maxSize={8 * 1024 * 1024}
        maxFiles={6}
        multiple
        value={files}
        onValueChange={setFiles}
        label="Drop images here or browse"
        description="Any image type · up to 8 MB · max 6"
      />
    </div>
  )
}
