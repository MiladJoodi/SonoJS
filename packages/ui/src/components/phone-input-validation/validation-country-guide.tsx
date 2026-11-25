"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@sonojs/ui/components/dialog"
import { Input } from "@sonojs/ui/components/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { flagSrc, DEFAULT_FLAG_CDN_BASE } from "./phone-countries"
import { cn } from "@sonojs/ui/lib/utils"

import { countryValidationRows } from "./validation-reference"

function matchRow(query: string, row: (typeof countryValidationRows)[number]) {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return (
    row.name.toLowerCase().includes(needle) ||
    row.code.toLowerCase().includes(needle) ||
    row.dial.includes(needle) ||
    row.sample.toLowerCase().includes(needle)
  )
}

export function PhoneValidationCountryGuide({
  className,
}: {
  className?: string
}) {
  const [query, setQuery] = React.useState("")
  const filtered = React.useMemo(
    () => countryValidationRows.filter((row) => matchRow(query, row)),
    [query]
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "cursor-pointer font-medium text-foreground underline underline-offset-4 hover:text-primary",
            className
          )}
        >
          Samples
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[min(88vh,720px)] flex-col gap-0 p-0 sm:max-w-4xl">
        <DialogHeader className="gap-2 border-b border-border/70 px-5 pt-5 pb-4">
          <DialogTitle>Validation by country</DialogTitle>
          <DialogDescription>
            Sample numbers pass. Length alone is not enough.
          </DialogDescription>
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search country, code, or dial…"
            className="h-10"
            autoComplete="off"
          />
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-4">
          <Table className="table-fixed w-full">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-1/2 ps-3">Country</TableHead>
                <TableHead className="w-1/2 pe-3 text-end">Sample</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No countries match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((row) => (
                  <TableRow key={row.code} className="hover:bg-muted/40">
                    <TableCell className="min-w-0 ps-3 align-top">
                      <div className="flex items-start gap-2">
                        <img
                          src={flagSrc(row.code, DEFAULT_FLAG_CDN_BASE)}
                          alt=""
                          width={24}
                          height={16}
                          className="mt-0.5 h-4 w-6 shrink-0 rounded-[2px] object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">
                            {row.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground tabular-nums">
                            {row.code} · {row.dial}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="min-w-0 pe-3 text-end align-top font-mono text-xs tabular-nums text-foreground sm:text-sm">
                      {row.sample}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}