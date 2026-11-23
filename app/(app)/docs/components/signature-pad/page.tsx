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

export const metadata = componentDocsMetadata("signature-pad", "Signature Pad")

const exampleDefs = [
  {
    name: "signature-pad-gallery",
    title: "Gallery",
    description:
      "Undo, clear, and preview a PNG. `ref` exposes `clear` / `undo` / `toDataURL`.",
    requires: ["button", "badge"],
    npmRequires: ["lucide-react", "signature_pad"],
  },
  {
    name: "signature-pad-default",
    title: "Basic",
    description: "Draw with mouse or finger. Optional `guide` baseline.",
    npmRequires: ["signature_pad"],
  },
  {
    name: "signature-pad-contract",
    title: "Contract",
    description:
      "Agree checkbox + required signature before submit - classic delivery / waiver flow.",
    requires: ["button", "checkbox", "field"],
    npmRequires: ["signature_pad"],
  },
  {
    name: "signature-pad-dialog",
    title: "Dialog",
    description: "Collect a signature in a modal, then show the saved PNG.",
    requires: ["button", "dialog"],
    npmRequires: ["signature_pad"],
  },
  {
    name: "signature-pad-stroke",
    title: "Stroke controls",
    description: "`penColor` and `strokeWidth` update live without wiping the pad.",
    requires: ["slider", "label"],
    npmRequires: ["signature_pad"],
  },
  {
    name: "signature-pad-invalid",
    title: "Invalid",
    description: "Pass `invalid` when submit runs on an empty pad.",
    requires: ["button"],
    npmRequires: ["signature_pad"],
  },
  {
    name: "signature-pad-disabled",
    title: "Disabled",
    description: "Show a stored signature read-only with `disabled`.",
    npmRequires: ["signature_pad"],
  },
  {
    name: "signature-pad-export",
    title: "Export",
    description: "`toBlob` for download, `toDataURL` for clipboard / upload.",
    requires: ["button"],
    npmRequires: ["signature_pad"],
  },
  {
    name: "signature-pad-mobile",
    title: "Mobile",
    description: "Taller stage + thicker stroke for finger signing.",
    requires: ["button"],
    npmRequires: ["signature_pad"],
  },
]

const usageSource = `import * as React from "react"
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@/components/signature-pad"

export function Example() {
  const ref = React.useRef<SignaturePadHandle>(null)

  return (
    <>
      <SignaturePad ref={ref} guide="Sign here" />
      <button type="button" onClick={() => ref.current?.clear()}>
        Clear
      </button>
    </>
  )
}`

export default async function SignaturePadDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Signature Pad"
        pathname="/docs/components/signature-pad"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Capture handwritten signatures with mouse or touch via{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              signature_pad
            </code>
            . Imperative{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              clear
            </code>
            ,{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              undo
            </code>
            , and PNG export through a ref.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="signature-pad" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="signature-pad.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "penColor",
              type: "string",
              defaultValue: '"#0a0a0a"',
              description: "Ink color.",
            },
            {
              name: "strokeWidth",
              type: "number",
              defaultValue: "2",
              description: "Base stroke width (maps to pressure min/max).",
            },
            {
              name: "guide",
              type: "string",
              defaultValue: "-",
              description: "Caption + dashed baseline under the pad.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Blocks drawing (read-only stored signatures).",
            },
            {
              name: "invalid",
              type: "boolean",
              defaultValue: "false",
              description: "Destructive border for empty-required states.",
            },
            {
              name: "onEmptyChange",
              type: "(empty: boolean) => void",
              defaultValue: "-",
              description: "Fires when the pad becomes empty or has ink.",
            },
            {
              name: "onBegin / onEnd",
              type: "() => void",
              defaultValue: "-",
              description: "Stroke lifecycle callbacks.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Merged onto the pad stage (default `h-48`).",
            },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Handle (ref)</h2>
        <DocsApiProps
          rows={[
            {
              name: "clear()",
              type: "void",
              defaultValue: "-",
              description: "Erase the pad.",
            },
            {
              name: "undo()",
              type: "void",
              defaultValue: "-",
              description: "Remove the last stroke.",
            },
            {
              name: "isEmpty()",
              type: "boolean",
              defaultValue: "-",
              description: "Whether any ink is present.",
            },
            {
              name: "toDataURL()",
              type: "string",
              defaultValue: "-",
              description: "PNG (or other MIME) data URL.",
            },
            {
              name: "toBlob()",
              type: "Promise<Blob | null>",
              defaultValue: "-",
              description: "Blob for upload / download.",
            },
            {
              name: "toData() / fromData()",
              type: "PointGroup[]",
              defaultValue: "-",
              description: "Serialize / restore stroke data.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/dialog",
            title: "Dialog",
            description: "modal signature capture",
          },
          {
            href: "/docs/components/field",
            title: "Field",
            description: "label required signature rows",
          },
          {
            href: "/docs/components/image-cropper",
            title: "Image Cropper",
            description: "crop photos before upload",
          },
        ]}
      />
    </article>
  )
}
