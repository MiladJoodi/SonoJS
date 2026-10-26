"use client"

import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

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

/**
 * Prev/next beside a page title — white card chrome, LTR + `icon-dir` for RTL.
 * Tooltip shows the adjacent page title.
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
  if (!previous && !next) return null

  return (
    <div className={cn("flex shrink-0 items-center gap-2", className)}>
      {previous ? (
        <Tooltip delayDuration={400}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon-xs"
              className="size-8 shrink-0 border-border/70 bg-card shadow-none hover:bg-canvas md:size-7"
              asChild
            >
              <Link
                href={previous.href}
                prefetch={false}
                aria-label={`Previous: ${previous.title}`}
              >
                <ArrowLeftIcon className="size-3.5 icon-dir" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{previous.title}</TooltipContent>
        </Tooltip>
      ) : null}
      {next ? (
        <Tooltip delayDuration={400}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon-xs"
              className="size-8 shrink-0 border-border/70 bg-card shadow-none hover:bg-canvas md:size-7"
              asChild
            >
              <Link
                href={next.href}
                prefetch={false}
                aria-label={`Next: ${next.title}`}
              >
                <ArrowRightIcon className="size-3.5 icon-dir" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{next.title}</TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  )
}
