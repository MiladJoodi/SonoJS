"use client"

import type * as React from "react"
import { FolderKanbanIcon, PlusIcon } from "lucide-react"

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
      aria-labelledby="empty-state-03-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
          <div>
            <h2 className="text-sm font-semibold">Projects</h2>
            <p className="text-xs text-muted-foreground">
              Workspace · 0 projects
            </p>
          </div>
          <Button type="button" size="sm" className="cursor-pointer">
            <PlusIcon className="size-3.5" aria-hidden />
            New project
          </Button>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-5">
          <button
            type="button"
            className="flex min-h-[9rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border border-dashed border-border/70 bg-muted/20 p-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
          >
            <PlusIcon className="size-5" aria-hidden />
            Create project
          </button>
          <div
            aria-hidden
            className="hidden min-h-[9rem] rounded-[12px] border border-border/40 bg-muted/10 sm:block"
          />
          <div
            aria-hidden
            className="hidden min-h-[9rem] rounded-[12px] border border-border/40 bg-muted/10 sm:block"
          />
        </div>

        <Empty className="border-0 border-t border-border/70 pt-2">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderKanbanIcon aria-hidden />
            </EmptyMedia>
            <EmptyTitle id="empty-state-03-heading">
              No projects yet
            </EmptyTitle>
            <EmptyDescription>
              Create your first project to organize components, docs, and
              releases in one place.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" className="cursor-pointer">
              <PlusIcon className="size-4" aria-hidden />
              Create project
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </section>
  )
}
