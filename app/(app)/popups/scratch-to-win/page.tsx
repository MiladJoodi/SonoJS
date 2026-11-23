import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Scratch to Win",
  description:
    "Scratch-to-win popup - foil, lottery, coin, strip, or ticket looks. Light and dark ready.",
  path: "/popups/scratch-to-win",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "scratch-to-win", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsScratchToWinDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Scratch to Win"
        pathname="/popups/scratch-to-win"
        description="A prize card under metallic foil. Drag to scratch - once enough of the layer clears, the win unlocks with a copyable code. Five looks: rose foil, green lottery, brass coin, indigo strip, navy ticket. Reduced motion gets a one-tap Reveal."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Foil</h2>
            <p className="text-sm text-muted-foreground">
              Warm rose cream in light, deep rose night in dark - scratch once
              for SCRATCH25.
            </p>
          </div>
          <PopupExample
            name="scratch-to-win-01"
            usage={[
              { title: "app/page.tsx", code: usage("scratch-to-win-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Lottery</h2>
            <p className="text-sm text-muted-foreground">
              Green ticket foil with emerald chrome - same scratch gesture.
            </p>
          </div>
          <PopupExample
            name="scratch-to-win-02"
            usage={[
              { title: "app/page.tsx", code: usage("scratch-to-win-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Coin</h2>
            <p className="text-sm text-muted-foreground">
              Amber brass foil - gold-coin energy under the scratch layer.
            </p>
          </div>
          <PopupExample
            name="scratch-to-win-03"
            usage={[
              { title: "app/page.tsx", code: usage("scratch-to-win-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Strip</h2>
            <p className="text-sm text-muted-foreground">
              Indigo security strip - cool purple-blue foil and CTA.
            </p>
          </div>
          <PopupExample
            name="scratch-to-win-04"
            usage={[
              { title: "app/page.tsx", code: usage("scratch-to-win-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Ticket</h2>
            <p className="text-sm text-muted-foreground">
              Navy + gold VIP ticket - event-stub chrome under gold foil.
            </p>
          </div>
          <PopupExample
            name="scratch-to-win-05"
            usage={[
              { title: "app/page.tsx", code: usage("scratch-to-win-05") },
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
              type: '"foil" | "lottery" | "coin" | "strip" | "ticket"',
              defaultValue: '"foil"',
              description:
                "foil rose · lottery green · coin brass · strip indigo · ticket navy+gold.",
            },
            {
              name: "offer",
              type: "string",
              defaultValue: '"25% off"',
              description: "Prize shown under the foil and after reveal.",
            },
            {
              name: "code",
              type: "string",
              defaultValue: '"SCRATCH25"',
              description: "Promo code copied by Copy / Claim.",
            },
            {
              name: "revealAt",
              type: "number",
              defaultValue: "0.42",
              description:
                "Fraction of foil that must be cleared to auto-reveal (0–1).",
            },
            {
              name: "hint",
              type: "string",
              defaultValue: '"Scratch the foil to uncover your prize"',
              description: "Copy shown while the foil is still intact.",
            },
            {
              name: "revealLabel",
              type: "string",
              defaultValue: '"Reveal prize"',
              description:
                "Button label when reduced motion skips the scratch gesture.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Claim your win"',
              description: "Primary button after the prize is revealed.",
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
              name: "onReveal",
              type: "() => void",
              description: "Fires when the foil clears or Reveal is pressed.",
            },
          ]}
        />
      </section>
    </article>
  )
}
