"use client"

import { useState } from "react"
import {
  FileTextIcon,
  FilmIcon,
  GripVerticalIcon,
  ImageIcon,
  Music2Icon,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@sonojs/ui/components/badge"
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@sonojs/ui/components/sortable"
import { cn } from "@sonojs/ui/lib/utils"

interface MediaSortItem {
  id: string
  title: string
  description: string
  type: "image" | "document" | "audio" | "video"
  size: string
}

const defaultItems: MediaSortItem[] = [
  {
    id: "1",
    title: "hero-launch.webp",
    description: "Homepage hero · CDN edge",
    type: "image",
    size: "2.4 MB",
  },
  {
    id: "2",
    title: "spec-sheet-v3.pdf",
    description: "Technical PDF · Docs",
    type: "document",
    size: "1.2 MB",
  },
  {
    id: "3",
    title: "walkthrough-4k.mp4",
    description: "Product demo · Streaming",
    type: "video",
    size: "15.7 MB",
  },
  {
    id: "4",
    title: "voiceover-en.mp3",
    description: "Narration · Studio",
    type: "audio",
    size: "8.3 MB",
  },
  {
    id: "5",
    title: "gallery-02.webp",
    description: "Detail shot · CDN edge",
    type: "image",
    size: "3.1 MB",
  },
]

const typeMeta = {
  image: {
    icon: ImageIcon,
    chip: "bg-primary/12 text-primary",
    label: "Image",
  },
  document: {
    icon: FileTextIcon,
    chip: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
    label: "Doc",
  },
  audio: {
    icon: Music2Icon,
    chip: "bg-rose-500/12 text-rose-700 dark:text-rose-400",
    label: "Audio",
  },
  video: {
    icon: FilmIcon,
    chip: "bg-sky-500/12 text-sky-700 dark:text-sky-400",
    label: "Video",
  },
} as const

export function SortableDefault() {
  const [items, setItems] = useState<MediaSortItem[]>(defaultItems)

  const handleValueChange = (next: MediaSortItem[]) => {
    setItems(next)
    toast.success("Asset order updated", {
      description: next.map((item, i) => `${i + 1}. ${item.title}`).join(" · "),
    })
  }

  return (
    <div className="mx-auto w-full max-w-lg px-1 py-2 sm:p-4">
      <div className="mb-3 flex items-start justify-between gap-2 px-0.5 sm:items-end sm:gap-3">
        <div className="min-w-0 text-start">
          <p className="text-sm font-semibold tracking-tight">Asset pipeline</p>
          <p className="text-xs text-muted-foreground">
            Delivery order for the launch page
          </p>
        </div>
        <Badge variant="secondary" className="shrink-0 tabular-nums">
          {items.length} files
        </Badge>
      </div>

      <Sortable
        value={items}
        onValueChange={handleValueChange}
        getItemValue={(item) => item.id}
        strategy="vertical"
        className="space-y-2"
      >
        {items.map((item, index) => {
          const meta = typeMeta[item.type]
          const Icon = meta.icon
          return (
            <SortableItem key={item.id} value={item.id}>
              <div className="flex items-center gap-2 rounded-[12px] border border-border/70 bg-card p-2 transition-colors hover:border-border sm:gap-3 sm:p-2.5 sm:pe-3">
                <SortableItemHandle className="cursor-grab! flex size-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground">
                  <GripVerticalIcon className="size-4" />
                </SortableItemHandle>

                <span className="hidden w-5 shrink-0 text-center font-mono text-[11px] tabular-nums text-muted-foreground sm:inline">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-9",
                    meta.chip
                  )}
                >
                  <Icon className="size-4" />
                </div>

                <div className="min-w-0 flex-1 text-start">
                  <p className="truncate text-sm font-medium leading-tight">
                    {item.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    <span className="sm:hidden">{meta.label} · </span>
                    <span className="hidden sm:inline">{item.description}</span>
                    <span className="sm:hidden">{item.size}</span>
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={cn(
                    "hidden shrink-0 border-transparent md:inline-flex",
                    meta.chip
                  )}
                >
                  {meta.label}
                </Badge>
                <span className="hidden shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground sm:inline">
                  {item.size}
                </span>
              </div>
            </SortableItem>
          )
        })}
      </Sortable>
    </div>
  )
}
