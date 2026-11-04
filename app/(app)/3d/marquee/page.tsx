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
  title: "Marquee",
  description:
    "An infinite scrolling strip for text, images, or cards. Install with the SonoJS CLI.",
  path: "/3d/marquee",
})

const exampleDefs = [
  {
    name: "marquee-default",
    title: "Default",
    description:
      "Two horizontal rows - one forward, one `reverse` - with `pauseOnHover` and edge fades.",
  },
  {
    name: "marquee-vertical",
    title: "Vertical",
    description: "Set `vertical` for columns that scroll along the block axis.",
  },
  {
    name: "marquee-3d",
    title: "3D",
    description:
      "Stack vertical marquees inside a perspective wrapper for a layered strip.",
  },
]

const usageSource = `import { Marquee } from "@/components/ui/marquee"

export function Example() {
  return (
    <Marquee pauseOnHover className="[--duration:20s]">
      <span>Next.js</span>
      <span>React</span>
      <span>TypeScript</span>
      <span>Tailwind CSS</span>
    </Marquee>
  )
}`

export default async function Marquee3dDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Marquee"
        pathname="/3d/marquee"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An infinite scrolling strip for text, images, or cards. Tune speed
            and spacing with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              --duration
            </code>{" "}
            and{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              --gap
            </code>
            . Install also injects the marquee keyframes into your theme CSS.
            Same component as{" "}
            <a
              href="/docs/components/marquee"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Components → Marquee
            </a>
            . For the tilted photo columns, see{" "}
            <a
              href="/3d/image-marquee"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Image Marquee
            </a>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="marquee" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="marquee.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "reverse",
              type: "boolean",
              defaultValue: "false",
              description:
                "Reverse animation direction. Horizontal marquees also flip for RTL.",
            },
            {
              name: "pauseOnHover",
              type: "boolean",
              defaultValue: "false",
              description:
                "Pause the animation while the pointer is over the strip.",
            },
            {
              name: "vertical",
              type: "boolean",
              defaultValue: "false",
              description: "Scroll along the vertical axis instead of horizontal.",
            },
            {
              name: "repeat",
              type: "number",
              defaultValue: "4",
              description:
                "How many times to duplicate children for a seamless loop.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description:
                "Merge classes; set `[--duration:20s]` or `[--gap:1rem]` for timing and spacing.",
            },
          ]}
        />
      </section>
    </article>
  )
}
