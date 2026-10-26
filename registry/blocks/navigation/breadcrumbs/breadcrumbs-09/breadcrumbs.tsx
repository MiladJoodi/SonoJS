import type * as React from "react"

import { cn } from "@/lib/utils"
import { Breadcrumb } from "@sonojs/ui/components/breadcrumb"

const segmentClass =
  "inline-block cursor-pointer border border-border/70 bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-7 sm:py-2.5"

const currentClass =
  "inline-block border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground sm:px-7 sm:py-2.5"

export default function Breadcrumbs({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <Breadcrumb className={cn("w-full max-w-full", className)} {...props}>
      <div className="mx-auto max-w-full overflow-x-auto px-1">
        <div className="mx-auto flex w-max items-center">
          <a href="#" className={cn(segmentClass, "z-40 rounded-full")}>
            Home
          </a>
          <a
            href="#"
            className={cn(segmentClass, "z-30 -ms-5 rounded-e-full")}
          >
            Profile
          </a>
          <a
            href="#"
            className={cn(segmentClass, "z-20 -ms-5 rounded-e-full")}
          >
            Profile Details
          </a>
          <span
            aria-current="page"
            className={cn(currentClass, "z-10 -ms-5 rounded-e-full")}
          >
            Edit
          </span>
        </div>
      </div>
    </Breadcrumb>
  )
}
