"use client"

import * as React from "react"
import { FileSpreadsheetIcon, UploadIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const FORMATS = ["CSV", "XLSX", "JSON"] as const

export default function DataImport({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [selected, setSelected] = React.useState(true)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-12",
        className
      )}
      aria-labelledby="data-import-02-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-lg rounded-[12px] border border-border/70 bg-card p-6 sm:p-8">
        <header className="text-start">
          <h1
            id="data-import-02-heading"
            className="text-lg font-semibold tracking-tight"
          >
            Upload your file
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Import contacts from a spreadsheet. Max 50 MB.
          </p>
        </header>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {FORMATS.map((format) => (
            <Badge
              key={format}
              variant="outline"
              className="rounded-full border-border/70 font-normal"
            >
              {format}
            </Badge>
          ))}
        </div>

        <button
          type="button"
          className="mt-5 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
          onClick={() => setSelected(true)}
        >
          <span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <UploadIcon className="size-5" aria-hidden />
          </span>
          <span className="text-sm font-medium">
            Drop your file here
          </span>
          <span className="text-xs text-muted-foreground">
            or click to browse from your computer
          </span>
        </button>

        {selected ? (
          <div className="mt-4 flex items-center gap-3 rounded-[12px] border border-border/70 px-3 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <FileSpreadsheetIcon className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 text-start">
              <p className="truncate text-sm font-medium">contacts.csv</p>
              <p className="text-xs text-muted-foreground" dir="ltr">
                2.4 MB · CSV
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="cursor-pointer"
              onClick={() => setSelected(false)}
            >
              Remove
            </Button>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" className="cursor-pointer">
            Cancel
          </Button>
          <Button
            type="button"
            className="cursor-pointer"
            disabled={!selected}
          >
            Continue
          </Button>
        </div>
      </div>
    </section>
  )
}
