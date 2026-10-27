"use client"

import * as React from "react"
import {
  ChevronRightIcon,
  ClockIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
  FileArchiveIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileVideoIcon,
  FolderIcon,
  HardDriveIcon,
  ImageIcon,
  LayoutGridIcon,
  ListIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
  Trash2Icon,
  UploadIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Input } from "@sonojs/ui/components/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

const BREADCRUMBS = ["My Drive", "Projects", "Q3 Campaign"] as const

const NAV = [
  { id: "drive", label: "My Drive", icon: HardDriveIcon, active: true },
  { id: "shared", label: "Shared with me", icon: UsersIcon },
  { id: "recent", label: "Recent", icon: ClockIcon },
  { id: "starred", label: "Starred", icon: StarIcon },
  { id: "trash", label: "Trash", icon: Trash2Icon },
] as const

const FOLDERS = [
  {
    id: 1,
    name: "Assets",
    items: 42,
    size: "1.2 GB",
    modified: "Today, 10:23 AM",
  },
  { id: 2, name: "Drafts", items: 12, size: "45 MB", modified: "Yesterday" },
  {
    id: 3,
    name: "Final Exports",
    items: 5,
    size: "3.4 GB",
    modified: "Oct 24, 2026",
  },
] as const

const FILES = [
  {
    id: 1,
    name: "campaign_brief_v2.pdf",
    type: "pdf" as const,
    size: "2.4 MB",
    modified: "Today, 11:45 AM",
    owner: "Alex R.",
    initials: "AR",
  },
  {
    id: 2,
    name: "hero_banner_final.png",
    type: "image" as const,
    size: "4.1 MB",
    modified: "Yesterday",
    owner: "Sam K.",
    initials: "SK",
  },
  {
    id: 3,
    name: "budget_estimate.xlsx",
    type: "sheet" as const,
    size: "1.1 MB",
    modified: "Oct 25, 2026",
    owner: "Alex R.",
    initials: "AR",
  },
  {
    id: 4,
    name: "promo_video_draft.mp4",
    type: "video" as const,
    size: "145 MB",
    modified: "Oct 22, 2026",
    owner: "Taylor J.",
    initials: "TJ",
  },
  {
    id: 5,
    name: "source_files.zip",
    type: "archive" as const,
    size: "850 MB",
    modified: "Oct 20, 2026",
    owner: "Sam K.",
    initials: "SK",
  },
] as const

type FileType = (typeof FILES)[number]["type"]

function FileTypeIcon({
  type,
  className,
}: {
  type: FileType
  className?: string
}) {
  const cls = cn("size-8 shrink-0", className)
  switch (type) {
    case "pdf":
      return <FileTextIcon className={cn(cls, "text-destructive")} aria-hidden />
    case "image":
      return <ImageIcon className={cn(cls, "text-primary")} aria-hidden />
    case "video":
      return (
        <FileVideoIcon className={cn(cls, "text-violet-600 dark:text-violet-400")} aria-hidden />
      )
    case "archive":
      return (
        <FileArchiveIcon
          className={cn(cls, "text-amber-600 dark:text-amber-400")}
          aria-hidden
        />
      )
    default:
      return (
        <FileSpreadsheetIcon
          className={cn(cls, "text-emerald-600 dark:text-emerald-400")}
          aria-hidden
        />
      )
  }
}

function ItemMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="shrink-0"
          aria-label="More options"
        >
          <EllipsisVerticalIcon className="size-4" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem>
          <DownloadIcon className="size-4" aria-hidden />
          Download
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UsersIcon className="size-4" aria-hidden />
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2Icon className="size-4" aria-hidden />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function FileManager({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

  return (
    <div
      className={cn(
        "flex h-[min(50rem,100svh)] w-full min-w-0 overflow-hidden border border-border/70 bg-canvas text-foreground",
        className
      )}
      {...props}
    >
      <aside className="hidden h-full w-60 shrink-0 flex-col border-e border-border/70 bg-card md:flex">
        <div className="border-b border-border/70 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" className="w-full justify-between">
                New
                <PlusIcon className="size-4" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>
                <FolderIcon className="size-4" aria-hidden />
                New Folder
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UploadIcon className="size-4" aria-hidden />
                File Upload
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UploadIcon className="size-4" aria-hidden />
                Folder Upload
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2" aria-label="Drive">
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                type="button"
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3",
                  item.active &&
                    "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                )}
              >
                <Icon className="size-4" aria-hidden />
                {item.label}
              </Button>
            )
          })}
        </nav>

        <div className="border-t border-border/70 p-4">
          <p className="mb-2 text-sm font-semibold">Storage</p>
          <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[65%] rounded-full bg-primary" />
          </div>
          <p className="text-xs text-muted-foreground">65 GB of 100 GB used</p>
          <Button type="button" variant="outline" size="sm" className="mt-3 w-full">
            Upgrade Storage
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border/70 bg-card px-4">
          <div className="relative hidden w-full max-w-md sm:block">
            <SearchIcon
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              placeholder="Search in Drive..."
              aria-label="Search in Drive"
              className="bg-muted/50 ps-10"
            />
          </div>
          <div className="ms-auto flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="hidden sm:inline-flex"
              aria-label="Starred items"
            >
              <StarIcon className="size-4" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="sm:hidden"
              aria-label="Upload files"
            >
              <UploadIcon className="size-4" aria-hidden />
            </Button>
            <Avatar size="sm" className="ms-2">
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex h-14 shrink-0 items-center justify-between gap-3 bg-canvas px-4 sm:px-6">
          <nav
            className="flex min-w-0 items-center gap-1 overflow-x-auto text-sm whitespace-nowrap"
            aria-label="Breadcrumb"
          >
            {BREADCRUMBS.map((crumb, idx) => (
              <React.Fragment key={crumb}>
                {idx > 0 ? (
                  <ChevronRightIcon
                    className="icon-dir size-4 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                ) : null}
                <span
                  className={cn(
                    "shrink-0 font-medium",
                    idx === BREADCRUMBS.length - 1
                      ? "text-foreground"
                      : "cursor-pointer text-muted-foreground hover:text-foreground"
                  )}
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>
          <div
            className="flex shrink-0 gap-0.5 rounded-md bg-muted/60 p-1"
            role="group"
            aria-label="View mode"
          >
            <Button
              type="button"
              size="icon-xs"
              variant={viewMode === "grid" ? "default" : "ghost"}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGridIcon className="size-4" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon-xs"
              variant={viewMode === "list" ? "default" : "ghost"}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              onClick={() => setViewMode("list")}
            >
              <ListIcon className="size-4" aria-hidden />
            </Button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
          <div className="space-y-6">
            <section aria-labelledby="file-manager-01-folders">
              <h2
                id="file-manager-01-folders"
                className="mb-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
              >
                Folders
              </h2>
              {viewMode === "grid" ? (
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {FOLDERS.map((folder) => (
                    <li key={folder.id}>
                      <div className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border/70 bg-card p-4 transition-shadow hover:shadow-soft">
                        <div className="flex min-w-0 items-center gap-3">
                          <FolderIcon
                            className="size-5 shrink-0 text-muted-foreground"
                            fill="currentColor"
                            aria-hidden
                          />
                          <span className="truncate text-sm font-medium">
                            {folder.name}
                          </span>
                        </div>
                        <ItemMenu />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="overflow-hidden rounded-lg border border-border/70 bg-card">
                  {FOLDERS.map((folder, idx) => (
                    <li
                      key={folder.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-3 p-3 hover:bg-muted/40",
                        idx !== 0 && "border-t border-border/70"
                      )}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <FolderIcon
                          className="size-4 shrink-0 text-muted-foreground"
                          fill="currentColor"
                          aria-hidden
                        />
                        <span className="truncate text-sm font-medium">
                          {folder.name}
                        </span>
                      </div>
                      <span className="hidden w-32 shrink-0 text-xs text-muted-foreground sm:block">
                        {folder.modified}
                      </span>
                      <ItemMenu />
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section aria-labelledby="file-manager-01-files">
              <h2
                id="file-manager-01-files"
                className="mb-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
              >
                Files
              </h2>
              {viewMode === "grid" ? (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {FILES.map((file) => (
                    <li key={file.id}>
                      <div className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border/70 bg-card">
                        <div className="absolute start-2 top-2 z-10">
                          <Checkbox
                            id={`file-manager-01-select-${file.id}`}
                            aria-label={`Select ${file.name}`}
                          />
                        </div>
                        <div className="flex h-28 items-center justify-center border-b border-border/70 bg-muted/40">
                          <FileTypeIcon type={file.type} />
                        </div>
                        <div className="flex items-start justify-between gap-1 p-3">
                          <p
                            className="min-w-0 flex-1 truncate text-xs font-medium"
                            title={file.name}
                          >
                            {file.name}
                          </p>
                          <ItemMenu />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="overflow-hidden rounded-lg border border-border/70 bg-card">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="px-4">Name</TableHead>
                        <TableHead className="px-4">Owner</TableHead>
                        <TableHead className="px-4">Last Modified</TableHead>
                        <TableHead className="px-4">File Size</TableHead>
                        <TableHead className="w-12 px-4" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {FILES.map((file) => (
                        <TableRow key={file.id} className="cursor-pointer">
                          <TableCell className="px-4">
                            <div className="flex items-center gap-3">
                              <FileTypeIcon
                                type={file.type}
                                className="size-4"
                              />
                              <span className="font-medium">{file.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Avatar size="sm">
                                <AvatarFallback>{file.initials}</AvatarFallback>
                              </Avatar>
                              {file.owner}
                            </div>
                          </TableCell>
                          <TableCell className="px-4 text-muted-foreground">
                            {file.modified}
                          </TableCell>
                          <TableCell className="px-4 text-muted-foreground" dir="ltr">
                            {file.size}
                          </TableCell>
                          <TableCell className="px-4">
                            <ItemMenu />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
