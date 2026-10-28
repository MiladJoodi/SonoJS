"use client"

import * as React from "react"
import { useDirection } from "@sonojs/ui/hooks/use-direction"
import { cn } from "@sonojs/ui/lib/utils"
import { Tooltip as TooltipPrimitive } from "radix-ui"

const DESKTOP_HOVER_MQ = "(hover: hover) and (pointer: fine)"

/** True only on fine-pointer hover devices (desktop mouse) — not phone/tablet touch. */
function useDesktopHover() {
  const [ok, setOk] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia(DESKTOP_HOVER_MQ)
    const update = () => setOk(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return ok
}

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  open,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const desktopHover = useDesktopHover()

  return (
    <TooltipPrimitive.Root
      data-slot="tooltip"
      {...props}
      open={desktopHover ? open : false}
      onOpenChange={desktopHover ? onOpenChange : undefined}
    />
  )
}

function TooltipTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      className={cn("cursor-pointer", className)}
      {...props}
    />
  )
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  // Portal renders under <body>; set dir so RTL from DirectionProvider still applies.
  const { dir } = useDirection()

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        dir={dir}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-sm bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
