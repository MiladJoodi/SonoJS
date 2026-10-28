"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  ChevronDownIcon,
  DownloadIcon,
  FileJsonIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  Loader2Icon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Label } from "@sonojs/ui/components/label"
import { Progress } from "@sonojs/ui/components/progress"
import {
  RadioGroup,
  RadioGroupItem,
} from "@sonojs/ui/components/radio-group"
import { cn } from "@/lib/utils"

const FORMATS = [
  {
    id: "csv",
    label: "CSV",
    description:
      "Comma-separated values, compatible with Excel and Google Sheets.",
    icon: FileSpreadsheetIcon,
    ext: ".csv",
  },
  {
    id: "json",
    label: "JSON",
    description: "Structured JSON for developers and API integrations.",
    icon: FileJsonIcon,
    ext: ".json",
  },
  {
    id: "xlsx",
    label: "Excel (XLSX)",
    description: "Native Excel format with formatting and multiple sheets.",
    icon: FileSpreadsheetIcon,
    ext: ".xlsx",
  },
  {
    id: "pdf",
    label: "PDF Report",
    description: "Printable PDF report with charts and summary tables.",
    icon: FileTextIcon,
    ext: ".pdf",
  },
] as const

type FormatId = (typeof FORMATS)[number]["id"]

const FIELD_GROUPS = [
  {
    group: "Customer",
    fields: [
      { id: "name", label: "Full Name" },
      { id: "email", label: "Email Address" },
      { id: "phone", label: "Phone Number" },
      { id: "country", label: "Country" },
    ],
  },
  {
    group: "Orders",
    fields: [
      { id: "order_id", label: "Order ID" },
      { id: "order_date", label: "Order Date" },
      { id: "total", label: "Total Amount" },
      { id: "status", label: "Status" },
      { id: "items", label: "Line Items" },
    ],
  },
  {
    group: "Analytics",
    fields: [
      { id: "sessions", label: "Sessions" },
      { id: "revenue", label: "Revenue" },
      { id: "conversion", label: "Conversion Rate" },
    ],
  },
] as const

type ExportState = "idle" | "exporting" | "done"

const ALL_FIELD_IDS = FIELD_GROUPS.flatMap((g) => g.fields.map((f) => f.id))

