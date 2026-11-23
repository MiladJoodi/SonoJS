import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Welcome Offer",
  description:
    "Welcome Offer popup - five looks for a first-visit discount with a checkout code, Shop now, and dismiss.",
  path: "/popups/welcome-offer",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "welcome-offer", "position=\"fixed\" delayMs={4000}")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

const stage =
  "relative min-h-[420px] w-full overflow-hidden bg-canvas sm:min-h-[560px] md:min-h-[640px]"

export default function PopupsWelcomeOfferDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Welcome Offer"
        pathname="/popups/welcome-offer"
        description="Five first-visit looks - violet, navy handshake, emerald starter pack, coral confetti, and charcoal + gold. Same code card, Shop now, and dismiss."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Welcome</h2>
            <p className="text-sm text-muted-foreground">
              Soft violet card over a dim underlay. Classic first-order code and pill CTA.
            </p>
          </div>
          <PopupExample
            name="welcome-offer-01"
            usage={[{ title: "app/page.tsx", code: usage("welcome-offer-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Handshake</h2>
            <p className="text-sm text-muted-foreground">
              Navy and blue chrome with a squarer CTA - partner-style welcome deal.
            </p>
          </div>
          <PopupExample
            name="welcome-offer-02"
            usage={[{ title: "app/page.tsx", code: usage("welcome-offer-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Starter Pack</h2>
            <p className="text-sm text-muted-foreground">
              Emerald accent and mint code badge - onboarding kit discount.
            </p>
          </div>
          <PopupExample
            name="welcome-offer-03"
            usage={[{ title: "app/page.tsx", code: usage("welcome-offer-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Confetti Card</h2>
            <p className="text-sm text-muted-foreground">
              Coral and rose celebration card - soft pink code badge and pill CTA.
            </p>
          </div>
          <PopupExample
            name="welcome-offer-04"
            usage={[{ title: "app/page.tsx", code: usage("welcome-offer-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">First Order</h2>
            <p className="text-sm text-muted-foreground">
              Charcoal invite with gold accent - VIP first-checkout energy.
            </p>
          </div>
          <PopupExample
            name="welcome-offer-05"
            usage={[{ title: "app/page.tsx", code: usage("welcome-offer-05") }]}
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
              type: '"welcome" | "handshake" | "starter-pack" | "confetti-card" | "first-order"',
              defaultValue: '"welcome"',
              description:
                "welcome violet · handshake navy · starter-pack emerald · confetti-card coral · first-order charcoal + gold.",
            },
            {
              name: "code",
              type: "string",
              defaultValue: '"WELCOME15"',
              description: "Checkout code shown in the soft accent badge.",
            },
            {
              name: "title",
              type: "string",
              defaultValue: '"15% off your first order"',
              description: "Main headline on the card.",
            },
            {
              name: "shopLabel",
              type: "string",
              defaultValue: '"Shop now"',
              description: "Primary CTA label.",
            },
            {
              name: "dismissLabel",
              type: "string",
              defaultValue: '"No thanks"',
              description: "Secondary dismiss control under the CTA.",
            },
            {
              name: "delayMs",
              type: "number",
              defaultValue: "360",
              description:
                "Milliseconds before the popup opens. Use ~4000 for a typical first-visit delay.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"fixed"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
            {
              name: "onCta",
              type: "() => void",
              description: "Fires when the visitor clicks Shop now.",
            },
            {
              name: "onDismiss",
              type: "() => void",
              description: "Fires when the visitor dismisses the offer.",
            },
          ]}
        />
      </section>
    </article>
  )
}
