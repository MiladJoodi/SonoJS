"use client"

import * as React from "react"
import {
  FileIcon,
  FileSpreadsheetIcon,
  Trash2Icon,
  UploadCloudIcon,
  VideoIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { cn } from "@/lib/utils"

type FileKind = "document" | "spreadsheet" | "video"

interface StoredFile {
  id: string
  name: string
  kind: FileKind
  uploadedOn: string
  sizeLabel: string
}

const INITIAL: StoredFile[] = [
  {
    id: "1",
    name: "Invoice 1",
    kind: "document",
    uploadedOn: "May 11, 2026",
    sizeLabel: "4 MB",
  },
  {
    id: "2",
    name: "Payroll Sheet",
    kind: "spreadsheet",
    uploadedOn: "May 11, 2026",
    sizeLabel: "539 KB",
  },
  {
    id: "3",
    name: "Welcome video",
    kind: "video",
    uploadedOn: "May 11, 2026",
    sizeLabel: "36 MB",
  },
  {
    id: "4",
    name: "Quarterly report",
    kind: "document",
    uploadedOn: "May 8, 2026",
    sizeLabel: "2.1 MB",
  },
]

function KindIcon({ kind }: { kind: FileKind }) {
  const Icon =
    kind === "spreadsheet"
      ? FileSpreadsheetIcon
      : kind === "video"
        ? VideoIcon
        : FileIcon
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-muted text-muted-foreground">
      <Icon className="size-3.5" aria-hidden />
    </span>
  )
}

export function SettingsStorage() {
  const [files, setFiles] = React.useState(INITIAL)
  const [selected, setSelected] = React.useState<Set<string>>(
    () => new Set(["2"])
  )
  const [query, setQuery] = React.useState("")
  const [dragging, setDragging] = React.useState(false)

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(query.trim().toLowerCase())
  )

  const toggle = (id: string, on: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const addMockUpload = () => {
    const id = `up-${Date.now()}`
    setFiles((prev) => [
      {
        id,
        name: `Upload ${prev.length + 1}`,
        kind: "document",
        uploadedOn: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        sizeLabel: "1.2 MB",
      },
      ...prev,
    ])
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={addMockUpload}
        onDragEnter={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          addMockUpload()
        }}
        className={cn(
          "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed px-4 py-7 transition-[border-color,background-color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-ring",
          dragging
            ? "border-primary bg-primary/5 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--primary)_25%,transparent)]"
            : "border-border/70 bg-muted/25 hover:border-border hover:bg-muted/40"
        )}
      >
        <span className="flex size-10 items-center justify-center rounded-full border border-border/70 bg-card shadow-xs">
          <UploadCloudIcon className="size-5 text-muted-foreground" />
        </span>
        <p className="text-sm font-medium text-foreground">
          Drag and drop to upload or{" "}
          <span className="text-primary">select</span>
        </p>
        <p className="text-xs text-muted-foreground">
          PDF, JPG, PNG or XLSX (max 8 MB)
        </p>
      </button>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Stored in{" "}
          <span className="font-medium text-foreground tabular-nums">
            {filtered.length} files
          </span>
        </p>
        <Input
          aria-label="Search files"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-8 w-[160px] rounded-full border-border/70 bg-card text-sm shadow-xs"
        />
      </div>

      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-xs">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-center gap-2 border-b border-border/70 bg-muted/35 px-3 py-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          <span className="w-4" />
          <span>Name</span>
          <span className="hidden w-[6.5rem] sm:inline">Modified</span>
          <span className="w-14 text-end">Size</span>
          <span className="w-8" />
        </div>
        {filtered.length === 0 ? (
          <p className="px-3 py-10 text-center text-sm text-muted-foreground">
            No files match your filters.
          </p>
        ) : (
          filtered.map((file) => (
            <div
              key={file.id}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-center gap-2 border-b border-border/60 px-3 py-2 transition-colors last:border-b-0 hover:bg-muted/25"
            >
              <Checkbox
                checked={selected.has(file.id)}
                onCheckedChange={(v) => toggle(file.id, v === true)}
                aria-label={`Select ${file.name}`}
              />
              <div className="flex min-w-0 items-center gap-2.5">
                <KindIcon kind={file.kind} />
                <span className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </span>
              </div>
              <span className="hidden w-[6.5rem] text-xs text-muted-foreground sm:inline">
                {file.uploadedOn}
              </span>
              <span
                dir="ltr"
                className="w-14 text-end text-xs tabular-nums text-muted-foreground"
              >
                {file.sizeLabel}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${file.name}`}
                className="size-8 text-muted-foreground hover:text-destructive"
                onClick={() =>
                  setFiles((prev) => prev.filter((f) => f.id !== file.id))
                }
              >
                <Trash2Icon className="size-3.5" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
