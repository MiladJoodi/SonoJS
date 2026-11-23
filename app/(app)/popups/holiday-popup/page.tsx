import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Holiday Popup",
  description:
    "Winter holiday offer card - drop-in bounce, falling snow, copy-code CTA. Five looks: Winter Night, Candy Cane, Evergreen, Frost, Ember.",
  path: "/popups/holiday-popup",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "holiday-popup", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsHolidayPopupDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Holiday Popup"
        pathname="/popups/holiday-popup"
        description="A holiday offer card that drops in and bounces into place while snow falls across the stage and settles on the snowcap. Copy the code in one tap - close it and a gift chip brings it back."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Winter Night</h2>
            <p className="text-sm text-muted-foreground">
              Navy card, gold accents, and a soft winter stage.
            </p>
          </div>
          <PopupExample
            name="holiday-popup-01"
            usage={[{ title: "app/page.tsx", code: usage("holiday-popup-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Candy Cane</h2>
            <p className="text-sm text-muted-foreground">
              Crimson card with white copy and CTA.
            </p>
          </div>
          <PopupExample
            name="holiday-popup-02"
            usage={[{ title: "app/page.tsx", code: usage("holiday-popup-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Evergreen</h2>
            <p className="text-sm text-muted-foreground">
              Cream paper card with a deep green CTA.
            </p>
          </div>
          <PopupExample
            name="holiday-popup-03"
            usage={[{ title: "app/page.tsx", code: usage("holiday-popup-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Frost</h2>
            <p className="text-sm text-muted-foreground">
              Icy glass card with steel-blue accents.
            </p>
          </div>
          <PopupExample
            name="holiday-popup-04"
            usage={[{ title: "app/page.tsx", code: usage("holiday-popup-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Ember</h2>
            <p className="text-sm text-muted-foreground">
              Charcoal card with copper glow and warm stage.
            </p>
          </div>
          <PopupExample
            name="holiday-popup-05"
            usage={[{ title: "app/page.tsx", code: usage("holiday-popup-05") }]}
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
              type: '"winter-night" | "candy-cane" | "evergreen" | "frost" | "ember"',
              defaultValue: '"winter-night"',
              description: "Built-in color look for the card and stage.",
            },
            {
              name: "offer",
              type: "string",
              defaultValue: '"25% off"',
              description: "Large headline offer.",
            },
            {
              name: "code",
              type: "string",
              defaultValue: '"GIFT25"',
              description: "Promo code copied by Copy / Shop gifts.",
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
