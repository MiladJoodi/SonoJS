import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Homepage body — matches `I:/Github/new/Sono/SonoJs` effective width.
 * That repo marks `max-w-[1180px]`, but unlayered `.workspace-shell`
 * (`--content-max: 1600px`) wins, so the visible column is 1600px.
 */
export function HomeShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("relative z-10 mx-auto w-full px-6 lg:px-8", className)}
      style={{ maxWidth: 1600 }}
    >
      {children}
    </div>
  )
}
