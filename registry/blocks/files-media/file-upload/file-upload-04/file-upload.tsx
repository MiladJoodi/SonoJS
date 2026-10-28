"use client"

import * as React from "react"
import {
  AlertCircleIcon,
  FileTextIcon,
  ImageIcon,
  RefreshCwIcon,
  UploadIcon,
  XIcon,
} from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@sonojs/ui/components/attachment"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@sonojs/ui/components/dialog"
import { Progress } from "@sonojs/ui/components/progress"
import { cn } from "@/lib/utils"

type RowStatus = "uploading" | "done" | "error"

interface QueueItem {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: RowStatus
}

const SEED: QueueItem[] = [
  {
    id: "1",
    name: "brand-guidelines.pdf",
    size: 1_240_000,
    type: "application/pdf",
    progress: 100,
    status: "done",
  },
  {
    id: "2",
    name: "hero-shot.jpg",
    size: 890_000,
    type: "image/jpeg",
    progress: 48,
    status: "uploading",
  },
  {
    id: "3",
    name: "invoice-scan.pdf",
    size: 620_000,
    type: "application/pdf",
    progress: 0,
    status: "error",
  },
]

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function attachmentState(
  status: RowStatus
): "uploading" | "done" | "error" {
  if (status === "uploading") return "uploading"
  if (status === "error") return "error"
  return "done"
}

export default function FileUpload({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)
  const [items, setItems] = React.useState<QueueItem[]>(SEED)
  const [isDragging, setIsDragging] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const timersRef = React.useRef<number[]>([])

  React.useEffect(() => {
    return () => {
      for (const t of timersRef.current) window.clearInterval(t)
    }
  }, [])

  const addFiles = (list: File[]) => {
    if (list.length === 0) return
    const stamp = Date.now()
    setItems((prev) => [
      ...prev,
      ...list.map((f, i) => ({
        id: `${stamp}-${i}`,
        name: f.name,
        size: f.size,
        type: f.type || "application/octet-stream",
        progress: 0,
        status: "uploading" as const,
      })),
    ])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const retryItem = (id: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "uploading", progress: 0 } : i
      )
    )
  }

  const runUpload = () => {
    const pending = items.filter((i) => i.status !== "done")
    if (pending.length === 0) return
    setIsUploading(true)
    setItems((prev) =>
      prev.map((i) =>
        i.status === "done" ? i : { ...i, status: "uploading", progress: 0 }
      )
    )
    const timer = window.setInterval(() => {
      setItems((prev) => {
        let any = false
        const next = prev.map((i) => {
          if (i.status !== "uploading") return i
          // Keep the seeded error file failing once unless retried mid-run
          if (i.id === "3" && i.progress < 40) {
            any = true
            const progress = i.progress + 20
            if (progress >= 40) {
              return { ...i, progress: 0, status: "error" as const }
            }
            return { ...i, progress }
          }
          const progress = Math.min(100, i.progress + 18 + Math.random() * 15)
          if (progress >= 100) {
            return { ...i, progress: 100, status: "done" as const }
          }
          any = true
          return { ...i, progress: Math.round(progress) }
        })
        if (!any) {
          window.clearInterval(timer)
          timersRef.current = timersRef.current.filter((t) => t !== timer)
          setIsUploading(false)
        }
        return next
      })
    }, 380)
    timersRef.current.push(timer)
  }

  const pendingCount = items.filter((i) => i.status !== "done").length

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md overflow-hidden rounded-[12px] border border-border/70 bg-card p-6 text-start shadow-soft sm:p-8">
        <h1 className="text-lg font-semibold tracking-tight">Project files</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Attach briefs, scans, and images from a modal uploader with retry.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{items.length} in queue</Badge>
          <Badge variant="outline">
            {items.filter((i) => i.status === "done").length} done
          </Badge>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" className="mt-6 cursor-pointer gap-2">
              <UploadIcon className="size-4" aria-hidden />
              Upload files
            </Button>
          </DialogTrigger>
          <DialogContent className="gap-0 p-0 sm:max-w-lg">
            <DialogHeader className="border-b border-border/70 px-5 py-4 text-start sm:px-6">
              <DialogTitle>Upload to project</DialogTitle>
              <DialogDescription>
                Drop files below. Failed items can be retried without clearing
                the queue.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 px-5 py-4 sm:px-6">
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  setIsDragging(false)
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  setIsDragging(false)
                  addFiles(Array.from(e.dataTransfer.files))
                }}
                className={cn(
                  "relative rounded-[12px] border-2 border-dashed px-4 py-8 text-center transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "cursor-pointer border-border/70 hover:border-primary/40"
                )}
              >
                <UploadIcon
                  className="mx-auto mb-2 size-6 text-primary"
                  aria-hidden
                />
                <p className="text-sm font-medium">
                  {isDragging ? "Drop to add" : "Drag & drop or browse"}
                </p>
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                  aria-label="Add files"
                  onChange={(e) => {
                    addFiles(Array.from(e.target.files ?? []))
                    e.target.value = ""
                  }}
                />
              </div>

              {items.length > 0 ? (
                <ul className="flex max-h-64 flex-col gap-2 overflow-y-auto">
                  {items.map((item) => (
                    <li key={item.id}>
                      <Attachment
                        state={attachmentState(item.status)}
                        className="w-full max-w-none border-border/70 shadow-none"
                      >
                        <AttachmentMedia>
                          {item.type.startsWith("image/") ? (
                            <ImageIcon aria-hidden />
                          ) : item.status === "error" ? (
                            <AlertCircleIcon aria-hidden />
                          ) : (
                            <FileTextIcon aria-hidden />
                          )}
                        </AttachmentMedia>
                        <AttachmentContent>
                          <AttachmentTitle>{item.name}</AttachmentTitle>
                          <AttachmentDescription>
                            <span dir="ltr">{formatSize(item.size)}</span>
                            {item.status === "uploading"
                              ? ` · ${item.progress}%`
                              : null}
                            {item.status === "error" ? " · Failed" : null}
                            {item.status === "done" ? " · Complete" : null}
                          </AttachmentDescription>
                          {item.status === "uploading" ? (
                            <Progress
                              value={item.progress}
                              className="mt-1.5 h-1"
                            />
                          ) : null}
                        </AttachmentContent>
                        <AttachmentActions>
                          {item.status === "error" ? (
                            <AttachmentAction
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1 px-2"
                              onClick={() => retryItem(item.id)}
                            >
                              <RefreshCwIcon className="size-3.5" aria-hidden />
                              Retry
                            </AttachmentAction>
                          ) : null}
                          <AttachmentAction
                            type="button"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeItem(item.id)}
                          >
                            <XIcon className="size-4" aria-hidden />
                          </AttachmentAction>
                        </AttachmentActions>
                      </Attachment>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  No files yet.
                </p>
              )}
            </div>

            <DialogFooter className="border-t border-border/70 px-5 py-4 sm:px-6">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="cursor-pointer gap-2 disabled:cursor-not-allowed"
                disabled={pendingCount === 0 || isUploading}
                onClick={runUpload}
              >
                <UploadIcon className="size-4" aria-hidden />
                {isUploading
                  ? "Uploading…"
                  : `Upload ${pendingCount || ""}`.trim()}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
