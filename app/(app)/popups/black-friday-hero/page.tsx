import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Black Friday Hero",
  description:
    "Black Friday Hero popup - five looks (hero, ticker, stack-deal, countdown-slab, split-hero).",
  path: "/popups/black-friday-hero",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "black-friday-hero", "")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsBlackFridayHeroDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Black Friday Hero"
        pathname="/popups/black-friday-hero"
        description="Full-bleed sale hero with scrolling ticker, stamp discount, claim CTA, and floating percent marks. Five looks - purple hero, sky ticker, amber stack-deal, red countdown-slab, and emerald split-hero."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Biggest deals</h2>
            <p className="text-sm text-muted-foreground">
              Purple stage, coral ticker, and an 85% OFF stamp - ready to claim.
            </p>
          </div>
          <PopupExample
            name="black-friday-hero-01"
            usage={[
              {
                title: "app/page.tsx",
                code: usage("black-friday-hero-01"),
              },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Ticker</h2>
            <p className="text-sm text-muted-foreground">
              Sky stage and live ticker strip - lock savings before the scroll passes.
            </p>
          </div>
          <PopupExample
            name="black-friday-hero-02"
            usage={[
              {
                title: "app/page.tsx",
                code: usage("black-friday-hero-02"),
              },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Stack deal</h2>
            <p className="text-sm text-muted-foreground">
              Amber stacked savings - layer coupons and the Friday cut in one claim.
            </p>
          </div>
          <PopupExample
            name="black-friday-hero-03"
            usage={[
              {
                title: "app/page.tsx",
                code: usage("black-friday-hero-03"),
              },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Countdown slab</h2>
            <p className="text-sm text-muted-foreground">
              Red urgency slab - the deepest cut closes tonight.
            </p>
          </div>
          <PopupExample
            name="black-friday-hero-04"
            usage={[
              {
                title: "app/page.tsx",
                code: usage("black-friday-hero-04"),
              },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Split hero</h2>
            <p className="text-sm text-muted-foreground">
              Emerald split offer - half off today, half off a future order.
            </p>
          </div>
          <PopupExample
            name="black-friday-hero-05"
            usage={[
              {
                title: "app/page.tsx",
                code: usage("black-friday-hero-05"),
              },
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
              type: '"hero" | "ticker" | "stack-deal" | "countdown-slab" | "split-hero"',
              defaultValue: '"hero"',
              description:
                "hero purple · ticker sky · stack-deal amber · countdown-slab red · split-hero emerald.",
            },
            {
              name: "title",
              type: "string",
              defaultValue: '"Black Friday"',
              description: "Main hero headline.",
            },
            {
              name: "discount",
              type: "string",
              defaultValue: '"85% OFF"',
              description: "Discount pill text.",
            },
            {
              name: "discountLabel",
              type: "string",
              defaultValue: '"UP TO"',
              description: "Small stamp label beside the discount.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Claim deal"',
              description: "Primary CTA label.",
            },
            {
              name: "ticker",
              type: "string[]",
              description: "Messages for the top marquee strip.",
            },
            {
              name: "showTicker",
              type: "boolean",
              defaultValue: "true",
              description: "Show or hide the top marquee.",
            },
            {
              name: "showDecor",
              type: "boolean",
              defaultValue: "true",
              description: "Show floating percent decorations.",
            },
            {
              name: "guarantee",
              type: "string",
              defaultValue: '"30-day money-back guarantee"',
              description: "Trust line under the CTA.",
            },
          ]}
        />
      </section>
    </article>
  )
}
