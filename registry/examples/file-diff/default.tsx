"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import {
  FileDiff,
  type FileDiffLine,
  type FileDiffStatus,
} from "@sonojs/ui/components/file-diff"

const FULL_LINES: FileDiffLine[] = [
  {
    id: "1",
    type: "context",
    oldLine: 12,
    newLine: 12,
    content: "export function rankVendors(list: Vendor[]) {",
  },
  {
    id: "2",
    type: "removed",
    oldLine: 13,
    content: "  return list.sort((a, b) => a.name.localeCompare(b.name))",
  },
  {
    id: "3",
    type: "added",
    newLine: 13,
    content: "  return list",
  },
  {
    id: "4",
    type: "added",
    newLine: 14,
    content: "    .filter((v) => v.inStock)",
  },
  {
    id: "5",
    type: "added",
    newLine: 15,
    content: "    .sort((a, b) => b.score - a.score)",
  },
  {
    id: "6",
    type: "context",
    oldLine: 14,
    newLine: 16,
    content: "}",
  },
]

const COPY = FULL_LINES.map((line) => {
  const mark =
    line.type === "added" ? "+" : line.type === "removed" ? "-" : " "
  return `${mark}${line.content}`
}).join("\n")

export function FileDiffDefault() {
  const [replay, setReplay] = React.useState(0)
  const [lines, setLines] = React.useState<FileDiffLine[]>([])
  const [status, setStatus] = React.useState<FileDiffStatus>("streaming")

  React.useEffect(() => {
    setLines([])
    setStatus("streaming")
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setLines(FULL_LINES.slice(0, i))
      if (i >= FULL_LINES.length) {
        window.clearInterval(id)
        window.setTimeout(() => setStatus("complete"), 400)
      }
    }, 280)
    return () => window.clearInterval(id)
  }, [replay])

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <FileDiff
        key={replay}
        file="src/lib/vendors.ts"
        lines={lines}
        status={status}
        collapseOnComplete={false}
        copyText={COPY}
        defaultOpen
      />
      {status === "complete" ? (
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
