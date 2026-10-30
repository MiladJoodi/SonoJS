"use client"

import { useState } from "react"
import {
  CheckCircle2Icon,
  CloudUploadIcon,
  GripVerticalIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@sonojs/ui/components/badge"
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
  type SortableCommitMeta,
} from "@sonojs/ui/components/sortable"
import { cn } from "@sonojs/ui/lib/utils"

interface OptimisticSortItem {
  id: string
  title: string
  owner: string
}

const defaultItems: OptimisticSortItem[] = [
  { id: "1", title: "Draft the release notes", owner: "Maya" },
  { id: "2", title: "Review open pull requests", owner: "Leo" },
  { id: "3", title: "Update the changelog", owner: "Sam" },
  { id: "4", title: "Cut the release tag", owner: "Maya" },
  { id: "5", title: "Announce on the blog", owner: "Jordan" },
]

function persistOrder(
  _meta: SortableCommitMeta<OptimisticSortItem>
): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.25) {
        reject(new Error("Network error"))
      } else {
        resolve()
      }
    }, 700)
  })
}

export function SortableOptimistic() {
  const [items, setItems] = useState<OptimisticSortItem[]>(defaultItems)
  const [pending, setPending] = useState(false)

  const handleValueCommit = (
    next: OptimisticSortItem[],
    meta: SortableCommitMeta<OptimisticSortItem>
  ) => {
    const previous = meta.previousValue
    const moved = next[meta.overIndex]
    setPending(true)

    toast.promise(
      persistOrder(meta).finally(() => setPending(false)),
      {
        loading: "Syncing checklist order…",
        success: () =>
          `Pinned "${moved.title}" at step ${meta.overIndex + 1}`,
        error: () => {
          setItems(previous)
          return "Save failed — order restored"
        },
      }
    )
  }

  return (
    <div className="mx-auto w-full max-w-lg px-1 py-2 sm:p-4">
      <div className="mb-3 flex items-start justify-between gap-2 px-0.5 sm:gap-3">
        <div className="min-w-0 text-start">
          <p className="text-sm font-semibold tracking-tight">
            Release checklist
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="sm:hidden">Optimistic sync · may roll back</span>
            <span className="hidden sm:inline">
              Optimistic UI · rolls back if sync fails (~25%)
            </span>
          </p>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "gap-1 shrink-0",
            pending
              ? "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-400"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-400"
          )}
        >
          {pending ? (
            <CloudUploadIcon className="size-3 animate-pulse" />
          ) : (
            <CheckCircle2Icon className="size-3" />
          )}
          <span className="sm:hidden">{pending ? "…" : "OK"}</span>
          <span className="hidden sm:inline">
            {pending ? "Syncing" : "Synced"}
          </span>
        </Badge>
      </div>

      <Sortable
        value={items}
        onValueChange={setItems}
        onValueCommit={handleValueCommit}
        getItemValue={(item) => item.id}
        strategy="vertical"
        className="space-y-2"
      >
        {items.map((item, index) => (
          <SortableItem key={item.id} value={item.id}>
            <div className="flex items-center gap-2 rounded-[12px] border border-border/70 bg-card p-2 sm:gap-3 sm:p-2.5 sm:pe-3">
              <SortableItemHandle className="cursor-grab! flex size-9 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground">
                <GripVerticalIcon className="size-4" />
              </SortableItemHandle>

              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold tabular-nums",
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </span>

              <div className="min-w-0 flex-1 text-start">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  Owner · {item.owner}
                </p>
              </div>
            </div>
          </SortableItem>
        ))}
      </Sortable>
    </div>
  )
}
