import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("todo-list", "Todo List")

const exampleDefs = [
  {
    name: "todo-list-default",
    title: "Live progress",
    description:
      "Items advance from pending through in-progress to completed. The header count rolls, and Replay remounts the cycle.",
    requires: ["agent-disclosure"],
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "todo-list-complete",
    title: "Settled",
    description:
      "A finished list with completed and cancelled rows. `collapseOnComplete={false}` keeps it open.",
    requires: ["agent-disclosure"],
    npmRequires: ["lucide-react", "motion"],
  },
]

const usageSource = `import { TodoList } from "@/components/sonojs/todo-list"

export function Example() {
  return (
    <TodoList
      items={[
        { id: "1", title: "Read the brief", status: "completed" },
        { id: "2", title: "Draft the plan", status: "in-progress" },
        { id: "3", title: "Ship the update", status: "pending" },
      ]}
    />
  )
}`

export default async function TodoListDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Todo List"
        pathname="/docs/components/todo-list"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A collapsible task list that shows an AI agent&apos;s plan and
            progress — status icons, rolling counts, and disclosure animation.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="todo-list" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="todo-list.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "items",
              type: "TodoItem[]",
              defaultValue: "—",
              description: "Tasks with id, title, and optional status/detail.",
            },
            {
              name: "title",
              type: "ReactNode",
              defaultValue: '"To-dos"',
              description: "Header label next to the list icon.",
            },
            {
              name: "open / defaultOpen",
              type: "boolean",
              defaultValue: "true",
              description: "Controlled or uncontrolled disclosure state.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              defaultValue: "—",
              description: "Fires when the header expands or collapses.",
            },
            {
              name: "collapseOnComplete",
              type: "boolean",
              defaultValue: "true",
              description: "Auto-collapses when every item is completed.",
            },
            {
              name: "maxHeight",
              type: "number",
              defaultValue: "248",
              description: "Scroll viewport max height in pixels.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Optional class names on the root section.",
            },
          ]}
        />
      </section>
    </article>
  )
}
