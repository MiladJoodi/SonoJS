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

export const metadata = componentDocsMetadata("color-picker", "Color Picker")

const exampleDefs = [
  {
    name: "color-picker-default",
    title: "Basic",
    description: "Saturation panel, hue slider, and color input.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-popover",
    title: "In a form",
    description:
      "Accent color field — trigger opens the picker in a popover.",
    requires: [
      "slider",
      "input-group",
      "button",
      "popover",
      "field",
      "input",
    ],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-opacity",
    title: "With opacity",
    description: "Alpha channel for overlays and translucent fills.",
    requires: ["slider", "input-group", "button", "label"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-swatches",
    title: "With swatches",
    description: "Preset colors under the panel via `showSwatches`.",
    requires: ["slider", "input-group", "button", "label"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-disabled",
    title: "Disabled",
    description: "Pass `disabled` when the color cannot be changed.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { ColorPicker } from "@/components/color-picker"

export function Example() {
  return <ColorPicker defaultValue="#2563EB" showSwatches />
}`

export default async function ColorPickerDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Color Picker"
        pathname="/docs/components/color-picker"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Pick colors with a saturation panel, hue slider, optional opacity,
            swatches, copy, and EyeDropper. Supports HEX, RGB, HSL, and alpha
            formats.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="color-picker" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="color-picker.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "value / defaultValue / onValueChange",
              type: "string",
              defaultValue: '"#3B82F6"',
              description: "Controlled or uncontrolled color string.",
            },
            {
              name: "format / defaultFormat / onFormatChange",
              type: "ColorFormat",
              defaultValue: '"hex"',
              description: "Output format for the text field and callbacks.",
            },
            {
              name: "showOpacity",
              type: "boolean",
              defaultValue: "false",
              description: "Show the alpha slider.",
            },
            {
              name: "showSwatches",
              type: "boolean",
              defaultValue: "false",
              description: "Show the preset swatch grid.",
            },
            {
              name: "showEyeDropper",
              type: "boolean",
              defaultValue: "false",
              description:
                "Show pipette when `window.EyeDropper` exists (Chromium).",
            },
            {
              name: "showCopy / showFormatSelect",
              type: "boolean",
              defaultValue: "true",
              description: "Copy button and format chips.",
            },
            {
              name: "compact",
              type: "boolean",
              defaultValue: "false",
              description: "Narrower panel for popovers and forms.",
            },
            {
              name: "disabled / readOnly",
              type: "boolean",
              defaultValue: "false",
              description: "Lock interaction.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/input",
            title: "Input",
            description: "text fields",
          },
          {
            href: "/docs/components/popover",
            title: "Popover",
            description: "wrap the picker in a form",
          },
          {
            href: "/docs/components/slider",
            title: "Slider",
            description: "hue and opacity tracks",
          },
        ]}
      />
    </article>
  )
}
