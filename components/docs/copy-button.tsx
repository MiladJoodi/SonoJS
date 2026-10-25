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
  tooltipSide = "bottom",
  tone = "code",
}: {
  value: string
  className?: string
  /** Drawer copy actions stay icon-only. Docs pages keep the label tooltip. */
  tooltip?: boolean
  tooltipSide?: "top" | "bottom"
  /** `code` sits on a dark code header. `chrome` sits on the page surface. */
  tone?: "code" | "chrome"
}) {
  const [copied, setCopied] = React.useState(false)
  const label = copied ? "Copied" : "Copy"

  React.useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1500)
    return () => window.clearTimeout(id)
  }, [copied])

  const button = (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      className={cn(
        tone === "chrome"
          ? "cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground"
          : "cursor-pointer text-[color:var(--code-header-fg)] hover:bg-white/10 hover:text-[color:var(--code-fg)]",
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
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span className="sr-only">{label}</span>
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
