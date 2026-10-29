import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("approval-card", "Approval Card")

const exampleDefs = [
  {
    name: "approval-card-questions",
    title: "Questions",
    description:
      "Multi-step questions with checkboxes, radios, progress dots, and optional custom input.",
    requires: ["agent-disclosure", "button", "checkbox"],
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "approval-card-default",
    title: "Basic",
    description:
      "Approve, request changes, or reject a proposed agent action. Settled states collapse via `AgentDisclosure`.",
    requires: ["agent-disclosure", "button", "checkbox"],
    npmRequires: ["lucide-react", "motion"],
  },
]

const usageSource = `import { ApprovalCard } from "@/components/sonojs/approval-card"

export function Example() {
  return (
    <ApprovalCard
      title="Deploy schema migration"
      description="Apply the pending change to production."
      onApprove={() => {}}
      onReject={() => {}}
      onRequestChanges={() => {}}
    />
  )
}`

export default async function ApprovalCardDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Approval Card"
        pathname="/docs/components/approval-card"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A review card for approving an AI agent&apos;s proposed action —
            simple approve/reject or a short question flow.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="approval-card" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="approval-card.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "title",
              type: "ReactNode",
              defaultValue: '"Approval required"',
              description: "Header title (rolls when questions change).",
            },
            {
              name: "description",
              type: "ReactNode",
              defaultValue: "—",
              description: "Body copy for simple (non-question) mode.",
            },
            {
              name: "status",
              type: "ApprovalCardStatus",
              defaultValue: '"pending"',
              description:
                "`pending` | `submitting` | `approved` | `rejected` | `changes-requested` | `answered`.",
            },
            {
              name: "questions",
              type: "ApprovalCardQuestion[]",
              defaultValue: "[]",
              description: "When set, switches to the stepped question flow.",
            },
            {
              name: "onApprove / onReject / onRequestChanges",
              type: "() => void",
              defaultValue: "—",
              description: "Simple-mode action handlers.",
            },
            {
              name: "onSubmit",
              type: "(answers) => void",
              defaultValue: "—",
              description: "Called when the last question is submitted.",
            },
            {
              name: "result",
              type: "ReactNode",
              defaultValue: "—",
              description: "Settled-state summary under the header.",
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
