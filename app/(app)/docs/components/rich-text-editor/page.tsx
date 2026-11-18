import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata(
  "rich-text-editor",
  "Rich Text Editor"
)

const exampleDefs = [
  {
    name: "rich-text-editor-default",
    title: "Simple",
    description:
      "Default `variant=\"simple\"` — one toolbar row with history, heading, marks, lists, and insert.",
  },
  {
    name: "rich-text-editor-advanced",
    title: "Advanced",
    description:
      "`variant=\"advanced\"` always shows two full toolbar rows (fonts, colors, indent, table, and more).",
  },
  {
    name: "rich-text-editor-expandable",
    title: "Expandable",
    description:
      "Pass `toolbarCollapsible` on advanced so row 2 toggles behind the expand chevron.",
  },
  {
    name: "rich-text-editor-rtl",
    title: "RTL",
    description:
      "Same editor with `dir=\"rtl\"` and `lang=\"fa\"` — toolbar, menus, and text follow the writing direction.",
  },
  {
    name: "rich-text-editor-rtl-advanced",
    title: "RTL Advanced",
    description:
      "Advanced toolbar in RTL: both rows, alignment order, and portaled menus stay right-to-left.",
  },
  {
    name: "rich-text-editor-controlled",
    title: "Controlled",
    description:
      "`value` + `onChange` — `onChange` returns both HTML and TipTap JSON.",
  },
  {
    name: "rich-text-editor-disabled",
    title: "Disabled",
    description: "Locks the editor and toolbar with `disabled`.",
  },
  {
    name: "rich-text-editor-readonly",
    title: "Read-only",
    description: "Show content without editing via `readOnly`.",
  },
  {
    name: "rich-text-editor-invalid",
    title: "Invalid",
    description:
      "Pair with `Field` (`data-invalid`) and set `aria-invalid` on the editor.",
    requires: ["field", "label", "separator"],
  },
]

const usageSource = `"use client"

import { RichTextEditor } from "@/components/rich-text-editor"

export function Example() {
  return <RichTextEditor placeholder="Write something…" />
}`

const compositionSource = `RichTextEditor
├── RichTextEditorToolbar (sticky / mobile keyboard dock)
└── EditorContent (TipTap)`

export default async function RichTextEditorDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Rich Text Editor"
        pathname="/docs/components/rich-text-editor"
        description={
          <p className="leading-relaxed text-muted-foreground">
            TipTap rich text with a compact toolbar. Default writing direction is{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              ltr
            </code>
            ; set{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              dir
            </code>{" "}
            and{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              lang
            </code>{" "}
            to match your content. On phones the toolbar docks above the
            keyboard; on desktop it stays sticky at the top.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="rich-text-editor" />

      <section className="space-y-3">
        <h2 className="text-h3">Composition</h2>
        <ComponentSource
          title="structure"
          lang="tsx"
          code={compositionSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="rich-text-editor.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "variant",
              type: '"simple" | "advanced"',
              defaultValue: '"simple"',
              description:
                "Simple one-row toolbar, or advanced with a full second row always visible.",
            },
            {
              name: "toolbarCollapsible",
              type: "boolean",
              defaultValue: "false",
              description:
                "On advanced only: collapse row 2 behind an expand control.",
            },
            {
              name: "dir",
              type: '"rtl" | "ltr" | "auto"',
              defaultValue: '"ltr"',
              description:
                "Writing direction on the editor root. Also drives ProseMirror text align.",
            },
            {
              name: "lang",
              type: "string",
              defaultValue: '"en"',
              description: "Language attribute on the editor root.",
            },
            {
              name: "value / defaultValue",
              type: "string | JSONContent",
              defaultValue: "-",
              description: "Controlled or uncontrolled HTML/JSON content.",
            },
            {
              name: "onChange",
              type: "(payload: { html; json }) => void",
              defaultValue: "-",
              description: "Fires on every TipTap update with HTML and JSON.",
            },
            {
              name: "placeholder",
              type: "string",
              defaultValue: '"Write something…"',
              description: "Empty-state placeholder text.",
            },
            {
              name: "disabled / readOnly",
              type: "boolean",
              defaultValue: "false",
              description: "Disable interaction or lock content for reading.",
            },
            {
              name: "onUploadImage",
              type: "(file: File) => Promise<string>",
              defaultValue: "-",
              description:
                "Optional uploader for the image dialog. Must return an http(s) URL.",
            },
            {
              name: "hideToolbar",
              type: "boolean",
              defaultValue: "false",
              description: "Hide the chrome toolbar (surface only).",
            },
            {
              name: "minHeight",
              type: "number | string",
              defaultValue: '"16rem"',
              description: "Minimum height of the ProseMirror surface.",
            },
          ]}
        />
      </section>
    </article>
  )
}
