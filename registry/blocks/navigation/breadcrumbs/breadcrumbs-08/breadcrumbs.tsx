"use client"

import type * as React from "react"
import { HomeIcon, MoreHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@sonojs/ui/components/breadcrumb"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="More breadcrumb links"
                className="text-muted-foreground"
              >
                <MoreHorizontalIcon className="size-4" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>History</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
