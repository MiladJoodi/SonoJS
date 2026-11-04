import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Cool Slide Gallery",
  description:
    "A 3D coverflow image gallery with tilt, depth, drag, keyboard, and autoplay. Install with the SonoJS CLI.",
  path: "/carousels/cool-slide-gallery",
})

const exampleDefs = [
  {
    name: "cool-slide-gallery-default",
    title: "Default",
    description:
      "Cards fan in perspective with tilt and depth. Drag, arrows, dots, titles, badges, and keyboard navigation.",
  },
]

const usage = `"use client"

import { CoolSlideGallery } from "@/components/carousels/cool-slide-gallery"

export default function Page() {
  return (
    <CoolSlideGallery
      cardWidth={360}
      cardHeight={420}
      showTitle
      showArrows
      showDots
      draggable
      keyboardNavigation
      easing="smooth"
    />
  )
}`

export default async function CoolSlideGalleryPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Cool Slide Gallery"
        pathname="/carousels/cool-slide-gallery"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A coverflow-style 3D gallery with configurable tilt, depth, and
            scale. Pass{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              slides
            </code>{" "}
            or use the bundled demos. Built with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              motion
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
        />
      </section>

      <DocsInstallation name="cool-slide-gallery" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Demo images install under{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            components/carousels/cool-slide-gallery/images/
          </code>
          . Pass your own{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            slides
          </code>{" "}
          when you replace them.
        </p>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "slides",
              type: "CoolSlideGallerySlide[]",
              defaultValue: "bundled images",
              description:
                "Slides with `src` and optional `alt` / `title` / `subtitle` / `badge`. Defaults to static imports from `./images/`.",
            },
            {
              name: "cardWidth",
              type: "number",
              defaultValue: "380",
              description: "Card width in pixels.",
            },
            {
              name: "cardHeight",
              type: "number",
              defaultValue: "440",
              description: "Card height in pixels.",
            },
            {
              name: "radius",
              type: "number",
              defaultValue: "5",
              description: "Border radius scale 0–20.",
            },
            {
              name: "tilt",
              type: "number",
              defaultValue: "14",
              description: "Y-rotation (degrees) on side cards.",
            },
            {
              name: "sideTilt",
              type: "number",
              defaultValue: "6",
              description: "Z-rotation (degrees) lean on side cards.",
            },
            {
              name: "gap",
              type: "number",
              defaultValue: "8",
              description: "Horizontal gap multiplier between cards.",
            },
            {
              name: "dimOpacity",
              type: "number",
              defaultValue: "55",
              description: "Dim intensity 0–100 on inactive cards.",
            },
            {
              name: "autoplay",
              type: "boolean",
              defaultValue: "false",
              description: "Advance automatically while in view.",
            },
            {
              name: "autoplayDirection",
              type: '"left-to-right" | "right-to-left"',
              defaultValue: '"right-to-left"',
              description: "Autoplay step direction.",
            },
            {
              name: "autoplayDelay",
              type: "number",
              defaultValue: "2.8",
              description: "Seconds between autoplay steps.",
            },
            {
              name: "animationDuration",
              type: "number",
              defaultValue: "0.6",
              description: "Transition duration in seconds.",
            },
            {
              name: "easing",
              type: "EasingPreset",
              defaultValue: '"smooth"',
              description: "`smooth` | `spring` | `bouncy` | `snappy`.",
            },
            {
              name: "showTitle",
              type: "boolean",
              defaultValue: "true",
              description: "Title / subtitle overlays.",
            },
            {
              name: "titlePosition",
              type: "TitlePosition",
              defaultValue: '"bottom-left"',
              description:
                "`bottom-left` | `bottom-right` | `top-left` | `top-right` | `center` (logical start/end).",
            },
            {
              name: "showArrows",
              type: "boolean",
              defaultValue: "true",
              description: "Prev / next controls.",
            },
            {
              name: "showDots",
              type: "boolean",
              defaultValue: "true",
              description: "Dot indicators.",
            },
            {
              name: "showCounter",
              type: "boolean",
              defaultValue: "false",
              description: "Slide counter text.",
            },
            {
              name: "showBadge",
              type: "boolean",
              defaultValue: "true",
              description: "Badge labels on titles.",
            },
            {
              name: "clickable",
              type: "boolean",
              defaultValue: "true",
              description: "Click side cards to navigate.",
            },
            {
              name: "draggable",
              type: "boolean",
              defaultValue: "true",
              description: "Pointer drag / swipe.",
            },
            {
              name: "dragThreshold",
              type: "number",
              defaultValue: "45",
              description: "Minimum drag distance in px.",
            },
            {
              name: "keyboardNavigation",
              type: "boolean",
              defaultValue: "true",
              description: "Arrow keys to step.",
            },
            {
              name: "maxVisible",
              type: "number",
              defaultValue: "2",
              description: "Side cards visible on each side.",
            },
            {
              name: "depth",
              type: "number",
              defaultValue: "230",
              description: "Z-translate per offset step.",
            },
            {
              name: "scaleStep",
              type: "number",
              defaultValue: "0.15",
              description: "Scale reduction per offset from center.",
            },
            {
              name: "perspective",
              type: "number",
              defaultValue: "1500",
              description: "CSS perspective on the stage.",
            },
            {
              name: "onSlideChange",
              type: "(index: number, slide: CoolSlideGallerySlide) => void",
              description: "Fires when the active index changes.",
            },
            {
              name: "className",
              type: "string",
              description: "Extra classes on the root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
