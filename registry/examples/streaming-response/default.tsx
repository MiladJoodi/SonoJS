"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import {
  StreamingResponse,
  type StreamingResponseStatus,
} from "@sonojs/ui/components/streaming-response"

const FULL =
  "Peach and apricot lead summer stone-fruit demand. Check cone inventory before promoting a waffle-bowl special — Joy Cone and The Konery both ship fast."

const SOURCES = [
  {
    id: "joy",
    title: "Joy Cone",
    domain: "joycone.com",
    url: "https://joycone.com",
  },
  {
    id: "konery",
    title: "The Konery",
    domain: "thekonery.com",
    url: "https://www.thekonery.com",
  },
]

export function StreamingResponseDefault() {
  const [replay, setReplay] = React.useState(0)
  const [text, setText] = React.useState("")
  const [status, setStatus] =
    React.useState<StreamingResponseStatus>("streaming")

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
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <StreamingResponse
        key={replay}
        status={status}
        copyText={FULL}
        sources={status === "complete" ? SOURCES : []}
        defaultSourcesOpen
        onRetry={() => setReplay((n) => n + 1)}
      >
        <p>{text || "\u00a0"}</p>
      </StreamingResponse>
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
