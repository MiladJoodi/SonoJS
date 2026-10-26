"use client"

import * as React from "react"
import { ArrowLeftIcon, CheckIcon } from "lucide-react"

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
} from "@sonojs/ui/components/command"
import { Switch } from "@sonojs/ui/components/switch"

type Integration = {
  id: string
  name: string
  blurb: string
  category: "Build" | "Talk"
  mark: string
  about: string
  points: string[]
}

const ITEMS: Integration[] = [
  {
    id: "linear",
    name: "Linear",
    blurb: "Issue tracking",
    category: "Build",
    mark: "Li",
    about: "Ship faster with streamlined issue tracking and cycle planning.",
    points: ["Cycles & projects", "Git sync", "Insights", "Keyboard-first"],
  },
  {
    id: "notion",
    name: "Notion",
    blurb: "Docs & wiki",
    category: "Build",
    mark: "No",
    about: "One workspace for specs, wikis, and lightweight databases.",
    points: ["Pages & DBs", "Templates", "Realtime collab", "Embeds"],
  },
  {
    id: "figma",
    name: "Figma",
    blurb: "Design",
    category: "Build",
    mark: "Fi",
    about: "Bring design files and comments into your product workflow.",
    points: ["File links", "Comment sync", "Dev mode", "Libraries"],
  },
  {
    id: "slack",
    name: "Slack",
    blurb: "Team chat",
    category: "Talk",
    mark: "Sl",
    about: "Push alerts and approve workflows where the team already lives.",
    points: ["Channels", "Slash cmds", "Threads", "Workflows"],
  },
  {
    id: "discord",
    name: "Discord",
    blurb: "Community",
    category: "Talk",
    mark: "Di",
    about: "Community voice and text for product updates and support.",
    points: ["Roles", "Webhooks", "Forums", "Stages"],
  },
]

export default function CommandMenu({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)
  const [q, setQ] = React.useState("")
  const [selected, setSelected] = React.useState(ITEMS[0])
  const [mobileDetail, setMobileDetail] = React.useState(false)
  const [on, setOn] = React.useState<Record<string, boolean>>({ linear: true })

  const filtered = ITEMS.filter(
    (i) =>
      !q ||
      i.name.toLowerCase().includes(q.toLowerCase()) ||
      i.blurb.toLowerCase().includes(q.toLowerCase())
  )
  const build = filtered.filter((i) => i.category === "Build")
  const talk = filtered.filter((i) => i.category === "Talk")

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
          Integration studio
        </p>
        <p className="text-start text-xs text-muted-foreground">
          Split list and detail — works on mobile and desktop.
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-10 sm:px-6">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Browse integrations
        </Button>
      </main>

      <CommandDialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v)
          if (!v) {
            setMobileDetail(false)
            setQ("")
          }
        }}
        className="p-0"
        style={{ maxWidth: "min(48rem, calc(100% - 1.5rem))" }}
      >
        <Command
          shouldFilter={false}
          className="rounded-lg bg-popover text-popover-foreground"
        >
          <CommandInput
            value={q}
            onValueChange={setQ}
            placeholder="Search integrations…"
          />
          <div className="grid min-h-0 md:grid-cols-2 md:min-h-[22rem]">
            <div
              className={cn(
                "min-w-0 border-border/70 md:border-e",
                mobileDetail ? "hidden md:block" : "block"
              )}
            >
              <CommandList className="max-h-[min(22rem,55dvh)] md:max-h-[22rem]">
                <CommandEmpty>No integrations.</CommandEmpty>
                {build.length > 0 ? (
                  <CommandGroup heading="Build">
                    {build.map((item) => (
                      <Row
                        key={item.id}
                        item={item}
                        active={selected.id === item.id}
                        onPick={() => {
                          setSelected(item)
                          setMobileDetail(true)
                        }}
                      />
                    ))}
                  </CommandGroup>
                ) : null}
                {build.length > 0 && talk.length > 0 ? (
                  <CommandSeparator />
                ) : null}
                {talk.length > 0 ? (
                  <CommandGroup heading="Talk">
                    {talk.map((item) => (
                      <Row
                        key={item.id}
                        item={item}
                        active={selected.id === item.id}
                        onPick={() => {
                          setSelected(item)
                          setMobileDetail(true)
                        }}
                      />
                    ))}
                  </CommandGroup>
                ) : null}
              </CommandList>
            </div>

            <div
              className={cn(
                "flex max-h-[min(22rem,55dvh)] min-w-0 flex-col gap-4 overflow-y-auto p-4 sm:p-5 md:max-h-[22rem]",
                mobileDetail ? "flex" : "hidden md:flex"
              )}
            >
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-1.5 self-start text-sm text-muted-foreground hover:text-foreground md:hidden"
                onClick={() => setMobileDetail(false)}
              >
                <ArrowLeftIcon className="size-3.5 icon-dir" aria-hidden />
                Back
              </button>

              <div className="flex items-start justify-between gap-3">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-[12px] border border-border/70 bg-muted text-sm font-semibold text-foreground"
                  aria-hidden
                  dir="ltr"
                >
                  {selected.mark}
                </div>
                <Switch
                  checked={!!on[selected.id]}
                  onCheckedChange={() =>
                    setOn((prev) => ({
                      ...prev,
                      [selected.id]: !prev[selected.id],
                    }))
                  }
                  aria-label={`Enable ${selected.name}`}
                />
              </div>

              <div className="space-y-1.5 text-start">
                <h2 className="text-h4 text-foreground">{selected.name}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selected.about}
                </p>
              </div>

              <ul className="space-y-2">
                {selected.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-start text-sm text-muted-foreground"
                  >
                    <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-2 pt-2">
                <Button type="button" className="w-full cursor-pointer">
                  Connect
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full cursor-pointer"
                >
                  Docs
                </Button>
              </div>
            </div>
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}

function Row({
  item,
  active,
  onPick,
}: {
  item: Integration
  active: boolean
  onPick: () => void
}) {
  return (
    <CommandItem
      value={item.id}
      onSelect={onPick}
      className={cn(
        "cursor-pointer gap-2.5",
        active && "border-border/70 text-foreground"
      )}
    >
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-card text-xs font-semibold text-foreground"
        aria-hidden
        dir="ltr"
      >
        {item.mark}
      </span>
      <div className="flex min-w-0 flex-col text-start">
        <span className="text-sm font-medium">{item.name}</span>
        <span className="truncate text-xs text-muted-foreground">
          {item.blurb}
        </span>
      </div>
    </CommandItem>
  )
}
