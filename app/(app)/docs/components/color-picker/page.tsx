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
    name: "color-picker-gallery",
    title: "Gallery",
    description:
      "Full panel with opacity, swatches, formats, EyeDropper, and copy.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-default",
    title: "Basic",
    description: "Saturation panel, hue slider, and HEX input.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-controlled",
    title: "Controlled",
    description: "Drive `value` / `onValueChange` from parent state.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-compact",
    title: "Compact",
    description: "Pass `compact` for a narrower form-friendly panel.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-popover",
    title: "Popover",
    description: "Wrap the panel in `Popover` with a color trigger.",
    requires: ["slider", "input-group", "button", "popover"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-formats",
    title: "Formats",
    description: "Switch HEX, RGB, HSL, RGBA, HSLA via `format`.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-opacity",
    title: "Opacity",
    description: "`showOpacity` adds an alpha slider and percent label.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-presets",
    title: "Preset swatches",
    description: "Default palette via `showSwatches`.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-custom-swatches",
    title: "Custom swatches",
    description: "Pass `swatches` and `disabledSwatches`.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-eyedropper",
    title: "EyeDropper",
    description:
      "`showEyeDropper` uses the browser API when available; hidden otherwise.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-history",
    title: "Color history",
    description: "`showRecent` with controlled `recentColors`.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-disabled",
    title: "Disabled / readonly",
    description: "`disabled` and `readOnly` lock interaction.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "color-picker-custom-styling",
    title: "Custom styling",
    description: "Merge layout classes via `className`.",
    requires: ["slider", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { ColorPicker } from "@/components/color-picker"

export function Example() {
  return (
    <ColorPicker
      defaultValue="#3B82F6"
      showOpacity
      showSwatches
      showCopy
    />
  )
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
            HSVA color panel with hue and opacity sliders, format switching
            (HEX, RGB, HSL, and alpha variants), swatches, copy, and optional
            EyeDropper. Pure conversion math — no color library. See also{" "}
            <a
              href="/docs/components/gradient-picker"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Gradient Picker
            </a>{" "}
            and{" "}
            <a
              href="/docs/components/color-palette"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Color Palette
            </a>
            .
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
              name: "showSwatches / swatches / swatchColumns",
              type: "boolean / string[] / number",
              defaultValue: "false / defaults / 6",
              description: "Preset color grid.",
            },
            {
              name: "showRecent / recentColors",
              type: "boolean / string[]",
              defaultValue: "false",
              description: "Recent color history row.",
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
              description: "Narrower panel for forms / popovers.",
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
            href: "/docs/components/gradient-picker",
            title: "Gradient Picker",
            description: "linear / radial CSS gradients",
          },
          {
            href: "/docs/components/color-palette",
            title: "Color Palette",
            description: "harmony generator",
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
