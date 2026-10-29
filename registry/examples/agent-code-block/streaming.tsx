"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import { AgentCodeBlock } from "@sonojs/ui/components/agent-code-block"

const FULL = `const vendors = await loadVendors()
const ranked = vendors
  .filter((v) => v.inStock)
  .sort((a, b) => b.score - a.score)

console.log(ranked.slice(0, 3))
`

export function AgentCodeBlockStreaming() {
  const [replay, setReplay] = React.useState(0)
  const [code, setCode] = React.useState("")
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    setCode("")
    setDone(false)
    let i = 0
    const id = window.setInterval(() => {
      i += 3
      setCode(FULL.slice(0, i))
      if (i >= FULL.length) {
        window.clearInterval(id)
        setDone(true)
      }
    }, 40)
    return () => window.clearInterval(id)
  }, [replay])

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <AgentCodeBlock
        filename="rank.ts"
        language="typescript"
        code={code || " "}
        status={done ? "complete" : "streaming"}
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
