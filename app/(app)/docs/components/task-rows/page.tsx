import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("task-rows", "Task Rows")

const exampleDefs = [
  {
    name: "task-rows-cards",
    title: "Cards",
    description:
      "Separate elevated rows that auto-advance through running and completed states. Replay remounts the timeline.",
    npmRequires: ["lucide-react"],
  },
  {
    name: "task-rows-list",
    title: "List",
    description:
      "`variant=\"list\"` groups the same progress rows into one bordered surface.",
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { TaskRows } from "@/components/sonojs/task-rows"

export function Example() {
  return <TaskRows variant="cards" />
}`

export default async function TaskRowsDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Task Rows"
        pathname="/docs/components/task-rows"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Expandable task rows that show an AI agent&apos;s live progress —
            status icons, amounts, and nested detail lines.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="task-rows" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="task-rows.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "variant",
              type: '"cards" | "list"',
              defaultValue: '"cards"',
              description:
                "Cards keeps each row separate; list groups them into one surface.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Optional class names on the root container.",
            },
          ]}
        />
      </section>
    </article>
  )
}
