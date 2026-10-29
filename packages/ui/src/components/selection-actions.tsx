"use client"

import {
  ArrowUpIcon,
  CheckIcon,
  ChevronRightIcon,
  CircleHelpIcon,
  RotateCcwIcon,
  ScissorsIcon,
  SparklesIcon,
  SpellCheck2Icon,
  XIcon,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

import { EASE_OUT } from "@sonojs/ui/lib/ease"
import { cn } from "@sonojs/ui/lib/utils"

export type SelectionActionMode = "idle" | "thinking" | "result"

export interface SelectionActionsProps {
  /** Text preceding the highlighted selection. */
  leadingText?: string
  /** The text the contextual actions operate on. */
  selection?: string
  /** Replacement text shown after a successful action. */
  result?: string
  className?: string
}

const actions = [
  { label: "Explain", icon: CircleHelpIcon },
  { label: "Improve", icon: SparklesIcon },
  { label: "Shorten", icon: ScissorsIcon },
  { label: "Fix grammar", icon: SpellCheck2Icon },
] as const

const LAYOUT_SPRING = {
  type: "spring" as const,
  stiffness: 520,
  damping: 38,
  mass: 0.7,
}

function SelectionActions({
  leadingText = "Pistachio holds the top slot all weekend. ",
  selection = "Churn it first thing Saturday so the batch has time to firm up before the afternoon rush.",
  result = "Churn pistachio first thing Saturday so the batch has time to fully firm before the afternoon rush.",
  className,
}: SelectionActionsProps) {
  const reduceMotion = useReducedMotion() ?? false
  const [mode, setMode] = useState<SelectionActionMode>("idle")
  const [activeAction, setActiveAction] = useState("Improve")
  const [expanded, setExpanded] = useState(false)
  const [prompt, setPrompt] = useState("")

  useEffect(() => {
    if (mode !== "thinking") return

    const timer = window.setTimeout(
      () => setMode("result"),
      reduceMotion ? 0 : 950
    )
    return () => window.clearTimeout(timer)
  }, [mode, reduceMotion])

  function run(action: string) {
    setActiveAction(action)
    setExpanded(false)
    setMode("thinking")
  }

  function reset() {
    setMode("idle")
    setPrompt("")
    setExpanded(false)
  }

  const visibleActions = expanded ? actions : actions.slice(0, 2)
  const currentSelection = mode === "result" ? result : selection

  return (
    <div
      data-slot="selection-actions"
      data-mode={mode}
      className={cn("w-full max-w-md", className)}
    >
      <div className="relative pb-14 text-[13px] leading-6 text-foreground/90">
        <span className="select-none">{leadingText}</span>
        <mark className="rounded-sm bg-primary/10 px-0.5 text-inherit select-none dark:bg-primary/15">
          {currentSelection}
        </mark>

        <motion.div
          className="absolute start-1/2 top-full z-10 mt-2 -translate-x-1/2"
          initial={reduceMotion ? false : { opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
        >
          <motion.div
            layout={!reduceMotion}
            className="flex min-h-9 max-w-[calc(100vw-48px)] items-center gap-0.5 overflow-hidden rounded-full border border-border bg-card p-1 text-foreground shadow-lg"
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    layout: LAYOUT_SPRING,
                  }
            }
          >
            <AnimatePresence initial={false} mode="wait">
              {mode === "thinking" ? (
                <motion.span
                  key="thinking"
                  aria-live="polite"
                  className="inline-flex h-7 items-center gap-2 px-2.5 text-xs text-muted-foreground"
                  initial={reduceMotion ? false : { opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                >
                  <span className="size-3 animate-spin rounded-full border-2 border-muted-foreground/40 border-t-foreground" />
                  Applying {activeAction}…
                </motion.span>
              ) : mode === "result" ? (
                <motion.div
                  key="result"
                  className="flex items-center gap-0.5"
                  initial={reduceMotion ? false : { opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                >
                  <button
                    type="button"
                    className="inline-flex h-7 cursor-pointer items-center gap-1 rounded-full bg-primary px-2.5 text-xs font-medium !text-white transition-opacity hover:opacity-90"
                    onClick={reset}
                  >
                    <CheckIcon className="size-3.5" /> Keep
                  </button>
                  <button
                    type="button"
                    aria-label="Discard change"
                    className="inline-flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    onClick={reset}
                  >
                    <XIcon className="size-3.5" />
                  </button>
                  <span className="mx-1 h-4 w-px bg-border" />
                  <button
                    type="button"
                    aria-label="Try action again"
                    className="inline-flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    onClick={() => run(activeAction)}
                  >
                    <RotateCcwIcon className="size-3.5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  className="flex items-center gap-0.5"
                  initial={reduceMotion ? false : { opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                >
                  {prompt ? (
                    <>
                      <input
                        aria-label="Describe an edit"
                        className="h-7 w-36 bg-transparent px-2 text-xs outline-none select-text placeholder:text-muted-foreground"
                        onChange={(event) => setPrompt(event.target.value)}
                        placeholder="Describe edit"
                        value={prompt}
                      />
                      <button
                        type="button"
                        aria-label="Run edit"
                        className="inline-flex size-7 cursor-pointer items-center justify-center rounded-full bg-primary !text-white transition-transform active:scale-95"
                        onClick={() => run(prompt)}
                      >
                        <ArrowUpIcon className="size-3.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <AnimatePresence initial={false} mode="popLayout">
                        {visibleActions.map(({ label, icon: Icon }, index) => (
                          <motion.button
                            layout={!reduceMotion}
                            key={label}
                            type="button"
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            className="inline-flex h-7 cursor-pointer items-center gap-1 whitespace-nowrap rounded-full px-2 text-xs transition-colors hover:bg-muted"
                            exit={
                              reduceMotion
                                ? { opacity: 1 }
                                : { opacity: 0, scale: 0.86, x: -6 }
                            }
                            initial={
                              reduceMotion || index < 2
                                ? false
                                : { opacity: 0, scale: 0.86, x: -6 }
                            }
                            onClick={() => run(label)}
                            transition={{
                              duration: 0.18,
                              ease: EASE_OUT,
                              layout: LAYOUT_SPRING,
                            }}
                          >
                            <Icon className="size-3.5" /> {label}
                          </motion.button>
                        ))}
                      </AnimatePresence>
                      <span className="mx-0.5 h-4 w-px bg-border" />
                      <button
                        type="button"
                        aria-label={
                          expanded ? "Show fewer actions" : "Show more actions"
                        }
                        aria-expanded={expanded}
                        className="inline-flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-muted"
                        onClick={() => setExpanded((value) => !value)}
                      >
                        <ChevronRightIcon
                          className={cn(
                            "size-3.5 transition-transform icon-dir",
                            expanded && "rotate-180"
                          )}
                        />
                      </button>
                      <button
                        type="button"
                        aria-label="Describe a custom edit"
                        className="inline-flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        onClick={() => setPrompt(" ")}
                      >
                        <SparklesIcon className="size-3.5" />
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export { SelectionActions }
export default SelectionActions
