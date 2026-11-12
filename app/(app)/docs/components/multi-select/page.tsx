import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
  DocsRelated,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("multi-select", "Multi Select")

const exampleDefs = [
  {
    name: "multi-select-gallery",
    title: "Gallery",
    description:
      "Skills picker card with live chip count — searchable list and removable badges.",
    requires: ["popover", "command", "badge", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "multi-select-default",
    title: "Basic",
    description:
      "Open a checkbox list from a trigger. Selected values show as chips.",
    requires: ["popover", "command", "badge", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "multi-select-searchable",
    title: "Searchable",
    description:
      "`searchable` (default `true`) filters options with `CommandInput`.",
    requires: ["popover", "command", "badge", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "multi-select-max-count",
    title: "Max count",
    description:
      "Pass `maxCount={2}` to collapse extra chips into a `+N more` badge.",
    requires: ["popover", "command", "badge", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "multi-select-form",
    title: "Form",
    description: "Pair with `Field` and `FieldLabel` for labeled form rows.",
    requires: ["popover", "command", "badge", "button", "field"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "multi-select-controlled",
    title: "Controlled",
    description:
      "Drive `value` / `onValueChange` and clear from outside the control.",
    requires: ["popover", "command", "badge", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "multi-select-disabled",
    title: "Disabled",
    description:
      "Disable the whole control, or mark individual options with `disabled`.",
    requires: ["popover", "command", "badge", "button"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { MultiSelect } from "@/components/multi-select"

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export function Example() {
  return (
    <MultiSelect
      options={frameworks}
      defaultValue={["next"]}
      placeholder="Select frameworks…"
    />
  )
}`

export default async function MultiSelectDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Multi Select"
        pathname="/docs/components/multi-select"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Pick several values from a searchable checkbox list. Selected items
            show as removable chips on the trigger. For autocomplete-style multi
            with an inline chip input, use Combobox with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              multiple
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="multi-select" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="multi-select.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "options",
              type: "MultiSelectOption[]",
              defaultValue: "-",
              description: "`{ value, label, disabled? }` items in the list.",
            },
            {
              name: "value",
              type: "string[]",
              defaultValue: "-",
              description: "Controlled selected values.",
            },
            {
              name: "defaultValue",
              type: "string[]",
              defaultValue: "[]",
              description: "Initial selection when uncontrolled.",
            },
            {
              name: "onValueChange",
              type: "(value: string[]) => void",
              defaultValue: "-",
              description: "Fires when the selection changes.",
            },
            {
              name: "placeholder",
              type: "string",
              defaultValue: '"Select…"',
              description: "Trigger text when nothing is selected.",
            },
            {
              name: "searchPlaceholder",
              type: "string",
              defaultValue: '"Search…"',
              description: "Placeholder for the search field.",
            },
            {
              name: "emptyText",
              type: "string",
              defaultValue: '"No results found."',
              description: "Shown when search matches nothing.",
            },
            {
              name: "searchable",
              type: "boolean",
              defaultValue: "true",
              description: "Show the search input in the popover.",
            },
            {
              name: "maxCount",
              type: "number",
              defaultValue: "-",
              description:
                "Max chips in the trigger before a `+N more` badge.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables the trigger and chip remove actions.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Merge Tailwind classes on the trigger.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/select",
            title: "Select",
            description: "single value from a button trigger",
          },
          {
            href: "/docs/components/combobox",
            title: "Combobox",
            description: "autocomplete multi with `multiple`",
          },
          {
            href: "/docs/components/field",
            title: "Field",
            description: "label and describe the control",
          },
        ]}
      />
    </article>
  )
}
