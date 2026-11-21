import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import { DocsApiProps, DocsInstallation } from "@/components/docs"
import { CornerRibbon } from "@/registry/promo/fork-ribbon/corner-ribbon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Fork me on GitHub",
  description:
    "Classic corner ribbons — every corner, multiple colors, Fork me on GitHub copy. Install with the SonoJS CLI.",
  path: "/promo/fork-ribbon",
})

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

const usageCode = `import { CornerRibbon } from "@/components/fork-ribbon-01/corner-ribbon"

export default function Page() {
  return (
    <div className="relative min-h-svh">
      <CornerRibbon
        label="Fork me on GitHub"
        tone="red"
        corner="top-start"
        href="https://github.com/your/repo"
      />
      <CornerRibbon
        label="Fork me on GitHub"
        tone="orange"
        corner="top-end"
        href="https://github.com/your/repo"
      />
      <CornerRibbon
        label="Fork me on GitHub"
        tone="green"
        corner="bottom-end"
        href="https://github.com/your/repo"
      />
      <CornerRibbon
        label="Fork me on GitHub"
        tone="black"
        corner="bottom-start"
        href="https://github.com/your/repo"
      />
    </div>
  )
}`

function FourCornersStage() {
  return (
    <div className="relative min-h-[420px] w-full overflow-hidden bg-canvas">
      <div className="mx-auto flex max-w-md flex-col justify-center gap-3 px-10 py-16 text-center">
        <p className="text-h4 text-foreground">Fork me on GitHub</p>
        <p className="text-sm text-muted-foreground">
          Four corners, four colors — same classic line on each.
        </p>
      </div>
      <CornerRibbon
        label="Fork me on GitHub"
        tone="red"
        corner="top-start"
        href="#"
      />
      <CornerRibbon
        label="Fork me on GitHub"
        tone="orange"
        corner="top-end"
        href="#"
      />
      <CornerRibbon
        label="Fork me on GitHub"
        tone="green"
        corner="bottom-end"
        href="#"
      />
      <CornerRibbon
        label="Fork me on GitHub"
        tone="black"
        corner="bottom-start"
        href="#"
      />
    </div>
  )
}

export default async function PromoForkRibbonDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Fork me on GitHub"
        pathname="/promo/fork-ribbon"
        description="A CSS corner ribbon with stitched edges. Default copy is Fork me on GitHub — change label, tone, and corner as needed."
      />

      <DocsInstallation name="fork-ribbon-01" />

      <BlockExample
        name="fork-ribbon-01"
        usage={[{ title: "app/page.tsx", code: usageCode }]}
        {...shell}
      >
        <FourCornersStage />
      </BlockExample>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "label",
              type: "string",
              defaultValue: '"Fork me on GitHub"',
              description: "Ribbon text.",
            },
            {
              name: "href",
              type: "string",
              defaultValue: '"#"',
              description: "Link target when the ribbon is clicked.",
            },
            {
              name: "tone",
              type: '"red" | "orange" | "green" | "black" | "navy" | "rose"',
              defaultValue: '"red"',
              description: "Ribbon color.",
            },
            {
              name: "corner",
              type: '"top-start" | "top-end" | "bottom-start" | "bottom-end"',
              defaultValue: '"top-end"',
              description: "Which corner the ribbon hangs from (logical start/end).",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"absolute"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
            {
              name: "title",
              type: "string",
              description: "Native title tooltip. Defaults to label.",
            },
            {
              name: "className",
              type: "string",
              description: "Extra classes on the ribbon anchor.",
            },
          ]}
        />
      </section>
    </article>
  )
}
