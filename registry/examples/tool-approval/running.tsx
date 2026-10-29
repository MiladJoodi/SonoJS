"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import {
  ToolApproval,
  ToolApprovalCode,
  type ToolApprovalStatus,
} from "@sonojs/ui/components/tool-approval"

export function ToolApprovalRunning() {
  const [status, setStatus] = React.useState<ToolApprovalStatus>("pending")

  React.useEffect(() => {
    if (status !== "approving") return
    const t = window.setTimeout(() => setStatus("approved"), 700)
    return () => window.clearTimeout(t)
  }, [status])

  React.useEffect(() => {
    if (status !== "approved") return
    const t = window.setTimeout(() => setStatus("running"), 400)
    return () => window.clearTimeout(t)
  }, [status])

  React.useEffect(() => {
    if (status !== "running") return
    const t = window.setTimeout(() => setStatus("complete"), 1200)
    return () => window.clearTimeout(t)
  }, [status])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <ToolApproval
        tool="npm"
        title="Install registry dependencies?"
        description="Runs a scoped install for missing packages declared by the tool."
        status={status}
        defaultOpen
        parameters={[
          {
            id: "command",
            label: "Command",
            value: (
              <ToolApprovalCode
                language="bash"
                code={`npm i motion lucide-react shiki`}
              />
            ),
          },
        ]}
        onApprove={() => setStatus("approving")}
        onDeny={() => setStatus("denied")}
      />
      {status === "complete" || status === "denied" ? (
        <button
          type="button"
          onClick={() => setStatus("pending")}
          className="inline-flex cursor-pointer items-center gap-1.5 self-start text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcwIcon className="size-3.5" />
          Replay
        </button>
      ) : null}
    </div>
  )
}
