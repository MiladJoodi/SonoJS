"use client"

import * as React from "react"
import { FileCodeIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@sonojs/ui/components/command"
import { Kbd, KbdGroup } from "@sonojs/ui/components/kbd"

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

export default function CommandMenu({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)

  return (
    <div
      className={cn(
        "flex min-h-[28rem] w-full flex-1 flex-col bg-canvas",
        className
      )}
      {...props}
    >
      <header className="border-b border-border/70 px-4 py-3 sm:px-6">
        <p className="text-start text-sm font-medium text-foreground">
          Code jump
        </p>
        <p className="text-start text-xs text-muted-foreground">
          IDE-style file search with extension pills.
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-10 sm:px-6">
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
      </main>

      <CommandDialog open={open} onOpenChange={setOpen} dir="ltr">
        <Command className="bg-popover text-start text-popover-foreground">
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
                  <div className="flex min-w-0 flex-1 items-baseline gap-2">
                    <span className="shrink-0 font-medium">{f.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {f.path}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="ms-auto shrink-0 font-mono"
                  >
                    {f.ext}
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
