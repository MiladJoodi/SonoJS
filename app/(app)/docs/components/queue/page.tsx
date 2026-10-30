import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("queue", "Queue")

const exampleDefs = [
  {
    name: "queue-default",
    title: "Queued messages & todos",
    description:
      "Collapsible sections for pending prompts and todos. Hover an item for send/remove actions; attachments render as images or file chips.",
    requires: ["button", "collapsible", "scroll-area"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemContent,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from "@/components/sonojs/queue"

export function Example() {
  return (
    <Queue>
      <QueueSection>
        <QueueSectionTrigger>
          <QueueSectionLabel count={2} label="Queued" />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            <QueueItem>
              <div className="flex items-center gap-2">
                <QueueItemIndicator />
                <QueueItemContent>How do I set up the project?</QueueItemContent>
                <QueueItemActions>
                  <QueueItemAction aria-label="Remove">…</QueueItemAction>
                </QueueItemActions>
              </div>
            </QueueItem>
          </QueueList>
        </QueueSectionContent>
      </QueueSection>
    </Queue>
  )
}`

export default async function QueueDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Queue"
        pathname="/docs/components/queue"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Collapsible sections for queued messages, todos, and attachments —
            built for AI workflow progress and pending work.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="queue" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="queue.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "defaultOpen",
              type: "boolean",
              defaultValue: "true",
              description: "`QueueSection` — start expanded.",
            },
            {
              name: "completed",
              type: "boolean",
              defaultValue: "false",
              description:
                "`QueueItemIndicator` / `Content` / `Description` — muted + strike-through.",
            },
            {
              name: "count / label",
              type: "number / string",
              description: "`QueueSectionLabel` — e.g. `3 Queued`.",
            },
            {
              name: "QueueMessage / QueueTodo",
              type: "types",
              description:
                "Optional data shapes for message parts and todo status.",
            },
          ]}
        />
      </section>
    </article>
  )
}
