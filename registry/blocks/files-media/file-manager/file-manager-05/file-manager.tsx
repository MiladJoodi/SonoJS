"use client"

import * as React from "react"
import {
  ChevronRightIcon,
  FileTextIcon,
  FolderIcon,
  ImageIcon,
  PaperclipIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import { ScrollArea } from "@sonojs/ui/components/scroll-area"
import { cn } from "@/lib/utils"

const BREADCRUMBS = ["My Drive", "Projects", "Q3 Campaign"] as const

const ITEMS = [
  {
    id: "1",
    name: "Assets",
    kind: "folder" as const,
    meta: "42 items",
  },
  {
    id: "2",
    name: "campaign_brief_v2.pdf",
    kind: "pdf" as const,
    meta: "2.4 MB",
  },
  {
    id: "3",
    name: "hero_banner_final.png",
    kind: "image" as const,
    meta: "4.1 MB",
  },
  {
    id: "4",
    name: "Drafts",
    kind: "folder" as const,
    meta: "12 items",
  },
  {
    id: "5",
    name: "press_release.pdf",
    kind: "pdf" as const,
    meta: "890 KB",
  },
  {
    id: "6",
    name: "logo_lockup.png",
    kind: "image" as const,
    meta: "320 KB",
  },
] as const

/** Compact picker dialog — Attach from files. */
export default function FileManager({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(true)
  const [selected, setSelected] = React.useState<Set<string>>(
    () => new Set(["2", "3"])
  )

  const toggle = (id: string, kind: string) => {
    if (kind === "folder") return
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div
      className={cn(
        "flex min-h-[min(36rem,100svh)] w-full items-center justify-center bg-white px-4 py-10 dark:bg-background",
        className
      )}
      {...props}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        {!open ? (
          <Button
            type="button"
            className="cursor-pointer gap-1.5"
            onClick={() => setOpen(true)}
          >
            <PaperclipIcon className="size-4" aria-hidden />
            Attach from files
          </Button>
        ) : null}
        <DialogContent className="flex max-h-[min(36rem,90svh)] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
          <DialogHeader className="border-b border-border/70 px-5 py-4 text-start">
            <DialogTitle>Attach from files</DialogTitle>
            <DialogDescription>
              Choose files from your drive to attach to this message.
            </DialogDescription>
          </DialogHeader>

          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1 border-b border-border/70 px-5 py-2.5 text-xs text-muted-foreground"
          >
            {BREADCRUMBS.map((crumb, i) => (
              <React.Fragment key={crumb}>
                {i > 0 ? (
                  <ChevronRightIcon
                    className="icon-dir size-3"
                    aria-hidden
                  />
                ) : null}
                <button
                  type="button"
                  className={cn(
                    "cursor-pointer rounded-sm hover:text-foreground",
                    i === BREADCRUMBS.length - 1 &&
                      "font-medium text-foreground"
                  )}
                >
                  {crumb}
                </button>
              </React.Fragment>
            ))}
          </nav>

          <ScrollArea className="min-h-0 flex-1">
            <ul className="space-y-0.5 p-2" role="listbox" aria-multiselectable>
              {ITEMS.map((item) => {
                const on = selected.has(item.id)
                const isFolder = item.kind === "folder"
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isFolder ? undefined : on}
                      disabled={isFolder}
                      onClick={() => toggle(item.id, item.kind)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-start text-sm transition-colors",
                        isFolder
                          ? "cursor-pointer text-foreground hover:bg-muted"
                          : on
                            ? "cursor-pointer bg-primary/10 font-medium"
                            : "cursor-pointer hover:bg-muted"
                      )}
                    >
                      {item.kind === "folder" ? (
                        <FolderIcon
                          className="size-5 text-amber-500"
                          aria-hidden
                        />
                      ) : item.kind === "image" ? (
                        <ImageIcon className="size-5 text-primary" aria-hidden />
                      ) : (
                        <FileTextIcon
                          className="size-5 text-destructive"
                          aria-hidden
                        />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{item.name}</span>
                        <span
                          className="block text-xs text-muted-foreground"
                          dir="ltr"
                        >
                          {item.meta}
                        </span>
                      </span>
                      {!isFolder && on ? (
                        <Badge variant="secondary">Selected</Badge>
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          </ScrollArea>

          <DialogFooter className="flex-row items-center justify-between gap-2 border-t border-border/70 px-5 py-3 sm:justify-between">
            <p className="text-xs text-muted-foreground" dir="ltr">
              {selected.size} selected
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="cursor-pointer"
                disabled={selected.size === 0}
                onClick={() => setOpen(false)}
              >
                Attach
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
