"use client"

import * as React from "react"
import type { ChangeEvent } from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ImageOffIcon,
  LayoutGridIcon,
  LayoutListIcon,
  UploadIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

import gallery1 from "./images/gallery-1.webp"
import gallery2 from "./images/gallery-2.webp"
import gallery3 from "./images/gallery-3.webp"
import gallery4 from "./images/gallery-4.webp"
import gallery5 from "./images/gallery-5.webp"
import gallery6 from "./images/gallery-6.webp"
import gallery7 from "./images/gallery-7.webp"
import gallery8 from "./images/gallery-8.webp"
import gallery9 from "./images/gallery-9.webp"
import gallery10 from "./images/gallery-10.webp"
import gallery11 from "./images/gallery-11.webp"
import gallery12 from "./images/gallery-12.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

interface MediaItem {
  id: string
  src: string
  alt: string
  width: number
  height: number
  size: string
  date: string
  tags: string[]
}

const ITEMS: MediaItem[] = [
  {
    id: "1",
    src: assetSrc(gallery1),
    alt: "Coyote in the woods",
    width: 800,
    height: 1200,
    size: "1.2 MB",
    date: "Jun 15, 2026",
    tags: ["nature", "wildlife"],
  },
  {
    id: "2",
    src: assetSrc(gallery2),
    alt: "Phone on a desk",
    width: 800,
    height: 533,
    size: "0.9 MB",
    date: "Jun 14, 2026",
    tags: ["technology", "design"],
  },
  {
    id: "3",
    src: assetSrc(gallery3),
    alt: "An afternoon ride",
    width: 800,
    height: 800,
    size: "1.4 MB",
    date: "Jun 13, 2026",
    tags: ["travel", "portrait"],
  },
  {
    id: "4",
    src: assetSrc(gallery4),
    alt: "Skating in the city",
    width: 800,
    height: 1067,
    size: "1.1 MB",
    date: "Jun 12, 2026",
    tags: ["urban", "street"],
  },
  {
    id: "5",
    src: assetSrc(gallery5),
    alt: "Bridge after dark",
    width: 800,
    height: 533,
    size: "2.1 MB",
    date: "Jun 11, 2026",
    tags: ["architecture", "night"],
  },
  {
    id: "6",
    src: assetSrc(gallery6),
    alt: "Forest in the mist",
    width: 800,
    height: 600,
    size: "0.8 MB",
    date: "Jun 10, 2026",
    tags: ["nature", "landscape"],
  },
  {
    id: "7",
    src: assetSrc(gallery7),
    alt: "On the trail",
    width: 800,
    height: 1100,
    size: "1.6 MB",
    date: "Jun 9, 2026",
    tags: ["travel", "outdoors"],
  },
  {
    id: "8",
    src: assetSrc(gallery8),
    alt: "Last light",
    width: 800,
    height: 533,
    size: "0.7 MB",
    date: "Jun 8, 2026",
    tags: ["nature", "sunset"],
  },
  {
    id: "9",
    src: assetSrc(gallery9),
    alt: "Coastal village",
    width: 800,
    height: 900,
    size: "1.3 MB",
    date: "Jun 7, 2026",
    tags: ["architecture", "travel"],
  },
  {
    id: "10",
    src: assetSrc(gallery10),
    alt: "Mountain ridgeline",
    width: 800,
    height: 533,
    size: "0.6 MB",
    date: "Jun 6, 2026",
    tags: ["nature", "landscape"],
  },
  {
    id: "11",
    src: assetSrc(gallery11),
    alt: "A day at the beach",
    width: 800,
    height: 1066,
    size: "1.8 MB",
    date: "Jun 5, 2026",
    tags: ["travel", "coast"],
  },
  {
    id: "12",
    src: assetSrc(gallery12),
    alt: "A quiet corner",
    width: 800,
    height: 533,
    size: "2.4 MB",
    date: "Jun 4, 2026",
    tags: ["interior", "design"],
  },
]

const ALL_TAGS = [
  "All",
  "nature",
  "travel",
  "urban",
  "architecture",
  "design",
] as const

function AssetImage({
  item,
  thumbnail = false,
}: {
  item: MediaItem
  thumbnail?: boolean
}) {
  const [failed, setFailed] = React.useState(false)

  if (failed) {
    return (
      <div
        className="flex min-h-32 items-center justify-center gap-2 bg-muted p-5 text-sm text-muted-foreground"
        role="img"
        aria-label={`${item.alt}: preview unavailable`}
      >
        <ImageOffIcon className="size-5" aria-hidden />
        Preview unavailable
      </div>
    )
  }

  return (
    <img
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      onError={() => setFailed(true)}
      loading={thumbnail ? "lazy" : "eager"}
      className={
        thumbnail ? "h-auto w-full" : "max-h-[60vh] w-full object-contain"
      }
    />
  )
}

