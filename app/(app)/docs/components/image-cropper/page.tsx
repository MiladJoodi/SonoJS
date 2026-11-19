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

export const metadata = componentDocsMetadata("image-cropper", "Image Cropper")

const exampleDefs = [
  {
    name: "image-cropper-gallery",
    title: "Gallery",
    description:
      "Square avatar crop with zoom slider and `getCroppedImgUrl` preview.",
    requires: ["slider", "button", "badge"],
    npmRequires: ["lucide-react", "react-easy-crop"],
  },
  {
    name: "image-cropper-default",
    title: "Basic",
    description: "Drag to pan, use the slider (or scroll) to zoom. Default `aspect={1}`.",
    requires: ["slider"],
    npmRequires: ["react-easy-crop"],
  },
  {
    name: "image-cropper-aspect",
    title: "Aspect ratio",
    description: "Pass `aspect={16 / 9}` for widescreen crops.",
    requires: ["slider"],
    npmRequires: ["react-easy-crop"],
  },
  {
    name: "image-cropper-round",
    title: "Round",
    description: '`cropShape="round"` for circular avatar masks.',
    requires: ["slider"],
    npmRequires: ["react-easy-crop"],
  },
  {
    name: "image-cropper-zoom",
    title: "Controlled zoom",
    description: "Drive `zoom` / `onZoomChange` from outside state.",
    requires: ["slider"],
    npmRequires: ["react-easy-crop"],
  },
  {
    name: "image-cropper-file",
    title: "Local file",
    description: "Pick an image, crop in the browser, preview the blob URL.",
    requires: ["slider", "button"],
    npmRequires: ["react-easy-crop"],
  },
  {
    name: "image-cropper-dialog",
    title: "Dialog",
    description: "Open the cropper in a `Dialog` for profile photo flows.",
    requires: ["slider", "button", "dialog"],
    npmRequires: ["react-easy-crop"],
  },
  {
    name: "image-cropper-disabled",
    title: "Disabled",
    description: "Freeze the stage and zoom slider with `disabled`.",
    requires: ["slider"],
    npmRequires: ["react-easy-crop"],
  },
]

const usageSource = `import * as React from "react"
import {
  DEMO_IMAGE,
  ImageCropper,
  getCroppedImg,
} from "@/components/image-cropper"

export function Example() {
  const [pixels, setPixels] = React.useState<Area | null>(null)

  return (
    <ImageCropper
      src={DEMO_IMAGE}
      aspect={1}
      onCropComplete={(_, area) => setPixels(area)}
    />
  )
}`

export default async function ImageCropperDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Image Cropper"
        pathname="/docs/components/image-cropper"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Pan, zoom, and crop images in the browser with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              react-easy-crop
            </code>
            . SonoJS wraps the stage and zoom slider; export a{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              Blob
            </code>{" "}
            via{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              getCroppedImg
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="image-cropper" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="image-cropper.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "src",
              type: "string",
              defaultValue: "-",
              description: "Image URL or object URL to crop.",
            },
            {
              name: "aspect",
              type: "number",
              defaultValue: "1",
              description: "Crop aspect ratio (width / height).",
            },
            {
              name: "cropShape",
              type: '"rect" | "round"',
              defaultValue: '"rect"',
              description: "Rectangle or circular crop mask.",
            },
            {
              name: "zoom",
              type: "number",
              defaultValue: "-",
              description: "Controlled zoom level.",
            },
            {
              name: "defaultZoom",
              type: "number",
              defaultValue: "1",
              description: "Initial zoom when uncontrolled.",
            },
            {
              name: "onZoomChange",
              type: "(zoom: number) => void",
              defaultValue: "-",
              description: "Zoom change callback.",
            },
            {
              name: "minZoom / maxZoom",
              type: "number",
              defaultValue: "1 / 3",
              description: "Zoom bounds for the slider and gestures.",
            },
            {
              name: "onCropComplete",
              type: "(area, pixels) => void",
              defaultValue: "-",
              description: "Fires when a crop gesture ends. Use `pixels` with `getCroppedImg`.",
            },
            {
              name: "showZoomSlider",
              type: "boolean",
              defaultValue: "true",
              description: "Show the SonoJS zoom `Slider` under the stage.",
            },
            {
              name: "showGrid",
              type: "boolean",
              defaultValue: "true",
              description: "Rule-of-thirds grid overlay.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disable pan, zoom, and the slider.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Merged onto the root wrapper.",
            },
            {
              name: "stageClassName",
              type: "string",
              defaultValue: "-",
              description: "Merged onto the crop stage (default `h-72`).",
            },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Helpers</h2>
        <DocsApiProps
          rows={[
            {
              name: "getCroppedImg",
              type: "(src, pixels, options?) => Promise<Blob | null>",
              defaultValue: "-",
              description: "Canvas crop to a Blob (PNG by default).",
            },
            {
              name: "getCroppedImgUrl",
              type: "(src, pixels, options?) => Promise<string | null>",
              defaultValue: "-",
              description: "Object URL for previews. Revoke when done.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/dropzone",
            title: "Dropzone",
            description: "pick files before cropping",
          },
          {
            href: "/docs/components/dialog",
            title: "Dialog",
            description: "modal crop for avatars",
          },
          {
            href: "/docs/components/slider",
            title: "Slider",
            description: "zoom control under the stage",
          },
        ]}
      />
    </article>
  )
}
