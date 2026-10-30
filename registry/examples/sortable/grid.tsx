"use client"

import { useState } from "react"
import {
  FileTextIcon,
  FilmIcon,
  GripVerticalIcon,
  ImageIcon,
  Music2Icon,
  SparklesIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@sonojs/ui/components/badge"
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@sonojs/ui/components/sortable"
import { cn } from "@sonojs/ui/lib/utils"

interface GridSortItem {
  id: string
  title: string
  description: string
  type: "image" | "document" | "audio" | "video" | "featured"
  size: string
  priority: "high" | "medium" | "low"
}

const defaultGridItems: GridSortItem[] = [
  {
    id: "1",
    title: "Hero Image",
    description: "Main banner",
    type: "image",
    size: "2.4 MB",
    priority: "high",
  },
  {
    id: "2",
    title: "Specs",
    description: "Tech docs",
    type: "document",
    size: "1.2 MB",
    priority: "medium",
  },
  {
    id: "3",
    title: "Demo Video",
    description: "Walkthrough",
    type: "video",
    size: "15.7 MB",
    priority: "high",
  },
  {
    id: "4",
    title: "Audio Guide",
    description: "Voiceover",
    type: "audio",
    size: "8.3 MB",
    priority: "low",
  },
  {
    id: "5",
    title: "Gallery 1",
    description: "Angle A",
    type: "image",
    size: "3.1 MB",
    priority: "medium",
  },
  {
    id: "6",
    title: "Gallery 2",
    description: "Angle B",
    type: "image",
    size: "2.8 MB",
    priority: "medium",
  },
  {
    id: "7",
    title: "Manual",
    description: "Install guide",
    type: "document",
    size: "4.2 MB",
    priority: "high",
  },
  {
    id: "8",
    title: "Ambience",
    description: "Soundtrack",
    type: "audio",
    size: "12.1 MB",
    priority: "low",
  },
  {
    id: "9",
    title: "Feature spotlight",
    description: "Pinned story block for the landing hero",
    type: "featured",
    size: "N/A",
    priority: "high",
  },
]

const typeIcon = {
  image: ImageIcon,
  document: FileTextIcon,
  audio: Music2Icon,
  video: FilmIcon,
  featured: SparklesIcon,
} as const

const priorityDot = {
  high: "bg-rose-500",
  medium: "bg-amber-500",
  low: "bg-muted-foreground/40",
} as const

function getItemSize(type: GridSortItem["type"]) {
  // Mobile: 2 cols — featured spans full width. sm+: 3 cols with 2×2 featured.
  return type === "featured"
    ? "col-span-2 row-span-1 sm:col-span-2 sm:row-span-2"
    : "col-span-1 row-span-1"
}

export function SortableGrid() {
  const [items, setItems] = useState<GridSortItem[]>(defaultGridItems)

  const handleValueChange = (next: GridSortItem[]) => {
    setItems(next)
    toast.success("Board layout saved", {
      description: `Lead: ${next[0]?.title}`,
    })
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-1 py-2 sm:p-4">
      <div className="mb-3 flex items-start justify-between gap-2 px-0.5">
        <div className="min-w-0 text-start">
          <p className="text-sm font-semibold tracking-tight">Content board</p>
          <p className="text-xs text-muted-foreground">
            Mosaic layout · featured spans wide
          </p>
        </div>
        <Badge variant="outline" className="shrink-0">
          Live
        </Badge>
      </div>

      <Sortable
        value={items}
        onValueChange={handleValueChange}
        getItemValue={(item) => item.id}
        strategy="grid"
        className="grid auto-rows-[minmax(6.5rem,auto)] grid-cols-2 gap-2 sm:auto-rows-[minmax(7.5rem,auto)] sm:grid-cols-3 sm:gap-2.5"
      >
        {items.map((item) => {
          const Icon = typeIcon[item.type]
          const featured = item.type === "featured"
          return (
            <SortableItem
              key={item.id}
              value={item.id}
              className={getItemSize(item.type)}
            >
              <div
                className={cn(
                  "group relative flex h-full min-h-[6.5rem] cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card p-2.5 transition-colors hover:bg-accent/40 sm:min-h-[7.5rem] sm:p-3",
                  featured &&
                    "bg-gradient-to-br from-primary/10 via-card to-card"
                )}
              >
                <div
                  className={cn(
                    "absolute inset-y-0 start-0 w-1",
                    featured ? "bg-primary" : priorityDot[item.priority]
                  )}
                />

                <SortableItemHandle className="cursor-grab! absolute end-1.5 top-1.5 z-10 flex size-8 items-center justify-center rounded-md bg-background/90 text-muted-foreground backdrop-blur hover:text-foreground sm:end-2 sm:top-2 sm:size-auto sm:bg-background/80 sm:p-0.5 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                  <GripVerticalIcon className="size-3.5" />
                </SortableItemHandle>

                <div
                  className={cn(
                    "mb-1.5 flex size-7 items-center justify-center rounded-lg sm:mb-2 sm:size-8",
                    featured
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="size-3.5 sm:size-4" />
                </div>

                <div className="min-w-0 flex-1 ps-1 pe-6 text-start sm:pe-0">
                  <h4
                    className={cn(
                      "font-medium leading-snug",
                      featured
                        ? "text-sm sm:text-base"
                        : "truncate text-xs sm:text-sm"
                    )}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={cn(
                      "mt-0.5 text-muted-foreground",
                      featured
                        ? "line-clamp-2 text-[11px] leading-relaxed sm:text-xs"
                        : "truncate text-[11px] sm:text-xs"
                    )}
                  >
                    {item.description}
                  </p>
                </div>

                <div className="mt-1.5 flex items-center justify-between gap-1 ps-1 sm:mt-2 sm:gap-2">
                  <Badge
                    variant="secondary"
                    className="h-5 max-w-[55%] truncate border-transparent px-1.5 text-[10px] capitalize"
                  >
                    {item.type}
                  </Badge>
                  {!featured ? (
                    <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">
                      {item.size}
                    </span>
                  ) : (
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-primary">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </SortableItem>
          )
        })}
      </Sortable>
    </div>
  )
}
