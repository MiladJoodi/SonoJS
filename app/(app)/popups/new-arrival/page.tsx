import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "New Arrival",
  description:
    "New Arrival popup - stage, spotlight, product rail, editorial bleed, or ticket stub.",
  path: "/popups/new-arrival",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "new-arrival", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsNewArrivalDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="New Arrival"
        pathname="/popups/new-arrival"
        description="Five looks for a product drop - cream stage, dark spotlight, horizontal rail, full-bleed editorial, or a perforated price ticket."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Just landed</h2>
            <p className="text-sm text-muted-foreground">
              Soft stage with a moving light sweep. Clay badge, product copy,
              price, and a dark Shop now pill.
            </p>
          </div>
          <PopupExample
            name="new-arrival-01"
            usage={[
              { title: "app/page.tsx", code: usage("new-arrival-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Spotlight</h2>
            <p className="text-sm text-muted-foreground">
              Tall dark card - product sits on a beam, First look badge, price,
              and Shop the drop. Different composition from the cream stage.
            </p>
          </div>
          <PopupExample
            name="new-arrival-02"
            usage={[
              { title: "app/page.tsx", code: usage("new-arrival-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Product rail</h2>
            <p className="text-sm text-muted-foreground">
              Horizontal strip of product tiles with a Shop CTA in the header.
            </p>
          </div>
          <PopupExample
            name="new-arrival-03"
            usage={[
              { title: "app/page.tsx", code: usage("new-arrival-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Editorial</h2>
            <p className="text-sm text-muted-foreground">
              Full-bleed product photo with overlay type, price, and CTA at the
              bottom.
            </p>
          </div>
          <PopupExample
            name="new-arrival-04"
            usage={[
              { title: "app/page.tsx", code: usage("new-arrival-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Ticket stub</h2>
            <p className="text-sm text-muted-foreground">
              Perforated price ticket - product thumb on the left, stub price on
              the right.
            </p>
          </div>
          <PopupExample
            name="new-arrival-05"
            usage={[
              { title: "app/page.tsx", code: usage("new-arrival-05") },
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
              type: '"stage" | "spotlight" | "rail" | "editorial" | "ticket"',
              defaultValue: '"stage"',
              description:
                "stage = cream light stage; spotlight = dark beam; rail = product strip; editorial = full-bleed; ticket = perforated stub.",
            },
            {
              name: "badgeLabel",
              type: "string",
              defaultValue: '"JUST LANDED"',
              description: "Clay pill above the product title.",
            },
            {
              name: "title",
              type: "string",
              defaultValue: '"Halo Table Lamp"',
              description: "Product name.",
            },
            {
              name: "priceLabel",
              type: "string",
              defaultValue: '"$129"',
              description: "Price line under the description.",
            },
            {
              name: "productSrc",
              type: "string",
              defaultValue: "bundled arrival-lamp.webp",
              description: "Product image on the stage / beam / rail.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Shop now"',
              description: "Primary dark pill link.",
            },
            {
              name: "href",
              type: "string",
              defaultValue: '"#"',
              description: "CTA destination. `#` dismisses after click.",
            },
            {
              name: "delayMs",
              type: "number",
              defaultValue: "360",
              description: "Auto-open delay when `defaultOpen` is true.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"fixed"',
              description: "`absolute` for framed demos; `fixed` for live sites.",
            },
          ]}
        />
      </section>
    </article>
  )
}
