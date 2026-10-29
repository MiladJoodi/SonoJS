"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronDownIcon,
  FilePenLineIcon,
  Globe2Icon,
  SearchIcon,
  SparklesIcon,
  TerminalIcon,
} from "lucide-react"

import { cn } from "@sonojs/ui/lib/utils"

import { ThinkingShimmer } from "./thinking-shimmer"

export type AgentActivity2Variant = "steps" | "reasoning" | "search" | "coding"

type TraceRow = {
  primary: string
  secondary?: string
  href?: string
  add?: number
  remove?: number
}

const traces: Record<
  AgentActivity2Variant,
  { active: string; complete: string; query?: string; rows: TraceRow[] }
> = {
  steps: {
    active: "Thinking",
    complete: "Thought for 4 seconds",
    rows: [
      { primary: "Reading flavor briefs" },
      { primary: "Scanning supplier lists" },
      { primary: "Comparing tasting notes", secondary: "6 flavors" },
      { primary: "Writing the scoop report" },
    ],
  },
  reasoning: {
    active: "Thinking",
    complete: "Thought for 4 seconds",
    rows: [
      {
        primary:
          "Summer demand spikes for stone-fruit flavors — peach and apricot lead.",
      },
      {
        primary:
          "I should check cone inventory before promoting a waffle-bowl special.",
      },
    ],
  },
  search: {
    active: "Searching the web",
    complete: "Searched the web",
    query: "best waffle cone supplier",
    rows: [
      {
        primary: "Joy Cone",
        secondary: "joycone.com",
        href: "https://joycone.com",
      },
      {
        primary: "WebstaurantStore",
        secondary: "webstaurantstore.com",
        href: "https://www.webstaurantstore.com",
      },
      {
        primary: "The Konery",
        secondary: "thekonery.com",
        href: "https://www.thekonery.com",
      },
    ],
  },
  coding: {
    active: "Running tools",
    complete: "Ran 3 tools",
    rows: [
      { primary: "Read", secondary: "flavors.ts" },
      { primary: "Edit", secondary: "ChurnSchedule.tsx", add: 74, remove: 41 },
      { primary: "Run", secondary: "npm run freeze" },
    ],
  },
}

const OPEN_AT = 1
const ROWS_START = 2

function stageDelay(stage: number, completeAt: number) {
  if (stage === 0) return 700
  if (stage === 1) return 650
  if (stage < completeAt - 1) return 900
  return 1100
}

function useTraceStage(completeAt: number) {
  const [stage, setStage] = React.useState(0)
  React.useEffect(() => {
    if (stage >= completeAt) return
    const timer = window.setTimeout(
      () => setStage((current) => current + 1),
      stageDelay(stage, completeAt)
    )
    return () => window.clearTimeout(timer)
  }, [completeAt, stage])
  return stage
}

function SearchDot({ index }: { index: number }) {
  const tones = ["bg-primary", "bg-amber-500", "bg-emerald-600"]
  return (
    <span
      className={cn(
        "size-3 shrink-0 rounded-full",
        tones[index % tones.length]
      )}
    />
  )
}

export type AgentActivity2Props = {
  variant?: AgentActivity2Variant
  className?: string
}

