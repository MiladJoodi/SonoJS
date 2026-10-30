"use client"

import * as React from "react"

import { AiSidebar } from "@sonojs/ui/components/ai-sidebar"

export function AiSidebarCollapsed() {
  const [collapsed, setCollapsed] = React.useState(true)

  return (
    <div className="mx-auto flex h-[36rem] w-full max-w-3xl overflow-hidden rounded-[12px] border border-border/70 bg-canvas">
      <AiSidebar
        brandName="Sono"
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        onNewChat={() => {}}
        user={{ name: "Alex Rivera", plan: "Pro" }}
      />
      <div className="hidden flex-1 items-center justify-center p-8 text-sm text-muted-foreground sm:flex">
        Collapsed rail — click the panel icon to expand
      </div>
    </div>
  )
}
