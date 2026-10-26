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

const pillLinkClass =
  "inline-flex items-center gap-2 rounded-full bg-muted px-2.5 py-1.5 font-medium text-muted-foreground hover:text-primary sm:px-3"

const pillPageClass =
  "inline-flex items-center gap-2 rounded-full bg-foreground px-2.5 py-1.5 font-medium text-background sm:px-3"

export default function Breadcrumbs({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <Breadcrumb className={cn("w-full max-w-full", className)} {...props}>
      <BreadcrumbList className="max-w-full justify-center gap-2 px-1 sm:gap-3">
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className={pillLinkClass}>
            <HomeIcon className="size-4 shrink-0" aria-hidden />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-lg font-medium text-muted-foreground sm:text-xl">
          /
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className={pillLinkClass}>
            <UserIcon className="size-4 shrink-0" aria-hidden />
            Profile
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-lg font-medium text-muted-foreground sm:text-xl">
          /
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className={pillPageClass}>
            <SquarePenIcon className="size-4 shrink-0" aria-hidden />
            Edit
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
