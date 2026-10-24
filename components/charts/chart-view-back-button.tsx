"use client"

import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/** Back-to-gallery control beside the chart view title. */
export function ChartViewBackButton({
  href,
  label = "All charts",
}: {
  href: string
  label?: string
}) {
  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="mt-1 size-8 shrink-0 shadow-none md:size-7"
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
