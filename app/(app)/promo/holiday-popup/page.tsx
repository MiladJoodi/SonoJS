import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import { DocsApiProps } from "@/components/docs"
import HolidayPopup01 from "@/registry/promo/holiday-popup/holiday-popup-01/holiday-popup"
import HolidayPopup02 from "@/registry/promo/holiday-popup/holiday-popup-02/holiday-popup"
import HolidayPopup03 from "@/registry/promo/holiday-popup/holiday-popup-03/holiday-popup"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Holiday Popup",
  description:
    "Winter holiday offer card — drop-in bounce, falling snow, copy-code CTA. Winter Night, Candy Cane, and Evergreen looks.",
  path: "/promo/holiday-popup",
})

const usage = (name: string) =>
  `import HolidayPopup from "@/components/${name}/holiday-popup"

export default function Page() {
  return (
    <div className="relative min-h-svh w-full">
      <HolidayPopup position="fixed" />
    </div>
  )
}`

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PromoHolidayPopupDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Holiday Popup"
        pathname="/promo/holiday-popup"
        description="A holiday offer card that drops in and bounces into place while snow falls across the stage and settles on the snowcap. Copy the code in one tap — close it and a gift chip brings it back."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Winter Night</h2>
            <p className="text-sm text-muted-foreground">
              Navy card, gold accents, and a soft winter stage.
            </p>
          </div>
          <BlockExample
            name="holiday-popup-01"
            usage={[{ title: "app/page.tsx", code: usage("holiday-popup-01") }]}
            {...shell}
          >
            <div className="relative min-h-[560px] w-full overflow-hidden sm:min-h-[620px]">
              <HolidayPopup01 />
            </div>
          </BlockExample>
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Candy Cane</h2>
            <p className="text-sm text-muted-foreground">
              Crimson card with white copy and CTA.
            </p>
          </div>
          <BlockExample
            name="holiday-popup-02"
            usage={[{ title: "app/page.tsx", code: usage("holiday-popup-02") }]}
            {...shell}
          >
            <div className="relative min-h-[560px] w-full overflow-hidden sm:min-h-[620px]">
              <HolidayPopup02 />
            </div>
          </BlockExample>
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Evergreen</h2>
            <p className="text-sm text-muted-foreground">
              Cream paper card with a deep green CTA.
            </p>
          </div>
          <BlockExample
            name="holiday-popup-03"
            usage={[{ title: "app/page.tsx", code: usage("holiday-popup-03") }]}
            {...shell}
          >
            <div className="relative min-h-[560px] w-full overflow-hidden sm:min-h-[620px]">
              <HolidayPopup03 />
            </div>
          </BlockExample>
        </section>
      </div>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "look",
              type: '"winter-night" | "candy-cane" | "evergreen"',
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
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Shop gifts"',
              description: "Primary button label.",
            },
            {
              name: "delayMs",
              type: "number",
              defaultValue: "0",
              description: "Auto-open delay in milliseconds.",
            },
            {
              name: "snow",
              type: "boolean",
              defaultValue: "true",
              description: "Falling snow overlay (off when reduced motion).",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"absolute"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
          ]}
        />
      </section>
    </article>
  )
}
