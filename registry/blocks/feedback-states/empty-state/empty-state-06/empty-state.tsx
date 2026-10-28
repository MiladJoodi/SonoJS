"use client"

import type * as React from "react"
import { ChevronRightIcon, FolderIcon, UploadIcon } from "lucide-react"

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
      aria-labelledby="empty-state-06-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
            <span className="text-muted-foreground">Files</span>
            <ChevronRightIcon
              className="size-3.5 text-muted-foreground"
              aria-hidden
            />
            <span className="font-medium text-foreground">Brand assets</span>
          </nav>
          <Button type="button" size="sm" className="cursor-pointer">
            <UploadIcon className="size-3.5" aria-hidden />
            Upload
          </Button>
        </div>

        <Empty className="m-4 min-h-[260px] rounded-[12px] border border-dashed border-border/70 bg-muted/10 sm:m-5">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderIcon aria-hidden />
            </EmptyMedia>
            <EmptyTitle id="empty-state-06-heading">
              This folder is empty
            </EmptyTitle>
            <EmptyDescription>
              Drop files here or upload from your computer. Logos, icons, and
              export packs stay organized in one place.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" className="cursor-pointer">
              <UploadIcon className="size-4" aria-hidden />
              Upload files
            </Button>
            <p className="text-xs text-muted-foreground">
              PNG, SVG, or ZIP · up to 50 MB
            </p>
          </EmptyContent>
        </Empty>
      </div>
    </section>
  )
}
