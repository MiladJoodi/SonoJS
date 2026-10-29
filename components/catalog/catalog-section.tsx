import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function CatalogSection({
  id,
  title,
  count,
  icon,
  children,
  className,
  showHeader = true,
}: {
  id?: string
  title: string
  count?: number
  icon?: ReactNode
  children: ReactNode
  className?: string
  showHeader?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-[calc(var(--header-height)+1rem)]",
        className
      )}
    >
      {showHeader ? (
        <div className="mb-3 flex min-w-0 items-center gap-2 border-b border-border/50 pb-2 md:mb-4">
          {icon}
          <h2 className="text-sm font-semibold tracking-tight md:text-base">
            {title}
          </h2>
          <span
            aria-hidden
            className="mb-0.5 min-w-4 flex-1 border-b border-dashed border-border/50"
          />
          {typeof count === "number" ? (
            <span className="shrink-0 text-xs text-muted-foreground/70 tabular-nums">
              {count}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-2">
        {children}
      </div>
    </section>
  )
}
