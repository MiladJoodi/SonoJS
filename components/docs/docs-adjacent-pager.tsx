"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import {
  useWorkspacePanelsOptional,
  WorkspacePanelToggle,
} from "@/components/workspace-shell"
import { SITE_TOOLTIP_DELAY_MS } from "@/lib/site-tooltip"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type DocsAdjacentLink = {
  href: string
  title: string
}

const PAGER_BTN_CLASS =
  "size-8 shrink-0 rounded-full border-border/70 bg-card shadow-none hover:bg-canvas md:size-7"

/**
 * Prev/next beside a page title - round chrome, LTR + `icon-dir` for RTL.
 * Right panel toggle sits after next when workspace panels are available.
 */
export function DocsAdjacentPager({
  previous,
  next,
  className,
}: {
  previous?: DocsAdjacentLink | null
  next?: DocsAdjacentLink | null
  className?: string
}) {
  const panels = useWorkspacePanelsOptional()

  React.useLayoutEffect(() => {
    if (!panels) return
    return panels.registerHeaderActions()
  }, [panels])

  if (!previous && !next && !panels) return null

  return (
    <div className={cn("flex shrink-0 items-center gap-2", className)}>
      {previous ? (
        <Tooltip delayDuration={SITE_TOOLTIP_DELAY_MS}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon-xs"
              className={PAGER_BTN_CLASS}
              asChild
            >
              <Link
                href={previous.href}
                prefetch={false}
                aria-label={`Prev: ${previous.title}`}
              >
                <ChevronLeftIcon className="size-3.5 icon-dir" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{`Prev: ${previous.title}`}</TooltipContent>
        </Tooltip>
      ) : null}
      {next ? (
        <Tooltip delayDuration={SITE_TOOLTIP_DELAY_MS}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon-xs"
              className={PAGER_BTN_CLASS}
              asChild
            >
              <Link
                href={next.href}
                prefetch={false}
                aria-label={`Next: ${next.title}`}
              >
                <ChevronRightIcon className="size-3.5 icon-dir" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{`Next: ${next.title}`}</TooltipContent>
        </Tooltip>
      ) : null}
      {panels ? (
        <WorkspacePanelToggle
          open={panels.rightOpen}
          onToggle={panels.toggleRight}
        />
      ) : null}
    </div>
  )
}
