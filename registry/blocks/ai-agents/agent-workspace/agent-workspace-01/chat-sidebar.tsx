"use client"

import * as React from "react"
import {
  MoreHorizontalIcon,
  PinIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@sonojs/ui/components/sidebar"
import { cn } from "@/lib/utils"

import type { Thread, WorkspaceUser } from "./types"

const GROUP_LABEL: Record<Thread["group"], string> = {
  today: "Today",
  yesterday: "Yesterday",
  week: "Previous 7 days",
  older: "Older",
}

function groupThreads(threads: Thread[]) {
  const order: Thread["group"][] = ["today", "yesterday", "week", "older"]
  return order
    .map((group) => ({
      group,
      items: threads.filter((t) => !t.pinned && t.group === group),
    }))
    .filter((g) => g.items.length > 0)
}

export function ChatSidebar({
  threads,
  activeId,
  user,
  onSelect,
  onNew,
  onSearch,
  onChange,
}: {
  threads: Thread[]
  activeId: string | null
  user: WorkspaceUser
  onSelect: (id: string) => void
  onNew: () => void
  onSearch: () => void
  onChange: (threads: Thread[]) => void
}) {
  const pinned = threads.filter((t) => t.pinned)
  const groups = groupThreads(threads)

  const remove = (id: string) => {
    onChange(threads.filter((t) => t.id !== id))
  }

  const togglePin = (id: string) => {
    onChange(
      threads.map((t) => (t.id === id ? { ...t, pinned: !t.pinned } : t))
    )
  }

  const renderThread = (thread: Thread) => (
    <SidebarMenuItem key={thread.id}>
      <SidebarMenuButton
        isActive={thread.id === activeId}
        className="h-8"
        onClick={() => onSelect(thread.id)}
      >
        <span className="truncate">{thread.title}</span>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction
            showOnHover
            className="cursor-pointer"
            aria-label="Thread actions"
          >
            <MoreHorizontalIcon className="size-4" aria-hidden />
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="bottom" className="w-40">
          <DropdownMenuItem
            className="gap-2"
            onSelect={() => togglePin(thread.id)}
          >
            <PinIcon className="size-4" aria-hidden />
            {thread.pinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 text-destructive focus:text-destructive"
            onSelect={() => remove(thread.id)}
          >
            <Trash2Icon className="size-4" aria-hidden />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )

  return (
    <Sidebar
      collapsible="offcanvas"
      className="h-full min-h-0 border-e border-sidebar-border"
    >
      <SidebarHeader className="shrink-0 gap-2 p-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            className="h-9 flex-1 justify-start gap-2 rounded-lg"
            onClick={onNew}
          >
            <PlusIcon className="size-4" aria-hidden />
            New chat
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            className="size-9 rounded-lg"
            aria-label="Search chats"
            onClick={onSearch}
          >
            <SearchIcon className="size-4" aria-hidden />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="min-h-0 flex-1">
        {pinned.length > 0 ? (
          <SidebarGroup>
            <SidebarGroupLabel>Pinned</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {pinned.map(renderThread)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}

        {groups.map(({ group, items }) => (
          <SidebarGroup key={group} className="py-1">
            <SidebarGroupLabel className="h-7">{GROUP_LABEL[group]}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {items.map(renderThread)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="mt-auto shrink-0 border-t border-sidebar-border p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-[12px] border border-sidebar-border bg-sidebar-accent/40 px-3 py-2.5"
          )}
        >
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
