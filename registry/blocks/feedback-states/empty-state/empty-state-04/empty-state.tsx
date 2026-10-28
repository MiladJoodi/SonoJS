"use client"

import type * as React from "react"
import { FilterIcon, TableIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@sonojs/ui/components/empty"
import { cn } from "@/lib/utils"

const COLUMNS = ["Name", "Status", "Owner", "Updated"] as const

export default function EmptyState({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="empty-state-04-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
          <div>
            <h2 className="text-sm font-semibold">Customers</h2>
            <p className="text-xs text-muted-foreground">
              Showing 0 of 248 · 2 filters active
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="cursor-pointer"
          >
            <FilterIcon className="size-3.5" aria-hidden />
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-start text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/30">
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-4 py-2.5 text-xs font-medium tracking-wide text-muted-foreground uppercase"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        <Empty className="min-h-[240px] border-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <TableIcon aria-hidden />
            </EmptyMedia>
            <EmptyTitle id="empty-state-04-heading">
              No rows match your filters
            </EmptyTitle>
            <EmptyDescription>
              Try broadening status or owner. Clearing filters restores the full
              customer list.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
              >
                Clear filters
              </Button>
              <Button type="button" className="cursor-pointer">
                Adjust filters
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </div>
    </section>
  )
}
