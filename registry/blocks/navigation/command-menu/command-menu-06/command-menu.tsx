"use client"

import * as React from "react"
import {
  Heading1Icon,
  ImageIcon,
  ListIcon,
  SparklesIcon,
  TableIcon,
  TextCursorInputIcon,
  WorkflowIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
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

const SLASH = [
  {
    group: "Generate",
    items: [
      {
        id: "ai-continue",
        label: "Continue writing",
        hint: "Extend from cursor",
        icon: SparklesIcon,
        keys: "⌘↵",
      },
      {
        id: "ai-brief",
        label: "Summarize selection",
        hint: "Short bullet brief",
        icon: TextCursorInputIcon,
        keys: "",
      },
      {
        id: "ai-flow",
        label: "Turn into workflow",
        hint: "Steps + owners",
        icon: WorkflowIcon,
        keys: "",
      },
    ],
  },
  {
    group: "Insert",
    items: [
      {
        id: "h1",
        label: "Heading",
        hint: "/h1",
        icon: Heading1Icon,
        keys: "",
      },
      {
        id: "list",
        label: "Bulleted list",
        hint: "/list",
        icon: ListIcon,
        keys: "",
      },
      {
        id: "table",
        label: "Table",
        hint: "/table",
        icon: TableIcon,
        keys: "",
      },
      {
        id: "image",
        label: "Image",
        hint: "/img",
        icon: ImageIcon,
        keys: "",
      },
    ],
  },
] as const

export default function CommandMenu({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)
  const [q, setQ] = React.useState("/")

  const needle = q.replace(/^\//, "").toLowerCase()
  const visible = SLASH.map((section) => ({
    ...section,
    items: section.items.filter(
      (it) =>
        !needle ||
        it.label.toLowerCase().includes(needle) ||
        it.hint.toLowerCase().includes(needle) ||
        it.id.includes(needle)
    ),
  })).filter((section) => section.items.length > 0)

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
          Slash studio
        </p>
        <p className="text-start text-xs text-muted-foreground">
          Editor insert palette — keep the leading slash.
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-10 sm:px-6">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={() => {
            setQ("/")
            setOpen(true)
          }}
        >
          Insert with /
        </Button>
      </main>

      <CommandDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) setQ("/")
        }}
      >
        <Command
          shouldFilter={false}
          className="bg-popover text-popover-foreground"
        >
          <CommandInput
            value={q}
            onValueChange={(v) => setQ(v.startsWith("/") ? v : `/${v}`)}
            placeholder="/ask or /insert…"
            dir="ltr"
            className="text-start"
          />
          <CommandList className="max-h-[min(20rem,50dvh)]">
            <CommandEmpty>
              Unknown slash. Try{" "}
              <span className="font-mono" dir="ltr">
                /ai
              </span>{" "}
              or{" "}
              <span className="font-mono" dir="ltr">
                /h1
              </span>
              .
            </CommandEmpty>
            {visible.map((section, idx) => (
              <React.Fragment key={section.group}>
                {idx > 0 ? <CommandSeparator /> : null}
                <CommandGroup heading={section.group}>
                  {section.items.map((it) => (
                    <CommandItem
                      key={it.id}
                      value={it.id}
                      className="cursor-pointer gap-2.5"
                    >
                      <it.icon aria-hidden />
                      <div className="flex min-w-0 flex-1 flex-col text-start">
                        <span className="text-sm font-medium">{it.label}</span>
                        <span
                          className="truncate font-mono text-xs text-muted-foreground"
                          dir="ltr"
                        >
                          {it.hint}
                        </span>
                      </div>
                      {it.keys ? (
                        <CommandShortcut dir="ltr">{it.keys}</CommandShortcut>
                      ) : null}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </React.Fragment>
            ))}
          </CommandList>
          <p className="border-t border-border/70 px-3 py-2 text-start text-xs text-muted-foreground">
            Tip: keep the leading{" "}
            <span className="font-mono" dir="ltr">
              /
            </span>{" "}
            — this palette is for editor inserts, not app navigation.
          </p>
        </Command>
      </CommandDialog>
    </div>
  )
}
