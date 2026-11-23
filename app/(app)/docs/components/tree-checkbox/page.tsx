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

export const metadata = componentDocsMetadata("tree-checkbox", "Tree Checkbox")

const exampleDefs = [
  {
    name: "tree-checkbox-gallery",
    title: "Gallery",
    description:
      "Permissions tree with cascade select. Toggle `Documents` - parents show indeterminate when partial.",
    requires: ["checkbox", "collapsible", "badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tree-checkbox-default",
    title: "Basic",
    description: "Two-level tree with `defaultExpanded` and `defaultValue`.",
    requires: ["checkbox", "collapsible"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tree-checkbox-controlled",
    title: "Controlled",
    description:
      "Drive `value` / `onValueChange` with Select all / Clear via `collectAllIds`.",
    requires: ["checkbox", "collapsible", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tree-checkbox-expanded",
    title: "Expanded",
    description: "Open nested folders with `defaultExpanded`.",
    requires: ["checkbox", "collapsible"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tree-checkbox-disabled",
    title: "Disabled",
    description: "Per-node `disabled` (e.g. Billing) or disable the whole tree.",
    requires: ["checkbox", "collapsible"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tree-checkbox-form",
    title: "Form",
    description: "Pair with `Field` and submit the selected id list.",
    requires: ["checkbox", "collapsible", "field", "button"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { TreeCheckbox } from "@/components/tree-checkbox"

const data = [
  {
    id: "fruits",
    label: "Fruits",
    children: [
      { id: "apple", label: "Apple" },
      { id: "banana", label: "Banana" },
    ],
  },
]

export function Example() {
  return (
    <TreeCheckbox
      data={data}
      defaultExpanded={["fruits"]}
      onValueChange={(ids) => console.log(ids)}
    />
  )
}`

export default async function TreeCheckboxDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Tree Checkbox"
        pathname="/docs/components/tree-checkbox"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Nested checkboxes with cascade select. Checking a parent selects
            every descendant; partial children show the parent as{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              indeterminate
            </code>
            . Branches collapse with logical indent for LTR and RTL.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="canvas"
          previewClassName="items-start"
        />
      </section>

      <DocsInstallation name="tree-checkbox" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="tree-checkbox.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "data",
              type: "TreeCheckboxNode[]",
              defaultValue: "-",
              description: "Forest of nodes (`id`, `label`, optional `children` / `disabled`).",
            },
            {
              name: "value",
              type: "string[]",
              defaultValue: "-",
              description: "Controlled checked node ids (includes fully selected parents).",
            },
            {
              name: "defaultValue",
              type: "string[]",
              defaultValue: "[]",
              description: "Initial checked ids when uncontrolled.",
            },
            {
              name: "onValueChange",
              type: "(value: string[]) => void",
              defaultValue: "-",
              description: "Fires after cascade toggle.",
            },
            {
              name: "expanded",
              type: "string[]",
              defaultValue: "-",
              description: "Controlled open branch ids.",
            },
            {
              name: "defaultExpanded",
              type: "string[]",
              defaultValue: "[]",
              description: "Initial open branches when uncontrolled.",
            },
            {
              name: "onExpandedChange",
              type: "(expanded: string[]) => void",
              defaultValue: "-",
              description: "Fires when a branch opens or closes.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables the entire tree.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Merged onto the tree root.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/checkbox",
            title: "Checkbox",
            description: "leaf control + indeterminate dash",
          },
          {
            href: "/docs/components/collapsible",
            title: "Collapsible",
            description: "expand and collapse branches",
          },
          {
            href: "/docs/components/field",
            title: "Field",
            description: "label and describe the tree",
          },
        ]}
      />
    </article>
  )
}
