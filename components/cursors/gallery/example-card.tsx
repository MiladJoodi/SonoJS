import Link from "next/link"
import { MousePointerClickIcon } from "lucide-react"

import { cursorViewHref } from "@/lib/cursors-catalog"
import { cn } from "@/lib/utils"

export function CursorExampleCard({
  id,
  title,
  status,
}: {
  id: string
  title: string
  status?: "pending" | "ported"
}) {
  const pending = status === "pending"

  return (
    <Link
      href={cursorViewHref(id)}
      aria-label={pending ? `${title} (pending)` : title}
      className={cn(
        "group flex w-full cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card text-start no-underline outline-none",
        "transition-[border-color,background-color] hover:border-border",
        "focus-visible:ring-2 focus-visible:ring-ring",
        pending && "opacity-80"
      )}
    >
      <div
        aria-hidden
        className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden bg-muted/35 dark:bg-muted/25"
      >
        <MousePointerClickIcon className="size-10 text-muted-foreground/50 transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="bg-card px-2.5 py-2 md:px-3 md:py-2.5">
        <span className="block truncate text-[13px] font-medium text-foreground md:text-sm">
          {title}
          {pending ? " · pending" : ""}
        </span>
      </div>
    </Link>
  )
}
