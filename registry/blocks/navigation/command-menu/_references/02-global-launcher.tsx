/**
 * Pending: Navigation → Command Menu (02)
 * Job: Global ⌘K launcher — pages + actions + keyboard footer.
 * Audit: semantic tokens · wrapping footer on narrow · shortcut/kbd dir=ltr ·
 * Enter hint uses ↵ (direction-neutral).
 */
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
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export default function GlobalLauncher() {
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
    <>
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
    </>
  )
}
