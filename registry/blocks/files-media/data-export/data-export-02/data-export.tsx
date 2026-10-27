"use client"

import * as React from "react"
import { DownloadIcon, Loader2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Label } from "@sonojs/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { cn } from "@/lib/utils"

export default function DataExport({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [format, setFormat] = React.useState("csv")
  const [range, setRange] = React.useState("30d")
  const [headers, setHeaders] = React.useState(true)
  const [busy, setBusy] = React.useState(false)

  function handleExport(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    window.setTimeout(() => setBusy(false), 1200)
  }

  return (
    <main
      className={cn(
        "flex w-full min-w-0 items-start justify-center bg-canvas px-4 py-12 text-foreground sm:px-6",
        className
      )}
      {...props}
    >
      <form
        onSubmit={handleExport}
        className="w-full max-w-md rounded-[12px] border border-border/70 bg-card shadow-soft"
      >
        <div className="space-y-1 border-b border-border/70 px-5 py-4 text-start">
          <h1 className="text-base font-semibold tracking-tight">
            Export customers
          </h1>
          <p className="text-sm text-muted-foreground">
            Download a file of your customer list.
          </p>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div className="grid gap-2">
            <Label htmlFor="data-export-02-format">File format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger id="data-export-02-format" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="data-export-02-range">Date range</Label>
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger id="data-export-02-range" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="data-export-02-headers"
              checked={headers}
              onCheckedChange={(v) => setHeaders(v === true)}
            />
            <Label htmlFor="data-export-02-headers" className="font-normal">
              Include column headers
            </Label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border/70 px-5 py-4">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="submit" disabled={busy}>
            {busy ? (
              <>
                <Loader2Icon className="size-4 animate-spin" aria-hidden />
                Exporting…
              </>
            ) : (
              <>
                <DownloadIcon className="size-4" aria-hidden />
                Export
              </>
            )}
          </Button>
        </div>
      </form>
    </main>
  )
}
