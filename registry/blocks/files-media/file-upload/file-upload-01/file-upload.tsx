"use client"

import * as React from "react"
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  FileTextIcon,
  FilmIcon,
  ImageIcon,
  RefreshCwIcon,
  UploadIcon,
  XIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
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

const MAX_BYTES = 50 * 1024 * 1024
const ACCEPT =
  "image/png,image/jpeg,image/gif,application/pdf,.doc,.docx,video/mp4,video/quicktime"

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
  {
    id: "4",
    name: "corrupted-asset.zip",
    size: 4_100_000,
    type: "application/zip",
    progress: 0,
    status: "error",
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
  return <FileTextIcon className="size-5 text-muted-foreground" aria-hidden />
}

function isAccepted(file: File): boolean {
  if (file.size > MAX_BYTES) return false
  const name = file.name.toLowerCase()
  if (file.type.startsWith("image/")) return true
  if (file.type.startsWith("video/")) return true
  if (file.type === "application/pdf") return true
  if (name.endsWith(".doc") || name.endsWith(".docx")) return true
  if (file.type === "video/mp4" || file.type === "video/quicktime") return true
  return false
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
  const [rejectMsg, setRejectMsg] = React.useState<string | null>(null)
  const [isUploading, setIsUploading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const timersRef = React.useRef<number[]>([])

  React.useEffect(() => {
    return () => {
      for (const t of timersRef.current) window.clearInterval(t)
    }
  }, [])

  const ingest = React.useCallback((list: File[]) => {
    if (list.length === 0) return
    const accepted: File[] = []
    const rejected: string[] = []
    for (const f of list) {
      if (f.size > MAX_BYTES) {
        rejected.push(`${f.name} (over 50MB)`)
      } else if (!isAccepted(f)) {
        rejected.push(`${f.name} (type not allowed)`)
      } else {
        accepted.push(f)
      }
    }
    if (rejected.length > 0) {
      setRejectMsg(
        `Skipped ${rejected.length}: ${rejected.slice(0, 2).join(", ")}${
          rejected.length > 2 ? "…" : ""
        }`
      )
    } else {
      setRejectMsg(null)
    }
    if (accepted.length > 0) {
      setFiles((prev) => [...prev, ...toFileItems(accepted)])
    }
  }, [])

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      ingest(Array.from(e.dataTransfer.files))
    },
    [ingest]
  )

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const retryFile = (id: string) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "uploading", progress: 0 } : f
      )
    )
  }

  const startMockUpload = () => {
    const pending = files.filter(
      (f) => f.status === "uploading" || f.status === "error"
    )
    if (pending.length === 0) return
    setIsUploading(true)
    setFiles((prev) =>
      prev.map((f) =>
        f.status === "error" ? { ...f, status: "uploading", progress: 0 } : f
      )
    )
    const id = window.setInterval(() => {
      setFiles((prev) => {
        let anyUploading = false
        const next = prev.map((f) => {
          if (f.status !== "uploading") return f
          const progress = Math.min(100, f.progress + 12 + Math.random() * 18)
          if (progress >= 100) {
            return { ...f, progress: 100, status: "complete" as const }
          }
          anyUploading = true
          return { ...f, progress: Math.round(progress) }
        })
        if (!anyUploading) {
          window.clearInterval(id)
          timersRef.current = timersRef.current.filter((t) => t !== id)
          setIsUploading(false)
        }
        return next
      })
    }, 400)
    timersRef.current.push(id)
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0)
  const completedCount = files.filter((f) => f.status === "complete").length
  const uploadingCount = files.filter(
    (f) => f.status === "uploading" || f.status === "error"
  ).length

  return (
    <div
      className={cn(
        "w-full bg-white py-10 text-foreground dark:bg-background sm:py-12",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <div className="mb-8 text-start">
          <h1 className="text-2xl font-semibold tracking-tight">Upload files</h1>
          <p className="mt-1 text-muted-foreground">
            Drag and drop files or click to browse — validated types and size.
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative rounded-[12px] border-2 border-dashed p-8 text-center transition-all sm:p-12",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
            isDragging
              ? "scale-[0.99] border-primary bg-primary/5"
              : "cursor-pointer border-border/70 bg-card shadow-soft hover:border-primary/40 hover:bg-primary/5"
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
            accept={ACCEPT}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
            aria-label="Upload files"
            onChange={(e) => {
              ingest(Array.from(e.target.files ?? []))
              e.target.value = ""
            }}
          />
        </div>

        {rejectMsg ? (
          <Alert variant="destructive" className="mt-4">
            <AlertCircleIcon aria-hidden />
            <AlertTitle>Some files were skipped</AlertTitle>
            <AlertDescription>{rejectMsg}</AlertDescription>
          </Alert>
        ) : null}

        {files.length > 0 ? (
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                {files.length} files ·{" "}
                <span dir="ltr">{formatSize(totalSize)}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {completedCount}/{files.length} complete
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {files.map((file) => (
                <li
                  key={file.id}
                  className="flex items-center gap-3 rounded-[12px] border border-border/70 bg-card p-3 shadow-soft"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted/60">
                    <FileTypeIcon type={file.type} />
                  </div>

                  <div className="min-w-0 flex-1 text-start">
                    <div className="flex items-center gap-2">
                      <p
                        className="truncate text-sm font-medium"
                        title={file.name}
                      >
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
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground" dir="ltr">
                        {formatSize(file.size)}
                      </span>
                      {file.status === "uploading" ? (
                        <>
                          <span
                            className="text-xs text-muted-foreground"
                            aria-hidden
                          >
                            ·
                          </span>
                          <span
                            className="text-xs font-medium text-primary"
                            dir="ltr"
                          >
                            {file.progress}%
                          </span>
                        </>
                      ) : null}
                      {file.status === "error" ? (
                        <span className="text-xs font-medium text-destructive">
                          Upload failed
                        </span>
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

                  {file.status === "error" ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="cursor-pointer gap-1.5"
                      onClick={() => retryFile(file.id)}
                    >
                      <RefreshCwIcon className="size-3.5" aria-hidden />
                      Retry
                    </Button>
                  ) : null}

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="shrink-0 cursor-pointer text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
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
                className="cursor-pointer"
                onClick={() => {
                  setFiles([])
                  setRejectMsg(null)
                }}
              >
                Clear all
              </Button>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer gap-2 disabled:cursor-not-allowed"
                disabled={uploadingCount === 0 || isUploading}
                onClick={startMockUpload}
              >
                <UploadIcon className="size-4" aria-hidden />
                {isUploading
                  ? "Uploading…"
                  : `Upload ${uploadingCount} file${uploadingCount === 1 ? "" : "s"}`}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
