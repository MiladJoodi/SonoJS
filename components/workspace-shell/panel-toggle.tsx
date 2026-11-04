"use client"

import { PanelRightCloseIcon, PanelRightOpenIcon } from "lucide-react"

import { SITE_TOOLTIP_DELAY_MS } from "@/lib/site-tooltip"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@sonojs/ui/components/tooltip"

/** Desktop-only right panel chrome — never shown on small screens. */
export const WORKSPACE_RIGHT_TOGGLE_VISIBILITY = "hidden xl:inline-flex"

/** Match DocsAdjacentPager prev/next chrome. */
export const WORKSPACE_PANEL_TOGGLE_CLASS =
  "size-8 shrink-0 rounded-full border-border/70 bg-card shadow-none hover:bg-canvas md:size-7"

export const WORKSPACE_RIGHT_SHORTCUT = "Ctrl+]"

export function workspacePanelTooltip(open: boolean) {
  return open
    ? `Collapse right sidebar ${WORKSPACE_RIGHT_SHORTCUT}`
    : `Expand right sidebar ${WORKSPACE_RIGHT_SHORTCUT}`
}

export function WorkspacePanelToggle({
  open,
  onToggle,
  className,
}: {
  open: boolean
  onToggle: () => void
  className?: string
}) {
  const Icon = open ? PanelRightCloseIcon : PanelRightOpenIcon
  const tip = workspacePanelTooltip(open)

  return (
    <Tooltip delayDuration={SITE_TOOLTIP_DELAY_MS}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          className={cn(
            WORKSPACE_PANEL_TOGGLE_CLASS,
            "cursor-pointer",
            WORKSPACE_RIGHT_TOGGLE_VISIBILITY,
            className
          )}
          aria-expanded={open}
          aria-label={tip}
          onClick={onToggle}
        >
          <Icon className="size-3.5 icon-dir" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={6}>
        {tip}
      </TooltipContent>
    </Tooltip>
  )
}
