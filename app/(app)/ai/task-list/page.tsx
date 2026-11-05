import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { aiDocsMetadata } from "@/lib/seo"

export const metadata = aiDocsMetadata("task-list", "Task List")

const exampleDefs = [
  {
    name: "task-list-default",
    title: "Task List",
    description:
      "Tasks reveal one unit at a time with soft height, blur, and a shimmering running title. File chips sit inline after the step label.",
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "task-list-in-chat",
    title: "In a chat",
    description:
      "Sending the message starts the run. The log streams under the user turn, and the answer only arrives once `onComplete` fires. Key the list on the turn id for a fresh run each send.",
    requires: ["prompt-input-2", "button", "popover", "select"],
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "task-list-chips",
    title: "Resource chips",
    description:
      "A step can name the files it touched. Pass `chips` and each renders inline after the label, with an optional glyph. Long names truncate rather than wrapping the row.",
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "task-list-timing",
    title: "Timing and collapse",
    description:
      "`startDelay` holds the first reveal, `stepInterval` paces the rest. Set `collapseOnComplete` so each task folds when its own steps land (or `\"all\"` to close together).",
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "task-list-controlled",
    title: "Driving it from real events",
    description:
      "Pass `revealed` to advance units from real tool events. The internal timer stays off and every animation still plays as each unit lands.",
    requires: ["button"],
    npmRequires: ["lucide-react", "motion"],
  },
]

const usageSource = `import { SearchIcon } from "lucide-react"
import { TaskList } from "@/components/sonojs/task-list"

const tasks = [
  {
    title: "Found project files",
    runningTitle: "Searching project files",
    icon: SearchIcon,
    steps: [
      { label: 'Searching "app/page.tsx, components structure"' },
      { label: "Read", chips: [{ label: "page.tsx" }] },
      { label: "Scanning 52 files" },
      { label: "Reading files", chips: [{ label: "layout.tsx" }] },
    ],
  },
]

export function Example() {
  return <TaskList tasks={tasks} />
}`

export default async function TaskListDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Task List"
        pathname="/ai/task-list"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A streaming log of what an agent actually did. Tasks reveal one unit
            at a time with soft height, blur, and a shimmering running title.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="task-list" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="task-list.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "tasks",
              type: "TaskListTask[]",
              defaultValue: "-",
              description:
                "Tasks with title, optional runningTitle/icon, and steps (label + chips).",
            },
            {
              name: "revealed",
              type: "number",
              defaultValue: "-",
              description:
                "Controlled unit count. Each task is 1 header + one unit per step.",
            },
            {
              name: "startDelay",
              type: "number",
              defaultValue: "320",
              description: "Ms before the first unit appears (uncontrolled).",
            },
            {
              name: "stepInterval",
              type: "number",
              defaultValue: "850",
              description: "Ms between automatic units (uncontrolled).",
            },
            {
              name: "collapseOnComplete",
              type: 'boolean | "all"',
              defaultValue: "-",
              description:
                "Collapse steps per task when done, or wait for the whole run (`\"all\"`). Off by default.",
            },
            {
              name: "collapseDelay",
              type: "number",
              defaultValue: "480",
              description: "Ms to hold completed steps before folding.",
            },
            {
              name: "onComplete",
              type: "() => void",
              defaultValue: "-",
              description: "Fires once when every unit has been revealed.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Optional class names on the root section.",
            },
          ]}
        />
      </section>
    </article>
  )
}
