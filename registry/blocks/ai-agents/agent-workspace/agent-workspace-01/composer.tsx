"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  FileTextIcon,
  ImageIcon,
  PaperclipIcon,
  SquareIcon,
  XIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { cn } from "@/lib/utils"

import type { Attachment } from "./types"

const press =
  "ease-[cubic-bezier(0.23,1,0.32,1)] transition-[scale,background-color] duration-150 active:scale-[0.96] motion-reduce:active:scale-100"

export function Composer({
  draft,
  attachment,
  streaming,
  onDraft,
  onAttachment,
  onSend,
  onStop,
}: {
  draft: string
  attachment: Attachment | null
  streaming: boolean
  onDraft: (value: string) => void
  onAttachment: (value: Attachment | null) => void
  onSend: () => void
  onStop: () => void
}) {
  const canSend = draft.trim().length > 0 || attachment !== null

  return (
    <div className="w-full bg-white px-4 pt-3 pb-4 dark:bg-background">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-2.5">
        <form
          className="flex w-full flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (streaming) {
              onStop()
              return
            }
            if (!canSend) return
            onSend()
          }}
        >
          {attachment ? (
            <div className="flex items-center gap-2 px-1">
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border/70 bg-muted/40 py-1 ps-2.5 pe-1 text-xs font-medium">
                {attachment.kind === "image" ? (
                  <ImageIcon
                    className="size-3.5 text-muted-foreground"
                    aria-hidden
                  />
                ) : (
                  <FileTextIcon
                    className="size-3.5 text-muted-foreground"
                    aria-hidden
                  />
                )}
                <span className="truncate" dir="ltr">
                  {attachment.name}
                </span>
                <button
                  type="button"
                  className="inline-flex size-6 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Remove attachment"
                  onClick={() => onAttachment(null)}
                >
                  <XIcon className="size-3.5" aria-hidden />
                </button>
              </span>
            </div>
          ) : null}

          <InputGroup className="h-13 rounded-full border border-border/70 bg-white px-2.5 shadow-xs has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-0 dark:bg-card">
            <InputGroupAddon align="inline-start">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <InputGroupButton
                    type="button"
                    aria-label="Add attachment"
                    className={cn(
                      press,
                      "rounded-full border border-transparent text-muted-foreground hover:border-border/70 hover:bg-muted/60 hover:text-foreground"
                    )}
                    size="icon-sm"
                  >
                    <PaperclipIcon className="size-4" aria-hidden />
                  </InputGroupButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={8}
                  className="w-48 rounded-[14px] p-1.5"
                >
                  <DropdownMenuGroup className="flex flex-col gap-0.5">
                    <DropdownMenuItem
                      className="gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px]"
                      onSelect={() =>
                        onAttachment({
                          id: crypto.randomUUID(),
                          name: "photo.jpg",
                          kind: "image",
                        })
                      }
                    >
                      <ImageIcon className="size-4" aria-hidden />
                      Add photo
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px]"
                      onSelect={() =>
                        onAttachment({
                          id: crypto.randomUUID(),
                          name: "notes.pdf",
                          kind: "file",
                        })
                      }
                    >
                      <FileTextIcon className="size-4" aria-hidden />
                      Add file
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </InputGroupAddon>

            <InputGroupInput
              value={draft}
              placeholder={
                streaming ? "Reply streaming..." : "Message the workspace"
              }
              aria-label="Message"
              className="text-[15px] md:text-[15px]"
              onChange={(e) => onDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  e.currentTarget.form?.requestSubmit()
                }
              }}
            />

            <InputGroupAddon align="inline-end">
              {streaming ? (
                <InputGroupButton
                  type="submit"
                  aria-label="Stop generating"
                  className={cn(press, "rounded-full")}
                  size="icon-sm"
                  variant="secondary"
                >
                  <SquareIcon className="size-3.5 fill-current" aria-hidden />
                </InputGroupButton>
              ) : (
                <InputGroupButton
                  type="submit"
                  aria-label="Send"
                  className={cn(press, "rounded-full")}
                  disabled={!canSend}
                  size="icon-sm"
                  variant="default"
                >
                  <ArrowUpIcon className="size-4" aria-hidden />
                </InputGroupButton>
              )}
            </InputGroupAddon>
          </InputGroup>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  )
}
