import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

type HomeSectionHeadingProps = {
  id: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** Home band H2. */
export function HomeSectionHeading({
  id,
  children,
  className,
  style,
}: HomeSectionHeadingProps) {
  return (
    <h2
      id={id}
      style={style}
      className={cn(
        "text-balance text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-foreground",
        className
      )}
    >
      {children}
    </h2>
  )
}
