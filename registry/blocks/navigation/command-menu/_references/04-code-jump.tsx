/**
 * Pending: Navigation → Command Menu (04)
 * Job: IDE-style file jump — path muted, extension pill, ⌘P trigger.
 * Audit: path/ext dir=ltr islands · trigger w-full max-w · semantic tokens.
 */
"use client"

import * as React from "react"
import { FileCodeIcon, SearchIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

const FILES = [
  { name: "page.tsx", path: "app/(app)/docs/page.tsx", ext: "tsx" },
  { name: "layout.tsx", path: "app/layout.tsx", ext: "tsx" },
  { name: "globals.css", path: "app/globals.css", ext: "css" },
  { name: "utils.ts", path: "lib/utils.ts", ext: "ts" },
  {
    name: "button.tsx",
    path: "packages/ui/src/components/button.tsx",
    ext: "tsx",
  },
  {
    name: "command.tsx",
    path: "packages/ui/src/components/command.tsx",
    ext: "tsx",
  },
  { name: "registry-items.mjs", path: "scripts/registry-items.mjs", ext: "mjs" },
  { name: "AGENTS.md", path: "AGENTS.md", ext: "md" },
] as const

export default function CodeJump() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="w-full max-w-56 cursor-pointer justify-start gap-2"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4 shrink-0" aria-hidden />
        <span className="min-w-0 flex-1 truncate text-start text-muted-foreground">
          Jump to file…
        </span>
        <KbdGroup className="shrink-0" dir="ltr">
          <Kbd>⌘</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="bg-popover text-popover-foreground">
          <CommandInput placeholder="Fuzzy path or filename…" />
          <CommandList className="max-h-[min(20rem,50dvh)]">
            <CommandEmpty>No files.</CommandEmpty>
            <CommandGroup heading="Workspace">
              {FILES.map((f) => (
                <CommandItem
                  key={f.path}
                  value={`${f.name} ${f.path}`}
                  className="cursor-pointer gap-2.5"
                >
                  <FileCodeIcon className="size-4 shrink-0" aria-hidden />
                  <div
                    className="flex min-w-0 flex-1 items-baseline gap-2"
                    dir="ltr"
                  >
                    <span className="shrink-0 font-medium">{f.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {f.path}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="ms-auto shrink-0 font-mono"
                    dir="ltr"
                  >
                    {f.ext}
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
