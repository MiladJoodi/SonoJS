"use client"

import * as React from "react"
import { MessageSquareIcon, PlusIcon } from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@sonojs/ui/components/command"

import type { Thread } from "./types"

export function CommandMenu({
  open,
  onOpenChange,
  threads,
  onOpen,
  onNew,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  threads: Thread[]
  onOpen: (id: string) => void
  onNew: (text: string) => void
}) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command>
        <CommandInput placeholder="Search chats or start a prompt..." />
        <CommandList>
          <CommandEmpty>No chats found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem
              value="new-chat"
              onSelect={() => {
                onNew("")
                onOpenChange(false)
              }}
            >
              <PlusIcon className="size-4" aria-hidden />
              New chat
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Recent">
            {threads.map((thread) => (
              <CommandItem
                key={thread.id}
                value={`${thread.title} ${thread.preview}`}
                onSelect={() => {
                  onOpen(thread.id)
                  onOpenChange(false)
                }}
              >
                <MessageSquareIcon className="size-4" aria-hidden />
                <span className="truncate">{thread.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
