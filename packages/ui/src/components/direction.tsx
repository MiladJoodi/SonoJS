"use client"

import * as React from "react"
import { Direction } from "radix-ui"

import { cn } from "@sonojs/ui/lib/utils"

function DirectionProvider({
  dir,
  direction,
  className,
  children,
}: React.ComponentProps<typeof Direction.DirectionProvider> & {
  direction?: React.ComponentProps<typeof Direction.DirectionProvider>["dir"]
  className?: string
}) {
  const value = direction ?? dir
  return (
    <Direction.DirectionProvider dir={value}>
      <div dir={value} className={cn(className)}>
        {children}
      </div>
    </Direction.DirectionProvider>
  )
}

const useDirection = Direction.useDirection

export { DirectionProvider, useDirection }
