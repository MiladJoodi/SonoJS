"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import {
  Citation,
  Citations,
  citationIcons,
  type CitationItem,
} from "@sonojs/ui/components/citations"

const PREFIX = "scoop-sources"

const FULL: CitationItem[] = [
  {
    id: "wiki",
    title: "Ice cream",
    domain: "wikipedia.org",
    url: "#scoop-sources-wiki",
    icon: citationIcons.wiki,
  },
  {
    id: "seriouseats",
    title: "The Science of the Best Chocolate Ice Cream",
    domain: "seriouseats.com",
    url: "#scoop-sources-seriouseats",
    icon: citationIcons.seriouseats,
  },
  {
    id: "nyt",
    title: "How to Make Ice Cream Without a Machine",
    domain: "nytimes.com",
    url: "#scoop-sources-nyt",
    icon: citationIcons.nyt,
  },
]

export function CitationsDefault() {
  const [replay, setReplay] = React.useState(0)
  const [items, setItems] = React.useState<CitationItem[]>([])
  const [open, setOpen] = React.useState(true)
  const done = items.length >= FULL.length

  React.useEffect(() => {
    setItems([])
    setOpen(true)
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setItems(FULL.slice(0, i))
      if (i >= FULL.length) window.clearInterval(id)
    }, 480)
    return () => window.clearInterval(id)
  }, [replay])

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
      <p className="text-sm leading-relaxed text-foreground/85">
        Summer demand spikes for stone-fruit flavors — peach and apricot lead
        <Citation citationId="wiki" index={1} idPrefix={PREFIX} />
        . Check cone inventory before promoting a waffle-bowl special
        <Citation citationId="seriouseats" index={2} idPrefix={PREFIX} />
        .
      </p>
      <Citations
        key={replay}
        citations={items}
        idPrefix={PREFIX}
        open={open}
        onOpenChange={setOpen}
        title="Sources"
      />
      {done ? (
        <button
          type="button"
          onClick={() => setReplay((n) => n + 1)}
          className="inline-flex cursor-pointer items-center gap-1.5 self-start text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcwIcon className="size-3.5" />
          Replay
        </button>
      ) : null}
    </div>
  )
}
