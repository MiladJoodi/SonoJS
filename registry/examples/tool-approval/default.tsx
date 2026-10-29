"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import {
  ToolApproval,
  ToolApprovalCode,
  type ToolApprovalStatus,
} from "@sonojs/ui/components/tool-approval"

const PENDING_TITLE = "Allow this tool to run?"
const ACTIVE_TITLE = "Terminal access"

export function ToolApprovalDefault() {
  const [status, setStatus] = React.useState<ToolApprovalStatus>("pending")
  const [title, setTitle] = React.useState(PENDING_TITLE)

  const runApproveFlow = React.useCallback(() => {
    setTitle(ACTIVE_TITLE)
    setStatus("approving")
  }, [])

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

  const reset = React.useCallback(() => {
    setTitle(PENDING_TITLE)
    setStatus("pending")
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <ToolApproval
        tool="terminal.run"
        title={title}
        description="The agent wants to run the project test suite in the current workspace."
        status={status}
        defaultOpen
        parameters={[
          {
            id: "command",
            label: "Command",
            value: (
              <ToolApprovalCode
                language="bash"
                code={`bun test tests/a11y.test.tsx`}
              />
            ),
          },
          {
            id: "cwd",
            label: "Directory",
            value: "ui-components",
          },
        ]}
        onApprove={runApproveFlow}
        onAlwaysAllow={runApproveFlow}
        onDeny={() => setStatus("denied")}
      />
      {status === "complete" || status === "denied" ? (
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-1.5 self-start text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcwIcon className="size-3.5" />
          Replay
        </button>
      ) : null}
    </div>
  )
}
