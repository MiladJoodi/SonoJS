import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Price Crash",
  description:
    "Price Crash popup - five looks (lime crash, chart-dive, siren, broken-tag, auction).",
  path: "/popups/price-crash",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "price-crash", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsPriceCrashDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Price Crash"
        pathname="/popups/price-crash"
        description="Charcoal product card - old price shatters, sale price slams, savings highlight, Add to bag. Five looks - lime crash, rose chart-dive, amber siren, magenta broken-tag, and gold auction."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Slam & shatter</h2>
            <p className="text-sm text-muted-foreground">
              Classic lime crash - list price holds, then breaks as the sale price drops in.
            </p>
          </div>
          <PopupExample
            name="price-crash-01"
            usage={[{ title: "app/page.tsx", code: usage("price-crash-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Chart dive</h2>
            <p className="text-sm text-muted-foreground">
              Rose dive accent - the chart falls with the list price.
            </p>
          </div>
          <PopupExample
            name="price-crash-02"
            usage={[{ title: "app/page.tsx", code: usage("price-crash-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Siren</h2>
            <p className="text-sm text-muted-foreground">
              Amber emergency accent - urgent shatter and slam.
            </p>
          </div>
          <PopupExample
            name="price-crash-03"
            usage={[{ title: "app/page.tsx", code: usage("price-crash-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Broken tag</h2>
            <p className="text-sm text-muted-foreground">
              Magenta tag snap - the price label breaks with the sale.
            </p>
          </div>
          <PopupExample
            name="price-crash-04"
            usage={[{ title: "app/page.tsx", code: usage("price-crash-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Auction</h2>
            <p className="text-sm text-muted-foreground">
              Gold bid accent - going, going, sale price lands.
            </p>
          </div>
          <PopupExample
            name="price-crash-05"
            usage={[{ title: "app/page.tsx", code: usage("price-crash-05") }]}
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
              type: '"crash" | "chart-dive" | "siren" | "broken-tag" | "auction"',
              defaultValue: '"crash"',
              description:
                "crash lime · chart-dive rose · siren amber · broken-tag magenta · auction gold.",
            },
            {
              name: "productName",
              type: "string",
              defaultValue: '"Milo 01 Speaker"',
              description: "Product title on the right column.",
            },
            {
              name: "imageSrc",
              type: "string",
              description: "Product image URL (defaults to a demo media path).",
            },
            {
              name: "oldPrice",
              type: "string",
              defaultValue: '"$120"',
              description: "List price that shatters on impact.",
            },
            {
              name: "salePrice",
              type: "string",
              defaultValue: '"$85"',
              description: "Sale price that slams in.",
            },
            {
              name: "saveAmount",
              type: "string",
              defaultValue: '"$35"',
              description: "Highlighted savings amount.",
            },
            {
              name: "rating",
              type: "number",
              defaultValue: "4.9",
              description: "Star rating from 0–5 (partial fill).",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Add to bag - $85"',
              description: "Primary bag CTA label.",
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
