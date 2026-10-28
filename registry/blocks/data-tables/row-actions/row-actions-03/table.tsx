"use client"

import * as React from "react"
import {
  ArchiveIcon,
  EllipsisIcon,
  PencilIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

type PostStatus = "published" | "draft" | "scheduled"

type Post = {
  id: string
  title: string
  author: string
  initials: string
  status: PostStatus
  updated: string
  starred: boolean
}

const POSTS: Post[] = [
  {
    id: "1",
    title: "Shipping the new billing ledger",
    author: "Alex Rivera",
    initials: "AR",
    status: "published",
    updated: "2h ago",
    starred: true,
  },
  {
    id: "2",
    title: "Draft: Registry CLI walkthrough",
    author: "Sam Chen",
    initials: "SC",
    status: "draft",
    updated: "Yesterday",
    starred: false,
  },
  {
    id: "3",
    title: "RTL checklist for data tables",
    author: "Jordan Lee",
    initials: "JL",
    status: "scheduled",
    updated: "Mar 18",
    starred: false,
  },
  {
    id: "4",
    title: "Design tokens for dense grids",
    author: "Morgan Blake",
    initials: "MB",
    status: "published",
    updated: "Mar 12",
    starred: true,
  },
  {
    id: "5",
    title: "Notes from the a11y review",
    author: "Casey Ng",
    initials: "CN",
    status: "draft",
    updated: "Mar 8",
    starred: false,
  },
]

const statusStyles: Record<PostStatus, string> = {
  published:
    "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  draft: "border-transparent bg-muted text-muted-foreground",
  scheduled:
    "border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-300",
}

const statusLabel: Record<PostStatus, string> = {
  published: "Published",
  draft: "Draft",
  scheduled: "Scheduled",
}

const iconBtn =
  "size-8 cursor-pointer rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"

function MoreMenu({ title }: { title: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label={`More actions for ${title}`}
          className={iconBtn}
        >
          <EllipsisIcon className="size-4" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem className="cursor-pointer gap-2">
          <PencilIcon className="size-4 text-muted-foreground" aria-hidden />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2">
          <ArchiveIcon className="size-4 text-muted-foreground" aria-hidden />
          Archive
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
          <Trash2Icon className="size-4" aria-hidden />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function RowActions03({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [posts, setPosts] = React.useState(POSTS)

  const toggleStar = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, starred: !p.starred } : p))
    )
  }

  return (
    <div className={cn("w-full min-w-0", className)} {...props}>
      <div className="mb-4 text-start">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Content
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Primary edit + star, with a muted overflow menu for the rest.
        </p>
      </div>

      <ul className="flex flex-col gap-3 md:hidden">
        {posts.map((post) => (
          <li
            key={post.id}
            className="rounded-[12px] border border-border/70 bg-white p-4 shadow-soft dark:bg-card"
          >
            <div className="flex items-start gap-3">
              <Avatar className="size-9">
                <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                  {post.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">
                    {post.title}
                  </p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "h-6 rounded-full px-2.5 font-medium",
                      statusStyles[post.status]
                    )}
                  >
                    {statusLabel[post.status]}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {post.author} · {post.updated}
                </p>
                <div className="mt-3 flex items-center justify-end gap-0.5 border-t border-border/70 pt-3">
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    aria-label={post.starred ? "Unstar" : "Star"}
                    onClick={() => toggleStar(post.id)}
                    className={cn(
                      iconBtn,
                      post.starred && "text-amber-600 hover:text-amber-700"
                    )}
                  >
                    <StarIcon
                      className={cn("size-4", post.starred && "fill-current")}
                      aria-hidden
                    />
                  </Button>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    aria-label={`Edit ${post.title}`}
                    className={iconBtn}
                  >
                    <PencilIcon className="size-4" aria-hidden />
                  </Button>
                  <MoreMenu title={post.title} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden rounded-[12px] border border-border/70 bg-white shadow-soft md:block dark:bg-card">
        <Table className="min-w-180">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 font-medium" />
              <TableHead className="font-medium">Title</TableHead>
              <TableHead className="font-medium">Author</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Updated</TableHead>
              <TableHead className="w-28 font-medium">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} className="group hover:bg-muted/40">
                <TableCell className="pe-0">
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    aria-label={post.starred ? "Unstar" : "Star"}
                    onClick={() => toggleStar(post.id)}
                    className={cn(
                      iconBtn,
                      post.starred
                        ? "text-amber-600 hover:text-amber-700"
                        : "opacity-40 group-hover:opacity-100"
                    )}
                  >
                    <StarIcon
                      className={cn("size-4", post.starred && "fill-current")}
                      aria-hidden
                    />
                  </Button>
                </TableCell>
                <TableCell className="text-sm font-medium text-foreground">
                  {post.title}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-muted text-[10px] font-medium text-muted-foreground">
                        {post.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {post.author}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "h-6 rounded-full px-2.5 font-medium",
                      statusStyles[post.status]
                    )}
                  >
                    {statusLabel[post.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm tabular-nums text-muted-foreground">
                  {post.updated}
                </TableCell>
                <TableCell className="text-end">
                  <div className="flex items-center justify-end gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      aria-label={`Edit ${post.title}`}
                      className={iconBtn}
                    >
                      <PencilIcon className="size-4" aria-hidden />
                    </Button>
                    <MoreMenu title={post.title} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
