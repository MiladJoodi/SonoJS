"use client"

import * as React from "react"
import {
  CheckIcon,
  CopyIcon,
  FileCode2Icon,
  LoaderCircleIcon,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import {
  type AgentCodeLanguage,
  AgentCodeLine,
  useAgentCodeTokens,
} from "@sonojs/ui/components/agent-code"
import { SPRING_PRESS } from "@sonojs/ui/lib/ease"
import { cn } from "@sonojs/ui/lib/utils"

export type AgentCodeBlockStatus = "streaming" | "complete"

export type AgentCodeBlockProps = {
  code: string
  language?: AgentCodeLanguage
  filename?: React.ReactNode
  status?: AgentCodeBlockStatus
  showLineNumbers?: boolean
  highlightLines?: number[]
  maxHeight?: number
  wrap?: boolean
  copyable?: boolean
  onCopy?: () => void | Promise<void>
  className?: string
}

/** A syntax-highlighted code block for AI-generated code, with copy support. */
function AgentCodeBlock({
  code,
  language = "typescript",
  filename,
  status = "complete",
  showLineNumbers = true,
  highlightLines = [],
  maxHeight = 280,
  wrap = false,
  copyable = true,
  onCopy,
  className,
}: AgentCodeBlockProps) {
  const reduce = useReducedMotion() ?? false
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const copyTimer = React.useRef<number | undefined>(undefined)
  const [copied, setCopied] = React.useState(false)
  const streaming = status === "streaming"
  const tokens = useAgentCodeTokens(code, language)
  const highlighted = React.useMemo(
    () => new Set(highlightLines),
    [highlightLines]
  )
  let offset = 0
  const lines = code.split("\n").map((content) => {
    const line = { content, offset }
    offset += content.length + 1
    return line
  })

  React.useEffect(
    () => () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current)
    },
    []
  )

  React.useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !streaming) return

    const frame = requestAnimationFrame(() => {
      if (viewport.scrollHeight <= viewport.clientHeight) return
      if (typeof viewport.scrollTo === "function") {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: reduce ? "auto" : "smooth",
        })
      } else {
        viewport.scrollTop = viewport.scrollHeight
      }
    })
    return () => cancelAnimationFrame(frame)
  })

  const handleCopy = React.useCallback(async () => {
    if (onCopy) await onCopy()
    else await navigator.clipboard?.writeText(code)

    setCopied(true)
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(false), 1600)
  }, [code, onCopy])

  return (
    <div
      data-slot="agent-code-block"
      data-state={status}
      aria-busy={streaming}
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border/70 bg-muted/80 text-sm shadow-soft",
        className
      )}
    >
      <div className="flex h-10 items-center gap-2.5 px-3">
        <FileCode2Icon
          aria-hidden
          className="size-3.5 shrink-0 text-muted-foreground/70"
        />
        {filename ? (
          <span className="min-w-0 truncate font-mono text-xs text-foreground/80">
            {filename}
          </span>
        ) : null}
        <span className="text-[10px] font-medium tracking-wide text-muted-foreground/55 uppercase">
          {language}
        </span>
        <span
          className={cn(
            "ms-auto inline-flex shrink-0 items-center gap-1 text-[10px] font-medium",
            streaming
              ? "text-muted-foreground"
              : "text-emerald-600 dark:text-emerald-400"
          )}
        >
          {streaming ? (
            <LoaderCircleIcon
              className={cn("size-3", !reduce && "animate-spin")}
            />
          ) : (
            <CheckIcon className="size-3" />
          )}
          {streaming ? "Writing" : "Ready"}
        </span>
        {copyable || onCopy ? (
          <motion.button
            type="button"
            aria-label={copied ? "Copied" : "Copy code"}
            title={copied ? "Copied" : "Copy code"}
            onClick={handleCopy}
            whileTap={reduce ? undefined : { scale: 0.9 }}
            transition={SPRING_PRESS}
            className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-background/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {copied ? (
              <CheckIcon className="size-3.5" />
            ) : (
              <CopyIcon className="size-3.5" />
            )}
          </motion.button>
        ) : null}
      </div>

      <div
        ref={viewportRef}
        role={streaming ? "log" : undefined}
        aria-live={streaming ? "polite" : undefined}
        className="scrollbar-none overflow-auto border-t border-foreground/[0.06] py-2"
        style={{ maxHeight }}
      >
        <pre className="m-0 min-w-max font-mono text-xs leading-5 text-foreground/85">
          <code>
            {lines.map((line, index) => {
              const lineNumber = index + 1
              return (
                <span
                  key={line.offset}
                  className={cn(
                    "grid min-h-5",
                    showLineNumbers
                      ? "grid-cols-[2.75rem_minmax(0,1fr)]"
                      : "grid-cols-1",
                    highlighted.has(lineNumber) && "bg-primary/10"
                  )}
                >
                  {showLineNumbers ? (
                    <span className="select-none pe-3 text-end tabular-nums text-muted-foreground/35">
                      {lineNumber}
                    </span>
                  ) : null}
                  <AgentCodeLine
                    code={line.content}
                    tokens={tokens?.[index]}
                    className={cn(
                      "pe-4",
                      showLineNumbers ? "ps-1" : "ps-4",
                      wrap
                        ? "wrap-break-word whitespace-pre-wrap"
                        : "whitespace-pre"
                    )}
                  />
                </span>
              )
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}

export { AgentCodeBlock }
