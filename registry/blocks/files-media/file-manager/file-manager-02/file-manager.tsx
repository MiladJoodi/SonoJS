"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileVideoIcon,
  FolderIcon,
  HardDriveIcon,
  ImageIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { ScrollArea } from "@sonojs/ui/components/scroll-area"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

const TREE = [
  {
    id: "drive",
    label: "This PC",
    children: [
      {
        id: "docs",
        label: "Documents",
        children: [
          { id: "projects", label: "Projects", children: [] },
          { id: "archive", label: "Archive", children: [] },
        ],
      },
      {
        id: "media",
        label: "Media",
        children: [
          { id: "photos", label: "Photos", children: [] },
          { id: "video", label: "Video", children: [] },
        ],
      },
      { id: "downloads", label: "Downloads", children: [] },
    ],
  },
] as const

const ROWS = [
  {
    id: "1",
    name: "Q3 Campaign",
    kind: "folder" as const,
    size: "—",
    modified: "Today 10:23",
  },
  {
    id: "2",
    name: "brief_v2.pdf",
    kind: "pdf" as const,
    size: "2.4 MB",
    modified: "Today 11:45",
  },
  {
    id: "3",
    name: "hero_banner.png",
    kind: "image" as const,
    size: "4.1 MB",
    modified: "Yesterday",
  },
  {
    id: "4",
    name: "budget.xlsx",
    kind: "sheet" as const,
    size: "1.1 MB",
    modified: "Oct 25",
  },
  {
    id: "5",
    name: "promo_draft.mp4",
    kind: "video" as const,
    size: "145 MB",
    modified: "Oct 22",
  },
  {
    id: "6",
    name: "Assets",
    kind: "folder" as const,
    size: "—",
    modified: "Oct 20",
  },
] as const

type Kind = (typeof ROWS)[number]["kind"]

function KindIcon({ kind }: { kind: Kind }) {
  if (kind === "folder")
    return <FolderIcon className="size-4 text-amber-500" aria-hidden />
  if (kind === "pdf")
    return <FileTextIcon className="size-4 text-destructive" aria-hidden />
  if (kind === "image")
    return <ImageIcon className="size-4 text-primary" aria-hidden />
  if (kind === "video")
    return (
      <FileVideoIcon
        className="size-4 text-violet-600 dark:text-violet-400"
        aria-hidden
      />
    )
  return (
    <FileSpreadsheetIcon
      className="size-4 text-emerald-600 dark:text-emerald-400"
      aria-hidden
    />
  )
}

type TreeNode = {
  id: string
  label: string
  children: readonly TreeNode[]
}

function TreeItem({
  node,
  depth,
  activeId,
  onSelect,
  openIds,
  onToggle,
}: {
  node: TreeNode
  depth: number
  activeId: string
  onSelect: (id: string) => void
  openIds: Set<string>
  onToggle: (id: string) => void
}) {
  const hasKids = node.children.length > 0
  const open = openIds.has(node.id)
  const active = activeId === node.id

  return (
    <li>
      <div
        className={cn(
          "flex items-center gap-0.5 rounded-md pe-2 text-sm",
          active
            ? "bg-primary/10 font-medium text-primary"
            : "text-foreground hover:bg-muted"
        )}
        style={{ paddingInlineStart: `${depth * 12 + 4}px` }}
      >
        {hasKids ? (
          <button
            type="button"
            className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground"
            aria-label={open ? "Collapse" : "Expand"}
            onClick={() => onToggle(node.id)}
          >
            {open ? (
              <ChevronDownIcon className="size-3.5" aria-hidden />
            ) : (
              <ChevronRightIcon className="icon-dir size-3.5" aria-hidden />
            )}
          </button>
        ) : (
          <span className="size-6 shrink-0" aria-hidden />
        )}
        <button
          type="button"
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 truncate py-1.5 text-start"
          onClick={() => onSelect(node.id)}
        >
          {node.id === "drive" ? (
            <HardDriveIcon className="size-3.5 shrink-0" aria-hidden />
          ) : (
            <FolderIcon className="size-3.5 shrink-0 text-amber-500" aria-hidden />
          )}
          <span className="truncate">{node.label}</span>
        </button>
      </div>
      {hasKids && open ? (
        <ul role="group">
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child as TreeNode}
              depth={depth + 1}
              activeId={activeId}
              onSelect={onSelect}
              openIds={openIds}
              onToggle={onToggle}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

/** Finder / Explorer — folder tree + dense table, path bar. */
export default function FileManager({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [activeId, setActiveId] = React.useState("projects")
  const [openIds, setOpenIds] = React.useState(
    () => new Set(["drive", "docs", "projects"])
  )
  const [selected, setSelected] = React.useState("2")

  const onToggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div
      className={cn(
        "flex h-[min(50rem,100svh)] w-full min-w-0 flex-col overflow-hidden border border-border/70 bg-canvas text-foreground",
        className
      )}
      {...props}
    >
      <header className="flex shrink-0 items-center gap-2 border-b border-border/70 bg-card px-3 py-2">
        <HardDriveIcon className="size-4 text-muted-foreground" aria-hidden />
        <nav
          aria-label="Path"
          className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto text-sm"
          dir="ltr"
        >
          <span className="shrink-0 text-muted-foreground">This PC</span>
          <ChevronRightIcon className="icon-dir size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          <span className="shrink-0 text-muted-foreground">Documents</span>
          <ChevronRightIcon className="icon-dir size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          <span className="shrink-0 font-medium">Projects</span>
        </nav>
        <Button type="button" variant="ghost" size="icon-xs" className="cursor-pointer" aria-label="More">
          <MoreHorizontalIcon className="size-4" aria-hidden />
        </Button>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-52 shrink-0 border-e border-border/70 bg-card md:flex md:flex-col">
          <p className="px-3 py-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Folders
          </p>
          <ScrollArea className="flex-1 px-1 pb-3">
            <ul role="tree" aria-label="Folder tree">
              {(TREE as unknown as TreeNode[]).map((node) => (
                <TreeItem
                  key={node.id}
                  node={node}
                  depth={0}
                  activeId={activeId}
                  onSelect={setActiveId}
                  openIds={openIds}
                  onToggle={onToggle}
                />
              ))}
            </ul>
          </ScrollArea>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col bg-card">
          <div className="min-h-0 flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[50%]">Name</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead className="text-end">Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROWS.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={selected === row.id ? "selected" : undefined}
                    className="cursor-pointer"
                    onClick={() => setSelected(row.id)}
                  >
                    <TableCell>
                      <span className="inline-flex items-center gap-2 font-medium">
                        <KindIcon kind={row.kind} />
                        {row.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground" dir="ltr">
                      {row.modified}
                    </TableCell>
                    <TableCell className="text-end tabular-nums text-muted-foreground" dir="ltr">
                      {row.size}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Separator />
          <footer className="flex items-center justify-between gap-3 px-3 py-2 text-xs text-muted-foreground">
            <span dir="ltr">{ROWS.length} items</span>
            <span>Ready</span>
          </footer>
        </div>
      </div>
    </div>
  )
}
