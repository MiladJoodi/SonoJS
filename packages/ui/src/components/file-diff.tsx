"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronDownIcon,
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
import { AgentDisclosure } from "@sonojs/ui/components/agent-disclosure"
import { SPRING_PRESS, SPRING_SWAP } from "@sonojs/ui/lib/ease"
import { cn } from "@sonojs/ui/lib/utils"

export type FileDiffStatus = "streaming" | "complete"
export type FileDiffLineType = "added" | "removed" | "context"

export type FileDiffLine = {
  id: string
  type?: FileDiffLineType
  oldLine?: number
  newLine?: number
  content: string
}

export type FileDiffProps = {
  file: React.ReactNode
  lines: FileDiffLine[]
  status?: FileDiffStatus
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  collapseOnComplete?: boolean
  maxHeight?: number
  language?: AgentCodeLanguage
  copyText?: string
  onCopy?: () => void | Promise<void>
  className?: string
}

function ChangeCount({
  value,
  type,
}: {
  value: number
  type: "added" | "removed"
}) {
  if (!value) return null
  return (
    <span
      className={cn(
        "font-mono text-xs tabular-nums",
        type === "added"
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-rose-600 dark:text-rose-400"
      )}
    >
      {type === "added" ? "+" : "−"}
      {value}
    </span>
  )
}

/** A collapsible code diff that shows added and removed lines. */
function FileDiff({
  file,
  lines,
  status = "streaming",
  open,
  defaultOpen = true,
  onOpenChange,
  collapseOnComplete = true,
  maxHeight = 220,
  language = "typescript",
  copyText,
  onCopy,
  className,
}: FileDiffProps) {
  const reduce = useReducedMotion() ?? false
  const baseId = React.useId()
  const triggerId = `${baseId}-trigger`
  const contentId = `${baseId}-content`
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const previousStatus = React.useRef(status)
  const copyTimer = React.useRef<number | undefined>(undefined)
  const [copied, setCopied] = React.useState(false)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const currentOpen = open ?? internalOpen
  const streaming = status === "streaming"
  const additions = lines.filter((line) => line.type === "added").length
  const deletions = lines.filter((line) => line.type === "removed").length
  const canCopy = Boolean(copyText || onCopy)
  const code = lines.map((line) => line.content).join("\n")
  const tokens = useAgentCodeTokens(code, language)

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange, open]
  )

  React.useEffect(() => {
    if (previousStatus.current !== "streaming" && status === "streaming") {
      setOpen(true)
    }
    if (
      previousStatus.current === "streaming" &&
      status === "complete" &&
      collapseOnComplete
    ) {
      setOpen(false)
    }
    previousStatus.current = status
  }, [collapseOnComplete, setOpen, status])

  React.useEffect(
    () => () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current)
    },
    []
  )

  React.useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !currentOpen || !streaming) return

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
    else if (copyText) await navigator.clipboard?.writeText(copyText)

    setCopied(true)
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(false), 1600)
  }, [copyText, onCopy])

  return (
    <div
      data-slot="file-diff"
      data-state={status}
      aria-busy={streaming}
      className={cn("w-full text-sm", className)}
    >
      <button
        id={triggerId}
        type="button"
        aria-expanded={currentOpen}
        aria-controls={contentId}
        onClick={() => setOpen(!currentOpen)}
        className="group flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-md py-1 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <FileCode2Icon
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground"
        />
        <span className="min-w-0 flex-1 truncate font-mono text-xs text-foreground/80">
          {file}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <ChangeCount value={additions} type="added" />
          <ChangeCount value={deletions} type="removed" />
        </span>
        <span className="grid size-4 shrink-0 place-items-center text-muted-foreground/60">
          {streaming ? (
            <LoaderCircleIcon
              aria-label="Applying changes"
              className={cn(
                "size-3.5",
                !reduce && "animate-spin motion-reduce:animate-none"
              )}
            />
          ) : (
            <CheckIcon aria-label="Changes applied" className="size-3.5" />
          )}
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: currentOpen ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : SPRING_SWAP}
          className="shrink-0 text-muted-foreground/45 transition-colors group-hover:text-muted-foreground"
        >
          <ChevronDownIcon className="size-3.5" />
        </motion.span>
      </button>

      <AgentDisclosure
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        open={currentOpen}
      >
        <div className="ps-6 pt-1.5">
          <div className="overflow-hidden rounded-[12px] border border-border/70 bg-muted/80">
            <div
              ref={viewportRef}
              data-slot="file-diff-viewport"
              aria-live="polite"
              className="scrollbar-none overflow-auto"
              style={{ maxHeight }}
            >
              <div className="font-mono text-xs leading-5">
                <span className="sr-only">File changes</span>
                {lines.map((line, index) => {
                  const type = line.type ?? "context"
                  return (
                    <div
                      key={line.id}
                      className={cn(
                        "grid grid-cols-[2.25rem_2.25rem_1rem_minmax(0,1fr)]",
                        type === "added" && "bg-emerald-500/[0.07]",
                        type === "removed" && "bg-rose-500/[0.07]"
                      )}
                    >
                      <span className="select-none pe-2 text-end tabular-nums text-muted-foreground/40">
                        {line.oldLine}
                      </span>
                      <span className="select-none pe-2 text-end tabular-nums text-muted-foreground/40">
                        {line.newLine}
                      </span>
                      <span
                        className={cn(
                          "select-none text-center text-muted-foreground/45",
                          type === "added" &&
                            "text-emerald-600 dark:text-emerald-400",
                          type === "removed" &&
                            "text-rose-600 dark:text-rose-400"
                        )}
                      >
                        {type === "added"
                          ? "+"
                          : type === "removed"
                            ? "−"
                            : ""}
                      </span>
                      <AgentCodeLine
                        code={line.content}
                        tokens={tokens?.[index]}
                        className="min-w-0 whitespace-pre px-1.5"
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {canCopy ? (
              <div className="flex justify-end px-2 pt-1 pb-1.5">
                <motion.button
                  type="button"
                  aria-label={copied ? "Copied" : "Copy diff"}
                  title={copied ? "Copied" : "Copy diff"}
                  onClick={handleCopy}
                  whileTap={reduce ? undefined : { scale: 0.9 }}
                  transition={SPRING_PRESS}
                  className="grid size-7 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-background/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {copied ? (
                    <CheckIcon className="size-3.5" />
                  ) : (
                    <CopyIcon className="size-3.5" />
                  )}
                </motion.button>
              </div>
            ) : null}
          </div>
        </div>
      </AgentDisclosure>
    </div>
  )
}

export { FileDiff }
