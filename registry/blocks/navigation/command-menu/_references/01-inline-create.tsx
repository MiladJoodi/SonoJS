/**
 * Pending: Navigation → Command Menu (01)
 * Job: Embedded create palette — no dialog. Sits in page chrome.
 * Audit: semantic tokens (dark/light) · w-full min-w-0 (responsive) ·
 * text-start + shortcut dir=ltr (RTL).
 */
"use client"

import {
  ClipboardListIcon,
  FileTextIcon,
  FolderPlusIcon,
  SparklesIcon,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"

export default function InlineCreate() {
  return (
    <div className="w-full min-w-0 max-w-sm overflow-hidden rounded-[12px] border border-border/70 bg-card text-card-foreground shadow-soft">
      <div className="border-b border-border/70 px-3 py-2.5">
        <p className="text-start text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Quick create
        </p>
      </div>
      <Command className="rounded-none bg-transparent">
        <CommandInput placeholder="Create or search…" />
        <CommandList>
          <CommandEmpty>Nothing to create.</CommandEmpty>
          <CommandGroup heading="Start">
            <CommandItem className="cursor-pointer">
              <FileTextIcon />
              <span className="min-w-0 flex-1 truncate text-start">
                Blank document
              </span>
              <CommandShortcut dir="ltr">⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem className="cursor-pointer">
              <ClipboardListIcon />
              <span className="min-w-0 flex-1 truncate text-start">
                Task from template
              </span>
              <CommandShortcut dir="ltr">⌘T</CommandShortcut>
            </CommandItem>
            <CommandItem className="cursor-pointer">
              <FolderPlusIcon />
              <span className="min-w-0 flex-1 truncate text-start">
                New project
              </span>
            </CommandItem>
            <CommandItem className="cursor-pointer">
              <SparklesIcon />
              <span className="min-w-0 flex-1 truncate text-start">
                Draft with AI
              </span>
              <CommandShortcut dir="ltr">⌘⇧A</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
