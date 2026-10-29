"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import {
  Citation,
  Citations,
  type CitationItem,
} from "@sonojs/ui/components/citations"

const PREFIX = "demo-sources"
const FULL: CitationItem[] = [
  {
    id: "mdn",
    title: "Array.prototype.sort()",
    domain: "developer.mozilla.org",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
  },
  {
    id: "tc39",
    title: "ECMAScript Language Specification",
    domain: "tc39.es",
    url: "https://tc39.es/ecma262/",
  },
  {
    id: "node",
    title: "Node.js — Buffer",
    domain: "nodejs.org",
    url: "https://nodejs.org/api/buffer.html",
  },
]

export function CitationsDefault() {
  const [replay, setReplay] = React.useState(0)
  const [items, setItems] = React.useState<CitationItem[]>([])
  const done = items.length >= FULL.length

  React.useEffect(() => {
    setItems([])
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setItems(FULL.slice(0, i))
      if (i >= FULL.length) window.clearInterval(id)
    }, 450)
    return () => window.clearInterval(id)
  }, [replay])

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
      <p className="text-sm leading-relaxed text-foreground/85">
        Stable sorts keep equal elements in order
        <Citation citationId="mdn" index={1} idPrefix={PREFIX} />
        when the comparator returns zero
        <Citation citationId="tc39" index={2} idPrefix={PREFIX} />.
      </p>
      <Citations
        key={replay}
        citations={items}
        idPrefix={PREFIX}
        defaultOpen
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
