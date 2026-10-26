"use client"

import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/** Back-to-blocks-index control beside the block page title. */
export function BlocksBackButton({
  href = "/blocks",
  label = "All blocks",
}: {
  href?: string
  label?: string
}) {
  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon-xs"
          className="mt-1 size-8 shrink-0 border-border/70 bg-card shadow-none hover:bg-canvas md:size-7"
          asChild
        >
          <Link href={href} prefetch={false} aria-label={`Back to ${label}`}>
            <ArrowLeftIcon className="size-3.5 icon-dir" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  )
}
