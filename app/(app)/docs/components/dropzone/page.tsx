import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("dropzone", "Dropzone")

const exampleDefs = [
  {
    name: "dropzone-gallery",
    title: "Gallery",
    description:
      "Polished media card: format chips, image dropzone, and simulated upload progress.",
    requires: ["button", "progress", "badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "dropzone-default",
    title: "Basic",
    description:
      "Multi-file drop zone with type and size limits. Native drag and drop — no upload library.",
    requires: ["button", "progress"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "dropzone-images",
    title: "Images",
    description:
      "Pass `accept=\"image/*\"` for image-only picks with thumbnail previews.",
    requires: ["button", "progress"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "dropzone-documents",
    title: "Documents",
    description:
      "PDF / Word docs with `onReject` feedback when a file fails validation.",
    requires: ["button", "progress"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "dropzone-avatar",
    title: "Avatar",
    description:
      "Single image slot with a live circular preview above the zone.",
    requires: ["button", "progress"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "dropzone-single",
    title: "Single file",
    description: "Use `multiple={false}` and `maxFiles={1}` for one PDF slot.",
    requires: ["button", "progress"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "dropzone-with-progress",
    title: "With progress",
    description:
      "Queue files first, then drive `status` and `progress` when Upload runs.",
    requires: ["button", "progress"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "dropzone-reject",
    title: "Reject",
    description:
      "Surface `onReject` errors with an `Alert` when type, size, or maxFiles fails.",
    requires: ["button", "progress", "alert"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "dropzone-disabled",
    title: "Disabled",
    description: "Pass `disabled` to lock the zone and file actions.",
    requires: ["button", "progress"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { Dropzone } from "@/components/dropzone"

export function Example() {
  return (
    <Dropzone
      accept="image/png,image/jpeg,application/pdf"
      maxSize={5 * 1024 * 1024}
      maxFiles={5}
      multiple
    />
  )
}`

export default async function DropzoneDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Dropzone"
        pathname="/docs/components/dropzone"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Lightweight file drop zone with browse, validation, image previews,
            and optional progress. Built on native drag and drop — no upload
            library. Control chrome matches SonoJS{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              rounded-[12px]
            </code>{" "}
            surfaces.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="dropzone" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="dropzone.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "value",
              type: "DropzoneFile[]",
              defaultValue: "-",
              description: "Controlled file list.",
            },
            {
              name: "defaultValue",
              type: "DropzoneFile[]",
              defaultValue: "[]",
              description: "Initial files when uncontrolled.",
            },
            {
              name: "onValueChange",
              type: "(files: DropzoneFile[]) => void",
              defaultValue: "-",
              description: "Fires when the file list changes.",
            },
            {
              name: "onReject",
              type: "(rejections: DropzoneRejection[]) => void",
              defaultValue: "-",
              description:
                "Fires for files rejected by type, size, or maxFiles.",
            },
            {
              name: "accept",
              type: "string",
              defaultValue: "-",
              description:
                "HTML accept string, e.g. `image/*,application/pdf`.",
            },
            {
              name: "maxSize",
              type: "number",
              defaultValue: "-",
              description: "Max bytes per file.",
            },
            {
              name: "maxFiles",
              type: "number",
              defaultValue: "Infinity",
              description: "Max files allowed in the list.",
            },
            {
              name: "multiple",
              type: "boolean",
              defaultValue: "true",
              description: "Allow selecting more than one file at a time.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables the zone and remove actions.",
            },
            {
              name: "label",
              type: "string",
              defaultValue: '"Drop files here or browse"',
              description: "Primary text inside the drop zone.",
            },
            {
              name: "description",
              type: "string",
              defaultValue: "-",
              description:
                "Hint under the label. Defaults from accept / maxSize / maxFiles.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Merge Tailwind classes on the root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
