"use client"

import { MessageSquareIcon, PlusIcon, XIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

export type ChatStarterNavRailProps = {
  onNewChat: () => void
  onClose?: () => void
  mobile?: boolean
  className?: string
}

export function ChatStarterNavRail({
  onNewChat,
  onClose,
  mobile = false,
  className,
}: ChatStarterNavRailProps) {
  return (
    <aside
      aria-label="App navigation"
      className={cn(
        "flex h-full w-[220px] shrink-0 flex-col gap-4 overflow-hidden rounded-3xl border border-border/70 bg-muted/30 p-3",
        className
      )}
    >
      <div className="flex items-center gap-2 px-1">
        <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
          S
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">Sono</p>
          <p className="truncate text-[11px] text-muted-foreground">Chat starter</p>
        </div>
        {mobile && onClose ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Close navigation"
            onClick={onClose}
            className="size-7"
          >
            <XIcon className="size-4" />
          </Button>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => {
          onNewChat()
          onClose?.()
        }}
        className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        <PlusIcon className="size-4 text-muted-foreground" aria-hidden />
        New chat
      </button>

      <div className="flex flex-col gap-1">
        <p className="px-2 text-[11px] font-medium text-muted-foreground">
          Workspace
        </p>
        <span className="flex items-center gap-2 rounded-xl bg-muted px-2 py-2 text-sm font-medium text-foreground">
          <MessageSquareIcon className="size-4 text-muted-foreground" aria-hidden />
          Chat
        </span>
      </div>
    </aside>
  )
}
