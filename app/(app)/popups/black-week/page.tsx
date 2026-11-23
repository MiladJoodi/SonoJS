import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Black Week",
  description:
    "Black Week popup - five looks (metal, flip-board, stamp, neon-strip, receipt).",
  path: "/popups/black-week",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "black-week", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsBlackWeekDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Black Week"
        pathname="/popups/black-week"
        description="A flip pass with sheen - tap to reveal the week’s cut, copyable code, and claim CTA. Five looks - metal, sky flip-board, rose stamp, fuchsia neon-strip, and stone receipt."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Metallic pass</h2>
            <p className="text-sm text-muted-foreground">
              Pearl silver in light, graphite and gold in dark - flip once for
              the week’s deepest cut.
            </p>
          </div>
          <PopupExample
            name="black-week-01"
            usage={[{ title: "app/page.tsx", code: usage("black-week-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Flip board</h2>
            <p className="text-sm text-muted-foreground">
              Sky scoreboard pass - flip once to post this week’s deepest score.
            </p>
          </div>
          <PopupExample
            name="black-week-02"
            usage={[{ title: "app/page.tsx", code: usage("black-week-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Stamp</h2>
            <p className="text-sm text-muted-foreground">
              Rose rubber-stamp pass - flip to break the seal and copy the code.
            </p>
          </div>
          <PopupExample
            name="black-week-03"
            usage={[{ title: "app/page.tsx", code: usage("black-week-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Neon strip</h2>
            <p className="text-sm text-muted-foreground">
              Fuchsia neon pass - flip under the lights for the after-hours cut.
            </p>
          </div>
          <PopupExample
            name="black-week-04"
            usage={[{ title: "app/page.tsx", code: usage("black-week-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Receipt</h2>
            <p className="text-sm text-muted-foreground">
              Stone paper pass with emerald ink - flip for the itemized week total.
            </p>
          </div>
          <PopupExample
            name="black-week-05"
            usage={[{ title: "app/page.tsx", code: usage("black-week-05") }]}
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
              type: '"metal" | "flip-board" | "stamp" | "neon-strip" | "receipt"',
              defaultValue: '"metal"',
              description:
                "metal slate/gold · flip-board sky · stamp rose · neon-strip fuchsia · receipt stone/emerald.",
            },
            {
              name: "offer",
              type: "string",
              defaultValue: '"40% off"',
              description: "Large offer shown on the back of the card.",
            },
            {
              name: "code",
              type: "string",
              defaultValue: '"WEEK40"',
              description: "Promo code copied by Copy / Claim.",
            },
            {
              name: "weekLabel",
              type: "string",
              defaultValue: '"NOV 23 - 30"',
              description: "Date range embossed on the metal face.",
            },
            {
              name: "hint",
              type: "string",
              defaultValue: '"Tap the card to flip"',
              description: "Copy shown before the card is flipped.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Claim Black Week"',
              description: "Primary button on the card reverse.",
            },
            {
              name: "delayMs",
              type: "number",
              defaultValue: "380",
              description: "Auto-open delay in milliseconds.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"absolute"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
            {
              name: "onFlip",
              type: "() => void",
              description: "Fires when the visitor flips the metal card.",
            },
          ]}
        />
      </section>
    </article>
  )
}
