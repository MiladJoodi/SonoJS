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

export const metadata = componentDocsMetadata("tags-input", "Tags Input")

const exampleDefs = [
  {
    name: "tags-input-gallery",
    title: "Gallery",
    description:
      "Post tags card with a live count. Type and press `Enter` or `,` to create chips.",
    requires: ["avatar", "badge", "command", "popover"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tags-input-default",
    title: "Basic",
    description:
      "Creatable chips in an input-shaped control. Backspace removes the last chip.",
    requires: ["avatar", "badge", "command", "popover"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tags-input-suggestions",
    title: "Suggestions",
    description:
      "Pass `options` to filter a list and keep `creatable` to add missing values.",
    requires: ["avatar", "badge", "command", "popover"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tags-input-mention",
    title: "Mention",
    description:
      '`mode="mention"` shows people rows with avatar and `@handle` chips.',
    requires: ["avatar", "badge", "command", "popover"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tags-input-emails",
    title: "Emails",
    description:
      "Invite by email with `validate` and space/comma delimiters.",
    requires: ["avatar", "badge", "command", "popover"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tags-input-max",
    title: "Max",
    description: "Pass `max={5}` to stop accepting more chips.",
    requires: ["avatar", "badge", "command", "popover"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tags-input-form",
    title: "Form",
    description: "Pair with `Field` and `FieldLabel` for labeled form rows.",
    requires: ["avatar", "badge", "command", "popover", "field"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tags-input-controlled",
    title: "Controlled",
    description:
      "Drive `value` / `onValueChange` and clear from outside the control.",
    requires: ["avatar", "badge", "command", "popover", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "tags-input-disabled",
    title: "Disabled",
    description:
      "Disable the whole control, or mark individual `options` with `disabled`.",
    requires: ["avatar", "badge", "command", "popover"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { TagsInput } from "@/components/tags-input"

export function Example() {
  return (
    <TagsInput
      defaultValue={["design", "rtl"]}
      placeholder="Add a tag…"
    />
  )
}`

export default async function TagsInputDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Tags Input"
        pathname="/docs/components/tags-input"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Type to create chips, or pick from suggestions. Use{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              mode=&quot;mention&quot;
            </code>{" "}
            for teammates with avatars. Multi Select is pick-only from a
            trigger; Combobox{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              multiple
            </code>{" "}
            is fixed items - Tags Input is for create-as-you-type.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="tags-input" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="tags-input.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "value",
              type: "string[]",
              defaultValue: "-",
              description: "Controlled chip values.",
            },
            {
              name: "defaultValue",
              type: "string[]",
              defaultValue: "[]",
              description: "Initial chips when uncontrolled.",
            },
            {
              name: "onValueChange",
              type: "(value: string[]) => void",
              defaultValue: "-",
              description: "Fires when chips change.",
            },
            {
              name: "options",
              type: "TagsInputOption[]",
              defaultValue: "[]",
              description:
                "`{ value, label, disabled?, avatar?, description? }` suggestions.",
            },
            {
              name: "mode",
              type: '"tags" | "mention"',
              defaultValue: '"tags"',
              description:
                "`mention` shows people rows and `@` chip labels.",
            },
            {
              name: "trigger",
              type: "string",
              defaultValue: '"@"',
              description: "Mention prefix stripped when matching typed text.",
            },
            {
              name: "creatable",
              type: "boolean",
              defaultValue: "true in tags / false in mention",
              description: "Allow creating a chip from typed text.",
            },
            {
              name: "delimiters",
              type: "string[]",
              defaultValue: '["Enter", ","]',
              description:
                "`Enter` commits on keydown; other single chars split on type/paste.",
            },
            {
              name: "max",
              type: "number",
              defaultValue: "-",
              description: "Maximum number of chips.",
            },
            {
              name: "allowDuplicates",
              type: "boolean",
              defaultValue: "false",
              description: "Allow the same value more than once.",
            },
            {
              name: "validate",
              type: "(raw: string) => boolean",
              defaultValue: "-",
              description: "Return `false` to reject a creatable commit.",
            },
            {
              name: "placeholder",
              type: "string",
              defaultValue: '"Add a tag…"',
              description: "Shown when there are no chips.",
            },
            {
              name: "emptyText",
              type: "string",
              defaultValue: '"No results found."',
              description: "Empty state in the suggestions list.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables the field and chip remove actions.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Merge Tailwind classes on the field.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/multi-select",
            title: "Multi Select",
            description: "pick-only chips from a popover list",
          },
          {
            href: "/docs/components/combobox",
            title: "Combobox",
            description: "fixed-item chips with `multiple`",
          },
          {
            href: "/docs/components/badge",
            title: "Badge",
            description: "chip chrome used inside the field",
          },
        ]}
      />
    </article>
  )
}
