import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Midnight Drop",
  description:
    "Midnight Drop popup - five looks (midnight, radar, hourglass, alarm, drop-zone).",
  path: "/popups/midnight-drop",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "midnight-drop", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsMidnightDropDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Midnight Drop"
        pathname="/popups/midnight-drop"
        description="Two-column drop card - pendant lamp, cone spotlight, product stage; stars, sale price, Add to bag. Five looks - navy midnight, green radar, amber hourglass, red alarm, and violet drop-zone."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Spotlight drop</h2>
            <p className="text-sm text-muted-foreground">
              Classic navy stage with hanging lamp and beam - product drops into the light.
            </p>
          </div>
          <PopupExample
            name="midnight-drop-01"
            usage={[
              { title: "app/page.tsx", code: usage("midnight-drop-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Radar</h2>
            <p className="text-sm text-muted-foreground">
              Green scan accent - lock the product under the lamp.
            </p>
          </div>
          <PopupExample
            name="midnight-drop-02"
            usage={[
              { title: "app/page.tsx", code: usage("midnight-drop-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Hourglass</h2>
            <p className="text-sm text-muted-foreground">
              Amber timed drop - sand runs out while the deal is live.
            </p>
          </div>
          <PopupExample
            name="midnight-drop-03"
            usage={[
              { title: "app/page.tsx", code: usage("midnight-drop-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Alarm</h2>
            <p className="text-sm text-muted-foreground">
              Red alert accent - urgent midnight add to bag.
            </p>
          </div>
          <PopupExample
            name="midnight-drop-04"
            usage={[
              { title: "app/page.tsx", code: usage("midnight-drop-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Drop zone</h2>
            <p className="text-sm text-muted-foreground">
              Violet landing stage - the product settles in the zone.
            </p>
          </div>
          <PopupExample
            name="midnight-drop-05"
            usage={[
              { title: "app/page.tsx", code: usage("midnight-drop-05") },
            ]}
            {...shell}
          />
        </section>
      </div>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "look",
              type: '"midnight" | "radar" | "hourglass" | "alarm" | "drop-zone"',
              defaultValue: '"midnight"',
              description:
                "midnight navy · radar green · hourglass amber · alarm red · drop-zone violet.",
            },
            {
              name: "productName",
              type: "string",
              defaultValue: '"Forma 01 Headphones"',
              description: "Product title under the spotlight card.",
            },
            {
              name: "imageSrc",
              type: "string",
              description: "Product image URL (defaults to a demo media path).",
            },
            {
              name: "price",
              type: "string",
              defaultValue: '"$289.00"',
              description: "Strikethrough list price.",
            },
            {
              name: "salePrice",
              type: "string",
              defaultValue: '"$249.00"',
              description: "Highlighted sale price.",
            },
            {
              name: "rating",
              type: "number",
              defaultValue: "4.8",
              description: "Star rating from 0–5 (partial fill).",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Add to bag"',
              description: "Primary button before add.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"absolute"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
            {
              name: "onAddToBag",
              type: "() => void",
              description: "Fires when the visitor adds the product.",
            },
          ]}
        />
      </section>
    </article>
  )
}
