"use client"

import * as React from "react"
import {
  ImagePlusIcon,
  StarIcon,
  UploadIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Progress } from "@sonojs/ui/components/progress"
import { cn } from "@/lib/utils"

type ImageStatus = "queued" | "uploading" | "done"

interface ImageItem {
  id: string
  name: string
  size: number
  previewUrl: string
  progress: number
  status: ImageStatus
  isCover: boolean
}

const MAX_IMAGES = 9
const MAX_BYTES = 10 * 1024 * 1024
const ACCEPT = "image/png,image/jpeg,image/webp,image/gif"

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function revokeAll(items: ImageItem[]) {
  for (const item of items) {
    if (item.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(item.previewUrl)
    }
  }
}

export default function FileUpload({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [images, setImages] = React.useState<ImageItem[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const timersRef = React.useRef<number[]>([])

  React.useEffect(() => {
    return () => {
      for (const t of timersRef.current) window.clearInterval(t)
      revokeAll(images)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cleanup on unmount only
  }, [])

  const addFiles = React.useCallback((list: File[]) => {
    const imagesOnly = list.filter(
      (f) => f.type.startsWith("image/") && f.size <= MAX_BYTES
    )
    if (imagesOnly.length === 0) return
    setImages((prev) => {
      const room = MAX_IMAGES - prev.length
      if (room <= 0) return prev
      const slice = imagesOnly.slice(0, room)
      const stamp = Date.now()
      const next = slice.map((f, i) => ({
        id: `${stamp}-${i}`,
        name: f.name,
        size: f.size,
        previewUrl: URL.createObjectURL(f),
        progress: 0,
        status: "queued" as const,
        isCover: prev.length === 0 && i === 0,
      }))
      return [...prev, ...next]
    })
  }, [])

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id)
      if (target?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(target.previewUrl)
      }
      const next = prev.filter((i) => i.id !== id)
      if (next.length > 0 && !next.some((i) => i.isCover)) {
        next[0] = { ...next[0]!, isCover: true }
      }
      return next
    })
  }

  const setCover = (id: string) => {
    setImages((prev) =>
      prev.map((i) => ({ ...i, isCover: i.id === id }))
    )
  }

  const startUpload = () => {
    const pending = images.filter((i) => i.status !== "done")
    if (pending.length === 0) return
    setIsUploading(true)
    setImages((prev) =>
      prev.map((i) =>
        i.status === "done" ? i : { ...i, status: "uploading", progress: 0 }
      )
    )
    const timer = window.setInterval(() => {
      setImages((prev) => {
        let any = false
        const next = prev.map((i) => {
          if (i.status !== "uploading") return i
          const progress = Math.min(100, i.progress + 15 + Math.random() * 20)
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
    }, 350)
    timersRef.current.push(timer)
  }

  const doneCount = images.filter((i) => i.status === "done").length

  return (
    <div
      className={cn(
        "w-full bg-white py-10 text-foreground dark:bg-background sm:py-12",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-start">
            <h1 className="text-2xl font-semibold tracking-tight">
              Product photos
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload up to {MAX_IMAGES} images. Mark one as cover.
            </p>
          </div>
          <Badge variant="secondary">
            {images.length}/{MAX_IMAGES} · {doneCount} uploaded
          </Badge>
        </div>

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
            "relative mb-6 rounded-[12px] border-2 border-dashed px-6 py-10 text-center transition-all",
            isDragging
              ? "border-primary bg-primary/5"
              : "cursor-pointer border-border/70 bg-card shadow-soft hover:border-primary/40"
          )}
        >
          <ImagePlusIcon
            className="mx-auto mb-3 size-8 text-primary"
            aria-hidden
          />
          <p className="text-sm font-semibold">
            {isDragging ? "Drop images here" : "Drop product images"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PNG, JPG, WEBP, GIF · max 10MB each
          </p>
          <input
            type="file"
            accept={ACCEPT}
            multiple
            className="absolute inset-0 size-full cursor-pointer opacity-0"
            aria-label="Upload images"
            onChange={(e) => {
              addFiles(Array.from(e.target.files ?? []))
              e.target.value = ""
            }}
          />
        </div>

        {images.length > 0 ? (
          <>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.map((img) => (
                <li
                  key={img.id}
                  className="group relative overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
                >
                  <div className="relative aspect-square bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.previewUrl}
                      alt={img.name}
                      className="size-full object-cover"
                    />
                    {img.isCover ? (
                      <Badge className="absolute start-2 top-2 gap-1">
                        <StarIcon className="size-3 fill-current" aria-hidden />
                        Cover
                      </Badge>
                    ) : null}
                    <div className="absolute end-2 top-2 flex gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                      {!img.isCover ? (
                        <Button
                          type="button"
                          size="icon-xs"
                          variant="secondary"
                          className="cursor-pointer"
                          aria-label={`Set ${img.name} as cover`}
                          onClick={() => setCover(img.id)}
                        >
                          <StarIcon className="size-3.5" aria-hidden />
                        </Button>
                      ) : null}
                      <Button
                        type="button"
                        size="icon-xs"
                        variant="secondary"
                        className="cursor-pointer"
                        aria-label={`Remove ${img.name}`}
                        onClick={() => removeImage(img.id)}
                      >
                        <XIcon className="size-3.5" aria-hidden />
                      </Button>
                    </div>
                    {img.status === "uploading" ? (
                      <div className="absolute inset-x-0 bottom-0 bg-background/80 px-2 py-2 backdrop-blur-sm">
                        <Progress value={img.progress} className="h-1.5" />
                      </div>
                    ) : null}
                    {img.status === "done" ? (
                      <Badge
                        variant="secondary"
                        className="absolute end-2 bottom-2"
                      >
                        Done
                      </Badge>
                    ) : null}
                  </div>
                  <div className="border-t border-border/70 px-2.5 py-2 text-start">
                    <p className="truncate text-xs font-medium" title={img.name}>
                      {img.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground" dir="ltr">
                      {formatSize(img.size)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  revokeAll(images)
                  setImages([])
                }}
              >
                Clear
              </Button>
              <Button
                type="button"
                className="cursor-pointer gap-2 disabled:cursor-not-allowed"
                disabled={
                  isUploading || images.every((i) => i.status === "done")
                }
                onClick={startUpload}
              >
                <UploadIcon className="size-4" aria-hidden />
                {isUploading ? "Uploading…" : "Upload images"}
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
