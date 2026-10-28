"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  FileSpreadsheetIcon,
  FileTextIcon,
  RefreshCwIcon,
  UploadIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const ACCEPT = ".pdf,.csv,application/pdf,text/csv"
const MAX_BYTES = 25 * 1024 * 1024

interface DocFile {
  name: string
  size: number
  type: string
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function isDoc(file: File): boolean {
  if (file.size > MAX_BYTES) return false
  const n = file.name.toLowerCase()
  return (
    file.type === "application/pdf" ||
    file.type === "text/csv" ||
    n.endsWith(".pdf") ||
    n.endsWith(".csv")
  )
}

export default function FileUpload({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [file, setFile] = React.useState<DocFile | null>({
    name: "Q2-payroll-export.csv",
    size: 482_000,
    type: "text/csv",
  })
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const applyFile = (picked: File | undefined) => {
    if (!picked) return
    if (!isDoc(picked)) {
      setError("Only PDF or CSV up to 25MB.")
      return
    }
    setError(null)
    setFile({ name: picked.name, size: picked.size, type: picked.type })
  }

  const isCsv =
    file?.type === "text/csv" || file?.name.toLowerCase().endsWith(".csv")

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <section
        className="w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        aria-labelledby="file-upload-03-heading"
      >
        <header className="border-b border-border/70 px-5 py-5 text-start sm:px-6">
          <h1
            id="file-upload-03-heading"
            className="text-lg font-semibold tracking-tight"
          >
            Import document
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Attach one PDF or CSV for payroll / tax import. Replace anytime.
          </p>
        </header>

        <div className="space-y-4 px-5 py-5 sm:px-6">
          {!file ? (
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
                applyFile(e.dataTransfer.files?.[0])
              }}
              className={cn(
                "relative rounded-[12px] border-2 border-dashed px-6 py-12 text-center transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "cursor-pointer border-border/70 hover:border-primary/40"
              )}
            >
              <UploadIcon
                className="mx-auto mb-3 size-8 text-primary"
                aria-hidden
              />
              <p className="text-sm font-semibold">Drop a PDF or CSV</p>
              <p className="mt-1 text-xs text-muted-foreground">
                or click to browse · max 25MB
              </p>
              <div className="mt-3 flex justify-center gap-2">
                <Badge variant="outline">PDF</Badge>
                <Badge variant="outline">CSV</Badge>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
                aria-label="Choose document"
                onChange={(e) => {
                  applyFile(e.target.files?.[0])
                  e.target.value = ""
                }}
              />
            </div>
          ) : (
            <div className="flex items-start gap-3 rounded-[12px] border border-border/70 bg-muted/30 p-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                {isCsv ? (
                  <FileSpreadsheetIcon className="size-5" aria-hidden />
                ) : (
                  <FileTextIcon className="size-5" aria-hidden />
                )}
              </div>
              <div className="min-w-0 flex-1 text-start">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold" title={file.name}>
                    {file.name}
                  </p>
                  <CheckCircle2Icon
                    className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                    aria-hidden
                  />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  <span dir="ltr">{formatSize(file.size)}</span>
                  {" · "}
                  {isCsv ? "CSV" : "PDF"} ready to import
                </p>
              </div>
            </div>
          )}

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-border/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          {file ? (
            <>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer gap-1.5"
                onClick={() => {
                  setFile(null)
                  setError(null)
                }}
              >
                <XIcon className="size-4" aria-hidden />
                Remove
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="cursor-pointer gap-1.5"
                onClick={() => inputRef.current?.click()}
              >
                <RefreshCwIcon className="size-4" aria-hidden />
                Replace
              </Button>
              <Button type="button" className="cursor-pointer">
                Continue
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                className="sr-only"
                aria-label="Replace document"
                onChange={(e) => {
                  applyFile(e.target.files?.[0])
                  e.target.value = ""
                }}
              />
            </>
          ) : (
            <Button
              type="button"
              className="cursor-pointer"
              onClick={() => inputRef.current?.click()}
            >
              Choose file
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}
