"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const DESTINATIONS = [
  { value: "name", label: "Full name" },
  { value: "email", label: "Email" },
  { value: "company", label: "Company" },
  { value: "phone", label: "Phone" },
  { value: "skip", label: "Skip this column" },
] as const

const COLUMNS = [
  {
    id: "col_a",
    source: "full_name",
    samples: ["Maya Chen", "Noah Park", "Sofia Hale"],
    defaultDest: "name",
  },
  {
    id: "col_b",
    source: "work_email",
    samples: ["maya@acme.com", "noah@acme.com", "sofia@acme.com"],
    defaultDest: "email",
  },
  {
    id: "col_c",
    source: "org",
    samples: ["Acme", "Northwind", "Brightlane"],
    defaultDest: "company",
  },
  {
    id: "col_d",
    source: "notes",
    samples: ["VIP", "Intro call", "—"],
    defaultDest: "skip",
  },
] as const

export default function DataImport({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [mapping, setMapping] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    for (const col of COLUMNS) initial[col.id] = col.defaultDest
    return initial
  })

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-12",
        className
      )}
      aria-labelledby="data-import-03-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl rounded-[12px] border border-border/70 bg-card p-6 sm:p-8">
        <header className="flex flex-wrap items-start justify-between gap-3 text-start">
          <div>
            <h1
              id="data-import-03-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Map columns
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Match each spreadsheet column to a contact field.
            </p>
          </div>
          <Badge
            variant="outline"
            className="rounded-full border-transparent bg-muted font-normal text-muted-foreground"
          >
            contacts.csv · 4 columns
          </Badge>
        </header>

        <Separator className="my-5" />

        <ul className="space-y-4">
          {COLUMNS.map((col) => (
            <li
              key={col.id}
              className="rounded-[12px] border border-border/70 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1 text-start">
                  <p
                    dir="ltr"
                    className="font-mono text-sm font-medium text-foreground"
                  >
                    {col.source}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    Preview: {col.samples.join(" · ")}
                  </p>
                </div>
                <ArrowRightIcon
                  className="icon-dir hidden size-4 shrink-0 text-muted-foreground sm:block"
                  aria-hidden
                />
                <Select
                  value={mapping[col.id]}
                  onValueChange={(value) =>
                    setMapping((prev) => ({ ...prev, [col.id]: value }))
                  }
                >
                  <SelectTrigger className="w-full cursor-pointer sm:w-48">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {DESTINATIONS.map((dest) => (
                      <SelectItem key={dest.value} value={dest.value}>
                        {dest.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <Button type="button" variant="outline" className="cursor-pointer">
            Back
          </Button>
          <Button type="button" className="cursor-pointer">
            Import contacts
          </Button>
        </div>
      </div>
    </section>
  )
}
