"use client"

import * as React from "react"
import { CheckIcon, MoreHorizontalIcon, ShareIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { cn } from "@/lib/utils"

export type ChatStarterActionsProps = {
  transcript: string
  onExport: () => void
  onToggleUnread: () => void
  onDelete: () => void
  disabled?: boolean
  className?: string
}

export function ChatStarterActions({
  transcript,
  onExport,
  onToggleUnread,
  onDelete,
  disabled = false,
  className,
}: ChatStarterActionsProps) {
  const [shared, setShared] = React.useState(false)

  React.useEffect(() => {
    if (!shared) return
    const timer = setTimeout(() => setShared(false), 1600)
    return () => clearTimeout(timer)
  }, [shared])

  const share = async () => {
    if (!transcript) return
    try {
      if (navigator.share) {
        await navigator.share({ text: transcript })
        return
      }
      await navigator.clipboard.writeText(transcript)
      setShared(true)
    } catch {
      // Dismissed share sheet or refused clipboard.
    }
  }

  return (
    <div className={cn("flex shrink-0 items-center gap-0.5", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={share}
        disabled={disabled}
        aria-label={shared ? "Transcript copied" : "Share chat"}
        title={shared ? "Transcript copied" : "Share chat"}
        className="size-7"
      >
        {shared ? (
          <CheckIcon className="size-[18px]" aria-hidden />
        ) : (
          <ShareIcon className="size-[18px]" aria-hidden />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            disabled={disabled}
            aria-label="More actions for this chat"
            className="size-7"
          >
            <MoreHorizontalIcon className="size-[18px]" aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[190px]">
          <DropdownMenuItem onSelect={onExport}>Export chats</DropdownMenuItem>
          <DropdownMenuItem onSelect={onToggleUnread}>
            Mark as unread
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={onDelete}
            className="text-destructive focus:text-destructive"
          >
            Delete chat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