export default function DataExport({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [format, setFormat] = React.useState<FormatId>("csv")
  const [selectedFields, setSelectedFields] = React.useState<Set<string>>(
    () =>
      new Set(["name", "email", "order_id", "order_date", "total", "status"])
  )
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(
    () => new Set(["Customer", "Orders"])
  )
  const [exportState, setExportState] = React.useState<ExportState>("idle")
  const [progress, setProgress] = React.useState(0)

  const selectedFmt = FORMATS.find((f) => f.id === format) ?? FORMATS[0]
  const FormatIcon = selectedFmt.icon

  function toggleField(id: string) {
    setSelectedFields((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleGroup(group: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(group)) next.delete(group)
      else next.add(group)
      return next
    })
  }

  function selectAllInGroup(fields: readonly { id: string }[]) {
    setSelectedFields((prev) => {
      const next = new Set(prev)
      fields.forEach((f) => next.add(f.id))
      return next
    })
  }

  function handleExport() {
    setExportState("exporting")
    setProgress(0)
    const interval = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(interval)
          setExportState("done")
          return 100
        }
        return p + 10
      })
    }, 180)
  }

  function reset() {
    setExportState("idle")
    setProgress(0)
  }

  return (
    <main
      className={cn(
        "flex w-full min-w-0 items-start justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex items-center justify-between gap-4 border-b border-border/70 px-6 py-5">
          <div className="min-w-0 text-start">
            <h1 className="text-xl font-semibold tracking-tight">
              Export Data
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Choose format and select the fields to include.
            </p>
          </div>
          <Badge variant="secondary">{selectedFields.size} fields</Badge>
        </div>

        <div className="p-6">
          {exportState === "done" ? (
            <div className="flex flex-col items-center gap-6 py-8 text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-emerald-500/10 ring-8 ring-emerald-500/5">
                <CheckCircle2Icon
                  className="size-10 text-emerald-600 dark:text-emerald-400"
                  aria-hidden
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  Export complete!
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your {selectedFmt.label} file ({selectedFields.size} fields,
                  1,234 records) is ready.
                </p>
              </div>
              <Alert className="w-full border-emerald-500/25 bg-emerald-500/10 text-start">
                <CheckCircle2Icon
                  className="text-emerald-600 dark:text-emerald-400"
                  aria-hidden
                />
                <AlertTitle>Download started automatically</AlertTitle>
                <AlertDescription>
                  data-export-2026-06-23{selectedFmt.ext} has been saved to your
                  Downloads folder.
                </AlertDescription>
              </Alert>
              <div className="flex flex-wrap justify-center gap-3">
                <Button type="button" className="cursor-pointer" onClick={reset}>
                  Export another
                </Button>
                <Button type="button" variant="outline" className="cursor-pointer gap-2">
                  <DownloadIcon className="size-4" aria-hidden />
                  Download again
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-start text-sm font-semibold">
                  Export format
                </p>
                <RadioGroup
                  value={format}
                  onValueChange={(value) => setFormat(value as FormatId)}
                  className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                >
                  {FORMATS.map((fmt) => {
                    const Icon = fmt.icon
                    return (
                      <Label
                        key={fmt.id}
                        htmlFor={`data-export-01-fmt-${fmt.id}`}
                        className={cn(
                          "group/format flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-border/70 bg-card px-2 py-4 text-center transition-colors",
                          "hover:bg-muted/40 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
                        )}
                      >
                        <RadioGroupItem
                          value={fmt.id}
                          id={`data-export-01-fmt-${fmt.id}`}
                          className="sr-only"
                        />
                        <Icon
                          className="size-6 text-muted-foreground group-has-data-[state=checked]/format:text-primary"
                          aria-hidden
                        />
                        <span className="text-sm font-medium">{fmt.label}</span>
                      </Label>
                    )
                  })}
                </RadioGroup>
                <p className="mt-2 text-start text-xs text-muted-foreground">
                  {selectedFmt.description}
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">Fields to include</p>
                  <button
                    type="button"
                    className="cursor-pointer text-xs font-semibold text-primary hover:underline"
                    onClick={() => setSelectedFields(new Set(ALL_FIELD_IDS))}
                  >
                    Select all
                  </button>
                </div>
                <div className="space-y-2">
                  {FIELD_GROUPS.map(({ group, fields }) => {
                    const expanded = expandedGroups.has(group)
                    const groupSelected = fields.filter((f) =>
                      selectedFields.has(f.id)
                    ).length

                    return (
                      <div
                        key={group}
                        className="overflow-hidden rounded-lg border border-border/70 bg-muted/30"
                      >
                        <div className="flex items-center justify-between gap-2 px-4 py-3">
                          <button
                            type="button"
                            className="flex min-w-0 cursor-pointer items-center gap-2 rounded-sm text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                            aria-expanded={expanded}
                            onClick={() => toggleGroup(group)}
                          >
                            <span className="text-sm font-semibold">
                              {group}
                            </span>
                            <Badge variant="outline" className="font-normal">
                              {groupSelected}/{fields.length}
                            </Badge>
                          </button>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="cursor-pointer px-1.5 py-1 text-xs font-semibold text-primary hover:underline"
                              onClick={() => selectAllInGroup(fields)}
                            >
                              All
                            </button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              className="size-8 cursor-pointer"
                              aria-label={
                                expanded
                                  ? `Collapse ${group}`
                                  : `Expand ${group}`
                              }
                              aria-expanded={expanded}
                              onClick={() => toggleGroup(group)}
                            >
                              <ChevronDownIcon
                                className={cn(
                                  "size-4 transition-transform",
                                  expanded && "rotate-180"
                                )}
                                aria-hidden
                              />
                            </Button>
                          </div>
                        </div>
                        {expanded ? (
                          <div className="grid grid-cols-1 gap-1 border-t border-border/70 bg-card p-3 sm:grid-cols-2">
                            {fields.map((field) => (
                              <label
                                key={field.id}
                                htmlFor={`data-export-01-field-${field.id}`}
                                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/50"
                              >
                                <Checkbox
                                  id={`data-export-01-field-${field.id}`}
                                  checked={selectedFields.has(field.id)}
                                  onCheckedChange={() => toggleField(field.id)}
                                />
                                <span className="text-xs text-muted-foreground">
                                  {field.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>

              {exportState === "exporting" ? (
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Loader2Icon
                        className="size-4 animate-spin text-primary"
                        aria-hidden
                      />
                      <p className="text-sm font-medium">Preparing export…</p>
                    </div>
                    <p className="text-xs text-muted-foreground" dir="ltr">
                      {progress}%
                    </p>
                  </div>
                  <Progress value={progress} aria-label="Export progress" />
                </div>
              ) : null}
            </div>
          )}
        </div>

        {exportState !== "done" ? (
          <div className="border-t border-border/70 px-6 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground" dir="ltr">
                ~1,234 records · {selectedFmt.ext}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="cursor-pointer"
                  onClick={reset}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="min-w-28 cursor-pointer gap-2 disabled:cursor-not-allowed"
                  disabled={
                    exportState === "exporting" || selectedFields.size === 0
                  }
                  onClick={handleExport}
                >
                  {exportState === "exporting" ? (
                    <>
                      <Loader2Icon
                        className="size-4 animate-spin"
                        aria-hidden
                      />
                      Exporting…
                    </>
                  ) : (
                    <>
                      <FormatIcon className="size-4" aria-hidden />
                      Export {selectedFmt.label}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}
