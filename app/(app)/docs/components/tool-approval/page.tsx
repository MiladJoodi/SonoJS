import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("tool-approval", "Tool Approval")

const exampleDefs = [
  {
    name: "tool-approval-running",
    title: "Running",
    description:
      "Allow once to watch the live status roll — approving spinner, approved, running, then complete. Replay resets the demo.",
    requires: ["agent-code", "agent-disclosure"],
    npmRequires: ["lucide-react", "motion", "shiki"],
  },
  {
    name: "tool-approval-default",
    title: "Pending",
    description:
      "Terminal tool call with parameters open — same approve flow as Running.",
    requires: ["agent-code", "agent-disclosure"],
    npmRequires: ["lucide-react", "motion", "shiki"],
  },
  {
    name: "tool-approval-denied",
    title: "Denied & error",
    description: "Settled denied and error states after the agent is blocked.",
    requires: ["agent-code", "agent-disclosure"],
    npmRequires: ["lucide-react", "motion", "shiki"],
  },
]

const usageSource = `import {
  ToolApproval,
  ToolApprovalCode,
} from "@/components/sonojs/tool-approval"

export function Example() {
  return (
    <ToolApproval
      tool="bash"
      title="Allow this tool to run?"
      description="Inspect git status before proposing a commit."
      defaultOpen
      parameters={[
        {
          id: "command",
          label: "Command",
          value: (
            <ToolApprovalCode language="bash" code="git status --short" />
          ),
        },
      ]}
      onApprove={() => {}}
      onAlwaysAllow={() => {}}
      onDeny={() => {}}
    />
  )
}`

export default async function ToolApprovalDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Tool Approval"
        pathname="/docs/components/tool-approval"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A permission prompt for approving an AI agent&apos;s tool call —
            status badge, expandable parameters, and allow / deny actions.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="tool-approval" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="tool-approval.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "tool",
              type: "ReactNode",
              defaultValue: "—",
              description: "Tool name shown in mono under the title.",
            },
            {
              name: "title",
              type: "ReactNode",
              defaultValue: '"Allow this tool to run?"',
              description: "Primary question for the permission prompt.",
            },
            {
              name: "description",
              type: "ReactNode",
              defaultValue: "—",
              description: "Optional supporting copy under the tool name.",
            },
            {
              name: "parameters",
              type: "ToolApprovalParameter[]",
              defaultValue: "[]",
              description:
                "Expandable detail rows (`id`, `label`, `value`). Use `ToolApprovalCode` for highlighted snippets.",
            },
            {
              name: "status",
              type: "ToolApprovalStatus",
              defaultValue: '"pending"',
              description:
                "`pending` | `approving` | `approved` | `denied` | `running` | `complete` | `error`.",
            },
            {
              name: "open / defaultOpen / onOpenChange",
              type: "boolean / fn",
              defaultValue: "uncontrolled",
              description: "Controls the parameters disclosure.",
            },
            {
              name: "onApprove / onAlwaysAllow / onDeny",
              type: "() => void",
              defaultValue: "—",
              description: "Pending-state action handlers.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Merge classes on the card root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
