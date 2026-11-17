import type { BackgroundsCatalogEntry } from "@/lib/backgrounds-catalog"
import { cn } from "@/lib/utils"

/** Same stage chrome as CursorPreview - title + bordered frame. */
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
      <div className="w-full min-w-0 max-w-none overflow-hidden rounded-xl border border-border/70">
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
