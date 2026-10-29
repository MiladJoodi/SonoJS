"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronDownIcon,
  CircleAlertIcon,
  LoaderCircleIcon,
  ShieldCheckIcon,
  XIcon,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import {
  AgentCode,
  type AgentCodeLanguage,
} from "@sonojs/ui/components/agent-code"
import { AgentDisclosure } from "@sonojs/ui/components/agent-disclosure"
import { EASE_OUT, SPRING_PRESS, SPRING_SWAP } from "@sonojs/ui/lib/ease"
import { cn } from "@sonojs/ui/lib/utils"

export type ToolApprovalStatus =
  | "pending"
  | "approving"
  | "approved"
  | "denied"
  | "running"
  | "complete"
  | "error"

export type ToolApprovalParameter = {
  id: string
  label: React.ReactNode
  value: React.ReactNode
}

export type ToolApprovalCodeProps = {
  code: string
  language?: AgentCodeLanguage
  className?: string
}

export type ToolApprovalProps = {
  tool: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  parameters?: ToolApprovalParameter[]
  status?: ToolApprovalStatus
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onApprove?: () => void
  onAlwaysAllow?: () => void
  onDeny?: () => void
  className?: string
}

function getStatusCopy(status: ToolApprovalStatus) {
  if (status === "approving") return "Approving"
  if (status === "approved") return "Approved"
  if (status === "denied") return "Denied"
  if (status === "running") return "Running"
  if (status === "complete") return "Completed"
  if (status === "error") return "Failed"
  return "Approval required"
}

function getStatusBadgeClass(status: ToolApprovalStatus) {
  if (status === "pending") {
    return "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
  }
  if (status === "approving" || status === "running") {
    return "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
  }
  if (status === "approved" || status === "complete") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  }
  return "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
}

function getStatusIconKey(status: ToolApprovalStatus) {
  if (status === "approving" || status === "running") return "busy"
  if (status === "error") return "error"
  if (status === "denied") return "denied"
  if (status === "approved" || status === "complete") return "ok"
  return "shield"
}

function ToolApprovalCode({
  code,
  language = "bash",
  className,
}: ToolApprovalCodeProps) {
  return (
    <AgentCode
      code={code}
      language={language}
      className={cn(
        "rounded-[12px] border border-border/70 bg-muted/30 px-2.5 py-2",
        className
      )}
    />
  )
}

function ToolApproval({
  tool,
  title = "Allow this tool to run?",
  description,
  parameters = [],
  status = "pending",
  open,
  defaultOpen = false,
  onOpenChange,
  onApprove,
  onAlwaysAllow,
  onDeny,
  className,
}: ToolApprovalProps) {
  const reduce = useReducedMotion() ?? false
  const baseId = React.useId()
  const detailsId = `${baseId}-details`
  const previousStatus = React.useRef(status)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const currentOpen = open ?? internalOpen
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange, open]
  )
  const busy = status === "approving" || status === "running"
  const pending = status === "pending"
  const error = status === "error"

  React.useEffect(() => {
    if (previousStatus.current === "pending" && status !== "pending") {
      setOpen(false)
    }
    previousStatus.current = status
  }, [setOpen, status])

  return (
    <div
      data-slot="tool-approval"
      data-state={status}
      aria-busy={busy}
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border/70 bg-card text-sm shadow-soft",
        className
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <span
          aria-hidden
          className={cn(
            "relative mt-0.5 grid size-8 shrink-0 place-items-center overflow-hidden rounded-[12px] border border-border/70 bg-background text-muted-foreground",
            error && "text-destructive"
          )}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={getStatusIconKey(status)}
              className="absolute inset-0 grid place-items-center"
              initial={reduce ? false : { opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.55 }}
              transition={reduce ? { duration: 0 } : SPRING_SWAP}
            >
              {busy ? (
                <motion.span
                  className="grid place-items-center"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={
                    reduce
                      ? undefined
                      : {
                          duration: 0.85,
                          ease: "linear",
                          repeat: Infinity,
                        }
                  }
                >
                  <LoaderCircleIcon className="size-4" />
                </motion.span>
              ) : error ? (
                <CircleAlertIcon className="size-4" />
              ) : status === "denied" ? (
                <XIcon className="size-4" />
              ) : status === "approved" || status === "complete" ? (
                <CheckIcon className="size-4" />
              ) : (
                <ShieldCheckIcon className="size-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0 text-start">
              <div className="font-medium text-foreground">{title}</div>
              <div className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                {tool}
              </div>
            </div>
            <span
              className={cn(
                "relative inline-flex h-5.5 shrink-0 items-center overflow-hidden rounded-full border px-2 text-[11px] font-medium transition-colors",
                getStatusBadgeClass(status)
              )}
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={status}
                  className="inline-block whitespace-nowrap"
                  initial={
                    reduce ? false : { opacity: 0, y: "70%", filter: "blur(3px)" }
                  }
                  animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                  exit={
                    reduce
                      ? undefined
                      : { opacity: 0, y: "-70%", filter: "blur(3px)" }
                  }
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 460, damping: 30 }
                  }
                >
                  {getStatusCopy(status)}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
          {description ? (
            <p className="mt-2 text-start leading-5 text-muted-foreground">
              {description}
            </p>
          ) : null}

          {parameters.length ? (
            <button
              type="button"
              aria-expanded={currentOpen}
              aria-controls={detailsId}
              onClick={() => setOpen(!currentOpen)}
              className="mt-2 inline-flex cursor-pointer items-center gap-1 rounded-md text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              View details
              <motion.span
                aria-hidden
                animate={{ rotate: currentOpen ? 180 : 0 }}
                transition={reduce ? { duration: 0 } : SPRING_SWAP}
              >
                <ChevronDownIcon className="size-3.5" />
              </motion.span>
            </button>
          ) : null}
        </div>
      </div>

      <AgentDisclosure id={detailsId} open={currentOpen}>
        <dl className="mx-4 mb-4 grid gap-2 rounded-[12px] border border-border/70 bg-background/70 p-3">
          {parameters.map((parameter) => (
            <div
              key={parameter.id}
              className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] items-start gap-3 text-xs"
            >
              <dt className="text-start text-muted-foreground">
                {parameter.label}
              </dt>
              <dd className="min-w-0 break-words text-start font-mono text-foreground/85">
                {parameter.value}
              </dd>
            </div>
          ))}
        </dl>
      </AgentDisclosure>

      <AnimatePresence initial={false}>
        {pending ? (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.22, ease: EASE_OUT }}
            className="flex flex-wrap items-center gap-2 border-t border-border/70 px-4 py-3"
          >
            <motion.button
              type="button"
              onClick={onApprove}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={SPRING_PRESS}
              className="cursor-pointer rounded-[12px] bg-foreground px-3 py-1.5 text-xs font-medium text-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Allow once
            </motion.button>
            {onAlwaysAllow ? (
              <motion.button
                type="button"
                onClick={onAlwaysAllow}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                transition={SPRING_PRESS}
                className="cursor-pointer rounded-[12px] border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                Always allow
              </motion.button>
            ) : null}
            <button
              type="button"
              onClick={onDeny}
              className="cursor-pointer rounded-[12px] px-3 py-1.5 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              Deny
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export { ToolApproval, ToolApprovalCode }
