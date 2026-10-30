"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { useDirection } from "@/hooks/use-direction"
import { getStartSide } from "@/lib/direction"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@sonojs/ui/components/sheet"

export function ListIndexNav({
  title = "Index",
  current,
  children,
  className,
  /** Workspace shells sit below SiteHeader already — skip sticky header offset. */
  flush = false,
}: {
  title?: string
  current?: string | null
  children: React.ReactNode
  className?: string
  flush?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const { dir } = useDirection()
  const startSide = getStartSide(dir)

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <div
        data-list-index-nav=""
        className={cn(
          "z-40 border-b border-border/80 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80 lg:hidden",
          flush
            ? "relative top-0 shrink-0"
            : "sticky top-(--header-height) transition-[top] duration-300 ease-out [[data-header-hidden]_&]:top-0",
          className
        )}
      >
        <div className="workspace-shell">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(true)}
            className={cn(
              "h-11 w-full cursor-pointer justify-start gap-2.5 rounded-none px-0 text-sm font-medium hover:bg-transparent",
              /* Room for workspace actions overlaid on this row (Write/Preview/…) */
              flush && "pe-[9.5rem]"
            )}
            aria-expanded={open}
            aria-controls="list-index-sheet"
          >
            <MenuIcon className="size-4 shrink-0" aria-hidden />
            <span>{title}</span>
            {current ? (
              <>
                <span className="text-muted-foreground/70" aria-hidden>
                  /
                </span>
                <span className="truncate text-muted-foreground">{current}</span>
              </>
            ) : null}
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          id="list-index-sheet"
          side={startSide}
          className="w-[min(100%,20rem)] gap-0 p-0 data-[state=closed]:duration-200 data-[state=open]:duration-200 sm:max-w-sm"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <SheetHeader className="border-b border-border/80 px-4 py-3 text-start">
            <SheetTitle className="text-base">{title}</SheetTitle>
            <SheetDescription className="sr-only">
              Page and category index
            </SheetDescription>
          </SheetHeader>
          <div className="no-scrollbar h-[calc(100svh-3.25rem)] overflow-y-auto overscroll-contain p-2 pb-8">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
