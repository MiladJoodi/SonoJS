"use client"

import * as React from "react"
import { CheckIcon, LoaderCircleIcon, RotateCcwIcon } from "lucide-react"

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@sonojs/ui/components/code-block"

const FULL = `const vendors = await loadVendors()
const ranked = vendors
  .filter((v) => v.inStock)
  .sort((a, b) => b.score - a.score)

console.log(ranked.slice(0, 3))
`

export function CodeBlockStreaming() {
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
    <div className="mx-auto flex min-h-[18rem] w-full max-w-lg flex-col gap-3">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>rank.ts</CodeBlockTitle>
          <span
            className={
              done
                ? "ms-auto inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400"
                : "ms-auto inline-flex items-center gap-1 text-[10px] font-medium text-[var(--code-header-fg)]"
            }
          >
            {done ? (
              <CheckIcon className="size-3" />
            ) : (
              <LoaderCircleIcon className="size-3 animate-spin" />
            )}
            {done ? "Ready" : "Writing"}
          </span>
          <CodeBlockActions className="!opacity-100">
            <CodeBlockCopyButton value={FULL} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent language="typescript" lineNumbers>
          {code || " "}
        </CodeBlockContent>
      </CodeBlock>
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
