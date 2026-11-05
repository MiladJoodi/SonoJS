"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  PlusIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { cn } from "@/lib/utils"

export type ChatThreadSummary = {
  id: string
  title: string
  updatedAt: number
  unread?: boolean
}

export type ChatStarterHistoryProps = {
  threads: ChatThreadSummary[]
  activeId: string
  onSelect: (id: string) => void
  onNewChat: () => void
  onRename: (id: string, title: string) => void
  onToggleUnread: (id: string) => void
  onDelete: (id: string) => void
  onExport: () => void
  disabled?: boolean
  className?: string
}

const THREAD_CAPACITY = 30
const STORAGE_KEY = "sonojs:chat-starter-threads"

export function ChatStarterHistory({
  threads,
  activeId,
  onSelect,
  onNewChat,
  onRename,
  onToggleUnread,
  onDelete,
  onExport,
  disabled = false,
  className,
}: ChatStarterHistoryProps) {
  return (
    <aside
      aria-label="Chat history"
      className={cn(
        "flex h-full w-[260px] shrink-0 flex-col gap-6 overflow-hidden rounded-3xl border border-border/70 bg-muted/30 p-3",
        className
      )}
    >
      <button
        type="button"
        onClick={onNewChat}
        disabled={disabled}
        className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <PlusIcon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        New chat
      </button>

      <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto [scrollbar-width:none]">
        <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">
          Recent
        </p>

        {threads.length === 0 ? (
          <p className="px-2 text-xs text-muted-foreground">
            Chats you start show up here.
          </p>
        ) : (
          threads.map((thread) => (
            <ThreadRow
              key={thread.id}
              thread={thread}
              active={thread.id === activeId}
              disabled={disabled}
              onSelect={onSelect}
              onRename={onRename}
              onToggleUnread={onToggleUnread}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      <div className="mt-auto flex items-center gap-1 border-t border-border/70 pt-3 pe-1">
        <AccountStrip threads={threads} />
        <button
          type="button"
          onClick={onExport}
          disabled={threads.length === 0}
          aria-label={
            threads.length === 0
              ? "No chats to export"
              : `Export ${threads.length} chats`
          }
          title={
            threads.length === 0
              ? "No chats to export"
              : `Export ${threads.length} chats`
          }
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <DownloadIcon className="size-3.5 shrink-0" aria-hidden />
        </button>
      </div>
    </aside>
  )
}

function AccountStrip({ threads }: { threads: ChatThreadSummary[] }) {
  const [usageOpen, setUsageOpen] = React.useState(false)
  const [storedBytes, setStoredBytes] = React.useState(0)
  const chatPercent = Math.min(
    100,
    Math.round((threads.length / THREAD_CAPACITY) * 100)
  )
  const storagePercent = Math.min(
    100,
    Math.round((storedBytes / (5 * 1024 * 1024)) * 100)
  )

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) setUsageOpen(false)
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-xl px-1 py-1 text-start transition-colors hover:bg-muted"
        >
          <Avatar size="sm">
            <AvatarFallback className="text-[10px]">S</AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">
            Sono Guest
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top" className="w-[248px]">
        <button
          type="button"
          onClick={() => {
            if (!usageOpen) {
              try {
                setStoredBytes(
                  (window.localStorage.getItem(STORAGE_KEY)?.length ?? 0) * 2
                )
              } catch {
                setStoredBytes(0)
              }
            }
            setUsageOpen((open) => !open)
          }}
          aria-expanded={usageOpen}
          className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-start text-sm hover:bg-muted"
        >
          <span className="flex-1">Usage left</span>
          <ChevronDownIcon
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              usageOpen && "rotate-180"
            )}
          />
        </button>
        {usageOpen ? (
          <div className="flex flex-col gap-1 px-2 pb-2 text-xs">
            <div className="flex justify-between gap-2 text-muted-foreground">
              <span>Chats</span>
              <span>
                {threads.length} of {THREAD_CAPACITY} · {chatPercent}%
              </span>
            </div>
            <div className="flex justify-between gap-2 text-muted-foreground">
              <span>Storage</span>
              <span>
                {formatBytes(storedBytes)} · {storagePercent}%
              </span>
            </div>
          </div>
        ) : null}
        <DropdownMenuItem disabled>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ThreadRow({
  thread,
  active,
  disabled,
  onSelect,
  onRename,
  onToggleUnread,
  onDelete,
}: {
  thread: ChatThreadSummary
  active: boolean
  disabled: boolean
  onSelect: (id: string) => void
  onRename: (id: string, title: string) => void
  onToggleUnread: (id: string) => void
  onDelete: (id: string) => void
}) {
  const [renaming, setRenaming] = React.useState(false)
  const [draft, setDraft] = React.useState(thread.title)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (!renaming) return
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [renaming])

  const commit = () => {
    const next = draft.trim()
    if (next && next !== thread.title) onRename(thread.id, next)
    setRenaming(false)
  }

  if (renaming) {
    return (
      <div className="rounded-xl bg-muted px-2 py-1.5">
        <label className="sr-only" htmlFor={`rename-${thread.id}`}>
          Rename chat
        </label>
        <input
          id={`rename-${thread.id}`}
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              commit()
            }
            if (event.key === "Escape") {
              event.preventDefault()
              setDraft(thread.title)
              setRenaming(false)
            }
          }}
          onBlur={commit}
          className="w-full bg-transparent text-xs text-foreground outline-none"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "group/row relative flex items-center rounded-xl transition-colors",
        active ? "bg-muted" : "hover:bg-muted/70"
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(thread.id)}
        disabled={disabled}
        aria-current={active ? "true" : undefined}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 py-1.5 ps-2 text-start disabled:cursor-not-allowed disabled:opacity-50"
      >
        {thread.unread ? (
          <span
            aria-label="Unread"
            className="size-1.5 shrink-0 rounded-full bg-primary"
          />
        ) : null}
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-xs",
            thread.unread ? "font-medium text-foreground" : "text-muted-foreground"
          )}
        >
          {thread.title}
        </span>
      </button>

      <span className="relative flex size-7 shrink-0 items-center justify-center pe-1">
        <span className="text-[10px] text-muted-foreground opacity-100 transition-opacity group-hover/row:opacity-0">
          {relativeTime(thread.updatedAt)}
        </span>
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/row:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={`More actions for ${thread.title}`}
                className="inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground"
              >
                <MoreHorizontalIcon className="size-4" aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[190px]">
              <DropdownMenuItem
                onSelect={() => {
                  setDraft(thread.title)
                  setRenaming(true)
                }}
              >
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onToggleUnread(thread.id)}>
                Mark as unread
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => onDelete(thread.id)}
                className="text-destructive focus:text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </span>
    </div>
  )
}

function relativeTime(at: number) {
  const seconds = Math.max(0, Math.round((Date.now() - at) / 1000))
  if (seconds < 60) return "now"
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h`
  return `${Math.round(hours / 24)}d`
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
