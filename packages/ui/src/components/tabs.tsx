"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@sonojs/ui/lib/utils"
import { Tabs as TabsPrimitive } from "radix-ui"

function Tabs({
  className,
  orientation = "horizontal",
  dir,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      dir={dir}
      className={cn(
        "group/tabs flex min-w-0 w-full gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  [
    "group/tabs-list flex min-w-0 items-center rounded-lg p-[3px] text-muted-foreground",
    "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
    // Horizontal: fill parent width so long triggers overflow inside the list (scroll), not the page.
    "group-data-[orientation=horizontal]/tabs:h-auto group-data-[orientation=horizontal]/tabs:min-h-9",
    "group-data-[orientation=horizontal]/tabs:w-full group-data-[orientation=horizontal]/tabs:max-w-full",
    "group-data-[orientation=horizontal]/tabs:flex-nowrap group-data-[orientation=horizontal]/tabs:justify-start",
    "group-data-[orientation=horizontal]/tabs:overflow-x-auto group-data-[orientation=horizontal]/tabs:overflow-y-hidden",
    "group-data-[orientation=horizontal]/tabs:overscroll-x-contain group-data-[orientation=horizontal]/tabs:touch-pan-x",
    // Vertical
    "group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:w-fit",
    "group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:overflow-visible",
    "data-[variant=line]:rounded-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const list = ref.current
    if (!list) return

    let down = false
    let moved = false
    let allowSelect = false
    let startX = 0
    let startScroll = 0
    let pending: HTMLElement | null = null

    const canScrollX = () => list.scrollWidth > list.clientWidth + 1
    const rtlSign = () =>
      getComputedStyle(list).direction === "rtl" ? -1 : 1

    // Capture: Radix selects on mousedown. Block that while we decide click vs drag.
    const onMouseDownCapture = (e: MouseEvent) => {
      if (allowSelect) return
      if (e.button !== 0) return
      if (!canScrollX()) return

      const trigger = (e.target as Element | null)?.closest?.(
        '[data-slot="tabs-trigger"]'
      ) as HTMLElement | null
      const onTrigger = Boolean(trigger && list.contains(trigger))

      if (onTrigger) {
        e.preventDefault()
        e.stopPropagation()
      }

      down = true
      moved = false
      pending = onTrigger ? trigger : null
      startX = e.pageX
      startScroll = list.scrollLeft
      list.style.userSelect = "none"
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!down) return
      const dx = e.pageX - startX
      // Hand jitter still counts as click.
      if (Math.abs(dx) < 8) return
      moved = true
      list.scrollLeft = startScroll - dx * rtlSign()
      e.preventDefault()
    }

    const onMouseUp = () => {
      if (!down) return
      down = false
      list.style.userSelect = ""
      const trigger = pending
      pending = null
      if (moved || !trigger) {
        moved = false
        return
      }
      // True click: let Radix activate via a synthetic mousedown.
      allowSelect = true
      trigger.dispatchEvent(
        new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          view: window,
          button: 0,
        })
      )
      allowSelect = false
      moved = false
    }

    const onWheel = (e: WheelEvent) => {
      if (!canScrollX()) return
      const delta =
        Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (!delta) return
      list.scrollLeft += delta * rtlSign()
      e.preventDefault()
    }

    list.addEventListener("mousedown", onMouseDownCapture, true)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    list.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      list.removeEventListener("mousedown", onMouseDownCapture, true)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      list.removeEventListener("wheel", onWheel)
      list.style.userSelect = ""
    }
  }, [])

  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // flex-none: never compress — overflow scrolls on the list instead.
        // outline-none + focus-visible:ring = ring only for keyboard (not mouse click).
        "relative inline-flex h-[calc(100%-1px)] flex-none shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-end-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
