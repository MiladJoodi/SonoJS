"use client"

import * as React from "react"

import { BlockInstallDrawer } from "@/components/blocks"
import {
  DirectionProvider,
  DirectionToggle,
} from "@/components/direction"
import type { Direction } from "@/lib/direction"
import { AgentRunTimeline } from "@/registry/blocks/ai-agents/agent-run-timeline/agent-run-timeline"

const usageSource = `import { AgentRunTimeline } from "@/components/blocks/agent-run-timeline"

export default function Page() {
  return <AgentRunTimeline />
}`

export function AgentRunTimelinePreviewFrame() {
  const [dir, setDir] = React.useState<Direction>("ltr")

  return (
    <div className="w-full min-w-0 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-h3">Preview</h2>
        <div className="flex items-center gap-2">
          <BlockInstallDrawer
            name="agent-run-timeline"
            title="Agent Run Timeline"
            usage={[{ title: "agent-run-timeline.tsx", code: usageSource }]}
          />
          <DirectionToggle value={dir} onValueChange={setDir} />
        </div>
      </div>
      <DirectionProvider
        dir={dir}
        className="h-[760px] overflow-hidden rounded-xl border border-border/80 bg-background"
      >
        <AgentRunTimeline />
      </DirectionProvider>
    </div>
  )
}
