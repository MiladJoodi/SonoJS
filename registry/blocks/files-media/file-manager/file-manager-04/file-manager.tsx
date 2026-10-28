"use client"

import * as React from "react"
import {
  CalendarIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileVideoIcon,
  FolderIcon,
  HardDriveIcon,
  ImageIcon,
  Share2Icon,
  StarIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const FILES = [
  {
    id: "1",
    name: "campaign_brief_v2.pdf",
    type: "pdf" as const,
    size: "2.4 MB",
    modified: "Today, 11:45 AM",
    created: "Oct 12, 2026",
    owner: "Alex Rivera",
    initials: "AR",
    location: "My Drive / Projects / Q3",
    starred: true,
  },
  {
    id: "2",
    name: "hero_banner_final.png",
    type: "image" as const,
    size: "4.1 MB",
    modified: "Yesterday",
    created: "Oct 18, 2026",
    owner: "Sam Okonkwo",
    initials: "SO",
    location: "My Drive / Projects / Q3",
    starred: false,
  },
  {
    id: "3",
    name: "budget_estimate.xlsx",
    type: "sheet" as const,
    size: "1.1 MB",
    modified: "Oct 25, 2026",
    created: "Oct 20, 2026",
    owner: "Alex Rivera",
    initials: "AR",
    location: "My Drive / Finance",
    starred: false,
  },
  {
    id: "4",
    name: "promo_video_draft.mp4",
    type: "video" as const,
    size: "145 MB",
    modified: "Oct 22, 2026",
    created: "Oct 21, 2026",
    owner: "Taylor Chen",
    initials: "TC",
    location: "My Drive / Media",
    starred: true,
  },
  {
    id: "5",
    name: "Assets",
    type: "folder" as const,
    size: "1.2 GB",
    modified: "Today, 10:23 AM",
    created: "Sep 1, 2026",
    owner: "Alex Rivera",
    initials: "AR",
    location: "My Drive / Projects / Q3",
    starred: false,
  },
] as const

type FileType = (typeof FILES)[number]["type"]

function TypeIcon({ type, className }: { type: FileType; className?: string }) {
  const cls = cn("size-5 shrink-0", className)
  if (type === "folder")
    return <FolderIcon className={cn(cls, "text-amber-500")} aria-hidden />
  if (type === "pdf")
    return <FileTextIcon className={cn(cls, "text-destructive")} aria-hidden />
  if (type === "image")
    return <ImageIcon className={cn(cls, "text-primary")} aria-hidden />
  if (type === "video")
    return (
      <FileVideoIcon
        className={cn(cls, "text-violet-600 dark:text-violet-400")}
        aria-hidden
      />
    )
  return (
    <FileSpreadsheetIcon
      className={cn(cls, "text-emerald-600 dark:text-emerald-400")}
      aria-hidden
    />
  )
}

/** List + end-side properties inspector. */
export default function FileManager({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [selectedId, setSelectedId] = React.useState<(typeof FILES)[number]["id"]>(
    FILES[0].id
  )
  const selected = FILES.find((f) => f.id === selectedId) ?? FILES[0]

  return (
    <div
      className={cn(
        "flex h-[min(50rem,100svh)] w-full min-w-0 overflow-hidden border border-border/70 bg-canvas text-foreground",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col bg-card">
        <header className="flex shrink-0 items-center gap-2 border-b border-border/70 px-4 py-3">
          <HardDriveIcon className="size-4 text-muted-foreground" aria-hidden />
          <h1 className="text-sm font-semibold">My Drive</h1>
          <Badge variant="secondary" className="ms-auto" dir="ltr">
            {FILES.length} items
          </Badge>
        </header>
        <ul className="min-h-0 flex-1 overflow-y-auto p-2 pb-8" role="listbox" aria-label="Files">
          {FILES.map((file) => {
            const on = file.id === selectedId
            return (
              <li key={file.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={on}
                  onClick={() => setSelectedId(file.id)}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2.5 text-start transition-colors",
                    on
                      ? "bg-primary/10 text-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <TypeIcon type={file.type} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {file.name}
                    </span>
                    <span className="block text-xs text-muted-foreground" dir="ltr">
                      {file.size} · {file.modified}
                    </span>
                  </span>
                  {file.starred ? (
                    <StarIcon
                      className="size-3.5 shrink-0 fill-amber-400 text-amber-400"
                      aria-label="Starred"
                    />
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <aside
        className="hidden w-72 shrink-0 flex-col border-s border-border/70 bg-card md:flex lg:w-80"
        aria-label="Details"
      >
        <div className="border-b border-border/70 px-4 py-4 text-start">
          <div className="mb-3 flex size-14 items-center justify-center rounded-[12px] bg-muted">
            <TypeIcon type={selected.type} className="size-7" />
          </div>
          <h2 className="text-base font-semibold leading-snug break-all">
            {selected.name}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground capitalize">
            {selected.type === "folder" ? "Folder" : `${selected.type} file`}
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 pb-8">
          <dl className="space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="flex w-24 shrink-0 items-center gap-1.5 text-muted-foreground">
                <HardDriveIcon className="size-3.5" aria-hidden />
                Size
              </dt>
              <dd className="font-medium tabular-nums" dir="ltr">
                {selected.size}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="flex w-24 shrink-0 items-center gap-1.5 text-muted-foreground">
                <CalendarIcon className="size-3.5" aria-hidden />
                Modified
              </dt>
              <dd className="font-medium" dir="ltr">
                {selected.modified}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="flex w-24 shrink-0 items-center gap-1.5 text-muted-foreground">
                <CalendarIcon className="size-3.5" aria-hidden />
                Created
              </dt>
              <dd className="font-medium" dir="ltr">
                {selected.created}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="flex w-24 shrink-0 items-center gap-1.5 text-muted-foreground">
                <UserIcon className="size-3.5" aria-hidden />
                Owner
              </dt>
              <dd className="flex items-center gap-2 font-medium">
                <Avatar className="size-6">
                  <AvatarFallback className="text-[10px]">
                    {selected.initials}
                  </AvatarFallback>
                </Avatar>
                {selected.owner}
              </dd>
            </div>
          </dl>

          <Separator />

          <div className="text-start">
            <p className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Location
            </p>
            <p className="text-sm" dir="ltr">
              {selected.location}
            </p>
          </div>
        </div>

        <div className="space-y-2 border-t border-border/70 p-3">
          <Button type="button" className="w-full cursor-pointer gap-1.5">
            <DownloadIcon className="size-3.5" aria-hidden />
            Download
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline" className="cursor-pointer gap-1.5">
              <Share2Icon className="size-3.5" aria-hidden />
              Share
            </Button>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer gap-1.5 text-destructive hover:text-destructive"
            >
              <Trash2Icon className="size-3.5" aria-hidden />
              Delete
            </Button>
          </div>
        </div>
      </aside>
    </div>
  )
}
