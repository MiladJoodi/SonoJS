"use client"

import {
  ToolApproval,
  ToolApprovalCode,
} from "@sonojs/ui/components/tool-approval"

export function ToolApprovalDenied() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <ToolApproval
        tool="fs.write"
        title="Write to package.json?"
        description="Denied — the agent will ask for a safer approach."
        status="denied"
        defaultOpen
        parameters={[
          {
            id: "path",
            label: "Path",
            value: "package.json",
          },
          {
            id: "patch",
            label: "Patch",
            value: (
              <ToolApprovalCode
                language="diff"
                code={`-  "name": "app"\n+  "name": "sonojs"`}
              />
            ),
          },
        ]}
      />
      <ToolApproval
        tool="shell"
        title="Run destructive cleanup?"
        description="The command exited with a permission error."
        status="error"
        parameters={[
          {
            id: "command",
            label: "Command",
            value: (
              <ToolApprovalCode language="bash" code={`rm -rf ./dist`} />
            ),
          },
        ]}
      />
    </div>
  )
}
