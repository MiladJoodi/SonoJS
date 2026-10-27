"use client"

import * as React from "react"
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  FileTextIcon,
  FilmIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Progress } from "@sonojs/ui/components/progress"
import { cn } from "@/lib/utils"

type FileStatus = "uploading" | "complete" | "error"

interface FileItem {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: FileStatus
}

const DEMO_FILES: FileItem[] = [
  {
    id: "1",
    name: "hero-banner.png",
    size: 2_400_000,
    type: "image/png",
    progress: 100,
    status: "complete",
  },
  {
    id: "2",
    name: "product-spec.pdf",
    size: 856_000,
    type: "application/pdf",
    progress: 65,
    status: "uploading",
  },
  {
    id: "3",
    name: "promo-video.mp4",
    size: 15_200_000,
    type: "video/mp4",
    progress: 30,
    status: "uploading",
  },
]

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileTypeIcon({ type }: { type: string }) {
  if (type.startsWith("image/")) {
    return <ImageIcon className="size-5 text-primary" aria-hidden />
  }
  if (type.startsWith("video/")) {
    return (
      <FilmIcon
        className="size-5 text-violet-600 dark:text-violet-400"
        aria-hidden
      />
    )
  }
  return (
    <FileTextIcon
      className="size-5 text-muted-foreground"
      aria-hidden
    />
  )
}

function toFileItems(list: File[]): FileItem[] {
  const stamp = Date.now()
  return list.map((f, i) => ({
    id: `${stamp}-${i}`,
    name: f.name,
    size: f.size,
    type: f.type || "application/octet-stream",
    progress: 0,
    status: "uploading" as const,
  }))
}

export default function FileUpload({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [files, setFiles] = React.useState<FileItem[]>(DEMO_FILES)
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = Array.from(e.dataTransfer.files)
    if (dropped.length === 0) return
    setFiles((prev) => [...prev, ...toFileItems(dropped)])
  }, [])

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0)
  const completedCount = files.filter((f) => f.status === "complete").length
  const uploadingCount = files.filter((f) => f.status === "uploading").length

  return (
    <div
      className={cn(
        "w-full bg-canvas py-10 text-foreground sm:py-12",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Upload Files</h1>
          <p className="mt-1 text-muted-foreground">
            Drag and drop files or click to browse
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative rounded-lg border-2 border-dashed p-8 text-center transition-all sm:p-12",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-canvas",
            isDragging
              ? "scale-[0.99] border-primary bg-primary/5"
              : "border-border/70 bg-card shadow-soft hover:border-primary/40 hover:bg-primary/5"
          )}
        >
          <div className="mb-4 inline-flex size-14 items-center justify-center rounded-full bg-primary/10">
            <UploadIcon
              className={cn(
                "size-6 text-primary",
                isDragging && "animate-bounce"
              )}
              aria-hidden
            />
          </div>
          <h2 className="text-base font-semibold">
            {isDragging ? "Drop files here" : "Drag & drop files here"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            or click to browse from your computer
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="outline">PNG, JPG, GIF</Badge>
            <Badge variant="outline">PDF, DOC</Badge>
            <Badge variant="outline">MP4, MOV</Badge>
            <Badge variant="outline">Max 50MB</Badge>
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="absolute inset-0 size-full cursor-pointer opacity-0"
            aria-label="Upload files"
            onChange={(e) => {
              const picked = Array.from(e.target.files ?? [])
              if (picked.length === 0) return
              setFiles((prev) => [...prev, ...toFileItems(picked)])
              e.target.value = ""
            }}
          />
        </div>

        {files.length > 0 ? (
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                {files.length} files · {formatSize(totalSize)}
              </p>
              <p className="text-xs text-muted-foreground">
                {completedCount}/{files.length} complete
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {files.map((file) => (
                <li
                  key={file.id}
                  className="flex items-center gap-3 rounded-lg border border-border/70 bg-card p-3 shadow-soft"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted/60">
                    <FileTypeIcon type={file.type} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium" title={file.name}>
                        {file.name}
                      </p>
                      {file.status === "complete" ? (
                        <CheckCircle2Icon
                          className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                          aria-label="Upload complete"
                        />
                      ) : null}
                      {file.status === "error" ? (
                        <AlertCircleIcon
                          className="size-3.5 shrink-0 text-destructive"
                          aria-label="Upload failed"
                        />
                      ) : null}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground" dir="ltr">
                        {formatSize(file.size)}
                      </span>
                      {file.status === "uploading" ? (
                        <>
                          <span className="text-xs text-muted-foreground" aria-hidden>
                            ·
                          </span>
                          <span className="text-xs font-medium text-primary" dir="ltr">
                            {file.progress}%
                          </span>
                        </>
                      ) : null}
                    </div>
                    {file.status === "uploading" ? (
                      <Progress
                        value={file.progress}
                        className="mt-1.5 h-1.5"
                        aria-label={`${file.name} upload progress`}
                      />
                    ) : null}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => removeFile(file.id)}
                  >
                    <XIcon className="size-4" aria-hidden />
                  </Button>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFiles([])}
              >
                Clear all
              </Button>
              <Button type="button" size="sm" className="gap-2">
                <UploadIcon className="size-4" aria-hidden />
                Upload {uploadingCount} files
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
