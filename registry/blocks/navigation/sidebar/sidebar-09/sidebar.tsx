"use client"

import type * as React from "react"

import { SidebarProvider } from "@sonojs/ui/components/sidebar"
import { cn } from "@/lib/utils"

import { AppSidebar } from "./app-sidebar"

export default function Sidebar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <SidebarProvider
      className={cn(
        "flex h-full min-h-128 w-full min-w-0 overflow-hidden",
        className
      )}
      {...props}
    >
      <AppSidebar />
    </SidebarProvider>
  )
}
