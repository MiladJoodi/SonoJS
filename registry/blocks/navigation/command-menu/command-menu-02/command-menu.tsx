"use client"

import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCardIcon,
  HomeIcon,
  InboxIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

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
  CommandSeparator,
  CommandShortcut,
} from "@sonojs/ui/components/command"
import { Kbd, KbdGroup } from "@sonojs/ui/components/kbd"

export default function CommandMenu({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

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
          App launcher
        </p>
        <p className="text-start text-xs text-muted-foreground">
          Global command palette with keyboard hints.
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-10 sm:px-6">
        <Button
          type="button"
          variant="outline"
          className="max-w-full cursor-pointer gap-2"
          onClick={() => setOpen(true)}
        >
          <span className="truncate">Jump anywhere</span>
          <KbdGroup className="ms-auto shrink-0" dir="ltr">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
        <p className="max-w-xs text-center text-sm text-muted-foreground">
          Open with the button or press{" "}
          <span dir="ltr" className="font-mono text-foreground">
            ⌘K
          </span>
          .
        </p>
      </main>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="bg-popover text-popover-foreground">
          <CommandInput placeholder="Go to page or run action…" />
          <CommandList className="max-h-[min(20rem,50dvh)]">
            <CommandEmpty>No matches.</CommandEmpty>
            <CommandGroup heading="Go to">
              <CommandItem className="cursor-pointer">
                <HomeIcon />
                <span className="min-w-0 flex-1 truncate text-start">Home</span>
                <CommandShortcut dir="ltr">G H</CommandShortcut>
              </CommandItem>
              <CommandItem className="cursor-pointer">
                <InboxIcon />
                <span className="min-w-0 flex-1 truncate text-start">Inbox</span>
                <CommandShortcut dir="ltr">G I</CommandShortcut>
              </CommandItem>
              <CommandItem className="cursor-pointer">
                <UserIcon />
                <span className="min-w-0 flex-1 truncate text-start">
                  Profile
                </span>
                <CommandShortcut dir="ltr">G P</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem className="cursor-pointer">
                <PlusIcon />
                <span className="min-w-0 flex-1 truncate text-start">
                  New issue
                </span>
                <CommandShortcut dir="ltr">C</CommandShortcut>
              </CommandItem>
              <CommandItem className="cursor-pointer">
                <CreditCardIcon />
                <span className="min-w-0 flex-1 truncate text-start">
                  Billing
                </span>
              </CommandItem>
              <CommandItem className="cursor-pointer">
                <SettingsIcon />
                <span className="min-w-0 flex-1 truncate text-start">
                  Settings
                </span>
                <CommandShortcut dir="ltr">⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-border/70 px-3 py-2.5">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Badge
                  variant="secondary"
                  className="gap-0.5 px-1"
                  dir="ltr"
                  aria-hidden
                >
                  <ArrowUpIcon className="size-3" />
                  <ArrowDownIcon className="size-3" />
                </Badge>
                Move
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Badge variant="secondary" className="px-1.5" dir="ltr">
                  ↵
                </Badge>
                Open
              </span>
            </div>
            <span
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
              dir="ltr"
            >
              <Kbd>esc</Kbd>
              <span dir="auto">close</span>
            </span>
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}
