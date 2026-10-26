import type * as React from "react"
import { HomeIcon, SquarePenIcon, UserIcon } from "lucide-react"

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
    <Breadcrumb className={cn("w-full max-w-full", className)} {...props}>
      <BreadcrumbList className="max-w-full justify-center gap-2 px-1 sm:gap-3">
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
            className="inline-flex items-center gap-2 font-medium text-muted-foreground hover:text-primary"
          >
            <UserIcon className="size-4 shrink-0" aria-hidden />
            Profile
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="inline-flex items-center gap-2 font-medium">
            <SquarePenIcon className="size-4 shrink-0" aria-hidden />
            Edit
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
