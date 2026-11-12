"use client"

import * as React from "react"
import {
  FileIcon,
  FileTextIcon,
  FilmIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Progress } from "@sonojs/ui/components/progress"
import { cn } from "@sonojs/ui/lib/utils"

export type DropzoneFileStatus = "idle" | "uploading" | "error" | "done"

export type DropzoneFile = {
  id: string
  file: File
  previewUrl?: string
  progress?: number
  status?: DropzoneFileStatus
  error?: string
}

export type DropzoneRejectionCode =
  | "file-invalid-type"
  | "file-too-large"
  | "too-many-files"

export type DropzoneRejection = {
  file: File
  errors: DropzoneRejectionCode[]
}

export type DropzoneProps = Omit<
  React.ComponentProps<"div">,
  "onChange" | "defaultValue" | "children"
> & {
  value?: DropzoneFile[]
  defaultValue?: DropzoneFile[]
  onValueChange?: (files: DropzoneFile[]) => void
  onReject?: (rejections: DropzoneRejection[]) => void
  /** HTML `accept` string, e.g. `image/png,image/jpeg,.pdf` */
  accept?: string
  /** Max bytes per file. */
  maxSize?: number
  /** Max files in the control (after add). */
  maxFiles?: number
  multiple?: boolean
  disabled?: boolean
  /** Hint under the main label. */
  description?: string
  /** Main label inside the zone. */
  label?: string
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B"
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function isImageFile(file: File) {
  return file.type.startsWith("image/")
}

function matchesAccept(file: File, accept: string | undefined): boolean {
  if (!accept?.trim()) return true
  const tokens = accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
  if (tokens.length === 0) return true

  const name = file.name.toLowerCase()
  const type = (file.type || "").toLowerCase()

  return tokens.some((token) => {
    if (token.startsWith(".")) {
      return name.endsWith(token)
    }
    if (token.endsWith("/*")) {
      const prefix = token.slice(0, -1)
      return type.startsWith(prefix)
    }
    return type === token
  })
}

function FileTypeIcon({ file }: { file: File }) {
  if (file.type.startsWith("image/")) {
    return <ImageIcon className="size-5 text-primary" aria-hidden />
  }
  if (file.type.startsWith("video/")) {
    return <FilmIcon className="size-5 text-primary" aria-hidden />
  }
  if (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  ) {
    return <FileTextIcon className="size-5 text-muted-foreground" aria-hidden />
  }
  return <FileIcon className="size-5 text-muted-foreground" aria-hidden />
}

function toDropzoneFiles(list: File[]): DropzoneFile[] {
  return list.map((file) => {
    const item: DropzoneFile = {
      id: createId(),
      file,
      status: "idle",
      progress: 0,
    }
    if (isImageFile(file)) {
      item.previewUrl = URL.createObjectURL(file)
    }
    return item
  })
}

function revokePreviews(files: DropzoneFile[]) {
  for (const item of files) {
    if (item.previewUrl) URL.revokeObjectURL(item.previewUrl)
  }
}

function Dropzone({
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  onReject,
  accept,
  maxSize,
  maxFiles = Number.POSITIVE_INFINITY,
  multiple = true,
  disabled = false,
  description,
  label = "Drop files here or browse",
  "aria-invalid": ariaInvalid,
  ...props
}: DropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dragDepthRef = React.useRef(0)
  const [dragging, setDragging] = React.useState(false)
  const [uncontrolled, setUncontrolled] = React.useState<DropzoneFile[]>(
    () => defaultValue ?? []
  )

  const files = valueProp !== undefined ? valueProp : uncontrolled

  const setFiles = React.useCallback(
    (next: DropzoneFile[] | ((prev: DropzoneFile[]) => DropzoneFile[])) => {
      if (valueProp === undefined) {
        setUncontrolled((prev) => {
          const resolved = typeof next === "function" ? next(prev) : next
          onValueChange?.(resolved)
          return resolved
        })
        return
      }
      const resolved = typeof next === "function" ? next(valueProp) : next
      onValueChange?.(resolved)
    },
    [onValueChange, valueProp]
  )

  React.useEffect(() => {
    return () => {
      if (valueProp === undefined) revokePreviews(uncontrolled)
    }
    // Only revoke uncontrolled previews on unmount of this ownership.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hint = React.useMemo(() => {
    if (description) return description
    const parts: string[] = []
    if (accept?.trim()) parts.push(accept.replaceAll(",", ", "))
    if (maxSize != null && Number.isFinite(maxSize)) {
      parts.push(`up to ${formatBytes(maxSize)}`)
    }
    if (Number.isFinite(maxFiles) && maxFiles > 0 && maxFiles < 1000) {
      parts.push(`max ${maxFiles} file${maxFiles === 1 ? "" : "s"}`)
    }
    return parts.length > 0 ? parts.join(" · ") : "PNG, JPG, PDF, and more"
  }, [accept, description, maxFiles, maxSize])

  const ingest = React.useCallback(
    (incoming: File[]) => {
      if (disabled || incoming.length === 0) return

      const rejections: DropzoneRejection[] = []
      const accepted: File[] = []
      const room = Number.isFinite(maxFiles)
        ? Math.max(0, maxFiles - files.length)
        : Number.POSITIVE_INFINITY

      if (room === 0) {
        onReject?.(
          incoming.map((file) => ({
            file,
            errors: ["too-many-files" as const],
          }))
        )
        return
      }

      for (const file of incoming) {
        const errors: DropzoneRejectionCode[] = []
        if (!matchesAccept(file, accept)) errors.push("file-invalid-type")
        if (maxSize != null && file.size > maxSize) errors.push("file-too-large")
        if (errors.length > 0) {
          rejections.push({ file, errors })
          continue
        }
        accepted.push(file)
      }

      let kept = accepted
      if (Number.isFinite(room) && kept.length > room) {
        const overflow = kept.slice(room)
        kept = kept.slice(0, room)
        for (const file of overflow) {
          rejections.push({ file, errors: ["too-many-files"] })
        }
      }

      if (!multiple) {
        const [first, ...rest] = kept
        kept = first ? [first] : []
        for (const file of rest) {
          rejections.push({ file, errors: ["too-many-files"] })
        }
      }

      if (rejections.length > 0) onReject?.(rejections)
      if (kept.length === 0) return

      const nextItems = toDropzoneFiles(kept)
      setFiles((prev) => {
        if (!multiple) {
          revokePreviews(prev)
          return nextItems
        }
        return [...prev, ...nextItems]
      })
    },
    [accept, disabled, files.length, maxFiles, maxSize, multiple, onReject, setFiles]
  )

  function openPicker() {
    if (disabled) return
    inputRef.current?.click()
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const list = event.target.files ? Array.from(event.target.files) : []
    ingest(list)
    event.target.value = ""
  }

  function onDragEnter(event: React.DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (disabled) return
    dragDepthRef.current += 1
    if (event.dataTransfer.types.includes("Files")) setDragging(true)
  }

  function onDragLeave(event: React.DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1)
    if (dragDepthRef.current === 0) setDragging(false)
  }

  function onDragOver(event: React.DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (disabled) return
    event.dataTransfer.dropEffect = "copy"
  }

  function onDrop(event: React.DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    dragDepthRef.current = 0
    setDragging(false)
    if (disabled) return
    const list = Array.from(event.dataTransfer.files ?? [])
    ingest(list)
  }

  function removeFile(id: string) {
    setFiles((prev) => {
      const target = prev.find((item) => item.id === id)
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl)
      return prev.filter((item) => item.id !== id)
    })
  }

  const invalid = ariaInvalid === true || ariaInvalid === "true"

  return (
    <div
      data-slot="dropzone"
      data-disabled={disabled ? true : undefined}
      data-dragging={dragging ? true : undefined}
      className={cn("grid w-full gap-3", className)}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        tabIndex={-1}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={onInputChange}
      />

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-invalid={invalid || undefined}
        aria-label={label}
        onClick={openPicker}
        onKeyDown={(event) => {
          if (disabled) return
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            openPicker()
          }
        }}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={cn(
          "flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-[12px] border border-dashed border-border/70 bg-card px-6 py-8 text-center transition-[border-color,background-color,box-shadow]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          dragging &&
            "border-primary bg-primary/5 shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_16%,transparent)]",
          invalid && "border-destructive/60",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-full border border-border/70 bg-muted/40 text-muted-foreground",
            dragging && "border-primary/40 bg-primary/10 text-primary"
          )}
        >
          <UploadIcon className="size-5" aria-hidden />
        </span>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </div>

      {files.length > 0 ? (
        <ul className="grid gap-2" aria-label="Selected files">
          {files.map((item) => {
            const uploading = item.status === "uploading"
            const errored = item.status === "error"
            return (
              <li
                key={item.id}
                data-slot="dropzone-file"
                data-status={item.status ?? "idle"}
                className={cn(
                  "flex items-center gap-3 rounded-[12px] border border-border/70 bg-card p-3",
                  errored && "border-destructive/40"
                )}
              >
                <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted/40">
                  {item.previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- blob preview
                    <img
                      src={item.previewUrl}
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : (
                    <FileTypeIcon file={item.file} />
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground tabular-nums">
                        {formatBytes(item.file.size)}
                        {errored && item.error ? ` · ${item.error}` : null}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      disabled={disabled}
                      aria-label={`Remove ${item.file.name}`}
                      className="shrink-0 text-muted-foreground"
                      onClick={(event) => {
                        event.stopPropagation()
                        removeFile(item.id)
                      }}
                    >
                      <XIcon />
                    </Button>
                  </div>
                  {uploading ? (
                    <Progress
                      value={item.progress ?? 0}
                      className="h-1.5"
                      aria-label={`${item.file.name} upload progress`}
                    />
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export { Dropzone, formatBytes }