export default function MediaGallery({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [items, setItems] = React.useState(ITEMS)
  const [activeTag, setActiveTag] = React.useState("All")
  const [view, setView] = React.useState<"masonry" | "list">("masonry")
  const [selected, setSelected] = React.useState<string[]>([])
  const [removed, setRemoved] = React.useState<string[]>([])
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [notice, setNotice] = React.useState("")
  const launcher = React.useRef<HTMLButtonElement | null>(null)
  const upload = React.useRef<HTMLInputElement | null>(null)
  const localUrls = React.useRef<string[]>([])

  React.useEffect(() => {
    const urls = localUrls.current
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  const available = items.filter((item) => !removed.includes(item.id))
  const visible = available.filter(
    (item) => activeTag === "All" || item.tags.includes(activeTag)
  )
  const tags = [
    ...ALL_TAGS,
    ...(items.some((item) => item.tags.includes("uploads")) ? ["uploads"] : []),
  ]
  const activeIndex = visible.findIndex((item) => item.id === activeId)
  const active = visible[activeIndex]
  const allSelected =
    visible.length > 0 && visible.every((item) => selected.includes(item.id))
  const someSelected = selected.length > 0 && !allSelected
  const totalMb = available
    .reduce((total, item) => total + parseFloat(item.size), 0)
    .toFixed(1)

  const closeViewer = () => {
    setActiveId(null)
    requestAnimationFrame(() => launcher.current?.focus())
  }

  const move = (direction: number) => {
    const next = visible[activeIndex + direction]
    if (next) setActiveId(next.id)
  }

  const toggleSelection = (id: string, checked: boolean) =>
    setSelected((previous) =>
      checked
        ? [...new Set([...previous, id])]
        : previous.filter((value) => value !== id)
    )

  const addImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    const images = files.filter((file) => file.type.startsWith("image/"))
    const additions = images.map((file) => {
      const src = URL.createObjectURL(file)
      localUrls.current.push(src)
      return {
        id: crypto.randomUUID(),
        src,
        alt: file.name,
        width: 800,
        height: 600,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        date: "Just added",
        tags: ["uploads"],
      } satisfies MediaItem
    })
    if (additions.length) {
      setItems((previous) => [...additions, ...previous])
      setActiveTag("All")
      setSelected([])
    }
    setNotice(
      images.length
        ? `${images.length} image${images.length === 1 ? "" : "s"} added locally. Files stay in this browser preview.`
        : "Choose an image file to add to the gallery."
    )
    event.target.value = ""
  }

  return (
    <div
      className={cn("w-full bg-canvas py-6 text-foreground sm:py-8", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Media Gallery
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {available.length} assets · {totalMb} MB total
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="flex gap-0.5 rounded-md bg-muted/60 p-1"
              role="group"
              aria-label="Gallery layout"
            >
              <Button
                type="button"
                size="icon-xs"
                variant={view === "masonry" ? "default" : "ghost"}
                aria-label="Masonry view"
                aria-pressed={view === "masonry"}
                onClick={() => setView("masonry")}
              >
                <LayoutGridIcon className="size-4" aria-hidden />
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant={view === "list" ? "default" : "ghost"}
                aria-label="List view"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                <LayoutListIcon className="size-4" aria-hidden />
              </Button>
            </div>
            <input
              ref={upload}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              aria-label="Add images"
              onChange={addImages}
            />
            <Button type="button" onClick={() => upload.current?.click()}>
              <UploadIcon className="size-4" aria-hidden />
              Upload
            </Button>
          </div>
        </header>

        <div
          className="flex flex-wrap gap-1 border-b border-border/70 pb-4"
          role="group"
          aria-label="Filter by tag"
        >
          {tags.map((tag) => (
            <Button
              key={tag}
              type="button"
              size="sm"
              className="min-h-10 shrink-0 capitalize"
              variant={activeTag === tag ? "secondary" : "ghost"}
              aria-pressed={activeTag === tag}
              onClick={() => {
                setActiveTag(tag)
                setSelected([])
              }}
            >
              {tag}
            </Button>
          ))}
        </div>

        <div className="my-4 flex min-h-10 flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="media-gallery-01-select-all"
                checked={
                  allSelected ? true : someSelected ? "indeterminate" : false
                }
                disabled={!visible.length}
                onCheckedChange={() =>
                  setSelected(allSelected ? [] : visible.map((item) => item.id))
                }
              />
              <Label
                htmlFor="media-gallery-01-select-all"
                className="cursor-pointer text-sm font-normal"
              >
                Select all
              </Label>
            </div>
            <p role="status" className="text-sm text-muted-foreground">
              {selected.length
                ? `${selected.length} selected`
                : `${visible.length} assets`}
            </p>
          </div>
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSelected([])}
              >
                Clear
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  setRemoved((previous) => [...previous, ...selected])
                  setNotice(
                    `${selected.length} assets removed. Use Undo removal to restore them.`
                  )
                  setSelected([])
                }}
              >
                Remove selected
              </Button>
            </div>
          ) : removed.length > 0 ? (
            <Button
              type="button"
              variant="ghost"
              className="text-primary hover:text-primary"
              onClick={() => {
                setRemoved([])
                setNotice("Removed assets restored.")
              }}
            >
              Undo removal
            </Button>
          ) : null}
        </div>

        {notice ? (
          <p role="status" className="mb-4 text-sm text-muted-foreground">
            {notice}
          </p>
        ) : null}

        {visible.length > 0 ? (
          <ul
            aria-label="Media assets"
            className={
              view === "masonry"
                ? "columns-1 gap-4 min-[480px]:columns-2 md:columns-3 xl:columns-4"
                : "divide-y divide-border/70 overflow-hidden rounded-lg border border-border/70 bg-card"
            }
          >
            {visible.map((item) => {
              const isSelected = selected.includes(item.id)
              return (
                <li
                  key={item.id}
                  className={
                    view === "masonry"
                      ? cn(
                          "mb-4 break-inside-avoid overflow-hidden rounded-lg border bg-card shadow-soft",
                          isSelected
                            ? "border-primary ring-1 ring-primary"
                            : "border-border/70"
                        )
                      : cn(
                          "flex items-center gap-3 p-3 sm:gap-4",
                          isSelected && "bg-primary/5"
                        )
                  }
                >
                  {view === "list" ? (
                    <Checkbox
                      id={`media-gallery-01-select-${item.id}`}
                      checked={isSelected}
                      aria-label={`Select ${item.alt}`}
                      onCheckedChange={(checked) =>
                        toggleSelection(item.id, checked === true)
                      }
                    />
                  ) : null}
                  <button
                    type="button"
                    className={cn(
                      "block cursor-pointer overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
                      view === "masonry"
                        ? "w-full"
                        : "size-16 shrink-0 rounded-md [&_img]:size-full [&_img]:object-cover"
                    )}
                    aria-label={`View ${item.alt}`}
                    onClick={(event) => {
                      launcher.current = event.currentTarget
                      setActiveId(item.id)
                    }}
                  >
                    <AssetImage item={item} thumbnail />
                  </button>
                  <div
                    className={cn(
                      "flex min-w-0 flex-1 items-start justify-between gap-3",
                      view === "masonry" && "p-3"
                    )}
                  >
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold">
                        {item.alt}
                      </h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        <span dir="ltr">{item.size}</span> · {item.date}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {view === "masonry" ? (
                      <Checkbox
                        id={`media-gallery-01-select-${item.id}`}
                        checked={isSelected}
                        aria-label={`Select ${item.alt}`}
                        className="mt-0.5"
                        onCheckedChange={(checked) =>
                          toggleSelection(item.id, checked === true)
                        }
                      />
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-border/70 p-10 text-center">
            <h2 className="text-lg font-semibold">No images in this view</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose another tag or restore the removed assets.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-5"
              onClick={() => {
                setRemoved([])
                setActiveTag("All")
              }}
            >
              Show all assets
            </Button>
          </div>
        )}

        <Dialog
          open={!!active}
          onOpenChange={(open) => {
            if (!open) closeViewer()
          }}
        >
          <DialogContent
            className="gap-0 overflow-hidden p-0 sm:max-w-3xl"
            style={{ maxWidth: "min(48rem, calc(100% - 2rem))" }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault()
                move(event.key === "ArrowLeft" ? -1 : 1)
              }
            }}
          >
            <DialogHeader className="border-b border-border/70 px-6 py-4 pe-12 text-start">
              <DialogTitle>{active?.alt ?? "Image preview"}</DialogTitle>
              <DialogDescription className="sr-only">
                Full-size preview. Use arrow keys to move between images.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-muted/40 px-4 py-4 sm:px-6">
              {active ? <AssetImage key={active.id} item={active} /> : null}
            </div>
            <DialogFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 px-6 py-4 sm:justify-between">
              <div className="text-sm text-muted-foreground" aria-live="polite">
                <p>
                  {activeIndex + 1} of {visible.length}
                </p>
                <p className="mt-1 text-xs">
                  <span dir="ltr">{active?.size}</span> · {active?.date}
                </p>
              </div>
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="ghost">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-xs"
                  aria-label="Previous image"
                  disabled={activeIndex <= 0}
                  onClick={() => move(-1)}
                >
                  <ChevronLeftIcon className="icon-dir size-4" aria-hidden />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-xs"
                  aria-label="Next image"
                  disabled={activeIndex >= visible.length - 1}
                  onClick={() => move(1)}
                >
                  <ChevronRightIcon className="icon-dir size-4" aria-hidden />
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
