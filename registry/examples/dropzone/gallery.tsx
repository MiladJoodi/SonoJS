"use client"

import * as React from "react"
import { ImageIcon, SparklesIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import {
  Dropzone,
  formatBytes,
  type DropzoneFile,
} from "@sonojs/ui/components/dropzone"

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif"
const MAX_BYTES = 8 * 1024 * 1024
const MAX_FILES = 8

export function DropzoneGallery() {
  const [files, setFiles] = React.useState<DropzoneFile[]>([])

  // One shared ticker — every non-done file advances until 100%.
  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setFiles((prev) => {
        if (prev.every((f) => f.status === "done")) return prev
        return prev.map((f) => {
          if (f.status === "done") return f
          const progress = Math.min(100, (f.progress ?? 0) + 20)
          if (progress >= 100) {
            return { ...f, progress: 100, status: "done" }
          }
          return { ...f, progress, status: "uploading" }
        })
      })
    }, 200)
    return () => window.clearInterval(timer)
  }, [])

  const done = files.filter((f) => f.status === "done").length
  const totalSize = files.reduce((sum, f) => sum + f.file.size, 0)

  return (
    <div className="w-full max-w-lg rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ImageIcon className="size-4" aria-hidden />
            </span>
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                Product gallery
              </h3>
              <p className="text-xs text-muted-foreground">
                Drag shots in — previews and progress included.
              </p>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="gap-1 font-normal">
          <SparklesIcon className="size-3" aria-hidden />
          Demo upload
        </Badge>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {["PNG", "JPG", "WebP", "GIF"].map((ext) => (
          <Badge
            key={ext}
            variant="outline"
            className="rounded-md px-2 py-0.5 font-mono text-[11px] font-normal"
          >
            {ext}
          </Badge>
        ))}
        <span className="self-center text-[11px] text-muted-foreground">
          · up to {formatBytes(MAX_BYTES)} · max {MAX_FILES}
        </span>
      </div>

      <Dropzone
        accept={ACCEPT}
        maxSize={MAX_BYTES}
        maxFiles={MAX_FILES}
        multiple
        value={files}
        onValueChange={setFiles}
        label="Drop product images here"
        description="or click to browse from your device"
      />

      {files.length > 0 ? (
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
          <span className="tabular-nums">
            {done}/{files.length} ready
          </span>
          <span className="tabular-nums">{formatBytes(totalSize)}</span>
        </div>
      ) : null}
    </div>
  )
}
