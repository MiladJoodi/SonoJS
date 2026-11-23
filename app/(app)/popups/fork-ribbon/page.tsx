import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Fork me on GitHub",
  description:
    "Classic corner ribbon in four colors - top-start, top-end, bottom-end, and bottom-start. Download the Pro zip.",
  path: "/popups/fork-ribbon",
})

const usageClassic = `import { CornerRibbon } from "@/components/fork-ribbon-01/corner-ribbon"

export default function Page() {
  return (
    <div className="relative min-h-svh">
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
}`

export default function PopupsForkRibbonDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Fork me on GitHub"
        pathname="/popups/fork-ribbon"
        description="Classic corner chrome for repos and launches - one ribbon, four logical corners."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Classic</h2>
            <p className="text-sm text-muted-foreground">
              Default look - dotted stitch ribbon on every corner.
            </p>
          </div>
          <PopupExample
            name="fork-ribbon-01"
            usage={[{ title: "app/page.tsx", code: usageClassic }]}
            previewAlign="start"
            previewClassName="bg-canvas p-0" />
        </section>
      </div>

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
              type: '"red" | "orange" | "green" | "black"',
              defaultValue: '"red"',
              description: "Ribbon color.",
            },
            {
              name: "corner",
              type: '"top-start" | "top-end" | "bottom-start" | "bottom-end"',
              defaultValue: '"top-end"',
              description:
                "Which corner the ribbon hangs from (logical start/end).",
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
