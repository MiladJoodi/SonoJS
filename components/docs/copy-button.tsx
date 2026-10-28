"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function CopyButton({
  value,
  className,
  tooltip = true,
  tooltipSide = "top",
  tooltipIdle = "Copy",
  tooltipCopied = "Copied",
  tone = "code",
  children,
}: {
  value: string
  className?: string
  /** Drawer copy actions stay icon-only. Docs pages keep the label tooltip. */
  tooltip?: boolean
  tooltipSide?: "top" | "bottom"
  /** Idle tooltip / aria when not copied. */
  tooltipIdle?: string
  /** Success tooltip / aria after copy. */
  tooltipCopied?: string
  /** `code` sits on a dark code header. `chrome` sits on the page surface. */
  tone?: "code" | "chrome"
  /** Optional visible label before the icon (e.g. Install). */
  children?: React.ReactNode
}) {
  const [copied, setCopied] = React.useState(false)
  const label = copied ? tooltipCopied : tooltipIdle
  const hasLabel = children != null && children !== false

  React.useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1500)
    return () => window.clearTimeout(id)
  }, [copied])

  const button = (
    <Button
      type="button"
      variant="ghost"
      size={hasLabel ? "xs" : "icon-xs"}
      className={cn(
        tone === "chrome"
          ? "cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground"
          : "cursor-pointer text-[color:var(--code-header-fg)] hover:bg-white/10 hover:text-[color:var(--code-fg)]",
        hasLabel && "gap-1 px-2",
        className
      )}
      aria-label={label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
        } catch {
          // Clipboard can fail without permission; keep idle icon.
        }
      }}
    >
      {hasLabel ? (
        <span className="text-xs font-medium">{children}</span>
      ) : null}
      {copied ? <CheckIcon /> : <CopyIcon />}
      {!hasLabel ? <span className="sr-only">{label}</span> : null}
    </Button>
  )

  if (!tooltip) return button

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side={tooltipSide}>{label}</TooltipContent>
    </Tooltip>
  )
}
