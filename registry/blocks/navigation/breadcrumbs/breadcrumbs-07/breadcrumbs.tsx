import type * as React from "react"
import { HomeIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@sonojs/ui/components/breadcrumb"

export default function Breadcrumbs({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <Breadcrumb
      className={cn(
        "mx-auto w-max max-w-full rounded-md border border-border/70 bg-muted p-3",
        className
      )}
      {...props}
    >
      <BreadcrumbList className="max-w-full justify-center gap-2 sm:gap-3">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            className="inline-flex items-center gap-2 font-medium text-muted-foreground hover:text-primary"
          >
            <HomeIcon className="size-4 shrink-0" aria-hidden />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            className="font-medium text-muted-foreground hover:text-primary"
          >
            Profile
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium">Edit</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
