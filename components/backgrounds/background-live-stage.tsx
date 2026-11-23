import { FullscreenIcon } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { BackgroundsCatalogEntry } from "@/lib/backgrounds-catalog"
import { SITE_TOOLTIP_DELAY_MS } from "@/lib/site-tooltip"
import { cn } from "@/lib/utils"

/** Preview stage - same chrome bar + fullscreen control as BlockExample. */
export function BackgroundLiveStage({
  entry,
  title = "Preview",
  className,
}: {
  entry: BackgroundsCatalogEntry
  title?: string
  className?: string
}) {
  return (
    <div className={cn("w-full min-w-0 space-y-3", className)}>
      <div className="space-y-1.5">
        <h2 className="text-h3">{title}</h2>
      </div>
      <div className="w-full min-w-0 overflow-hidden rounded-[12px] border border-border/70">
        <div className="flex items-center justify-between gap-3 rounded-t-[12px] border-b border-border/80 bg-card px-3 py-2">
          <span className="min-w-0 max-w-48 truncate rounded-md px-2 py-1.5 font-mono text-[12.5px] text-muted-foreground sm:max-w-64">
            {entry.id}.html
          </span>
          <Tooltip delayDuration={SITE_TOOLTIP_DELAY_MS}>
            <TooltipTrigger asChild>
              <a
                href={entry.htmlPath}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open full preview"
                className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <FullscreenIcon className="size-3.5" aria-hidden />
              </a>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Open full preview
            </TooltipContent>
          </Tooltip>
        </div>
        <iframe
          title={`${entry.title} preview`}
          src={`${entry.htmlPath}?embed=1`}
          className="aspect-video w-full border-0 bg-black"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  )
}
