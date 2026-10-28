"use client"

import * as React from "react"
import {
  ChevronRightIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
  FileTextIcon,
  FolderIcon,
  ImageIcon,
  LinkIcon,
  ShieldIcon,
  UserPlusIcon,
  UsersIcon,
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

const MEMBERS = [
  { name: "Alex Rivera", initials: "AR", role: "Owner" },
  { name: "Sam Okonkwo", initials: "SO", role: "Editor" },
  { name: "Jordan Lee", initials: "JL", role: "Viewer" },
  { name: "Taylor Chen", initials: "TC", role: "Editor" },
] as const

const ITEMS = [
  {
    id: "1",
    name: "Brand guidelines.pdf",
    type: "file" as const,
    access: "Can edit",
    sharedBy: "Alex Rivera",
    initials: "AR",
    modified: "2h ago",
  },
  {
    id: "2",
    name: "Launch assets",
    type: "folder" as const,
    access: "Can view",
    sharedBy: "Sam Okonkwo",
    initials: "SO",
    modified: "Yesterday",
  },
  {
    id: "3",
    name: "hero_locked.png",
    type: "image" as const,
    access: "Restricted",
    sharedBy: "Jordan Lee",
    initials: "JL",
    modified: "3d ago",
  },
  {
    id: "4",
    name: "Press kit",
    type: "folder" as const,
    access: "Can edit",
    sharedBy: "Taylor Chen",
    initials: "TC",
    modified: "Oct 24",
  },
  {
    id: "5",
    name: "external_brief.pdf",
    type: "file" as const,
    access: "Link anyone",
    sharedBy: "Alex Rivera",
    initials: "AR",
    modified: "Oct 20",
  },
] as const

function AccessBadge({ access }: { access: string }) {
  if (access === "Restricted") {
    return (
      <Badge variant="destructive" className="gap-1 font-normal">
        <ShieldIcon className="size-3" aria-hidden />
        {access}
      </Badge>
    )
  }
  if (access === "Link anyone") {
    return (
      <Badge variant="secondary" className="gap-1 font-normal">
        <LinkIcon className="size-3" aria-hidden />
        {access}
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="font-normal">
      {access}
    </Badge>
  )
}

/** Shared team folder — member strip + ACL badges. */
export default function FileManager({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex h-[min(50rem,100svh)] w-full min-w-0 flex-col overflow-hidden border border-border/70 bg-canvas text-foreground",
        className
      )}
      {...props}
    >
      <header className="shrink-0 border-b border-border/70 bg-card px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-start">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <UsersIcon className="size-4 text-primary" aria-hidden />
              <h1 className="text-lg font-semibold tracking-tight">
                Shared · Marketing
              </h1>
              <Badge>Team</Badge>
            </div>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
            >
              <span>Shared with me</span>
              <ChevronRightIcon className="icon-dir size-3.5" aria-hidden />
              <span className="font-medium text-foreground">Marketing</span>
            </nav>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" className="cursor-pointer gap-1.5">
              <UserPlusIcon className="size-3.5" aria-hidden />
              Invite
            </Button>
            <Button type="button" size="sm" className="cursor-pointer gap-1.5">
              <LinkIcon className="size-3.5" aria-hidden />
              Copy link
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/70 pt-4">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Members
          </p>
          <div className="flex items-center -space-x-2 rtl:space-x-reverse">
            {MEMBERS.map((m) => (
              <Avatar
                key={m.initials}
                className="size-8 border-2 border-card"
                title={`${m.name} · ${m.role}`}
              >
                <AvatarFallback className="text-[10px]">{m.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-xs text-muted-foreground" dir="ltr">
            {MEMBERS.length} people · 2 editors
          </span>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Shared by</TableHead>
              <TableHead>Modified</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ITEMS.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <span className="inline-flex items-center gap-2 font-medium">
                    {item.type === "folder" ? (
                      <FolderIcon className="size-4 text-amber-500" aria-hidden />
                    ) : item.type === "image" ? (
                      <ImageIcon className="size-4 text-primary" aria-hidden />
                    ) : (
                      <FileTextIcon className="size-4 text-destructive" aria-hidden />
                    )}
                    {item.name}
                  </span>
                </TableCell>
                <TableCell>
                  <AccessBadge access={item.access} />
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="text-[10px]">
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {item.sharedBy}
                    </span>
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground" dir="ltr">
                  {item.modified}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        className="cursor-pointer"
                        aria-label={`Actions for ${item.name}`}
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
                        <UserPlusIcon className="size-4" aria-hidden />
                        Manage access
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
