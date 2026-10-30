"use client"

import * as React from "react"

import {
  Terminal,
  TerminalActions,
  TerminalClearButton,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalStatus,
  TerminalTitle,
} from "@sonojs/ui/components/terminal"

const ANSI_OUTPUT = `\u001B[32m✓\u001B[0m Compiled successfully in 1.2s

\u001B[1m\u001B[34minfo\u001B[0m  - Collecting page data...
\u001B[1m\u001B[34minfo\u001B[0m  - Generating static pages (0/3)
\u001B[32m✓\u001B[0m Generated static pages (3/3)

\u001B[1m\u001B[33mwarn\u001B[0m  - Using \u001B[1mexperimental\u001B[0m server actions

\u001B[36mRoute (app)\u001B[0m                              \u001B[36mSize\u001B[0m     \u001B[36mFirst Load JS\u001B[0m
\u001B[37m┌ ○ /\u001B[0m                                    \u001B[32m5.2 kB\u001B[0m   \u001B[32m87.3 kB\u001B[0m
\u001B[37m├ ○ /about\u001B[0m                               \u001B[32m2.1 kB\u001B[0m   \u001B[32m84.2 kB\u001B[0m
\u001B[37m└ ○ /contact\u001B[0m                             \u001B[32m3.8 kB\u001B[0m   \u001B[32m85.9 kB\u001B[0m

\u001B[32m✓\u001B[0m Build completed successfully!
\u001B[90mTotal time: 3.45s\u001B[0m
`

export function TerminalDefault() {
  const [replay, setReplay] = React.useState(0)
  const [output, setOutput] = React.useState("")
  const [isStreaming, setIsStreaming] = React.useState(true)

  React.useEffect(() => {
    setOutput("")
    setIsStreaming(true)
    let index = 0
    const interval = window.setInterval(() => {
      if (index < ANSI_OUTPUT.length) {
        setOutput(ANSI_OUTPUT.slice(0, index + 10))
        index += 10
      } else {
        setIsStreaming(false)
        window.clearInterval(interval)
      }
    }, 20)
    return () => window.clearInterval(interval)
  }, [replay])

  const handleClear = React.useCallback(() => {
    setOutput("")
    setIsStreaming(false)
  }, [])

  return (
    <div className="mx-auto w-full min-h-[24rem] min-w-0 max-w-2xl px-1 sm:min-h-[28rem] sm:px-0">
      <Terminal
        key={replay}
        autoScroll
        isStreaming={isStreaming}
        onClear={handleClear}
        output={output}
      >
        <TerminalHeader>
          <TerminalTitle>Build Output</TerminalTitle>
          <div className="flex items-center gap-1">
            <TerminalStatus />
            <TerminalActions>
              <TerminalCopyButton />
              <TerminalClearButton />
            </TerminalActions>
          </div>
        </TerminalHeader>
        <TerminalContent />
      </Terminal>
      {!isStreaming && output ? (
        <button
          type="button"
          onClick={() => setReplay((n) => n + 1)}
          className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay
        </button>
      ) : (
        <div className="mt-3 h-4" aria-hidden />
      )}
    </div>
  )
}
