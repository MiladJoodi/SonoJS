import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type HomeSectionHeadingProps = {
  id: string
  children: ReactNode
  className?: string
}

/** Home band H2. */
export function HomeSectionHeading({
  id,
  children,
  className,
}: HomeSectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "text-balance text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-foreground",
        className
      )}
    >
      {children}
    </h2>
  )
}
