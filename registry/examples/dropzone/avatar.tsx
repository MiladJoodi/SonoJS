"use client"

import * as React from "react"
import { CameraIcon } from "lucide-react"

import {
  Dropzone,
  type DropzoneFile,
} from "@sonojs/ui/components/dropzone"

export function DropzoneAvatar() {
  const [files, setFiles] = React.useState<DropzoneFile[]>([])
  const preview = files[0]?.previewUrl

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="relative">
        <div className="size-28 overflow-hidden rounded-full border border-border/70 bg-muted/40 shadow-soft">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element -- blob preview
            <img
              src={preview}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <CameraIcon className="size-8 opacity-60" aria-hidden />
            </div>
          )}
        </div>
      </div>

      <div className="w-full space-y-1.5 text-center">
        <p className="text-sm font-medium text-foreground">Profile photo</p>
        <p className="text-xs text-muted-foreground">
          Square image works best. Max 2 MB.
        </p>
      </div>

      <Dropzone
        className="w-full"
        accept="image/png,image/jpeg,image/webp"
        maxSize={2 * 1024 * 1024}
        maxFiles={1}
        multiple={false}
        value={files}
        onValueChange={setFiles}
        label="Drop a photo or browse"
        description="PNG, JPG, WebP"
      />
    </div>
  )
}
