import Link from "next/link"

import {
  backgroundViewHref,
  type BackgroundsCatalogEntry,
} from "@/lib/backgrounds-catalog"
import { cn } from "@/lib/utils"

export function BackgroundExampleCard({
  entry,
}: {
  entry: BackgroundsCatalogEntry
}) {
  const href = backgroundViewHref(entry.id)

  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={entry.title}
      className={cn(
        "group flex w-full cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card text-start no-underline outline-none",
        "transition-[border-color,background-color] hover:border-border",
        "focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <div
        aria-hidden
        className="relative aspect-16/10 w-full overflow-hidden bg-black"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static public webp */}
        <img
          src={entry.previewPath}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          className="pointer-events-none size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="bg-card px-2.5 py-2 md:px-3 md:py-2.5">
        <span className="block truncate text-[13px] font-medium text-foreground md:text-sm">
          {entry.title}
        </span>
      </div>
    </Link>
  )
}