/** A lightweight, expandable thinking trace with steps, reasoning, search, and coding variants. */
function AgentActivity2({
  variant = "steps",
  className,
}: AgentActivity2Props) {
  const [manualOpen, setManualOpen] = React.useState<boolean | null>(null)
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null)
  const trace = traces[variant]
  const completeAt = ROWS_START + trace.rows.length
  const stage = useTraceStage(completeAt)
  const working = stage < completeAt
  // Stay expanded after the run finishes (user can still collapse manually).
  const autoOpen = stage >= OPEN_AT
  const isOpen = manualOpen ?? autoOpen
  const visibleRows =
    stage < ROWS_START
      ? 0
      : Math.min(stage - ROWS_START + 1, trace.rows.length)

  function toggleOpen() {
    setManualOpen((current) => !(current ?? autoOpen))
  }

  return (
    <section
      data-slot="agent-activity-2"
      className={cn("flex min-h-52 w-full max-w-md flex-col", className)}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={toggleOpen}
        className="-mx-2 flex w-fit cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-muted"
      >
        <SparklesIcon
          className={cn(
            "size-[18px]",
            working ? "text-foreground" : "text-muted-foreground"
          )}
        />
        {working ? (
          <ThinkingShimmer className="text-sm">{trace.active}</ThinkingShimmer>
        ) : (
          <span className="text-sm font-medium text-muted-foreground">
            {trace.complete}
          </span>
        )}
        <ChevronDownIcon
          className={cn(
            "size-4 text-muted-foreground transition-transform motion-reduce:transition-none",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="relative ms-2.5 mt-1.5 border-s border-border ps-5">
            {trace.query ? (
              <div className="flex min-h-9 items-center gap-2.5 py-1.5 text-[13px] text-muted-foreground">
                <SearchIcon className="size-4" />
                {trace.query}
              </div>
            ) : null}

            {trace.rows.slice(0, visibleRows).map((row, index) => {
              const selected = selectedTool === row.primary
              const content = (
                <>
                  {variant === "search" ? <SearchDot index={index} /> : null}
                  {variant === "steps" ? (
                    index < visibleRows - 1 || !working ? (
                      <CheckIcon
                        className="size-4 shrink-0 text-muted-foreground"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="size-4 shrink-0 animate-spin rounded-full border-2 border-muted-foreground border-t-foreground motion-reduce:animate-none"
                      />
                    )
                  ) : null}
                  {variant === "coding" ? (
                    index === 0 ? (
                      <Globe2Icon className="size-4 shrink-0 text-muted-foreground" />
                    ) : index === 1 ? (
                      <FilePenLineIcon className="size-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <TerminalIcon className="size-4 shrink-0 text-muted-foreground" />
                    )
                  ) : null}
                  <span
                    className={cn(
                      "min-w-0 text-[13px]",
                      variant === "reasoning"
                        ? "leading-relaxed text-muted-foreground"
                        : "font-medium"
                    )}
                  >
                    {row.primary}
                  </span>
                  {row.secondary ? (
                    <span
                      className={cn(
                        "ms-auto shrink-0 text-xs text-muted-foreground",
                        variant === "coding" && "font-mono"
                      )}
                    >
                      {row.secondary}
                    </span>
                  ) : null}
                  {row.add !== undefined ? (
                    <span className="ms-auto shrink-0 font-mono text-xs tabular-nums">
                      <span className="text-emerald-700 dark:text-emerald-400">
                        +{row.add}
                      </span>{" "}
                      <span className="text-red-700 dark:text-red-400">
                        −{row.remove}
                      </span>
                    </span>
                  ) : null}
                </>
              )

              const rowClass = cn(
                "flex min-h-9 w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-start",
                variant === "reasoning" && "items-start"
              )
              if (variant === "search") {
                return (
                  <a
                    className={cn(
                      rowClass,
                      "cursor-pointer transition-colors hover:bg-muted"
                    )}
                    href={row.href}
                    key={row.primary}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {content}
                  </a>
                )
              }
              if (variant === "coding") {
                return (
                  <button
                    type="button"
                    aria-pressed={selected}
                    className={cn(
                      rowClass,
                      "cursor-pointer transition-colors",
                      selected ? "bg-muted" : "hover:bg-muted"
                    )}
                    key={row.primary}
                    onClick={() =>
                      setSelectedTool(selected ? null : row.primary)
                    }
                  >
                    {content}
                  </button>
                )
              }
              return (
                <div className={rowClass} key={row.primary}>
                  {content}
                </div>
              )
            })}
            {variant === "search" && !working ? (
              <span className="block px-2 py-1.5 text-[13px] text-muted-foreground">
                +7 more
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export { AgentActivity2 }
