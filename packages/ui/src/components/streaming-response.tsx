"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  RotateCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { AgentDisclosure } from "@sonojs/ui/components/agent-disclosure"
import {
  type CitationItem,
  CitationList,
  CitationStack,
} from "@sonojs/ui/components/citations"
import { EASE_OUT, SPRING_PRESS, SPRING_SWAP } from "@sonojs/ui/lib/ease"
import { cn } from "@sonojs/ui/lib/utils"

export type StreamingResponseStatus = "streaming" | "complete" | "error"
export type StreamingResponseFeedback = "up" | "down" | null

export type StreamingResponseProps = {
  /** Rendered response content. Pass plain text or the output of a Markdown renderer. */
  children: React.ReactNode
  status?: StreamingResponseStatus
  /** Plain-text value copied by the built-in copy action. */
  copyText?: string
  /** Overrides the built-in clipboard action. */
  onCopy?: () => void | Promise<void>
  onRetry?: () => void
  /** Optional sources shown as a compact footer disclosure after streaming. */
  sources?: CitationItem[]
  sourcesOpen?: boolean
  defaultSourcesOpen?: boolean
  onSourcesOpenChange?: (open: boolean) => void
  sourceIdPrefix?: string
  feedback?: StreamingResponseFeedback
  defaultFeedback?: StreamingResponseFeedback
  onFeedbackChange?: (feedback: StreamingResponseFeedback) => void
  /** Set false when a surrounding conversation log announces streamed text. */
  announce?: boolean
  /** Hides the built-in completion actions without changing response status. */
  showActions?: boolean
  className?: string
  contentClassName?: string
  actionsClassName?: string
}

function ResponseAction({
  label,
  active = false,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  const reduce = useReducedMotion() ?? false

  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={
        label === "Helpful" || label === "Not helpful" ? active : undefined
      }
      onClick={onClick}
      whileTap={reduce ? undefined : { scale: 0.9 }}
      transition={SPRING_PRESS}
      className={cn(
        "grid size-7 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
        active && "bg-muted text-foreground"
      )}
    >
      {children}
    </motion.button>
  )
}

/** A streaming AI response surface with sources and feedback actions. */
function StreamingResponse({
  children,
  status = "streaming",
  copyText,
  onCopy,
  onRetry,
  sources = [],
  sourcesOpen,
  defaultSourcesOpen = false,
  onSourcesOpenChange,
  sourceIdPrefix,
  feedback,
  defaultFeedback = null,
  onFeedbackChange,
  announce = true,
  showActions = true,
  className,
  contentClassName,
  actionsClassName,
}: StreamingResponseProps) {
  const reduce = useReducedMotion() ?? false
  const baseId = React.useId()
  const [copied, setCopied] = React.useState(false)
  const [internalFeedback, setInternalFeedback] =
    React.useState<StreamingResponseFeedback>(defaultFeedback)
  const [internalSourcesOpen, setInternalSourcesOpen] =
    React.useState(defaultSourcesOpen)
  const copyTimer = React.useRef<number | undefined>(undefined)
  const currentFeedback = feedback ?? internalFeedback
  const currentSourcesOpen = sourcesOpen ?? internalSourcesOpen
  const streaming = status === "streaming"
  const complete = status === "complete"
  const canCopy = Boolean(copyText || onCopy)
  const hasSources = sources.length > 0
  const shouldShowActions =
    showActions && !streaming && (canCopy || onRetry || complete || hasSources)
  const sourcesContentId = `${baseId}-sources`
  const resolvedSourcePrefix =
    sourceIdPrefix ?? `response-source-${baseId.replace(/:/g, "")}`

  React.useEffect(
    () => () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current)
    },
    []
  )

  const handleCopy = React.useCallback(async () => {
    if (onCopy) await onCopy()
    else if (copyText) await navigator.clipboard?.writeText(copyText)

    setCopied(true)
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(false), 1600)
  }, [copyText, onCopy])

  const setFeedback = (next: Exclude<StreamingResponseFeedback, null>) => {
    const value = currentFeedback === next ? null : next
    if (feedback === undefined) setInternalFeedback(value)
    onFeedbackChange?.(value)
  }

  const setSourcesOpen = React.useCallback(
    (next: boolean) => {
      if (sourcesOpen === undefined) setInternalSourcesOpen(next)
      onSourcesOpenChange?.(next)
    },
    [onSourcesOpenChange, sourcesOpen]
  )

  return (
    <div
      data-slot="streaming-response"
      data-state={status}
      aria-busy={streaming}
      className={cn("w-full", className)}
    >
      <div
        aria-live={announce ? "polite" : "off"}
        className={cn(
          "text-sm leading-6 text-foreground/90 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:ps-5 [&_p+p]:mt-3 [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-[12px] [&_pre]:border [&_pre]:border-border/70 [&_pre]:bg-muted/45 [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:ps-5",
          contentClassName
        )}
      >
        {children}
      </div>

      <AnimatePresence initial={false}>
        {shouldShowActions ? (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.22, ease: EASE_OUT }}
            className="mt-3"
          >
            <div className={cn("flex items-center gap-0.5", actionsClassName)}>
              {canCopy ? (
                <ResponseAction
                  label={copied ? "Copied" : "Copy response"}
                  onClick={handleCopy}
                >
                  {copied ? (
                    <CheckIcon className="size-3.5" />
                  ) : (
                    <CopyIcon className="size-3.5" />
                  )}
                </ResponseAction>
              ) : null}
              {onRetry ? (
                <ResponseAction label="Retry response" onClick={onRetry}>
                  <RotateCcwIcon className="size-3.5" />
                </ResponseAction>
              ) : null}
              {complete ? (
                <>
                  <ResponseAction
                    label="Helpful"
                    active={currentFeedback === "up"}
                    onClick={() => setFeedback("up")}
                  >
                    <ThumbsUpIcon className="size-3.5" />
                  </ResponseAction>
                  <ResponseAction
                    label="Not helpful"
                    active={currentFeedback === "down"}
                    onClick={() => setFeedback("down")}
                  >
                    <ThumbsDownIcon className="size-3.5" />
                  </ResponseAction>
                </>
              ) : null}
              {hasSources ? (
                <button
                  type="button"
                  aria-expanded={currentSourcesOpen}
                  aria-controls={sourcesContentId}
                  onClick={() => setSourcesOpen(!currentSourcesOpen)}
                  className="group ms-1 inline-flex min-h-7 cursor-pointer items-center gap-2 rounded-md px-1.5 text-xs text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <CitationStack citations={sources} />
                  <span className="tabular-nums">
                    {sources.length}{" "}
                    {sources.length === 1 ? "source" : "sources"}
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: currentSourcesOpen ? 180 : 0 }}
                    transition={reduce ? { duration: 0 } : SPRING_SWAP}
                    className="text-muted-foreground/50 group-hover:text-muted-foreground"
                  >
                    <ChevronDownIcon className="size-3" />
                  </motion.span>
                </button>
              ) : null}
            </div>

            {hasSources ? (
              <AgentDisclosure id={sourcesContentId} open={currentSourcesOpen}>
                <CitationList
                  citations={sources}
                  idPrefix={resolvedSourcePrefix}
                  className="mt-2 rounded-[12px] bg-muted p-2"
                />
              </AgentDisclosure>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export { StreamingResponse }
