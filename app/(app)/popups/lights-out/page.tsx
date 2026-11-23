import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Lights Out",
  description:
    "Lights-out flash sale - lamp, switch, candle, spotlight, or curtain looks. Light and dark ready.",
  path: "/popups/lights-out",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "lights-out", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsLightsOutDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Lights Out"
        pathname="/popups/lights-out"
        description="A hanging pendant lamp on a themed stage. Tap the lamp - the spotlight drops, dust motes drift, and a 50% off code lights up. Five looks: amber lamp, cyan switch, wax candle, theatre spotlight, purple curtain."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Lamp</h2>
            <p className="text-sm text-muted-foreground">
              Dark room, warm amber bulb, dramatic 50% reveal - tap the lamp to
              turn the deal on.
            </p>
          </div>
          <PopupExample
            name="lights-out-01"
            usage={[{ title: "app/page.tsx", code: usage("lights-out-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Switch</h2>
            <p className="text-sm text-muted-foreground">
              Cool slate stage - cyan flood when the lamp turns on.
            </p>
          </div>
          <PopupExample
            name="lights-out-02"
            usage={[{ title: "app/page.tsx", code: usage("lights-out-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Candle</h2>
            <p className="text-sm text-muted-foreground">
              Warm cream walls and wax-orange glow - soft candlelight sale.
            </p>
          </div>
          <PopupExample
            name="lights-out-03"
            usage={[{ title: "app/page.tsx", code: usage("lights-out-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Spotlight</h2>
            <p className="text-sm text-muted-foreground">
              Theatre red and white cone - center-stage flash sale.
            </p>
          </div>
          <PopupExample
            name="lights-out-04"
            usage={[{ title: "app/page.tsx", code: usage("lights-out-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Curtain</h2>
            <p className="text-sm text-muted-foreground">
              Deep purple house lights - violet glow when the curtain rises.
            </p>
          </div>
          <PopupExample
            name="lights-out-05"
            usage={[{ title: "app/page.tsx", code: usage("lights-out-05") }]}
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
              type: '"lamp" | "switch" | "candle" | "spotlight" | "curtain"',
              defaultValue: '"lamp"',
              description:
                "lamp amber · switch cyan · candle wax · spotlight theatre · curtain purple.",
            },
            {
              name: "offer",
              type: "string",
              defaultValue: '"50% off"',
              description: "Large offer shown after the lamp turns on.",
            },
            {
              name: "code",
              type: "string",
              defaultValue: '"LIGHTS50"',
              description: "Promo code copied by Copy / Claim.",
            },
            {
              name: "hint",
              type: "string",
              defaultValue: '"Tap the lamp to turn the deal on"',
              description: "Copy shown while the stage is still dark.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Claim 50% off"',
              description: "Primary button label after lights on.",
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
              name: "onLightsOn",
              type: "() => void",
              description: "Fires when the visitor turns the lamp on.",
            },
          ]}
        />
      </section>
    </article>
  )
}
