"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import { citationIcons } from "@sonojs/ui/components/citations"
import {
  StreamingResponse,
  type StreamingResponseStatus,
} from "@sonojs/ui/components/streaming-response"

const FULL =
  "Peach and apricot lead summer stone-fruit demand. Check cone inventory before promoting a waffle-bowl special — Joy Cone and The Konery both ship fast."

const SOURCES = [
  {
    id: "wiki",
    title: "Ice cream",
    domain: "wikipedia.org",
    url: "#response-source-wiki",
    icon: citationIcons.wiki,
  },
  {
    id: "seriouseats",
    title: "The Science of the Best Chocolate Ice Cream",
    domain: "seriouseats.com",
    url: "#response-source-seriouseats",
    icon: citationIcons.seriouseats,
  },
]

export function StreamingResponseDefault() {
  const [replay, setReplay] = React.useState(0)
  const [text, setText] = React.useState("")
  const [status, setStatus] =
    React.useState<StreamingResponseStatus>("streaming")
  const done = status === "complete"

  React.useEffect(() => {
    setText("")
    setStatus("streaming")
    let i = 0
    const id = window.setInterval(() => {
      i += 4
      setText(FULL.slice(0, i))
      if (i >= FULL.length) {
        window.clearInterval(id)
        window.setTimeout(() => setStatus("complete"), 280)
      }
    }, 28)
    return () => window.clearInterval(id)
  }, [replay])

  return (
    <div className="mx-auto flex min-h-[20rem] w-full max-w-lg flex-col gap-3">
      <StreamingResponse
        key={replay}
        status={status}
        copyText={FULL}
        sources={done ? SOURCES : []}
        defaultSourcesOpen
        onRetry={() => setReplay((n) => n + 1)}
      >
        <p>{text || "\u00a0"}</p>
      </StreamingResponse>
      <button
        type="button"
        onClick={() => setReplay((n) => n + 1)}
        tabIndex={done ? undefined : -1}
        aria-hidden={!done}
        className={
          done
            ? "inline-flex cursor-pointer items-center gap-1.5 self-start text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            : "invisible pointer-events-none inline-flex cursor-pointer items-center gap-1.5 self-start text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        }
      >
        <RotateCcwIcon className="size-3.5" />
        Replay
      </button>
    </div>
  )
}
